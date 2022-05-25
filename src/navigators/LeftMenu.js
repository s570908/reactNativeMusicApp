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
                            //<Text style={styles.textList}>{this.state.lang != "ar" ? strings.subscribe : 'Ø§ÙØ¥Ø´ØªØ±Ø§Ù'}</Text>
                        //</TouchableOpacity>
                   // }
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate('Home');
                        this.props.drawer.current.close();
                    }}>
                        <Text style={styles.textList}>{this.state.lang != "ar" ? strings.home : 'Ø§ÙØµÙØ­Ø© Ø§ÙØ±Ø¦ÙØ³ÙØ©'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate('LanguageSwitcher');
                        this.props.drawer.current.close();
                    }}>
                        <Text style={styles.textList}>{this.state.lang != "ar" ? strings.language : 'ÙØºØ©'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate('Profile');
                        this.props.drawer.current.close();
                    }}>
                        <Text style={styles.textList}>{this.state.lang != "ar" ? strings.profile : 'Ø§ÙÙÙÙ Ø§ÙØ´Ø®ØµÙ'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text style={styles.textList}>{this.state.lang != "ar" ? strings.logout : 'ØªØ³Ø¬ÙÙ Ø®Ø±ÙØ¬'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { NavigationService.navigate('Search'); this.props.drawer.current.close(); }}>
                        <Text style={styles.textList}>{this.state.lang != "ar" ? strings.search : 'Ø¨Ø­Ø«'}</Text>
                    </TouchableOpacity>
                    {
                        this.state.expand &&
                        <View>
                            <TouchableOpacity onPress={() => {
                                NavigationService.navigate('Profile');
                                this.props.drawer.current.close();
                            }}>
                                <Text style={styles.textList}>{this.state.lang != "ar" ? strings.profile : 'Ø§ÙÙÙÙ Ø§ÙØ´Ø®ØµÙ'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.textList}>{this.state.lang != "ar" ? strings.callerlist : 'ÙØ§Ø¦Ø­Ø© Ø§ÙÙØªØµÙÙÙ'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.textList}>{this.state.lang != "ar" ? strings.schedule : 'Ø¬Ø¯ÙÙ'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    subscribe: true,
                                    expand: false,
                                    imgURL: url1
                                })
                            }}>
                                <Text style={styles.textList}>{this.state.lang != "ar" ? strings.unsubscribe : 'Ø¥ÙØºØ§Ø¡ Ø§ÙØ§Ø´ØªØ±Ø§Ù'}</Text>
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