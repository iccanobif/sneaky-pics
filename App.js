import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native'
import { RNCamera } from "react-native-camera"
import { WebView } from "react-native-webview"

export default class App extends Component {
  constructor(props) {
    super(props)
    // this.takingPicture = false
  }
  render() {
    return (

      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
        />
        <FakeWhatsapp />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>)
  }

  takePicture = async function () {
    if (this.camera) {
      // this.takingPicture = true
      const data = await this.camera.takePictureAsync({ quality: 0.5, base64: true })
      Alert.alert(data.uri)
      // this.takingPicture = false
    }
  }
}

class FakeWhatsapp extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <WebView
      source={{uri: 'https://www.google.com'}}
      style={styles.whatsappPanel}
       />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    width: 150,
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  whatsappPanel: {
    flex: 1
  },
  whatsappMessage: {
    backgroundColor: "green",
    color: "black",
    margin: 10
  }
})
