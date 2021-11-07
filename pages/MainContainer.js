import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from './HomeScreen'
import ExploreScreen from './explore'
import FeedScreen from './feed'
import GroupsScreen from './groups'
import NotificationScreen from './notifications'
import ProfileScreen from './profilePage'

const homeName = "Home";
const exploreName = "Explore";
const groupsName = "Groups";
const notificationName = "Notification";
const profileName = "Profile";

const Tab = createBottomTabNavigator();
const homeStyles = {
    headerTintColor: "black",
    headerStyle :{
      height:0,
    }
  }
function MainContainer(){
    return (
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) =>({
                tabBarIcon: ({focused, color, size})=>{
                    let iconName;
                    let rn = route.name

                    if (rn === homeName){
                        iconName = 'home'
                    }else if (rn === exploreName){
                        iconName = 'search'
                    }else if (rn === groupsName){
                        iconName = 'apps'
                    }else if (rn === notificationName){
                        iconName = 'notifications'
                    }else if (rn === profileName){
                        iconName = 'contact'
                    }
                    return <Ionicons name={iconName} size={40} color={color}/>
                }
            })}
            tabBarOptions={{
                activeTintColor:'#fe2c55',
                inactiveTintColor:'#2c3e50',
                labelStyle: { paddingBotton:10 },
                style: {padding:10, height:70}
            }}
            >
                <Tab.Screen  name={homeName} component={FeedScreen} />
                <Tab.Screen  name={exploreName} component={ExploreScreen} />
                <Tab.Screen  name={groupsName} component={GroupsScreen} />
                <Tab.Screen  name={notificationName} component={NotificationScreen} />
                <Tab.Screen  name={profileName} component={ProfileScreen} />
            </Tab.Navigator>
    )
}

export default  () =>{
    return (
      <NavigationContainer independent={true}>
        <MainContainer/>
      </NavigationContainer>
    )
  }

  export default MainContainer;

// import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native'
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import {View} from "react-native";

// import HomeScreen from './feed'
// import ExploreScreen from './explore'
// import GroupsScreen from './groups'
// import NotificationScreen from './notifications'
// import ProfileScreen from './profilePage'

// import {NativeRouter, Routes,Route} from 'react-router-native';
// import StatussComponent from '../screens/posts/components'
// const homeName = "Home";
// const exploreName = "Explore";
// const groupsName = "Groups";
// const notificationName = "Notification";
// const profileName = "Profile";

// const Tab = createBottomTabNavigator();
// const homeStyles = {
//     headerTintColor: "black",
//     headerStyle :{
//       height:0,
//     }
//   }
//   export default function MainContainer(){
//     return (
//         <NativeRouter>
//             <Routes>
//                 <Route exact path="/" component={StatussComponent}/>
//                 <Route exact path="/explore" component={ExploreScreen}/>
//                 <Route exact path="/groups" component={GroupsScreen}/>
//                 <Route exact path="/my-notifications" component={NotificationScreen}/>
//                 <Route exact path="/my-profile" component={ProfileScreen}/>
//             </Routes>
//     </NativeRouter>
//     )
// }
