import axios from "axios";
import { IncomingHttpHeaders, RequestOptions } from 'http';

export const getAxiosHeader = () => {
  const jwtToken: string = ''
  const headers: IncomingHttpHeaders = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${jwtToken}`
  };

  return headers;
}

function createUnavailability() {
  const requestOptions: RequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  // return axios.post().then(handleResponse)
}
