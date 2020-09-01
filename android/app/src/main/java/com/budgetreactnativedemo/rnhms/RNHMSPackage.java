package com.budgetreactnativedemo.rnhms;

import androidx.annotation.NonNull;

import com.budgetreactnativedemo.rnhms.authservice.RNHMSAuthservice;
import com.budgetreactnativedemo.rnhms.crash.RNHMSCrash;
import com.budgetreactnativedemo.rnhms.identity.RNHMSIdentity;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RNHMSPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNHMSIdentity(reactContext));
        modules.add(new RNHMSCrash(reactContext));
        modules.add(new RNHMSAuthservice(reactContext));
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return  Collections.emptyList();
    }
}
