import { FlatList, View } from 'react-native';
import React from 'react';
import { CommonStyles } from '../../../themes/CommonStyles';
import {
  BackButton,
  BasicDetails,
  EstimatedFareDetails,
  Timeline,
} from '../../../components';

const HistoryDetails = () => {
  return (
    <View style={CommonStyles.container}>
      <BackButton left text="#0CAC6C665" />
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <Timeline />
              <BasicDetails />
              <EstimatedFareDetails />
            </>
          );
        }}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />
    </View>
  );
};
export default HistoryDetails;
