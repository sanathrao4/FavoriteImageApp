// In App.js in a new project

import * as React from "react";

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import AddImages from "./AddImages";

const Tab = createBottomTabNavigator();

function FirstScreen() {
  return (
    <Tab.Navigator initialRouteName="ScreenOne">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home Screen", headerShown: true }}
      />
    </Tab.Navigator>
  );
}
const RootStack = createStackNavigator();

function MyStack() {
  return (
    <RootStack.Navigator initialRouteName="First">
      <RootStack.Screen
        name="First"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="AddImages"
        component={AddImages}
        options={{ title: "Add Images", headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default MyStack;
