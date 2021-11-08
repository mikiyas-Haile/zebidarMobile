import Notificationslist from '../screens/notification/notifications';

import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export function NotificationScreen(props) {
    var token = props.route.params.token
    return (
        <ScrollView>
            <Notificationslist token={token}/>
        </ScrollView>
    )
}