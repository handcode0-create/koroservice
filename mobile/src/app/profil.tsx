import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ApiError } from '@/lib/api';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/auth';

export default function ProfilScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const utilisateur = useAuthStore((state) => state.utilisateur);
  const isLoading = useAuthStore((state) => state.isLoading);
  const connexion = useAuthStore((state) => state.connexion);
  const deconnexion = useAuthStore((state) => state.deconnexion);

  const [telephone, setTelephone] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  async function handleConnexion() {
    try {
      await connexion(telephone.trim(), motDePasse);
    } catch (error) {
      Alert.alert(
        'Connexion',
        error instanceof ApiError
          ? error.message
          : 'Impossible de vous connecter pour le moment.',
      );
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
        <View style={[styles.container, { maxWidth: MaxContentWidth }]}>
          <Text style={[styles.kicker, { color: theme.primary }]}>MON COMPTE</Text>
          <Text style={[styles.title, { color: theme.text }]}>
            {utilisateur ? 'Mon profil' : 'Bienvenue sur Kôrô Services'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {utilisateur
              ? 'Votre session est active.'
              : 'Connectez-vous pour suivre vos demandes et gérer votre compte.'}
          </Text>

          {utilisateur ? (
            <>
              <View style={[styles.profileCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
                  <Text style={styles.avatarText}>
                    {(utilisateur.prenom?.[0] ?? 'K') + (utilisateur.nom?.[0] ?? 'S')}
                  </Text>
                </View>
                <View style={styles.profileCopy}>
                  <Text style={[styles.profileName, { color: theme.text }]}>
                    {utilisateur.nom_complet}
                  </Text>
                  <Text style={[styles.profileMeta, { color: theme.textSecondary }]}>
                    {utilisateur.telephone}
                  </Text>
                  <View style={[styles.rolePill, { backgroundColor: theme.backgroundElement }]}>
                    <Text style={[styles.roleText, { color: theme.primary }]}>
                      {utilisateur.roles?.includes('prestataire') ? 'Prestataire' : 'Client'}
                    </Text>
                  </View>
                </View>
              </View>

              <Pressable
                onPress={() => void deconnexion()}
                style={[styles.outlineButton, { borderColor: theme.border, backgroundColor: theme.surface }]}>
                <Text style={[styles.outlineButtonText, { color: theme.danger }]}>
                  Se déconnecter
                </Text>
              </Pressable>
            </>
          ) : (
            <View style={[styles.formCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <View style={styles.formHeader}>
                <View style={[styles.formIcon, { backgroundColor: theme.backgroundElement }]}>
                  <Text style={[styles.formIconText, { color: theme.primary }]}>✓</Text>
                </View>
                <View style={styles.formHeaderCopy}>
                  <Text style={[styles.formTitle, { color: theme.text }]}>Connexion</Text>
                  <Text style={[styles.formSubtitle, { color: theme.textSecondary }]}>
                    Accédez à vos demandes et à votre profil.
                  </Text>
                </View>
              </View>

              <Text style={[styles.label, { color: theme.text }]}>Téléphone</Text>
              <TextInput
                value={telephone}
                onChangeText={setTelephone}
                placeholder="+225 07 00 00 00 01"
                placeholderTextColor={theme.muted}
                keyboardType="phone-pad"
                style={[
                  styles.input,
                  { borderColor: theme.border, backgroundColor: theme.background, color: theme.text },
                ]}
              />

              <Text style={[styles.label, { color: theme.text }]}>Mot de passe</Text>
              <TextInput
                value={motDePasse}
                onChangeText={setMotDePasse}
                placeholder="Votre mot de passe"
                placeholderTextColor={theme.muted}
                secureTextEntry
                style={[
                  styles.input,
                  { borderColor: theme.border, backgroundColor: theme.background, color: theme.text },
                ]}
              />

              <Pressable
                disabled={isLoading}
                onPress={() => void handleConnexion()}
                style={[
                  styles.primaryButton,
                  { backgroundColor: theme.primary },
                  isLoading && { opacity: 0.55 },
                ]}>
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Text>
                <Text style={styles.primaryArrow}>→</Text>
              </Pressable>

              <Text style={[styles.demoHint, { color: theme.textSecondary }]}>
                Démo : +225 07 00 00 00 01 · password
              </Text>
            </View>
          )}
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
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    marginTop: -10,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
    marginTop: -12,
  },
  formCard: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: 10,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  formIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formIconText: {
    fontSize: 19,
    fontWeight: '900',
  },
  formHeaderCopy: {
    flex: 1,
    gap: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  formSubtitle: {
    fontSize: 12,
    lineHeight: 17,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
  },
  input: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
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
    fontSize: 19,
    fontWeight: '900',
  },
  demoHint: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  profileCard: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  profileCopy: {
    flex: 1,
    gap: 5,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '900',
  },
  profileMeta: {
    fontSize: 12,
    fontWeight: '600',
  },
  rolePill: {
    alignSelf: 'flex-start',
    borderRadius: Radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '900',
  },
  outlineButton: {
    minHeight: 50,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonText: {
    fontSize: 14,
    fontWeight: '900',
  },
});
