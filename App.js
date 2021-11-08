import React, {useEffect, useState} from 'react';
import {StatusUpdate} from './pages/update'
import {StatusComment} from './pages/create'
import {StatusDetail} from './pages/detail'
import {StatusShare} from './pages/reply'
import {StatusDelete} from './pages/delete'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Home} from './home'
import {ProfileScreen} from './pages/viewProfile'
import {LoginComponent} from './screens/auth/login.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
const homeStyles = {
  headerTintColor: "black",
  headerStyle :{
    height:0,
  }
}
const profileStyles = {
  title:"Checkout"
}
export default function App(props) {
  const [tok, settok] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Token')
      if (value !== 'undefined'){
        settok(value.replace('"', '').replace('"', ''))
        setLoggedIn(true)
      }else{
        setLoggedIn(false)
      }
    } catch(e) {
      console.log(e)
    }
  }
  getData()
  if (loggedIn){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen initialParams={{'token':tok}}  options={homeStyles} name="home" component={Home} />
          <Stack.Screen initialParams={{'token':tok}}  name="reply" component={StatusShare}/>
          <Stack.Screen initialParams={{'token':tok}}  options={profileStyles} name="viewProfile" component={ProfileScreen}/>
          <Stack.Screen initialParams={{'token':tok}}  name="update" component={StatusUpdate}/>
          <Stack.Screen initialParams={{'token':tok}}  name="delete" component={StatusDelete}/>
          <Stack.Screen initialParams={{'token':tok}}  name="detail" component={StatusDetail}/>
          <Stack.Screen initialParams={{'token':tok}}  name="comment" component={StatusComment}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name="login" children={()=><LoginComponent/>}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
  }


}