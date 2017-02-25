// Generated code from Butter Knife. Do not modify!
package com.cndll.myway.activity;

import android.support.annotation.CallSuper;
import android.support.annotation.UiThread;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.cndll.myway.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class ConnectBleActivity_ViewBinding<T extends ConnectBleActivity> implements Unbinder {
  protected T target;

  private View view2131558480;

  private View view2131558484;

  private View view2131558481;

  @UiThread
  public ConnectBleActivity_ViewBinding(final T target, View source) {
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
    view = Utils.findRequiredView(source, R.id.send, "field 'send' and method 'onsend'");
    target.send = Utils.castView(view, R.id.send, "field 'send'", Button.class);
    view2131558484 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onsend();
      }
    });
    target.edit = Utils.findRequiredViewAsType(source, R.id.edit, "field 'edit'", EditText.class);
    target.show = Utils.findRequiredViewAsType(source, R.id.show, "field 'show'", TextView.class);
    view = Utils.findRequiredView(source, R.id.search_device, "field 'searchDevice' and method 'onsearche'");
    target.searchDevice = Utils.castView(view, R.id.search_device, "field 'searchDevice'", TextView.class);
    view2131558481 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onsearche();
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
    target.send = null;
    target.edit = null;
    target.show = null;
    target.searchDevice = null;
    target.title = null;

    view2131558480.setOnClickListener(null);
    view2131558480 = null;
    view2131558484.setOnClickListener(null);
    view2131558484 = null;
    view2131558481.setOnClickListener(null);
    view2131558481 = null;

    this.target = null;
  }
}
