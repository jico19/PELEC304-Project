from django.contrib import admin
from .models import CustomUser, Room, Notification, ActiveRent, Reports, RentTransaction, Favorites
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    
    '''
        CUSTOM ADMIN DASHBOARD
        THIS TELLS ADMIN DASHBOARD ON WHAT TO SHOW
    '''
    
    model = CustomUser
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone_number', 'gender', 'occupation_status', 'marital_status', 'permanent_address', 'role', 'budget')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'user_id', 'password1', 'password2'),
        }),
    )
    list_display = ('user_id', 'username', 'email', 'is_staff')
    search_fields = ('username', 'email', 'user_id')
    ordering = ('user_id',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Room)
admin.site.register(Notification)
admin.site.register(ActiveRent)
admin.site.register(Reports)
admin.site.register(RentTransaction)
admin.site.register(Favorites)