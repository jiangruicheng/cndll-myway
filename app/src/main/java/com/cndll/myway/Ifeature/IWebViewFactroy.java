package com.cndll.myway.Ifeature;

import io.dcloud.common.DHInterface.IWebview;

/**
 * Created by kongqing on 17-2-23.
 */

public class IWebViewFactroy {
    public static IWebview getiWebview() {
        return iWebview;
    }

    public static void setiWebview(IWebview iWebview) {
        IWebViewFactroy.iWebview = iWebview;
    }

    private static IWebview iWebview;

    private IWebViewFactroy() {

    }
}
