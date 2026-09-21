import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KoroBottomNav } from '@/components/koro-bottom-nav';
import { ApiError } from '@/lib/api';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useAuthStore } from '@/stores/auth';

const theme = Colors.light;

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
        error instanceof ApiError ? error.message : 'Connexion impossible.',
      );
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.kicker}>MON PROFIL</Text>
          <Text style={styles.title}>{utilisateur ? 'Mon profil' : 'Connexion'}</Text>
          <Text style={styles.subtitle}>
            {utilisateur ? 'Gérez votre compte Kôrô Services.' : 'Accédez à vos demandes et services.'}
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
                  <Text style={styles.profilePhone}>{utilisateur.telephone}</Text>
                  <View style={styles.rolePill}>
                    <Text style={styles.roleText}>
                      {utilisateur.roles?.includes('prestataire') ? 'Prestataire' : 'Client'}
                    </Text>
                  </View>
                </View>
              </View>

              {['Mes demandes', 'Mes adresses', 'Paramètres', 'Aide et support'].map((item) => (
                <Pressable key={item} style={styles.menuRow}>
                  <Text style={styles.menuTitle}>{item}</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </Pressable>
              ))}

              <Pressable onPress={() => void deconnexion()} style={styles.logout}>
                <Text style={styles.logoutText}>Se déconnecter</Text>
              </Pressable>
            </>
          ) : (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Se connecter</Text>
              <Text style={styles.formSubtitle}>
                Utilisez votre compte Kôrô Services.
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
                style={[styles.loginButton, isLoading && { opacity: 0.55 }]}>
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Text>
              </Pressable>

              <Text style={styles.demo}>Démo : +225 07 00 00 00 01 · password</Text>
            </View>
          )}
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
    gap: 14,
  },
  kicker: {
    color: theme.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  title: {
    color: theme.text,
    fontSize: 28,
    fontWeight: '900',
    marginTop: -7,
  },
  subtitle: {
    color: theme.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: -5,
    marginBottom: 4,
  },
  profileCard: {
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#D7E6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#0F4AB8',
    fontSize: 18,
    fontWeight: '900',
  },
  profileCopy: { flex: 1, gap: 4 },
  profileName: { color: theme.text, fontSize: 16, fontWeight: '900' },
  profilePhone: { color: theme.textSecondary, fontSize: 11, fontWeight: '600' },
  rolePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAF2FF',
    borderRadius: Radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  roleText: { color: theme.primary, fontSize: 10, fontWeight: '900' },
  menuRow: {
    minHeight: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuTitle: { color: theme.text, fontSize: 12, fontWeight: '800' },
  menuArrow: { color: theme.textSecondary, fontSize: 24, fontWeight: '300' },
  logout: {
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1C8C8',
    backgroundColor: '#FFF7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { color: theme.danger, fontSize: 13, fontWeight: '900' },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: Radius.lg,
    padding: 18,
    gap: 10,
  },
  formTitle: { color: theme.text, fontSize: 17, fontWeight: '900' },
  formSubtitle: { color: theme.textSecondary, fontSize: 11, lineHeight: 17 },
  label: { color: theme.text, fontSize: 11, fontWeight: '800' },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: '#F7F8FA',
    borderRadius: 14,
    paddingHorizontal: 13,
    fontSize: 13,
    color: theme.text,
  },
  loginButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  loginButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  demo: { color: theme.textSecondary, fontSize: 10, lineHeight: 15 },
});
