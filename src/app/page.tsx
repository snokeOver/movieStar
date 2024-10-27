import Banner from "@/components/Banner";
import MovieCard from "@/components/MovieCard";
import { getPopularMovies, getTopRatedMovies } from "@/lib/getMovies";

const Home = async () => {
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main>
      {/* Banner section */}
      <Banner bannerMovies={topRatedMovies} />

      {/* Movie seciton */}
      <section className="container mx-auto">
        {/* Popular movies */}

        <div className="flex text-center justify-center w-full text-2xl lg:text-4xl font-bold my-10">
          <h1 className="border-dashed border-y-2 py-2 border-sky-500 px-5">
            Our Popular Movies
          </h1>
        </div>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] p-7 lg:p-3">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
