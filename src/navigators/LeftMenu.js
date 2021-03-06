import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, AsyncStorage, I18nManager } from 'react-native';
import styles from '../style';
import NavigationService from './NavigationService';
import strings from '../strings';

const url1 = require('../assets/images/sideMenu2.png');

export default class MusicApp extends Component {

    constructor() {
        super()
        this.state = {
            subscribe: true,
            expand: false,
            imgURL: url1,
            lan: '',
            count: 1,
            lang: 'en'
        }
    }

    // async UNSAFE_componentWillMount() {
    //     if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
    //         strings.setLanguage('ar')
    //     }
    //     else {
    //         strings.setLanguage('en')
    //     }
    // }

    // async componentDidUpdate() {
    //     if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
    //         strings.setLanguage('ar')
    //     }
    //     else {
    //         strings.setLanguage('en')
    //     }
    // }

    async componentWillMount() {
        if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
            strings.setLanguage('ar')
        }
        else {
            strings.setLanguage('en')
        }
    }

    async componentDidMount() {
        AsyncStorage.getItem('languageCode').then((obj) => { this.setState({ lang: obj }) })
        // var myTimer = setTimeout(function () { this.setSubscribe() }.bind(this), 100)
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ count: 0 });
        });

    }

    // setSubscribe() {
    //     this.setState({
    //         subscribe: false,
    //         expand: true,
    //         imgURL: url2,
    //     })
    // }

    logout = async () => {
        await AsyncStorage.removeItem('userToken')
        // alert(AsyncStorage.getItem('userToken').then((obj) => {
        //     console.log('============obj==========', obj)
        // }).catch((err) => {
        //     console.log('err================', err)
        // }))
        this.props.drawer.current.close();
        NavigationService.navigate('Login')
    }



    render() {
        AsyncStorage.getItem('languageCode').then((obj) => { this.setState({ lang: obj }) })
        return (
            <ImageBackground
                source={this.state.imgURL}
                resizeMode={'stretch'}
                style={{ height: '100%', flex: 1, opacity: 1, }}>
                <View style={listStyles.listGroup}>
                    //{
                     //   this.state.subscribe &&
                       // <TouchableOpacity
                         //   onPress={() => {
                           //     NavigationService.navigate('Subscribe');
                             //   this.props.drawer.current.close();
                            //}}>
                            //<Text style={styles.textList}>{this.state.lang != "ar" ? strings.subscribe : '????????????????????????????????'}</Text>
                        //</TouchableOpacity>
                   // }
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate('Home');
                        this.props.drawer.current.close();
                    }}>
                        <Text style={styles.textList}>{this.state.lang != "ar" ? strings.home : '???????????????????????? ????????????????????????????????'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate('LanguageSwitcher');
                        this.props.drawer.current.close();
                    }}>
                        <Text style={styles.textList}>{this.state.lang != "ar" ? strings.language : '????????????'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate('Profile');
                        this.props.drawer.current.close();
                    }}>
                        <Text style={styles.textList}>{this.state.lang != "ar" ? strings.profile : '???????????????????? ????????????????????????'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text style={styles.textList}>{this.state.lang != "ar" ? strings.logout : '???????????????????? ????????????????'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { NavigationService.navigate('Search'); this.props.drawer.current.close(); }}>
                        <Text style={styles.textList}>{this.state.lang != "ar" ? strings.search : '????????????'}</Text>
                    </TouchableOpacity>
                    {
                        this.state.expand &&
                        <View>
                            <TouchableOpacity onPress={() => {
                                NavigationService.navigate('Profile');
                                this.props.drawer.current.close();
                            }}>
                                <Text style={styles.textList}>{this.state.lang != "ar" ? strings.profile : '???????????????????? ????????????????????????'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.textList}>{this.state.lang != "ar" ? strings.callerlist : '???????????????????? ????????????????????????????????'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.textList}>{this.state.lang != "ar" ? strings.schedule : '????????????????'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    subscribe: true,
                                    expand: false,
                                    imgURL: url1
                                })
                            }}>
                                <Text style={styles.textList}>{this.state.lang != "ar" ? strings.unsubscribe : '???????????????????? ????????????????????????????????'}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </ImageBackground>
        )
    }
}

const listStyles = StyleSheet.create({
    listGroup: {
        width: '30%',
        marginLeft: I18nManager.isRTL ? '65%' : '5%',
        marginTop: 120,
    }
})