import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Router from './src/router';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {

    setTimeout(() => {
      
      SplashScreen.hide();
    }, 2000);
  }, []); // 두 번째 매개변수로 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정
  
  return (
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  );
}

export default App;
