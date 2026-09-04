import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

import { theme } from '../theme';
import { RootStackParamList, MainTabParamList } from '../types';
import { CATEGORIES } from '../data/categories';
import { useProducts } from '../context/ProductContext';
import { REELS } from '../data/reels';

import SectionHeader from '../components/SectionHeader';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import ReelPreviewCard from '../components/ReelPreviewCard';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const { products } = useProducts();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste,</Text>
            <Text style={styles.brand}>Artisan Haven</Text>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.text} style={styles.icon} />
            <View style={styles.avatar} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={theme.colors.textLight} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search handmade treasures..."
            placeholderTextColor={theme.colors.textLight}
          />
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Every Craft Has a Story.</Text>
          <Text style={styles.heroSubtitle}>Discover authentic handmade creations directly from the artisans who make them.</Text>
        </View>

        {/* Categories */}
        <SectionHeader title="Categories" actionText="See All" />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
          data={CATEGORIES}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CategoryCard category={item} onPress={() => {}} />}
        />

        <View style={styles.spacer} />

        {/* Featured Products */}
        <SectionHeader title="Featured Products" />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
          data={products.filter(p => p.featured)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProductCard 
              product={item} 
              onPress={() => navigation.navigate('ProductDetails', { productId: item.id })} 
            />
          )}
        />

        <View style={styles.spacer} />

        {/* Artisan Stories / Reels */}
        <SectionHeader 
          title="See How It's Made" 
          subtitle="Watch the hands and stories behind every creation." 
          actionText="Explore Stories →"
          onActionPress={() => navigation.navigate('Explore')}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
          data={REELS.slice(0, 2)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ReelPreviewCard 
              reel={item} 
              onPress={() => navigation.navigate('Explore')} 
            />
          )}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  greeting: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textLight,
  },
  brand: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.secondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
  },
  hero: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.secondary,
    borderRadius: 16,
  },
  heroTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  heroSubtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
    lineHeight: 20,
  },
  listPadding: {
    paddingHorizontal: theme.spacing.md,
  },
  spacer: {
    height: theme.spacing.xl,
  },
  bottomSpacer: {
    height: 40,
  }
});
