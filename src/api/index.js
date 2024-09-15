const url = 'https://api.real-estate-manager.redberryinternship.ge/api/';
const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer 9cfc56d1-a676-40ac-ab66-a9a22c9fa96e',
  },
};

export async function fetchRegions() {
  const regionUrl = url + 'regions';
  try {
    const response = await fetch(regionUrl, options);
    const result = await response.json();

    if (response.ok) {
      return result;
    }
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
}

export async function fetchCities() {
  const cityUrl = url + 'cities';
  try {
    const response = await fetch(cityUrl, options);
    const result = await response.json();

    if (response.ok) {
      return result;
    }
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
}

export async function fetchAgents() {
  const agentUrl = url + 'agents';
  try {
    const response = await fetch(agentUrl, options);
    const result = await response.json();

    if (response.ok) {
      return result;
    }
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
}
