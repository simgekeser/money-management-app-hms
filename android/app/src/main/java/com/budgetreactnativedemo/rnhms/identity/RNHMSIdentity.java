package com.budgetreactnativedemo.rnhms.identity;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.huawei.hmf.tasks.OnFailureListener;
import com.huawei.hmf.tasks.OnSuccessListener;
import com.huawei.hmf.tasks.Task;
import com.huawei.hms.identity.Address;
import com.huawei.hms.identity.entity.GetUserAddressResult;
import com.huawei.hms.identity.entity.UserAddress;
import com.huawei.hms.identity.entity.UserAddressRequest;
import com.huawei.hms.support.api.client.Status;

import static android.content.ContentValues.TAG;

public class RNHMSIdentity extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    private static final int GET_ADDRESS = 1000;
    public RNHMSIdentity(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
        this.mContext.addActivityEventListener(mActivityEventListener);
    }

    @NonNull
    @Override
    public String getName() {
        return "HMSIdentity";
    }
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
            super.onActivityResult(requestCode, resultCode, data);
            Log.i(TAG, "onActivityResult requestCode " + requestCode + " resultCode " + resultCode);
            switch (requestCode) {
                case GET_ADDRESS:
                    switch (resultCode) {
                        case Activity.RESULT_OK:
                            UserAddress userAddress = UserAddress.parseIntent(data);
                            if (userAddress != null) {
                                StringBuilder sb = new StringBuilder();
                                sb.append("" + userAddress.getName());
                                sb.append(" " + userAddress.getPhoneNumber());
                                sb.append(" " + userAddress.getEmailAddress());
                                sb.append(System.lineSeparator() + userAddress.getCountryCode() + " ");
                                sb.append(userAddress.getAdministrativeArea());
                                if (userAddress.getLocality() != null) {
                                    sb.append(userAddress.getLocality());
                                }
                                if (userAddress.getAddressLine1() != null) {
                                    sb.append(userAddress.getAddressLine1());
                                }
                                sb.append(userAddress.getAddressLine2());
                                if (!"".equals(userAddress.getPostalNumber())) {
                                    sb.append(System.lineSeparator() + userAddress.getPostalNumber());
                                }
                                Log.i(TAG, "user address is " + sb.toString());
//                                if (textView != null) {
//                                    textView.setText(sb.toString());
//                                }
                            } else {
//                                if (textView != null) {
//                                    textView.setText("Failed to get user address.");
//                                }
                                Toast.makeText(mContext, "the user address is null.", Toast.LENGTH_SHORT)
                                        .show();
                            }
                            break;
                        case Activity.RESULT_CANCELED:
                            Toast.makeText(mContext, "cancel_adress", Toast.LENGTH_SHORT)
                                    .show();
                            break;
                        default:
                            Log.i(TAG, "result is wrong, result code is " + resultCode);
                            Toast.makeText(mContext, "the user address is null.", Toast.LENGTH_SHORT).show();
                            break;
                    }
                    break;
                default:
                    break;
            }
    }
    };
    @ReactMethod
    private void getUserAddress() {
        UserAddressRequest req = new UserAddressRequest();
        Task<GetUserAddressResult> task = Address.getAddressClient(mContext).getUserAddress(req);
        task.addOnSuccessListener(new OnSuccessListener<GetUserAddressResult>() {
            @Override
            public void onSuccess(GetUserAddressResult result) {
                Log.i(TAG, "onSuccess result code:" + result.getReturnCode());
                try {
                    startActivityForResult(result);
                } catch (IntentSender.SendIntentException e) {
                    e.printStackTrace();
                }
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(Exception e) {
                Log.i(TAG, "on Failed result code:" + e.getMessage());
            }
        });

    }
    private void startActivityForResult(GetUserAddressResult result) throws IntentSender.SendIntentException {
        Status status = result.getStatus();
        if (result.getReturnCode() == 0 && status.hasResolution()) {
            Log.i(TAG, "the result had resolution.");
            status.startResolutionForResult(getCurrentActivity(), GET_ADDRESS);
        } else {
            Log.i(TAG, "the response is wrong, the return code is " + result.getReturnCode());
        }
    }
}
