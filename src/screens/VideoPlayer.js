import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, AsyncStorage, ImageBackground, Image } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';
import strings from '../strings';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';

const { width, height } = Dimensions.get('window');

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full: false,
      flip: false,
      clicked: '',
      modalVisible: false,
      successVisible: false,
      currentLang: 'en'
    };
  }

  componentWillMount() {
    this.setState({
      clicked: this.props.navigation.getParam('clicked')
    })
  }

  async componentDidMount() {
    if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
      this.setState({
        currentLang: 'ar'
      })
    } else {
      this.setState({
        currentLang: 'en'
      })
    }
  }

  async addfavour() {
    const body = this.state.clicked;
    axios.post('http://192.168.110.249:8000/api/content/favorupload', body, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
      }
    })
      .then((response) => {
        console.log(response)
        this.setState({ modalVisible: false, successVisible: true })
      }, (err) => {
        console.log(err, alert(err, ' error'))
      });

  }

  render() {
    return (
      <View style={styles.container} >
        <Modal
          width={0.9}
          visible={this.state.modalVisible}
          rounded
          actionsBordered
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <ModalContent
            style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Image source={require('../assets/images/modal.png')} style={{ position: 'absolute', width: '120%', marginLeft: -30, top: -60 }} resizeMode={"contain"} />
            <LinearGradient colors={['#e207b0', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />

            <View style={{ height: 100, justifyContent: 'center', alignSelf: "center", marginTop: -20 }} >
              <Text style={styles.confirm} >{strings.favoriteconfirm}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', width: '100%' }} >
              <TouchableOpacity style={styles.modalbutton} onPress={() => { this.addfavour() }} >
                <Text style={styles.modalbuttonText} >{strings.yes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalbutton} onPress={() => { this.setState({ modalVisible: false }) }}>
                <Text style={styles.modalbuttonText} >{strings.cancel}</Text>
              </TouchableOpacity>
            </View>

          </ModalContent>
        </Modal>
        <Modal
          width={0.9}
          visible={this.state.successVisible}
          rounded
          actionsBordered
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => {
            this.setState({ successVisible: false });
          }}
        >
          <ModalContent
            style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }} >
            <Image source={require('../assets/images/modal.png')} style={{ position: 'absolute', width: '120%', marginLeft: -30, top: -60 }} resizeMode={"contain"} />
            <LinearGradient colors={['#e207b0', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />
            <View style={{ height: 100 }} >
              <Text style={styles.confirm} >{strings.success} </Text>
            </View>
            <TouchableOpacity style={{ ...styles.modalbutton, marginTop: -15 }} onPress={() => { this.setState({ successVisible: false }) }} >
              <Text style={styles.modalbuttonText} >  {strings.ok} </Text>
            </TouchableOpacity>

          </ModalContent>
        </Modal>

        <TouchableOpacity style={{ position: 'absolute', left: '10%', zIndex: 1000, top: '1%' }} onPress={() => this.props.navigation.goBack()}>
          <Icon2 name={this.state.currentLang == 'ar' ? "arrow-right" : "arrow-left"} size={20} style={styles.menu} color="white" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.addButton} onPress={() => this.setState({ modalVisible: true })}>
          <Text>{strings.addtomylist}</Text>
        </TouchableOpacity> */}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button} onPress={() => { this.setState({ full: !this.state.full }) }} >
            <Icon name={this.state.full == true ? 'arrowsalt' : 'shrink'} size={30} color='gray' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => { this.setState({ flip: this.state.full ? !this.state.flip : false }) }} >
            <Icon name={this.state.flip == true ? 'swapleft' : 'swapright'} size={30} color='gray' />
          </TouchableOpacity>
        </View>
        <Video source={{ uri: 'http://192.168.110.249:8000/' + this.props.navigation.getParam('clickedSource') }} style={styles.bac}
          ref={p => this.VideoPlayer = p}
          onBuffer={this.onBuffer}   // Callback function
          onError={this.videoError}
          resizeMode={'contain'}
          // resizeMode={this.state.full == true ? 'contain' : 'stretch'}
          rate={1}
          muted={false}
          playWhenInactive={true}
          ignoreSilentSwitch={null}
          fullscreen={true}
          repeat={false}
          controls={true}
          filterEnabled={false}
          progressUpdateInterval={10}
          fullscreenOrientation={"landscape"}
          playInBackground={true}
          // onFullscreenPlayerWillPresent={self.fullScreenPlayerWillPresent}
          // onFullscreenPlayerDidPresent={self.fullScreenPlayerDidPresent}
          // onFullscreenPlayerWillDismiss={self.fullScreenPlayerWillDismiss}
          // onFullscreenPlayerDidDismiss={self.fullScreenPlayerDidDissmiss}
          style={{
            aspectRatio: width / height,
            width: width,
            height: height,
            transform: [{ rotate: this.state.full ? this.state.flip ? '270deg' : '90deg' : '0deg' }, { scale: this.state.full ? height / width : 1 }]
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  bac: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (23 / 16),
    alignSelf: 'center'
  },
  button: {
    position: "absolute",
    top: '1%',
    right: 20,
    width: 30,
    height: 30,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button2: {
    position: "absolute",
    top: '1%',
    right: 60,
    width: 30,
    height: 30,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    position: 'absolute',
    left: '40%',
    zIndex: 1000,
    top: '1%',
    width: 120,
    height: 35,
    backgroundColor: 'green',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalbutton: {
    width: 100,
    height: 50,
    backgroundColor: '#e207b0',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#e207b0'
  },
  modalbuttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  },
  confirm: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    alignSelf: "center"
  }
});
