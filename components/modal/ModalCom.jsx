import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

const ModalCom = ({open, setOpen, content}) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => setOpen(!open)} // Close on back press (Android)
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select a Game</Text>
          {/* Buttons */}

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setOpen(!open), navigation.navigate('CarGameScreen');
            }}>
            <Text style={styles.buttonText}>Car Game</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setOpen(!open), navigation.navigate('WordGameScreen');
            }}>
            <Text style={styles.buttonText}>Word Game</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setOpen(!open)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  openButton: {backgroundColor: '#7D4DD3', padding: 15, borderRadius: 10},
  openButtonText: {color: 'white', fontWeight: 'bold'},
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 20},
  modalButton: {
    backgroundColor: '#7D4DD3',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {color: 'white', fontWeight: 'bold'},
});

export default ModalCom;
