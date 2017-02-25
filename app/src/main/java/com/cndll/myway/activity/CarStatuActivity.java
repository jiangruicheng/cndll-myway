package com.cndll.myway.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.cndll.myway.R;
import com.cndll.myway.data.CarStatu;
import com.cndll.myway.fragment.CarStatuFragment;


public class CarStatuActivity extends AppCompatActivity {
    private CarStatuFragment carStatuFragment;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_car_statu);
        carStatuFragment = new CarStatuFragment(CarStatu.getDefault().getType());
        getFragmentManager().beginTransaction().add(R.id.fragment_frame, carStatuFragment).commit();
    }


}
