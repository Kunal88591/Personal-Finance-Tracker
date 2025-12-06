from django.db import models
from django.contrib.auth import get_user_model
from transactions.models import Category

User = get_user_model()


class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='budgets')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    period = models.CharField(max_length=20, choices=[
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    ], default='monthly')
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'category', 'start_date', 'end_date']

    def __str__(self):
        return f"{self.category.name} - {self.amount} ({self.period})"
