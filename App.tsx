/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RealTimeWeather from './Components/RealTimeWeather';
import MarineWeather from './Components/MarineWeather';
import MyWeather from './Components/MyWeather';


function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
 

  return (
   <NavigationContainer>
   <Stack.Navigator 
     screenOptions={{
      headerShown: false,
      flex: 1,
    }}>

<Stack.Screen name="realtimeweather" component={RealTimeWeather} />
<Stack.Screen name="marineweather" component={MarineWeather} />
<Stack.Screen name="myweather" component={MyWeather} />
    </Stack.Navigator>

   </NavigationContainer>
     
  );
}



export default App;
