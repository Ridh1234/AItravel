import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  const [imageUrl, setImageUrl] = useState("/placeholder.jpeg"); // State for location image

  // Fetch Unsplash Image for the Location
  useEffect(() => {
    const fetchUnsplashImage = async () => {
      try {
        const locationQuery = trip?.Location || "travel destination";
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            locationQuery
          )}&client_id=IGZ4bZtQhK8zmfshKbggx5boTYlqtbI9k2oxyD5FcgY`
        );
        const data = await response.json();
        const firstImage = data.results?.[0]?.urls?.regular || "/placeholder.jpeg";
        setImageUrl(firstImage);
      } catch (error) {
        console.error("Error fetching Unsplash image:", error);
      }
    };

    fetchUnsplashImage();
  }, [trip?.Location]);

  return (
    <div>
      {/* Fetched Location Image */}
      <img
        src={imageUrl}
        alt={trip?.Location || "Travel Destination"}
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          {/* Location Name */}
          <h2 className="font-bold text-2xl">
            {trip?.Location || "Location Unavailable"}
          </h2>
          <div className="flex gap-5">
            {/* Duration */}
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.tripData?.Travel_Plan?.Duration || "Duration Unavailable"}
            </h2>
            {/* Budget */}
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💸 {trip?.tripData?.Travel_Plan?.Budget || "Budget Unavailable"}
            </h2>
            {/* Group Size */}
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧍 {trip?.tripData?.Travel_Plan?.Group_Size || "Group Size Unavailable"}
            </h2>
          </div>
        </div>
        {/* Share Button */}
        <Button>
          Share <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
