import axios, { Method } from "axios";
import { operations } from "./operations";
import { urls } from "./urls"

export const getCSRFToken = () => {
  const cookies = document.cookie.split('; ');
  const csrfTokenIndex = cookies.findIndex((item) => item.startsWith('csrftoken'));

  if (csrfTokenIndex >= 0) {
    return cookies[csrfTokenIndex].replace('csrftoken=', '');
  }

  return '';
};



export default async function requestHandler(operation: operations, data?: any, token?: string, appendURL?: string) {
  const endpointDetails = urls[operation]
  // const csrfToken = getCSRFToken(); TODO: CSRF
  if (endpointDetails) {
    const headers: any = {
      Accept: 'application/json',
      'Content-type': 'application/json'
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    return axios({
      method: endpointDetails.type as Method,
      withCredentials: true,
      headers,
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpointDetails.endpoint}${appendURL || ""}`,
      data
    })
  }
  throw new Error("Invalid Operation");
}
