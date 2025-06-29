from rest_framework.routers import DefaultRouter
from api.views import FavoriteViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')

urlpatterns = [
    # your other urls
    path('api/', include(router.urls)),
]
