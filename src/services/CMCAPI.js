const API_URL = "/v1/cryptocurrency/listings/latest";
const API_KEY = process.env.REACT_APP_CMC_API_KEY;

const getCoinData = async (start = 1, limit = 100) => {
  try {
    const url = `${API_URL}?start=${start}&limit=${limit}&convert=USD`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

const CMCAPI = { getCoinData };
export default CMCAPI;
