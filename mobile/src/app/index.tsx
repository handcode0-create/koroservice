import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { KoroBottomNav } from '@/components/koro-bottom-nav';
import { KoroColors, KoroIconSize, KoroLayout, KoroRadius, KoroSpacing, KoroTypography } from '@/design-system/tokens';

const theme = KoroColors;

const SERVICES = [
  { icon: 'water-outline', title: 'Plomberie', color: '#1976FF' },
  { icon: 'flash-outline', title: 'Électricité', color: '#F59E0B' },
  { icon: 'snow-outline', title: 'Climatisation', color: '#2B7BFF' },
  { icon: 'color-palette-outline', title: 'Peinture', color: '#F97316' },
  { icon: 'sparkles-outline', title: 'Nettoyage', color: '#6B46C1' },
  { icon: 'leaf-outline', title: 'Jardinage', color: '#1FAF6A' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.topRow}>
            <View style={styles.identity}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>K</Text>
              </View>
              <View>
                <Text style={styles.greeting}>Bonjour,</Text>
                <Text style={styles.name}>Koffi 👋</Text>
              </View>
            </View>

            <Pressable style={styles.bell}>
              <Ionicons name="notifications-outline" size={21} color={theme.text} />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>

          <Text style={styles.question}>De quoi avez-vous besoin aujourd’hui ?</Text>

          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={19} color={theme.textSecondary} />
            <TextInput
              placeholder="Rechercher un service..."
              placeholderTextColor={theme.muted}
              style={styles.searchInput}
            />
          </View>

          <View style={styles.hero}>
            <Image
              source={require('@/assets/images/koro-banner-pros-verifies.png')}
              contentFit="cover"
              style={styles.bannerImage}
              accessibilityLabel="Professionnels Kôrô Services"
            />
            <View style={styles.heroShade} />
            <View style={styles.heroCopy}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeDot}>✓</Text>
                <Text style={styles.heroBadgeText}>Des pros vérifiés</Text>
              </View>
              <Text style={styles.heroTitle}>
                pour tous vos besoins
              </Text>
              <Pressable
                onPress={() => router.push('/demandes')}
                style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Faire une demande</Text>
                <Text style={styles.heroButtonArrow}>→</Text>
              </Pressable>
            </View>


          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Services populaires</Text>
              <Text style={styles.sectionSubtitle}>Choisissez un service</Text>
            </View>
            <Pressable onPress={() => router.push('/demandes')}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </Pressable>
          </View>

          <View style={styles.servicesGrid}>
            {Array.from({ length: 2 }).map((_, rowIndex) => (
              <View key={rowIndex} style={styles.servicesRow}>
                {SERVICES.slice(rowIndex * 3, rowIndex * 3 + 3).map((service) => (
              <Pressable key={service.title} onPress={() => router.push('/demandes')} style={styles.serviceCard}>
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '15' }]}>
                  <Ionicons name={service.icon as any} size={22} color={service.color} />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </Pressable>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Vos demandes récentes</Text>
            </View>
            <Pressable onPress={() => router.push('/demandes')}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => router.push('/demandes')} style={styles.requestCard}>
            <View style={[styles.requestIcon, { backgroundColor: '#EAF2FF' }]}>
              <Ionicons name="snow-outline" size={22} color="#2B7BFF" />
            </View>
            <View style={styles.requestCopy}>
              <Text style={styles.requestTitle}>Climatisation</Text>
              <Text style={styles.requestMeta}>Cocody, Angré</Text>
            </View>
            <View style={styles.requestRight}>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>En attente</Text>
              </View>
              <Text style={styles.requestDate}>Aujourd’hui</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>

      <KoroBottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: KoroColors.background,
  },
  scrollContent: {
    paddingBottom: KoroLayout.bottomNavHeight + KoroSpacing.lg,
  },
  container: {
    paddingHorizontal: KoroLayout.screenHorizontalPadding,
    gap: KoroLayout.sectionGap,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: KoroRadius.xl,
    backgroundColor: '#D7E6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#0F4AB8',
    fontSize: 18,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  greeting: {
    color: '#66758A',
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
  },
  name: {
    color: '#0B1220',
    fontSize: KoroTypography.title.fontSize - 2,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
    marginTop: 1,
  },
  bell: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notificationDot: {
    position: 'absolute',
    right: 10,
    top: 9,
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: '#F59E0B',
  },
  question: {
    color: '#0B1220',
    fontSize: KoroTypography.title.fontSize,
    lineHeight: KoroTypography.title.lineHeight,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
    marginTop: 2,
  },
  searchBox: {
    height: 46,
    borderRadius: KoroRadius.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: KoroSpacing.md,
  },
  searchInput: {
    flex: 1,
    color: '#0B1220',
    fontSize: KoroTypography.body.fontSize,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    paddingVertical: 0,
  },
  hero: {
    height: KoroLayout.bannerHeight,
    borderRadius: KoroRadius.xl,
    backgroundColor: KoroColors.navy,
    overflow: 'hidden',
    flexDirection: 'row',
    paddingLeft: KoroSpacing.lg,
  },
  heroCopy: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
    zIndex: 2,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  heroBadgeDot: {
    color: '#4DA3FF',
    fontSize: KoroTypography.body.fontSize,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Poppins_800ExtraBold',
    fontWeight: '800',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 23,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
    maxWidth: 190,
  },
  heroButton: {
    alignSelf: 'flex-start',
    minHeight: 35,
    paddingHorizontal: KoroSpacing.md,
    borderRadius: 11,
    backgroundColor: '#FFB020',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  heroButtonText: {
    color: '#18243A',
    fontSize: KoroTypography.caption.fontSize,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  heroButtonArrow: {
    color: '#18243A',
    fontSize: 14,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    width: '56%',
    backgroundColor: 'rgba(7, 23, 46, 0.34)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...KoroTypography.title,
    color: KoroColors.text,
    fontSize: 16,
  },
  sectionSubtitle: {
    ...KoroTypography.caption,
    color: KoroColors.textSecondary,
    marginTop: 2,
  },
  seeAll: {
    color: '#1D68DD',
    fontSize: 11,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  servicesGrid: {
    gap: KoroSpacing.sm,
  },
  servicesRow: {
    flexDirection: 'row',
    gap: KoroSpacing.sm,
  },
  serviceCard: {
    flex: 1,
    minHeight: KoroLayout.serviceCardHeight,
    borderRadius: KoroRadius.lg,
    backgroundColor: KoroColors.surface,
    borderWidth: 1,
    borderColor: KoroColors.border,
    paddingHorizontal: KoroSpacing.md,
    paddingVertical: KoroSpacing.md,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  serviceIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    ...KoroTypography.caption,
    color: KoroColors.text,
    fontSize: 10,
    fontFamily: 'Poppins_900Black',
  },
  requestCard: {
    minHeight: 68,
    borderRadius: KoroRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  requestIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestCopy: {
    flex: 1,
    gap: 2,
  },
  requestTitle: {
    ...KoroTypography.bodyStrong,
    color: KoroColors.text,
  },
  requestMeta: {
    ...KoroTypography.caption,
    color: KoroColors.textMuted,
  },
  requestRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusPill: {
    borderRadius: KoroRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFF2D8',
  },
  statusText: {
    color: '#A56A00',
    fontSize: 8,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  requestDate: {
    color: '#8C98A8',
    fontSize: 8,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
  },
});
