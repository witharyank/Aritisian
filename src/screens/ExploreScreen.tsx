import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { theme } from '../theme';
import { RootStackParamList, MainTabParamList } from '../types';
import { REELS } from '../data/reels';
import { ARTISANS } from '../data/artisans';
import { useProducts } from '../context/ProductContext';

const { height, width } = Dimensions.get('window');

type ExploreScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Explore'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: ExploreScreenNavigationProp;
}

export default function ExploreScreen({ navigation }: Props) {
  const { products } = useProducts();

  const renderReel = ({ item: reel }: { item: typeof REELS[0] }) => {
    const artisan = ARTISANS.find(a => a.id === reel.artisanId);
    const product = products.find(p => p.id === reel.linkedProductId);

    return (
      <View style={styles.reelContainer}>
        {/* Placeholder for video -> uses high quality image for demo */}
        <Image source={{ uri: reel.thumbnailUrl }} style={styles.backgroundMedia} />
        
        {/* Overlay */}
        <View style={styles.overlay}>
          {/* Top Actions */}
          <View style={styles.topActions}>
            <Text style={styles.headerTitle}>Stories</Text>
          </View>

          {/* Bottom Content */}
          <View style={styles.bottomContent}>
            <View style={styles.mainInfo}>
              <View style={styles.artisanRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{artisan?.name.charAt(0)}</Text>
                </View>
                <Text style={styles.artisanName}>{artisan?.name}</Text>
              </View>
              <Text style={styles.title}>{reel.title}</Text>
              <Text style={styles.description}>{reel.description}</Text>
              
              {/* Audio Track Mock */}
              <View style={styles.audioRow}>
                <Ionicons name="musical-notes" size={16} color="#fff" />
                <Text style={styles.audioText}>Original Audio - {artisan?.craft}</Text>
              </View>
            </View>

            {/* Right Actions */}
            <View style={styles.rightActions}>
              <TouchableOpacity style={styles.actionIcon}>
                <Ionicons name="heart" size={32} color="#fff" />
                <Text style={styles.actionText}>{Math.floor(reel.likes / 1000)}k</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIcon}>
                <Ionicons name="chatbubble-outline" size={30} color="#fff" />
                <Text style={styles.actionText}>245</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIcon}>
                <Ionicons name="share-social-outline" size={32} color="#fff" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Shop This Product Card */}
          {product && (
            <TouchableOpacity 
              style={styles.shopCard} 
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
            >
              <Image source={{ uri: product.images[0] }} style={styles.shopImage} />
              <View style={styles.shopInfo}>
                <Text style={styles.shopTitle} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.shopPrice}>₹{product.price.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.shopButton}>
                <Text style={styles.shopButtonText}>Shop This Product</Text>
                <Ionicons name="chevron-forward" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={REELS}
        keyExtractor={item => item.id}
        renderItem={renderReel}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height - 90} // approximate height minus bottom tab
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelContainer: {
    width,
    height: height - 80, // Adjust for bottom tab area roughly
    position: 'relative',
  },
  backgroundMedia: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.85, // slight dim
  },
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  mainInfo: {
    flex: 1,
    paddingRight: 20,
  },
  artisanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  artisanName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    color: '#eee',
    fontSize: 14,
    marginBottom: 12,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 12,
  },
  rightActions: {
    alignItems: 'center',
  },
  actionIcon: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 4,
    fontSize: 12,
  },
  shopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 8,
    borderRadius: 12,
  },
  shopImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  shopInfo: {
    flex: 1,
  },
  shopTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  shopPrice: {
    fontSize: 12,
    color: theme.colors.primary,
    marginTop: 2,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  }
});
