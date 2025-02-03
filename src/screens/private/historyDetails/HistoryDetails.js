import { FlatList, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { CommonStyles } from '../../../themes/CommonStyles';
import {
  BackButton,
  BasicDetails,
  EstimatedFareDetails,
  Timeline,
} from '../../../components';

const HistoryDetails = () => {
  const route = useRoute();
  const { item } = route.params || {}; 
  // console.log("object====>>",JSON.stringify(item,null,2))

  return (
    <View style={CommonStyles.container}>
      <BackButton left text={item?.orderId} />
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <>
            <BasicDetails item={item} />
            <Timeline item={item} />
            <EstimatedFareDetails item={item} />
          </>
        )}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />
    </View>
  );
};

export default HistoryDetails;
