import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FacialRecognitionCamera from "./FaceRecognitionCamera";
import ReportScreen from "./ReportScreen";

export default function StackNavAttendance() {
    const Stack = createNativeStackNavigator()
    return (

        <Stack.Navigator>
            <Stack.Screen name='Camera' component={FacialRecognitionCamera} />
            <Stack.Screen name='ReportScreen' component={ReportScreen} />
        </Stack.Navigator>

    )
}