import React from "react";

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from "./pages/Chat";
import Search from "./pages/Search";
import Splash from "./pages/Splash";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Play from "./pages/Play";
import CustomBottomTab from "./components/CustomBottomTab";
import SearchList from "./pages/SearchList";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
  

const renderTabBar = (props) => <CustomBottomTab {...props} />;

const SearchTab = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Search" component={Search}/>
      <Stack.Screen name="SearchList" component={SearchList}/>
    </Stack.Navigator>

  )
}


  const MainTab = () => {
    return (
      <Tab.Navigator tabBar={renderTabBar} screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="SearchTab" component={SearchTab} />
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Play" component={Play} />
        <Tab.Screen name="Chat" component={Chat} />

      
      </Tab.Navigator>
    );
  };
  
  const Router = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainTab" component={MainTab} />
       
      </Stack.Navigator>
    );
  };
  export default Router;
