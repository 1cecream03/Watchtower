from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CreateUserView, FavoriteViewSet, ReviewViewSet, RecommendMovieView

router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='user-register'),
    path('recommend/', RecommendMovieView.as_view(), name='recommend'),
]

urlpatterns += router.urls  
