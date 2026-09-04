import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { theme } from '../theme';
import { RootStackParamList } from '../types';
import { ARTISANS } from '../data/artisans';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import ArtisanCard from '../components/ArtisanCard';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const { addToCart } = useCart();
  const { getProductById } = useProducts();
  
  const product = getProductById(productId);
  const artisan = ARTISANS.find(a => a.id === product?.artisanId);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    // Optional: show toast or feedback
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* Top Gallery */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.images[0] }} style={styles.image} />
          
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Product Info */}
          <View style={styles.header}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.title}>{product.name}</Text>
            
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#f39c12" />
              <Text style={styles.rating}>{product.rating} ({product.reviewCount} reviews)</Text>
            </View>
          </View>

          {/* Craft Details */}
          <View style={styles.detailsBox}>
            <View style={styles.detailRow}>
              <Ionicons name="cut-outline" size={18} color={theme.colors.textLight} />
              <Text style={styles.detailText}>Material: {product.material}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="hand-left-outline" size={18} color={theme.colors.textLight} />
              <Text style={styles.detailText}>Craft: {product.craftType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={18} color={theme.colors.textLight} />
              <Text style={styles.detailText}>Origin: {product.location}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>About this piece</Text>
          <Text style={styles.description}>{product.fullDescription}</Text>

          {/* Artisan */}
          <Text style={styles.sectionTitle}>Meet the Artisan</Text>
          {artisan && <ArtisanCard artisan={artisan} />}
          
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View style={styles.stickyBottom}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.secondary,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  category: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textLight,
    marginLeft: 4,
  },
  detailsBox: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
  bottomSpacer: {
    height: 80,
  },
  stickyBottom: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textLight,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  originalPrice: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  addToCartBtn: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  }
});
