from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.files.storage import FileSystemStorage
# import cv2
# import numpy as np
# from .projects.classification import classify
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def Cloth_Classification(request):
    if request.method == 'POST' and request.FILES['file']:
        myfile = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        # value = classify(uploaded_file_url)
        value = "Shirt"
        # res = "http://127.0.0.1:8000"+uploaded_file_url
        content = {'url': uploaded_file_url, 'value': value}
        return JsonResponse(content)
    return render(request, 'index.html')
