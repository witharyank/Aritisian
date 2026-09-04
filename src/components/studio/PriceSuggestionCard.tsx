import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PriceSuggestion } from '../../types';
import { theme } from '../../theme';

interface Props {
  suggestion: PriceSuggestion;
}

export default function PriceSuggestionCard({ suggestion }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="sparkles" size={20} color={theme.colors.primary} />
        <Text style={styles.title}>AI Suggested Price</Text>
      </View>
      
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{suggestion.suggestedPrice.toLocaleString('en-IN')}</Text>
        <Text style={styles.range}>Range: ₹{suggestion.minPrice} - ₹{suggestion.maxPrice}</Text>
      </View>

      <Text style={styles.reasoning}>{suggestion.reasoning}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff3e0', // Subtle warm background
    borderRadius: 12,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#ffd54f',
    marginBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
    marginLeft: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.sm,
  },
  price: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginRight: 12,
  },
  range: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textLight,
  },
  reasoning: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
    lineHeight: 20,
    fontStyle: 'italic',
  }
});
