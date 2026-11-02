import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

interface CameraCaptureProps {
  onCapture: (uri: string) => void; // Chamado com o URI temporário da foto
  onClose: () => void; // Chamado ao cancelar
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('front');
  const [capturing, setCapturing] = useState(false);

  // Estado 1: ainda verificando a permissão
  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  // Estado 2: permissão negada -> tela explicativa
  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-8">
        <Text className="text-6xl mb-4">📷</Text>
        <Text className="text-xl font-bold text-gray-800 text-center mb-2">
          Precisamos da câmera
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          Para tirar a foto do seu perfil, permita o acesso à câmera.
        </Text>

        {permission.canAskAgain ? (
          <TouchableOpacity
            onPress={requestPermission}
            className="bg-indigo-600 rounded-xl px-6 py-3 mb-3"
          >
            <Text className="text-white font-semibold">Conceder Permissão</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => Linking.openSettings()}
            className="bg-indigo-600 rounded-xl px-6 py-3 mb-3"
          >
            <Text className="text-white font-semibold">Abrir Configurações</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onClose} className="px-6 py-3">
          <Text className="text-gray-500">Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Estado 3: permissão concedida -> preview da câmera
  const handleCapture = async () => {
    if (capturing) return;
    try {
      setCapturing(true);
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.7 });
      if (photo?.uri) onCapture(photo.uri);
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
    } finally {
      setCapturing(false);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />

      {/* Controles sobre o preview */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between px-8 pb-10">
        <TouchableOpacity
          onPress={onClose}
          className="bg-black/50 rounded-full px-5 py-3"
          accessibilityLabel="Cancelar"
        >
          <Text className="text-white font-semibold">Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCapture}
          disabled={capturing}
          className="w-20 h-20 rounded-full bg-white items-center justify-center border-4 border-indigo-600"
          accessibilityLabel="Tirar foto"
        >
          {capturing ? <ActivityIndicator color="#4f46e5" /> : null}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFacing((f) => (f === 'front' ? 'back' : 'front'))}
          className="bg-black/50 rounded-full px-5 py-3"
          accessibilityLabel="Virar câmera"
        >
          <Text className="text-white font-semibold">Virar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
