from django.db.models.signals import (
    post_save,
    post_delete
)
from django.dispatch import receiver
from . import models
from django.shortcuts import get_object_or_404
from django.core.cache import cache

''''
    TODO MAKE A SIGNALS FOR CREATING ACTIVE RENT
'''
@receiver(post_save, sender=models.RentTransaction)
def ActiveRentSignals(sender, instance, created, **kwargs ):
    if created:
        print(instance.renter)
        models.ActiveRent.objects.create(
            rent_transaction=instance,
            room=instance.room,
            tenant=instance.renter,
            amount=instance.renter.budget,
        )
        
        room_instance = get_object_or_404(models.Room,room_id=instance.room.room_id)
        if room_instance.room_availability == 'Available':
            room_instance.room_availability = 'Not Available'
            room_instance.save()

@receiver(post_delete, sender=models.RentTransaction)
def change_to_available(sender, instance,**kwargs):
    '''
        Change the room status into avaiable once the client is not renter 
        like if the transatcion is delete or something.
    '''
    room_instance = get_object_or_404(models.Room, room_id=instance.room.room_id)
    if room_instance.room_availability == 'Not Available':
        room_instance.room_availability = 'Available'
        print(room_instance.room_availability)
        room_instance.save()

@receiver([post_save, post_delete], sender=models.RentTransaction)
def invalidate_room_cache(**kwargs):
    '''

        It delete all the previous cache and generate a new one.

    '''
    cache.delete("all_room")