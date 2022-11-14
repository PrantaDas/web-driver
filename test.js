// const os = require('os');
const { exec, spawn, execFile } = require('child_process'); const { stdout, stderr } = require('process');


// (async () => {
//     try {

//         const res = exec("powershell", ["(Get-Item (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe').'(Default)').VersionInfo"])
//         res.stdout.on('data', function (data) {
//             console.log(data);
//         });
//         res.stderr.on('data', function (data) {
//             console.log(data);
//         });
//         res.on('exit', function () {
//             console.log("Execution Done!");
//         });
//         res.stdin.end();
//     }
//     catch (e) { console.log(e) }
// })();


const nodeVersion = () => {
    execFile('node', ['--version'], (error, stdout, stderr) => {
        if (error) { console.log(error) }
        console.log(stdout)
    })
}

nodeVersion();
