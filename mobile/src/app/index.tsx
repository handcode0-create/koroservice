import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { KoroBottomNav } from '@/components/koro-bottom-nav';
import { Colors, Radius, Spacing } from '@/constants/theme';

const theme = Colors.light;

const SERVICES = [
  { icon: 'water-outline', title: 'Plomberie', color: '#1976FF' },
  { icon: 'flash-outline', title: 'Électricité', color: '#F59E0B' },
  { icon: 'snow-outline', title: 'Climatisation', color: '#2B7BFF' },
  { icon: 'color-palette-outline', title: 'Peinture', color: '#F97316' },
  { icon: 'sparkles-outline', title: 'Nettoyage', color: '#6B46C1' },
  { icon: 'leaf-outline', title: 'Jardinage', color: '#1FAF6A' },
];

function ProfessionalVisual() {
  return (
    <View style={styles.visual}>
      <View style={styles.orangeBlob} />
      <View style={styles.plantOne} />
      <View style={styles.plantTwo} />
      <View style={styles.personBody}>
        <View style={styles.personHead} />
        <View style={styles.cap} />
        <View style={styles.personShirt} />
        <View style={styles.personArmOne} />
        <View style={styles.personArmTwo} />
      </View>
    </View>
  );
}

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

            <ProfessionalVisual />
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
            {SERVICES.map((service) => (
              <Pressable key={service.title} onPress={() => router.push('/demandes')} style={styles.serviceCard}>
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '15' }]}>
                  <Ionicons name={service.icon as any} size={22} color={service.color} />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </Pressable>
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
    backgroundColor: '#F7F8FA',
  },
  scrollContent: {
    paddingBottom: 105,
  },
  container: {
    paddingHorizontal: 16,
    gap: 16,
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
    borderRadius: 22,
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
    fontSize: 16,
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
    fontSize: 19,
    lineHeight: 25,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
    marginTop: 2,
  },
  searchBox: {
    height: 46,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 13,
  },
  searchInput: {
    flex: 1,
    color: '#0B1220',
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    paddingVertical: 0,
  },
  hero: {
    minHeight: 148,
    borderRadius: 22,
    backgroundColor: '#0B1E3A',
    overflow: 'hidden',
    flexDirection: 'row',
    paddingLeft: 18,
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
    fontSize: 12,
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
    paddingHorizontal: 13,
    borderRadius: 11,
    backgroundColor: '#FFB020',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  heroButtonText: {
    color: '#18243A',
    fontSize: 10,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  heroButtonArrow: {
    color: '#18243A',
    fontSize: 14,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  visual: {
    width: 150,
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  orangeBlob: {
    position: 'absolute',
    right: -18,
    top: 18,
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: '#FFAA17',
  },
  plantOne: {
    position: 'absolute',
    right: 12,
    bottom: 18,
    width: 35,
    height: 62,
    borderRadius: 18,
    backgroundColor: '#2E9A5B',
    transform: [{ rotate: '28deg' }],
  },
  plantTwo: {
    position: 'absolute',
    right: 36,
    bottom: 13,
    width: 24,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#74C56A',
    transform: [{ rotate: '-16deg' }],
  },
  personBody: {
    position: 'absolute',
    right: 26,
    bottom: -4,
    width: 82,
    height: 126,
    alignItems: 'center',
  },
  personHead: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#7B4A2C',
    marginTop: 6,
    zIndex: 4,
  },
  cap: {
    width: 55,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0C3B7A',
    position: 'absolute',
    top: 2,
    zIndex: 5,
  },
  personShirt: {
    width: 72,
    height: 74,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#0D5BB5',
    marginTop: -2,
  },
  personArmOne: {
    width: 54,
    height: 14,
    borderRadius: 8,
    backgroundColor: '#7B4A2C',
    position: 'absolute',
    top: 64,
    right: -4,
    transform: [{ rotate: '28deg' }],
  },
  personArmTwo: {
    width: 50,
    height: 14,
    borderRadius: 8,
    backgroundColor: '#8A5330',
    position: 'absolute',
    top: 76,
    left: -5,
    transform: [{ rotate: '-28deg' }],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#0B1220',
    fontSize: 16,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  sectionSubtitle: {
    color: '#758396',
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    marginTop: 2,
  },
  seeAll: {
    color: '#1D68DD',
    fontSize: 11,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  serviceCard: {
    width: '31.7%',
    minHeight: 91,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    color: '#0B1220',
    fontSize: 10,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  requestCard: {
    minHeight: 68,
    borderRadius: 15,
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
    color: '#0B1220',
    fontSize: 12,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  requestMeta: {
    color: '#79889A',
    fontSize: 9,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
  },
  requestRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusPill: {
    borderRadius: Radius.pill,
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
