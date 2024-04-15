import Axios from 'axios';

export const virtualRenovate = async (responseUrl, roomType, selectedSurface) => {
  const options = {
    method: "POST",
    url: "https://us-central1-lucid-box-387617.cloudfunctions.net/virtual-renovation",
    headers: {
      Authorization: "5G8H2A3B1C6D9E0F4",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      instances: [
        {
          image_url: responseUrl,
          room_type: roomType,
          surface: selectedSurface,
        },
      ],
    },
  };

  try {
    const { data } = await Axios.request(options);
    return data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};