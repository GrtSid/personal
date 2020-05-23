from . import urls
from django.conf.urls import url, include
from django.urls import re_path
from . import views

urlpatterns = [
    # url(r'^$', views.HomePage.as_view(), name='home'),
    # url(r'/ballx/$', views.GameView, name='ballx'),
    re_path(r'^$', views.Cloth_Classification, name='ballx'),


]