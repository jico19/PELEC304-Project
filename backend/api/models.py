'''
    ALL the models will be located here.
'''
from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuid.django_fields import ShortUUIDField
from django.core.validators import RegexValidator
from django.utils.text import slugify
from django.utils import timezone
from datetime import timedelta
from random import randint


class CustomUser(AbstractUser):
    OCCUPATION_STATUS_CHOICES = (
        ('Working','Working'),
        ('Student','Student'),
        ('Unemployed','Unemployed'),
    )
    
    MARITAL_STATUS_CHOICES = (
        ('Married', 'Married'),  
        ('Single', 'Single'),  
    )
    
    GENDER_CHOICES = (
        ('Male','Male'), 
        ('Female','Female'), 
        ('Others','Others'), 
    )
    
    '''
        ROLE NOTES:
        True it means landlord
        False means Teanant
    '''
    
    
    user_id = ShortUUIDField(length=5, max_length=30, prefix="id_",alphabet="abcdefg1234", unique=True, editable=False)
    occupation_status = models.CharField(max_length=20, choices=OCCUPATION_STATUS_CHOICES, default="Unemployed")
    phone_number = models.CharField(
        max_length=13,
        validators=[
            RegexValidator(
                regex=r'^(09\d{9}|\+639\d{9})$',
                message="Enter a valid PH mobile number (09XXXXXXXXX or +639XXXXXXXXX)."
            )
        ],
        blank=True
    )
    marital_status = models.CharField(max_length=20, choices=MARITAL_STATUS_CHOICES, default="Single")
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default="Others")
    permanent_address = models.CharField(max_length=300, default="")
    role = models.BooleanField(default=False)
    budget = models.IntegerField(default=randint(1000,20000))
    
    def __str__(self):
        return f"{self.user_id} - {self.username} - {self.occupation_status} - {self.gender}"

class Room(models.Model):
    
    ROOM_AVAILABILITY_CHOICES  = (
        ('Available', 'Available'),
        ('Not Available', 'Not Available'),
    )
    
    room_id = ShortUUIDField(
        length=5,
        max_length=30,
        prefix="room_",
        alphabet="abcdefg1234",
        unique=True,
        editable=False
    )
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=300, default="")
    address = models.CharField(max_length=300, default="")
    lat = models.FloatField(default=0.0)
    long = models.FloatField(default=0.0)
    room_picture = models.ImageField(upload_to="rooms/")
    slug_name = models.SlugField(unique=True,default="")
    air_condition = models.BooleanField(default=False)
    comfort_room = models.BooleanField(default=False)
    internet = models.BooleanField(default=False)
    room_availability = models.CharField(max_length=20, default="Available", choices=ROOM_AVAILABILITY_CHOICES)
    price = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.address}"

    def save(self, *args, **kwargs):
        
        if not self.slug_name:
            self.slug_name = slugify(self.name)
        
        return super().save(*args, **kwargs)

class Reports(models.Model):

    REPORT_STATUS_CHOICES = (
        ('Resolved', 'Resolved'),
        ('Unresolved', 'Unresolved'),
    )

    report_id = ShortUUIDField(
        length=5,
        max_length=30,
        prefix="rep_",
        alphabet="abcdefg1234",
        unique=True,
        editable=False
    )

    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    reporter = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    date_reported = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=REPORT_STATUS_CHOICES, default="Unresolved")

    def __str__(self):
        return f"Report {self.report_id} - {self.room.name}"

class RentTransaction(models.Model):
    '''rent transaction '''
    transact_id = ShortUUIDField(length=5, max_length=30, prefix="tr_",alphabet="abcdefg1234", unique=True, editable=False)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    renter = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.renter.username} - {self.room.name}"

class ActiveRent(models.Model):
    ''''
        Thinking of using this for signals
    '''
    STATUS_CHOICES = (
        ('Active', 'Active'),
        ('Ended', 'Ended'),
    )

    rent_id = ShortUUIDField(
        length=5,
        max_length=30,
        prefix="rent_",
        alphabet="abcdefg1234",
        unique=True,
        editable=False
    )

    rent_transaction = models.ForeignKey(RentTransaction, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    tenant = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    start_date = models.DateTimeField(default=timezone.now)
    due_date = models.DateTimeField(null=True, blank=True)
    amount = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Active")

    def __str__(self):
        return f"Rent {self.rent_id} - {self.room.name} by {self.tenant.username}"
    
    def save(self, *args, **kwargs):
        if not self.due_date:
            self.due_date = self.start_date + timedelta(days=30)
        return super().save(*args, **kwargs)


class Notification(models.Model):
    notification_id = ShortUUIDField(
        length=5,
        max_length=30,
        prefix="notif_",
        alphabet="abcdefg1234",
        unique=True,
        editable=False
    )

    renter = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="notifications_received"
    )

    sender = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="notifications_sent"
    )

    content = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification {self.notification_id}"