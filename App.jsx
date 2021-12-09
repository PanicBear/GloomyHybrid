import React, { useEffect, useRef } from 'react';
import { BackHandler, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { WebViewContainrer } from './container';
import { onAndroidBackHandler } from './handler';
import { COLOR } from './style';

const App = () => {
  const webViewRef = useRef();
  useEffect(() => {
    Platform.OS === 'android' && BackHandler.addEventListener('hardwareBackPress', () => onAndroidBackHandler())
    return BackHandler.removeEventListener('hardwareBackPress', () => onAndroidBackHandler());
  }, [])
  useEffect(() => {
    PermissionsAndroid.requestMultiple(
      ['android.permission.CAMERA',
        'android.permission.READ_EXTERNAL_STORAGE',]
    ).then((permissions) => {
      setPermissions(permissions);
    });
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <WebViewContainrer style={styles.webview} webViewRef={webViewRef} permissions />
      <StatusBar backgroundColor={COLOR.GRAY02} barStyle={'dark-content'} />
    </SafeAreaView>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  webview: {
    flex: 1,
  },
});

