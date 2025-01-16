import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// GitHub credentials
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH!;
const FILE_PATH = path.resolve(
  "/Users/mayursuryawanshi/Downloads/test-image.jpg"
); // Local file
const UPLOAD_PATH = "test-image.jpg"; // File path in the repo

console.log(process.env.GITHUB_TOKEN);
console.log(process.env.GITHUB_USERNAME);
console.log(process.env.GITHUB_REPO);
console.log(process.env.GITHUB_BRANCH);

// Function to upload file
const uploadFileToGitHub = async () => {
  try {
    // Read and encode the file content
    const fileContent = fs.readFileSync(FILE_PATH, { encoding: "base64" });

    // API URL
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${UPLOAD_PATH}`;

    // API request payload
    const data = {
      message: "Upload via API",
      content: fileContent,
      branch: GITHUB_BRANCH,
    };

    // API headers
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    };

    // Make the PUT request
    const response = await axios.put(url, data, { headers });

    console.log("File uploaded successfully:", response.data.content.path);
  } catch (error: any) {
    console.error(
      "Failed to upload file:",
      error.response?.data || error.message
    );
  }
};

// Execute the function
uploadFileToGitHub();
