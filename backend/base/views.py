from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CustomUserSerializer, UserTokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .models import CustomUser
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

class UserRegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer

class UserDataView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    