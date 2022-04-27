## Objection

Framework for runtime mobile exploration. 
URL: https://github.com/sensepost/objection

### 1. Basics

```
# objection --gadget "com.my.app
# objection --gadget "com.my.app" explore
# objection --gadget "com.my.app" explore --startup-command "ios jailbreak disable"
```

### 2. Other iOS examples

```
# ios sslpinning disable
# ios jailbreak disable
# ios hooking search classes jail
# ios hooking search methods jail
# ios bundles list_bundles --full-path
# ios hooking watch method "+[JailbreakDetector checkForJailbreakDevice]" --dump-args --dump-return --dump-backtrace
# ios pasteboard monitor
# ios nsurlcredentialstorage dump
# ios nsuserdefaults get
# ios cookies get
# ios keychain dump –json keychain.json
# ios keychain dump –smart
# ios keychain dump
# ios bundles list_frameworks
# ios bundles list_bundles
# ios plist cat Info.plist
# ios info binary
# ios sslpinning disable –quiet
# ios hooking generate simple CLASS_NAME
# ios hooking set return_value "-[CLASS_NAME METHOD_NAME]" false
# ios hooking watch method "-[CLASS_NAME METHOD_NAME]" --dump-args --dump-return -–dump-backtrace
# ios hooking watch class CLASS_NAME
# ios hooking search methods SEARCH_STRING
# ios hooking list class_methods CLASS_NAME
# ios hooking search classes SEARCH_STRING
# ios hooking list classes
```
