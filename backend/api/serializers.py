from rest_framework import serializers
from . import models
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = [
            'user_id',
            'id',
            'username',
            'password',
            'role',
            'occupation_status',
            'email',
            'phone_number',
            'marital_status',
            'gender',
            'permanent_address',
            'budget'
        ]
        read_only_fields = ['budget', 'id']
        extra_kwargs = {
            "password": {"write_only": True},  # <-- make optional
            "role": {"write_only": True}
        }
    
    def create(self, validated_data):
        user = models.CustomUser.objects.create_user(**validated_data)
        return user
    


class RoomSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField()
    room_picture = serializers.ImageField(use_url=True)  # <-- ensures full URL
    
    class Meta:
        model = models.Room
        fields = '__all__'
        read_only_fields = ['owner']
        
    def validate(self, attrs):
        user = self.context['request'].user
        
        if not user.role:
            raise serializers.ValidationError({
                "message": "You don't have the permision to perform this action."
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
    room_lat = serializers.SerializerMethodField()
    room_long = serializers.SerializerMethodField()
    owner_id = serializers.SerializerMethodField()
    
    class Meta:
        model = models.ActiveRent
        fields = '__all__'
        read_only_fields = ['rent_id','owner_id', 'room','room_lat','room_long', 'tenant', 'start_date', 'due_date', 'rent_transaction', 'status', 'amount'] # -> add this later if not testing using drf ['room', 'tenant']

    def get_room_name(self, obj):
        return obj.room.name

    def get_tenant_name(self, obj):
        return obj.tenant.username
    
    def get_room_lat(self, obj):
        return obj.room.lat

    def get_room_long(self, obj):
        return obj.room.long
    
    def get_owner_id(self, obj):
        return obj.room.owner.id
    

class NotifcationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = '__all__'
        read_only_fields = ['notifcation_id', 'renter', 'sender']

class RentTransactionSerializers(serializers.ModelSerializer):
    
    room_name = serializers.SerializerMethodField()
    room_address = serializers.SerializerMethodField()
    room_lat = serializers.SerializerMethodField()
    room_long = serializers.SerializerMethodField()
    
    class Meta:
        model = models.RentTransaction
        fields = ['transact_id', 'room','room_name', 'room_address', 'room_lat', 'room_long']
        read_only_fields = ['id', 'renter'] 

    def get_room_name(self, obj):
        return f"{obj.room.name}"
    
    def get_room_address(self, obj):
        return obj.room.address
    
    def get_room_lat(self, obj):
        return obj.room.lat

    def get_room_long(self, obj):
        return obj.room.long
    
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


class SearchRoomSerializers(serializers.Serializer):
    address = serializers.CharField()

class PaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RentPaymentHistory
        fields = ['room', 'amount', 'date_paid']
        read_only_fields = ['renter', 'date_paid']
    
    def validate(self, attrs):
        amount = attrs.get("amount")
        if amount is None:
            raise serializers.ValidationError({
                "amount": "you have entered invalid amount"
            })
        
        if not isinstance(amount, (int, float)):
            raise serializers.ValidationError({"amount": "Amount must be a number."})

        if amount <= 0:
            raise serializers.ValidationError({"amount": "Amount must be greater than 0."})

        
        return attrs

class LandlordApplicationSerializer(serializers.ModelSerializer):
    applicant_name = serializers.SerializerMethodField()

    
    class Meta:
        model = models.LandlordApplication
        fields = ['id','application_id', 'document', 'status', 'applied_at', 'applicant_name']
        read_only_fields = ['status', 'applied_at',  'applicant']
    
    
    def get_applicant_name(self, obj):
        return obj.applicant.username
    
    def validate(self, attrs):
        user = self.context['request'].user.pk
        if models.LandlordApplication.objects.filter(applicant=user).exists():
            raise serializers.ValidationError({"applicant": "You have already uploaded a document."})
        return attrs