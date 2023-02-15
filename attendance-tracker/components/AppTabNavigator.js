import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Profile from "./Profile"

import StackNavAttendance from "./StackNavAttendance"


export default function AppTabNavigator() {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
        screenOptions={{headerShown:false}}
        >
            <Tab.Screen
                name='Profile'
                component={Profile} />
            <Tab.Screen
                name='Attendance'
                component={StackNavAttendance}
                options={{ headerShown: false }} />
        </Tab.Navigator>)
}