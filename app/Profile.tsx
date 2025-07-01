import BackButton from '@/components/BackButton';
import EmailField from '@/components/Profile/EmailField';
import ProfileFieldItem from '@/components/Profile/ProfileField';
import { UserInfoState, useUserInfoStore } from '@/services/store/UserInfoStore';
import { updateUserInfo } from '@/services/supabase/UpdateUserInfo';
import React, { useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

type ProfileField = 'name' | 'phone_number' | 'email' | 'address';

export default function ProfileScreen() {
  const userInfo = useUserInfoStore((state: UserInfoState) => state);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [password, setPassword] = useState('');
  const [editingField, setEditingField] = useState<ProfileField | null>(null);


  return (
    <View style={styles.container}>
      <BackButton />
      <ProfileFieldItem
        label="username"
        label_name="Full name"
        value={userInfo.username || ''}
        onValueChange={(value) => updateUserInfo('name', value)}
        validate={(value) => value.trim().length > 0}
        iconName="person-outline"
        isMultiline={false}
        keyboardType="default"
        editable={true}
      />
      <ProfileFieldItem
        label="phone_number"
        label_name="Phone number"
        value={userInfo.phone_number || ''}
        onValueChange={(value) => updateUserInfo('phone_number', value)}
        validate={(value) => /^\+?[0-9]{7,15}$/.test(value.trim())}
        iconName="call-outline"
        isMultiline={false}
        keyboardType="phone-pad"
        editable={true}
      />
      <ProfileFieldItem
        label="address"
        label_name="Address"
        value={userInfo.address || ''}
        onValueChange={(value) => updateUserInfo('address', value)}
        validate={(value) => value.trim().length > 0}
        iconName="location-outline"
        isMultiline={true}
        keyboardType="default"
        editable={true}
      />
      
      <EmailField />
      
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