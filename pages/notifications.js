import Notificationslist from '../screens/notification/notifications';

import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';

export default function NotificationScreen({navigation}) {
    return (
        <ScrollView>
            <Notificationslist/>
        </ScrollView>
    )
}