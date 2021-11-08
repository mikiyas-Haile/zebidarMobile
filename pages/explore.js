import Feed from '../App';
import React, {useEffect, useState} from 'react';
import ExploreComponent from '../screens/explore/components'
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export function ExploreScreen(props) {
    var token = props.route.params.token
    return (
        <ScrollView>
            <ExploreComponent token={token} navigation={props.navigation}/>
        </ScrollView>
    )
}