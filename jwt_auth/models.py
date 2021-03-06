from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    username = models.CharField(max_length=50, unique=True)
    email = models.CharField(max_length=500, unique=True)
    postcode = models.CharField(max_length=10, blank=True)
    profile_image = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.username
