import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuthContext } from '../src/contexts/AuthContext';
import { useTasks } from '../src/hooks/useTasks';
import { TaskItem } from '../src/components/TaskItem';
import { FilterBar } from '../src/components/FilterBar';
import { EmptyState } from '../src/components/EmptyState';

export default function HomeScreen() {
  const router = useRouter();
  const { signOut } = useAuthContext();
  const {
    tasks,
    allTasksCount,
    pendingCount,
    completedCount,
    filter,
    loading,
    setFilter,
    toggleTask,
    removeTask,
  } = useTasks(); // Toda a lógica está no hook!

  // Botão 👤 no header (inline para ter acesso ao router)
  const headerOptions = (
    <Stack.Screen
      options={{
        headerRight: () => (
          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              accessibilityRole="button"
              accessibilityLabel="Abrir perfil"
            >
              <Text className="text-3xl">👤</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={signOut}
              accessibilityRole="button"
              accessibilityLabel="Sair"
            >
              <Text className="text-3xl">🚪</Text>
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );

  if (loading) {
    return (
      <>
        {headerOptions}
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      </>
    );
  }

  return (
    <View className="flex-1">
      {headerOptions}
      <FilterBar
        filter={filter}
        onChange={setFilter}
        allCount={allTasksCount}
        pendingCount={pendingCount}
        completedCount={completedCount}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={removeTask} />
        )}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 100,
          flexGrow: 1,
        }}
        ListEmptyComponent={<EmptyState filter={filter} />}
      />

      {/* FAB: botão flutuante para nova tarefa */}
      <TouchableOpacity
        onPress={() => router.push('/form')}
        className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-indigo-600 items-center justify-center shadow-lg"
        accessibilityRole="button"
        accessibilityLabel="Adicionar tarefa"
      >
        <Text className="text-white text-4xl leading-10">+</Text>
      </TouchableOpacity>
    </View>
  );
}
