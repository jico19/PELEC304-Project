from django.db.models.signals import (
    post_save,
    post_delete
)
from django.dispatch import receiver
from . import models
from django.shortcuts import get_object_or_404
from django.core.cache import cache
from .utils import send_welcome_email
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

''''
    TODO MAKE A SIGNALS FOR CREATING ACTIVE RENT
'''


@receiver(post_save, sender=models.RentTransaction)
def ActiveRentSignals(sender, instance, created, **kwargs):
    if created:
        room_instance = get_object_or_404(
            models.Room, room_id=instance.room.room_id)
        print(instance.renter)
        models.ActiveRent.objects.create(
            rent_transaction=instance,
            room=instance.room,
            tenant=instance.renter,
            amount=room_instance.price,
        )

        room_instance = get_object_or_404(
            models.Room, room_id=instance.room.room_id)
        if room_instance.room_availability == 'Available':
            room_instance.room_availability = 'Not Available'
            room_instance.save()

@receiver([post_save, post_delete], sender=models.RentTransaction)
def invalidate_room_cache(**kwargs):
    '''

        It delete all the previous cache and generate a new one.

    '''
    cache.delete("all_room")


@receiver([post_save], sender=models.CustomUser)
def send_welcome_on_register(sender, instance, created, **kwargs):
    if created:
        send_welcome_email(username=instance.username, to_email=instance.email)


@receiver([post_save], sender=models.Reports)
def sends_notifacation_report(sender, instance, created, **kwargs):
    if created:
        models.Notification.objects.create(
            renter=instance.reporter,
            sender=instance.room.owner,
            content=instance.content
        )


@receiver([post_delete], sender=models.ActiveRent)
def send_notification_move_out(sender, instance, **kwargs):
    models.Notification.objects.create(
        renter=instance.tenant,
        sender=instance.room.owner,
        content=f"{instance.tenant.get_full_name()} is no longer renting {instance.room.name}."
    )
    # change the room availability to available if not change itt to not available
    room_instance = get_object_or_404(
    models.Room, room_id=instance.room.room_id)
    if room_instance.room_availability == 'Not Available':
        room_instance.room_availability = 'Available'
        print(room_instance.room_availability)
        room_instance.save()

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, **kwargs):
    user = reset_password_token.user
    
    html_content = render_to_string("api/token_email.html", {
        "user": user,
        "reset_token": reset_password_token.key,
        "frontend_url": "http://localhost:5173/reset/password/confirm",  # link to your frontend page
    })
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(
        subject="Reset Your Password",
        body=text_content,
        from_email="noreply@yourapp.com",
        to=[user.email],
    )
    email.attach_alternative(html_content, "text/html")
    email.send()