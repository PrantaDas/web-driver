const { exec, spawn, execFile } = require('child_process');
const os = require('os');
const axios = require('axios');
const fs = require('fs');
const decompress = require('decompress');
const { stdout, stderr } = require('process');

/**
 * A promise to retrieve the version of the installed Chrome browser.
 *
 * @async
 * @const {Promise<string>}
 * @throws {Error} If an error occurs while fetching the Chrome version.
 */
const getChromeVersion = new Promise((resolve, reject) => {
    // for windows os
    if (os.platform() === 'win32' || os.platform() === 'win64') {
        exec("powershell.exe", [" (Get-Item (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\chrome.exe').'(Default)').VersionInfo"], (err, output) => {
            if (err) {
                reject(err);
            }
            resolve(output);
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

/**
 * Download the ChromeDriver binary corresponding to the detected Chrome version.
 *
 * @async
 * @function downLoadDriver
 * @throws {Error} If an error occurs during the download or extraction process.
 */
const downLoadDriver = async () => {
    try {
        // getting user's platform
        const currentPlatform = os.platform();
        // for detecting current version of chrome
        const currentVersion = await getChromeVersion;
        const { data } = await axios.get('https://chromedriver.storage.googleapis.com/LATEST_RELEASE');
        if (currentVersion === '105' && currentPlatform.includes('linux')) {
            // downloading driver
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
                });

            const runFile = () => {
                execFile('./dist/chromedriver', (error, stdout, stderr) => {
                    if (error) { console.log(error); }
                    console.log(stdout);
                });
            };
            runFile();

            /**
             * Create a new Chrome DevTools session.
             *
             * @async
             * @function createSession
             * @returns {Promise<string>} The session ID for the newly created session.
             * @throws {Error} If an error occurs during session creation.
             */
            const createSession = async () => {
                const { data } = await axios.post('http://localhost:9515/session', { capabilities: {} });
                return data.value.sessionId;
            };

            /**
             * Open a website in the active Chrome DevTools session.
             *
             * @async
             * @function openSite
             * @throws {Error} If an error occurs during the session creation or site navigation.
             */
            const openSite = async () => {
                const id = await createSession();
                console.log(typeof id, id);
                const siteUrl = 'https://www.google.com';
                try {
                    const res = await axios.post(`http://localhost:9515/session/${id}/${siteUrl}`, { siteUrl });
                    console.log(res.data);
                    // console.log(res);
                }
                catch (e) { console.log(e.message); }
            };

            openSite();
        }
    } catch (e) { console.log(e); }
};

// Execute the download and setup process
downLoadDriver();
