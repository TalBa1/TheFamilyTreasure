import React, { useRef, useState } from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';

const MissionIntroPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUrl } = route.params;
  const handleAccept = () => {
    navigation.navigate('MariettaSteps');
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Image source={imageUrl} style={styles.image} />
        <Text style={styles.title}>Tehtäväsi tänään</Text>
        <Text style={styles.description}>
          Tehtävänäsi tänään on oppia laulu "Marietta Löhikäärme" ja laulaa se
          Zegyn kanssa. Tykkäätkö laulamisesta? Siitä tulee hauskaa!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleAccept}>
          <Text style={styles.buttonText}>Katso vaiheet!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#EAE4E1',
    opacity: 0.7,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  video: {
    width: width * 0.8,
    height: width * 0.8 * 0.67, // Assuming 16:9 aspect ratio
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MissionIntroPage;
