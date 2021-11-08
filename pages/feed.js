import React, {useEffect, useState} from 'react';
import StatussComponent from '../screens/posts/components'
import {View, Button, ScrollView} from 'react-native';
import StatusList from '../screens/posts/feed'

export function FeedScreen(props) {
    var token = props.route.params.token
    return (
        <ScrollView>
            <StatussComponent token={token} navigation={props.navigation}/>
        </ScrollView>
    )
}