import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KoroHeader } from '@/components/koro-header';
import { Colors, MaxContentWidth, Radius, Spacing } from '@/constants/theme';

const theme = Colors.dark;

export default function DemandesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={[styles.shell, { maxWidth: MaxContentWidth }]}>
          <KoroHeader />

          <Text style={styles.kicker}>ESPACE CLIENT</Text>
          <Text style={styles.title}>Mes demandes</Text>
          <Text style={styles.subtitle}>
            Retrouvez vos besoins et leur progression.
          </Text>

          <Pressable
            onPress={() => router.push('/profil')}
            style={styles.primaryCard}>
            <View style={styles.primaryMark}>
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

          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>▣</Text>
            </View>
            <View style={styles.emptyCopy}>
              <Text style={styles.emptyTitle}>Aucune demande pour le moment</Text>
              <Text style={styles.emptyText}>
                Vos demandes et leurs statuts apparaîtront ici.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#08111F' },
  scrollContent: { alignItems: 'center', paddingBottom: 32 },
  shell: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  kicker: {
    color: '#5A9BFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '900',
    marginTop: -8,
  },
  subtitle: {
    color: '#71819A',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: -10,
  },
  primaryCard: {
    borderRadius: Radius.lg,
    backgroundColor: '#0C182A',
    borderWidth: 1,
    borderColor: '#1A2A41',
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  primaryMark: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: 'rgba(34,211,238,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryMarkText: {
    color: '#22D3EE',
    fontSize: 24,
    fontWeight: '900',
  },
  primaryCopy: { flex: 1, gap: 3 },
  primaryTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '900',
  },
  primaryText: {
    color: '#71819A',
    fontSize: 11,
    lineHeight: 17,
    fontWeight: '600',
  },
  primaryArrow: {
    color: '#22D3EE',
    fontSize: 21,
    fontWeight: '900',
  },
  emptyCard: {
    borderRadius: Radius.md,
    backgroundColor: '#111C30',
    borderWidth: 1,
    borderColor: '#23324A',
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  emptyIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#172B4B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconText: {
    color: '#5A9BFF',
    fontSize: 20,
    fontWeight: '900',
  },
  emptyCopy: { flex: 1, gap: 3 },
  emptyTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '900',
  },
  emptyText: {
    color: '#71819A',
    fontSize: 11,
    lineHeight: 17,
    fontWeight: '600',
  },
});
