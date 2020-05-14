Java.perform(function () {
  var CertificatePinner = Java.use("okhttp3.CertificatePinner");

  CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function () {
    return;
  };

  CertificatePinner.check.overload('java.lang.String', '[Ljava.security.cert.Certificate;').implementation = function () {
    return;
  };
});
