import axios from 'axios';
import { Platform } from 'react-native';

const isIos = Platform.OS === 'ios';

export const imageUploader = async (file, setLoading = () => { }) => {
  try {
    console.log('Received Media File:', file);
    setLoading(true);

    if (!file || !file.uri) {
      throw new Error('No file selected for upload.');
    }

    const isPdf = file?.type?.includes('pdf');
    const isVideo = file?.type?.includes('video');
    const fileExtension = isPdf ? 'pdf' : (isVideo ? 'mp4' : 'jpg');
    const fileType = isPdf ? 'application/pdf' : (isVideo ? 'video/mp4' : 'image/jpeg');
    const fileName = file.fileName || `media_${Date.now()}.${fileExtension}`;


    let cleanUri = file.uri;
    if (typeof cleanUri === 'string') {
      if (!cleanUri.startsWith('file://') && !cleanUri.startsWith('content://')) {
        cleanUri = `file://${cleanUri}`;
      }
    }

    const formData = new FormData();
    formData.append('file', {
      uri: cleanUri,
      name: fileName,
      type: fileType,
    });

    console.log('Uploading with:', {
      uri: cleanUri,
      name: fileName,
      type: fileType,
    });

    const response = await axios.post(
      'http://10.10.1.227:8001/media/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          //   Authorization: `Bearer ${accessToken}`,
        },
        timeout: 30000,
      },
    );

    console.log('Upload response:', response.data);

    const mediaUrl = response?.data?.url;
    if (!mediaUrl) {
      throw new Error('Upload failed: No URL returned from server');
    }



    return mediaUrl;
  } catch (error) {
    console.error('Upload error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      code: error.code,
    });

    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please login again.');
    } else if (error.response?.status === 413) {
      throw new Error('File too large. Please select a smaller file.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Upload timed out. Please check your connection.');
    } else {
      throw new Error(error.message || 'Upload failed. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};
