import React, { useState } from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MissionDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, title, description, imageUrl, location } = route.params;
  const mapIcon = <FontAwesome name="map-marker" size={30} color="blue" />;

  const handleOpenMap = () => {
    Linking.canOpenURL(location).then((supported) => {
      if (supported) {
        Linking.openURL(location);
      } else {
        Linking.openURL(fallbackUrl);
      }
    });
  };

  const handleAcceptMission = () => {
    if (id === 1) {
      navigation.navigate('MissionIntroPage', {
        imageUrl,
      });
    } else if (id === 2) {
      navigation.navigate('MissionIntroPage2', {
        imageUrl,
      });
    } else if (id === 3) {
      navigation.navigate('MissionIntroPage3', {
        imageUrl,
      });
    } else if (id === 4) {
      navigation.navigate('MissionIntroPage4', {
        imageUrl,
      });
    }
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
          style={{
            width: 300,
            height: 300,
            marginBottom: 20,
            borderRadius: 12,
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mission</Text>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 20,
            width: 330,
          }}
        ></Text>
        <TouchableOpacity style={styles.button} onPress={handleAcceptMission}>
          <Text style={styles.buttonText}>Hyväksy seikkailumatkan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>pala taakse </Text>
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
