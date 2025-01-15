import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import {BackButton, C_Button} from '../../../components';
import Colors from '../../../themes/Colors';
import {FontSize, FontsWeights} from '../../../themes/Fonts';
import {QrCodeIcon} from '../../../assets/icons';
import {
  FareCalculations,
  ModalWrapper,
} from '../../../components/Modal';

const Summary = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={CommonStyles.container}>
      <BackButton text="Summary" left />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <View style={styles.summaryHeader}>
                <Text style={[styles.desc, {color: Colors.white}]}>
                  Amount to be collected
                </Text>
                <Text
                  style={[styles.desc, styles.hedaer, {color: Colors.white}]}>
                  ₹1500/-
                </Text>
              </View>
              <View style={[styles.summaryHeader, styles.summaryHeader2]}>
                <Text style={[styles.desc]}>Amount to be collected</Text>
                <Text style={[styles.desc, styles.hedaer]}>₹1500/-</Text>
              </View>

              <View style={[styles.summaryHeader, styles.summaryHeader3]}>
                <Text style={[styles.desc, styles.hedaer]}>QR Code</Text>
                <Text style={[styles.desc, {marginBottom: 20}]}>
                  Scan & Pay
                </Text>
                <QrCodeIcon />
              </View>
            </>
          );
        }}
        ListFooterComponent={<View style={{height: 90}} />}
      />
      <View style={[CommonStyles.bottomView, {paddingHorizontal: 20}]}>
        <C_Button title="Collect Cash" onPress={toggleModal} />
      </View>
      <ModalWrapper
        visible={isModalVisible}
        onRequestClose={toggleModal}
        extraClose>
        <FareCalculations />
      </ModalWrapper>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  summaryHeader: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 20,
  },
  summaryHeader2: {
    width: '90%',
    margin: 20,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 9,
  },
  summaryHeader3: {
    margin: 20,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  desc: {
    fontSize: FontSize.FS14,
    alignSelf: 'center',
    color: Colors.primary,
  },
  hedaer: {
    fontSize: FontSize.FS20,
    alignSelf: 'center',
    fontWeight: FontsWeights.FW500,
  },
});
