import { NewsType } from "../utils/types";
import { Card } from "./ui/card";

const NewsCard = ({ item }: { item: NewsType }) => {
  return (
    <Card className="hover:scale-105 transform transition duration-500">
      <img src={item.urlToImage} className="rounded-md w-full h-40 object-cover" alt={item.title} />
      <div className="p-2">
        <div className="font-bold line-clamp-1">{item.title}</div>
        <div className="line-clamp-2 text-sm text-gray-500">
          {item.description}
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
