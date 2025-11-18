import math
from .models import Room


def calculate_distance(lat1, lon1, lat2, lon2):
    earth_radius = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    haversine_formula = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )

    angular_distance = 2 * math.atan2(math.sqrt(haversine_formula), math.sqrt(1 - haversine_formula))
    return earth_radius * angular_distance



def filter_by_budget_room(user_lat, user_lon, radius_km=5, max_budget=5000):
    nearby_room = []
    all_roms = Room.objects.all()

    for room in all_roms:
        room_lat = float(room.lat)
        room_lon = float(room.long)
        distance = calculate_distance(user_lat, user_lon, room_lat, room_lon)

        if distance <= radius_km:
            if max_budget is None or room.price <= max_budget:
                nearby_room.append(room)

    return nearby_room