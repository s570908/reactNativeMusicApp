import React, { Component, createRef, useState, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import ScalingDrawer from 'react-native-scaling-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import NavigationService from './NavigationService';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/Feather'
import strings from '../strings';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Login from '../screens/Login'
// import Login2 from '../screens/Login2'
import Signup from '../screens/Signup'
import Forgot from '../screens/Forgot'
import Subscribe from '../screens/Subscribe'
import LeftMenu from './LeftMenu';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Offline from '../screens/Offline';
import MyList from '../screens/MyList';
//import Search from '../screens/Search';
import LanguageSwitcher from '../screens/LanguageSwitcher';
import Animated from "../screens/Animated";
import VideoPlayer from "../screens/VideoPlayer";
import MusicPlayer from "../screens/MusicPlayer";
import Horror from "../screens/Horror";
import Documentary from "../screens/Documentary";
import Comedy from "../screens/Comedy";
import Action from "../screens/Action";
import Pop from "../screens/Pop";
import StageTwo from '../screens/StageTwo';
import StageThree from '../screens/StageThree';
import StageFour from '../screens/StageFour';
import StageFive from '../screens/StageFive';

const string = AsyncStorage.getItem("languageCode").then((value) => {
  if (value == 'ar') {
    strings.setLanguage('ar');
    return strings;
  }
  else {
    strings.setLanguage('en');
    return strings;
  }
});
export const home = string.home;
export const profile = string.profile;
export const mylist = string.mylist;
export const schedule = string.schedule;
export const languages = string.languages;
export const offline = string.offline;

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false
      }
    },
    Animated: {
      screen: Animated,
      navigationOptions: {
        headerShown: false
      }
    },
    Horror: {
      screen: Horror,
      navigationOptions: {
        headerShown: false
      }
    },
    Action: {
      screen: Action,
      navigationOptions: {
        headerShown: false
      }
    },
    Comedy: {
      screen: Comedy,
      navigationOptions: {
        headerShown: false
      }
    },
    Documentary: {
      screen: Documentary,
      navigationOptions: {
        headerShown: false
      }
    },
    Pop: {
      screen: Pop,
      navigationOptions: {
        headerShown: false
      }
    },
    VideoPlayer: {
      screen: VideoPlayer,
      navigationOptions: {
        headerShown: false
      }
    },
    MusicPlayer: {
      screen: MusicPlayer,
      navigationOptions: {
        headerShown: false
      }
    },
    Forgot: {
      screen: Forgot,
      navigationOptions: {
        headerShown: false
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerShown: false
      }
    },
    Subscribe: {
      screen: Subscribe,
      navigationOptions: {
        headerShown: false
      }
    },
    //Search: {
      //screen: Search,
      //navigationOptions: {
      //  headerShown: false
      //}
    //},
    LanguageSwitcher: {
      // screen: () => <LanguageSwitcher/>,
      screen: LanguageSwitcher,
      navigationOptions: {
        headerShown: false
      }
    },
    StageTwo: {
      screen: StageTwo,
      navigationOptions: {
        headerShown: false
      }
    },
    StageThree: {
      screen: StageThree,
      navigationOptions: {
        headerShown: false
      }
    },
    StageFour: {
      screen: StageFour,
      navigationOptions: {
        headerShown: false
      }
    },
    StageFive: {
      screen: StageFive,
      navigationOptions: {
        headerShown: false
      }
    },
  });

const TabNavigation = createMaterialBottomTabNavigator(


  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: string.home,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon name='ios-home' style={{ color: tintColor }} size={25} />
          </View>
        )
      }
    },
    MyList: {
      screen: MyList,
      navigationOptions: {
        tabBarLabel: mylist,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon name={'ios-heart'} style={{ color: tintColor }} size={25} />
          </View>
        ),
        initialRouteName: 'Home',
        activeColor: '#d26262',
        inactiveColor: 'rgb(148,148,148)',
        barStyle: { backgroundColor: 'rgba(255,255,255,0.8)', }
      }
    },
    Offline: {
      screen: Offline,
      navigationOptions: {
        tabBarLabel: offline,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon1 name={'download'} style={{ color: tintColor }} size={25} />
          </View>
        ),
        initialRouteName: 'Home',
        activeColor: '#d26262',
        inactiveColor: 'rgb(148,148,148)',
        barStyle: { backgroundColor: 'rgba(255,255,255,0.8)', }
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: profile,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon2 name={'account-circle'} style={{ color: tintColor }} size={25} />
          </View>
        ),
        initialRouteName: 'Home',
        activeColor: '#d26262',
        inactiveColor: 'rgb(240,240,240)',
        barStyle: { backgroundColor: 'rgba(255,255,255,0.2)', }
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#d26262',
    inactiveColor: 'rgb(148,148,148)',
    barStyle: { backgroundColor: 'rgba(255,255,255,0.8)', }
  }
)



const Container = createSwitchNavigator(
  {
    Auth: AuthStack,
    Appoo: TabNavigation,
  },
  {
    initialRouteName: 'Auth',
  }
)

const AppContainer = createAppContainer(Container);

export const drawer = createRef();


var dd = '';
export default class AppNavigation extends Component {

  constructor() {
    super()
    this.state = {
      category:
      {
        scalingFactor: 0.8,
        swipeOffset: 20,
        minimizeFactor: 0.7
      },
      lan: '',
      count: 1,
    };
  }

  async componentWillMount() {
    if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
      strings.setLanguage('ar')
    }
    else {
      strings.setLanguage('en')
    }
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({ count: 0 });
    });
  }

  async componentDidMount() {
    // if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
    //   strings.setLanguage('ar')
    // }
    // else {
    //   strings.setLanguage('en')
    // }

  }



  async componentWillMount() {
    if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
      strings.setLanguage('ar')
    }
    else {
      strings.setLanguage('en')
    }
  }

  // async componentWillMount() {
  //   // if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
  //   //   dd = -0.3

  //   // }
  //   // else {
  //   //   this.setState({
  //   //     lan: 0.3
  //   //   })
  //   // }
  //   this.setState({
  //     ...this.state,
  //     minimizeFactor: 0.7
  //   })
  // }

  // componentDidMount() {

  //   this.setState({
  //     category: {
  //       minimizeFactor: -0.7,
  //       scalingFactor: 0.8,
  //       swipeOffset: 20,

  //     }
  //   })
  // }

  render() {
    return (
      <ScalingDrawer
        ref={drawer}
        content={<LeftMenu drawer={drawer} />}
        {...this.state.category}
        onClose={() => console.log('close')}
        onOpen={() => console.log('open')}
      >
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ScalingDrawer>
    );
  }
}
