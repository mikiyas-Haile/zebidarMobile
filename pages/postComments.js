import React from 'react'
import { ScrollView, Text, Button,View } from 'react-native';
import Commentslist from '../screens/postComments/commentsList'


export default function CommentsScreen(props) {
    var token = props.token
    return (
        <ScrollView>
            <Commentslist token={token} statusId={props.statusId} navigation={props.navigation}/>
        </ScrollView>
    )
}