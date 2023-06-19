import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SwipeCards from 'react-native-swipe-cards';

const missions = [
  {
    id: 1,
    title: 'Musical Mission',
    imageUrl: require('../assets/images/Marietta.png'),
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

const MissionCard = ({ mission }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
        {mission.title}
      </Text>
      <Image
        source={mission.imageUrl}
        style={{
          width: 300,
          height: 300,
          marginBottom: 20,
          borderRadius: 12,
        }}
      />
      <Text
        style={{
          fontSize: 16,

          fontWeight: 'bold',
        }}
      >
        Description
      </Text>
      <Text
        style={{
          fontSize: 13,
          marginBottom: 10,
          width: 300,
        }}
      >
        {mission.description}
      </Text>
    </View>
  );
};

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

  const swipeAnimation = useRef(new Animated.ValueXY()).current;

  const handleSwipeLeft = () => {
    const nextMissionIndex = (currentMission + 1) % missions.length;
    setCurrentMission(nextMissionIndex);
    Animated.timing(swipeAnimation, {
      toValue: { x: -500, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      swipeAnimation.setValue({ x: 0, y: 0 });
    });
  };

  const handleSwipeRight = () => {
    Animated.timing(swipeAnimation, {
      toValue: { x: 500, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      swipeAnimation.setValue({ x: 0, y: 0 });
      const selectedMission = missions[currentMission];
      if (selectedMission) {
        navigation.navigate('MissionDetailsScreen', {
          id: selectedMission.id,
          title: selectedMission.title,
          description: selectedMission.description,
          imageUrl: selectedMission.imageUrl,
          location: selectedMission.location,
        });
      } else {
        console.error(`Mission not found at index ${currentMission}`);
      }
    });
  };

  const renderCard = (mission) => {
    return <MissionCard mission={mission} />;
  };

  const handleYup = (card) => {
    handleSwipeRight();
  };

  const handleNope = (card) => {
    handleSwipeLeft();
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
      <SwipeCards
        cards={missions}
        renderCard={renderCard}
        renderNoMoreCards={() => <Text>No more missions, Go to Homepage</Text>}
        handleYup={handleYup}
        handleNope={handleNope}
        yupText="Accept"
        nopeText="Reject"
        showYup={false}
        showNope={false}
        cardStyle={{ justifyContent: 'center', alignItems: 'center' }}
        stackOffsetY={-10}
        stackOffsetX={0}
      />
      {/* Footer */}
      <SafeAreaView
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
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
