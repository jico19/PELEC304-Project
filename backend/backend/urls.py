from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from django.conf import settings
from django.conf.urls.static import static
from api.views import GoogleLoginView


urlpatterns = [
    path('admin/', admin.site.urls),
    # project endpoints
    path('api/', include('api.urls')),
    
    # third party endpoints 
    path('accounts/', include('allauth.urls')),  # allauth routes

    # JWT token endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # password reset
    path('api/password/reset/', include('django_rest_passwordreset.urls'), name="password_reset"),
    
    # google login
    path('auth/google/', GoogleLoginView.as_view(), name="google_login"),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)