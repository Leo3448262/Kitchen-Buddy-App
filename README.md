# 🍽️ React Native Kitchen Buddy APP

A React Native app built with **Expo Router** and **TypeScript** that helps users manage kitchen ingredients efficiently. The app includes features such as ingredient tracking, barcode scanning, sorting, and filtering by location or expiry.

## 📁 Project Structure

.
├── app/ # Expo Router pages (entry point is app/index.tsx)
├── src/
│ └── components/
│ └── ui/ # Manually implemented Gluestack UI components
├── screens/ # All screen components
│ ├── AddIngredient/
│ ├── BarcodeScannerScreen/
│ ├── BottomTabs/ # Bottom tab navigation setup
│ ├── ExpiringSoon/
│ ├── IngredientsByLocation/
│ ├── ListIngredients/
│ ├── MissingData/
│ └── SortingIngredient/
├── utils/
│ └── storage.tsx # AsyncStorage utility functions
├── tailwind.config.js # NativeWind configuration
└── ...

## 🧱 UI Components

Custom Gluestack UI components were manually created and stored under:
src/components/ui/
Used components:

- `Box`
- `Button`
- `Card`
- `Checkbox`
- `FormControl`
- `Heading`
- `Icon`
- `Input`
- `Select`
- `Text`
- `VStack`

## 💾 Persistent Storage

Used `AsyncStorage` for data persistence. Logic is implemented in:
utils/storage.tsx

## 🎨 Styling

The app uses **NativeWind** for utility-first styling with Tailwind CSS syntax in React Native.

> Tailwind config is defined in `tailwind.config.js`.

## 🔍 Features

- ✅ Add new ingredients manually
- 📷 Scan barcodes (BarcodeScannerScreen)
- 📦 View ingredients by location
- 🗓️ See ingredients expiring soon
- ⚠️ Detect missing data
- 🔃 Sort ingredients
- 🔄 Bottom tab navigation for easy access

## 🛠️ Technologies Used

- [React Native](https://reactnative.dev/)
- [Expo Router](https://expo.github.io/router/)
- [TypeScript](https://www.typescriptlang.org/)
- [Gluestack UI](https://ui.gluestack.io/)
- [NativeWind](https://www.nativewind.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## 🚀 Getting Started
