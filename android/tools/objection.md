## Objection

Framework for runtime mobile app exploration.
URL: https://github.com/sensepost/objection

### 1. Basics

```
# objection --gadget "com.my.app"
# objection --gadget "com.my.app" explore
# objection --gadget "com.my.app" explore --startup-command "android root disable"
```


### 2. Android Examples
```
# android hooking generate simple app.package.name.ClassName
# android hooking set return_value app.package.name.ClassName.methodName false
# android hooking watch class_method app.package.name.ClassName.methodName
# android hooking watch class app.package.name.ClassName -–dump-args –-dump-return –-dump-backtrace
# android hooking search methods ClassName app.package.name
# android hooking list class_methods app.package.name.ClassName
# android hooking search classes ClassName
# android hooking list classes
# android hooking get current_activity
# android hooking list services
# android hooking list receivers
# android hooking list activities
# file http start
# file http stop
# file http status
# env
# ls
# pwd
# file cat FILENAME
# file download PHONE_FILE [PC_FILE]
# file upload PC_FILE [PHONE_FILE]
```
