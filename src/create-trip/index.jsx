import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravelGroup, setSelectedTravelGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleInputapiChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=2e07ec57214e483ca824b840df5eacfe`
        );
        const data = await response.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const formattedAddress = suggestion.properties.formatted;
    setQuery(formattedAddress);
    handleInputChange("location", formattedAddress);
    setSuggestions([]);
  };

  const handleBudgetSelect = (budget) => {
    handleInputChange("budget", budget);
    setSelectedBudget(budget);
  };

  const handleTravelGroupSelect = (group) => {
    handleInputChange("traveler", group);
    setSelectedTravelGroup(group);
  };

  const OnGenerateTrip = async () => {
    if (!formData.location || !formData.noOfDays || !formData.budget || !formData.traveler) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    const location = formData.location || "an unspecified location";
    const totalDays = formData.noOfDays || "a few";
    const traveler = formData.traveler || "unspecified group";
    const budget = formData.budget || "an unspecified budget";

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", location)
      .replaceAll("{totalDays}", totalDays)
      .replace("{traveler}", traveler)
      .replace("{budget}", budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();

      if (!responseText) throw new Error("No response from AI model");

      await SaveAitrip(responseText);
    } catch (error) {
      alert("Failed to generate trip. Please try again.");
      console.error("Error generating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveAitrip = async (TripData) => {
    const docId = Date.now().toString();
    const aiResponse = JSON.parse(TripData);

    await setDoc(doc(db, "AITrips", docId), {
      ...aiResponse,
      id: docId,
    });

    navigate(`/view-trip/${docId}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative"
      style={{
        backgroundImage: `url('/2ndimg.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for improved text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl bg-transparent p-10 text-gray-800">
        <h2 className="font-bold text-5xl text-center mb-5 text-white">
          Plan Your Dream Trip 🌍
        </h2>
        <p className="text-center text-white text-lg mb-10">
          Provide some details and let us craft a personalized itinerary for you.
        </p>

        <div className="space-y-8">
          {/* Destination Input */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Enter your Destination</h2>
            <input
              type="text"
              value={query}
              onChange={handleInputapiChange}
              className="border-none p-3 w-full rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
              placeholder="Start typing your destination..."
            />
            {suggestions.length > 0 && (
              <ul className="bg-white rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Number of Days */}
          <div className=" bg-transparent bg-opacity-80 rounded-lg p-5 shadow-md">
            <h2 className="text-lg font-semibold text-white mb-2">Number of Days</h2>
            <Input
              placeholder="Enter the number of days (max: 5)"
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              className="p-3 rounded-lg shadow-md w-full focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>

          {/* Budget Selection */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Your Budget</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleBudgetSelect(item.title)}
                  className={`p-5 rounded-lg text-center cursor-pointer transform transition-all duration-300 ${
                    selectedBudget === item.title
                      ? "bg-gray-800 text-white scale-105"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <h2 className="text-2xl mb-3">{item.icon}</h2>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Group Selection */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Who are you traveling with?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelesList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleTravelGroupSelect(item.people)}
                  className={`p-5 rounded-lg text-center cursor-pointer transform transition-all duration-300 ${
                    selectedTravelGroup === item.people
                      ? "bg-gray-800 text-white scale-105"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <h2 className="text-2xl mb-3">{item.icon}</h2>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="mt-10 flex justify-center">
          <Button
            onClick={OnGenerateTrip}
            disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Generate Trip"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
