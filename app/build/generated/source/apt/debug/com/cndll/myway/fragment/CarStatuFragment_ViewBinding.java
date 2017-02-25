// Generated code from Butter Knife. Do not modify!
package com.cndll.myway.fragment;

import android.support.annotation.CallSuper;
import android.support.annotation.UiThread;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.SeekBar;
import android.widget.TextView;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.cndll.myway.R;
import com.suke.widget.SwitchButton;
import java.lang.IllegalStateException;
import java.lang.Override;

public class CarStatuFragment_ViewBinding<T extends CarStatuFragment> implements Unbinder {
  protected T target;

  private View view2131558480;

  private View view2131558525;

  private View view2131558527;

  private View view2131558541;

  private View view2131558542;

  private View view2131558543;

  @UiThread
  public CarStatuFragment_ViewBinding(final T target, View source) {
    this.target = target;

    View view;
    view = Utils.findRequiredView(source, R.id.back, "field 'back' and method 'onback'");
    target.back = Utils.castView(view, R.id.back, "field 'back'", ImageView.class);
    view2131558480 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onback();
      }
    });
    target.title = Utils.findRequiredViewAsType(source, R.id.title, "field 'title'", RelativeLayout.class);
    view = Utils.findRequiredView(source, R.id.path, "field 'path' and method 'onPath'");
    target.path = Utils.castView(view, R.id.path, "field 'path'", LinearLayout.class);
    view2131558525 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onPath();
      }
    });
    view = Utils.findRequiredView(source, R.id.checkout_wrong, "field 'checkoutWrong' and method 'oncheckout'");
    target.checkoutWrong = Utils.castView(view, R.id.checkout_wrong, "field 'checkoutWrong'", LinearLayout.class);
    view2131558527 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.oncheckout();
      }
    });
    target.buttonLayout = Utils.findRequiredViewAsType(source, R.id.button_layout, "field 'buttonLayout'", LinearLayout.class);
    target.seekbarSpeed = Utils.findRequiredViewAsType(source, R.id.seekbar_speed, "field 'seekbarSpeed'", SeekBar.class);
    target.textSpeed = Utils.findRequiredViewAsType(source, R.id.text_speed, "field 'textSpeed'", TextView.class);
    target.textHandle = Utils.findRequiredViewAsType(source, R.id.text_handle, "field 'textHandle'", TextView.class);
    target.btnHandle = Utils.findRequiredViewAsType(source, R.id.btn_handle, "field 'btnHandle'", SwitchButton.class);
    target.exp = Utils.findRequiredViewAsType(source, R.id.exp, "field 'exp'", TextView.class);
    view = Utils.findRequiredView(source, R.id.checkout_car, "field 'checkoutCar' and method 'oncheckoutcar'");
    target.checkoutCar = Utils.castView(view, R.id.checkout_car, "field 'checkoutCar'", TextView.class);
    view2131558541 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.oncheckoutcar();
      }
    });
    target.checkoutCarLayout = Utils.findRequiredViewAsType(source, R.id.checkout_car_layout, "field 'checkoutCarLayout'", LinearLayout.class);
    view = Utils.findRequiredView(source, R.id.repassword, "field 'repassword' and method 'repassword'");
    target.repassword = Utils.castView(view, R.id.repassword, "field 'repassword'", TextView.class);
    view2131558542 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.repassword();
      }
    });
    view = Utils.findRequiredView(source, R.id.updata, "field 'updata' and method 'onupdata'");
    target.updata = Utils.castView(view, R.id.updata, "field 'updata'", TextView.class);
    view2131558543 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onupdata();
      }
    });
  }

  @Override
  @CallSuper
  public void unbind() {
    T target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");

    target.back = null;
    target.title = null;
    target.path = null;
    target.checkoutWrong = null;
    target.buttonLayout = null;
    target.seekbarSpeed = null;
    target.textSpeed = null;
    target.textHandle = null;
    target.btnHandle = null;
    target.exp = null;
    target.checkoutCar = null;
    target.checkoutCarLayout = null;
    target.repassword = null;
    target.updata = null;

    view2131558480.setOnClickListener(null);
    view2131558480 = null;
    view2131558525.setOnClickListener(null);
    view2131558525 = null;
    view2131558527.setOnClickListener(null);
    view2131558527 = null;
    view2131558541.setOnClickListener(null);
    view2131558541 = null;
    view2131558542.setOnClickListener(null);
    view2131558542 = null;
    view2131558543.setOnClickListener(null);
    view2131558543 = null;

    this.target = null;
  }
}
