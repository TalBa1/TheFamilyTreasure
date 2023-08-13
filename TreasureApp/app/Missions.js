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
    title: 'Metsä seikkailu',
    imageUrl: require('../assets/images/zaza.png'),
    description:
      'Osallistujat kuuntelevat lyhyen pätkän laulua ja heidän tehtävänään on täydentää puuttuvat sanat. Tämä on hauska ja vuorovaikutteinen tapa testata musiikkitietämystä ja muistitaitoja. Se on loistava tilaisuus pitää ystävien ja perheen kesken ystävällistä kilpailua!',
    location: 'Koti',
  },
  {
    id: 2,
    title: 'Uintitehtävä',
    imageUrl: require('../assets/images/53.png'),
    description:
      'Tehtävänä on löytää kaikki altaan pohjalta piilotetut esineet, kuten lelut, kolikot ja merenelävät. Jokaisella esineellä on pistearvo, ja tavoitteena on kerätä mahdollisimman monta pistettä.',
    location: 'Hervanta, Torisevanraitti 7, 33720 Tampere',
  },
  {
    id: 3,
    title: 'Ulkoilutehtävä',
    imageUrl: require('../assets/images/54.png'),
    description:
      'Järjestä aarteenetsintä, jossa osallistujien tulee seurata vihjeitä ja ratkaista pulmia löytääkseen kätketyn aarteen.',
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
        Seikkailumatkan kuvaus
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
