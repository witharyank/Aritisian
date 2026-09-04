import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Category } from '../types';
import { theme } from '../theme';

interface Props {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: category.imageUrl }} style={styles.image} />
      <View style={styles.overlay} />
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    marginRight: theme.spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  name: {
    color: '#fff',
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
    textAlign: 'center',
    paddingHorizontal: 4,
  }
});
