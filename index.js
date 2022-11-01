const { exec } = require('child_process');
const os = require('os');
const axios = require('axios');
const fs = require('fs');

const getChromeVersion = new Promise((resolve, reject) => {
    const currentPlatform = os.platform();
    if (currentPlatform.includes('win')) {
        exec('google-chrome --version', (err, output) => {
            if (err) {
                reject(err);
            }
            resolve(output.split(' ')[2].split('.')[0]);
        });
    }
    if (currentPlatform === 'linux') {
        exec('google-chrome --version', (err, output) => {
            if (err) {
                reject(err);
            }
            resolve(output.split(' ')[2].split('.')[0]);
            // return console.log(version)
        });
    }
    else {
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
        // if (data.split('.')[0] !== currentVersion) {
        //     throw 'Please install the latest version of chrome'
        // }
        if (currentVersion === '105' && currentPlatform.includes('linux')) {
            const { data } = await axios.get('https://chromedriver.storage.googleapis.com/105.0.5195.52/chromedriver_linux64.zip');
            fs.writeFileSync('chromedriver.zip', data, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('File downloaded succesfully')
            });
            // await fs.createReadStream('/chromedriver.zip').pipe(unzip.Extract({ path: '/chrome.exe' }));

        }

    } catch (e) { console.log(e) }
};

downLoadDriver();





