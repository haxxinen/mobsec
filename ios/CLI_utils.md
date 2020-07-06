## Bunch of CLI utils for iOS (requires JB)


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
