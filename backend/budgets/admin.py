from django.contrib import admin
from .models import Budget


@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'amount', 'period', 'start_date', 'end_date')
    list_filter = ('period', 'start_date')
    search_fields = ('user__username', 'category__name')
