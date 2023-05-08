import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';

const missions = [
  {
    id: 1,
    title: 'Mission 1',
    imageUrl: Asset.fromModule(require('../assets/images/1.png')).uri,
    description: 'This is the first mission',
    location: 'Location 1',
  },
  {
    id: 2,
    title: 'Mission 2',
    imageUrl: Asset.fromModule(require('../assets/images/2.png')).uri,
    description: 'This is the second mission',
    location: 'Location 2',
  },
  {
    id: 3,
    title: 'Mission 3',
    imageUrl: Asset.fromModule(require('../assets/images/3.png')).uri,
    description: 'This is the third mission',
    location: 'Platform6, Åkerlundinkatu, Tampere',
  },
];

const Missions = () => {
  const [currentMission, setCurrentMission] = useState(0);
  const navigation = useNavigation();

  const handleNoPress = () => {
    // Show the next mission
    setCurrentMission((currentMission + 1) % missions.length);
  };

  const handleYesPress = () => {
    // Navigate to MissionDetailsScreen with the selected mission
    const selectedMission = missions[currentMission];
    if (selectedMission) {
      navigation.navigate('MissionDetailsScreen', {
        title: missions[currentMission].title,
        description: missions[currentMission].description,
        imageUrl: missions[currentMission].imageUrl,
        location: missions[currentMission].location,
      });
    } else {
      console.error(`Mission not found at index ${currentMission}`);
    }
  };

  if (missions.length === 0) {
    return <Text>No missions found</Text>;
  }

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#EAE4E1',
          opacity: 0.7,
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
          {missions[currentMission].title}
        </Text>
        <Image
          source={missions[currentMission].imageUrl}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />
        <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 20 }}>
          {missions[currentMission].description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            width: '40%',
          }}
        >
          <TouchableOpacity onPress={handleNoPress}>
            <Text style={{ fontSize: 20, color: 'red' }}>Next mission</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleYesPress}>
            <Text style={{ fontSize: 20, color: 'green' }}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Missions;
