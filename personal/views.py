from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import Http404, HttpResponse, HttpResponseRedirect, JsonResponse
import os

# Create your views here.
class HomePage(TemplateView):
    template_name = 'index.html'

