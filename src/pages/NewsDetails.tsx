import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const NewsDetails = () => {
  const params = useParams();
  const newsId = params.id;
  const news = useAppSelector((state) => state.newsReducer.news);
  const selectedNews = news.find((item) => item.title === newsId);

  return (
    <div>
      <img
        src={selectedNews?.urlToImage}
        alt={selectedNews?.title}
        width={"100%"}
      />

      <div className="p-2 bg-gray-200">
        <div className="text-lg mb-4 font-semibold">{selectedNews?.title}</div>
        <div className="flex flex-col gap-2 items-end">
          <div>Author: {selectedNews?.author}</div>
          <div>Published At: {selectedNews?.publishedAt}</div>
        </div>
      </div>

      <div className="p-2 mb-8">{selectedNews?.content}</div>
    </div>
  );
};

export default NewsDetails;
