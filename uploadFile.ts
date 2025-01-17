import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH!;
const FILE_PATH = path.resolve(
  "/Users/mayursuryawanshi/Downloads/xampp-osx-8.1.6-0-vm.jpg"
);
const UPLOAD_PATH = "xampp-osx-8.1.6-0-vm.jpg";

const uploadFileToGitHub = async () => {
  try {
    const fileContent = fs.readFileSync(FILE_PATH, { encoding: "base64" });

    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${UPLOAD_PATH}`;

    const data = {
      message: "Upload via API",
      content: fileContent,
      branch: GITHUB_BRANCH,
    };

    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    };

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
