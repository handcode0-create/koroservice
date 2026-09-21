import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Colors } from '@/constants/theme';

type NavItem = {
  route: '/' | '/demandes' | '/profil';
  label: string;
  icon: string;
};

const items: NavItem[] = [
  { route: '/', label: 'Accueil', icon: 'house.fill' },
  { route: '/demandes', label: 'Demandes', icon: 'doc.text.fill' },
  { route: '/profil', label: 'Profil', icon: 'person.fill' },
];

export function KoroBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = Colors.light;

  return (
    <View style={[styles.bar, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
      <NavButton item={items[0]} active={pathname === '/'} onPress={() => router.replace('/')} />
      <NavButton
        item={items[1]}
        active={pathname === '/demandes'}
        onPress={() => router.replace('/demandes')}
      />

      <Pressable
        onPress={() => router.push('/demandes')}
        style={({ pressed }) => [styles.plusButton, pressed && styles.pressed]}>
        <Text style={styles.plusText}>+</Text>
      </Pressable>

      <NavButton item={{ route: '/', label: 'Messages', icon: 'message.fill' }} active={false} onPress={() => {}} />
      <NavButton
        item={items[2]}
        active={pathname === '/profil'}
        onPress={() => router.replace('/profil')}
      />
    </View>
  );
}

function NavButton({
  item,
  active,
  onPress,
}: {
  item: NavItem;
  active: boolean;
  onPress: () => void;
}) {
  const color = active ? Colors.light.primary : Colors.light.textSecondary;

  return (
    <Pressable onPress={onPress} style={styles.navButton}>
      <SymbolView
        size={20}
        tintColor={color}
        name={{
          ios: item.icon as any,
          android: item.icon as any,
          web: item.icon as any,
        }}
      />
      <Text style={[styles.navLabel, { color }]}>{item.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    zIndex: 100,
    elevation: 8,
  },
  navButton: {
    width: 66,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 9,
    fontWeight: '800',
  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    borderWidth: 4,
    borderColor: Colors.light.background,
    shadowColor: '#0B1220',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  plusText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '500',
    marginTop: -2,
  },
  pressed: {
    opacity: 0.8,
  },
});
