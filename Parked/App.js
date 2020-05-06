import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";


import addScreen from "./screens/addScreen";
import revenueScreen from "./screens/revenueScreen";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";

import * as firebase from "firebase";

var firebaseConfig = require("./firebase.json");

firebase.initializeApp(firebaseConfig);

signOutUser = () => {
  firebase.auth().signOut();
};

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={22} color={tintColor} />
        ),
      },
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-pin" size={22} color={tintColor} />
        ),
      },
    },
    addPark: {
      screen: addScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="map" size={22} color={tintColor} />
        ),
      },
    },
    Revenue: {
      screen: revenueScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="pie-chart" size={22} color={tintColor} />
        ),
      },
    },
    Logout: {
      screen: () => null,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="md-exit"
            size={22}
            color={tintColor}
            onPress={this.signOutUser}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        height: 70,
        backgroundColor: "#fff",
        borderTopColor: "transparent",
        shadowColor: "#1f1f1f",
        shadowRadius: 12,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
      },
      activeTintColor: "#ff8566",
      inactiveTintColor: "#c3c9d1",
      showLabel: false,
    },
  }
);

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
      // headerStyle: {
      //   backgroundColor: "#ff8566",
      //   elevation: 0,
      //   shadowOpacity: 0,
      // },
      headerTintColor: "#fff",
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
      // headerStyle: {
      //   backgroundColor: "#ff8566",
      //   elevation: 0,
      //   shadowOpacity: 0,
      // },
      headerTintColor: "#fff",
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
