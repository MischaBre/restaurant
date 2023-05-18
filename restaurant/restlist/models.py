from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Neighborhood(models.Model):
    name = models.CharField(max_length=100)
    polygon = models.JSONField()
    level = models.SmallIntegerField()

    def __str__(self):
        return self.name


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    added = models.DateTimeField()
    tags = ArrayField(
        models.CharField(max_length=50)
    )
    geolocation = models.JSONField()
    neighborhood = models.ManyToManyField(Neighborhood)
    visited = models.DateTimeField(null=True, blank=True)
    rating = models.SmallIntegerField(null=True, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return self.name