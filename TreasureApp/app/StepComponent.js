import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import QrScanner from './QrScanner';

const StepComponent = ({ step, onNextStep, onPreviousStep }) => {
  const navigation = useNavigation();
  const isFirstStep = step === 1;
  const isLastStep = step === 5;
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

    return (
      <>
        {step === 3 && (
          <Video
            ref={videoRef}
            source={require('../assets/videos/MariettaInstruction.mp4')}
            resizeMode="contain"
            shouldPlay={isPlaying}
            isLooping
            style={styles.video}
          />
        )}
        {!isPlaying ? (
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleStop}>
            <Text style={styles.buttonText}>Stop Video</Text>
          </TouchableOpacity>
        )}
      </>
    );
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

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>Your Mission Today</Text>
          <Image
            source={require('../assets/images/MariettaStepImage.png')}
            style={styles.image}
          />
        </>
      )}
      {step === 2 && (
        <>
          <Text style={styles.title}>Song</Text>
          <Image
            source={require('../assets/images/Step2Marietta.png')}
            style={styles.image}
          />
          <TouchableOpacity style={styles.button} onPress={playAudio}>
            <Text style={styles.buttonText}>Play Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stopAudio}>
            <Text style={styles.buttonText}>Stop Audio</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 3 && (
        <>
          <Text style={styles.title}>Karaoke with Zegy!</Text>
          <Text style={styles.Text}>
            Now, let's learn how to sing it together! Take a hairbrush and
            pretend it is a microphone!
          </Text>
          <VideoPlayer />
        </>
      )}
      {step === 4 && (
        <>
          <Text style={styles.title}>Your Treasure!</Text>
          <Image
            source={require('../assets/images/Diamond.png')}
            style={styles.image}
          />
          <Text style={styles.Text}>
            Well done, young maestro! You've mastered the captivating song
            "Marietta Löhikäärme" sung by the talented Zegy. Your melodious
            performance has earned you a precious diamond, representing your
            bravery and the enchantment of your imagination.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleOpenScanner}>
            <Text style={styles.buttonText}>Open QR Scanner</Text>
          </TouchableOpacity>
          {showScanner && <QrScanner onScanResult={handleScanResult} />}
        </>
      )}
      {step === 5 && (
        <>
          <Text style={styles.title}>Ending of mission!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={navigateToMissionspage}
          >
            <Text style={styles.buttonText}>Go to see more missions</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.buttonContainer}>
        {!isFirstStep && !isLastStep && (
          <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
            <Text style={styles.buttonText}>Previous Step</Text>
          </TouchableOpacity>
        )}
        {!isLastStep && (
          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>Next Step</Text>
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
});

export default StepComponent;
