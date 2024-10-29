"use client";

import Image from "next/image";
import { useWatchList, useWishListStore } from "../store/store";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getImagePath } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useOptimistic, useState } from "react";
import { WMovie } from "@/type_interface/types";

const WatchList = () => {
  const { wishlist, removeFromWishlist } = useWishListStore();

  const { setIsExist, setToastMsg } = useWatchList();

  // Set up optimistic UI for wishlist
  const [backupWishlist, setBackupWishlist] = useState<WMovie[]>(wishlist);
  const [optimisticWishList, setOptimisticWishList] = useOptimistic(
    wishlist,
    (currentWishlist, updatedWishlist: WMovie[]) => updatedWishlist
  );

  // Handle the remove wish list button click with optimistic update
  const handleOnDeleteClick = async (id: string) => {
    setBackupWishlist(optimisticWishList);
    setOptimisticWishList(
      optimisticWishList.filter((movie) => movie.id !== id)
    );

    try {
      await removeFromWishlist(id.toString());
      setToastMsg("suc Movie removed!");
      setIsExist(false);
    } catch (error) {
      console.log(error);
      setToastMsg("err Failed ! try again.");
      setOptimisticWishList(backupWishlist);
    }
  };

  if (optimisticWishList.length < 1) {
    return (
      <div className="container mx-auto text-3xl lg:text-5xl font-bold text-primary-bg min-h-[600px] flex items-center justify-center">
        <h1> Your watch list is empty !</h1>
      </div>
    );
  }

  return (
    <Table className="mx-2 container md:mx-auto my-20 min-h-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead>Title</TableHead>

          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {optimisticWishList?.map((movie) => (
          <TableRow key={movie.id}>
            <TableCell className="">
              <Image
                src={getImagePath(movie.backdrop_path)}
                alt={movie.title}
                width={1920}
                height={1080}
                className="w-full rounded-md"
              />
            </TableCell>
            <TableCell>{movie.title}</TableCell>

            <TableCell>{movie.release_date}</TableCell>
            <TableCell className="text-right">
              <Button
                onClick={() => handleOnDeleteClick(movie.id)}
                variant={"outline"}
                className="text-secondary-dark dark:text-secondary relative pl-6"
              >
                <Trash /> Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WatchList;
