import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/auth';

export default function DemandesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const utilisateur = useAuthStore((state) => state.utilisateur);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
        <View style={[styles.container, { maxWidth: MaxContentWidth }]}>
          <Text style={[styles.kicker, { color: theme.primary }]}>ESPACE CLIENT</Text>
          <Text style={[styles.title, { color: theme.text }]}>Mes demandes</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Retrouvez vos besoins et leur progression.
          </Text>

          <Pressable
            onPress={() => router.push('/profil')}
            style={[styles.primaryCard, { backgroundColor: theme.primaryDark }]}>
            <View style={[styles.primaryMark, { backgroundColor: 'rgba(34,211,238,0.16)' }]}>
              <Text style={styles.primaryMarkText}>+</Text>
            </View>
            <View style={styles.primaryCopy}>
              <Text style={styles.primaryTitle}>Besoin d’un professionnel ?</Text>
              <Text style={styles.primaryText}>
                Connectez-vous pour publier votre demande et suivre vos interventions.
              </Text>
            </View>
            <Text style={styles.primaryArrow}>→</Text>
          </Pressable>

          <View style={[styles.emptyCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={[styles.emptyIcon, { backgroundColor: theme.backgroundElement }]}>
              <Text style={[styles.emptyIconText, { color: theme.primary }]}>▣</Text>
            </View>
            <View style={styles.emptyCopy}>
              <Text style={[styles.emptyTitle, { color: theme.text }]}>
                {utilisateur ? 'Aucune demande pour le moment' : 'Connectez-vous pour commencer'}
              </Text>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                {utilisateur
                  ? 'Vos demandes et leurs statuts apparaîtront ici.'
                  : 'Votre compte permet de retrouver tout votre historique.'}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Le parcours Kôrô Services
            </Text>
            <View style={styles.steps}>
              {[
                ['1', 'Décrivez', 'Votre besoin'],
                ['2', 'Localisez', 'Votre quartier'],
                ['3', 'Comparez', 'Les professionnels'],
              ].map(([number, title, text]) => (
                <View
                  key={number}
                  style={[styles.stepCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                  <View style={[styles.stepNumber, { backgroundColor: theme.backgroundElement }]}>
                    <Text style={[styles.stepNumberText, { color: theme.primary }]}>{number}</Text>
                  </View>
                  <Text style={[styles.stepTitle, { color: theme.text }]}>{title}</Text>
                  <Text style={[styles.stepText, { color: theme.textSecondary }]}>{text}</Text>
                </View>
              ))}
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
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '900',
    marginTop: -10,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
    marginTop: -12,
  },
  primaryCard: {
    borderRadius: Radius.lg,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  primaryMark: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryMarkText: {
    color: '#22D3EE',
    fontSize: 25,
    fontWeight: '900',
  },
  primaryCopy: { flex: 1, gap: 3 },
  primaryTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '900',
  },
  primaryText: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  primaryArrow: {
    color: '#22D3EE',
    fontSize: 22,
    fontWeight: '900',
  },
  emptyCard: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  emptyIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconText: {
    fontSize: 20,
    fontWeight: '900',
  },
  emptyCopy: { flex: 1, gap: 3 },
  emptyTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '900',
  },
  emptyText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  section: { gap: Spacing.two },
  sectionTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
  },
  steps: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  stepCard: {
    flex: 1,
    minHeight: 124,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.two,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '900',
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: '900',
  },
  stepText: {
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
});
