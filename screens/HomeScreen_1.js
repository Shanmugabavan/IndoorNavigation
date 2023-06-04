import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

import {screenNames} from '../constants';

export default function HomeScreen1({route, navigation}) {
  return (
    <View style={styles.container}>
      <Button
        icon="chevron-right"
        mode="contained"
        onPress={() => navigation.navigate(screenNames.IMU_SCREEN)}>
        IMU Based
      </Button>
      <View style={styles.buttonGap}></View>
      <Button
        icon="chevron-right"
        mode="contained"
        onPress={() => navigation.navigate(screenNames.HOME_SCREEN)}>
        WiFi Based
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 50,
    backgroundColor: 'tomato',
  },
  buttonGap: {
    marginTop: 20,
  },
});
