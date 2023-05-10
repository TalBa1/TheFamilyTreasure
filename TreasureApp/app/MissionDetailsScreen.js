import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Modal,
  Button,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';

const MissionDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, description, imageUrl, location } = route.params;
  const mapIcon = <FontAwesome name="map-marker" size={30} color="blue" />;
  const [showQRModal, setShowQRModal] = useState(false);

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

  const handleAcceptMission = () => {
    setShowQRModal(true);
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
  };

  const handlePressLink = () => {
    Linking.openURL('https://familytreasure.app/');
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
        <Text style={{ fontSize: 18, marginBottom: 20, width: 330 }}>
          {description}
        </Text>
        <TouchableOpacity onPress={handleOpenMap}>
          <Text
            style={{
              fontSize: 18,
              color: 'blue',
              width: 270,
              alignItems: 'center',
            }}
          >
            Mission Location: {mapIcon}
            {location}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAcceptMission}>
          <Text style={styles.buttonText}>Accept Mission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
        <Modal visible={showQRModal} animationType="slide">
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Scan this QR code</Text>
            <QRCode
              value="https://familytreasure.app/"
              size={250}
              color="#1A1A1A"
              backgroundColor="#FFFFFF"
            />
            <Button title="Close" onPress={handleCloseQRModal} />
            <Text style={styles.modalText}>
              If Qr code does not work use this link{' '}
              <Text
                style={{ color: 'blue' }}
                onPress={() => Linking.openURL('https://familytreasure.app/')}
              >
                https://familytreasure.app/
              </Text>
            </Text>
          </View>
        </Modal>
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
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MissionDetailsScreen;
