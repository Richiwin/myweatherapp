import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';

const MarineAndFutureWeather = () => {
    const navigation = useNavigation()
  const [marineData, setMarineData] = useState(null);
  const [futureDailyWeather, setFutureDailyWeather] = useState(null);
  const [futureHourlyWeather, setFutureHourlyWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '710ae0ab8be8438c879112958240102'; 
        const location = 'Nigeria'; 

        const marineResponse = await axios.get(`https://api.weatherapi.com/v1/marine.json?key=${apiKey}&q=${location}`);
        setMarineData(marineResponse.data);

        const futureDailyResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`);
        setFutureDailyWeather(futureDailyResponse.data);

        const futureHourlyResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=2&hour=11`);
        setFutureHourlyWeather(futureHourlyResponse.data);

        setIsLoading(false);
        console.log('Marine Weather Data:', marineResponse.data);
        console.log('Future Daily Weather Data:', futureDailyResponse.data);
        console.log('Future Hourly Weather Data:', futureHourlyResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <ScrollView>
  
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity  
        style={styles.button}
        onPress={() => {
            console.log('navigating back to realtimeweather');
            navigation.navigate('realtimeweather');
          }}
        >
        <Image style={styles.icon} source={require('../Assets/arrowicon.png')}>
        </Image>
        </TouchableOpacity>
        <Text style={styles.title}>Marine and Future Weather Data for Nigeria</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <Text style={styles.subtitle}>Marine Weather Data:</Text>
            <Text>{JSON.stringify(marineData, null, 2)}</Text>
            
       
            <Text style={styles.subtitle}>Future Daily Weather Forecast Data:</Text>
            <Text>{JSON.stringify(futureDailyWeather, null, 2)}</Text>
            
      
            <Text style={styles.subtitle}>Future Hourly Weather Forecast Data:</Text>
            <Text>{JSON.stringify(futureHourlyWeather, null, 2)}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    height: 30,
    width: 30,
    marginLeft: 280,
    marginTop: 0,
    backgroundColor: '#ffffff'
   },
});

export default MarineAndFutureWeather;

