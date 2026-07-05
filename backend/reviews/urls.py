from django.urls import path
from . import views
urlpatterns = [
    path('<int:product_id>/', views.ReviewListCreateView.as_view()),
]