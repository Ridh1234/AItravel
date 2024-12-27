// Refined SelectTravelesList with Icons
export const SelectTravelesList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole traveler in exploration',
      icon: '🧍',
      people: '1'
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two travelers in tandem',
      icon: '💑',
      people: '2 People'
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A group of fun-loving adventurers',
      icon: '👨‍👩‍👧‍👦',
      people: '3 to 5 People'
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A bunch of thrill-seekers',
      icon: '🧑‍🤝‍🧑',
      people: '5 to 10 People'
    }
  ];
  
  // Refined SelectBudgetOptions with Icons
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💸'
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Keep costs on the average side',
      icon: '💰'
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Don’t worry about cost',
      icon: '🏖️'
    }
  ];
  
  // Refined AI_PROMPT
  export const AI_PROMPT = `Generate a Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget.also suggest atleast 4 hotels if possible, does not matter if they are little far away, The output must include the following structure in JSON format:

  {
    "id": "Unique Identifier as a string",
    "tripData": {
      "Travel_Plan": {
        "Budget": "{budget}",
        "Duration": "{totalDays} Days",
        "Group_Size": "{traveler}",
        "Hotel_Options": [
          {
            "Hotel_Name": "Hotel Name as a string",
            "Hotel_Address": "Hotel Address as a string",
            "Price": "Hotel Price range as a string",
            "Hotel_Image_URL": "URL of the hotel image as a string",
            "Geo_Coordinates": {
              "Latitude": "Latitude as a string",
              "Longitude": "Longitude as a string"
            },
            "Rating": "Rating as a string",
            "Description": "Short description of the hotel as a string"
          }
        ],
        "Itinerary": {
          "Day_1": [
            {
              "Place_Name": "Name of the place as a string",
              "Place_Details": "Details about the place as a string",
              "Place_Image_URL": "URL of the place image as a string",
              "Geo_Coordinates": {
                "Latitude": "Latitude as a string",
                "Longitude": "Longitude as a string"
              },
              "Ticket_Pricing": "Price for tickets as a string",
              "Estimated_Travel_Time": "Estimated travel time to and within the location as a string",
              "Best_Time_to_Visit": "Recommended time to visit as a string"
            }
          ],
          "Day_2": [],
          "Day_3": []
        }
      }
    },
    "Location": "{location}"
  }
  
  Ensure all data points are filled and formatted as described. Provide detailed, luxurious options for hotels and attractions if the budget is set to 'Luxury.' Include descriptions, ratings, and realistic travel times between locations.`;
    