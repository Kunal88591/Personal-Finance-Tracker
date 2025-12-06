from rest_framework import viewsets, permissions
from .models import Budget
from .serializers import BudgetSerializer


class BudgetViewSet(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Budget.objects.filter(user=self.request.user)
        
        # Filter by period
        period = self.request.query_params.get('period', None)
        if period:
            queryset = queryset.filter(period=period)
        
        return queryset
