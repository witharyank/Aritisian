import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { imageService } from '../../services/imageService';

interface Props {
  onImageSelected: (uri: string) => void;
}

export default function ProductImagePicker({ onImageSelected }: Props) {
  
  const handleGallery = async () => {
    const result = await imageService.pickImageFromGallery();
    if (result.success && result.data) {
      onImageSelected(result.data);
    } else if (result.error && result.error !== 'Image selection was canceled.') {
      Alert.alert("Permission Error", result.error);
    }
  };

  const handleCamera = async () => {
    const result = await imageService.takePhotoWithCamera();
    if (result.success && result.data) {
      onImageSelected(result.data);
    } else if (result.error && result.error !== 'Camera capture was canceled.') {
      Alert.alert("Permission Error", result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Photo</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCamera} activeOpacity={0.8}>
          <Ionicons name="camera" size={32} color={theme.colors.primary} />
          <Text style={styles.actionText}>Take Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleGallery} activeOpacity={0.8}>
          <Ionicons name="images" size={32} color={theme.colors.primary} />
          <Text style={styles.actionText}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    height: 120,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  actionText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.primary,
    marginTop: theme.spacing.sm,
  }
});
