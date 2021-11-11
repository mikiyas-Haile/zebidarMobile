import React from 'react'
import Detail from '../screens/postDetail/detail'
import { ScrollView, Text, Button,View } from 'react-native';
import CommentsScreen from './postComments'
export function StatusDetail(props) {
  var statusId = props.route.params.statusId
  var token = props.route.params.token
  return (
      <ScrollView>
          <Detail token={token} statusId={statusId} navigation={props.navigation}/>
          <CommentsScreen token={token} statusId={statusId} navigation={props.navigation}/>
      </ScrollView>
  )
}