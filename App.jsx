import React, { useEffect, useRef } from 'react';
import { BackHandler, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { WebViewContainrer } from './container';
import { onAndroidBackHandler } from './handler';
import { COLOR } from './style';
/* 
  pro - androidCanGoBack을 state로 관리할 경우 
  자체적으로 뒤로 갈 수 있는지 여부를 관리가능

  con - 매번 state 코드를 호출하기에 성능이슈

  ==> 카카오 사업자 등록되고나서 로그인 페이지로 가는 현상 막히면 추가처리 안해도 됨
 */
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

