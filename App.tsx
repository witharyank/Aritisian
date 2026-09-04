import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import { ProductProvider } from './src/context/ProductContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductProvider>
        <CartProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </CartProvider>
      </ProductProvider>
    </SafeAreaProvider>
  );
}
