from __future__ import unicode_literals

from django.db import models

from shortuuidfield import ShortUUIDField

# Create your models here.

class Program(models.Model):
    uuid = ShortUUIDField(editable=False)
    urlHash = models.CharField(max_length=200, default="")
    code = models.TextField(default="")