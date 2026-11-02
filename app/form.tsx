import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import * as TaskRepository from '../src/database/taskRepository';

export default function FormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id; // true se /form?id=5, false se apenas /form
  const router = useRouter();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  // Título do header conforme o modo
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar Tarefa' : 'Nova Tarefa',
    });
  }, [isEditing, navigation]);

  // Ao editar, carrega os dados atuais da tarefa
  useEffect(() => {
    if (!isEditing) return;
    (async () => {
      const task = await TaskRepository.getTaskById(Number(id));
      if (task) {
        setTitle(task.title);
        setDescription(task.description ?? '');
      }
    })();
  }, [id, isEditing]);

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      Alert.alert('Título obrigatório', 'Digite um título para a tarefa.');
      return;
    }

    try {
      setSaving(true);
      if (isEditing) {
        await TaskRepository.updateTask({
          id: Number(id),
          title: trimmedTitle,
          description: trimmedDescription || null,
        });
      } else {
        await TaskRepository.createTask({
          title: trimmedTitle,
          description: trimmedDescription || null,
        });
      }
      router.back();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="p-4"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-sm font-medium text-gray-700 mb-2">Título *</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 mb-5"
          placeholder="Ex.: Estudar React Native"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />

        <Text className="text-sm font-medium text-gray-700 mb-2">
          Descrição
        </Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 mb-6 h-32"
          placeholder="Detalhes da tarefa (opcional)"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          className={`rounded-xl py-4 mb-3 ${
            saving ? 'bg-indigo-400' : 'bg-indigo-600'
          }`}
        >
          <Text className="text-white text-center text-base font-semibold">
            {isEditing ? 'Salvar alterações' : 'Adicionar tarefa'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-xl py-4 border border-gray-300 bg-white"
        >
          <Text className="text-gray-700 text-center text-base font-semibold">
            Cancelar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
