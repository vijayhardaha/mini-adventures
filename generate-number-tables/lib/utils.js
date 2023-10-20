/**
 * Import packages.
 */
import { promises as fs, constants } from "fs";
import Path from "path";
import { OUTPUT_DIR_NAME, OUTPUT_FILE_NAME } from "./const.js";

/**
 * Check if a value is null, empty, or undefined.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} - True if the value is null, empty, or undefined; otherwise, false.
 */
// eslint-disable-next-line max-len
export const isEmpty = (value) => value === null || value === undefined || (typeof value === "string" && value.trim() === "") || (Array.isArray(value) && value.length === 0);

/**
 * Check if a file or directory path exists or not.
 *
 * Throws an error if the error code is not ENOENT (indicating the path does not exist).
 *
 * @param {string} path - The local file or directory path to check.
 * @returns {Promise<boolean>} - A Promise that resolves to true
 * if the path exists, or false if it doesn't.
 */
export async function isExists(path) {
    if (isEmpty(path)) {
        throw new Error("Path cannot be empty or undefined.");
    }

    try {
        // Use fs.access to check if the path exists and is readable/writable.
        // eslint-disable-next-line no-bitwise
        await fs.access(path, constants.F_OK | constants.R_OK | constants.W_OK);
        return true; // Path exists and is accessible
    } catch (err) {
        if (err.code === "ENOENT") {
            return false; // Path does not exist.
        }

        throw err; // An error other than "ENOENT" occurred, so we throw it.
    }
}

/**
 * Create a directory.
 *
 * @param {String} path - Directory path.
 */
export async function makeDir(path) {
    if (isEmpty(path)) {
        throw new Error("Path cannot be empty or undefined.");
    }

    await fs.mkdir(path, { recursive: true });
}

/**
 * Create a file and write data.
 *
 * @param {String} path - File path.
 * @param {Mixed} data - Data to write into the file.
 */
export async function makeFile(path, data) {
    if (isEmpty(path)) {
        throw new Error("Path cannot be empty or undefined.");
    }

    // Write data to the specified file path
    await fs.writeFile(path, data);

    // Log a success message indicating that the file was created successfully
    // eslint-disable-next-line no-console
    console.log(`File successfully created at: ${path}`);
}

/**
 * Join the path.
 *
 * @param {...String} path - Local file paths.
 * @returns {String} - Joined path.
 */
export const joinPath = (...path) => Path.join(...path);

/**
 * Generate a file path for the given extension.
 *
 * @param {String} extension - The file extension (e.g., "txt", "html").
 * @returns {Promise<String>} - A Promise that resolves to the generated file path.
 */
export async function generateFilePath(extension) {
    if (isEmpty(extension)) {
        throw new Error("Extension cannot be empty or undefined.");
    }

    // Get the current working directory
    const cwd = process.cwd();

    // Combine the current working directory with the output directory name.
    const basePath = joinPath(cwd, OUTPUT_DIR_NAME);

    // Check if the base path (output directory) exists; if not, create it.
    if (!(await isExists(basePath))) {
        await makeDir(basePath);
    }

    // Combine the base path with the output file name and the provided extension.
    return joinPath(basePath, `${OUTPUT_FILE_NAME}.${extension}`);
}
