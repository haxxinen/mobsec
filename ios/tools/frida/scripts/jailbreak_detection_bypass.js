const jailbreakPaths = [
 	"/bin/bash",
	"/Applications/Cydia.app",
	"/Library/MobileSubstrate/MobileSubstrate.dylib",
	"/usr/sbin/sshd",
	"/etc/apt",
	"/private/var/lib/apt/",
]

Interceptor.attach(ObjC.classes.NSFileManager['- fileExistsAtPath:'].implementation, {
	onEnter: function (args) {
		this.is_flagged = false;
		this.path = new ObjC.Object(args[2]).toString();
		if (jailbreakPaths.indexOf(this.path) >= 0) {
            this.is_flagged = true;
            console.log("fileExistsAtPath: " + this.path);
        }
	},
	onLeave: function (retval) {
		if (!this.is_flagged || retval.isNull()) {
            return;
        }
        retval.replace(new NativePointer(0x00));
	}
});

Interceptor.attach(Module.findExportByName(null, "fopen"), {
  onEnter: function(args) {
  	this.is_flagged = false;
    this.path = Memory.readCString(ptr(args[0]));
    if (jailbreakPaths.indexOf(this.path) >= 0) {
        this.is_flagged = false;
        console.log("fopen: " + this.path);
    }
  },
  onLeave: function(retval) {
  	if (!this.is_flagged || retval.isNull()) {
    	return;
    }
    retval.replace(new NativePointer(0x00));
  }
});


Interceptor.attach(ObjC.classes.UIApplication["- canOpenURL:"].implementation, {
    onEnter: function(args) {
    	this.is_flagged = false;
        var path = ObjC.Object(args[2]).toString();
        if (path.startsWith('cydia') || path.startsWith('Cydia')) {
        	this.is_flagged = true;
        	console.log("canOpenURL: " + path);
    	}
    },
    onLeave: function(retval) {
    	if (!this.is_flagged || retval.isNull()) {
    		return;
    	}
    	retval.replace(new NativePointer(0x00));
    }
})


// will bypass JB detection for the following Swift code

// var jailbroken: Bool = false
// let fileManager = FileManager.default
// let application =  UIApplication.shared
// if  fileManager.fileExists(atPath: "/Applications/Cydia.app") ||
// fileManager.fileExists(atPath: "/Library/MobileSubstrate/MobileSubstrate.dylib") ||
// fileManager.fileExists(atPath: "/bin/bash") ||
// fileManager.fileExists(atPath: "/usr/sbin/sshd") ||
// fileManager.fileExists(atPath: "/etc/apt") ||
// fileManager.fileExists(atPath: "/private/var/lib/apt/") ||
// application.canOpenURL(URL(string: "cydia://package/com.example.package")!) { jailbroken = true }
// if let file = fopen("/bin/bash", "r") {
//     fclose(file)
//     jailbroken = true
// }
// if let file = fopen("/Applications/Cydia.app", "r") {
//     fclose(file)
//     jailbroken = true
// }
// if let file = fopen("/Library/MobileSubstrate/MobileSubstrate.dylib", "r") {
//     fclose(file)
//     jailbroken = true
// }
// if let file = fopen("/usr/sbin/sshd", "r") {
//     fclose(file)
//     jailbroken = true
// }
// if let file = fopen("/etc/apt", "r") {
//     fclose(file)
//     jailbroken = true
// }

