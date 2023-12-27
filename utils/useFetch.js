import { useQuery } from "react-query";

async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export function useFetch(key, url) {
  return useQuery(key, () => fetcher(url));
}
