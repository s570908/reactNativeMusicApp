import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, ScrollView, Image, FlatList, AsyncStorage } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import styles from '../../style';
import LinearGradient from 'react-native-linear-gradient';
import strings from '../../strings';
import { connect } from 'react-redux';
import { FetchfavourContentsgenre } from '../../actions/Animated/Animatedaction';
import Icon from 'react-native-vector-icons/AntDesign';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bottomAlbum: [
                {
                    id: 0, name: 'tomato', imgurl: 'http://192.168.110.249:8000/thumbnails/1.jpg',
                    aniurl: 'http://192.168.110.249:8000/thumbnails/1.mp3'
                },
                {
                    id: 1, name: 'lemon', imgurl: 'http://192.168.110.249:8000/thumbnails/2.jpg',
                    aniurl: 'http://192.168.110.249:8000/thumbnails/2.mp4'
                },
                {
                    id: 2, name: 'apple', imgurl: 'http://192.168.110.249:8000/thumbnails/3.jpg',
                    aniurl: 'http://192.168.110.249:8000/thumbnails/3.mp4'
                },
            ],
            backimage: 'http://192.168.110.249:8000/thumbnails/login3.png',
            clickedType: '',
            clickedSource: '',
            clickedThumb: ''
        }
    }



    componentDidMount = async () => {

        // let userID = (await AsyncStorage.getItem('userID')).toString()
        AsyncStorage.getItem('userID').then((obj) => {
            // console.log('obj=============================', obj)
            this.props.FetchfavourContentsgenre(obj);
        })
        // console.log('asyncstorage UserID=========================',userID)
        // let userID = this.props.navigation.getParam('userID')
        
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 5 }}>
                    <ImageBackground
                        source={{ uri: this.state.backimage }}
                        resizeMode={'stretch'}
                        style={{ height: '100%' }}
                    >

                        <View style={styles.downMedium}>
                            <TouchableOpacity style={{ ...styles.largePlay, marginTop: '-50%' }}
                                onPress={() => {

                                    this.state.clickedType == 0 ? (
                                        this.props.navigation.navigate('FavourVideoPlayer',
                                            {
                                                'clicked': this.state.clicked,
                                                'clickedSource': this.state.clickedSource,
                                            }
                                        )
                                    ) :
                                        this.props.navigation.navigate('FavourMusicPlayer',
                                            {
                                                'clicked': this.state.clicked,
                                                'clickedSource': this.state.clickedSource,
                                                'clickedThumb': this.state.clickedThumb
                                            }
                                        )
                                }}
                            >
                                <Icon2 name="play" size={20} style={{ ...styles.menu, marginBottom: '-95%' }} color="red" />
                            </TouchableOpacity>
                        </View>

                    </ImageBackground>
                </View>
                <View style={styles.bottomArea}>
                    <FlatList
                        style={{ width: '90%' }}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        initialNumToRender={5}
                        data={this.props.animations ? this.props.animations.favorcontent : []}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    backimage: "http://192.168.110.249:8000/" + item['thumbnailURL'],
                                    clickedType: item['type'],
                                    clickedThumb: item['thumbnailURL'],
                                    clickedSource: item['contentURL']
                                })
                            }} >
                                <Image style={{ ...styles.borderImage1, marginLeft: 30 }} source={{ uri: "http://192.168.110.249:8000/" + item['thumbnailURL'] }} />
                                <Text style={{ ...styles.imgName, marginLeft: 30 }} >{item['title']}</Text>
                                {/* <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(140,140,177,0.5)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: 150, height: 60, borderRadius: 15 }} /> */}
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    />

                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        animations: state.animations
    }
}


export default connect(mapStateToProps, { FetchfavourContentsgenre })(Favorites);