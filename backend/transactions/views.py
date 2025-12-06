from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count
from django.db.models.functions import TruncMonth
from datetime import datetime, timedelta
from .models import Category, Transaction
from .serializers import CategorySerializer, TransactionSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Transaction.objects.filter(user=self.request.user)
        
        # Filter by type
        transaction_type = self.request.query_params.get('type', None)
        if transaction_type:
            queryset = queryset.filter(type=transaction_type)
        
        # Filter by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category_id=category)
        
        # Filter by date range
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        
        return queryset

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get income, expense, and balance summary"""
        queryset = self.get_queryset()
        
        income = queryset.filter(type='income').aggregate(total=Sum('amount'))['total'] or 0
        expense = queryset.filter(type='expense').aggregate(total=Sum('amount'))['total'] or 0
        balance = income - expense
        
        return Response({
            'income': income,
            'expense': expense,
            'balance': balance
        })

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get transactions grouped by category"""
        queryset = self.get_queryset()
        
        by_category = queryset.values(
            'category__name', 'category__color', 'category__icon', 'type'
        ).annotate(
            total=Sum('amount'),
            count=Count('id')
        ).order_by('-total')
        
        return Response(by_category)

    @action(detail=False, methods=['get'])
    def monthly_trend(self, request):
        """Get monthly income and expense trend"""
        # Get last 6 months
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=180)
        
        queryset = Transaction.objects.filter(
            user=request.user,
            date__gte=start_date,
            date__lte=end_date
        )
        
        monthly_data = queryset.annotate(
            month=TruncMonth('date')
        ).values('month', 'type').annotate(
            total=Sum('amount')
        ).order_by('month')
        
        return Response(monthly_data)
