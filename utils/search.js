const axios = require('axios');

module.exports = (params) => {
  const baseURL = `https://api.nasa.gov/mars-photos/api/v1/rovers`;
  return axios
    .get(
      `${baseURL}/${params.rover}/photos?earth_date=${params.earth_date}&page=${
        params.pg ? params.pg : 1
      }&api_key=${process.env.NASA_API_KEY}`
    )
    .catch(() => {
      return { data: { photos: [] } };
    });
};
