from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect, HttpResponse

from app.models import *

# Create your views here.

class HomePage(View):
    def get(self, request):
        return render(request, 'index.html')

class SaveCode(View):
    def post(self, request):
        uuid = request.POST.get('uuid')
        code = request.POST.get('code')
        pw = request.POST.get('password')
        p = Program.objects.filter(uuid=uuid)
        if p.count() == 0:
            p = Program.objects.filter(urlHash=uuid)
            if p.count() == 0:
                p = Program(code=code, urlHash=uuid, password=pw)
            else:
                p = p.first()
        else:
            p = p.first()
        p.code = code
        p.save()
        return HttpResponse(uuid)

class CheckName(View):
    def post(self, request):
        name = request.POST.get('name')
        p = Program.objects.filter(urlHash=name)
        if (p.count() > 0):
            return HttpResponse(True)
        return HttpResponse(False)

class RunCode(View):
    def get(self, request, uuid):
        program = Program.objects.filter(uuid=uuid)
        if program.count() == 0:
            program = Program.objects.filter(urlHash=uuid)
            if program.count() == 0:
                return HttpResponseRedirect('/')
        program = program.first()
        code = program.code
        return render(request, 'run.html', {'code': code.strip(), 'uuid': uuid})

class EditCode(View):
    def get(self, request, uuid):
        program = Program.objects.filter(uuid=uuid)
        if program.count() == 0:
            program = Program.objects.filter(urlHash=uuid)
            if program.count() == 0:
                return HttpResponseRedirect('/')
        program = program.first()
        code = program.code
        return render(request, 'index.html', {'code': code.strip(), 'uuid': uuid})