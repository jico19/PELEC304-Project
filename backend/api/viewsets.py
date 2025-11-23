from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from . import models
from . import serializers
from django.shortcuts import get_object_or_404

class CustomUserViewSets(viewsets.ModelViewSet):
    '''
        Responsible for registration
    '''
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializers
    lookup_field = 'user_id'
    permission_classes = [AllowAny]

class RoomViewSets(viewsets.ModelViewSet):
    '''
        View sets for room
        TODO*
            make sure that only landlord can upload rooms
    '''
    
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer
    lookup_field = 'slug_name'
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()

class RentViewSets(viewsets.ModelViewSet):
    ''''
        View sets for active rent
    '''
    queryset = models.ActiveRent.objects.all()
    serializer_class = serializers.ActiveRentSerializers
    permission_classes = [IsAuthenticated]


class RentTransactionViewSets(viewsets.ModelViewSet):
    queryset = models.RentTransaction.objects.all()
    serializer_class = serializers.RentTransactionSerializers
    lookup_field = 'transact_id'
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        '''
            this means that only the authenticated user can created it.
        '''
        rent = serializer.save(renter=self.request.user)
        return rent

class ReportViewSests(viewsets.ModelViewSet):
    queryset = models.Reports.objects.all()
    serializer_class = serializers.ReportSerializers
    lookup_field = 'report_id'
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        room_instance = get_object_or_404(models.Room, pk=self.request.data.get('room'))
        
        report = serializer.save(
            room=room_instance,
            reporter=self.request.user
        )
        return report