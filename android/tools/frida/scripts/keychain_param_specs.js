// https://developer.android.com/reference/android/security/keystore/KeyGenParameterSpec.Builder
// https://developer.android.com/reference/android/security/keystore/KeyGenParameterSpec

Java.perform(function () {
  var x = Java.use("android.security.keystore.KeyGenParameterSpec$Builder");
  var y = x.$new("PUT_YOUR_KEYCHAIN_ALIAS_HERE", 3).build();

  // console.log("getUserAuthenticationType:", y.getUserAuthenticationType()); // Android R
  console.log("getUserAuthenticationValidityDurationSeconds:", y.getUserAuthenticationValidityDurationSeconds());
  console.log("isDigestsSpecified:", y.isDigestsSpecified());
  console.log("isInvalidatedByBiometricEnrollment:", y.isInvalidatedByBiometricEnrollment());
  console.log("isRandomizedEncryptionRequired:", y.isRandomizedEncryptionRequired());
  console.log("isStrongBoxBacked:", y.isStrongBoxBacked());
  console.log("isUnlockedDeviceRequired:", y.isUnlockedDeviceRequired());
  console.log("isUserAuthenticationRequired:", y.isUserAuthenticationRequired());
  console.log("isUserAuthenticationValidWhileOnBody:", y.isUserAuthenticationValidWhileOnBody());
  console.log("isUserConfirmationRequired:", y.isUserConfirmationRequired());
  console.log("isUserPresenceRequired:", y.isUserPresenceRequired());
});

