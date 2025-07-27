from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, FavoriteViewSet, ReviewViewSet, RecommendMovieView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    path('api/', include(router.urls)),
    path('api/recommend/', RecommendMovieView.as_view(), name='recommend'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
