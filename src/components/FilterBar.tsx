import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TaskFilter } from '../types/task';

interface FilterBarProps {
  filter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
  allCount: number;
  pendingCount: number;
  completedCount: number;
}

export function FilterBar({
  filter,
  onChange,
  allCount,
  pendingCount,
  completedCount,
}: FilterBarProps) {
  const options: { key: TaskFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Todas', count: allCount },
    { key: 'pending', label: 'Pendentes', count: pendingCount },
    { key: 'completed', label: 'Concluídas', count: completedCount },
  ];

  return (
    <View className="flex-row gap-2 px-4 py-3 bg-white border-b border-gray-200">
      {options.map(({ key, label, count }) => {
        const active = filter === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onChange(key)}
            className={`flex-1 rounded-full py-2 items-center ${
              active ? 'bg-indigo-600' : 'bg-gray-100'
            }`}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text
              className={`text-sm font-semibold ${
                active ? 'text-white' : 'text-gray-600'
              }`}
            >
              {label} ({count})
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
