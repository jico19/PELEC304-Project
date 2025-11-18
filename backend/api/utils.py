import math
from .models import Room

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
    angular_distance = 2 * math.atan2(math.sqrt(haversine_formula), math.sqrt(1 - haversine_formula))
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
