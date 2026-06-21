
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

/**
 * @TODO Webcurrently not working due to navigation through tabs compatible only with mobile
 * @returns currently weather data of three geographical points
 */

//dont use app here as name instead of homescreen, will be confused
export default function homescreen() {
  type WeatherSpot = {
  name: string;
  temperature: number;
  };
  // api must know from which spots to recall weather data
  const spots = [
    { name: "Berlin", lat: 52.52, lon: 13.41 },
    { name: "Hamburg", lat: 53.55, lon: 9.99 },
    { name: "Köln", lat: 50.94, lon: 6.96 }
  ];
  // now actually recall the spots data and set data in array
  const [weatherData, setWeatherData] = useState<WeatherSpot[]>([]);


  useEffect(() => {
    // call function to get data
    fetchWeatherData();
  }, [])
 
  async function fetchWeatherData() {
    try{
      const results = await Promise.all(
        spots.map(async (spot) => {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${spot.lat}&longitude=${spot.lon}&current=temperature_2m`);
      
      const data = await response.json();
      console.log("data:", data);    
      return {
        name: spot.name,
        temperature: data.current.temperature_2m,
      };
        })
      );
      setWeatherData(results);

    } catch(e){
      console.log(e);
    }
  }

  return(
     <ScrollView>
      {weatherData.map((spot) => (
        <View key={spot.name}>
          <Text>{spot.name}</Text>
          <Text>{spot.temperature}°C</Text>
          <Text>{JSON.stringify(weatherData)}</Text>
        </View>
      ))}
    </ScrollView>
    /**
     * @TODO next big: 
     * Make a button 
     * Action: On press it takes (trial) two spots and compares their conditionscore
     * A conditionscore is a score (possible scala is: 1-5 1:worst) which compares the currentData of one spot 
     * and compares them to the spots idealData
     * 
     * Return: Is a list of the spot with the best conditions until the one with the worst
     * 
     * @TODO next small:
     * - What conditions should be compared ? 
     * - put them in the output of the view
     * - based on the conditions, prepare database and set the ideal conditions of a spot
     * 
     *   
     */
  );
}
