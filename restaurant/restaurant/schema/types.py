from graphene_django import DjangoObjectType #used to change Django object into a format that is readable by GraphQL
from restlist.models import Restaurant, Neighborhood


class RestaurantType(DjangoObjectType):
    # Describe the data that is to be formatted into GraphQL fields
    class Meta:
        model = Restaurant
        field = (
            "id",
            "name",
            "added",
            "tags",
            "geolocation", 
            "neighborhood", 
            "visited", 
            "rating", 
            "notes"
        )

class NeighborhoodType(DjangoObjectType):
    class Meta:
        model = Neighborhood
        field = {
            "id", 
            "name",
            "polygon", 
            "level"
        }