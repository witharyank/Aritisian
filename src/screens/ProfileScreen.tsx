import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' }} 
            style={styles.avatar} 
          />
          <Text style={styles.name}>Priya Sharma</Text>
          <Text style={styles.role}>Handicraft Enthusiast</Text>
          <Text style={styles.location}>Mumbai, India</Text>
        </View>

        {/* Action Menu */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="cube-outline" size={24} color={theme.colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>My Orders</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="heart-outline" size={24} color={theme.colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>Saved Products</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="location-outline" size={24} color={theme.colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>Shipping Addresses</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card-outline" size={24} color={theme.colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>Payment Methods</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color={theme.colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="information-circle-outline" size={24} color={theme.colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>About Artisan Haven</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footerSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  role: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.primary,
    marginTop: 4,
  },
  location: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  section: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  menuIcon: {
    marginRight: theme.spacing.md,
  },
  menuText: {
    flex: 1,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    fontWeight: theme.typography.weights.medium,
  },
  logoutButton: {
    marginTop: theme.spacing.xl,
    marginHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  logoutText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.error,
  },
  footerSpacer: {
    height: 40,
  }
});
