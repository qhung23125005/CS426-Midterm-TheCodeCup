import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

type ToCartButtonProps = {
  size?: number;
  color?: string;
  style?: object;
};

export default function ToCartButton({ size = 24, color = 'black', style = {} }: ToCartButtonProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/Profile')} style={style}>
      <Ionicons name="person-outline" size={size} color={color} />
    </Pressable>
  );
}
