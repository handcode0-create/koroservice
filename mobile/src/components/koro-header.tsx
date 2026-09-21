import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export function KoroHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const theme = Colors.dark;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.nav, { backgroundColor: '#17233A' }]}>
        <Pressable onPress={() => router.replace('/')} style={styles.brandButton}>
          <View style={[styles.logo, { backgroundColor: theme.primary }]}>
            <Text style={styles.logoText}>K</Text>
          </View>
          <Text style={styles.brand}>Kôrô Services</Text>
        </Pressable>

        <Pressable onPress={() => router.replace('/')} style={pathname === '/' ? styles.navActive : styles.navItem}>
          <Text style={pathname === '/' ? styles.navActiveText : styles.navText}>Accueil</Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/demandes')}
          style={pathname === '/demandes' ? styles.navActive : styles.navItem}>
          <Text style={pathname === '/demandes' ? styles.navActiveText : styles.navText}>
            Demandes
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/profil')}
          style={pathname === '/profil' ? styles.navActive : styles.navItem}>
          <Text style={pathname === '/profil' ? styles.navActiveText : styles.navText}>
            Profil
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  nav: {
    width: '100%',
    maxWidth: 620,
    minHeight: 50,
    borderRadius: Radius.pill,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    paddingLeft: 5,
  },
  logo: {
    width: 27,
    height: 27,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  brand: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '900',
  },
  navItem: {
    minHeight: 36,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
    justifyContent: 'center',
  },
  navActive: {
    minHeight: 36,
    paddingHorizontal: 12,
    borderRadius: Radius.pill,
    backgroundColor: '#2553B4',
    justifyContent: 'center',
  },
  navText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  navActiveText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
});
