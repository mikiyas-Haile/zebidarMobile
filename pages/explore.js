import Feed from '../App';
import React, {useEffect, useState} from 'react';
import ExploreComponent from '../screens/explore/components'
import {Text, TouchableOpacity, ScrollView} from 'react-native';

export function ExploreScreen(props) {
    var token = props.route.params.token
    return (
        <ScrollView>
            <ExploreComponent token={token} navigation={props.navigation}/>
            <center><div style={{fontSize:20,height:100}}>How was your day?</div>
            <div><Text style={{fontSize:20,margin:30, color:"#fe2c55"}} onClick = {() => props.navigation.navigate('createPost')}>  Tell us about it!</Text></div></center>
        </ScrollView>
    )
}