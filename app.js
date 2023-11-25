/**
 * Functions for automating Chrome browser tasks using the Chrome DevTools Protocol.
 * @module main
 */

/**
 * Get the version of the installed Chrome browser.
 *
 * @async
 * @function getChromeVersion
 * @returns {Promise<string>} The version of the installed Chrome browser.
 * @throws {Error} If an error occurs while getting the Chrome version.
 */

/**
 * Download the ChromeDriver binary corresponding to the specified version.
 *
 * @async
 * @function downLoadDriver
 * @param {string} version - The version of the ChromeDriver binary to download.
 * @returns {Promise<Buffer>} The downloaded ChromeDriver binary data.
 * @throws {Error} If an error occurs during the download.
 */

/**
 * Save the downloaded ChromeDriver binary data to a local file.
 *
 * @async
 * @function saveZipFile
 * @param {Buffer} data - The downloaded ChromeDriver binary data.
 * @returns {Promise<string>} The path to the saved zip file.
 * @throws {Error} If an error occurs while saving the zip file.
 */

/**
 * Unzip a file to the specified directory.
 *
 * @async
 * @function unzipFile
 * @param {string} zipFilePath - The path to the zip file.
 * @param {string} outputDir - The directory to unzip the file to.
 * @returns {Promise<void>} A Promise that resolves when the file is successfully unzipped.
 * @throws {Error} If an error occurs during the unzip process.
 */

/**
 * Start the ChromeDriver server.
 *
 * @async
 * @function start
 * @param {string} driverPath - The path to the ChromeDriver binary.
 * @returns {Promise<void>} A Promise that resolves when the ChromeDriver server is started.
 * @throws {Error} If an error occurs while starting the ChromeDriver server.
 */

/**
 * Create a new Chrome DevTools session.
 *
 * @async
 * @function createSession
 * @param {string} endpoint - The Chrome DevTools Protocol endpoint (e.g., 'http://localhost:9515').
 * @returns {Promise<string>} The session ID for the newly created session.
 * @throws {Error} If an error occurs during session creation.
 */

/**
 * Navigate to the specified URL in the active Chrome session.
 *
 * @async
 * @function navigateToUrl
 * @param {string} sessionId - The ID of the Chrome DevTools session.
 * @param {string} url - The URL to navigate to.
 * @returns {Promise<void>} A Promise that resolves when the navigation is complete.
 * @throws {Error} If an error occurs during navigation.
 */

/**
 * Turn on full-screen mode in the active Chrome session.
 *
 * @async
 * @function turnFullScreen
 * @param {string} sessionId - The ID of the Chrome DevTools session.
 * @returns {Promise<void>} A Promise that resolves when full-screen mode is activated.
 * @throws {Error} If an error occurs while turning on full-screen mode.
 */

/**
 * Take a screenshot in the active Chrome session and save it to a file.
 *
 * @async
 * @function takeScreenShot
 * @param {string} sessionId - The ID of the Chrome DevTools session.
 * @param {string} fileName - The name to save the screenshot file as.
 * @returns {Promise<string>} The path to the saved screenshot file.
 * @throws {Error} If an error occurs during screenshot capture.
 */

/**
 * Get information about the currently focused element in the active Chrome session.
 *
 * @async
 * @function getActiveElem
 * @param {string} sessionId - The ID of the Chrome DevTools session.
 * @returns {Promise<Object>} Information about the active element.
 * @throws {Error} If an error occurs while retrieving information about the active element.
 */

/**
 * Close the specified Chrome DevTools session.
 *
 * @async
 * @function closeSession
 * @param {string} sessionId - The ID of the Chrome DevTools session.
 * @returns {Promise<void>} A Promise that resolves when the session is closed.
 * @throws {Error} If an error occurs during session closure.
 */

/**
 * Immediately execute the main script to automate Chrome browser tasks.
 *
 * @async
 * @function
 */
(async () => {
    try {
        // Example usage of the functions defined above
        const version = await getChromeVersion();
        console.log(version);
        const data = await downLoadDriver(version);
        const savedData = await saveZipFile(data);
        const decompress = await unzipFile('chromedriver.zip', 'dist');
        const run = await start('./dist/chromedriver');
        const id = await createSession('http://localhost:9515');
        const fc = await turnFullScreen(id);
        const navigate = await navigateToUrl(id, 'https://www.w3schools.com/');
        const getImage = await takeScreenShot(id, 'w3c');
        const elem = await getActiveElem(id);
        console.log(await elem);
        const exit = await closeSession(id);
    } catch (e) {
        console.log(e);
    }
})();
