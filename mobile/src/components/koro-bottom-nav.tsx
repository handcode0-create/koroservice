import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { KoroColors, KoroIconSize, KoroLayout, KoroRadius, KoroShadow, KoroTypography } from '@/design-system/tokens';

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
  const theme = KoroColors;

  return (
    <View style={[styles.bar, { backgroundColor: KoroColors.surface, borderTopColor: KoroColors.border }]}>
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
  const color = active ? KoroColors.blue : KoroColors.textSecondary;

  return (
    <Pressable onPress={onPress} style={styles.navButton}>
      <Ionicons
        name={
          item.icon === 'house.fill'
            ? 'home-outline'
            : item.icon === 'doc.text.fill'
              ? 'document-text-outline'
              : item.icon === 'message.fill'
                ? 'chatbubble-ellipses-outline'
                : 'person-outline'
        }
        size={KoroIconSize.sm}
        color={color}
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
    fontSize: KoroTypography.nav.fontSize,
    lineHeight: KoroTypography.nav.lineHeight,
    fontFamily: KoroTypography.nav.fontFamily,
    fontWeight: '800',
  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 28,

    backgroundColor: KoroColors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    borderWidth: 4,
    borderColor: KoroColors.background,
    shadowColor: KoroShadow.floating.shadowColor,
    shadowOpacity: KoroShadow.floating.shadowOpacity,
    shadowRadius: KoroShadow.floating.shadowRadius,
    shadowOffset: KoroShadow.floating.shadowOffset,
    elevation: KoroShadow.floating.elevation,
  },
  plusText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 32,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    marginTop: -2,
  },
  pressed: {
    opacity: 0.8,
  },
});
