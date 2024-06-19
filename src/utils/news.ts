import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = "https://newsapi.org/v2";

export const getNews = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/top-headlines?country=in&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    );

    const news = response.data["articles"];

    return news;
  } catch (error) {
    toast.error("Failed to fetch news");
  }
};

export const getNewsByCategory = async (category: string) => {
  const response = await axios.get(
    `${baseUrl}/top-headlines?country=in&category=${category}&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`
  );

  return response.data["articles"];
};

export const getNewsByKeyword = async (keyword: string) => {
  const response = await axios.get(
    `${baseUrl}/everything?q=${keyword}&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`
  );

  return response.data["articles"];
};
