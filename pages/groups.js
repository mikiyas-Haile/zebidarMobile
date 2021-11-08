import React, {useEffect, useState} from 'react';
import Groupslist from '../screens/groups/catlist'
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export function GroupsScreen(props) {
    var token = props.route.params.token
    return (
        <ScrollView>
            <Groupslist token={token}/>
        </ScrollView>
    )
}