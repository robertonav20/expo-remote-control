import * as React from 'react';
import {Component} from 'react';
import {Entypo, Foundation, SimpleLineIcons, Ionicons, MaterialIcons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VolumeScreen from './VolumeScreen';
import MouseScreen from './MouseScreen';
import KeyboardScreen from './KeyboardScreen';
import MultimediaScreen from "./MultimediaScreen";
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import {getServerConfiguration, loadVariables} from "./Variables";
import ConfigurationScreen from "./ConfigurationScreen";
import HttpScreen from "./HttpScreen";

const Tab = createBottomTabNavigator();

export default class App extends Component {
    private fontLoaded: boolean = false;

    constructor(props: Readonly<any>) {
        super(props);
        this.state = { fontLoaded:false };
    }

    async componentDidMount() {
        try {
            //await clearStorage();
            await loadVariables();
            await Font.loadAsync({
                Candara: require('./assets/fonts/candara.ttf')
            })
            this.fontLoaded = true;
            this.setState({fontLoaded: true});
            getServerConfiguration()
                .then(() => console.log('SERVER CONFIGURATION LOADED!'))
                .catch(() => console.log('ERROR DURING READ SERVER CONFIGURATION !'))
        } catch (error) {
            console.log('Error loading fonts', error);
        }
    }

    render() {
        if (!this.fontLoaded) {
            return <AppLoading/>;
        }

        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarLabel: '',
                        tabBarIcon: ({color}) => {
                            if (route.name === 'Volume') {
                                return <Foundation name="volume" size={24} color={color}/>;
                            } else if (route.name === 'Mouse') {
                                return <SimpleLineIcons name="mouse" size={24} color={color}/>;
                            } else if (route.name === 'Keyboard') {
                                return <Entypo name="keyboard" size={24} color={color}/>;
                            } else if (route.name === 'Multimedia') {
                                return <Entypo name="note" size={24} color={color}/>;
                            } else if (route.name === 'Configuration') {
                                return <Ionicons name="settings-sharp" size={24} color={color}/>;
                            } else if (route.name === 'Http') {
                                return <MaterialIcons name="http" size={24} color={color}/>;
                            }
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#2198f2',
                        inactiveTintColor: 'gray',
                        allowFontScaling: true,
                        labelStyle: {
                            fontSize: 18,
                            fontFamily: 'Candara'
                        },
                        style: {
                            padding: 5
                        }
                    }}>
                    <Tab.Screen name="Volume" component={VolumeScreen}/>
                    <Tab.Screen name="Mouse" component={MouseScreen}/>
                    <Tab.Screen name="Keyboard" component={KeyboardScreen}/>
                    <Tab.Screen name="Multimedia" component={MultimediaScreen}/>
                    <Tab.Screen name="Configuration" component={ConfigurationScreen}/>
                    <Tab.Screen name="Http" component={HttpScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
