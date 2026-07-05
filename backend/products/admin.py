from django.contrib import admin
from .models import Category, Brand, Product, ProductImage, ProductVariant

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 4

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name','brand','category','price','sale_price','stock','is_featured','is_new_arrival']
    list_filter = ['category','brand','gender','is_featured','is_new_arrival','is_best_seller']
    list_editable = ['price','sale_price','stock','is_featured','is_new_arrival']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, ProductVariantInline]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}