from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


urlpatterns = [
    path('django-admin/', admin.site.urls),

    path(
        'api/auth/token/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair',
    ),

    path(
        'api/auth/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh',
    ),

    path(
        'api/auth/token/verify/',
        TokenVerifyView.as_view(),
        name='token_verify',
    ),

    path('api/', include('portfolio.urls')),

    re_path(
        r'^media/(?P<path>.*)$',
        serve,
        {
            'document_root': settings.MEDIA_ROOT,
        },
        name='media',
    ),
]