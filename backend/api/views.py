from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, views, status
from rest_framework.response import Response
from . import models
from . import serializers
from .utils import filter_by_budget_room

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

class RoomBudgetFilter(views.APIView):
    
    '''
        http://127.0.0.1:8000/api/test/?lat=13.9456619&lon=121.6248902&radius=5&min-budget=2500&max-budget=3000
        
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
            "message": "dsadasdsd",
            "data": serializer.data
        })