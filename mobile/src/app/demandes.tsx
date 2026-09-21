import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KoroBottomNav } from '@/components/koro-bottom-nav';
import { Colors, Radius, Spacing } from '@/constants/theme';

const theme = Colors.light;

export default function DemandesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.kicker}>DEMANDES</Text>
              <Text style={styles.title}>Vos demandes</Text>
              <Text style={styles.subtitle}>Suivez vos interventions et leurs statuts.</Text>
            </View>
            <Pressable onPress={() => router.push('/demandes')} style={styles.addTop}>
              <Text style={styles.addTopText}>+</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>+</Text>
            </View>
            <View style={styles.cardCopy}>
              <Text style={styles.cardTitle}>Aucune demande récente</Text>
              <Text style={styles.cardText}>
                Décrivez votre besoin pour trouver un professionnel.
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Comment ça marche ?</Text>
            <Text style={styles.sectionSubtitle}>Un parcours simple en quelques étapes.</Text>
          </View>

          <View style={styles.stepList}>
            {[
              ['1', 'Décrivez votre besoin', 'Choisissez un service et expliquez le problème.'],
              ['2', 'Indiquez votre zone', 'Commune, quartier et repère.'],
              ['3', 'Recevez des réponses', 'Comparez les professionnels disponibles.'],
            ].map(([n, title, text]) => (
              <View key={n} style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{n}</Text>
                </View>
                <View style={styles.stepCopy}>
                  <Text style={styles.stepTitle}>{title}</Text>
                  <Text style={styles.stepText}>{text}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <KoroBottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8FA' },
  scrollContent: { paddingBottom: 104 },
  container: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 18,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  kicker: {
    color: theme.primary,
    fontSize: 10,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  title: {
    color: theme.text,
    fontSize: 28,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
    marginTop: 4,
  },
  subtitle: {
    color: theme.textSecondary,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    marginTop: 3,
  },
  addTop: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTopText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
  },
  card: {
    minHeight: 96,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EAF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: theme.primary,
    fontSize: 24,
    fontFamily: 'Poppins_800ExtraBold',
    fontWeight: '800',
  },
  cardCopy: { flex: 1, gap: 3 },
  cardTitle: {
    color: theme.text,
    fontSize: 14,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  cardText: {
    color: theme.textSecondary,
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
  },
  sectionTitle: {
    color: theme.text,
    fontSize: 16,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  sectionSubtitle: {
    color: theme.textSecondary,
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    marginTop: 2,
  },
  stepList: { gap: 10 },
  step: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: Radius.md,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#EAF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: theme.primary,
    fontSize: 12,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  stepCopy: { flex: 1, gap: 2 },
  stepTitle: {
    color: theme.text,
    fontSize: 12,
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
  },
  stepText: {
    color: theme.textSecondary,
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
  },
});
