import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const SERVICES = [
  { code: 'P', title: 'Plomberie', subtitle: 'Fuites, robinets, canalisations' },
  { code: 'E', title: 'Électricité', subtitle: 'Pannes, prises, installations' },
  { code: 'C', title: 'Climatisation', subtitle: 'Dépannage et entretien' },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
        <View style={[styles.container, { maxWidth: MaxContentWidth }]}>
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <View style={[styles.logoMark, { backgroundColor: theme.primary }]}>
                <Text style={styles.logoLetter}>K</Text>
              </View>
              <View>
                <Text style={[styles.brand, { color: theme.text }]}>Kôrô Services</Text>
                <Text style={[styles.brandCaption, { color: theme.textSecondary }]}>
                  Des pros fiables, près de chez vous
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => router.push('/profil')}
              style={[styles.profileButton, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={[styles.profileSymbol, { color: theme.text }]}>◉</Text>
            </Pressable>
          </View>

          <View style={[styles.locationPill, { backgroundColor: theme.backgroundElement }]}>
            <Text style={[styles.locationPin, { color: theme.primary }]}>●</Text>
            <Text style={[styles.locationText, { color: theme.text }]}>Abidjan</Text>
            <Text style={[styles.locationMuted, { color: theme.textSecondary }]}>
              · Choisir une zone
            </Text>
          </View>

          <View
            style={[
              styles.hero,
              {
                backgroundColor: '#EAF2FF',
                borderColor: '#D7E6FF',
              },
            ]}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeMark}>✓</Text>
              <Text style={styles.heroBadgeText}>Prestataires vérifiés</Text>
            </View>

            <Text style={[styles.heroTitle, { color: theme.text }]}>
              Un professionnel fiable,
              {'\n'}
              <Text style={{ color: theme.primary }}>quand vous en avez besoin.</Text>
            </Text>

            <Text style={[styles.heroDescription, { color: theme.textSecondary }]}>
              Décrivez votre besoin, indiquez votre quartier et trouvez le bon professionnel près de chez vous.
            </Text>

            <Pressable
              onPress={() => router.push('/demandes')}
              style={[styles.primaryButton, { backgroundColor: theme.primary }]}>
              <Text style={styles.primaryButtonText}>+  Demander un service</Text>
              <Text style={styles.primaryArrow}>→</Text>
            </Pressable>
          </View>

          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Services populaires</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
              Commencez par choisir votre besoin
            </Text>
          </View>

          <View style={styles.servicesGrid}>
            {SERVICES.map((service) => (
              <Pressable
                key={service.title}
                onPress={() => router.push('/demandes')}
                style={[styles.serviceCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <View style={[styles.serviceIcon, { backgroundColor: theme.backgroundElement }]}>
                  <Text style={[styles.serviceIconLetter, { color: theme.primary }]}>{service.code}</Text>
                </View>
                <Text style={[styles.serviceTitle, { color: theme.text }]}>{service.title}</Text>
                <Text style={[styles.serviceSubtitle, { color: theme.textSecondary }]}>
                  {service.subtitle}
                </Text>
                <Text style={[styles.serviceArrow, { color: theme.primary }]}>→</Text>
              </Pressable>
            ))}
          </View>

          <View style={[styles.trustCard, { backgroundColor: theme.primaryDark }]}>
            <View style={[styles.trustIcon, { backgroundColor: 'rgba(34, 211, 238, 0.16)' }]}>
              <Text style={styles.trustIconText}>✓</Text>
            </View>
            <View style={styles.trustCopy}>
              <Text style={styles.trustTitle}>Une plateforme pensée pour la proximité</Text>
              <Text style={styles.trustText}>
                Profils professionnels, zones d’intervention et suivi des demandes.
              </Text>
            </View>
            <Text style={styles.trustArrow}>→</Text>
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Vos demandes</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                Suivez facilement vos interventions
              </Text>
            </View>
            <Pressable onPress={() => router.push('/demandes')}>
              <Text style={[styles.seeAll, { color: theme.primary }]}>Voir tout</Text>
            </Pressable>
          </View>

          <View style={[styles.emptyCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={[styles.emptyIcon, { backgroundColor: theme.backgroundElement }]}>
              <Text style={[styles.emptyIconText, { color: theme.primary }]}>▣</Text>
            </View>
            <View style={styles.emptyCopy}>
              <Text style={[styles.emptyTitle, { color: theme.text }]}>
                Aucune demande pour le moment
              </Text>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                Votre prochaine demande apparaîtra ici avec son statut.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    gap: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  logoMark: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },
  brand: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900',
  },
  brandCaption: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSymbol: {
    fontSize: 18,
    fontWeight: '900',
  },
  locationPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  locationPin: {
    fontSize: 11,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '900',
  },
  locationMuted: {
    fontSize: 12,
    fontWeight: '500',
  },
  hero: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroBadgeMark: {
    color: '#15803D',
    fontSize: 14,
    fontWeight: '900',
  },
  heroBadgeText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: '900',
  },
  heroTitle: {
    fontSize: 29,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: -0.6,
  },
  heroDescription: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  primaryArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
  },
  sectionSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    marginTop: 2,
  },
  servicesGrid: { gap: Spacing.two },
  serviceCard: {
    minHeight: 112,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  serviceIconLetter: {
    fontSize: 16,
    fontWeight: '900',
  },
  serviceTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '900',
  },
  serviceSubtitle: {
    maxWidth: '82%',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  serviceArrow: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    fontSize: 18,
    fontWeight: '900',
  },
  trustCard: {
    borderRadius: Radius.md,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  trustIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustIconText: {
    color: '#22D3EE',
    fontSize: 20,
    fontWeight: '900',
  },
  trustCopy: { flex: 1, gap: 3 },
  trustTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
  },
  trustText: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  trustArrow: {
    color: '#22D3EE',
    fontSize: 22,
    fontWeight: '900',
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '900',
  },
  emptyCard: {
    minHeight: 86,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  emptyIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconText: {
    fontSize: 20,
    fontWeight: '900',
  },
  emptyCopy: {
    flex: 1,
    gap: 3,
  },
  emptyTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '900',
  },
  emptyText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
  },
});
