from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, FavoriteSerializer, ReviewSerializer
from .models import Favorite, Review
from .openai import get_movie_recommendation
import logging, traceback

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]      


class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Review.objects.filter(user=self.request.user).order_by('-created_at')
        return Review.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RecommendMovieView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        prompt = request.data.get("prompt")
        print("Received prompt:", prompt)  # ✅ confirm it's hitting the view

        if not prompt:
            return Response({"error": "Missing prompt"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            recommendation = get_movie_recommendation(prompt)
            return Response({"recommendation": recommendation})
        except Exception as e:
            print("OpenAI API error:", e)
            traceback.print_exc()  # ✅ full error message
            return Response(
                {"error": "Failed to get recommendation from OpenAI."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )