import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MissionDetailsScreen = () => {
  const navigation = useNavigation(); // initialize navigation
  const route = useRoute(); // initialize route before destructuring params
  const { title, description, imageUrl, location } = route.params;

  const handleOpenMap = () => {
    const mapUrl = `https://www.google.com/maps/place/${location}`;
    Linking.openURL(mapUrl);
  };

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          {title}
        </Text>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />
        <Text style={{ fontSize: 18, marginBottom: 20 }}>{description}</Text>
        <TouchableOpacity onPress={handleOpenMap}>
          <Text
            style={{
              fontSize: 18,
              color: 'blue',
              textDecorationLine: 'underline',
            }}
          >
            Location: {location}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MissionDetailsScreen;
