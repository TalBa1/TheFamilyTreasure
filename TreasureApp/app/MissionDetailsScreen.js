import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MissionDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, description, imageUrl, location } = route.params;
  const mapIcon = <FontAwesome name="map-marker" size={30} color="blue" />;

  const handleOpenMap = () => {
    const mapUrl = `geo:0,0?q=${location}`;
    const fallbackUrl = `https://www.google.com/maps/place/${location}`;

    Linking.canOpenURL(mapUrl).then((supported) => {
      if (supported) {
        Linking.openURL(mapUrl);
      } else {
        Linking.openURL(fallbackUrl);
      }
    });
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
          source={imageUrl}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />
        <Text style={{ fontSize: 18, marginBottom: 20 }}>{description}</Text>
        <TouchableOpacity onPress={handleOpenMap}>
          <Text
            style={{
              fontSize: 18,
              color: 'blue',
            }}
          >
            Mission Location: {mapIcon}
            {location}
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
