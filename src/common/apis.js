import axios from "axios";

export async function restApiGet(url) {
  var data = "";

  await axios.get(url).then((response) => {
    data = response.data;
    return data;
  }).catch(function (error) {
    console.log(error);
  });
  return data;
}