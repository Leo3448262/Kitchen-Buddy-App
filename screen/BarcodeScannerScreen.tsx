// screens/BarcodeScannerScreen.tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    BarcodeScanningResult,
    CameraType,
    CameraView,
    useCameraPermissions,
} from 'expo-camera';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function BarcodeScannerScreen() {
  /* ─── state & nav ─────────────────────────────── */
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [facing] = useState<CameraType>('back');
  const navigation = useNavigation();
  const route = useRoute();
  const onScanSuccess = (route.params as any)?.onScanSuccess;

  /* ─── permissions UI ──────────────────────────── */
  if (!permission) return <View />; // still checking

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>We need camera access to scan barcodes.</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  /* ─── scan handler ────────────────────────────── */
  const handleBarcodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      const json = await res.json();

      if (json.status !== 1) {
        Alert.alert('Product not found', 'Try another barcode.');
        setScanned(false);
        return;
      }

      const p = json.product;
      const parsed = {
        name: p.product_name || 'Unnamed product',
        category: p.categories_tags?.[0]?.replace(/^en:/, '') ?? 'misc',
        location: 'fridge',
      };

      onScanSuccess?.(parsed);
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Could not fetch product data.');
      setScanned(false);
    }
  };

  /* ─── preview ─────────────────────────────────── */
  return (
    <View style={styles.flex}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing={'back'}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_e', 'upc_a'],
        }}
      />

      {scanned && (
        <View style={styles.overlay}>
          <Button title="Scan again" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

/* ─── styles ────────────────────────────────────── */
const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
