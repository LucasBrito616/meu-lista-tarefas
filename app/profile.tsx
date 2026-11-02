import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { File, Paths } from 'expo-file-system';
import { useProfile } from '../src/hooks/useProfile';
import { CameraCapture } from '../src/components/CameraCapture';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, loading, saveProfile } = useProfile();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sincroniza os campos quando o perfil carrega do banco
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setPhotoUri(profile.photoUri);
    }
  }, [profile]);

  // Copia a foto do URI temporário (cache) para o armazenamento permanente
  const handlePhotoCapture = (tempUri: string) => {
    try {
      const destFile = new File(Paths.document, `profile-${Date.now()}.jpg`);
      new File(tempUri).copy(destFile);
      setPhotoUri(destFile.uri);
    } catch (error) {
      console.error('Erro ao salvar foto:', error);
      Alert.alert('Erro', 'Não foi possível salvar a foto. Tente novamente.');
    } finally {
      setShowCamera(false);
    }
  };

  const handleSave = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      Alert.alert('Nome obrigatório', 'Digite seu nome.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      Alert.alert('Email inválido', 'Digite um email válido.');
      return;
    }

    try {
      setSaving(true);
      await saveProfile({ name: trimmedName, email: trimmedEmail, photoUri });
      router.back();
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    } finally {
      setSaving(false);
    }
  };

  // Câmera em tela cheia por cima do formulário
  if (showCamera) {
    return (
      <CameraCapture
        onCapture={handlePhotoCapture}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  if (loading && !profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-6 items-center"
        keyboardShouldPersistTaps="handled"
      >
        {/* Foto de perfil */}
        <TouchableOpacity
          onPress={() => setShowCamera(true)}
          accessibilityLabel="Tirar foto de perfil"
          className="mb-2"
        >
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={{ width: 140, height: 140, borderRadius: 70 }}
            />
          ) : (
            <View className="w-36 h-36 rounded-full bg-indigo-100 items-center justify-center">
              <Text className="text-5xl">👤</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowCamera(true)} className="mb-8">
          <Text className="text-indigo-600 font-semibold">
            {photoUri ? 'Trocar foto' : 'Tirar foto'}
          </Text>
        </TouchableOpacity>

        {/* Formulário */}
        <View className="w-full">
          <Text className="text-gray-700 font-semibold mb-1">Nome</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
            autoCapitalize="words"
            className="bg-white border border-gray-300 rounded-xl px-4 py-3 mb-4"
          />

          <Text className="text-gray-700 font-semibold mb-1">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="voce@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            className="bg-white border border-gray-300 rounded-xl px-4 py-3 mb-6"
          />

          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            className="bg-indigo-600 rounded-xl py-4 items-center"
          >
            <Text className="text-white font-bold text-base">
              {saving ? 'Salvando...' : 'Salvar'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
