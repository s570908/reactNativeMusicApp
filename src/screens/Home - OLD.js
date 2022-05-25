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



export default class MyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'Home',
            songsClicked: false,
            category: [
                { id: 0, name: 'Classic' },
                { id: 1, name: 'Iraql' },
                { id: 2, name: 'Arabic' },
                { id: 3, name: 'Kurdish' },
            ],
            btnClicked: 0,
            param1: 1,
            param2: 2,
            param3: 3,
            param4: 4,
            param5: 5,
            param6: 6,
        };
    }


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

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ ...styles.searchArea, width: '90%' }}>
                    {/* <TouchableOpacity onPress={async() => alert(await (AsyncStorage.getItem('userID')).toString())}> */}
                    <TouchableOpacity onPress={() => this.openDrawer()}>
                        <Icon2 name="bars" size={20} style={styles.menu} color="black" />
                    </TouchableOpacity>
                    <View style={styles.srhInputArea}>
                        <TextInput style={styles.srhInput} placeholder="Search..." onFocus={() => { this.props.navigation.navigate('Search') }} />
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Search') }}>
                            <Icon2 name="search" size={20} style={styles.menu} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, width: '100%' }}>

                    <View style={{ flex: 1, }}>
                        <LinearGradient colors={['rgba(0,0,0,0)', '#e207b04f']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 670 }} />

                        <View style={{ flexDirection: "row", flex: 1 }}>
                            <TouchableOpacity style={styles.sideImage} onPress={() => {
                                this.props.navigation.navigate('StageTwo', {
                                    'genreType': this.state.param1,
                                    'userID': GuserID
                                })
                            }}>
                                <Image source={require('../assets/images/song.png')} resizeMode={"stretch"} style={styles.songImage} />
                                <Text style={{ color: 'white', fontSize: 35, fontWeight: '400', position: 'absolute', bottom: 20, marginLeft: 30 }}>{strings.arabic}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sideImage} onPress={() => {
                                this.props.navigation.navigate('StageTwo', {
                                    'genreType': this.state.param2,
                                    'userID': GuserID
                                })
                            }}>
                                <Image source={require('../assets/images/song2.png')} resizeMode={"stretch"} style={styles.songImage} />
                                <Text style={{ color: 'white', fontSize: 35, fontWeight: '400', position: 'absolute', bottom: 20, marginLeft: 30 }}>{strings.english}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                            <TouchableOpacity style={styles.sideImage} onPress={() => {
                                this.props.navigation.navigate('StageTwo', {
                                    'genreType': this.state.param3,
                                    'userID': GuserID
                                })
                            }}>
                                <Image source={require('../assets/images/music.png')} resizeMode={"stretch"} style={styles.songImage} />
                                <Text style={{ color: 'white', fontSize: 35, fontWeight: '400', position: 'absolute', bottom: 20, marginLeft: 30 }}>{strings.iraqi}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sideImage} onPress={() => {
                                this.props.navigation.navigate('StageTwo', {
                                    'genreType': this.state.param4,
                                    'userID': GuserID
                                })
                            }}>
                                <Image source={require('../assets/images/islamic.png')} resizeMode={"stretch"} style={styles.songImage} />
                                <Text style={{ color: 'white', fontSize: 35, fontWeight: '400', position: 'absolute', bottom: 20, marginLeft: 30 }}>{strings.turkey}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                            <TouchableOpacity style={styles.sideImage} onPress={() => {
                                this.props.navigation.navigate('StageTwo', {
                                    'genreType': this.state.param5,
                                    'userID': GuserID
                                })
                            }}>
                                <Image source={require('../assets/images/jokes.png')} resizeMode={"stretch"} style={styles.songImage} />
                                <Text style={{ color: 'white', fontSize: 35, fontWeight: '400', position: 'absolute', bottom: 20, marginLeft: 30 }}>{strings.kurdish}</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.sideImage} onPress={() => { this.props.navigation.navigate('Animated') }}> */}
                            <TouchableOpacity style={styles.sideImage} onPress={() => {
                                this.props.navigation.navigate('StageTwo', {
                                    'genreType': this.state.param6,
                                    'userID': GuserID
                                })
                            }}>
                                <Image source={require('../assets/images/poem.png')} resizeMode={"stretch"} style={styles.songImage} />
                                <Text style={{ color: 'white', fontSize: 35, fontWeight: '400', position: 'absolute', bottom: 20, marginLeft: 30 }}>{strings.others}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}
