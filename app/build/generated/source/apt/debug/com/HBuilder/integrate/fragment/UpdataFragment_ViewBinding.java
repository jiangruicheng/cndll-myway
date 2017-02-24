// Generated code from Butter Knife. Do not modify!
package com.HBuilder.integrate.fragment;

import android.support.annotation.CallSuper;
import android.support.annotation.UiThread;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.HBuilder.integrate.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class UpdataFragment_ViewBinding<T extends UpdataFragment> implements Unbinder {
  protected T target;

  private View view2131558546;

  @UiThread
  public UpdataFragment_ViewBinding(final T target, View source) {
    this.target = target;

    View view;
    target.back = Utils.findRequiredViewAsType(source, R.id.back, "field 'back'", ImageView.class);
    target.title = Utils.findRequiredViewAsType(source, R.id.title, "field 'title'", RelativeLayout.class);
    target.progUpdat = Utils.findRequiredViewAsType(source, R.id.prog_updat, "field 'progUpdat'", ProgressBar.class);
    target.updataProgtxt = Utils.findRequiredViewAsType(source, R.id.updata_progtxt, "field 'updataProgtxt'", TextView.class);
    view = Utils.findRequiredView(source, R.id.btn_updata, "field 'btnUpdata' and method 'onupdata'");
    target.btnUpdata = Utils.castView(view, R.id.btn_updata, "field 'btnUpdata'", Button.class);
    view2131558546 = view;
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
    target.progUpdat = null;
    target.updataProgtxt = null;
    target.btnUpdata = null;

    view2131558546.setOnClickListener(null);
    view2131558546 = null;

    this.target = null;
  }
}
