import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const theme = Colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: theme.background,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          height: 70,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => (
            <SymbolView
              size={20}
              tintColor={color}
              name={{
                ios: 'house.fill',
                android: 'home',
                web: 'home',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="demandes"
        options={{
          title: 'Demandes',
          tabBarIcon: ({ color }) => (
            <SymbolView
              size={20}
              tintColor={color}
              name={{
                ios: 'doc.text.fill',
                android: 'description',
                web: 'description',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <SymbolView
              size={20}
              tintColor={color}
              name={{
                ios: 'person.fill',
                android: 'person',
                web: 'person',
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
