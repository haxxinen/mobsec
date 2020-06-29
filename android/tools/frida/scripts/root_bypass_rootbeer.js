Java.perform(function() {

    try {

        var RootBeer = Java.use("com.scottyab.rootbeer.RootBeer");
        RootBeer.isRooted.overload().implementation = function() {
            return false;
        };

        // native bypass
        var RootBeer = Java.use("com.scottyab.rootbeer.RootBeerNative");
        RootBeer.checkForRoot.overload('[Ljava.lang.Object;').implementation = function() {
            return false;
        };

        // -----
        // alternative implementations for obfuscated methods

        // isRootedWithBusyBoxCheck
        var RootBeer = Java.use("com.scottyab.rootbeer.d");
        RootBeer.s.overload().implementation = function() {
            return false;
        };
        /*
         package com.scottyab.rootbeer;
         public class d {
            public boolean s() {
               return o() || k() || b("su") || b("busybox") || d() || g() || q() || j() || h() || e();
            }
         }
        */

        // isRooted
        RootBeer.t.overload().implementation = function() {
            return false;
        };
        /*
         package com.scottyab.rootbeer;
         public class d {
            public boolean t() {
               return o() || k() || b("su") || d() || g() || q() || j() || h() || e();
            }
         }
        */
    } catch (err) {
        // do nothing
    }

});

// https://github.com/scottyab/rootbeer/blob/master/rootbeerlib/src/main/java/com/scottyab/rootbeer/RootBeer.java

// app: github.com/scottyab/rootbeer
// lib: github.com/scottyab/rootbeer/tree/master/rootbeerlib
// apk: https://play.google.com/store/apps/details?id=com.scottyab.rootbeer.sample
// blog: https://medium.com/@scottyab/detecting-root-on-android-97803474f694
// tools: JadxGui / objection

// custom app
// ./smali_classes6/com/company/ui/activities/SplashScreenActivity.smali:
// invoke-virtual {v0}, Lcom/scottyab/rootbeer/RootBeer;->isRooted()Z

// # objection --gadget "com.app.target" explore --startup-command "android hooking list classes"
// # objection --gadget "com.app.target" explore --startup-command "android hooking list class_methods com.scottyab.rootbeer.RootBeer"
