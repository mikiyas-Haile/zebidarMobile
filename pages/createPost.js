import React from 'react'
import {StatusCreate} from '../screens/create/createPost'
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export function CreatePostScreen(props) {
    var token = props.route.params.token
    return (
        <ScrollView>
            <StatusCreate token={token} navigation={props.navigation}/>
        </ScrollView>
    )
}