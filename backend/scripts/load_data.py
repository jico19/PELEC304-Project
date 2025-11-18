from api.models import Room, CustomUser
from django.core.files import File
from django.core.files.uploadedfile import SimpleUploadedFile
import pandas as pd
from django.shortcuts import get_object_or_404
from django.utils.text import slugify
import random


df= pd.read_csv('./datasets/Room_Data.csv')
df.dropna(subset=['latitude', 'longitude'])
df = df.drop_duplicates(subset='NAME', keep='first')

# NAME,ADDRESS,longitude,latitude

def run():
    user_instance = get_object_or_404(CustomUser, pk=1)

    
    for row in df.itertuples():
        with open('./images/sample.jpg', 'rb') as f:
            img_bytes = f.read()
        
        img_file = SimpleUploadedFile(
            name='sample.jpg',
            content=img_bytes,
            content_type='image/jpeg'
        )
        Room.objects.create(
            owner=user_instance,
            name=row.NAME,
            address=row.ADDRESS,
            lat=row.longitude,
            long=row.latitude,
            room_picture=img_file,
            slug_name=slugify(row.NAME),
            air_condition=True,
            comfort_room = True,
            internet=True,
            room_availability='Available',
            price=random.randint(1000,10000)
        )
        print(row.NAME)
    
    print("data loaded successfully.")