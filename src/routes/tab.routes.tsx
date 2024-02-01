import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons"
import React from 'react'

import Study from "../screens/Study/";
import Profile from "../screens/Profile/";
import Home from "../screens/Home/"

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
        <Tab.Navigator initialRouteName="home" screenOptions={{headerShown: false}}>
            <Tab.Screen
            name="study"
            component={Study}
            options={{
                tabBarIcon: ({color, size}) => <Feather name="book-open" color={color} size={size}/>,
                tabBarLabel: ''
            }} 
            />

            <Tab.Screen
            name="home"
            component={Home}
            options={{
                tabBarIcon: ({color, size}) => <Feather name="home" color={color} size={size}/>,
                tabBarLabel: ''
            }} 
            />

            <Tab.Screen
            name="profile"
            component={Profile}
            options={{
                tabBarIcon: ({color, size}) => <Feather name="user" color={color} size={size}/>,
                tabBarLabel: ''
            }} 
            />

        </Tab.Navigator>
    )
}