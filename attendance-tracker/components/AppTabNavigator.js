import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Profile from "./Profile"
import Ionicons from 'react-native-vector-icons/Ionicons';

import StackNavAttendance from "./StackNavAttendance"


export default function AppTabNavigator() {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
      
            if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person';
            } else if (route.name === 'Attendance') {
              iconName = focused ? 'hand-left' : 'hand-left';
            }
      
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            position: 'absolute',
            left: 70,
            right: 70,
            elevation: 0
          },
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: '#4b5c6bff',
        })}
      >
        <Tab.Screen name='Profile' component={Profile} />
        <Tab.Screen
          name='Attendance'
          component={StackNavAttendance}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
      )
}