import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../screens/SignIn/";
import SignUp from "../screens/SignUp/";
import Config from "../screens/Config/";
import Initial from "../screens/Initial/";
import Report from "../screens/Report";
import Main from "../screens/Main/";
import New from "../screens/New";

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator initialRouteName="initial" >
            <Stack.Screen 
            name="initial"
            component={Initial}
            />

            <Stack.Screen 
            name="signin"
            component={SignIn}
            />
            
            <Stack.Screen 
            name="signup"
            component={SignUp}
            />

            <Stack.Screen 
            name="new"
            component={New}
            />

            <Stack.Screen 
            name="config"
            component={Config}
            />

            <Stack.Screen 
            name="main"
            component={Main}
            options={{headerShown: false}}
            />

            <Stack.Screen 
            name="report"
            component={Report}
            />
        </Stack.Navigator>
    )
}