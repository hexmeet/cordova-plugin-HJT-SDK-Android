package com.hexmeet.hjt;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.text.TextUtils;
import android.widget.Toast;


import com.hexmeet.hjt.cache.SystemCache;
import com.hexmeet.hjt.call.AnonymousJoinMeetActivity;
import com.hexmeet.hjt.call.ConnectActivity;
import com.hexmeet.hjt.event.LoginResultEvent;
import com.hexmeet.hjt.model.LoginParams;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.log4j.Logger;
import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;
import org.json.JSONArray;
import org.json.JSONException;

public class HjtCordova extends CordovaPlugin {
    private Logger LOG = Logger.getLogger(HjtCordova.class);
    CallbackContext callbackContext;

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        this.callbackContext=callbackContext;

        if("initView".equals(action)){
            if(!EventBus.getDefault().isRegistered(this)){
                EventBus.getDefault().register(this);
            }
            if(PermissionWrapper.getInstance().checkStoragePermission(cordova.getActivity())) {
                HjtApp.getInstance().initLogs();
                HjtApp.getInstance().getAppService().reloadHardware();
            }
            return true;
        }
        if ("anonymousCall".equals(action)) {
                LOG.info("anonymousCall :" + data.get(0));
                callbackContext.success("success");
                String service = data.getString(0);
                String number = data.getString(1);
                String name = data.getString(2);
                setAnonymousConfig(service, number, name);
                return true;
            } else if ("login".equals(action)) {
                String service = data.getString(0);
                String user = data.getString(1);
                String Password = data.getString(2);
                dologin(service, user, Password);
                return true;

            } else if ("makeCall".equals(action)) {
                if(PermissionWrapper.getInstance().checkHexMeetPermission(cordova.getActivity())) {
                    HjtApp.getInstance().getAppService().enableVideo(true);
                    HjtApp.getInstance().getAppService().muteMic(false);
                    String number = data.getString(0);
                    Intent intent = new Intent();
                    intent.setClass(cordova.getActivity(), ConnectActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                    Bundle bundle = new Bundle();
                    bundle.putBoolean("isVideoCall", true);
                    bundle.putBoolean("isFromDialing", true);
                    bundle.putString("sipNumber", number);
                    intent.putExtras(bundle);
                    cordova.getActivity().startActivity(intent);

                    HjtApp.getInstance().getAppService().makeCall(number, null);
                }

                return true;
            } else if ("logout".equals(action)) {
                HjtApp.getInstance().getAppService().logout();
                callbackContext.success("logout");
                EventBus.getDefault().unregister(this);
                return true;
            }
        return false;
    }

    private void dologin(String service,String user,String Password) {
        LoginParams params = new LoginParams();
        params.setServerAddress(service);
        params.setUser_name(user);
        params.setPassword(Password);
        SystemCache.getInstance().setAnonymousMakeCall(false);
        HjtApp.getInstance().getAppService().loginInThread(params, true, null);
    }

    private void setAnonymousConfig(String service,String number,String displayName) {

        if(TextUtils.isEmpty(displayName)) {
            displayName = Build.MODEL;
        }
        SystemCache.getInstance().getJoinMeetingParam().setServer(service);
        SystemCache.getInstance().getJoinMeetingParam().setConferenceNumber(number);
        SystemCache.getInstance().getJoinMeetingParam().setPassword(null);
        SystemCache.getInstance().getJoinMeetingParam().setDisplayName(displayName);
        SystemCache.getInstance().getJoinMeetingParam().setCloud(true);
        HjtApp.getInstance().getAppService().enableVideo(true);
        HjtApp.getInstance().getAppService().muteMic(false);
        if(PermissionWrapper.getInstance().checkMeetingPermission(cordova.getActivity())) {
            HjtApp.getInstance().initLogs();
            HjtApp.getInstance().getAppService().reloadHardware();
            AnonymousJoinMeetActivity.gotoAnonymousMeeting(cordova.getActivity());
        }

    }


    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onLoginEvent(LoginResultEvent event) {
        LOG.info("onLoginEvent :" +event);
        if(SystemCache.getInstance().isAnonymousMakeCall() || event.isAnonymous()) {
            return;
        }
        if(event.getCode() == LoginResultEvent.LOGIN_SUCCESS) {
            callbackContext.success(SystemCache.getInstance().getLoginResponse().getDisplayName());
        }else {
            if(event.getCode() == LoginResultEvent.LOGIN_WRONG_PASSWORD || event.getCode() == LoginResultEvent.LOGIN_MANUAL_TRY){
                Toast.makeText(cordova.getActivity(),event.getMessage(),Toast.LENGTH_LONG).show();

            }else if(event.getCode() == LoginResultEvent.LOGIN_WRONG_PASSWORD_TIME){
                Toast.makeText(cordova.getActivity(),event.getMessage(),Toast.LENGTH_LONG).show();

            }else if(event.getCode() == LoginResultEvent.LOGIN_WRONG_INVALID_NAME){
                Toast.makeText(cordova.getActivity(),event.getMessage(),Toast.LENGTH_LONG).show();
            }else if(event.getCode() == LoginResultEvent.LOGIN_WRONG_NET){
                Toast.makeText(cordova.getActivity(),event.getMessage(),Toast.LENGTH_LONG).show();
            } else {
                Toast.makeText(cordova.getActivity(),event.getMessage(),Toast.LENGTH_LONG).show();
            }
            HjtApp.getInstance().getAppService().logout();

        }
    }

    @Override
    public void onStart() {
        super.onStart();
        LOG.info("onStart()");

    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) throws JSONException {
        int result = PermissionWrapper.getInstance().processRequestPermissionsResult(requestCode, grantResults);
        if(result == PermissionWrapper.RESULT_PERMISSIONS_PASS) {
        } else if (result == PermissionWrapper.RESULT_PERMISSIONS_REJECT) {
            Toast.makeText(cordova.getActivity(),"请开启权限",Toast.LENGTH_SHORT).show();
           cordova.getActivity().finish();
        }else if(requestCode == PermissionWrapper.REQUEST_PERMISSIONS_MEETING && result == PermissionWrapper.RESULT_PERMISSIONS_PASS){

        }

    }


}
