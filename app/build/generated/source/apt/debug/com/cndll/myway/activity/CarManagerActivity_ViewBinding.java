// Generated code from Butter Knife. Do not modify!
package com.cndll.myway.activity;

import android.support.annotation.CallSuper;
import android.support.annotation.UiThread;
import android.view.View;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.cndll.myway.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class CarManagerActivity_ViewBinding<T extends CarManagerActivity> implements Unbinder {
  protected T target;

  private View view2131558480;

  private View view2131558481;

  @UiThread
  public CarManagerActivity_ViewBinding(final T target, View source) {
    this.target = target;

    View view;
    view = Utils.findRequiredView(source, R.id.back, "field 'back' and method 'onback'");
    target.back = Utils.castView(view, R.id.back, "field 'back'", TextView.class);
    view2131558480 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onback();
      }
    });
    target.deviceList = Utils.findRequiredViewAsType(source, R.id.device_list, "field 'deviceList'", ListView.class);
    view = Utils.findRequiredView(source, R.id.search_device, "field 'searchDevice' and method 'onsearch'");
    target.searchDevice = Utils.castView(view, R.id.search_device, "field 'searchDevice'", TextView.class);
    view2131558481 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onsearch();
      }
    });
    target.title = Utils.findRequiredViewAsType(source, R.id.title, "field 'title'", RelativeLayout.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    T target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");

    target.back = null;
    target.deviceList = null;
    target.searchDevice = null;
    target.title = null;

    view2131558480.setOnClickListener(null);
    view2131558480 = null;
    view2131558481.setOnClickListener(null);
    view2131558481 = null;

    this.target = null;
  }
}
