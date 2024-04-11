import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyPage from "./pages/MyPage";
import Search from "./pages/Search";
import MakeFeed from "./pages/MakeFeed";
import Home from "./pages/Home";
import Play from "./pages/Play";
import CustomBottomTab from "./components/CustomBottomTab";
import SearchList from "./pages/SearchList";
import MakeNextFeed from "./pages/MakeNextFeed";
import DmList from "./pages/DmList";
import Dm from "./pages/Dm";
import Login from "./pages/Login";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const renderTabBar = (props) => <CustomBottomTab {...props} />;


const HomeTab = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="DmList" component={DmList}/>
      <Stack.Screen name="Dm" component={Dm}/>
    </Stack.Navigator>

  )
}

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

const FeedTab = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="MakeFeed" component={MakeFeed} />
    <Stack.Screen name="MakeNextFeed" component={MakeNextFeed} />
      
    </Stack.Navigator>

  )
}


  const MainTab = () => {
    return (
      <Tab.Navigator tabBar={renderTabBar} screenOptions={{headerShown: false}}>
        <Tab.Screen name="HomeTab" component={HomeTab} />
        <Tab.Screen name="SearchTab" component={SearchTab} />
        <Tab.Screen name="FeedTab" component={FeedTab} />
        <Tab.Screen name="Play" component={Play} />
        <Tab.Screen name="MyPage" component={MyPage} />

      
      </Tab.Navigator>
    );
  };
  
  const Router = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="MainTab" component={MainTab} /> */}
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  };
  export default Router;
