import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const fbApp = getApp();
const fbStorage = getStorage(fbApp);

/**
 * Uploads a file to Firebase Storage.
 * @param {File} file - The file object to upload.
 * @param {string} title - The title (or name) to save the file as.
 * @param {function} onProgress - Optional progress callback.
 * @returns {Promise<object>} - A promise that resolves with the download URL and metadata.
 */
const uploadToFirebase = async (file, title, onProgress) => {
  try {
    let fileBlob;

    // Check if file is a URI or a File object
    if (typeof file === "string") {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to fetch file from URI: ${file}`);
      }
      fileBlob = await response.blob();
    } else {
      fileBlob = file; // Directly use the File object
    }

    const imageRef = ref(fbStorage, `images/${title}`);
    const uploadTask = uploadBytesResumable(imageRef, fileBlob);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              downloadUrl,
              metadata: uploadTask.snapshot.metadata,
            });
          } catch (error) {
            console.error("Failed to get download URL", error);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Failed to upload file", error);
    throw error;
  }
};

/**
 * Generates a random 6-digit ID string.
 * @returns {string} - The generated ID string.
 */
const generateIDs = () => {
  const min = 0;
  const max = 9;
  let idString = "";
  for (let i = 0; i < 6; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    idString += randomNumber;
  }
  return idString;
};

export { fbApp, fbStorage, uploadToFirebase, generateIDs };
