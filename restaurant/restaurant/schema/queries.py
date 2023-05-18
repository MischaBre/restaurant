import graphene
from restlist.models import Restaurant, Neighborhood
from restaurant.schema.types import RestaurantType, NeighborhoodType
from django.db.models import Q


class Query(graphene.ObjectType):

    #RestaurantQueries
    allRestaurants = graphene.List(RestaurantType)
    restaurantByKeyword = graphene.List(RestaurantType,
                                        keyword=graphene.String(required=False),
                                        visited=graphene.Boolean(required=False),
                                        rating=graphene.Int(required=False))
    restaurantById = graphene.List(RestaurantType,
                                   id=graphene.ID(required=True))

    def resolve_allRestaurants(root, info):
        return Restaurant.objects.all()

    def resolve_restaurantByKeyword(root, info, keyword=None, visited=None, rating=None):
        result = Restaurant.objects.all()
        if keyword is not None:
            result = result.filter(
                Q(name__icontains=keyword) |
                Q(tags__icontains=keyword) |
                Q(notes__icontains=keyword) |
                Q(neighborhood__name__icontains=keyword))
        if visited is not None:
            result = result.filter(visited__isnull=not visited)
        if rating is not None:
            result = result.filter(rating__gte=rating)
        return result

    def resolve_restaurantById(root, info, id):
        return Restaurant.objects.filter(id=id)
    
    #NeighborhoodQueries
    allNeighborhoods = graphene.List(NeighborhoodType)
    neighborhoodByKeyword = graphene.List(NeighborhoodType,
                                          keyword=graphene.String(required=False),
                                          level=graphene.Int(required=False))
    neighborhoodById = graphene.List(NeighborhoodType,
                                     id=graphene.ID(required=True))
    
    def resolve_allNeighborhoods(root, info):
        return Neighborhood.objects.all()
    
    def resolve_neighborhoodByKeyword(root, info, keyword=None, level=None):
        result = Neighborhood.objects.all()
        if keyword is not None:
            result = result.filter(Q(name__icontains=keyword))
        if level is not None:
            result = result.filter(Q(level__gte=level))
        return result
    
    def resolve_neighborhoodById(root, info, id):
        return Neighborhood.objects.filter(id=id)