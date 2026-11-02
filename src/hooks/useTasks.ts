import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import * as TaskRepository from '../database/taskRepository';
import { Task, TaskFilter } from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [loading, setLoading] = useState(true);

  // Carrega todas as tarefas do banco
  const loadTasks = useCallback(async () => {
    try {
      const data = await TaskRepository.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Recarrega sempre que a tela ganhar foco (ex.: ao voltar do formulário).
  // O callback não pode retornar Promise, por isso o wrapper com chaves.
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks]),
  );

  // Filtra no frontend conforme o filtro ativo
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return task.completed === 0;
    if (filter === 'completed') return task.completed === 1;
    return true;
  });

  // Alterna entre pendente (0) e concluída (1)
  const toggleTask = useCallback(
    async (id: number, currentCompleted: number) => {
      const newCompleted = currentCompleted === 0 ? 1 : 0;
      await TaskRepository.toggleTaskComplete(id, newCompleted);
      await loadTasks();
    },
    [loadTasks],
  );

  // Remove a tarefa e recarrega a lista
  const removeTask = useCallback(
    async (id: number) => {
      await TaskRepository.deleteTask(id);
      await loadTasks();
    },
    [loadTasks],
  );

  return {
    tasks: filteredTasks,
    allTasksCount: tasks.length,
    pendingCount: tasks.filter((t) => t.completed === 0).length,
    completedCount: tasks.filter((t) => t.completed === 1).length,
    filter,
    loading,
    setFilter,
    toggleTask,
    removeTask,
  };
}
