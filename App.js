import 'react-native-gesture-handler';
import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import dataind from './screens/India';
import dataworld from './screens/World';
import State from './screens/State';
import Country from './screens/Country';
// import dataind from './screens/dataind'
// import dataworld from './screens/dataworld'
import datacity from './screens/datacity'
import Daily from './screens/activity'
import developer from './screens/developer'
import News from './screens/News';
import { Image, Dimensions } from 'react-native';


const Stack = createStackNavigator();
function App() {
  const [isLoading,setIsLoading]=useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },1000)
  },[])
 
    
if(isLoading){
  return(
    <Image source={require('./assets/splash.png')} style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}/>
  )
}else
  return (
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#161625',
        
        },
        headerTintColor: '#fff',
        
        headerTitleStyle: {

          fontFamily:'Righteous-Regular',
          fontWeight: "200"
 
          
        },
      }}
    >
    <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title:'CoronaSuraksha',
          headerTitleStyle: {

            fontFamily:'Righteous-Regular',
            fontWeight: "200",
            textAlign:'center'
   
            
          },
        }}
        
      />
      <Stack.Screen
    name="developer"
    component={developer}
    
    options={{title:'About',headerTitleStyle:{fontFamily:'Righteous-Regular'}}}
  />
      <Stack.Screen
    name="News"
    component={News}
    
    options={{title:'News',headerTitleStyle:{fontFamily:'Righteous-Regular'}}}
  />
  <Stack.Screen
  name="dataCity"
  component={datacity}
  options={{ title: '10 Days Report' }}
/>
      <Stack.Screen
      name="DataIndia"
      component={dataind}
      options={{ title: 'India Report' }}
    />
    <Stack.Screen
    name="DailyCases"
    component={Daily}
    
    options={{
      title: 'Day-wise Report',
      
      
      }}
  />
      <Stack.Screen
      name="StateData"
      component={State}
      options={{headerShown:false }}
    />
      <Stack.Screen
      name="CountryData"
      component={Country}
      options={{headerShown:false }}
    />
    <Stack.Screen
    name="DataWorld"
    component={dataworld}
    options={{ title: 'World Report' }}
  />
    </Stack.Navigator>
       
     
  </NavigationContainer>
    
  );
}

export default App