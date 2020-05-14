// https://github.com/oblador/react-native-keychain/releases/tag/v3.0.0
// com.oblador.keychain.cipherStorage.CipherStorageKeystoreAESCBC.decryptBytes()

Java.perform(function () {
  var c = Java.use('com.oblador.keychain.a.c');
  var a = c.a;
  a.overload('java.security.Key', '[B').implementation = function (arg0, arg1) {
    var r = this.a.overload('java.security.Key', '[B').call(this, arg0, arg1);
    console.log(r);
    return r;
  };
});
