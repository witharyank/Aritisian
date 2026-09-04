import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

interface Props {
  visible: boolean;
}

export default function ImageEnhancementModal({ visible }: Props) {
  const [step, setStep] = useState(0);

  const steps = [
    "Preparing your image...",
    "Detecting the product...",
    "Cleaning the background...",
    "Improving lighting...",
    "Optimizing for your catalog..."
  ];

  useEffect(() => {
    if (visible) {
      setStep(0);
      const interval = setInterval(() => {
        setStep(s => (s < steps.length - 1 ? s + 1 : s));
      }, 600); // cycle through messages during the 3s mock delay
      
      return () => clearInterval(interval);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.title}>AI Image Studio</Text>
          <Text style={styles.message}>{steps[step]}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: theme.spacing.xl,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  message: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textLight,
    textAlign: 'center',
  }
});
