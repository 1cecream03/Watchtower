from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .views import CreateUserView, FavoriteViewSet, ReviewViewSet, RecommendMovieView, HealthCheckView

# Simple test view
@api_view(['GET'])
def test_api(request):
    return Response({
        "message": "API is working!",
        "status": "healthy",
        "available_endpoints": [
            "GET /api/test/ - Test endpoint",
            "POST /api/user/register/ - User registration", 
            "POST /api/recommend/ - Get movie recommendation",
            "GET /api/favorites/ - List user favorites",
            "POST /api/favorites/ - Add favorite",
            "GET /api/reviews/ - List user reviews", 
            "POST /api/reviews/ - Create review",
            "GET /api/health/ - Health check",
            "POST /api/token/ - Get auth token",
            "POST /api/token/refresh/ - Refresh token"
        ]
    })

# Router for ViewSets
router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    # Individual endpoints
    path('test/', test_api, name='api-test'),
    path('user/register/', CreateUserView.as_view(), name='user-register'),
    path('recommend/', RecommendMovieView.as_view(), name='recommend'),
    path('health/', HealthCheckView.as_view(), name='health'),  # Fixed: removed views. prefix
    
    # Include router URLs (favorites and reviews CRUD)
    path('', include(router.urls)),
]