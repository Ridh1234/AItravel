import React, { useState, useEffect } from "react";
import { FiMapPin } from "react-icons/fi"; // Import map pin icon from react-icons

function Itinerary({ trip }) {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl mt-5">Day-by-Day Itinerary</h2>
      {Object.keys(trip?.tripData?.Travel_Plan?.Itinerary || {}).map((day, index) => (
        <DayItinerary key={index} day={day} activities={trip.tripData.Travel_Plan.Itinerary[day]} />
      ))}
    </div>
  );
}

function DayItinerary({ day, activities }) {
  return (
    <div className="mt-8">
      <h3 className="font-semibold text-lg">{day.replace("_", " ")}</h3>
      <div className="flex flex-col gap-5 mt-3">
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}

function ActivityCard({ activity }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageUrl, setImageUrl] = useState("/placeholder.jpeg");

  // Fetch Unsplash Image
  useEffect(() => {
    const fetchUnsplashImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(activity?.Place_Name || "travel")}&client_id=IGZ4bZtQhK8zmfshKbggx5boTYlqtbI9k2oxyD5FcgY`
        );
        const data = await response.json();
        const firstImage = data.results?.[0]?.urls?.regular || "/placeholder.jpeg";
        setImageUrl(firstImage);
      } catch (error) {
        console.error("Error fetching Unsplash image:", error);
      }
    };

    if (activity?.Place_Name) {
      fetchUnsplashImage();
    }
  }, [activity?.Place_Name]);

  // Toggle description visibility
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  // Shortened description
  const shortDescription = activity?.Place_Details?.substring(0, 100) || "Details unavailable";

  // Construct Google Maps URL
  const location = encodeURIComponent(`${activity?.Place_Name}, ${activity?.Geo_Coordinates?.Latitude}, ${activity?.Geo_Coordinates?.Longitude}`);

  return (
    <div className="p-4 rounded-lg border shadow-md transition-transform duration-300 hover:scale-105 relative bg-white">
      {/* Activity Image */}
      <img
        src={imageUrl}
        alt={activity?.Place_Name || "Activity"}
        className="rounded-lg w-full h-40 object-cover"
      />

      {/* Activity Details */}
      <h3 className="font-semibold text-lg mt-3">
        {activity?.Place_Name || "Activity Name Unavailable"}
      </h3>

      <p className="text-gray-500 text-sm mb-1">
        🕒 Best Time: {activity?.Best_Time_to_Visit || "N/A"}
      </p>

      <p className="text-gray-500 text-sm mb-1">
        ⏳ Travel Time: {activity?.Estimated_Travel_Time || "N/A"}
      </p>

      <p className="text-gray-700 text-sm">
        {isExpanded ? activity?.Place_Details : `${shortDescription}...`}
        {activity?.Place_Details?.length > 100 && (
          <span
            onClick={toggleReadMore}
            className="text-blue-500 cursor-pointer ml-1"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </span>
        )}
      </p>

      {/* Ticket Pricing */}
      {activity?.Ticket_Pricing && (
        <div className="mt-2">
          <span className="font-bold text-green-600">
            🎟️ {activity?.Ticket_Pricing}
          </span>
        </div>
      )}

      {/* Google Maps Location */}
      <a
        href={`https://www.google.com/maps?q=${location}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 flex items-center justify-center text-white bg-blue-600 rounded-full p-3 shadow-lg hover:bg-blue-700 transition-all"
        title="View Location on Map"
      >
        <FiMapPin className="text-2xl" />
      </a>
    </div>
  );
}

export default Itinerary;
