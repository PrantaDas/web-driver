const os = require('os');
const { exec, spawn } = require('child_process');

(async () => {
    try {

        const child = exec("powershell", ["(Get-Item (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe').'(Default)').VersionInfo"])
        child.stdout.on('data', function (data) {
            console.log(data);
        });
        child.stderr.on('data', function (data) {
            console.log(data);
        });
        child.on('exit', function () {
            console.log("Powershell Script Finished");
        });
        child.stdin.end();
    }
    catch (e) { console.log(e) }
})();

