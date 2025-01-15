import { View, StyleSheet, Text, Button } from 'react-native';
import React, { forwardRef, useMemo } from 'react';
import BottomSheet, { BottomSheetScrollView, useBottomSheet } from '@gorhom/bottom-sheet';

const CloseBtn = () => {
  const { close } = useBottomSheet();

  return <Button title="Close" onPress={() => close()} />;
};

const CustomBottomSheet = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => [ '30%', '60%',"70%"], []);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
    //   enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: '#fff' }}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        {props.children} 
        {/* <CloseBtn /> */}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
    color: '#fff',
  },
});

export default CustomBottomSheet;
