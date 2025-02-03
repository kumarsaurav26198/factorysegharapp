import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton } from '../../../components';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { useActions } from '../../../hooks/useActions';
import { connect } from 'react-redux';
import { useRoute } from '@react-navigation/native';

const AboutUs = ({ navigation, pageRes }) => {
  const route = useRoute();
  const { pagename, title } = route.params || {};
  const { fetchPagebyNameDetails } = useActions();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (pagename) {
      fetchPagebyNameDetails({ pagename });
    }
  }, [pagename]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (pagename) {
      fetchPagebyNameDetails({ pagename });
    }
    setRefreshing(false);
  }, [pagename]);

  const policyText = pageRes?.data[0]; // Assuming pageRes.data is an array and you're accessing the first item

  return (
    <View style={CommonStyles.container}>
      <BackButton left text={title} />
      <View style={{ paddingHorizontal: 20 }}>
        {pageRes?.loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : pageRes?.error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {pageRes.error?.response?.data?.message ||
                'An error occurred. Please try again later.'}
            </Text>
            <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
              <Text style={styles.refreshButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={[policyText]} // Wrap policyText in an array if it's not an array
            keyExtractor={(item, index) => index.toString()} // Ensure a unique key is used
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Text style={[styles.policyText, styles.headingText]}>
                {policyText?.Title}
              </Text>
            }
            renderItem={({ item }) => (
              <Text style={styles.policyText}>{item?.content}</Text>
            )}
            ListFooterComponent={<View style={{ height: 150 }} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  pageRes: state?.pagebyNameReducers,
});

export default connect(mapStateToProps)(AboutUs);

const styles = StyleSheet.create({
  policyText: {
    fontSize: FontSize.FS15,
    color: Colors.black,
    lineHeight: 22,
    // marginBottom: 20,
  },
  headingText: {
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW500,
    color: Colors.black,
    lineHeight: 22,
    marginTop: 20,
    marginBottom:20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:100
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FontSize.FS14,
    color: Colors.red,
    marginBottom: 20,
  },
  refreshButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.blue,
    borderRadius: 5,
  },
  refreshButtonText: {
    fontSize: FontSize.FS14,
    color: Colors.white,
  },
});
