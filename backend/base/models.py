from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin



class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email must be provided")
        extra_fields.setdefault('username', None)
        extra_fields.setdefault('is_active', True)  # Ensure the user is active
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Ensure the password is hashed
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('username', None)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password=password, **extra_fields)

class CustomUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, null=True, blank=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    second_name = models.CharField(max_length=50, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

