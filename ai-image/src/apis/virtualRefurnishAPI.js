import Axios from 'axios';

export const virtualRefurnish = async (responseUrl, room, arc) => {
  const options = {
    method: "POST",
    url: "https://us-central1-lucid-box-387617.cloudfunctions.net/virtual-decluttering-staging",
    headers: {
      Authorization: "5G8H2A3B1C6D9E0F4",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      instances: [
        {
          image_url: responseUrl,
          room_type: room,
          architecture_style: arc
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