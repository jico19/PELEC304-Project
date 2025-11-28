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

rental_descriptions = [
    "Cozy Downtown Studio: Bright studio with modern furnishings, fully equipped kitchenette, and easy access to public transport. Ideal for professionals or students.",
    "Spacious 2-Bedroom Apartment: Large living space with two bedrooms, updated kitchen, and balcony. Located in a quiet neighborhood near shops and parks.",
    "Modern Loft with Skyline View: Stylish loft with high ceilings, large windows, open-plan layout, fully equipped kitchen, and private rooftop terrace.",
    "Charming Suburban Home: 3-bedroom, 2-bath home with spacious backyard, garage, and modern appliances. Close to schools, parks, and shopping centers.",
    "Luxury Beachside Condo: 1-bedroom condo with ocean views, private balcony, high-end finishes, swimming pool and gym access. Perfect for vacationers or long-term renters."
]

def run():
    user_instance = get_object_or_404(CustomUser, pk=1)

    
    for row in df.itertuples():
        with open('./images/O_block.jpg', 'rb') as f:
            img_bytes = f.read()
        
        img_file = SimpleUploadedFile(
            name='O_block.jpg',
            content=img_bytes,
            content_type='image/jpeg'
        )
        Room.objects.create(
            owner=user_instance,
            name=row.NAME,
            address=row.ADDRESS,
            description = random.choice(rental_descriptions),
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