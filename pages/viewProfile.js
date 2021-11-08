import React, {useEffect, useState} from 'react';
import ViewProfile from '../screens/viewProfile/viewProfile'
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export function ProfileScreen(props) {
    var user = props.route.params.user
    var token = props.route.params.token
    return (
        <ScrollView>
            <ViewProfile token={token} navigation={props.navigation}/>
        </ScrollView> 
    )
}