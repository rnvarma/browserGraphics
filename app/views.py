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
        code = request.POST.get('code')
        p = Program(code=code)
        p.save()
        print p.uuid
        return HttpResponse({p.uuid: p.uuid})

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