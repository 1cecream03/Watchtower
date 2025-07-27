from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .views import CreateUserView, FavoriteViewSet, ReviewViewSet, RecommendMovieView

# Simple test view
@api_view(['GET'])
def test_api(request):
    return Response({
        "message": "API is working!",
        "available_endpoints": [
            "/api/test/",
            "/api/user/register/",
            "/api/recommend/",
            "/api/favorites/",
            "/api/reviews/",
            "/api/token/",
            "/api/token/refresh/"
        ]
    })

router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('test/', test_api, name='api-test'),  # Test endpoint
    path('user/register/', CreateUserView.as_view(), name='user-register'),
    path('recommend/', RecommendMovieView.as_view(), name='recommend'),
]

urlpatterns += router.urls