import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import {areEmpty} from '../utils/javascriptUtils';
import {createNavigableOptions} from '../utils/ngraphUtils';
import {graphJsonString} from '../utils/constants';
import {screenNames} from '../../constants';

export default function LocationSelectScreen({navigation}) {
  const [showDropDownStart, setShowDropDownStart] = useState(false);
  const [showDropDownEnd, setShowDropDownEnd] = useState(false);

  const [dropDownStartValue, setDropDownStartValue] = useState();
  const [dropDownEndValue, setDropDownEndValue] = useState();

  const navigableOptions = useMemo(() => {
    const jsonGraph = JSON.parse(graphJsonString);
    return createNavigableOptions(jsonGraph);
  }, []);

  function startNavigation() {
    navigation.navigate(screenNames.LOCATION_SCREEN, {
      startId: dropDownStartValue,
      endId: dropDownEndValue,
    });
  }

  return (
    <View style={s.viewWrapper}>
      <Text style={s.title}>Starting point</Text>
      <DropDown style={s.dropdown}
        label={'Start'}
        mode={'outlined'}
        visible={showDropDownStart}
        showDropDown={() => setShowDropDownStart(true)}
        onDismiss={() => setShowDropDownStart(false)}
        value={dropDownStartValue}
        setValue={setDropDownStartValue}
        list={navigableOptions}
      />
      <View style={s.spacerMd} />

      <Text style={s.title}>End point</Text>
      <DropDown style={s.dropdown}
        label={'End'}
        mode={'outlined'}
        visible={showDropDownEnd}
        showDropDown={() => setShowDropDownEnd(true)}
        onDismiss={() => setShowDropDownEnd(false)}
        value={dropDownEndValue}
        setValue={setDropDownEndValue}
        list={navigableOptions}
      />
      <View style={s.spacerLg} />

      <Button
        disabled={!(dropDownEndValue && dropDownStartValue)}
        icon="map-marker-radius"
        mode="contained"
        onPress={startNavigation}>
        Navigate
      </Button>
    </View>
  );
}

const s = StyleSheet.create({
  viewWrapper: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  spacerMd: {
    marginBottom: 10,
  },
  spacerLg: {
    marginBottom: 20,
  },
  dropdown:{
    backgroundColor:'yellow',
  },
});
