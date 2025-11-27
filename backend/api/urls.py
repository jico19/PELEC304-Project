from django.urls import path, include
from . import views
from . import viewsets
from rest_framework import routers

router = routers.DefaultRouter()
router.register(f'user', viewsets.CustomUserViewSets)
router.register(f'room', viewsets.RoomViewSets)
router.register(f'rent', viewsets.RentViewSets)
router.register(f'transaction', viewsets.RentTransactionViewSets)
router.register(f'report', viewsets.ReportViewSests)
router.register(f'favorite', viewsets.FavoriteViewSets, basename="favorite")


urlpatterns = [
    path('logout/', views.LogoutView.as_view(), name="logout_view"),
    
    # endpoints with query params
    path('rooms/', views.RoomBudgetFilter.as_view(), name="rooms"),
    path('room/locations/', views.RoomsLocations.as_view(), name="room_locations"),
    path('room/search/', views.GeoCoding.as_view(), name="search_room"),
    
    # user endpoints
    path('', include(router.urls))
]
