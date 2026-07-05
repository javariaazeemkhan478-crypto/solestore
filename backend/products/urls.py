from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProductListView.as_view()),
    path('featured/', views.featured_products),
    path('new-arrivals/', views.new_arrivals),
    path('best-sellers/', views.best_sellers),
    path('categories/', views.CategoryListView.as_view()),
    path('brands/', views.BrandListView.as_view()),
    path('<slug:slug>/', views.ProductDetailView.as_view()),
]