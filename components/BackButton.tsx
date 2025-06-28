import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

type BackButtonProps = {
  size?: number;
  color?: string;
  style?: object;
};

export default function BackButton({ size = 24, color = 'black', style = {} }: BackButtonProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()} style={style}>
      <Ionicons name="arrow-back" size={size} color={color} />
    </Pressable>
  );
}
