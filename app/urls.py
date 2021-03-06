"""browser112 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt
from app.views import *

urlpatterns = [
    url(r'^$', HomePage.as_view()),
    url(r'^save$', csrf_exempt(SaveCode.as_view())),
    url(r'^checkname$', csrf_exempt(CheckName.as_view())),
    url(r'^verifypw$', csrf_exempt(VerifyPassword.as_view())),
    url(r'^(?P<uuid>[a-zA-Z0-9_.-]+)$', RunCode.as_view()),
    url(r'^(?P<uuid>[a-zA-Z0-9_.-]+)/edit$', EditCode.as_view()),
]
