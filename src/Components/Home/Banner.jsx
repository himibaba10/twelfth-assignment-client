import photoshoot from "../../assets/banner img.jpg";
import programming from "../../assets/programming.jpg";
import articleWriting from "../../assets/article writing.jpg";
import gaming from "../../assets/gaming.jpg";
import graphicDesign from "../../assets/graphic design.jpg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e.target.search.value);
    navigate("/search-result", { state: e.target.search.value });
  };

  return (
    <section className="py-10 min-h-0 md:min-h-[650px] flex items-center bg-gradient-to-tr from-primary to-secondary text-white">
      <div className="section w-full flex flex-col md:flex-row justify-between gap-14 items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold">
            Professional place for content creators
          </h1>
          <p className="text-xl mt-5 mb-10">
            Discover thousands of easy to customize themes, templates & CMS
            products, made by world-class developers.
          </p>
          <form onSubmit={handleSearch}>
            <label className="text-xl block font-medium relative w-full sm:w-4/5">
              Search your favourite contest
              <br />
              <input
                name="search"
                type="text"
                placeholder="Search contest by tag name"
                className="mt-2 input py-7 border border-white w-full text-black"
              />
              <button className="btn px-4 sm:px-7 shadow bg-secondary text-white absolute right-1 bottom-1">
                Search
              </button>
            </label>
          </form>
        </div>
        <div className="w-full md:w-1/2 flex gap-5 items-center">
          <div className="space-y-5 translate-x-5">
            <img
              className="-rotate-[25deg] w-52 aspect-square object-cover border-white shadow border-4 rounded-lg"
              src={photoshoot}
              alt=""
            />
            <img
              className="rotate-[25deg] w-52 aspect-square object-cover border-white shadow border-4 rounded-lg"
              src={programming}
              alt=""
            />
          </div>
          <div>
            <img
              className="w-60 aspect-square object-cover border-white shadow border-4 rounded-lg"
              src={articleWriting}
              alt=""
            />
          </div>
          <div className="space-y-5 -translate-x-5">
            <img
              className="rotate-[25deg] w-52 aspect-square object-cover border-white shadow border-4 rounded-lg"
              src={gaming}
              alt=""
            />
            <img
              className="-rotate-[25deg] w-52 aspect-square object-cover border-white shadow border-4 rounded-lg"
              src={graphicDesign}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
