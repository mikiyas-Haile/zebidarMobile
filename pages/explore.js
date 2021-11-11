import Feed from '../App';
import React, {useEffect, useState} from 'react';
import ExploreComponent from '../screens/explore/components'
import {Text, TouchableOpacity, ScrollView, View} from 'react-native';

export function ExploreScreen(props) {
    var token = props.route.params.token
    return (
        <ScrollView>
            <ExploreComponent token={token} navigation={props.navigation}/>
            <View style={{fontSize:20,height:100}}>How was your day?</View>
            <View><Text style={{fontSize:20,margin:30, color:"#fe2c55"}} onClick = {() => props.navigation.navigate('createPost')}>  Tell us about it!</Text></View>
        </ScrollView>
    )
}