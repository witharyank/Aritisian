import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Reel } from '../types';
import { theme } from '../theme';

interface Props {
  reel: Reel;
  onPress: () => void;
}

export default function ReelPreviewCard({ reel, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: reel.thumbnailUrl }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.playIconContainer}>
        <Ionicons name="play-circle" size={40} color="#fff" />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{reel.title}</Text>
        <Text style={styles.views}>{Math.floor(reel.views / 1000)}k views</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 200,
    marginRight: theme.spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.secondary,
  },
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  playIconContainer: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    color: '#fff',
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    marginBottom: 2,
  },
  views: {
    color: '#ddd',
    fontSize: 10,
  }
});
