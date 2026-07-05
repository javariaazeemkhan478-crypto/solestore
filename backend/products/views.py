from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Brand, Product
from .serializers import (CategorySerializer, BrandSerializer,
                           ProductListSerializer, ProductDetailSerializer)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BrandListView(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all().select_related('brand','category').prefetch_related('images')
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name','brand__name','category__name']
    ordering_fields = ['price','created_at','name']

    def get_queryset(self):
        qs = super().get_queryset()
        p = self.request.query_params
        if p.get('category'): qs = qs.filter(category__slug=p['category'])
        if p.get('brand'):    qs = qs.filter(brand__slug=p['brand'])
        if p.get('gender'):   qs = qs.filter(gender=p['gender'])
        if p.get('min_price'):qs = qs.filter(price__gte=p['min_price'])
        if p.get('max_price'):qs = qs.filter(price__lte=p['max_price'])
        if p.get('featured'): qs = qs.filter(is_featured=True)
        if p.get('new_arrival'):qs= qs.filter(is_new_arrival=True)
        if p.get('best_seller'):qs= qs.filter(is_best_seller=True)
        if p.get('sale'):     qs = qs.filter(sale_price__isnull=False)
        return qs

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'

@api_view(['GET'])
def featured_products(request):
    products = Product.objects.filter(is_featured=True)[:8]
    s = ProductListSerializer(products, many=True, context={'request': request})
    return Response(s.data)

@api_view(['GET'])
def new_arrivals(request):
    products = Product.objects.filter(is_new_arrival=True)[:8]
    s = ProductListSerializer(products, many=True, context={'request': request})
    return Response(s.data)

@api_view(['GET'])
def best_sellers(request):
    products = Product.objects.filter(is_best_seller=True)[:8]
    s = ProductListSerializer(products, many=True, context={'request': request})
    return Response(s.data)