import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./confirmationModal.style";
import Button from "../../components/button/button";

interface ConfirmationModalProps {
  visible: boolean;
  message: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.headerText}>{message}</Text>
          </View>
          <View style={styles.buttonContent}>
            <Button
              text="Confirmar"
              outline={true}
              theme="primary"
              onPress={onConfirm}
            />
            <Button
              text="Cancelar"
              outline={false}
              theme="danger"
              onPress={onCancel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
