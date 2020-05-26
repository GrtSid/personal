from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from .projects.classification import classify


def index(request):
    return render(request, 'index.html', context=None)


# @csrf_exempt
# def Cloth_Classification(request):
#     if request.method == 'POST' and request.FILES['file']:
#         myfile = request.FILES['file']
#         fs = FileSystemStorage()
#         filename = fs.save(myfile.name, myfile)
#         uploaded_file_url = fs.url(filename)
#         value = classify(uploaded_file_url)
#         content = {'url': uploaded_file_url, 'value': value}
#         return JsonResponse(content)
#     return render(request, 'index.html')
