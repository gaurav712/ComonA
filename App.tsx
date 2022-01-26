import React from 'react';
import {StyleSheet, useColorScheme, StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Login} from './src/screens';
import Colors from './src/common/Colors';

type NavigatorParams = {
  Login: undefined;
  Home: undefined;
};
const NavigationStack = createNativeStackNavigator<NavigatorParams>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        dark: isDarkMode ? true : false,
        colors: {
          ...DefaultTheme.colors,
          background: isDarkMode
            ? Colors.containerBgDark
            : Colors.containerBgLight,
        },
      }}>
      <StatusBar
        backgroundColor={
          isDarkMode
            ? `${Colors.containerBgDark}9f`
            : `${Colors.backgroundLight}9f`
        }
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
      />
      <NavigationStack.Navigator screenOptions={{headerShown: false}}>
        <NavigationStack.Screen name="Home" component={Home} />
        <NavigationStack.Screen name="Login" component={Login} />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
