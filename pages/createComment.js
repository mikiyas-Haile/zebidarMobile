import React from 'react'
import {CreateStatusComment} from '../screens/create/createComment'
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export function StatusComment(props) {
    var token = props.route.params.token
    var statusId = props.route.params.statusId
    console.log(props)
    return (
        <ScrollView>
            <CreateStatusComment statusId={statusId} token={token} navigation={props.navigation}/>
        </ScrollView>
    )
}