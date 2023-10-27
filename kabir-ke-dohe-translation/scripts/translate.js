/**
 * Import packages.
 */
import fetch from "node-fetch";
import fs from "fs";
import ora from "ora";
import latinize from "latinize";

// Define file paths and batch processing parameters
const inputFilePath = "hindi-text.txt"; // Path to the input file
const outputFilePath = "english-text.txt"; // Path to the output file
const batchSize = 5; // Number of lines to process in each batch

/**
 * Capitalizes the first letter of each word in a given text.
 *
 * @param {string} text - The text to capitalize.
 * @returns {string} The text with the first letter of each word capitalized.
 */
const capitalizeWord = (text) => text
    .toLowerCase()
    .replace(/./, (x) => x.toUpperCase())
    .replace(/[^']\b\w/g, (y) => y.toUpperCase());

/**
 * Splits the input text using specified separators and capitalizes the sentences.
 *
 * @param {string} text - The input text to split and capitalize.
 * @param {string[]} separators - An array of separators to split the text by.
 * @returns {string} The text with sentences capitalized.
 */
const splitTextForChar = (text, separators) => {
    const lines = text.split(separators);
    const formattedLines = lines.map((line) => {
        if (line.trim()) {
            if (line[0] === " ") {
                return line[0] + line[1].toUpperCase() + line.slice(2);
            }
            return line[0].toUpperCase() + line.slice(1);
        }
        return line;
    });

    return formattedLines.join(separators);
};

/**
 * Capitalizes the sentences in the given text and converts it to lowercase.
 *
 * @param {string} text - The input text to capitalize and convert to lowercase.
 * @returns {string} The text with sentences capitalized and converted to lowercase.
 */
const capitalizeSentence = (text) => splitTextForChar(text.toLowerCase(), ["।", ".", "!", "?", "\n"]);

// Read the contents of the input file and split it into lines
const fileContents = fs.readFileSync(inputFilePath, "utf-8");
const lines = fileContents.split("\n");

// Group lines into batches
const jsonBatch = lines.reduce((acc, line, index) => {
    if (index % batchSize === 0) {
        acc.push([]);
    }
    acc[acc.length - 1].push(line);
    return acc;
}, []);

// Create a write stream for the output file
const writeStream = fs.createWriteStream(outputFilePath);

/**
 * Process a batch of text lines by sending them to a remote API for transliteration.
 * @param {string[]} batch - An array of text lines to be processed.
 */
const processBatch = async (batch) => {
    const payload = {
        hindiText: encodeURIComponent(batch.join("\n")),
    };

    try {
        const response = await fetch("https://utils.verkkonet.com/transliterator/hindi/hinglishConverter.php", {
            method: "POST",
            body: new URLSearchParams(payload),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        if (response.ok) {
            const responseData = await response.text();
            const convertedData = capitalizeSentence(latinize(responseData).toLowerCase());
            writeStream.write(`${convertedData}\n`);
        } else {
            console.error("Error:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

/**
 * Delays the execution of a promise by the specified number of milliseconds.
 *
 * @param {number} ms The number of milliseconds to delay the promise resolution.
 * @returns {Promise} A promise that resolves after the specified number of milliseconds.
 */
const delay = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

// Asynchronous IIFE (Immediately Invoked Function Expression) to process batches
(async () => {
    const spinner = ora({ text: "Processing batches..." }).start();

    try {
        await jsonBatch.reduce(async (previousPromise, batch, index) => {
            await previousPromise;
            await delay(5000); // Delay for 5 seconds
            const currentTime = new Date().toLocaleTimeString(); // Get current time as a human-readable string
            spinner.text = `Processing batch ${index + 1} of ${jsonBatch.length} || Current Time: ${currentTime}`;
            await processBatch(batch);
            return Promise.resolve();
        }, Promise.resolve());

        spinner.succeed("Conversion completed.");
    } catch (error) {
        spinner.fail("Conversion failed.");
        console.error("Error:", error);
    } finally {
        writeStream.end(); // Close the output file stream
    }
})();
