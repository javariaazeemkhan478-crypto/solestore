from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='categories/', blank=True)
    description = models.TextField(blank=True)
    def __str__(self): return self.name
    class Meta: verbose_name_plural = 'Categories'

class Brand(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    logo = models.ImageField(upload_to='brands/', blank=True)
    def __str__(self): return self.name

class Product(models.Model):
    GENDER_CHOICES = [('M','Men'),('W','Women'),('K','Kids'),('U','Unisex')]
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='U')
    is_featured = models.BooleanField(default=False)
    is_new_arrival = models.BooleanField(default=False)
    is_best_seller = models.BooleanField(default=False)
    stock = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self): return self.name
    @property
    def discount_percentage(self):
        if self.sale_price:
            return int(((self.price - self.sale_price) / self.price) * 100)
        return 0

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    is_primary = models.BooleanField(default=False)
    alt_text = models.CharField(max_length=200, blank=True)

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    size = models.CharField(max_length=10)
    color = models.CharField(max_length=50)
    color_hex = models.CharField(max_length=7, default='#000000')
    stock = models.IntegerField(default=0)
    def __str__(self): return f"{self.product.name} - {self.size} - {self.color}"