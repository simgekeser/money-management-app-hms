package com.budgetreactnativedemo.rnhms.crash;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.huawei.agconnect.crash.AGConnectCrash;

public class RNHMSCrash extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    public RNHMSCrash(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
        AGConnectCrash.getInstance().enableCrashCollection(true);
    }
    @NonNull
    @Override
    public String getName() {
        return "HMSCrash";
    }

    @ReactMethod
    public void testAgcConnectCrash() {
        AGConnectCrash.getInstance().testIt(mContext);
    }
}
