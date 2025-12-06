from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from transactions.models import Category

User = get_user_model()


class Command(BaseCommand):
    help = 'Create default categories for all users'

    def handle(self, *args, **kwargs):
        # Default income categories
        income_categories = [
            {'name': 'Salary', 'icon': '💰', 'color': '#10b981'},
            {'name': 'Freelance', 'icon': '💼', 'color': '#059669'},
            {'name': 'Investment', 'icon': '📈', 'color': '#34d399'},
            {'name': 'Gift', 'icon': '🎁', 'color': '#6ee7b7'},
        ]

        # Default expense categories
        expense_categories = [
            {'name': 'Food', 'icon': '🍔', 'color': '#ef4444'},
            {'name': 'Transport', 'icon': '🚗', 'color': '#f59e0b'},
            {'name': 'Housing', 'icon': '🏠', 'color': '#8b5cf6'},
            {'name': 'Entertainment', 'icon': '🎬', 'color': '#ec4899'},
            {'name': 'Shopping', 'icon': '🛒', 'color': '#f43f5e'},
            {'name': 'Healthcare', 'icon': '💊', 'color': '#06b6d4'},
            {'name': 'Education', 'icon': '🎓', 'color': '#3b82f6'},
            {'name': 'Utilities', 'icon': '⚡', 'color': '#fbbf24'},
        ]

        users = User.objects.all()
        for user in users:
            # Create income categories
            for cat_data in income_categories:
                Category.objects.get_or_create(
                    user=user,
                    name=cat_data['name'],
                    type='income',
                    defaults={
                        'icon': cat_data['icon'],
                        'color': cat_data['color']
                    }
                )
            
            # Create expense categories
            for cat_data in expense_categories:
                Category.objects.get_or_create(
                    user=user,
                    name=cat_data['name'],
                    type='expense',
                    defaults={
                        'icon': cat_data['icon'],
                        'color': cat_data['color']
                    }
                )
            
            self.stdout.write(
                self.style.SUCCESS(f'Created default categories for user: {user.username}')
            )
