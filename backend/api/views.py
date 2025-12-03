from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import views, status, response
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from google.oauth2 import id_token
from google.auth.transport import requests
from django.core.cache import cache
from django.db.models import Q, Count, Sum
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
#
from rest_framework.response import Response
from . import models
from . import serializers
from .utils import filter_by_budget_room
from .models import Room
from django.shortcuts import get_object_or_404

User = get_user_model()

class LogoutView(views.APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({"message": "Please enter a valid token."})
        token = RefreshToken(refresh_token)
        token.blacklist()        
        return Response({"message": "You account has been logout."})


''''
    TODOS: MAKE ENDPOINTS FOR FILTERING.
    HOUSE BUDGET,
    Longitude and LAT
'''

# @method_decorator(cache_page(60, key_prefix='all_rooms'), name="get")
class RoomsLocations(views.APIView):
    
    def get(self, request):
        data = Room.objects.filter(room_availability='Available').values('slug_name', 'name', 'lat', 'long', 'price', 'room_availability', 'address')
        
        return Response({"data": data})

class RoomBudgetFilter(views.APIView):
    
    '''
        http://127.0.0.1:8000/api/rooms/?lat=13.9456619&lon=121.6248902&radius=5&min-budget=2500&max-budget=3000
        
    '''
    
    
    def get(self, request):
        user_lat = float(request.query_params.get('lat', 0)) 
        user_lon = float(request.query_params.get('lon', 0))
        radius = float(request.query_params.get('radius', 5))
        min_budget = request.query_params.get('min-budget', None)
        max_budget = request.query_params.get('max-budget', None)
        
        if max_budget is not None:
            max_budget = float(max_budget)
            min_budget = float(min_budget)
        
        rooms = filter_by_budget_room(
            user_lat=user_lat,
            user_lon=user_lon,
            radius_km=radius,
            min_budget=min_budget,
            max_budget=max_budget
        )
    
        paginator = PageNumberPagination()
        paginator.page_size = 8
        paginated_qs = paginator.paginate_queryset(rooms, request)
        serializer = serializers.RoomSerializer(paginated_qs,  many=True, context={'request': request})
        
        return paginator.get_paginated_response(serializer.data)

class GoogleLoginView(views.APIView):

    def post(self, request):
        token = request.data.get('token') # google sent id token 
        if not token:
            return Response({"error": "ID Token Missing."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID,
                clock_skew_in_seconds=10
            )
            # Extract fields
            email = idinfo.get("email")
            sub = idinfo.get("sub")            # Google user ID
            name = idinfo.get("name")
            picture = idinfo.get("picture")
            
            if not email:
                return Response({"error": "Email not provided by Google"}, status=400)
            
            # will created default user information
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": email.split("@")[0],
                    "first_name": name or "",
                }
            )
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.first_name,
                    "avatar": picture,
                }
            })

        except ValueError:
            print(token)
            return Response({"error": "Invalid ID token"}, status=400)
        
        

class GeoCoding(views.APIView):
    serializer_class = serializers.SearchRoomSerializers


    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            search = serializer.validated_data.get('address')
                        
            searched_room = models.Room.objects.filter(
                Q(name__icontains=search) |
                Q(address__icontains=search) |
                Q(owner__username__icontains=search)
            )
            
            paginator = PageNumberPagination()
            paginator.page_size = 8
            paginated_qs = paginator.paginate_queryset(searched_room, request)
            serializer = serializers.RoomSerializer(paginated_qs, many=True, context={'request': request})
            
            return paginator.get_paginated_response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetRoles(views.APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        role = models.CustomUser.objects.filter(pk=request.user.pk).values_list('role', flat=True).first()
        return Response({"user_role": role})

class LandlordDashboardData(views.APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = 6
        
        recent_activities = models.Notification.objects.filter(sender=self.request.user)
        active_properties = models.ActiveRent.objects.filter(room__owner=self.request.user).count()
        tenant_count = models.ActiveRent.objects.filter(room__owner=self.request.user).count()
        monthly_earnings = models.RentPaymentHistory.objects.filter(room__owner=self.request.user).aggregate(monthly_earning=Sum('amount'))
        room_reports = models.Reports.objects.filter(room__owner=self.request.user)
        
        # paginated if meron
        
        # serializers
        recent_activities_serializer = serializers.NotifcationSerializer(recent_activities, many=True)
        room_report_serializer = serializers.ReportSerializers(room_reports, many=True)

                
        return Response({
            "active_properties": active_properties,
            "recent_activities": recent_activities_serializer.data,
            "number_of_tenants": tenant_count,
            "monthly_earnings": monthly_earnings['monthly_earning'],
            "room_reports": room_report_serializer.data,
            
        })

class LandlordRooms(views.APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = 6
        
        your_properties = models.Room.objects.filter(owner=self.request.user)
        paginated_rooms = paginator.paginate_queryset(your_properties, request)
        serializer = serializers.RoomSerializer(paginated_rooms, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)