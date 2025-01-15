import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { CommonStyles } from '../../themes/CommonStyles';
import { ModalClose } from '../../assets/icons';

const ModalWrapper = ({ visible, onRequestClose, children, center, extraClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}>
            <View style={[ CommonStyles.modalContainer, center ? CommonStyles.modalContainerCenter : CommonStyles.modalContainer ]}>
                {extraClose &&
                    <TouchableOpacity style={{ position: "absolute", bottom: 400, alignSelf: "center" }} onPress={onRequestClose}>
                        <ModalClose />
                    </TouchableOpacity>}
                <View style={[ CommonStyles.modalContentCenter, center ? CommonStyles.modalContentCenter : CommonStyles.modalContent ]}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export default ModalWrapper;
