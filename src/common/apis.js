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