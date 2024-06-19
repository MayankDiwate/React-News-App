import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { setNews } from "../redux/features/newsSlice";
import { useAppDispatch } from "../redux/hooks";
import { getNewsByKeyword } from "../utils/news";

const Header = () => {
  const dispatch = useAppDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await getNewsByKeyword(searchKeyword);

    dispatch(setNews(data));
  };

  return (
    <Link to="/">
      <header className="bg-slate-100 shadow-md sticky top-0">
        <div className="flex items-center max-w-7xl mx-auto justify-between w-full sm:text-xl p-2">
          <div className="font-bold text-2lg">News App</div>
          <div className="flex items-center gap-2">
            <form onSubmit={(e) => handleSearch(e)}>
              <div className="flex items-center gap-2 relative">
                <input
                  placeholder="Search"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="bg-white text-base p-2 rounded-md focus:outline-none w-30 md:w-64"
                />
                <Search size={20} color="gray" className="absolute right-2" />
              </div>
            </form>
          </div>
        </div>
      </header>
    </Link>
  );
};

export default Header;
