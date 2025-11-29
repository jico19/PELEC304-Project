import math
from .models import Room
from django.utils import timezone
from django.core.mail import send_mail


def calculate_distance(user_lat, user_lon, room_lat, room_lon):
    """
    Haversine formula to calculate distance between two lat/lon points in km.
    """
    earth_radius_km = 6371
    delta_lat = math.radians(room_lat - user_lat)
    delta_lon = math.radians(room_lon - user_lon)
    sin_lat = math.sin(delta_lat / 2) ** 2
    sin_lon = math.sin(delta_lon / 2) ** 2
    cos_lat1 = math.cos(math.radians(user_lat))
    cos_lat2 = math.cos(math.radians(room_lat))
    haversine_formula = sin_lat + (cos_lat1 * cos_lat2 * sin_lon)
    angular_distance = 2 * \
        math.atan2(math.sqrt(haversine_formula),
                   math.sqrt(1 - haversine_formula))
    return earth_radius_km * angular_distance


def filter_by_budget_room(user_lat, user_lon, radius_km=5, min_budget=None, max_budget=None):
    """
    Filter rooms by approximate radius and optional min/max budget.
    Uses bounding-box approximation for radius filtering.
    """
    # Approximate 1 degree latitude ~ 111 km
    lat_delta = radius_km / 111
    # Approximate 1 degree longitude ~ 111 km * cos(latitude)
    lon_delta = radius_km / (111 * math.cos(math.radians(user_lat)))

    # Bounding-box filter
    rooms = Room.objects.filter(
        lat__gte=user_lat - lat_delta,
        lat__lte=user_lat + lat_delta,
        long__gte=user_lon - lon_delta,
        long__lte=user_lon + lon_delta,
    )

    # Budget filters
    if min_budget is not None:
        rooms = rooms.filter(price__gte=min_budget)
    if max_budget is not None:
        rooms = rooms.filter(price__lte=max_budget)

    return rooms


def check_due_dates_and_send_email(rent):
    now = timezone()

    if rent.due_date - now <= timezone.timedelta(days=3) and rent.statis == "Active":
        send_mail(
            subject="Rent Due Reminder",
            message=f"Your rent for {rent.room_name} is due on {rent.due_date.date()}",
            from_email="your@email.com",
            recipient_list=[rent.tenant.email],
        )

def send_welcome_email(to_email, username):
    subject = "Welcome to Our Platform"
    message = f"""
        Hi {username},

        Welcome to LCBNB — your go-to platform for discovering boarding houses quickly and conveniently.

        Your account has been successfully created. You can now explore available rooms, check prices, view locations, and connect directly with landlords. We built LCBNB to make your search easier, faster, and more reliable.

        If you have any questions or need assistance, feel free to reach out anytime.

        Thank you for joining LCBNB.
        We’re glad to have you onboard.

        — LCBNB Team
""" 

    send_mail(
        subject=subject,
        message=message,
        from_email=None,
        recipient_list=[to_email],
        fail_silently=False,
    )
