package com.gloomyhybrid;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.NonNull;

import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class WebViewSupportModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public WebViewSupportModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "WebViewSupportModule";
    }


    @ReactMethod
    public void initWebView() {
        Activity activity = getCurrentActivity();
        //the id for the ReactRootView is always be 1
        @SuppressLint("ResourceType") View view = activity.findViewById(1);
        ReactRootView reactRootView = (ReactRootView) view;
        reactRootView.setOnHierarchyChangeListener(new ViewGroup.OnHierarchyChangeListener() {
            @Override
            public void onChildViewAdded(View parent, final View child) {
                if (child instanceof WebView) {
                    setWebView(((WebView) child).getSettings());
                    // TODO: addImgDownloadHandler(webView);
                }
            }

            @Override
            public void onChildViewRemoved(View parent, View child) {
            }
        });
    }

    @ReactMethod
    public void parseIntentUri(String uri, Promise promise) {
        try {
            Intent uriIntent = Intent.parseUri(uri, Intent.URI_INTENT_SCHEME);
            // 실행 가능한 앱이 있으면 앱 실행
            if (uriIntent.resolveActivity(reactContext.getPackageManager()) != null) {
                reactContext.startActivity(uriIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
                promise.resolve(true);
            }
            promise.resolve(false);
        } catch (Exception e) {
            Log.e("parseIntentUri", e.toString());
            promise.resolve(false);
        }
    }

    private void setWebView(WebSettings settings) {
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAppCacheEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setUseWideViewPort(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        settings.setSupportZoom(true);
        settings.setDefaultTextEncodingName("utf-8");
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
    }
}
