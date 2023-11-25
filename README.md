# Chrome Automation Project

Automate Chrome browser tasks using the Chrome DevTools Protocol and Node.js. This project provides a set of functions to fetch the installed Chrome browser version, download the corresponding ChromeDriver binary, set up the driver, create a new Chrome DevTools session, and open a website in the active session.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
- [Examples](#examples)

## Introduction

This project aims to simplify the process of automating Chrome browser tasks by providing a collection of functions built on top of the Chrome DevTools Protocol. It includes functionality to determine the installed Chrome browser version, download the appropriate ChromeDriver binary, and automate various browser actions.

## Prerequisites

Before using this project, ensure you have the following prerequisites installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- Google Chrome browser

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/PrantaDas/web-driver.git
    ```

2. Change to the project directory:

    ```bash
    cd chrome-automation
    ```

3. Install dependencies:

    ```bash
    npm install or yarn
    ```

## Usage

Import the functions you need from the `main.js` module and use them in your project. Make sure to handle errors appropriately.

```javascript
const { getChromeVersion, downLoadDriver, saveZipFile, unzipFile, start, createSession, navigateToUrl, turnFullScreen, takeScreenShot, closeSession, getActiveElem } = require("./main");

(async () => {
    try {
        const version = await getChromeVersion();
        console.log(version);
        await downLoadDriver();
        // Additional functions can be called here
    } catch (e) {
        console.log(e);
    }
})();
