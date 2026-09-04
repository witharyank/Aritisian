import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { geminiService } from './geminiService';
import { ServiceResponse } from '../types';

let recordingInstance: Audio.Recording | null = null;

export const voiceService = {
  /**
   * Starts an audio recording session.
   */
  async startRecording(): Promise<ServiceResponse<void>> {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        return { success: false, error: 'Microphone permission not granted' };
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      recordingInstance = recording;
      return { success: true };
    } catch (error: any) {
      console.error('Failed to start recording', error);
      return { success: false, error: 'Failed to start recording' };
    }
  },

  /**
   * Stops the current recording and returns the local file URI.
   */
  async stopRecording(): Promise<ServiceResponse<string>> {
    if (!recordingInstance) {
      return { success: false, error: 'No active recording found' };
    }

    try {
      await recordingInstance.stopAndUnloadAsync();
      const uri = recordingInstance.getURI();
      recordingInstance = null;
      
      if (!uri) {
        throw new Error('Recording stopped but no URI returned');
      }

      return { success: true, data: uri };
    } catch (error: any) {
      console.error('Failed to stop recording', error);
      return { success: false, error: 'Failed to stop recording' };
    }
  },

  /**
   * Transcribes local audio file using Gemini API.
   * Assumes audio is in a compatible format (m4a/aac).
   */
  async transcribeAudio(audioUri: string): Promise<ServiceResponse<string>> {
    try {
      // Convert audio file to Base64
      const base64Audio = await FileSystem.readAsStringAsync(audioUri, {
        encoding: 'base64',
      });

      const mediaPart = {
        inlineData: {
          data: base64Audio,
          mimeType: 'audio/mp4', // Common MIME for expo-av HIGH_QUALITY output
        },
      };

      const prompt = `
Please transcribe the following audio speech. 
The speech might be in Hindi, English, or a mix of both.
If it is in Hindi, translate the final output to a clean English paragraph describing the product.
Do not include any conversational filler, just the core description of the product being spoken about.
      `;

      const transcribedText = await geminiService.generateContentWithMedia(prompt, [mediaPart]);
      
      return { success: true, data: transcribedText };
    } catch (error: any) {
      console.error('Audio Transcription Error:', error);
      return { success: false, error: error.message || 'Failed to transcribe audio' };
    }
  }
};
