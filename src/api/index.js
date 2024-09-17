const url = 'https://api.real-estate-manager.redberryinternship.ge/api/';
const token = 'Bearer 9cfc56d1-a676-40ac-ab66-a9a22c9fa96e';

const getOptions = {
  method: 'GET',
  headers: {
    Authorization: token,
  },
};

const postOptions = (data) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: token,
  },
  body: JSON.stringify(data),
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
