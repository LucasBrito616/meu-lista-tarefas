import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, currentCompleted: number) => void;
  onDelete: (id: number) => void;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const router = useRouter();
  const done = task.completed === 1;

  // Confirmação antes de excluir
  const confirmDelete = () => {
    Alert.alert(
      'Excluir tarefa',
      `Deseja realmente excluir "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => onDelete(task.id),
        },
      ],
    );
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-start shadow-sm border border-gray-100">
      {/* Checkbox */}
      <TouchableOpacity
        onPress={() => onToggle(task.id, task.completed)}
        className={`w-7 h-7 rounded-full border-2 items-center justify-center mr-3 mt-0.5 ${
          done ? 'bg-green-500 border-green-500' : 'border-gray-300'
        }`}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: done }}
        accessibilityLabel={done ? 'Marcar como pendente' : 'Marcar como concluída'}
      >
        {done && <View className="w-2.5 h-2.5 rounded-full bg-white" />}
      </TouchableOpacity>

      {/* Conteúdo */}
      <View className="flex-1">
        <Text
          className={`text-base font-semibold ${
            done ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {task.title}
        </Text>
        {!!task.description && (
          <Text
            className={`text-sm mt-1 ${
              done ? 'text-gray-300 line-through' : 'text-gray-500'
            }`}
          >
            {task.description}
          </Text>
        )}
        <Text className="text-xs text-gray-400 mt-2">
          {formatDate(task.createdAt)}
        </Text>
      </View>

      {/* Ações */}
      <View className="items-end gap-2 ml-2">
        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: '/form', params: { id: String(task.id) } })
          }
          accessibilityRole="button"
          accessibilityLabel="Editar tarefa"
        >
          <Text className="text-sm font-medium text-indigo-600">Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={confirmDelete}
          accessibilityRole="button"
          accessibilityLabel="Excluir tarefa"
        >
          <Text className="text-sm font-medium text-red-600">Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
