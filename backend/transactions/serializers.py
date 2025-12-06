from rest_framework import serializers
from .models import Category, Transaction


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'type', 'color', 'icon', 'created_at')
        read_only_fields = ('id', 'created_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_color = serializers.CharField(source='category.color', read_only=True)
    category_icon = serializers.CharField(source='category.icon', read_only=True)

    class Meta:
        model = Transaction
        fields = ('id', 'category', 'category_name', 'category_color', 'category_icon',
                  'amount', 'description', 'date', 'type', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def validate(self, data):
        if data.get('category'):
            if data['category'].user != self.context['request'].user:
                raise serializers.ValidationError("You can only use your own categories.")
            if data['category'].type != data.get('type'):
                raise serializers.ValidationError("Category type must match transaction type.")
        return data
