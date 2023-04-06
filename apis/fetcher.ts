import axios from "axios";

export function fetcher(url: string) {
  return axios.get(url);
}

export function multipleFetcher<T>([url, array]: (string | T[])[]) {
  const requests = (array as string[]).map((type) =>
    axios.get(`${url}${type}`)
  );
  return Promise.all(requests);
}
