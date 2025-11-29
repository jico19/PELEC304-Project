from rest_framework import serializers
from . import models
from rest_framework.exceptions import ValidationError


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = [
            'user_id',
            'username',
            'password',
            'role',
            'email',
            'phone_number',
            'marital_status',
            'gender',
            'permanent_address',
            'budget'
        ]
        read_only_fields = ['role', 'budget']
        extra_kwargs = {
            "password": {"write_only":True}
        }
    
    def create(self, validated_data):
        user = models.CustomUser.objects.create_user(**validated_data)
        return user

class RoomSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField()
    
    class Meta:
        model = models.Room
        fields = '__all__'
        read_only_fields = ['owner']
        
    def validate(self, attrs):
        # Only validate if this is a write operation (create/update)
        request = self.context.get('request')
        if request and request.method in ['POST', 'PUT', 'PATCH']:
            user = request.user
            
            if user.is_anonymous:
                raise serializers.ValidationError({
                    "message": "You must be authenticated to perform this action."
                })
            
            if not user.role or user.role != 'Landlord':
                raise serializers.ValidationError({
                    "message": "You don't have permission to perform this action. Only landlords can create/edit rooms."
                }) 
            
        return attrs
    
    def get_owner_name(self, obj):
        return obj.owner.username

class ReportSerializers(serializers.ModelSerializer):
    room_name = serializers.SerializerMethodField()
    reporter_name = serializers.SerializerMethodField()
    
    class Meta:
        model = models.Reports
        fields = '__all__'
        read_only_fields = ['report_id','room', 'reporter', 'status']
        
    def get_room_name(self, obj):
        return obj.room.name
    
    def get_reporter_name(self, obj):
        return obj.reporter.username

class ActiveRentSerializers(serializers.ModelSerializer):
    room_name = serializers.SerializerMethodField()
    tenant_name = serializers.SerializerMethodField()
    
    class Meta:
        model = models.ActiveRent
        fields = '__all__'
        read_only_fields = ['rent_id', 'room', 'tenant', 'start_date', 'due_date', 'rent_transaction', 'status', 'amount'] # -> add this later if not testing using drf ['room', 'tenant']

    def get_room_name(self, obj):
        return obj.room.name

    def get_tenant_name(self, obj):
        return obj.tenant.username

class NotifcationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = '__all__'
        read_only_fields = ['notifcation_id', 'renter', 'sender']

class RentTransactionSerializers(serializers.ModelSerializer):
    
        
    room_name = serializers.SerializerMethodField()
    class Meta:
        model = models.RentTransaction
        fields = ['id', 'transact_id', 'room','room_name']
        read_only_fields = ['id', 'renter'] 

    def get_room_name(self, obj):
        return f"{obj.room.name}"
    
    def validate(self, attrs):
        '''
            TODAYS LEARNING..
            you cannot access a key if its in the read only fields
        '''
        renter_budget = self.context['request'].user
        room_price = attrs['room'].price
                
        # checks if user can affort the room
        if renter_budget.budget < room_price:
            raise serializers.ValidationError({
                "budget": "You budget is lower than the room price.."
            })
        
        # checks if room is avaiable
        if attrs['room'].room_availability != 'Available':
            raise serializers.ValidationError({
                "room": "The room you want to rent is not avaiable yet..."
            })
        
        return attrs


class FavoriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Favorites
        fields = ['user', 'room']
        read_only_fields = ['user']


class SearchRoomSerializers(serializers.Serializer):
    address = serializers.CharField()