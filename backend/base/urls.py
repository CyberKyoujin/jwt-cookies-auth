from django.urls import path
from .views import UserRegisterView, UserLoginView, UserDataView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('token-refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('data/', UserDataView.as_view(), name='user-data'),
]