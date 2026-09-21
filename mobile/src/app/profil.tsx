import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KoroHeader } from '@/components/koro-header';
import { ApiError } from '@/lib/api';
import { Colors, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useAuthStore } from '@/stores/auth';

const theme = Colors.dark;

export default function ProfilScreen() {
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={[styles.shell, { maxWidth: MaxContentWidth }]}>
          <KoroHeader />

          <Text style={styles.kicker}>MON COMPTE</Text>
          <Text style={styles.title}>
            {utilisateur ? 'Mon profil' : 'Bienvenue sur Kôrô Services'}
          </Text>
          <Text style={styles.subtitle}>
            {utilisateur
              ? 'Votre session est active.'
              : 'Connectez-vous pour suivre vos demandes et gérer votre compte.'}
          </Text>

          {utilisateur ? (
            <>
              <View style={styles.profileCard}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {(utilisateur.prenom?.[0] ?? 'K') + (utilisateur.nom?.[0] ?? 'S')}
                  </Text>
                </View>
                <View style={styles.profileCopy}>
                  <Text style={styles.profileName}>{utilisateur.nom_complet}</Text>
                  <Text style={styles.profileMeta}>{utilisateur.telephone}</Text>
                  <View style={styles.rolePill}>
                    <Text style={styles.roleText}>
                      {utilisateur.roles?.includes('prestataire') ? 'Prestataire' : 'Client'}
                    </Text>
                  </View>
                </View>
              </View>

              <Pressable onPress={() => void deconnexion()} style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>Se déconnecter</Text>
              </Pressable>
            </>
          ) : (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Connexion</Text>
              <Text style={styles.formSubtitle}>
                Accédez à vos demandes et à votre profil.
              </Text>

              <Text style={styles.label}>Téléphone</Text>
              <TextInput
                value={telephone}
                onChangeText={setTelephone}
                placeholder="+225 07 00 00 00 01"
                placeholderTextColor={theme.muted}
                keyboardType="phone-pad"
                style={styles.input}
              />

              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                value={motDePasse}
                onChangeText={setMotDePasse}
                placeholder="Votre mot de passe"
                placeholderTextColor={theme.muted}
                secureTextEntry
                style={styles.input}
              />

              <Pressable
                disabled={isLoading}
                onPress={() => void handleConnexion()}
                style={[styles.primaryButton, isLoading && { opacity: 0.55 }]}>
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Text>
                <Text style={styles.primaryArrow}>→</Text>
              </Pressable>

              <Text style={styles.demoHint}>
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
    fontSize: 28,
    lineHeight: 34,
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
  formCard: {
    borderRadius: Radius.lg,
    backgroundColor: '#111C30',
    borderWidth: 1,
    borderColor: '#23324A',
    padding: Spacing.four,
    gap: 10,
  },
  formTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '900',
  },
  formSubtitle: {
    color: '#71819A',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 7,
  },
  label: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '800',
  },
  input: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#23324A',
    backgroundColor: '#08111F',
    color: '#F8FAFC',
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
    backgroundColor: '#5A9BFF',
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
    color: '#71819A',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  profileCard: {
    borderRadius: Radius.lg,
    backgroundColor: '#111C30',
    borderWidth: 1,
    borderColor: '#23324A',
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#5A9BFF',
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
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '900',
  },
  profileMeta: {
    color: '#71819A',
    fontSize: 12,
    fontWeight: '600',
  },
  rolePill: {
    alignSelf: 'flex-start',
    borderRadius: Radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: '#172B4B',
  },
  roleText: {
    color: '#5A9BFF',
    fontSize: 11,
    fontWeight: '900',
  },
  outlineButton: {
    minHeight: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#23324A',
    backgroundColor: '#111C30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '900',
  },
});
