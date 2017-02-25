// Generated code from Butter Knife. Do not modify!
package com.cndll.myway;

import android.support.annotation.CallSuper;
import android.support.annotation.UiThread;
import android.view.View;
import android.widget.FrameLayout;
import butterknife.Unbinder;
import butterknife.internal.Utils;
import java.lang.IllegalStateException;
import java.lang.Override;

public class SDK_WebApp_ViewBinding<T extends SDK_WebApp> implements Unbinder {
  protected T target;

  @UiThread
  public SDK_WebApp_ViewBinding(T target, View source) {
    this.target = target;

    target.webview = Utils.findRequiredViewAsType(source, R.id.webview, "field 'webview'", FrameLayout.class);
    target.frame = Utils.findRequiredViewAsType(source, R.id.frame, "field 'frame'", FrameLayout.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    T target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");

    target.webview = null;
    target.frame = null;

    this.target = null;
  }
}
