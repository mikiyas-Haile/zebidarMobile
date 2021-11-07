import Feed from '../App';
import React, {useEffect, useState} from 'react';
import StatussComponent from '../screens/posts/components'
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export default function FeedScreen({navigation}) {
    return (
        <ScrollView>
            <StatussComponent/>
        </ScrollView>
    )
}