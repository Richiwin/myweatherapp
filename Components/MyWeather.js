import React, { Component } from "react";
import { View, Text } from "react-native";
import axios from 'react-native-axios';

const API_KEY = "710ae0ab8be8438c879112958240102";
const LOCATION = "Nigeria";

class MyWeather extends Component {
  state = {
    weatherData: {}
  };

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${API_KEY}`
      )
      .then(response => {
        this.setState({
          weatherData: response.data
        });
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  };

  render() {
    const { weatherData } = this.state;
    return (
      <View>
        <Text>{weatherData.name}</Text>
        <Text>{weatherData.main && weatherData.main.temp}</Text>
      </View>
    );
  }
}

export default MyWeather;
