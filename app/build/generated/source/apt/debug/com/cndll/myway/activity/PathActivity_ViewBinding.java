// Generated code from Butter Knife. Do not modify!
package com.cndll.myway.activity;

import android.support.annotation.CallSuper;
import android.support.annotation.UiThread;
import android.view.View;
import android.widget.FrameLayout;
import butterknife.Unbinder;
import butterknife.internal.Utils;
import com.cndll.myway.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class PathActivity_ViewBinding<T extends PathActivity> implements Unbinder {
  protected T target;

  @UiThread
  public PathActivity_ViewBinding(T target, View source) {
    this.target = target;

    target.webview = Utils.findRequiredViewAsType(source, R.id.webview, "field 'webview'", FrameLayout.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    T target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");

    target.webview = null;

    this.target = null;
  }
}
