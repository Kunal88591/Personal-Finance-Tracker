from rest_framework import serializers
from .models import Budget
from transactions.models import Transaction
from django.db.models import Sum


class BudgetSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_color = serializers.CharField(source='category.color', read_only=True)
    spent = serializers.SerializerMethodField()
    percentage = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = ('id', 'category', 'category_name', 'category_color', 'amount',
                  'period', 'start_date', 'end_date', 'spent', 'percentage',
                  'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_spent(self, obj):
        spent = Transaction.objects.filter(
            user=obj.user,
            category=obj.category,
            type='expense',
            date__gte=obj.start_date,
            date__lte=obj.end_date
        ).aggregate(total=Sum('amount'))['total']
        return spent or 0

    def get_percentage(self, obj):
        spent = self.get_spent(obj)
        if obj.amount > 0:
            return round((spent / obj.amount) * 100, 2)
        return 0

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def validate(self, data):
        if data.get('category'):
            if data['category'].user != self.context['request'].user:
                raise serializers.ValidationError("You can only use your own categories.")
            if data['category'].type != 'expense':
                raise serializers.ValidationError("Budgets can only be set for expense categories.")
        if data.get('start_date') and data.get('end_date'):
            if data['start_date'] > data['end_date']:
                raise serializers.ValidationError("Start date must be before end date.")
        return data
