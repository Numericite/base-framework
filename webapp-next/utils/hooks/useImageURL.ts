const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
const useImageURL = (url: string) => {
  return `${baseURL}${url}`;
};

export default useImageURL;
