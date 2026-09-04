import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Artisan } from '../types';
import { theme } from '../theme';

interface Props {
  artisan: Artisan;
}

export default function ArtisanCard({ artisan }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{artisan.name.charAt(0)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{artisan.name}</Text>
          <Text style={styles.craft}>{artisan.craft}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={12} color={theme.colors.textLight} />
            <Text style={styles.location}>{artisan.location}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.bio}>{artisan.bio}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Artisan Shop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  avatarText: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
  },
  craft: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.primary,
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textLight,
    marginLeft: 4,
  },
  bio: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  button: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  buttonText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  }
});
