import React from 'react'
import {GroupDetail} from '../screens/groups/detail'
import {GroupDetailPostComponent} from '../screens/groups/groupDetailComponent'
import { ScrollView, Text, Button,View } from 'react-native';
import {Commentslist} from '../screens/groups/groupComments'
export function GroupDetailScreen(props) {
  var group = props.route.params.group
  var token = props.route.params.token
  return (
      <ScrollView>
          <GroupDetail token={token} group={group} navigation={props.navigation}/>
          <br/><br/>
          <GroupDetailPostComponent token={token} groupId={group.id} group={group} navigation={props.navigation}/>
      </ScrollView>
  )
}