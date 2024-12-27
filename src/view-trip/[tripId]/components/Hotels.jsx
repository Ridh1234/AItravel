import React, { useState, useEffect } from "react";

function Hotels({ trip }) {
  return (
    <div className="mt-10 px-4 lg:px-16">
      <h2 className="font-semibold text-3xl text-center text-gray-800 mb-6">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {trip?.tripData?.Travel_Plan?.Hotel_Options?.map((item, index) => (
          <HotelCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function HotelCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false); // State to manage "Read More"
  const [imageUrl, setImageUrl] = useState("/placeholder.jpeg"); // State for hotel image

  // Fetch Unsplash Image
  useEffect(() => {
    const fetchUnsplashImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            item?.Hotel_Name || "hotel"
          )}&client_id=IGZ4bZtQhK8zmfshKbggx5boTYlqtbI9k2oxyD5FcgY`
        );
        const data = await response.json();
        const firstImage = data.results?.[0]?.urls?.regular || "/placeholder.jpeg";
        setImageUrl(firstImage);
      } catch (error) {
        console.error("Error fetching Unsplash image:", error);
      }
    };

    if (item?.Hotel_Name) {
      fetchUnsplashImage();
    }
  }, [item?.Hotel_Name]);

  // Toggle description visibility
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  // Shortened description
  const shortDescription = item?.Description?.substring(0, 120) || "Description Unavailable";

  // Construct Google Maps URL
  const hotelLocation = encodeURIComponent(`${item?.Hotel_Name}, ${item?.Hotel_Address}`);

  return (
    <a
      href={`https://www.google.com/maps?q=${hotelLocation}`}
      target="_blank"
      rel="noopener noreferrer"
      className="transform transition-all duration-300 hover:scale-105 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl"
    >
      {/* Hotel Image */}
      <img
        src={imageUrl}
        alt={item?.Hotel_Name || "Hotel"}
        className="w-full h-56 object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-110"
      />

      {/* Hotel Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{item?.Hotel_Name || "Hotel Name Unavailable"}</h3>
        <p className="text-sm text-gray-500 mt-1">
          📍 {item?.Hotel_Address || "Address Unavailable"}
        </p>

        {/* Hotel Description with Read More */}
        <p className="text-gray-700 text-sm mt-2">
          {isExpanded ? item?.Description : `${shortDescription}...`}
          {item?.Description?.length > 120 && (
            <span
              onClick={toggleReadMore}
              className="text-blue-500 cursor-pointer ml-1"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </span>
          )}
        </p>

        {/* Hotel Price */}
        <div className="mt-3 flex justify-between items-center">
          <span className="font-bold text-green-600 text-lg">
            💰 {item?.Price || "Price Unavailable"}
          </span>

          {/* Hotel Rating */}
          {item?.Rating && (
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="ml-2 text-sm font-medium">{item?.Rating}</span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export default Hotels;
