import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton } from '../../../components';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { useActions } from '../../../hooks/useActions';
import { connect } from 'react-redux';
import { useRoute } from '@react-navigation/native';

const AboutUs = ({ pageRes }) => {
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

  const pageData = pageRes?.data;

  return (
    <View style={CommonStyles.container}>
      <BackButton left text={title || 'About Us'} />

      {pageRes?.loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
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
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Page Title */}
          <Text style={styles.headingText}>
            {pageData?.title}
          </Text>

          {/* Page Content */}
          <Text style={styles.policyText}>
            {pageData?.content}
          </Text>

          <View style={{ height: 80 }} />
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  pageRes: state?.pagebyNameReducers,
});

export default connect(mapStateToProps)(AboutUs);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  policyText: {
    fontSize: FontSize.FS15,
    color: Colors.black,
    lineHeight: 24,
    textAlign: 'left',
  },
  headingText: {
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: FontSize.FS14,
    color: Colors.red,
    marginBottom: 20,
    textAlign: 'center',
  },
  refreshButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  refreshButtonText: {
    fontSize: FontSize.FS14,
    color: Colors.white,
  },
});
