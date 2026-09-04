import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { EnhancedImageResult } from '../../services/imageEnhancementService';

interface Props {
  originalUri: string;
  enhancedResult: EnhancedImageResult | null;
  onEnhance: () => void;
  onConfirm: (uri: string) => void;
  onCancel: () => void;
}

export default function ImageStudioPreview({ originalUri, enhancedResult, onEnhance, onConfirm, onCancel }: Props) {
  const [showEnhanced, setShowEnhanced] = useState(true);

  const displayUri = (enhancedResult && showEnhanced) ? enhancedResult.enhancedUri : originalUri;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: displayUri }} style={styles.image} />
        
        <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>

        {enhancedResult && (
          <TouchableOpacity 
            style={styles.toggleButton} 
            onPress={() => setShowEnhanced(!showEnhanced)}
          >
            <Ionicons name="swap-horizontal" size={20} color="#fff" />
            <Text style={styles.toggleText}>
              Showing: {showEnhanced ? 'Enhanced' : 'Original'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.controls}>
        {!enhancedResult ? (
          <>
            <TouchableOpacity style={styles.primaryButton} onPress={onEnhance}>
              <Ionicons name="sparkles" size={20} color="#fff" style={styles.btnIcon} />
              <Text style={styles.primaryBtnText}>✨ Enhance Image</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={() => onConfirm(originalUri)}>
              <Text style={styles.secondaryBtnText}>Use Original</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.successText}>Image Improved!</Text>
            <View style={styles.pillContainer}>
              {enhancedResult.enhancementsApplied.map((enh, idx) => (
                <View key={idx} style={styles.pill}>
                  <Text style={styles.pillText}>{enh}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => onConfirm(showEnhanced ? enhancedResult.enhancedUri : originalUri)}>
              <Text style={styles.primaryBtnText}>
                Use {showEnhanced ? 'Enhanced' : 'Original'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: theme.colors.secondary,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  toggleText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  controls: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    width: '100%',
    padding: theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
  },
  secondaryButton: {
    width: '100%',
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: theme.colors.textLight,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
  btnIcon: {
    marginRight: 8,
  },
  successText: {
    color: theme.colors.success,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  pill: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 4,
  },
  pillText: {
    fontSize: 12,
    color: theme.colors.text,
  }
});
