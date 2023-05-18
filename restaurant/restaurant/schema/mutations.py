import graphene
from graphql import GraphQLError

from restaurant.schema.types import RestaurantType
from restlist.models import Restaurant, Neighborhood

import datetime
from django.utils import timezone


class CreateRestaurant(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        tags = graphene.List(graphene.String, required=True)
        geolocation = graphene.JSONString(required=True)
        neighborhood = graphene.String(required=True)
        visited = graphene.DateTime()
        rating = graphene.Int()
        notes = graphene.String()

    ok = graphene.Boolean()
    restaurant = graphene.Field(RestaurantType)

    @classmethod
    def mutate(cls, root, info, name, tags, geolocation, neighborhood, visited=None, rating=None, notes=''):
        if name is None or tags is None or geolocation is None:
            raise GraphQLError("not enough parameters provided")
        
        nHood = Neighborhood.objects.filter(name=neighborhood)
        if nHood is None:
            raise GraphQLError("no known Neighborhood selected")
        
        added = datetime.datetime.now(tz=timezone.utc)
        restaurant = Restaurant.objects.create(
            name=name,
            added=added,
            tags=tags,
            geolocation=geolocation, 
            visited=visited,
            rating=rating,
            notes=notes)
        restaurant.save()
        restaurant.neighborhood.add(nHood)
        ok = True
        return CreateRestaurant(restaurant=restaurant, ok=ok)


class DeleteRestaurant(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    ok = graphene.Boolean()

    @classmethod
    def mutate(cls, info, root, id):
        restaurant = Restaurant.objects.filter(id=id)
        if restaurant is None:
            raise GraphQLError(f"no Restaurant with id {id} found")
        restaurant.delete()
        ok = True
        return DeleteRestaurant(ok=ok)

class Mutation(graphene.ObjectType):
    create_restaurant = CreateRestaurant.Field()
    delete_restaurant = DeleteRestaurant.Field()


'''
mutation {
  createRestaurant (
    name:"bluuub",
    tags:["blub", "yeah"],
    geolocation: "{\"type\": \"Point\", \"coordinates\": [-105.01621, 39.57422]}",
    neighborhood: "Testort"
  ) {
    ok
    restaurant {
      name,
      tags,
      geolocation,
      added
    }
  }
}


'''