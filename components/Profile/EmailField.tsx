import { useUserInfoStore } from '@/services/store/UserInfoStore';
import { signInAnonymously } from '@/services/supabase/Auth';
import { getUserInformation } from '@/services/supabase/GetUserInformation';
import { linkEmail } from '@/services/supabase/LinkEmail';
import { logInWithEmail } from '@/services/supabase/LogInWithEmail';
import { supabase } from '@/utils/supabase';
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

export default function EmailField() {
  const userInfo = useUserInfoStore((state) => state);
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState<'login' | 'link'>('link');
  const [tempEmail, setTempEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');

  const isSignedIn = !!userInfo.email;

  const handleSubmit = async () => {
    if (!tempEmail || !tempPassword) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      if (mode === 'link') {
        await linkEmail(tempEmail, tempPassword);
      } else {
        await logInWithEmail(tempEmail, tempPassword);
      }

      const info = await getUserInformation();
      useUserInfoStore.setState(info);
      setModalVisible(false);
    } catch (err: any) {
      alert(err.message || 'Something went wrong.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    await signInAnonymously();
    const info = await getUserInformation();
    useUserInfoStore.setState(info);
    setModalVisible(false);
  };

  return (
    <View style={styles.row}>
      <View style={styles.iconCircle}>
        <Ionicons name="mail-outline" size={20} color="#64748b" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userInfo.email || 'Anonymous user'}</Text>
      </View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Ionicons name="create-outline" size={20} color="#64748b" />
      </Pressable>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalLabel}>
              {isSignedIn ? 'Log out?' : 'Login or Link Email'}
            </Text>

            {!isSignedIn ? (
              <>
                <TextInput
                  placeholder="Email"
                  value={tempEmail}
                  onChangeText={setTempEmail}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  placeholder="Password"
                  value={tempPassword}
                  onChangeText={setTempPassword}
                  style={styles.input}
                  secureTextEntry
                />
                <View style={styles.modeActions}>
                  <Pressable
                    style={[
                      styles.modeBtn,
                      mode === 'login' && styles.modeBtnActive,
                    ]}
                    onPress={() => setMode('login')}
                  >
                    <Text style={styles.modeBtnText}>Login</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.modeBtn,
                      mode === 'link' && styles.modeBtnActive,
                    ]}
                    onPress={() => setMode('link')}
                  >
                    <Text style={styles.modeBtnText}>Link Email</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <Text style={{ marginBottom: 16 }}>
                You are currently signed in. Press below to log out and switch
                to anonymous mode.
              </Text>
            )}

            <View style={styles.modalActions}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={isSignedIn ? handleLogout : handleSubmit}
                disabled={!isSignedIn && (!tempEmail || !tempPassword)}
              >
                <Text style={styles.saveBtn}>
                  {isSignedIn ? 'Log out' : 'Submit'}
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
    marginBottom: 12,
  },
  modeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  modeBtnActive: {
    backgroundColor: '#0a0f2c',
  },
  modeBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
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
