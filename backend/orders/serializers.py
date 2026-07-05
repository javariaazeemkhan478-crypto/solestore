from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductListSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    subtotal = serializers.ReadOnlyField()
    class Meta:
        model = OrderItem
        fields = ['id','product','product_id','variant','quantity','price','subtotal']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['user','created_at']

class CreateOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ['shipping_address','city','postal_code','country','phone','total_price','items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(user=self.context['request'].user, **validated_data)
        for item in items_data:
            product_id = item.pop('product_id')
            OrderItem.objects.create(order=order, product_id=product_id, **item)
        return order