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
    title: 'Musical Mission',
    imageUrl: require('../assets/images/52.png'),
    description:
      'Participants will listen to a short clip of a song and then have to complete the lyrics. This is a fun and interactive way to test your music knowledge and memory skills. It is a great opportunity to have some friendly competition with your friends and family!',
    location: 'Home',
  },
  {
    id: 2,
    title: 'Swimming Mission',
    imageUrl: require('../assets/images/53.png'),
    description:
      'The mission is to find all the hidden objects at the bottom of the pool, such as toys, coins, and sea creatures. Each object has a point value, and the goal is to collect as many points as possible.',
    location: 'Hervanta, Torisevanraitti 7, 33720 Tampere',
  },
  {
    id: 3,
    title: 'Outside Mission',
    imageUrl: require('../assets/images/54.png'),
    description:
      'Organize a treasure hunt where participants have to follow clues and solve puzzles to find a hidden treasure.',
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
          style={{
            width: 300,
            height: 300,
            marginBottom: 20,
            borderRadius: 12,
          }}
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
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          {`Mission ${currentMission + 1} of ${missions.length}`}
        </Text>
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
