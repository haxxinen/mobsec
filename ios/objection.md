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
[usb] # ios sslpinning disable
[usb] # ios jailbreak disable
[usb] # ios hooking search classes jail
[usb] # ios hooking search methods jail
[usb] # ios bundles list_bundles --full-path
[usb] # ios hooking watch method "+[JailbreakDetector checkForJailbreakDevice]" --dump-args --dump-return --dump-backtrace
```
