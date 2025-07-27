from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, FavoriteSerializer, ReviewSerializer
from .models import Favorite, Review
from .openai import get_movie_recommendation
import logging
import traceback

logger = logging.getLogger(__name__)

class CreateUserView(generics.CreateAPIView):
    """
    Create a new user account
    POST /api/users/register/
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class FavoriteViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for user favorites
    GET /api/favorites/ - List user's favorites
    POST /api/favorites/ - Add a favorite
    PUT/PATCH /api/favorites/{id}/ - Update favorite
    DELETE /api/favorites/{id}/ - Remove favorite
    """
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for user reviews
    GET /api/reviews/ - List user's reviews
    POST /api/reviews/ - Create a review
    PUT/PATCH /api/reviews/{id}/ - Update review
    DELETE /api/reviews/{id}/ - Delete review
    """
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Review.objects.filter(user=self.request.user).order_by('-created_at')
        return Review.objects.none()

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            return Response(
                {"error": "Authentication required to create reviews"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer.save(user=self.request.user)

class RecommendMovieView(APIView):
    """
    Get AI movie recommendation based on user prompt
    POST /api/recommend/ - Get movie recommendation
    Body: {"prompt": "I want a funny movie"}
    """
    permission_classes = [AllowAny]

    def post(self, request):
        prompt = request.data.get("prompt")
        logger.info(f"Received recommendation request with prompt: {prompt}")
        
        if not prompt:
            return Response(
                {"error": "Prompt is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if len(prompt.strip()) < 3:
            return Response(
                {"error": "Prompt must be at least 3 characters long"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            recommendation = get_movie_recommendation(prompt)
            logger.info("Successfully generated movie recommendation")
            return Response({"recommendation": recommendation})
            
        except Exception as e:
            logger.error(f"OpenAI API error: {str(e)}")
            logger.error(traceback.format_exc())
            return Response(
                {"error": "Failed to get recommendation. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

class HealthCheckView(APIView):
    """
    Simple health check endpoint
    GET /api/health/
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({
            "status": "healthy",
            "message": "Movie recommendation backend is running"
        })