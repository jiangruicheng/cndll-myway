package com.HBuilder.integrate.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.HBuilder.integrate.Ifeature.IWebViewFactroy;
import com.HBuilder.integrate.R;

import butterknife.BindView;
import butterknife.ButterKnife;
import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.IWebviewStateListener;
import io.dcloud.feature.internal.sdk.SDK;

public class PathActivity extends Activity {

    @BindView(R.id.webview)
    FrameLayout webview;
    IWebview              iWebview;
    IWebviewStateListener webviewStateListener;
    private boolean isload = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_path);
        ButterKnife.bind(this);

        //Toast.makeText(this, "" + SDK.obtainAllIWebview().size(), Toast.LENGTH_SHORT).show();
        if (IWebViewFactroy.getiWebview() == null) {
            iWebview = SDK.createWebview(this, "file:///android_asset/apps/H50CFBACD/www/view/today-road.html", /*SDK.obtainCurrentRunnbingAppId(),*/ new IWebviewStateListener() {
                @Override
                public Object onCallBack(int i, Object o) {
                    if (i == ON_PAGE_FINISHED && !isload) {
                        //iWebview.evalJS("alert('123');");
                        isload = false;
                    }
                    return null;
                }
            });
            IWebViewFactroy.setiWebview(iWebview);
        } else {
            iWebview = IWebViewFactroy.getiWebview();
        }
        //SDK.obtainWebview(SDK.obtainCurrentRunnbingAppId(), iWebview.getWebviewUUID());
        //iWebview = SDK.obtainWebview(SDK.obtainCurrentRunnbingAppId(), "car.html");
        // Toast.makeText(this, "" + iWebview.obtainFullUrl(), Toast.LENGTH_SHORT).show();
        View v = iWebview.obtainApp().obtainWebAppRootView().obtainMainView();
        if (v.getParent() != null) {
            ((ViewGroup) (v.getParent())).removeView(v);
        }
        webview.addView(v);
        // iWebview.evalJS("alert(123);");

        /*for (IWebview a : SDK.obtainAllIWebview()) {
            Log.d("iwebview", "onCreate: " + a.obtainFullUrl());
        }*/
        /*iWebview = SDK.createWebview(this, "path", new IWebviewStateListener() {
            @Override
            public Object onCallBack(int i, Object o) {
                switch (i) {
                    case ON_PAGE_STARTED:
                        break;
                    case ON_PAGE_FINISHED:
                        SDK.attach(webview, iWebview);
                        break;
                }
                return null;
            }
        });*/
       /* iWebview.loadUrl(SDK.obtainCurrentApp().obtainWebviewBaseUrl()
                + "view/active.html");*/
        //iWebview.loadUrl("http://www.baidu.com");

    }

    @Override
    protected void onStart() {
        super.onStart();

        // SDK.attach(webview, SDK.obtainAllIWebview().get(SDK.obtainAllIWebview().size() - 1));
        //webview.setVisibility(View.GONE);
    }

    @Override
    protected void onStop() {
        // SDK.popWebView(IWebViewFactroy.getiWebview());
        super.onStop();
        // SDK.obtainAllIWebview().remove(iWebview);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
       /* if (keyCode == KeyEvent.KEYCODE_BACK) {
            iWebview.evalJS("mui.back();");
            return true;
        }*/
        return super.onKeyDown(keyCode, event);
    }
}
