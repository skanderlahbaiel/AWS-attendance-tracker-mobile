import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, TexInput, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProcessingScreen from './ProcessingScreen';
import RecognitionSuccess from './RecognitionSuccess';


export default function CameraPreview({ photo, sendPicture, retakePicture, processing, name, setName, __sendPicture_todb, db, showTextInput, yourName, updateName }) {




  if (processing) {
    return <ProcessingScreen />
  }

  if (name) {
    return <RecognitionSuccess name={name} retakePicture={retakePicture} setName={updateName} />
  }


  return (

    <ImageBackground
      source={{ uri: photo && photo.uri }}
      style={{
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,

        }}
      >

        <View style={styles.toggleCameraContainer}>
          <View style={styles.icons}>
            <TouchableOpacity onPress={retakePicture} >
              <Ionicons name="refresh" size={50} color="orange" />
            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity onPress={sendPicture} >
              <Ionicons name="arrow-forward" size={50} color="orange" />
            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity
              onPress={() => {
                showTextInput()
              }}>
              <Ionicons name={db ? "close-circle" : "add-circle"} size={50} color="orange" />
            </TouchableOpacity>
          </View>
        </View>
        {db && (
          <View style={styles.textInputContainer}>
            <View style={styles.textInputWrapper}>
              <TextInput
                value={yourName}
                onChangeText={(name) => updateName(name)}
                placeholder="Enter your name"
                style={styles.textInput}
              />
              <Text>{yourName}</Text>
            </View>
            <Pressable onPress={() => __sendPicture_todb(yourName)} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </Pressable>
          </View>

        )}



      </View>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({


  toggleCameraContainer: {

    paddingTop: 30,
    paddingRight: 25,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',


  },
  icons: {
    margin: 5
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  textInputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  sendButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,

  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});







