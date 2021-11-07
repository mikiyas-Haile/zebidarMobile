import Feed from '../App';
import React, {useEffect, useState} from 'react';
import ExploreComponent from '../screens/explore/components'
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export default function ExploreScreen({navigation}) {
    return (
        <ScrollView>
            <ExploreComponent/>
        </ScrollView>
    )
}