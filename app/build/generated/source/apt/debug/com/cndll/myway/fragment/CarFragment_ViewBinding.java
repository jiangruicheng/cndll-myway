// Generated code from Butter Knife. Do not modify!
package com.cndll.myway.fragment;

import android.support.annotation.CallSuper;
import android.support.annotation.UiThread;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.cndll.myway.R;
import com.cndll.myway.view.ArcProgBar;
import java.lang.IllegalStateException;
import java.lang.Override;

public class CarFragment_ViewBinding<T extends CarFragment> implements Unbinder {
  protected T target;

  private View view2131558512;

  private View view2131558520;

  private View view2131558521;

  private View view2131558523;

  @UiThread
  public CarFragment_ViewBinding(final T target, View source) {
    this.target = target;

    View view;
    target.carId = Utils.findRequiredViewAsType(source, R.id.car_id, "field 'carId'", TextView.class);
    target.licheng = Utils.findRequiredViewAsType(source, R.id.licheng, "field 'licheng'", ArcProgBar.class);
    target.dianliang = Utils.findRequiredViewAsType(source, R.id.dianliang, "field 'dianliang'", ArcProgBar.class);
    target.biaopan = Utils.findRequiredViewAsType(source, R.id.biaopan, "field 'biaopan'", RelativeLayout.class);
    view = Utils.findRequiredView(source, R.id.search_ble, "field 'searchBle' and method 'onsearch_ble'");
    target.searchBle = Utils.castView(view, R.id.search_ble, "field 'searchBle'", TextView.class);
    view2131558512 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onsearch_ble();
      }
    });
    target.title = Utils.findRequiredViewAsType(source, R.id.title, "field 'title'", RelativeLayout.class);
    target.sudu = Utils.findRequiredViewAsType(source, R.id.sudu, "field 'sudu'", ArcProgBar.class);
    target.conn = Utils.findRequiredViewAsType(source, R.id.conn, "field 'conn'", LinearLayout.class);
    view = Utils.findRequiredView(source, R.id.statue, "field 'statue' and method 'onstatue'");
    target.statue = Utils.castView(view, R.id.statue, "field 'statue'", LinearLayout.class);
    view2131558520 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onstatue();
      }
    });
    target.connText = Utils.findRequiredViewAsType(source, R.id.conn_text, "field 'connText'", TextView.class);
    target.lockText = Utils.findRequiredViewAsType(source, R.id.lock_text, "field 'lockText'", TextView.class);
    target.modeText = Utils.findRequiredViewAsType(source, R.id.mode_text, "field 'modeText'", TextView.class);
    view = Utils.findRequiredView(source, R.id.sock, "field 'sock' and method 'onsock'");
    target.sock = Utils.castView(view, R.id.sock, "field 'sock'", LinearLayout.class);
    view2131558521 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onsock();
      }
    });
    view = Utils.findRequiredView(source, R.id.mode, "field 'mode' and method 'onmode'");
    target.mode = Utils.castView(view, R.id.mode, "field 'mode'", LinearLayout.class);
    view2131558523 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onmode();
      }
    });
  }

  @Override
  @CallSuper
  public void unbind() {
    T target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");

    target.carId = null;
    target.licheng = null;
    target.dianliang = null;
    target.biaopan = null;
    target.searchBle = null;
    target.title = null;
    target.sudu = null;
    target.conn = null;
    target.statue = null;
    target.connText = null;
    target.lockText = null;
    target.modeText = null;
    target.sock = null;
    target.mode = null;

    view2131558512.setOnClickListener(null);
    view2131558512 = null;
    view2131558520.setOnClickListener(null);
    view2131558520 = null;
    view2131558521.setOnClickListener(null);
    view2131558521 = null;
    view2131558523.setOnClickListener(null);
    view2131558523 = null;

    this.target = null;
  }
}
