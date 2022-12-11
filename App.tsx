import * as React from "react";
import { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Spinner from "react-native-loading-spinner-overlay";
import * as Font from "expo-font";

import ConfigurationScreen from "./screen/ConfigurationScreen";
import VolumeScreen from "./screen/VolumeScreen";
import MouseScreen from "./screen/mouse/MouseScreen";
import KeyboardScreen from "./screen/KeyboardScreen";
import MultimediaScreen from "./screen/MultimediaScreen";
import HttpScreen from "./screen/http/HttpScreen";

import {
  getServerConfiguration,
  loadHttpConfiguration,
} from "./utils/HttpConfiguration";
import { Icon } from "@rneui/base";

const Tab = createBottomTabNavigator();

export default class App extends Component {
  private fontLoaded: boolean = false;

  constructor(props: Readonly<any>) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    try {
      //await clearStorage();
      await loadHttpConfiguration();
      await Font.loadAsync({
        Candara: require("./assets/fonts/candara.ttf"),
        LucidaGrande: require("./assets/fonts/LucidaGrande.ttf"),
        LucidaGrandeNew: require("./assets/fonts/LucidaGrandeBold.ttf")
      });
      this.fontLoaded = true;
      this.setState({ fontLoaded: true });
      getServerConfiguration()
        .then(() => console.log("SERVER CONFIGURATION LOADED!"))
        .catch(() => console.log("ERROR DURING READ SERVER CONFIGURATION !"));
    } catch (error) {
      console.log("Error loading fonts", error);
    }
  }

  render() {
    if (!this.fontLoaded) {
      return <Spinner visible={true} />;
    }

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabel: "",
            tabBarIcon: ({ color }) => {
              if (route.name === "Volume") {
                return <Icon name="tune" size={24} color={color} type="material"/>;
              } else if (route.name === "Mouse") {
                return <Icon name="mouse" size={24} color={color} type="simple-line-icon"/>;
              } else if (route.name === "Keyboard") {
                return <Icon name="keyboard" size={24} color={color} type="entypo"/>;
              } else if (route.name === "Multimedia") {
                return <Icon name="note" size={24} color={color} type="entypo"/>;
              } else if (route.name === "Configuration") {
                return <Icon name="settings-sharp" size={24} color={color} type="ionicon"/>
              } else if (route.name === "Http") {
                return <Icon name="http" size={24} color={color} type="material"/>;
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: "white",
            inactiveTintColor: "lightgray",
            allowFontScaling: true,
            style: {
              backgroundColor: "#517fa4",
              padding: 5,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5
            },
          }}
        >
          <Tab.Screen name="Volume" component={VolumeScreen} />
          <Tab.Screen name="Mouse" component={MouseScreen} />
          <Tab.Screen name="Keyboard" component={KeyboardScreen} />
          <Tab.Screen name="Multimedia" component={MultimediaScreen} />
          <Tab.Screen name="Configuration" component={ConfigurationScreen} />
          <Tab.Screen name="Http" component={HttpScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
