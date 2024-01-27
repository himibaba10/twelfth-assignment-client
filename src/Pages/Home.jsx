import Banner from "../Components/Home/Banner";
import BestContestCreator from "../Components/Home/BestContestCreator";
import ContestWinners from "../Components/Home/ContestWinners";
import PopularContest from "../Components/Home/PopularContest";

const Home = () => {
  return (
    <main>
      <Banner />
      <PopularContest />
      <ContestWinners />
      <BestContestCreator />
    </main>
  );
};

export default Home;
