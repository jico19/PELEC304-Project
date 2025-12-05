from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from . import models
from . import serializers
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response


class CustomUserViewSets(viewsets.ModelViewSet):
    '''
        Responsible for registration
    '''
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializers
    lookup_field = 'user_id'
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def profile(self, request):
        '''
            this get current logged in user profile
        '''
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()] 
        elif self.action == 'retrieve' or self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        print(request.data)
        return super().create(request, *args, **kwargs)
    

    
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
    
    def get_permissions(self):
        if self.action == 'retrieve':
            return [AllowAny()]
        return super().get_permissions()

    
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
    queryset = models.RentTransaction.objects.none()  # placeholder queryset
    serializer_class = serializers.RentTransactionSerializers
    lookup_field = 'transact_id'
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return models.RentTransaction.objects.filter(renter=self.request.user)

    def perform_create(self, serializer):
        active_rent_exists = models.ActiveRent.objects.filter(
            tenant=self.request.user,
            status='Active'
        ).exists()

        if active_rent_exists:
            from rest_framework.exceptions import ValidationError
            raise ValidationError(
                {"detail": "You already have an active rent. Please contact your current owner or move out before renting a new room."}
            )

        # Otherwise, create the transaction
        serializer.save(renter=self.request.user)


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


class ActiveRentViewSets(viewsets.ModelViewSet):
    queryset = models.ActiveRent.objects.none()  # placeholder queryset
    serializer_class = serializers.ActiveRentSerializers
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.ActiveRent.objects.filter(tenant=self.request.user)



class PaymentTransactionViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PaymentHistorySerializer
    queryset = models.RentPaymentHistory.objects.none()
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        return serializer.save(renter=self.request.user)
    
    def get_queryset(self):
        data = models.RentPaymentHistory.objects.filter(renter=self.request.user)
        return data


class LandlordApplicationViewSets(viewsets.ModelViewSet):
    serializer_class = serializers.LandlordApplicationSerializer
    lookup_field = 'application_id'
    queryset = models.LandlordApplication.objects.all()
    # permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        return serializer.save(applicant=self.request.user)