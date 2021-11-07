import Feed from '../App';
import React, {useEffect, useState} from 'react';
import Groupslist from '../screens/groups/catlist'
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export default function GroupsScreen({navigation}) {
    return (
        <ScrollView>
            <Groupslist/>
        </ScrollView>
    )
}