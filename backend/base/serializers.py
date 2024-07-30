from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'first_name', 'second_name', 'age', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    

class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
	@classmethod
	def get_token(cls, user):
		token = super().get_token(user)
		token['id'] = user.id
		token['email'] = user.email
		return token
