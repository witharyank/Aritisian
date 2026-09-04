import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { voiceService } from '../../services/voiceService';

interface Props {
  onRecordingComplete: (uri: string) => void;
}

export default function VoiceRecorder({ onRecordingComplete }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  const handleRecord = async () => {
    if (isRecording) {
      // Stop recording
      const result = await voiceService.stopRecording();
      setIsRecording(false);
      if (result.success && result.data) {
        setHasRecorded(true);
        onRecordingComplete(result.data);
      }
    } else {
      // Start recording
      const result = await voiceService.startRecording();
      if (result.success) {
        setIsRecording(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Voice Description (Optional)</Text>
      <Text style={styles.subtext}>Describe your craft in Hindi or English</Text>

      <TouchableOpacity 
        style={[styles.recordButton, isRecording && styles.recordingActive]} 
        onPress={handleRecord}
        activeOpacity={0.8}
      >
        <Ionicons name={isRecording ? "stop" : "mic"} size={32} color={theme.colors.surface} />
      </TouchableOpacity>
      
      {isRecording && <Text style={styles.statusText}>Recording... Tap to stop</Text>}
      {!isRecording && hasRecorded && <Text style={styles.successText}>Voice recorded successfully!</Text>}
      {!isRecording && !hasRecorded && <Text style={styles.statusText}>Tap to record</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
  },
  subtext: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
    marginTop: 4,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  recordingActive: {
    backgroundColor: theme.colors.error,
  },
  statusText: {
    marginTop: theme.spacing.md,
    color: theme.colors.textLight,
    fontSize: theme.typography.sizes.sm,
  },
  successText: {
    marginTop: theme.spacing.md,
    color: theme.colors.success,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  }
});
