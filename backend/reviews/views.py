from rest_framework import generics, permissions
from .models import Review
from .serializers import ReviewSerializer

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    def get_permissions(self):
        return [permissions.IsAuthenticated()] if self.request.method == 'POST' else []
    def get_queryset(self):
        return Review.objects.filter(product_id=self.kwargs['product_id'])
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, product_id=self.kwargs['product_id'])