// app: github.com/scottyab/rootbeer
// lib: github.com/scottyab/rootbeer/tree/master/rootbeerlib
// apk: https://play.google.com/store/apps/details?id=com.scottyab.rootbeer.sample
// blog: https://medium.com/@scottyab/detecting-root-on-android-97803474f694

// custom app
// ./smali_classes6/com/company/ui/activities/SplashScreenActivity.smali:
// invoke-virtual {v0}, Lcom/scottyab/rootbeer/RootBeer;->isRooted()Z

Java.perform(function () {
  var RootBeer = Java.use("com.scottyab.rootbeer.RootBeer");
  RootBeer.isRooted.overload().implementation = function () { 
    console.log('com.scottyab.rootbeer.RootBeer.isRooted()->false');
    return false;
  };
});

