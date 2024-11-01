"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getImagePath } from "@/lib/helpers";
import { Movie } from "@/type_interface/types";
import Image from "next/image";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface MovieWrapper {
  key: string;
  movie: Movie;
}

const MovieCard = ({ movie }: MovieWrapper) => {
  const { title, backdrop_path, vote_average, id, release_date } = movie;
  const router = useRouter();

  //   Handle the view details button click
  const handleButton = (id: number) => {
    router.push(`/movies/${id}`);
  };
  return (
    <Card className="flex flex-col flex-shrink-0 cursor-pointer hover:drop-shadow-lg">
      <CardContent>
        <div className="relative w-full">
          <Image
            src={getImagePath(backdrop_path)}
            alt={title}
            width={1920}
            height={1080}
            className="w-full rounded-xl rounded-b-none transform hover:scale-105 transition duration-500 ease-out"
          />
          <div className="absolute top-4 right-4 bg-transparent z-20  text-gray-50">
            <h2 className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 px-3 py-1">
              IMDB:
              <span className="text-yellow-300 font-semibold px-1">
                {vote_average.toFixed(1)}
              </span>
              /10.0
            </h2>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between flex-col gap-1 mt-3 h-full">
        <div className="flex flex-col gap-2 items-start w-full flex-grow">
          <h3 className="text-md w-full text-primary-text">{title}</h3>
        </div>
        <h3 className="w-full">Release: {release_date}</h3>

        <div className="w-full">
          <Button
            onClick={() => handleButton(id)}
            variant={"outline"}
            className="w-full mt-3"
          >
            <Eye className="text-primary-bg" /> View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
