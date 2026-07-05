from rest_framework import generics, permissions
from .models import Order
from .serializers import OrderSerializer, CreateOrderSerializer

class OrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')
    def get_serializer_class(self):
        return CreateOrderSerializer if self.request.method == 'POST' else OrderSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)