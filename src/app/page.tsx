import Banner from "@/components/Banner";
import { getTopRatedMovies } from "@/lib/getMovies";

const Home = async () => {
  const topRatedMovies = await getTopRatedMovies();

  return (
    <main>
      <Banner bannerMovies={topRatedMovies} />
    </main>
  );
};

export default Home;
