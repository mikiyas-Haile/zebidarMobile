import React, {useEffect, useState} from 'react';
import {StatusUpdate} from './pages/update'
import {StatusComment} from './pages/createComment'
import {StatusDetail} from './pages/detail'
import {StatusShare} from './pages/reply'
import {StatusDelete} from './pages/delete'
import {GroupDetailScreen} from './pages/groupDetail'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Home} from './home'
import {ProfileScreen} from './pages/viewProfile'
import {RegisterComponent} from './screens/auth/register'
import {LoginComponent} from './screens/auth/login.js'
import {CreatePostScreen} from './pages/createPost'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
const homeStyles = {
  headerTintColor: "black",
  headerStyle :{
    height:0,
  }
}
const navbarStyles = {

  headerTintColor: "black",
  headerStyle :{
    alignItems: 'center',
    justifyContent: 'center',
    height:40,
  }
}
const profileStyles = {
  alignItems: 'center',
  justifyContent: 'center',
  title:"Checkout",
  headerStyle :{
    alignItems: 'center',
    justifyContent: 'center',
    height:40,
  }
}
const CreatePostStyles = {
  title:"Create a Post",
  backgroundColor:'white',
  headerStyle :{
    height:40,
    backgroundColor:'white'
  }
}
export default function App(props) {
  const [tok, settok] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Token')
      if (value !== 'undefined'){
        var token = value.replace('"', '').replace('"', '')
        settok(token)
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
          <Stack.Screen style={{fontFamily: "Poppins-Bold"}} initialParams={{'token':tok}} options={homeStyles} name="home" component={Home} />
          {/* <Stack.Screen initialParams={{'token':tok}} options={navbarStyles} name="reply" component={StatusShare}/>
          <Stack.Screen initialParams={{'token':tok}} options={CreatePostStyles} name="createPost" component={CreatePostScreen}/>
          <Stack.Screen initialParams={{'token':tok}} options={profileStyles} name="viewProfile" component={ProfileScreen}/>
          <Stack.Screen initialParams={{'token':tok}} options={navbarStyles} name="update" component={StatusUpdate}/>
          <Stack.Screen initialParams={{'token':tok}} options={navbarStyles} name="delete" component={StatusDelete}/>
          <Stack.Screen initialParams={{'token':tok}} options={navbarStyles} name="detail" component={StatusDetail}/>
          <Stack.Screen initialParams={{'token':tok}} options={navbarStyles} name="viewgroup" component={GroupDetailScreen}/>
          <Stack.Screen initialParams={{'token':tok}} options={navbarStyles} name="comment" component={StatusComment}/> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name="login" component={LoginComponent}/>
          <Stack.Screen name="register" component={RegisterComponent}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
  }


}