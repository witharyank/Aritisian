import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

import { theme } from '../theme';
import { RootStackParamList, MainTabParamList, AIGeneratedCatalog, PriceSuggestion, Product } from '../types';
import { useProducts } from '../context/ProductContext';
import { catalogService } from '../services/catalogService';
import { pricingService } from '../services/pricingService';
import { voiceService } from '../services/voiceService';
import { imageEnhancementService, EnhancedImageResult } from '../services/imageEnhancementService';

import ProductImagePicker from '../components/studio/ProductImagePicker';
import ImageStudioPreview from '../components/studio/ImageStudioPreview';
import VoiceRecorder from '../components/studio/VoiceRecorder';
import AIProcessingModal from '../components/studio/AIProcessingModal';
import ImageEnhancementModal from '../components/studio/ImageEnhancementModal';
import PriceSuggestionCard from '../components/studio/PriceSuggestionCard';

type AIStudioNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'AI Studio'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: AIStudioNavigationProp;
}

type WorkflowState = 'idle' | 'image-studio' | 'processing' | 'review';

export default function AIStudioScreen({ navigation }: Props) {
  const { addProduct } = useProducts();
  
  // Workflow State
  const [workflowState, setWorkflowState] = useState<WorkflowState>('idle');
  const [processingMessage, setProcessingMessage] = useState('');
  const [enhancingImage, setEnhancingImage] = useState(false);
  
  // Form State
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [enhancedResult, setEnhancedResult] = useState<EnhancedImageResult | null>(null);
  const [finalImageUri, setFinalImageUri] = useState<string | null>(null);
  const [voiceUri, setVoiceUri] = useState<string | null>(null);
  const [manualDescription, setManualDescription] = useState('');
  
  // AI Generated State
  const [catalog, setCatalog] = useState<AIGeneratedCatalog | null>(null);
  const [pricing, setPricing] = useState<PriceSuggestion | null>(null);

  // Editable Form State
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editMaterial, setEditMaterial] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const handleImageSelected = (uri: string) => {
    setImageUri(uri);
    setEnhancedResult(null);
    setWorkflowState('image-studio');
  };

  const handleEnhanceImage = async () => {
    if (!imageUri) return;
    setEnhancingImage(true);
    const result = await imageEnhancementService.enhanceProductImage(imageUri);
    setEnhancingImage(false);

    if (result.success && result.data) {
      setEnhancedResult(result.data);
    } else {
      Alert.alert('Enhancement Notice', result.error || 'Failed to enhance image.');
    }
  };

  const handleConfirmImage = (uri: string) => {
    setFinalImageUri(uri);
    setWorkflowState('idle'); // Proceed to catalog generation inputs
  };

  const handleCancelImage = () => {
    setImageUri(null);
    setEnhancedResult(null);
    setFinalImageUri(null);
    setWorkflowState('idle');
  };

  const handleGenerate = async () => {
    if (!finalImageUri) {
      Alert.alert("Image Required", "Please select or take a product photo to continue.");
      return;
    }

    setWorkflowState('processing');
    setProcessingMessage('Analyzing product details...');

    let artisanInput = manualDescription.trim() || "Please generate a generic catalog for a traditional Indian handicraft.";
    
    if (voiceUri) {
      setProcessingMessage('Transcribing voice description...');
      const transcriptResult = await voiceService.transcribeAudio(voiceUri);
      if (transcriptResult.success && transcriptResult.data) {
        artisanInput = transcriptResult.data;
      }
    }

    setProcessingMessage('Generating structured catalog...');
    const catalogResult = await catalogService.generateProductCatalog(artisanInput);
    
    if (!catalogResult.success || !catalogResult.data) {
      Alert.alert("AI Error", "Could not generate catalog. Switching to manual entry.");
      setCatalog({
        productName: '', category: 'Other', material: '', craftType: '', englishDescription: '', hindiDescription: '', keywords: []
      });
    } else {
      setCatalog(catalogResult.data);
      setEditTitle(catalogResult.data.productName);
      setEditDesc(catalogResult.data.englishDescription);
      setEditCategory(catalogResult.data.category);
      setEditMaterial(catalogResult.data.material);
    }

    setProcessingMessage('Preparing price suggestions...');
    const cat = catalogResult.data?.category || 'Other';
    const mat = catalogResult.data?.material || 'Mixed';
    const craft = catalogResult.data?.craftType || 'Handmade';
    
    const priceResult = await pricingService.getSuggestedPrice(cat, mat, craft);
    if (priceResult.success && priceResult.data) {
      setPricing(priceResult.data);
      setEditPrice(priceResult.data.suggestedPrice.toString());
    }

    setWorkflowState('review');
  };

  const handleSave = () => {
    if (!editTitle || !editPrice || !finalImageUri) {
      Alert.alert("Missing Details", "Please ensure title, price, and image are provided.");
      return;
    }

    const newProduct: Product = {
      id: `p${Math.random().toString(36).substr(2, 9)}`,
      name: editTitle,
      shortDescription: editDesc.split('.')[0] + '.',
      fullDescription: editDesc,
      price: parseInt(editPrice, 10) || 0,
      category: editCategory,
      images: [finalImageUri],
      artisanId: 'a1', 
      artisanName: 'Ramesh Kumar',
      location: 'Varanasi, Uttar Pradesh', 
      material: editMaterial,
      craftType: catalog?.craftType || 'Handmade',
      rating: 5.0,
      reviewCount: 0,
      stock: 1,
      tags: catalog?.keywords || [],
      featured: false,
    };

    addProduct(newProduct);
    
    setWorkflowState('idle');
    setImageUri(null);
    setEnhancedResult(null);
    setFinalImageUri(null);
    setVoiceUri(null);
    
    navigation.navigate('ProductDetails', { productId: newProduct.id });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>AI Artisan Studio</Text>
          <Text style={styles.subtitle}>Digitize your craft in seconds using AI.</Text>
        </View>

        {workflowState === 'image-studio' && imageUri && (
          <ImageStudioPreview 
            originalUri={imageUri} 
            enhancedResult={enhancedResult}
            onEnhance={handleEnhanceImage}
            onConfirm={handleConfirmImage}
            onCancel={handleCancelImage}
          />
        )}

        {workflowState === 'idle' && (
          <View style={styles.stepContainer}>
            {!finalImageUri ? (
              <ProductImagePicker onImageSelected={handleImageSelected} />
            ) : (
              <View style={styles.finalImageContainer}>
                <Text style={styles.label}>Selected Product Image</Text>
                <View style={styles.thumbnailWrapper}>
                  <TouchableOpacity style={styles.thumbnailClose} onPress={handleCancelImage}>
                    <Ionicons name="close-circle" size={24} color={theme.colors.error} />
                  </TouchableOpacity>
                  <View style={styles.thumbnailBox} />
                  <Text style={styles.thumbnailText}>Image Ready ✨</Text>
                </View>
              </View>
            )}

            <VoiceRecorder onRecordingComplete={setVoiceUri} />
            
            <Text style={[styles.label, { marginTop: theme.spacing.lg }]}>Or describe manually:</Text>
            <TextInput 
              style={styles.inputMulti} 
              placeholder="E.g., A handwoven blue silk saree from Banaras..."
              placeholderTextColor={theme.colors.textLight}
              value={manualDescription}
              onChangeText={setManualDescription}
              multiline
            />

            <TouchableOpacity 
              style={[styles.generateButton, !finalImageUri && { opacity: 0.5 }]} 
              onPress={handleGenerate}
              disabled={!finalImageUri}
            >
              <Ionicons name="sparkles" size={24} color="#fff" style={styles.btnIcon} />
              <Text style={styles.generateBtnText}>Generate with AI</Text>
            </TouchableOpacity>
          </View>
        )}

        {workflowState === 'review' && (
          <View style={styles.reviewContainer}>
            <View style={styles.reviewHeader}>
              <Ionicons name="checkmark-circle" size={28} color={theme.colors.success} />
              <Text style={styles.reviewTitle}>Catalog Generated!</Text>
            </View>

            {pricing && <PriceSuggestionCard suggestion={pricing} />}

            <Text style={styles.label}>Product Title</Text>
            <TextInput style={styles.input} value={editTitle} onChangeText={setEditTitle} />

            <Text style={styles.label}>Price (₹)</Text>
            <TextInput style={styles.input} value={editPrice} onChangeText={setEditPrice} keyboardType="numeric" />

            <Text style={styles.label}>Category</Text>
            <TextInput style={styles.input} value={editCategory} onChangeText={setEditCategory} />

            <Text style={styles.label}>Material</Text>
            <TextInput style={styles.input} value={editMaterial} onChangeText={setEditMaterial} />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.inputMulti} value={editDesc} onChangeText={setEditDesc} multiline />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save Product</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={() => setWorkflowState('idle')}>
              <Text style={styles.cancelBtnText}>Discard & Start Over</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
      </KeyboardAvoidingView>
      <AIProcessingModal visible={workflowState === 'processing'} message={processingMessage} />
      <ImageEnhancementModal visible={enhancingImage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: 40,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textLight,
  },
  stepContainer: {
    flex: 1,
  },
  generateButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnIcon: {
    marginRight: 8,
  },
  generateBtnText: {
    color: '#fff',
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
  },
  reviewContainer: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  reviewTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.success,
    marginLeft: 8,
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  inputMulti: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
  },
  cancelButton: {
    padding: theme.spacing.md,
    borderRadius: 24,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: theme.colors.textLight,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
  finalImageContainer: {
    marginBottom: theme.spacing.xl,
  },
  thumbnailWrapper: {
    position: 'relative',
    height: 120,
    backgroundColor: theme.colors.secondary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.success,
  },
  thumbnailBox: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 16,
  },
  thumbnailClose: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  thumbnailText: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: 'bold',
    color: theme.colors.success,
  }
});
