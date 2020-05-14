## Installing Frida for Android


#### 1. Install on local machine
```
$ pip -V
pip 18.0 from /usr/local/lib/python3.6/site-packages/pip (python 3.6)
$ sudo pip install frida-tools
```

#### 2. Download latest version from Github
```
# adb connect 192.168.56.105
# arch=`adb shell getprop ro.product.cpu.abi`
# repo='https://github.com/frida/frida'
# stable=`curl -sSL "$repo/releases/latest" | grep -oE "/frida.*frida-server.*-android-$arch\.xz"`
# curl -sSLO "https://github.com$stable"
# unxz *.xz && mv frida-server-* frida-server
# file frida-server
frida-server: ELF 32-bit LSB shared object, Intel 80386, version 1 (SYSV), dynamically linked, interpreter /system/bin/linker, stripped
```

#### 3. Push Frida binary on Android device
```
# adb root
# adb push frida-server /data/local/tmp/
```

#### 4. Run Frida on Android device

Method 1:
```
# adb shell chmod 755 /data/local/tmp/frida-server
# adb shell /data/local/tmp/frida-server -l 0.0.0.0 & 
```

Method 2:
```
# adb shell "su -c '/data/local/tmp/frida-server -l 0.0.0.0'" &
# adb -s 192.168.56.105 shell "su -c '/data/local/tmp/frida-server -l 0.0.0.0'" &
# adb shell netstat | grep '0.0.0.0:27042'
```

#### 5. Test installation
```
# frida-ls-devices
Id                   Type    Name
-------------------  ------  ------------
local                local   Local System
192.168.56.105:5555  usb     Samsung
tcp                  remote  Local TCP
# frida-ps -H 192.168.56.105 | grep frida
5343  frida-server
```

#### 6. Deploy on multiple devices
```
for i in `adb devices | grep -vi 'list of' | grep device | awk -F ' ' '{print $1}'`
do 
   adb -s $i push frida-server /data/local/tmp/
   adb -s $i shell chmod 755 /data/local/tmp/frida-server
   adb -s $i shell /data/local/tmp/frida-server -l 0.0.0.0 &
done
```


#### 7. Run app with hooking script
```
# frida -H 192.168.56.105 -f com.package.myapp -l script.js --no-pause
```
