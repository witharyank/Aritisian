import * as ImagePicker from 'expo-image-picker';
import { ServiceResponse } from '../types';

export const imageService = {
  /**
   * Requests gallery permissions and opens the image picker.
   */
  async pickImageFromGallery(): Promise<ServiceResponse<string>> {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        return {
          success: false,
          error: 'Permission to access gallery was denied.',
        };
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.8,
      });

      if (pickerResult.canceled) {
        return { success: false, error: 'Image selection was canceled.' };
      }

      return { success: true, data: pickerResult.assets[0].uri };
    } catch (error: any) {
      console.error('Image Picker Error:', error);
      return { success: false, error: error.message || 'Failed to pick image from gallery.' };
    }
  },

  /**
   * Requests camera permissions and opens the camera.
   */
  async takePhotoWithCamera(): Promise<ServiceResponse<string>> {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!permissionResult.granted) {
        return {
          success: false,
          error: 'Camera permission is needed to take a product photo.',
        };
      }

      const pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.8,
      });

      if (pickerResult.canceled) {
        return { success: false, error: 'Camera capture was canceled.' };
      }

      return { success: true, data: pickerResult.assets[0].uri };
    } catch (error: any) {
      console.error('Camera Error:', error);
      return { success: false, error: error.message || 'Failed to capture photo.' };
    }
  }
};
