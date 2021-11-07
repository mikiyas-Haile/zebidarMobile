import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StatussComponent from './screens/posts/components';
import StatusDetail from './screens/detail';
import StatusComment from './screens/create';
import StatusShare from './screens/posts/reply';
import Contants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import MainContainer from './pages/MainContainer'
const Stack = createStackNavigator();

const homeStyles = {
  title: "Zebidar",
  headerTintColor: "black",
  headerStyle :{
    backgroundColor:"white",
  }
}

function Feed() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={MainContainer}
      />
      <Stack.Screen name="feed" component={StatussComponent}
      />
      <Stack.Screen name="reply" component={StatusShare}
      />
      <Stack.Screen name="detail" component={StatusDetail}
      />
      <Stack.Screen name="comment" component={StatusComment}
      />

      
    </Stack.Navigator>
  );
}
export default  () =>{
  return (
    <NavigationContainer independent={true}>
      <Feed/>
      </NavigationContainer>
  )
}
const styles = StyleSheet.create({
});