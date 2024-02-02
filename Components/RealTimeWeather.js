import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';

const API_KEY = '710ae0ab8be8438c879112958240102'; 
const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=London`; // Construct API URL correctly

const RealTimeWeather = () => {
    const navigation = useNavigation();

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
    
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

 
  if (!weatherData || !weatherData.current || !weatherData.current.temp_c || !weatherData.current.condition || !weatherData.current.condition.text) {
    return (
      <View style={styles.container}>
        <Text>Error: Weather data is incomplete.</Text>
      </View>
    );
  }

  return (
    <>
    <View style={styles.container}>
    <Text>Real-time Weather:</Text>
    {console.log(weatherData)}
    {weatherData && weatherData.current && (
      <>
        <Text>Temperature: {weatherData.current.temp_c}°C</Text>
        <Text>Condition: {weatherData.current.condition.text}</Text>
      </>
    )}
  </View>
  <TouchableOpacity style={styles.textButton} onPress={() => {
    console.log('navigating to marineweather screen');
    navigation.navigate('marineweather');
   }}>
    <Text style={styles.customButtonText}>check for marine and future weather</Text>
  </TouchableOpacity>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton : {
    width: 200, 
    height: 40, 
    borderRadius: 10, 
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0, 
    marginLeft: 80,
    marginBottom: 110,
  },
});

export default RealTimeWeather;
