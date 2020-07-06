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
