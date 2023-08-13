import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { Audio } from 'expo-av';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import QrScanner from './QrScanner';

const StepComponent = ({ step, onNextStep, onPreviousStep }) => {
  const navigation = useNavigation();
  const isFirstStep = step === 1;
  const isLastStep = step === 8;
  const songFile = '../assets/songs/SongMarietta.wav';

  const handleNextStep = () => {
    if (!isLastStep) {
      onNextStep();
    }
  };

  const handlePreviousStep = () => {
    if (!isFirstStep) {
      onPreviousStep();
    }
  };

  const [audioPlayer, setAudioPlayer] = useState(null);

  const playAudio = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require(songFile));
      await sound.playAsync();
      setAudioPlayer(sound);
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const stopAudio = async () => {
    if (audioPlayer) {
      await audioPlayer.stopAsync();
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioPlayer) {
        audioPlayer.unloadAsync();
      }
    };
  }, []);

  const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleStop = async () => {
      if (videoRef.current) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      }
    };

    const handleContinue = async () => {
      if (videoRef.current && !isPlaying) {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    };

    return <>{step === 3 && <Video />}</>;
  };

  const navigateToMissionspage = async () => {
    navigation.navigate('Missions');
  };

  const [showScanner, setShowScanner] = useState(false);

  const handleOpenScanner = () => {
    setShowScanner(true);
  };

  const handleScanResult = (result) => {
    // Handle the scanned result here
    console.log('Scan result:', result);
    setShowScanner(false);
  };

  const handleLinkPress = () => {
    const url = 'geo:0,0?q=56WPSSCSL6dYfbxr6';
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}></Text>
          <Image
            source={require('../assets/images/BunnyCostume.png')}
            style={[styles.image, { width: 310, height: 310 }]} // Adjust the width and height as needed
          />
          <Image
            source={require('../assets/images/firstNote.png')}
            style={[styles.image, { width: 250, height: 250 }]} // Adjust the width and height as needed
          />
        </>
      )}
      {step === 2 && (
        <>
          <Text style={styles.title}>Paikka</Text>
          <Image
            source={require('../assets/images/zegyLocation.jpg')}
            style={[styles.image, { width: 340, height: 340 }]}
          />
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={styles.linkText}>
              Seikkailumatkan paikka:{' '}
              <Text style={styles.link}>
                {'https://maps.app.goo.gl/56WPSSCSL6dYfbxr6'}
              </Text>
            </Text>
          </TouchableOpacity>
        </>
      )}
      {step === 3 && (
        <>
          <Text style={styles.title}>Missä on se ?</Text>
          <Image
            source={require('../assets/images/a.png')}
            style={styles.image}
          />
        </>
      )}
      {step === 4 && (
        <>
          <Text style={styles.title}>Johtolanka</Text>
          <Image
            source={require('../assets/images/zegyLocation2.jpg')}
            style={styles.image}
          />
          <TouchableOpacity style={styles.button} onPress={handleOpenScanner}>
            <Text style={styles.buttonText}>Avaa QR-skanneri</Text>
          </TouchableOpacity>
          {showScanner && <QrScanner onScanResult={handleScanResult} />}
        </>
      )}
      {step === 5 && (
        <>
          <Text style={styles.title}>Missä on se ?</Text>
          <Image
            source={require('../assets/images/b.png')}
            style={styles.image}
          />
        </>
      )}
      {step === 6 && (
        <>
          <Text style={styles.title}>Video</Text>
        </>
      )}
      {step === 7 && (
        <>
          <Image
            source={require('../assets/images/paljononnea.png')}
            style={[styles.image, { width: 340, height: 340 }]}
          />
          <Image
            source={require('../assets/images/c.png')}
            style={[styles.image, { width: 340, height: 340 }]}
          />
        </>
      )}
      {step === 8 && (
        <>
          <Text style={styles.title}>Tehtävän päätös!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={navigateToMissionspage}
          >
            <Text style={styles.buttonText}>
              Siirry katsomaan lisää tehtäviä
            </Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.buttonContainer}>
        {!isFirstStep && !isLastStep && (
          <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
            <Text style={styles.buttonText}>Edellinen vaihe</Text>
          </TouchableOpacity>
        )}
        {!isLastStep && (
          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>Seuraava vaihe</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Text: {
    width: windowWidth - 40,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: windowWidth - 40,
    height: windowWidth - 40,
    marginBottom: 20,
  },
  video: {
    width: windowWidth - 40,
    height: (windowWidth - 40) * 0.75,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    marginTop: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default StepComponent;
