import url from 'url';

export const verifyUrl = (urlString: string) => {
  try {
    new url.URL(urlString);
    return true;
  } catch {
    return false;
  }
};
