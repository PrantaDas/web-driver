const { exec, spawn, execFile } = require('child_process');
const os = require('os');
const axios = require('axios');
const fs = require('fs');
const decompress = require('decompress');
const { stdout, stderr } = require('process');


const getChromeVersion = new Promise((resolve, reject) => {
    // for windows os
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        exec("powershell.exe", [" (Get-Item (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe').'(Default)').VersionInfo"], (err, output) => {
            if (err) {
                reject(err);
            }
            resolve(output)
        });
    }
    // for linux os
    if (os.platform() === 'linux') {
        exec('google-chrome --version', (err, output) => {
            if (err) {
                reject(err);
            }
            resolve(output.split(' ')[2].split('.')[0]);
        });
    }
});

const downLoadDriver = async () => {
    try {
        // getting user's platform
        const currentPlatform = os.platform();
        // for detecting current version of chrome
        const currentVersion = await getChromeVersion;
        const { data } = await axios.get('https://chromedriver.storage.googleapis.com/LATEST_RELEASE');
        if (currentVersion === '105' && currentPlatform.includes('linux')) {
            // donwloading driver
            const url = 'https://chromedriver.storage.googleapis.com/105.0.5195.52/chromedriver_linux64.zip';
            const { data } = await axios.get(url, { responseType: 'arraybuffer' });
            fs.writeFileSync('chromedriver.zip', data, (err) => {
                if (err) {
                    console.log(err);
                }
            });

            // unzipping

            decompress('chromedriver.zip', 'dist')
                .then((files) => {
                    console.log(files);
                })
                .catch((error) => {
                    console.log(error);
                })

            const runFile = () => {
                execFile('./dist/chromedriver', (error, stdout, stderr) => {
                    if (error) { console.log(error) }
                    console.log(stdout)
                })
            };
            runFile();

        }

    } catch (e) { console.log(e) }
};

downLoadDriver();