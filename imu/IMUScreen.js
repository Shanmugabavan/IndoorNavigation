import { View, Text, ScrollView,StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { accelerometer, gyroscope } from 'react-native-sensors';
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
setUpdateIntervalForType(SensorTypes.accelerometer, 1000);
setUpdateIntervalForType(SensorTypes.gyroscope, 100);

export default function DataCollectionScreen({ route, navigation }) {
  const [accelerometerData, setAccelerometerData] = React.useState({});
  const [gyroscopeData, setGyroscopeData] = React.useState({});
  const [isStarted, setIsStarted] = React.useState(true);

  useEffect(() => {
    let accelerometerSubscription;
    let gyroscopeSubscription;

    if (isStarted) {
      accelerometerSubscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
        setAccelerometerData({ x, y, z, timestamp });
      });

      gyroscopeSubscription = gyroscope.subscribe(({ x, y, z, timestamp }) => {
        setGyroscopeData({ x, y, z, timestamp });
      });
    }

    return () => {
      if (accelerometerSubscription) accelerometerSubscription.unsubscribe();
      if (gyroscopeSubscription) gyroscopeSubscription.unsubscribe();
    };
  }, [isStarted]);

  const startRecordings = () => {
    setIsStarted(true);
  };

  const stopRecording = () => {
    console.log('Stopping recording');
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      {/* ...your other UI elements... */}
  
      {isStarted ? (
        <Text style={styles.recordingText}>Recording...</Text>
      ) : (
        <Text style={styles.recordingText}>Waiting to start...</Text>
      )}
      <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Time stamp</Text>
            <Text style={styles.data}>{accelerometerData.timestamp}</Text>
          </View>
        </View>
      <Text style={styles.sectionTitle}>Linear Accelaration</Text>
  
      <ScrollView contentContainerStyle={styles.dataContainer}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>X</Text>
            <Text style={styles.data}>{accelerometerData.x}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Y</Text>
            <Text style={styles.data}>{accelerometerData.y}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Z</Text>
            <Text style={styles.data}>{accelerometerData.z}</Text>
          </View>
        </View>
  
        <Text style={styles.sectionTitle}>Angular Velocity</Text>
  
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>X</Text>
            <Text style={styles.data}>{gyroscopeData.x}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Y</Text>
            <Text style={styles.data}>{gyroscopeData.y}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Z</Text>
            <Text style={styles.data}>{gyroscopeData.z}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Estimated Velocity</Text>
  
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>X</Text>
            <Text style={styles.data}>{gyroscopeData.x/2}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Y</Text>
            <Text style={styles.data}>{gyroscopeData.y/2}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Z</Text>
            <Text style={styles.data}>{gyroscopeData.z/2}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Estimated Positions</Text>
  
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>X</Text>
            <Text style={styles.data}>{gyroscopeData.x*1600}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Y</Text>
            <Text style={styles.data}>{gyroscopeData.y*1600}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Z</Text>
            <Text style={styles.data}>{gyroscopeData.z*1600}</Text>
          </View>
        </View>

        
  
        
  
      </ScrollView>
  
      {/* ...your other UI elements... */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  recordingText: {
    color: 'white',
    marginBottom: 10,
  },
  dataContainer: {
    paddingVertical: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingVertical: 10,
  },
  label: {
    color: 'black',
    fontSize: 16,
  },
  data: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

