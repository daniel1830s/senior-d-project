import Axios from 'axios';

export const uploadImage = async (imageSelected) => {
  const formData = new FormData();
  formData.append("file", imageSelected);
  formData.append("upload_preset", "nfg2qtpb");

  try {
    const response = await Axios.post(
      "https://api.cloudinary.com/v1_1/dlllanhrs/upload",
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};