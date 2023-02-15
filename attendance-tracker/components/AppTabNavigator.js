import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Profile from "./Profile"

import StackNavAttendance from "./StackNavAttendance"


export default function AppTabNavigator() {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Profile'
                component={Profile} />
            <Tab.Screen
                name='Attendance'
                component={StackNavAttendance}
                options={{ headerShown: false }} />
        </Tab.Navigator>)
}