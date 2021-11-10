import React, {useEffect, useState} from 'react';
import StatussComponent from '../screens/posts/components'
import {Text, View, ScrollView} from 'react-native';
import StatusList from '../screens/posts/feed'

export function FeedScreen(props) {
    var token = props.route.params.token
    return (
        <ScrollView>
            <StatussComponent token={token} navigation={props.navigation}/>
            <center><div style={{fontSize:20,height:100}}>You have seen all posts from your Followings</div>
            <div><Text style={{fontSize:20,margin:30, color:"#fe2c55"}} onClick = {() => props.navigation.navigate('Explore')}> Explore more </Text></div></center>
        </ScrollView>
    )
}