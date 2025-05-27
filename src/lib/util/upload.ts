import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebase';

const uploadFile = async (fileName: string, file: File) => {
    try {
        const storageRef = ref(storage, fileName); // Create a reference to the file path
        const response = await uploadBytes(storageRef, file); // Upload the file

        // Get the download URL
        const downloadURL = await getDownloadURL(response.ref);
        return downloadURL; // Return the download URL
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error; // Handle error appropriately in your application
    }
};

export default uploadFile;
