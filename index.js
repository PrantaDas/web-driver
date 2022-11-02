const { exec } = require('child_process');
const os = require('os');
const axios = require('axios');
const fs = require('fs');
const zlib = require('zlib');


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
        if (currentVersion === '105' && currentPlatform.includes('linux')) {
            const url = 'https://chromedriver.storage.googleapis.com/105.0.5195.52/chromedriver_linux64.zip';
            const { data } = await axios.get(url, { responseType: 'arraybuffer' });
            fs.writeFileSync('chromedriver.zip', data, (err) => {
                if (err) {
                    console.log(err);
                }
            });

            const inStream = fs.createReadStream('chromedriver.zip');
            const outStream = fs.createWriteStream('chormedriver');
            const unZip = zlib.createDeflateRaw();
            inStream.pipe(unZip).pipe(outStream);

        }

    } catch (e) { console.log(e) }
};

downLoadDriver();