import React, {useEffect, useState} from 'react';
import MyProfile from '../screens/viewProfile/profile'
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export function ProfileScreen(props) {
    var token = props.route.params.token
    return (
        <ScrollView>
            <MyProfile token={token} navigation={props.navigation}/>
        </ScrollView>
    )
}