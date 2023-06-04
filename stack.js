import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';

import {screenNames} from './constants';
import DataCollectionScreen from './data_collection/DataCollectionScreen';
import LocationScreen from './navigation/indoorNavigation/LocationScreen';
import LocationSelectScreen from './navigation/indoorNavigation/LocationSelectScreen';
import NavigationHomeScreen from './navigation/indoorNavigation/NavigationHomeScreen';
import NavigationHomeScreen2 from './navigation/indoorNavigation/NavigationHomeScreen2';
import HomeScreen from './screens/HomeScreen';
import IMUScreen from './imu/IMUScreen';
import HomeScreen1 from './screens/HomeScreen_1';
import Home from './screens/NewHome'
import WifiScreen from './screens/WifiScreen'

function Header({scene, previous, navigation}) {
  const theme = useTheme();
  const {options} = scene.descriptor;
  const title = options.headerTitle ?? options.title ?? scene.route.name;

  return (
    <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.primary}
        />
      ) : null}
      <Appbar.Content title={previous ? title : 'Indoor navigation '} />
    </Appbar.Header>
  );
}

export function StackNavigator() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenNames.HOME}
        headerMode="screen"
        screenOptions={{
          header: ({scene, previous, navigation}) => (
            <Header scene={scene} previous={previous} navigation={navigation} />
          ),
          headerStyle: {elevation: 0},
          cardStyle: {backgroundColor: '#282828'},
        }}>
        <Stack.Screen
          name={screenNames.NAVIGATION_HOME_SCREEN}
          component={NavigationHomeScreen}
          options={{headerTitle: 'Navigation Home'}}
        />
        <Stack.Screen
          name={screenNames.HOME_SCREEN}
          component={HomeScreen}
          options={{headerTitle: 'App Home'}}
        />
        <Stack.Screen
          name={screenNames.LOCATION_SCREEN}
          component={LocationScreen}
          options={{headerTitle: 'Location estimate'}}
        />
        <Stack.Screen
          name={screenNames.LOCATION_SELECT_SCREEN}
          component={LocationSelectScreen}
          options={{headerTitle: 'Location select'}}
        />
        <Stack.Screen
          name={screenNames.DATA_COLLECTION_SCREEN}
          component={DataCollectionScreen}
          options={{headerTitle: 'Data Collection'}}
        />
        <Stack.Screen
          name={screenNames.IMU_SCREEN}
          component={IMUScreen}
          options={{headerTitle: 'IMU Localization'}}
        />
        <Stack.Screen
          name={screenNames.HOME_SCREEN1}
          component={HomeScreen1}
          options={{headerTitle: 'Home'}}
        />
         <Stack.Screen
          name={screenNames.HOME}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
        name={screenNames.WIFISCREEN}
        component={WifiScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name={screenNames.NAVIGATION_HOME_SCREEN2}
        component={NavigationHomeScreen2}
        options={{headerShown: false}}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
