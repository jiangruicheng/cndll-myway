package com.HBuilder.integrate.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.HBuilder.integrate.R;
import com.HBuilder.integrate.data.CarStatu;
import com.HBuilder.integrate.fragment.CarStatuFragment;


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
