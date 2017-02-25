// Generated code from Butter Knife. Do not modify!
package com.cndll.myway.fragment;

import android.support.annotation.CallSuper;
import android.support.annotation.UiThread;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.cndll.myway.R;
import com.cndll.myway.view.ArcCheckOut;
import java.lang.IllegalStateException;
import java.lang.Override;

public class CarCheckOutFragment_ViewBinding<T extends CarCheckOutFragment> implements Unbinder {
  protected T target;

  private View view2131558480;

  private View view2131558526;

  @UiThread
  public CarCheckOutFragment_ViewBinding(final T target, View source) {
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
    view = Utils.findRequiredView(source, R.id.arcprog, "field 'arcprog' and method 'onarcprog'");
    target.arcprog = Utils.castView(view, R.id.arcprog, "field 'arcprog'", ArcCheckOut.class);
    view2131558526 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onarcprog();
      }
    });
    target.path = Utils.findRequiredViewAsType(source, R.id.path, "field 'path'", LinearLayout.class);
    target.mesg = Utils.findRequiredViewAsType(source, R.id.mesg, "field 'mesg'", TextView.class);
    target.checkoutWrong = Utils.findRequiredViewAsType(source, R.id.checkout_wrong, "field 'checkoutWrong'", LinearLayout.class);
    target.screen = Utils.findRequiredViewAsType(source, R.id.screen, "field 'screen'", TextView.class);
    target.qudong = Utils.findRequiredViewAsType(source, R.id.qudong, "field 'qudong'", TextView.class);
    target.power = Utils.findRequiredViewAsType(source, R.id.power, "field 'power'", TextView.class);
    target.dianji = Utils.findRequiredViewAsType(source, R.id.dianji, "field 'dianji'", TextView.class);
    target.msocket = Utils.findRequiredViewAsType(source, R.id.msocket, "field 'msocket'", TextView.class);
    target.monmistake = Utils.findRequiredViewAsType(source, R.id.monmistake, "field 'monmistake'", TextView.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    T target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");

    target.back = null;
    target.title = null;
    target.arcprog = null;
    target.path = null;
    target.mesg = null;
    target.checkoutWrong = null;
    target.screen = null;
    target.qudong = null;
    target.power = null;
    target.dianji = null;
    target.msocket = null;
    target.monmistake = null;

    view2131558480.setOnClickListener(null);
    view2131558480 = null;
    view2131558526.setOnClickListener(null);
    view2131558526 = null;

    this.target = null;
  }
}
