import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
    {
        Home: { screen: HomeScreen },
        Chat: { screen: MainScreenNavigator },
        ProfileScreen: { screen: ProfileScreen }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default HomeScreenRouter;
