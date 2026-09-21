import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KoroHeader } from '@/components/koro-header';
import { Colors, MaxContentWidth, Radius, Spacing } from '@/constants/theme';

const theme = Colors.dark;

const SERVICES = [
  { letter: 'P', title: 'Plomberie', subtitle: 'Fuites, robinets, canalisations' },
  { letter: 'E', title: 'Électricité', subtitle: 'Pannes, prises, installations' },
  { letter: 'C', title: 'Climatisation', subtitle: 'Dépannage et entretien' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={[styles.shell, { maxWidth: MaxContentWidth }]}>
          <KoroHeader />

          <View style={styles.locationPill}>
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>Abidjan</Text>
            <Text style={styles.locationMuted}>· Choisir une zone</Text>
          </View>

          <View style={styles.hero}>
            <View style={styles.verifiedRow}>
              <Text style={styles.verifiedMark}>✓</Text>
              <Text style={styles.verifiedText}>Prestataires vérifiés</Text>
            </View>

            <Text style={styles.heroTitle}>
              Un professionnel
              {'\n'}
              fiable,
              {'\n'}
              <Text style={styles.heroAccent}>quand vous en avez besoin.</Text>
            </Text>

            <Text style={styles.heroDescription}>
              Décrivez votre besoin, indiquez votre quartier et trouvez le bon professionnel près de chez vous.
            </Text>

            <Pressable
              onPress={() => router.push('/demandes')}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.primaryButtonText}>+  Demander un service</Text>
              <Text style={styles.primaryArrow}>→</Text>
            </Pressable>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Services populaires</Text>
            <Text style={styles.sectionSubtitle}>Commencez par choisir votre besoin</Text>
          </View>

          <View style={styles.services}>
            {SERVICES.map((service) => (
              <Pressable
                key={service.title}
                onPress={() => router.push('/demandes')}
                style={({ pressed }) => [
                  styles.serviceCard,
                  pressed && styles.pressed,
                ]}>
                <View style={styles.serviceIcon}>
                  <Text style={styles.serviceLetter}>{service.letter}</Text>
                </View>

                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
                <Text style={styles.serviceArrow}>→</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.trustCard}>
            <View style={styles.trustIcon}>
              <Text style={styles.trustIconText}>✓</Text>
            </View>
            <View style={styles.trustCopy}>
              <Text style={styles.trustTitle}>Une plateforme pensée pour la proximité</Text>
              <Text style={styles.trustText}>
                Profils professionnels, zones d’intervention et suivi des demandes.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#08111F',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  shell: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  locationPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    backgroundColor: '#17233A',
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: '#5A9BFF',
  },
  locationText: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '900',
  },
  locationMuted: {
    color: '#71819A',
    fontSize: 11,
    fontWeight: '600',
  },
  hero: {
    marginTop: 2,
    backgroundColor: '#EAF2FF',
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verifiedMark: {
    color: '#15803D',
    fontSize: 14,
    fontWeight: '900',
  },
  verifiedText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '900',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 31,
    fontWeight: '900',
    letterSpacing: -0.6,
    marginTop: 2,
  },
  heroAccent: {
    color: '#5A9BFF',
  },
  heroDescription: {
    color: '#90A0B6',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
    marginTop: 4,
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5A9BFF',
    marginTop: 7,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  primaryArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
  },
  sectionSubtitle: {
    color: '#71819A',
    fontSize: 11,
    lineHeight: 17,
    fontWeight: '600',
    marginTop: 2,
  },
  services: {
    gap: Spacing.two,
  },
  serviceCard: {
    minHeight: 104,
    borderRadius: Radius.md,
    backgroundColor: '#111C30',
    borderWidth: 1,
    borderColor: '#23324A',
    padding: Spacing.three,
  },
  serviceIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#172B4B',
    marginBottom: 9,
  },
  serviceLetter: {
    color: '#5A9BFF',
    fontSize: 15,
    fontWeight: '900',
  },
  serviceTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '900',
  },
  serviceSubtitle: {
    color: '#71819A',
    fontSize: 11,
    lineHeight: 17,
    fontWeight: '600',
    maxWidth: '80%',
  },
  serviceArrow: {
    position: 'absolute',
    right: 14,
    bottom: 13,
    color: '#5A9BFF',
    fontSize: 17,
    fontWeight: '900',
  },
  trustCard: {
    borderRadius: Radius.md,
    backgroundColor: '#0C182A',
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#1A2A41',
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
  },
  trustIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 211, 238, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustIconText: {
    color: '#22D3EE',
    fontSize: 18,
    fontWeight: '900',
  },
  trustCopy: {
    flex: 1,
    gap: 3,
  },
  trustTitle: {
    color: '#F8FAFC',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '900',
  },
  trustText: {
    color: '#71819A',
    fontSize: 11,
    lineHeight: 17,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.84,
  },
});
