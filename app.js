const { getChromeVersion, downLoadDriver, saveZipFile, unzipFile, start, createSession, navigateToUrl, turnFullScreen, takeScreenShot, closeSession, getActiveElem } = require("./main");

(async () => {
    try {
        const version = await getChromeVersion;
        console.log(version)
        const data = await downLoadDriver(version);
        const savedData = await saveZipFile(data);
        const decompress = await unzipFile('chromedriver.zip', 'dist');
        const run = await start('./dist/chromedriver');
        const id = await createSession('http://localhost:9515');
        const fc = await turnFullScreen(id);
        const navigate = await navigateToUrl(id, 'https://www.w3schools.com/');
        const getImage = await takeScreenShot(id, 'w3c');
        const elem = await getActiveElem(id);
        console.log(await elem)
        const exit = await closeSession(id);
    }
    catch (e) { console.log(e) }
})();