package com.HBuilder.integrate.fragment;


import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.HBuilder.integrate.R;
import com.HBuilder.integrate.RXbus.RxBus;
import com.HBuilder.integrate.data.Command;
import com.HBuilder.integrate.eventtype.SendCmd;
import com.HBuilder.integrate.eventtype.UpdataProg;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import rx.Observer;
import rx.Subscription;
import rx.android.schedulers.AndroidSchedulers;

/**
 * A simple {@link Fragment} subclass.
 */
public class UpdataFragment extends Fragment {


    @BindView(R.id.back)
    ImageView      back;
    @BindView(R.id.title)
    RelativeLayout title;
    @BindView(R.id.prog_updat)
    ProgressBar    progUpdat;
    @BindView(R.id.updata_progtxt)
    TextView       updataProgtxt;
    @BindView(R.id.btn_updata)
    Button         btnUpdata;

    @OnClick(R.id.btn_updata)
    void onupdata() {
        RxBus.getDefault().post(new SendCmd().setCmd(Command.getCommand(Command.setData(Command.COM_UPDATA, new byte[]{0x01}))));
    }

    public UpdataFragment() {
        // Required empty public constructor
    }

    private Subscription sub_updata;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState)
    {
        View view = inflater.inflate(R.layout.fragment_updata, container, false);
        ButterKnife.bind(this, view);
        setsub();
        return view;
    }

    private void setsub() {
        if (sub_updata == null) {
            sub_updata = RxBus.getDefault().toObservable(UpdataProg.class).observeOn(AndroidSchedulers.mainThread()).subscribe(new Observer<UpdataProg>() {
                @Override
                public void onCompleted() {

                }

                @Override
                public void onError(Throwable e) {
                    e.printStackTrace();
                }

                @Override
                public void onNext(UpdataProg updataProg) {
                    try {
                        progUpdat.setMax(updataProg.getTotal());
                        progUpdat.setProgress(updataProg.getTotal() - updataProg.getNow());
                        updataProgtxt.setText((float) (updataProg.getTotal() - updataProg.getNow()) / (float) 1024 + "kb/" + (float) updataProg.getTotal() / (float) 1024 + "kb");
                    } catch (Exception e) {

                    }
                }
            });
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (sub_updata.isUnsubscribed()) {
            sub_updata.unsubscribe();
        }
    }
}
