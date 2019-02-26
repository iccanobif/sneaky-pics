import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { RNCamera } from "react-native-camera";

export default class App extends Component {
  constructor(props) {
    super(props)
    // this.takingPicture = false
    this.state = {
      outputText: ""
    }
  }
  render() {
    return (

      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          onBarCodeRead={(event) => {
            // Alert.alert(event.data)
            this.setState({ outputText: event.data })
          }}
        />
        <Text style={{color: "white"}}>
          {this.state.outputText}
        </Text>
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
      const data = await this.camera.takePictureAsync({ quality: 0.5, base64: true });
      Alert.alert(data.uri)
      // this.takingPicture = false
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
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
});
