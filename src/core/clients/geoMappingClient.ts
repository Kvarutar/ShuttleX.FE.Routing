import { AxiosInstance } from "axios";

import createAxiosInstance from "../../shared/utils/client/createAxiosInstance";

const geoMapping = createAxiosInstance({
    url: `${import.meta.env.VITE_API_GEOMAPPING_URL_HTTPS}`,
  });
  
export default geoMapping;
  