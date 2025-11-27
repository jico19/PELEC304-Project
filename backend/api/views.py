from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, views, status, response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from google.oauth2 import id_token
from google.auth.transport import requests
from django.core.cache import cache
#
from rest_framework.response import Response
from . import models
from . import serializers
from .utils import filter_by_budget_room
from .models import Room
import requests

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

@method_decorator(cache_page(60, key_prefix='all_rooms'), name="get")
class RoomsLocations(views.APIView):
    # permission_classes = [IsAuthenticated]
    
    def get(self, request):
        data = Room.objects.filter(room_availability='Available').values('room_id', 'name', 'lat', 'long', 'price', 'room_availability')
        
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
        
        print(rooms)
        
        serializer = serializers.RoomSerializer(rooms, many=True)
        
        return Response({
            "data": serializer.data
        })

class GoogleLoginView(views.APIView):

    def post(self, request):
        token = request.data.get('token') # google sent id token 
        
        if not token:
            return Response({"error": "ID Token Missing."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID
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
            return Response({"error": "Invalid ID token"}, status=400)
        
        

class GeoCoding(views.APIView):
    serializer_class = serializers.SearchRoomSerializers


    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        address = serializer.validated_data["address"]
        
        endpoint = (
            "https://api.geoapify.com/v1/geocode/search"
            f"?text={address}"
            "&filter=countrycode:ph"
            "&bias=countrycode:ph"
            f"&apiKey={settings.GEOAPI_KEY}"
        )

        cache_key = f"geo:{address}"
        cached_data = cache.get(cache_key)

        if cached_data:
            return Response({
                "status": "cached",
                "geo_data": cached_data
            })

        # else fetch live result
        res = requests.get(endpoint)
        data = res.json()

        cache.set(cache_key, data, timeout=60)  # store for 1 minute

        return Response({
            "status": "fresh",
            "geo_data": data
        })