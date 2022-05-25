import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, AsyncStorage } from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import SearchBar from 'react-native-searchbar';
import styles from '../style'
import { drawer } from "../navigators/AppNavigation";
import NavigationService from '../navigators/NavigationService';
import strings from '../strings';
import LinearGradient from 'react-native-linear-gradient';
import RouterComponent from './app/RouterComponent';


//export default class MyList extends Component {
//    constructor(props) {
//        super(props);
 //       this.state = {
//            activeTab: 'Home',
//            songsClicked: false,
//            category: [
//                { id: 0, name: 'Classic' },
 //               { id: 1, name: 'Iraql' },
 //               { id: 2, name: 'Arabic' },
//                { id: 3, name: 'Kurdish' },
//            ],
//            btnClicked: 0,
//            param1: 1,
//            param2: 2,
//            param3: 3,
//            param4: 4,
 //           param5: 5,
//            param6: 6,
//        };
//    }


    async componentDidMount() {
        try {
            const userID = await AsyncStorage.getItem('userID')
            console.log('value------------------', userID)
        } catch (e) {
            // read error
        }
        await AsyncStorage.setItem('userToken', this.props.navigation.getParam("Token"));
        // await AsyncStorage.setItem('userID', this.props.navigation.getParam("userID"));
        if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
            strings.setLanguage('ar')
        }
        else {
            strings.setLanguage('en')

        }
    }

    openDrawer = async () => {
        // alert(JSON.stringify( AsyncStorage.getItem('languageCode').toString()))
        console.log(AsyncStorage.getItem('languageCode'))
        // await AsyncStorage.getItem('languageCode').then((obj) => {
        //     // obj == "ar" ? global.scaling = 0.7 : global.scaling = -0.7
        //     console.log('Home.js:==================',global.scaling)
        // }).catch((error) => {
        //     console.log('Err:==================',error)
        // })
        drawer.current.open()
    }

    AppRegistry.registerComponent('mobileApp', () => RouterComponent);

    
