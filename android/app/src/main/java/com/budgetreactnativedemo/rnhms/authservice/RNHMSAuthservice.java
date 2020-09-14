package com.budgetreactnativedemo.rnhms.authservice;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.huawei.agconnect.auth.AGConnectAuth;
import com.huawei.agconnect.auth.AGConnectAuthCredential;
import com.huawei.agconnect.auth.AGConnectUser;
import com.huawei.agconnect.auth.EmailAuthProvider;
import com.huawei.agconnect.auth.EmailUser;
import com.huawei.agconnect.auth.HwIdAuthProvider;
import com.huawei.agconnect.auth.SignInResult;
import com.huawei.agconnect.auth.VerifyCodeResult;
import com.huawei.agconnect.auth.VerifyCodeSettings;
import com.huawei.hmf.tasks.OnFailureListener;
import com.huawei.hmf.tasks.OnSuccessListener;
import com.huawei.hmf.tasks.Task;
import com.huawei.hmf.tasks.TaskExecutors;
import com.huawei.hms.common.ApiException;
import com.huawei.hms.support.hwid.HuaweiIdAuthManager;
import com.huawei.hms.support.hwid.request.HuaweiIdAuthParams;
import com.huawei.hms.support.hwid.request.HuaweiIdAuthParamsHelper;
import com.huawei.hms.support.hwid.result.AuthHuaweiId;
import com.huawei.hms.support.hwid.service.HuaweiIdAuthService;

import org.json.JSONException;

import java.util.Locale;

public class RNHMSAuthservice extends ReactContextBaseJavaModule implements ActivityEventListener{
    private static final String TAG = "Auth Service";
    private AGConnectAuth auth;
    private Activity activity;
    private ReactApplicationContext mContext;
    private Promise mPromise;

    public RNHMSAuthservice(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
        mContext.addActivityEventListener(this);
    }
    @NonNull
    @Override
    public String getName() {
        return "HMSAuthservice";
    }

    
    @ReactMethod
    private void signInWithHuaweiAccount(final Promise mPromise) {
        this.mPromise = mPromise;
        auth = AGConnectAuth.getInstance();
        this.activity = getCurrentActivity();

        HuaweiIdAuthParams mHuaweiIdAuthParams = new HuaweiIdAuthParamsHelper(HuaweiIdAuthParams.DEFAULT_AUTH_REQUEST_PARAM).setAccessToken().createParams();
        HuaweiIdAuthService mHuaweiIdAuthService = HuaweiIdAuthManager.getService(mContext, mHuaweiIdAuthParams);
        this.activity.startActivityForResult(mHuaweiIdAuthService.getSignInIntent(), 1001);
     }
     @ReactMethod
     private void signOut(){
        Log.i("sign out successfulyy", "sign out");
         AGConnectAuth.getInstance().signOut();
         AGConnectAuth.getInstance().deleteUser();
     }

     @ReactMethod
     private void verifyEmail(String email, Promise promise){
         VerifyCodeSettings verifyCodeSettings = VerifyCodeSettings.newBuilder()
                 .action(VerifyCodeSettings.ACTION_REGISTER_LOGIN)
                 .sendInterval(30) //Minimum gönderme aralığı 30-120 sn. aralığındadır.
                 .locale(Locale.getDefault()) //İsteğe bağlı olarak doğrulama kodunun gönderildiği dil seçimi.
                 .build();
         Task<VerifyCodeResult> task = EmailAuthProvider.requestVerifyCode(email, verifyCodeSettings);
         task.addOnSuccessListener(TaskExecutors.uiThread(), new OnSuccessListener<VerifyCodeResult>() {
             @Override
             public void onSuccess(VerifyCodeResult verifyCodeResult) {
                 promise.resolve(verifyCodeResult.getValidityPeriod());
                 Toast.makeText(mContext, "Please check your e-mail", Toast.LENGTH_SHORT).show();
             }
         }).addOnFailureListener(TaskExecutors.uiThread(), new OnFailureListener() {
             @Override
             public void onFailure(Exception e) {

                 promise.resolve(e.getMessage());
                // Toast.makeText(mContext, e.getMessage(), Toast.LENGTH_SHORT).show();
             }
         });
     }
    @ReactMethod
     private void registerWithEmail(String email,String verificationCode,Promise promise) {
        WritableMap map = Arguments.createMap();

        EmailUser emailUser = new EmailUser.Builder()
                .setEmail(email)
                .setVerifyCode(verificationCode)
                .build();

        AGConnectAuth.getInstance().createUser(emailUser)
                .addOnSuccessListener(new OnSuccessListener<SignInResult>() {
                    @Override
                    public void onSuccess(SignInResult signInResult) {
                        Toast.makeText(mContext, "User successfully created.", Toast.LENGTH_SHORT).show();
                        Log.i(TAG,signInResult.toString());
                        map.putString("displayName", signInResult.getUser().getDisplayName());
                        map.putString("idToken", signInResult.getUser().getUid());
                        map.putString("email", signInResult.getUser().getEmail());
                        map.putString("phone", signInResult.getUser().getPhone());
                        map.putString("photoUriString", signInResult.getUser().getPhotoUrl());

                        promise.resolve(map);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(Exception e) {
                        promise.resolve(null);
                        Toast.makeText(mContext, e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
    }
    @ReactMethod
    private void signInWithEmail(String email, String verificationCode,Promise promise){
        WritableMap map = Arguments.createMap();
        AGConnectAuthCredential credential = EmailAuthProvider
                .credentialWithVerifyCode(email,null,verificationCode);

        AGConnectAuth.getInstance().signIn(credential)
                .addOnSuccessListener(new OnSuccessListener<SignInResult>() {
                    @Override
                    public void onSuccess(SignInResult signInResult) {
                        Toast.makeText(mContext, "Successfully Login", Toast.LENGTH_SHORT).show();
                        map.putString("displayName", signInResult.getUser().getDisplayName());
                        map.putString("idToken", signInResult.getUser().getUid());
                        map.putString("email", signInResult.getUser().getEmail());
                        map.putString("phone", signInResult.getUser().getPhone());
                        map.putString("photoUriString", signInResult.getUser().getPhotoUrl());

                        promise.resolve(map);
                        //startActivity(new Intent(getApplicationContext(), HomeActivity.class));
                    }})
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(Exception e) {
                        Toast.makeText(mContext, e.getMessage(), Toast.LENGTH_SHORT).show();
                        promise.resolve(null);
                    }});
    }
     @ReactMethod
     private void getCurrentUser(final Promise promise){
        AGConnectUser user = AGConnectAuth.getInstance().getCurrentUser();
         WritableMap map = Arguments.createMap();
            Log.i("get current user info", String.valueOf(AGConnectAuth.getInstance().getCurrentUser()));
         if (user != null) {
             if(user.isAnonymous()){
                 map.putString("displayName", "Anonymous");
             }else{
                 map.putString("displayName", user.getDisplayName());
                 map.putString("idToken", user.getUid());
                 map.putString("email", user.getEmail());
                 map.putString("phone", user.getPhone());
                 map.putString("photoUriString", user.getPhotoUrl());
             }
             promise.resolve(map);
         }else{
             promise.resolve(null);
         }
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        Log.i(TAG, "onActivityResult requestCode " + requestCode + " resultCode " + resultCode);
        if (mPromise != null && requestCode == 1001) {
            Task<AuthHuaweiId> authHuaweiIdTask = HuaweiIdAuthManager.parseAuthResultFromIntent(data);
            if (authHuaweiIdTask.isSuccessful()) {
                AuthHuaweiId huaweiAccount = authHuaweiIdTask.getResult();
                Log.i(TAG, "signIn success Access Token = " + huaweiAccount.getAccessToken());
                Log.i(TAG, "signIn success User Name = " + huaweiAccount.getDisplayName());
                try {
                    mPromise.resolve(huaweiAccount.toJson());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                transmitTokenIntoAppGalleryConnect(huaweiAccount.getAccessToken());
            } else {
                Log.i(TAG, "signIn failed: " + ((ApiException) authHuaweiIdTask.getException()).getStatusCode());
            }
        }
    }
    @ReactMethod
    private void signInWithAnonymousAccount(final Promise promise) {
        AGConnectAuth.getInstance().signInAnonymously().addOnSuccessListener(new OnSuccessListener<SignInResult>() {
            @Override
            public void onSuccess(SignInResult signInResult) {
                Log.i("Tag promise",signInResult.toString());
                promise.resolve(signInResult.toString());
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(Exception e) {
                Log.d(TAG, "Error " + e);
                promise.reject(e.toString());
            }
        });
    }

    private void transmitTokenIntoAppGalleryConnect(String accessToken) {
        AGConnectAuthCredential credential = HwIdAuthProvider.credentialWithToken(accessToken);
        AGConnectAuth.getInstance().signIn(credential).addOnSuccessListener(new OnSuccessListener<SignInResult>() {
            @Override
            public void onSuccess(SignInResult signInResult) {
                Log.d(TAG,"successfully");

            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(Exception e) {
                Log.d(TAG, "Error " + e);
            }
        });
    }
    @Override
    public void onNewIntent(Intent intent) {

    }
}

