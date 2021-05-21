## CLI utils for iOS (requires JB)

#### 0. Basics

Installed IPA (binaries are here as well):
- `/private/var/containers/Bundle/Application/*/MyApp.app/`

Runtime app files:
- `/private/var/mobile/Containers/Data/Application/*/Documents/*`

Shared app files: `/var/mobile/Containers/Shared/AppGroup/`

After installing `openssh` via Cydia, log in as `root:alpine` and change the `root/mobile` Unix password:

```
# passwd mobile
# passwd root
```

#### 1. Extract binary from `.deb` packege
```
iPhone:/tmp mobile$ deb=`find / -name network-cmds*.deb 2>/dev/null | head -n 1`
iPhone:/tmp mobile$ tool='ifconfig'
iPhone:/tmp mobile$ dpkg --contents $deb | grep $tool
iPhone:/tmp mobile$ deb_dir=`dpkg-deb -W $deb | awk '{print $1}'`
iPhone:/tmp mobile$ dpkg-deb -x $deb $deb_dir
iPhone:/tmp mobile$ find . -name $tool 2>/dev/null
./network-cmds/sbin/ifconfig
```

#### 2. Prevent iOS app update

Find `Info.plist` for specific app:
```
iPhone:/tmp mobile$ cat /var/containers/Bundle/Application/*/MyApp.app/Info.plist
```

Modify `Info.plist`:
```
<plist version="1.0">
...
<dict>
...
	<key>CFBundleShortVersionString</key>
	<string>999.999.999</string>
...
</dict>
```

#### 3. SSH over USB
```
$ brew install libimobiledevice
$ iproxy 2222 22
$ ssh root@localhost -p 2222
```

#### 4. GDB into process
```
iPhone:/tmp mobile$ pid=`ps aux | grep /var/containers/Bundle/Application/*/Messenger.app | head -n 1 | awk '{print $2}'`
iPhone:/tmp mobile$ gdb -p $pid
(gdb) break objc_msgSend
(gdb) commands
> x/a $r0
> x/s $r1
> c
> end
```

#### 5. Otool - show imports/libraries
```
iPhone:/tmp mobile$ file /var/containers/Bundle/Application/*/Messenger.app/Messenger
/var/containers/Bundle/Application/0F906849-EB6B-438B-8FAC-011B8F3B1BD4/Messenger.app/Messenger: Mach-O 64-bit arm64 executable, flags:<NOUNDEFS|DYLDLINK|TWOLEVEL|PIE>
iPhone:/tmp mobile$ otool -L /var/containers/Bundle/Application/0F906849-EB6B-438B-8FAC-011B8F3B1BD4/Messenger.app/Messenger | sort -u | head -n -2
	/System/Library/Frameworks/AVFoundation.framework/AVFoundation (compatibility version 1.0.0, current version 2.0.0)
	/System/Library/Frameworks/AdSupport.framework/AdSupport (compatibility version 1.0.0, current version 1.0.0)
	/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation (compatibility version 150.0.0, current version 1676.104.0)
	/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics (compatibility version 64.0.0, current version 1355.17.0)
	/System/Library/Frameworks/CoreText.framework/CoreText (compatibility version 1.0.0, current version 1.0.0)
	/System/Library/Frameworks/Foundation.framework/Foundation (compatibility version 300.0.0, current version 1676.104.0)
	/System/Library/Frameworks/PushKit.framework/PushKit (compatibility version 1.0.0, current version 1.0.0)
	/System/Library/Frameworks/QuartzCore.framework/QuartzCore (compatibility version 1.2.0, current version 1.11.0)
	/System/Library/Frameworks/UIKit.framework/UIKit (compatibility version 1.0.0, current version 61000.0.0)
	/System/Library/Frameworks/WatchConnectivity.framework/WatchConnectivity (compatibility version 1.0.0, current version 187.2.0)
	/usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1281.100.1)
	/usr/lib/libc++.1.dylib (compatibility version 1.0.0, current version 902.0.0)
	/usr/lib/libobjc.A.dylib (compatibility version 1.0.0, current version 228.0.0)
	/usr/lib/libsqlite3.dylib (compatibility version 9.0.0, current version 308.5.0)
	/usr/lib/libz.1.dylib (compatibility version 1.0.0, current version 1.2.11)
```
Note: `otool` (from Dawin Tools on Cydia)

#### 6. Launch app from terminal
```
iPhone:/tmp mobile$ open com.apple.mobilesafari
```
Note: Open for iOS 11 in Cydia

#### 7. Installed apps
```
iPhone:/tmp mobile$ ll ~/Containers/Bundle/Application/*                     # path to installed apps
iPhone:/tmp mobile$ ll ~/Containers/Bundle/Application/* | grep .app
```

#### 8. Safari data
```
iPhone:/tmp mobile$ ~/Containers/Data/Application/*/Library/Safari/Thumbnails/        # screenshots of opened tabs
iPhone:/tmp mobile$ ~/Containers/Data/Application/*/Library/Safari/SuspendState.plist # links of opened tabs
```

#### 9. Find sqlites
```
iPhone:/tmp mobile$ sudo find / -name *.sqlite
```

#### 10. Collect sqlites
```bash
#!/bin/bash

rm -r dbs dbs.zip
mkdir dbs

declare -a rows
while IFS= read -r -d '' n; do
  cp "$n" dbs
  #rows+=( "$n" )
done < <(sudo find Containers -name *.sqlite -print0)
#done < <(sudo find / -name *.sqlite -print0)

zip -r9 dbs.zip dbs && rm -r dbs

#printf '%q\n' "${rows[@]}"
```

#### 11. Find iOS developer codesign identity on macOS
```
# security find-identity -v -p codesigning
```
