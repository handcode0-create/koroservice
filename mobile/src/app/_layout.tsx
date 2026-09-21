import { useFonts } from '@expo-google-fonts/poppins/useFonts';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: '#F7F8FA' }} />;
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="#F7F8FA" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
