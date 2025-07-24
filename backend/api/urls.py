from rest_framework.routers import DefaultRouter
from api.views import FavoriteViewSet, ReviewViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('api/', include(router.urls)),
]
