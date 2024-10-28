"use client";

import { Heart, Trash } from "lucide-react";
import { Button } from "./ui/button";

import { WMovie } from "@/type_interface/types";
import { useWatchList, useWishListStore } from "@/app/store/store";
import { useEffect } from "react";

const WishListActionButtons = ({ movie }: { movie: WMovie }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishListStore();
  const { isExist, setIsExist, setToastMsg } = useWatchList();

  //   Handle the view details button click
  const handleDeleteClick = async () => {
    await removeFromWishlist(movie.id);
    setToastMsg("suc Movie deleted !");
    setIsExist(false);
  };

  //   Handle the add to watch list button click
  const handleAddClick = async () => {
    await addToWishlist(movie);
    setToastMsg("suc Movie added !");
    setIsExist(true);
  };

  //   check the movie existance from the wish list
  useEffect(() => {
    const isExist = wishlist.find((item) => item.id === movie.id);
    if (isExist) setIsExist(true);
    else setIsExist(false);
  }, []);

  return (
    <div className="mt-3 flex gap-4 w-full">
      <Button
        onClick={() => handleDeleteClick()}
        variant={"destructive"}
        className="w-full"
        disabled={!isExist}
      >
        <Trash className="text-primary-bg" />{" "}
        {isExist ? "Remove from Watch List" : "Not Added Yet"}
      </Button>
      <Button
        onClick={() => handleAddClick()}
        variant={"outline"}
        className="w-full"
        disabled={isExist}
      >
        <Heart className="text-primary-bg" />{" "}
        {isExist ? "Already Added" : "Add to Watch List"}
      </Button>
    </div>
  );
};

export default WishListActionButtons;
