from django.urls import path
from . import views


urlpatterns = [
    path('', views.Cloth_Classification, name="classification"),
]