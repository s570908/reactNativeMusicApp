import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, ScrollView, Image, AsyncStorage, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { drawer } from "../navigators/AppNavigation";
import strings from '../strings';
import { connect } from 'react-redux';
import { FetchAlbums, FetchAlbumSong } from '../actions/Album/Album'
import { FetchTopPlayed } from '../actions/TopPlayed/TopPlayed'
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import RNFS from 'react-native-fs';
import repeatedStyles from '../style';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-modals';


const { width, height } = Dimensions.get('window');

class StageFive extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bottomAlbum: [
                { id: 0, name: 'tomato' },
                { id: 1, name: 'lemon' },
                { id: 2, name: 'apple' },
                { id: 3, name: 'pear' },
                { id: 4, name: 'banana' },
                { id: 5, name: 'berry' },
            ],
            clicked: '',
            clickedType: '',
            clickedSource: '',
            clickedThumb: '',
            clickedAlbumID: '',
            sourcedata: '',
            clickedTitle: '',
            downClicked: false,
            playClicked: false,
            modalVisible: false,
            modalVisible1: false,
            addedToFavor: false,
            toggleClick: false,
            testState: false,
            artist_name: '',
            album_name: '',
            userIDState: '',
            currentLang: 'en'
        }
        this.onDownloadPress = this.onDownloadPress.bind(this);
    }

    async componentWillMount() {
        await AsyncStorage.setItem('userToken', this.props.navigation.getParam("Token"));
        AsyncStorage.getItem('data', (err, result) => {
            this.setState({ sourcedata: JSON.parse(result) })
        });
    }

    componentDidMount = async () => {
        let genreID = this.props.navigation.getParam('genreID')
        let artistID = this.props.navigation.getParam('artistID')
        this.props.FetchAlbums(genreID, artistID)
        // artist_name catch
        axios.get('http://192.168.110.249:8000/api/content/artist/' + genreID + '/' + artistID + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                // this.setState({ addedToFavor: true })
                console.log('artistName============', response)
                let artist_name = JSON.stringify(response['data']['data']['content'][0]['artist_name'])
                this.setState({
                    artist_name: artist_name,
                })
            }, (err) => {
                console.log('get artist name ======', err)
            });

        // album_name catch
        axios.get('http://192.168.110.249:8000/api/content/album/' + genreID + '/' + artistID + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                // this.setState({ addedToFavor: true })
                // alert(JSON.stringify(response['data']['data']['content'][0]['album_name']))
                let album_name = JSON.stringify(response['data']['data']['content'][0]['album_name'])
                this.setState({
                    album_name: album_name,
                })
            }, (err) => {
                console.log('get artist name ======', err)
            });

        // this.props.FetchAlbumSong(genType, 1)
        // this.props.FetchTopPlayed(genType)
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

    openDrawer() {
        // alert(32)
        // alert(JSON.stringify(this.props.album))
        drawer.current.open()
        // setTimeout(function(){this.changeState()}.bind(this), 1000)
        console.log('==============source data **************', this.state.sourcedata);
    }

    // changeState() {
    //     this.setState({
    //         testState: !this.state.testState
    //     })
    // }

    // async addFavour() {
    //     const body = this.state.clicked;
    //     console.log('body====================', body)
    //     axios.post('http://192.168.110.249:8000/api/content/favorupload', body, {
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8',
    //             'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
    //         }
    //     })
    //         .then((response) => {
    //             // this.setState({ addedToFavor: true })
    //             console.log('============== upload success', response)
    //         }, (err) => {
    //             console.log('============== upload failed ===', err)
    //         });
    // }

    // removeFavor() {

    // }

    // addOrRemove(toggle) {
    //     if (toggle) {
    //         this.addFavour()
    //     } else {
    //         this.removeFavor()
    //     }
    // }

    FetchAlbumSong(genType, albumID) {
        this.props.FetchAlbumSong(genType, albumID)
    }

    onDownloadPress() {

        AsyncStorage.getItem('data', (err, result) => {

            if (JSON.parse(result) == null) {

                RNFS.downloadFile({
                    fromUrl: 'http://192.168.110.249:8000/' + this.state.clickedSource,
                    toFile: `${RNFS.DocumentDirectoryPath}/${this.state.clicked['title']}.${this.state.clickedSource[this.state.clickedSource.length - 3]}${this.state.clickedSource[this.state.clickedSource.length - 2]}${this.state.clickedSource[this.state.clickedSource.length - 1]}`,
                }).promise.then((r) => {

                });
                RNFS.downloadFile({
                    fromUrl: 'http://192.168.110.249:8000/' + this.state.clickedThumb,
                    toFile: `${RNFS.DocumentDirectoryPath}/${this.state.clicked['title']}.${this.state.clickedThumb[this.state.clickedThumb.length - 3]}${this.state.clickedThumb[this.state.clickedThumb.length - 2]}${this.state.clickedThumb[this.state.clickedThumb.length - 1]}`,
                }).promise.then((r) => {
                    AsyncStorage.setItem('data', JSON.stringify([{
                        id: 1, title: this.state.clicked['title'], thumb: this.state.clicked['title'] + '.' + this.state.clickedThumb[this.state.clickedThumb.length - 3] + this.state.clickedThumb[this.state.clickedThumb.length - 2] + this.state.clickedThumb[this.state.clickedThumb.length - 1],
                        source: this.state.clicked['title'] + '.' + this.state.clickedSource[this.state.clickedSource.length - 3] + this.state.clickedSource[this.state.clickedSource.length - 2] + this.state.clickedSource[this.state.clickedSource.length - 1],
                        type: this.state.clickedType
                    }]));
                    this.setState({ modalVisible: false })
                    this.setState({
                        modalVisible1: true
                    })
                    setTimeout(() => { this.setState({ modalVisible1: false }) }, 1000)
                }).catch(error => {
                    console.log('==========Error: =======', error)
                    this.setState({ modalVisible: false })
                });
            }
            else {
                RNFS.downloadFile({
                    fromUrl: 'http://192.168.110.249:8000/' + this.state.clickedSource,
                    toFile: `${RNFS.DocumentDirectoryPath}/${this.state.clicked['title']}.${this.state.clickedSource[this.state.clickedSource.length - 3]}${this.state.clickedSource[this.state.clickedSource.length - 2]}${this.state.clickedSource[this.state.clickedSource.length - 1]}`,
                }).promise.then((r) => {
                });
                RNFS.downloadFile({
                    fromUrl: 'http://192.168.110.249:8000/' + this.state.clickedThumb,
                    toFile: `${RNFS.DocumentDirectoryPath}/${this.state.clicked['title']}.${this.state.clickedThumb[this.state.clickedThumb.length - 3]}${this.state.clickedThumb[this.state.clickedThumb.length - 2]}${this.state.clickedThumb[this.state.clickedThumb.length - 1]}`,
                }).promise.then((r) => {
                    let temp = JSON.parse(result);
                    temp.push({
                        id: 1, title: this.state.clicked['title'], thumb: this.state.clicked['title'] + '.' + this.state.clickedThumb[this.state.clickedThumb.length - 3] + this.state.clickedThumb[this.state.clickedThumb.length - 2] + this.state.clickedThumb[this.state.clickedThumb.length - 1],
                        source: this.state.clicked['title'] + '.' + this.state.clickedSource[this.state.clickedSource.length - 3] + this.state.clickedSource[this.state.clickedSource.length - 2] + this.state.clickedSource[this.state.clickedSource.length - 1],
                        type: this.state.clickedType
                    });
                    AsyncStorage.setItem('data', JSON.stringify(temp));

                    this.setState({ modalVisible: false })
                    this.setState({
                        modalVisible1: true
                    })
                    setTimeout(() => { this.setState({ modalVisible1: false }) }, 1000)
                }).catch(error => {
                    alert(error)
                    this.setState({ modalVisible: false })
                });

            }
        });
        this.updateDownCount(this.state.clickedID)

    }

    updateRegCount = async (contentID) => {
        axios.get('http://192.168.110.249:8000/api/updateRegCount/' + contentID + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                console.log('success-----------', response['data']['message'])
            }, (err) => {
                console.log('============== fetch failed ===', err)
            });
    }

    updateDownCount = async (contentID) => {
        axios.get('http://192.168.110.249:8000/api/updateDownCount/' + contentID + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                console.log('success-----------', response['data']['message'])
            }, (err) => {
                console.log('============== fetch failed ===', err)
            });
    }



    render() {
        let thumbnailURL = this.props.navigation.getParam('thumbnailURL')
        let title = this.props.navigation.getParam('title')
        let type = this.props.navigation.getParam('type')
        let contentURL = this.props.navigation.getParam('contentURL')
        let artistID = this.props.navigation.getParam('artistID')
        let totalItem = this.props.navigation.getParam('totalItem')
        let desc_long = this.props.navigation.getParam('desc_long')
        let contentID = this.props.navigation.getParam('contentID')
        let artist_name = this.props.navigation.getParam('artist_name')
        let album_name = this.props.navigation.getParam('album_name')
        let previousScreen = this.props.navigation.getParam('previousScreen')
        return (
            <View style={styles.box}>
                {/* Don't copy this modal: it uses repeatedStyles from '../styles'
                    In Modal, repeatedStyles must be used.
                */}

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
                        style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }} >
                        <Image source={require('../assets/images/modal.png')} style={{ position: 'absolute', width: '120%', marginLeft: -30, top: -60 }} resizeMode={"contain"} />
                        <LinearGradient colors={['#e207b0', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />
                        <View style={{ height: 100 }}>
                            <Text style={repeatedStyles.confirm}>{strings.confirm}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', width: '100%' }} >
                            <TouchableOpacity style={repeatedStyles.modalbutton} onPress={() => { this.onDownloadPress() }} >
                                <Text style={repeatedStyles.modalbuttonText} >{strings.yes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={repeatedStyles.modalbutton} onPress={() => this.setState({ modalVisible: false })}>
                                <Text style={repeatedStyles.modalbuttonText} >{strings.cancel}</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalContent>
                </Modal>

                <Modal
                    width={0.9}
                    visible={this.state.modalVisible1}
                    rounded
                    actionsBordered
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    onTouchOutside={() => {
                        this.setState({ modalVisible1: false });
                    }}
                    style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}
                >
                    <ModalContent
                        style={{ backgroundColor: '#aaf', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }} >
                        <View style={{ height: 100 }}>
                            <Text style={{ ...repeatedStyles.confirm, alignSelf: 'center' }}> {strings.success} </Text>
                        </View>
                    </ModalContent>
                </Modal>

                <View style={styles.container}>
                    <View style={styles.searchArea}>
                        <TouchableOpacity onPress={() =>
                            previousScreen == 'Profile'
                                ?
                                this.props.navigation.navigate('Profile')
                                :
                                this.props.navigation.goBack()

                        }>
                            <Icon name={this.state.currentLang == 'ar' ? "arrow-right" : "arrow-left"} size={20} style={styles.menu} color="black" />
                        </TouchableOpacity>
                        <View style={styles.srhInputArea}>
                            <TextInput style={styles.srhInput} placeholder="Search..."
                                onFocus={() => {
                                    this.props.navigation.navigate('Search')
                                }} />
                            <Icon name="search" size={20} style={styles.menu} color="black" />
                        </View>
                    </View>
                    <Text style={styles.top}>{album_name}</Text>
                    <View style={styles.albumArea}>
                        {/* <ScrollView horizontal={true} >
                            {
                                this.state.bottomAlbum.map((item, index) => (
                                    <View key={index} style={styles.albumImageGroup}>
                                        <Image style={styles.albumImage} source={require('../assets/images/login' + 1 + '.png')} />
                                        <Text style={styles.imgAlbumName} onPress={() => { alert(index) }}>{item.name}</Text>
                                    </View>
                                ))
                            }
                        </ScrollView> */}

                        <TouchableOpacity style={styles.albumImageGroup} onPress={() => {
                            type == '0' ? (
                                this.props.navigation.navigate('VideoPlayer',
                                    {
                                        'clicked': totalItem,
                                        'clickedSource': contentURL,
                                    }
                                )
                            ) :
                                this.props.navigation.navigate('MusicPlayer',
                                    {
                                        'clicked': totalItem,
                                        'clickedSource': contentURL,
                                        'clickedThumb': thumbnailURL
                                    }
                                )
                        }}>

                            <View style={{ position: 'absolute', flexDirection: 'row', top: 10, right: 10, zIndex: 1000, justifyContent: 'space-around' }}>
                                {/* This will be next step */}
                                {/* <TouchableOpacity onPress={async () => {
                                    try {
                                        let userID = await AsyncStorage.getItem('userID')
                                        this.setState({
                                            userIDState: userID
                                        })
                                        console.log('==========***** userID *****=============', userID)
                                        this.markHeart(userID, item['albumID'])
                                    } catch (error) {
                                        console.log(error)
                                        console.log(error)
                                    }
                                    console.log('==========***** item["id"] *****=========', item['id'])

                                }} style={styles.heart} >
                                    <Icon name="heart" size={25} color={item['userID'] == this.state.userIDState ? "rgb(250, 185, 75)" : "white"} />
                                </TouchableOpacity> */}
                                {/* This will be next step */}

                            </View>
                            <Image style={styles.albumImage} source={{ uri: "http://192.168.110.249:8000/" + thumbnailURL }} />
                            {/* <Image style={styles.albumImage} source={{ uri: "http://192.168.110.249:8000/" + this.state.clickedThumb }} /> */}
                            {/* <Image style={styles.albumImage} source={{ uri: "http://192.168.110.249:8000/" + item['thumbnailURL'] }} /> */}
                            <View style={{ position: 'absolute', bottom: 30, width: width * 0.6, height: width * 0.35, zIndex: 90 }}>
                                <View style={styles.imgAlbumNameArea}>
                                    <Text style={styles.imgAlbumName} >{title}</Text>
                                </View>
                                <Text style={styles.imgAlbumNameType} >{type == 0 ? 'Video' : 'Audio'}</Text>
                                {/* <Text style={styles.price}>500IQD</Text> */}
                            </View>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity
                                    style={{ ...styles.DownBtn, backgroundColor: 'rgb(25,22,54)', }}
                                    activeOpacity={0.6}
                                    onPress={() => {
                                        this.setState({
                                            modalVisible: true,
                                            clickedSource: contentURL,
                                            clicked: totalItem,
                                            clickedThumb: thumbnailURL,
                                            clickedType: type,
                                        })
                                    }} >
                                    <Text style={{ color: '#e207b0' }}>{strings.download}</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={{ ...styles.DownBtn, backgroundColor: '#fff', }} activeOpacity={0.6} >
                                    <Text style={{ color: '#e207b0' }}>{strings.gift}</Text>
                                </TouchableOpacity> */}
                            </View>
                            <TouchableOpacity style={styles.play} onPress={() => {
                                type == '0' ? (
                                    this.props.navigation.navigate('VideoPlayer',
                                        {
                                            'clicked': totalItem,
                                            'clickedSource': contentURL,
                                        }
                                    )
                                ) :
                                    this.props.navigation.navigate('MusicPlayer',
                                        {
                                            'clicked': totalItem,
                                            'clickedSource': contentURL,
                                            'clickedThumb': thumbnailURL
                                        }
                                    )
                                this.updateRegCount(contentID)
                            }}>
                                <Icon name="play" size={25} color="white" />
                            </TouchableOpacity>
                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(215,100,190,0.4)', 'rgba(213,52,178,0.8)', '#e207b0']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 150, borderRadius: 15 }} />

                        </TouchableOpacity>

                    </View>
                    <Text style={styles.most}>{artist_name ? artist_name : ''}</Text>
                    <View style={styles.bottomArea}>





                        <ScrollView style={{ backgroundColor: '#eee', borderRadius: 20, paddingHorizontal: 25, paddingBottom: 5, elevation: 5 }}>
                            <Text style={{ fontSize: 18, marginVertical: 10 }}>{desc_long}</Text>
                        </ScrollView>






                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        album: state.album,
        topPlayed: state.topPlayed
    }
}

export default connect(mapStateToProps, { FetchAlbums })(StageFive);

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        width: '90%',
        marginLeft: '5%',
        backgroundColor: 'white'
    },
    searchArea: {
        height: 80,
        flexDirection: 'row',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: '#ddd',
        borderBottomWidth: 3,
    },
    srhInputArea: {
        borderWidth: 1,
        borderColor: '#888',
        width: '90%',
        marginHorizontal: 10,
        height: 36,
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center"
    },
    srhInput: {
        width: '80%',
        marginLeft: 18,
        paddingBottom: 8
    },
    menu: {
        marginHorizontal: 10
    },
    heart: {
        marginHorizontal: 5,
    },
    play: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 70,
        right: 10,
        zIndex: 100
    },
    belowPlay: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 10,
        right: 0,
        zIndex: 1000
    },
    top: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: -15,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    most: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: -12,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    albumArea: {
        height: height * 0.5,
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 3,
    },
    albumImage: {
        borderRadius: 15,
        width: width * 0.75,
        height: height * 0.45,
        resizeMode: 'cover',
    },
    albumImageGroup: {
        marginLeft: width * 0.07,
        borderRadius: 15,
        width: width * 0.75,
        height: height * 0.45,
        elevation: 8,
        backgroundColor: '#000',
        margin: 8
    },

    bottomArea: {
        height: width * 0.6,
        paddingVertical: 10,
        flexDirection: 'row',
    },
    borderImage: {
        borderRadius: 15,
        width: width * 0.38,
        height: width * 0.45,
        resizeMode: 'cover',
    },
    borderImageGroup: {
        borderRadius: 15,
        width: width * 0.38,
        height: width * 0.45,
        margin: 5,
        elevation: 5,
    },
    imgName: {
        fontSize: 12,
        width: 70,
        paddingVertical: 2,
        color: 'white',
        backgroundColor: '#0aa',
        marginTop: -30,
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 15
    },
    imgAlbumName: {
        fontSize: 40,
        color: 'white',
        paddingHorizontal: 15,
        zIndex: 1000
    },
    imgAlbumName2: {
        fontSize: 15,
        color: 'white',
        paddingHorizontal: 15,
        zIndex: 1000
    },
    imgAlbumNameArea: {
        height: width * 0.2,
        justifyContent: 'flex-end',
    },
    imgAlbumNameArea2: {
        height: 45,
        justifyContent: 'flex-end',
    },
    imgAlbumNameType: {
        paddingHorizontal: 20,
        fontSize: 13,
        color: 'white',
    },
    price: {
        backgroundColor: '#0aa',
        width: 90,
        paddingHorizontal: 20,
        marginLeft: 15,
        paddingVertical: 3,
        borderRadius: 15,
        color: 'white'
    },
    buttonGroup: {
        width: width * 0.75,
        justifyContent: 'space-around',
        paddingVertical: 10,
        flexDirection: 'row',
        zIndex: 1000,
        position: 'absolute',
        bottom: 10
    },
    DownBtn: {
        width: width * 0.3,
        alignItems: "center",
        borderRadius: 16,
        height: 32,
        justifyContent: 'center',
    }
});

