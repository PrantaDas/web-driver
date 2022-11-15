const { exec, execFile } = require('child_process');
const os = require('os');
const axios = require('axios');
const fs = require('fs');
const decompress = require('decompress');

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



const downLoadDriver = async (chromeVersion) => {
    try {
        // to get the current os 
        const currentPlatform = os.platform();
        const { data } = await axios.get('https://chromedriver.storage.googleapis.com/LATEST_RELEASE');
        if (chromeVersion === '105' && currentPlatform.includes('linux')) {
            // donwloading driver
            const url = 'https://chromedriver.storage.googleapis.com/105.0.5195.52/chromedriver_linux64.zip';
            const { data } = await axios.get(url, { responseType: 'arraybuffer' });
            return data;
        }
    }
    catch (e) { console.log(e) }
};

// to save the downloaded file
const saveZipFile = async (data) => {
    try {
        fs.writeFileSync('chromedriver.zip', data, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    catch (e) { console.log(e) }
};


// unzipping the executable file

const unzipFile = async (path, folder) => {
    try {
        decompress(path, folder)
            .then((files) => {
                console.log(files);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    catch (e) { console.log(e) }
};

// run exe file

const start = async (path) => {
    try {
        execFile(path, (error, stdout, stderr) => {
            if (error) { console.log(error) }
            console.log(stdout)
        })
    }
    catch (e) { console.log(e) }
};

// create session 
const createSession = async (url) => {
    try {
        const { data } = await axios.post(`${url}/session`, { capabilities: {} });
        return data.value.sessionId;
    }
    catch (e) { console.log(e) }
};


const navigateToUrl = async (id, url) => {
    try {
        console.log('hit');
        const res = await axios.post(`http://localhost:9515/session/${id}/url`, { url });
        console.log(res.data)
    }
    catch (e) { console.log(e.message) }
};

// for full fscreen view
const turnFullScreen = async (id) => {
    try {
        const { data } = await axios.post(`http://localhost:9515/session/${id}/window/maximize`);
        console.log(data.value);
    }
    catch (e) { console.log(e) }
};

const takeScreenShot = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:9515/session/${id}/screenshot`);
        const imgData = data.value;
        fs.writeFileSync('screenshot.png', imgData, 'base64');
    }
    catch (e) { console.log(e) }
};

const closeSession = async (id) => {
    try {
        const { data } = await axios.delete(`http://localhost:9515/session/${id}`)
    }
    catch (e) { console.log(e) }
};

module.exports = { getChromeVersion, downLoadDriver, saveZipFile, unzipFile, start, createSession, navigateToUrl, turnFullScreen, takeScreenShot, closeSession };