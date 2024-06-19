import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setNews } from "../redux/features/newsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { searchResults } from "../utils/contants";
import { getNews, getNewsByCategory } from "../utils/news";
import { NewsType } from "../utils/types";
import NewsCard from "./NewsCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const News = () => {
  const rowsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const news = useAppSelector((state: RootState) => state.newsReducer.news);
  const [selectedCategory, setSelectedCategory] = useState("Business");

  const fetchNews = async () => {
    setLoading(true);
    const news = await getNews();

    setLoading(false);
    dispatch(setNews(news));
  };

  const fetchNewsByCategory = async () => {
    setLoading(true);
    const news = await getNewsByCategory(selectedCategory.toLowerCase());

    setLoading(false);
    dispatch(setNews(news));
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchNewsByCategory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between p-2 py-4">
        <div className="font-semibold text-xl">{selectedCategory}</div>
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="sm:w-60 w-40">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {searchResults.map((result) => (
              <SelectItem key={result} value={result}>
                {result}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <LoaderCircle size={30} className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {news &&
            news
              .filter(
                (item: NewsType) =>
                  item.urlToImage !== null &&
                  item.description !== null &&
                  item.content !== null &&
                  item.author !== null
              )
              .slice(startIndex, endIndex)
              .map((item: NewsType) => (
                <div key={item.title} className="m-1">
                  <Link to={item.title}>
                    <NewsCard item={item} />
                  </Link>
                </div>
              ))}
        </div>
      )}

      <Pagination>
        <PaginationContent>
          {" "}
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                endIndex === 100 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage);
                setEndIndex(endIndex + rowsPerPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default News;
