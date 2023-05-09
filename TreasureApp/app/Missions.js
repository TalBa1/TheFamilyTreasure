import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const missions = [
  {
    id: 1,
    title: 'Mission 1',
    imageUrl: require('../assets/images/1.png'),
    description: 'This is the first mission',
    location: 'Location 1',
  },
  {
    id: 2,
    title: 'Mission 2',
    imageUrl: require('../assets/images/2.png'),
    description: 'This is the second mission',
    location: 'Location 2',
  },
  {
    id: 3,
    title: 'Mission 3',
    imageUrl: require('../assets/images/3.png'),
    description: 'This is the third mission',
    location: 'Platform6, Åkerlundinkatu, Tampere',
  },
];

const Missions = () => {
  const [currentMission, setCurrentMission] = useState(0);
  const navigation = useNavigation();
  const icons = {
    home: 'home',
    share: 'share',
    hamburger: 'bars',
    search: 'search',
    book: 'book',
  };
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={handleNoPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Image
              source={require('../assets/images/50.png')}
              style={{ width: 130, height: 200 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleYesPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Image
              source={require('../assets/images/51.png')}
              style={{ width: 100, height: 200 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer */}
      <SafeAreaView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 70,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name={icons.home} size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name={icons.book} size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name={icons.share} size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name={icons.hamburger} size={30} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Missions;
