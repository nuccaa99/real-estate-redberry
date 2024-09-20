const API_TOKEN = process.env.REACT_APP_API_KEY;
const url = 'https://api.real-estate-manager.redberryinternship.ge/api/';
const token = `Bearer ${API_TOKEN}`;

const getOptions = {
  method: 'GET',
  headers: {
    Authorization: token,
  },
};

const postOptions = (data) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: token,
  },
  body: data,
});

export async function fetchData(type) {
  const regionUrl = url + type;

  try {
    const response = await fetch(regionUrl, getOptions);
    const result = await response.json();

    if (response.ok) {
      return result;
    }
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
}

export async function postData(endpoint, data) {
  for (let [key, value] of data.entries()) {
    console.log(`${key}:`, value);
  }
  console.log(JSON.stringify(data));
  const postUrl = url + endpoint;
  try {
    const response = await fetch(postUrl, postOptions(data));

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      console.error('Response not OK:', result);
      throw new Error(`POST failed with status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`POST failed: ${error.message}`);
  }
}
