from django.conf import settings
from django.urls import path
from info import views
from django.conf.urls.static import static


urlpatterns = [
    path('', views.index, name="index"),
    path(r'project/', views.Cloth_Classification, name="classification"),

]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + \
    static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
