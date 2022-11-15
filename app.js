const { getChromeVersion, downLoadDriver, saveZipFile, unzipFile, start, createSession, navigateToUrl, turnFullScreen, takeScreenShot, closeSession } = require("./main");

(async () => {
    try {
        const version = await getChromeVersion;
        const data = await downLoadDriver(version);
        const savedData = await saveZipFile(data);
        const decompress = await unzipFile('chromedriver.zip', 'dist');
        const run = await start('./dist/chromedriver');
        const id = await createSession('http://localhost:9515');
        const fc = await turnFullScreen(id);
        const navigate = await navigateToUrl(id, 'https://youtube.com');
        const getImage = await takeScreenShot(id);
        const exit = await closeSession(id);
    }
    catch (e) { console.log(e) }
})();