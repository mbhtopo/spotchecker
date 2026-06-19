import { useEffect } from "react";
import { Text, View } from "react-native";

//dont use app here as name instead of homescreen
export default function homescreen() {

  useEffect(() => {
    //ftch weather data
    fetchWeatherData();
  }, [])
 
  async function fetchWeatherData() {
    try{
      const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m");
      const data = await response.json();
      console.log(data)
    } catch(e){
      console.log(e);
    }
    
  }

  return (
      <View>
        <Text>hello surfers !</Text>
      </View>
  );
}