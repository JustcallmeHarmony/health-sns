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
import SignUp from "./pages/SignUp";
import SearchId from "./pages/SearchUserInfo/SearchId";
import SearchPassword from "./pages/SearchUserInfo/SearchPassword";
import OnboardingScreen from "./pages/Onboarding/OnboardingScreen";

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

  const LoginTab = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="SearchId" component={SearchId}/>
        <Stack.Screen name="SearchPassword" component={SearchPassword}/>
        
      </Stack.Navigator>
  
    )
  }
  
  const Router = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="LoginTab" component={LoginTab} />
        <Stack.Screen name="MainTab" component={MainTab} />
        
      </Stack.Navigator>
    );
  };
  export default Router;
