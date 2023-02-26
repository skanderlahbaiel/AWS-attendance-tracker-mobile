import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, TexInput, Pressable, FlatList, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProcessingScreen from './ProcessingScreen';
import RecognitionSuccess from './RecognitionSuccess';
import tipsData from 'attendance-tracker/TipsAndpolicies.json';
import ErrorScreen from './ErrorScreen';


export default function CameraPreview({
  photo,
  sendPicture,
  retakePicture,
  processing,
  name,
  setName,
  __sendPicture_todb,
  db,
  showTextInput,
  yourName,
  updateName,
  distance,
  error }) {


  const data = [
    { title: 'Tips for Taking Pictures for Facial Recognition', key: 'tips', items: tipsData['Tips for Taking Pictures for Facial Recognition'] },
    { title: 'Adding Users to the Database', key: 'addingUsers', items: tipsData['Adding Users to the Database'] },
    { title: 'Policies', key: 'policies', items: tipsData.policies }
  ];

  const renderItem = ({ item }) => {
    console.log(item.description);
    return (
      <View style={styles.item}>
        {Array.isArray(item.description) ? (
          <View style={styles.descriptionContainer}>
            {item.description.map((desc, index) => (
              <Text key={index} style={styles.description}>
                • {desc}
              </Text>
            ))}
          </View>
        ) : (
          <Text style={styles.description}>{item.description}</Text>
        )}
      </View>
    );
  };









  if (processing) {
    return <ProcessingScreen />
  }
 
  else if (Number(distance) > 1) {
    return (
      <>
        <ErrorScreen retakePicture={retakePicture} text="Unfortunately, we couldn't find a match for your face in our database. Please ensure that you have uploaded your pictures as recommended. If you have already done so, it's possible that you are not a member of our organization." />

      </>
    )
  }

  else if (name) {
    return <RecognitionSuccess name={name} retakePicture={retakePicture} setName={updateName} />
  }

 

  else if (error) {
    return (<>
      <ErrorScreen retakePicture={retakePicture} text="Sorry, we couldn't recognize a face in the image you provided. Please retake the picture in good lighting and ensure your face is not obstructed by any objects. If the issue persists, it may be due to a problem with the server or the connection. Please try again later."/>

      {console.log('distance: ' + distance)}
    </>)
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
          justifyContent: 'center',
          alignItems: 'center',

        }}
      >
        {db && (
          <>
            <View style={styles.box}>


              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <>
                    <Text style={styles.sectionTitle}>{item.title}</Text>
                    <FlatList
                      data={item.items}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </>
                )}
                keyExtractor={(item) => item.key}
              />


            </View>
            <View style={styles.textInputContainer}>
              <View style={styles.textInputWrapper}>
                <TextInput
                  value={yourName}
                  onChangeText={(name) => updateName(name)}
                  placeholder="Enter your name"
                  style={styles.textInput}
                />

              </View>
              <Pressable onPress={() => __sendPicture_todb(yourName)} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </Pressable>
            </View>
          </>
        )}
        <View style={styles.toggleCameraContainer}>

          <View style={styles.icons}>
            <TouchableOpacity style={styles.touchableOp} onPress={retakePicture} >
              <Ionicons name="arrow-undo" size={50} color="#E0E0E0" />
              <Text style={styles.text}>Discard</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity style={styles.touchableOp} onPress={sendPicture} >
              <Ionicons name="checkmark-circle" size={50} color="#E0E0E0" />
              <Text style={styles.text}>Attendance</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity
              onPress={() => {
                showTextInput()
              }}
              style={styles.touchableOp}>
              <Ionicons name={db ? "close-circle" : "cloud-upload"} size={50} color="#E0E0E0" />
              <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>




      </View>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({


  toggleCameraContainer: {

    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingTop: 30,
    justifyContent: 'space-around',
    flexDirection: 'row',




  },
  icons: {
    margin: 5,


  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignSelf: 'center'
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
  touchableOp: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#FFC107',
    shadowOpacity: '1'
  },
  text: {
    color: '#757575',
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    flexWrap: 'wrap'
  },
  box: {
    backgroundColor: 'rgba(224, 224, 224, 0.6)',
    width: 370,
    height: 370,
    borderRadius: 20,
    padding: 10,
    margin: 30,

  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    color: '#5b5b5b'
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    width: '100%'
  },
  descriptionNumber: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  descriptionText: {
    flex: 1,
    marginRight: 5,
  },
});