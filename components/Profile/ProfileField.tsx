import { useUserInfoStore } from '@/services/store/UserInfoStore'; // Import the Zustand store
import { updateUserInfo } from '@/services/supabase/UpdateUserInfo';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface Props {
  label: string;
  label_name?: string; // Optional, used for accessibility
  value: string;
  onValueChange?: (newValue: string) => void;
  validate?: (value: string) => boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  isMultiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  editable?: boolean;
}

export default function ProfileFieldItem({
  label,
  label_name,
  value,
  onValueChange,
  validate,
  iconName,
  isMultiline = false,
  keyboardType = 'default',
  editable = true,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = async () => {
    const trimmed = tempValue.trim();
    if (validate && !validate(trimmed)) {
      alert(`Please enter a valid ${label}.`);
      return;
    }

    onValueChange?.(trimmed);
    try {
      await updateUserInfo(label, trimmed);
      // Update the Zustand store or any other state management if needed
      const userInfo = useUserInfoStore.getState();
      useUserInfoStore.setState({
        ...userInfo,
        [label]: trimmed, // Convert label to a suitable key
      });
    } catch (error) {
      console.error(`Error updating ${label}:`, error);
    }
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.row}>
        <View style={styles.iconCircle}>
          <Ionicons name={iconName} size={20} color="#64748b" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label_name}</Text>
          <Text style={[styles.value, !editable && { color: '#64748b' }]}>
            {value}
          </Text>
        </View>
        {editable && (
          <Pressable
            onPress={() => {
              setTempValue(value);
              setModalVisible(true);
            }}
          >
            <Ionicons name="create-outline" size={20} color="#64748b" />
          </Pressable>
        )}
      </View>

      {editable && (
        <Modal animationType="slide" transparent visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalLabel}>Edit {label}</Text>
              <TextInput
                style={styles.input}
                value={tempValue}
                onChangeText={setTempValue}
                multiline={isMultiline}
                keyboardType={keyboardType}
                textAlignVertical={isMultiline ? 'top' : 'center'}
              />
              <View style={styles.modalActions}>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelBtn}>Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={handleSave}
                  disabled={validate ? !validate(tempValue) : false}
                >
                  <Text
                    style={[
                      styles.saveBtn,
                      validate && !validate(tempValue) && { opacity: 0.5 },
                    ]}
                  >
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f1f1',
  },
  iconCircle: {
    width: 36,
    height: 36,
    backgroundColor: '#f1f5f9',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a0f2c',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    width: '85%',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 10,
    minHeight: 40,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelBtn: {
    color: '#64748b',
    fontWeight: '500',
    marginRight: 20,
  },
  saveBtn: {
    color: '#0a0f2c',
    fontWeight: '600',
  },
});
