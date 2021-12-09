export const onAndroidBackHandler = () => {
  if (webViewRef.current) {
    webViewRef.current.goBack();
    return true;
  }
  return false;
};
