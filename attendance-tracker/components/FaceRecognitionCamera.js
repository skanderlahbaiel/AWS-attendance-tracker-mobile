import { View, Text, Pressable } from 'react-native'

export default function FacialRecognitionCamera({ navigation }) {
    return (
        <>
            <View><Text>Camera</Text></View>
            <Pressable onPress={() => navigation.navigate('ReportScreen')}>
                <View>
                    <Text>Attendance</Text>
                </View>
            </Pressable>
        </>
    )
}