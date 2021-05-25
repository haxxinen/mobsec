## ADB tricks

### 1. Proxy setup

#### 1.1. Test access to Burp proxy
```
# adb shell am start -a android.intent.action.VIEW -d 'http://192.168.106.1:8080'
```
Note: `192.168.106.1` is where Burp is running

#### 1.2. Set proxy on device
```
# adb shell settings put global http_proxy 192.168.106.1:8080
# adb shell settings put global https_proxy 192.168.106.1:8080
```

#### 1.3. Check if proxy is set
```
# adb shell settings get global http_proxy
# adb shell settings get global https_proxy 
```

#### 1.4. Delete proxy on device
```
# adb shell settings delete global http_proxy
# adb shell settings delete global global_http_proxy_host
# adb shell settings delete global global_http_proxy_port
```

### 2. Change DNS

``` 
# adb shell setprop net.dns1 192.168.56.1        # default 192.168.1.1
# adb shell setprop net.eth0.dns1 192.168.56.1	 # default ''
# adb shell setprop net.eth0.dns2 192.168.56.1 	 # default ''
```

### 3. Work with multiple devices

#### 3.1. List connected devices
```
# adb devices
List of devices attached
192.168.56.101:5555	device
192.168.56.102:5555	device
```

#### 3.2. Identify device by IP
```
# adb -s 192.168.56.101 shell am start -a android.intent.action.VIEW -d 'http://device1'
# adb -s 192.168.56.102 shell am start -a android.intent.action.VIEW -d 'http://device2'
```

#### 3.3. Install app on all devices
```
# apk='/path/to/apkfile.apk'
# for i in `adb devices | grep -vi 'list of' | grep device | awk -F ' ' '{print $1}'`; do adb -s $i install $apk; done
```

#### 3.4. (Un)Install multiple apps
```
# cd /path/to/folder/with/many/apk_files
# for i in `ls`; do adb install $i; done
# for i in `ls`; do adb uninstall `echo $i | sed 's/.apk//g'`; done
```

#### 4. ADB paste

Example 1:
```
# adb shell input text <data>
```

Example 2 (fill in login form and submit): 
```
# user='admin'; pwd='admin'
# adb shell input text $user; adb shell input keyevent 61; adb shell input text $pwd; adb shell input keyevent 66
```

#### 5. ADB over WiFi

Setup for NAT network only. Given a NAT environment where a Debian VM machine runs an WiFi AP via Docker container, obtain network access to the Android device connected to the AP from the underlying host OS.

```
(1) Host OS (MacOS/Windows) -> (2) VMWare (Debian) -> (3) WiFi AP (Docker) -> (4) Android Device
```

#### 5.1. Docker AP container + SSH access

Docker AP: `github.com/fgg89/docker-ap`
```
# docker exec -it ap-container apt-get update -yqq
# docker exec -it ap-container apt-get install openssh-server -yqq
# docker exec -it ap-container sed -i '/^PermitRootLogin/c\PermitRootLogin   yes' /etc/ssh/sshd_config
# docker exec -it ap-container bash -c 'echo "root:root" | chpasswd && ssh-keygen -A -b 4096'
# docker exec -it ap-container /etc/init.d/ssh restart
# ip=`docker inspect ap-container | jq .[].NetworkSettings.IPAddress | tr -d '"'`
# echo > ~/.ssh/known_hosts
# ssh root@$ip
```

#### 5.1. ADB access
- `172.17.0.2` Docker container default IP (eth0)
- `192.168.7.188` Docker container WiFi IP (wlan0)
- `192.168.209.182` Debian IP

#### 5.2. Tunnel from Debian VM to Docker container - link WiFi interface of the container (wlan0)
```
root@debian:~# sshuttle -e 'ssh' -r root@172.17.0.2 192.168.7.0/24
```

#### 5.3. Tunnel from host OS to Debian VM - link the default gateway-interface of the container (eth0)
```
# sshuttle -e 'ssh' -r root@192.168.209.182 172.17.0.0/24
```

#### 5.4. Tunnel from host OS to Docker container - link WiFi interface of the container (wlan0)
```
# sshuttle -e 'ssh' -r root@172.17.0.2 192.168.7.0/24
```

#### 5.5. ADB connect on the WiFi from host OS
```
# adb connect 192.168.7.188
# ssh root@172.17.0.2 # or ssh into the container from localhost
```
