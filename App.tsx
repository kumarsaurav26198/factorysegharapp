import { LogBox, StatusBar } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Navigator from './src/navigation/Navigator';
import { Splashscreen } from './src/screens/public';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store, { persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setNavigator } from './src/services/navigationService';
import { BottomSheetProvider } from './src/components/Modal/BottomSheetWrapper';
import { API_URL } from '@env';

const App = () => {
  const navigationRef = useRef();

  LogBox.ignoreLogs([ 'Warning: ...' ]);
  LogBox.ignoreAllLogs();
  // console.log("API_URL===>",API_URL)
  const queryClient = new QueryClient();
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Splashscreen />;
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <BottomSheetProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                  <NavigationContainer ref={navigationRef} onReady={() => setNavigator(navigationRef.current)}>
                    <Navigator />
                  </NavigationContainer>
                </QueryClientProvider>
              </PersistGate>
            </Provider>
          </BottomSheetProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
export default App;

