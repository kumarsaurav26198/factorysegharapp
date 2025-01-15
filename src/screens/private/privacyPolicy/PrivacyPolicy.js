import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton } from '../../../components';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { useActions } from '../../../hooks/useActions';
import { connect } from 'react-redux';

const PrivacyPolicy = ({ navigation, pageRes }) => {
  const pagedatares = pageRes?.data.data;
//   console.log(pagedatares);
  const { fetchPagebyNameDetails } = useActions();
  const [ refreshing, setRefreshing ] = useState(false);
  useEffect(() => {
    fetchPagebyNameDetails({ pagename: 'policy' });
  }, [ ]); 

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPagebyNameDetails({ pagename: 'policy' });
    setRefreshing(false);
  }, []);


  const policyText = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  ];

  return (
    <View style={CommonStyles.container}>
      <BackButton left text="Privacy Policy" />
      <View style={{ paddingHorizontal: 20, }}>
        <FlatList
          data={policyText}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={ <Text style={[styles.policyText,styles.headingText]}>{pagedatares?.heading}</Text>}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Text style={styles.policyText}>{item}</Text>
          )}
          ListFooterComponent={<View style={{ height: 150 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  pageRes: state?.pagebyNameReducers,
});
export default connect(mapStateToProps)(PrivacyPolicy);

const styles = StyleSheet.create({
  policyText: {
    fontSize: FontSize.FS14,
    color: Colors.black,
    lineHeight: 22,
    marginBottom: 20,
  },
  headingText: {
    fontSize: FontSize.FS18,
    fontWeight:FontsWeights.FW500,
    color: Colors.black,
    lineHeight: 22,
    marginBottom: 20,
  },
});
