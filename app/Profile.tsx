import BackButton from '@/components/BackButton';
import { getUserInformation } from '@/services/supabase/GetUserInformation';
import { updateUserInfo } from '@/services/supabase/UpdateUserInfo';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type ProfileField = 'Full name' | 'Phone number' | 'Email' | 'Address';

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState<Record<ProfileField, string>>({
    'Full name': '',
    'Phone number': '',
    'Email': '',
    'Address': '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState<ProfileField | null>(null);
  const [tempValue, setTempValue] = useState('');

  const init = async () => {
    const userInfo = await getUserInformation();
    if (userInfo) {
      setProfileData({
        'Full name': userInfo.userName || '',
        'Phone number': userInfo.phone_number || '',
        'Email': userInfo.email || '',
        'Address': userInfo.address || '',
      });
    }
  };

  useEffect(() => {
    init().catch((error) => {
      console.error('Error fetching user information:', error);
    });
  }, []);

  const openModal = (field: ProfileField) => {
    setEditingField(field);
    setTempValue(profileData[field]);
    setModalVisible(true);
  };

  const validateInput = (field: ProfileField, value: string) => {
    const trimmed = value.trim();
    switch (field) {
      case 'Email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
      case 'Phone number':
        return /^\+?[0-9]{7,15}$/.test(trimmed);
      case 'Full name':
      case 'Address':
        return trimmed.length > 0;
      default:
        return false;
    }
  };

  const handleSave = () => {
    if (editingField) {
      const trimmed = tempValue.trim();
      if (!validateInput(editingField, trimmed)) {
        alert(`Please enter a valid ${editingField}.`);
        return;
      }

      setProfileData((prev) => ({ ...prev, [editingField]: trimmed }));
      updateUserInfo(editingField, trimmed)
        .then(() => {
          console.log(`${editingField} updated successfully`);
        })
        .catch((error) => {
          console.error(`Error updating ${editingField}:`, error);
        });
      setModalVisible(false);
    }
  };

  const renderItem = ({ item }: { item: ProfileField }) => (
    <View style={styles.row}>
      <View style={styles.iconCircle}>
        <Ionicons
          name={
            item === 'Full name'
              ? 'person-outline'
              : item === 'Phone number'
              ? 'call-outline'
              : item === 'Email'
              ? 'mail-outline'
              : 'location-outline'
          }
          size={20}
          color="#64748b"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{item}</Text>
        <Text style={styles.value}>{profileData[item]}</Text>
      </View>
      <Pressable onPress={() => openModal(item)}>
        <Ionicons name="create-outline" size={20} color="#64748b" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Profile</Text>
      <FlatList
        data={Object.keys(profileData) as ProfileField[]}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal for editing */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalLabel}>Edit {editingField}</Text>
            <TextInput
              style={styles.input}
              value={tempValue}
              onChangeText={setTempValue}
              multiline={editingField === 'Address'}
              keyboardType={
                editingField === 'Email'
                  ? 'email-address'
                  : editingField === 'Phone number'
                  ? 'phone-pad'
                  : 'default'
              }
            />
            <View style={styles.modalActions}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleSave}
                disabled={!validateInput(editingField!, tempValue)}
              >
                <Text
                  style={[
                    styles.saveBtn,
                    !validateInput(editingField!, tempValue) && { opacity: 0.5 },
                  ]}
                >
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '6%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a0f2c',
    marginVertical: '5%',
  },
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
    textAlignVertical: 'top',
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
