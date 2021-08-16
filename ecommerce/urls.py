from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.index, name='index'),
    path('shop/', views.goShop, name='shop'),
    path('cart/', views.goCart, name='cart'),
    path('profile/', views.goProfile, name='profile'),
    path('shop/<int:id>', views.detail)
]