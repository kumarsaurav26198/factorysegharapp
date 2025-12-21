import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Colors from '../themes/Colors';

interface AlertContextType {
  show: (title: string, message: string, actionText?: string, onConfirm?: () => void) => void;
  hide: () => void;
}

const AlertContext = createContext<AlertContextType>({
  show: () => {},
  hide: () => {},
});

let globalShow: (title: string, message: string, actionText?: string, onConfirm?: () => void) => void =
  () => {};
let globalHide: () => void = () => {};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [actionText, setActionText] = useState<string>('OK');
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  const show = (ttl: string, msg: string, actText: string = 'OK', confirmCallback?: () => void) => {
    setTitle(ttl);
    setMessage(msg);
    setActionText(actText);
    setOnConfirm(() => confirmCallback);
    setVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hide = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  };

  useEffect(() => {
    globalShow = show;
    globalHide = hide;
  }, []);

  return (
    <AlertContext.Provider value={{ show, hide }}>
      {children}
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttons}>
  {onConfirm && (
    <TouchableOpacity style={styles.cancelBtn} onPress={hide}>
      <Text style={styles.cancelText}>Cancel</Text>
    </TouchableOpacity>
  )}

  <TouchableOpacity
    style={[styles.confirmBtn, !onConfirm && { marginLeft: 0 }]}
    onPress={() => {
      hide();
      onConfirm?.();
    }}
  >
    <Text style={styles.confirmText}>{actionText}</Text>
  </TouchableOpacity>
</View>

{/* 
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={hide}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              {onConfirm && (
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={() => {
                    hide();
                    onConfirm();
                  }}
                >
                  <Text style={styles.confirmText}>{actionText}</Text>
                </TouchableOpacity>
              )}
            </View> */}
          </Animated.View>
        </View>
      </Modal>
    </AlertContext.Provider>
  );
};

export const useCustomAlert = () => useContext(AlertContext);

export const CustomAlertService = {
  show: (
    title: string,
    message: string,
    actionText?: string,
    onConfirm?: () => void
  ) => globalShow(title, message, actionText, onConfirm),
  hide: () => globalHide(),
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    color: '#444',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
  },
  confirmBtn: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  cancelText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
  },
  confirmText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
});

