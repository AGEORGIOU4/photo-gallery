import axios from 'axios';

export async function restApiGet(url, headers = {}) {
  let data = "";

  await axios.get(url, { headers })
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

export async function restApiPost(url, body, headers = {}) {
  let data = null;

  try {
    const response = await axios.post(url, body, { headers });
    data = response.data;
  } catch (error) {
    console.log(error);
  }

  return data;
}

export async function restApiPut(url, body, headers = {}) {
  let data = null;

  try {
    const response = await axios.put(url, body, { headers });
    data = response.data;
  } catch (error) {
    console.log(error);
  }

  return data;
}

export async function restApiDelete(url, body, headers = {}) {
  let data = null;

  try {
    const response = await axios.delete(url, {
      headers,
      data: body
    });
    data = response.data;
  } catch (error) {
    console.log(error);
    // Optionally, you can return the error or throw it again if needed
    // data = { error: error.message };
  }

  return data;
}
