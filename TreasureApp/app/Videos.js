import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import { Audio } from 'expo-av';

const Videos = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // State to track video play/pause
  const icons = {
    home: 'home',
    share: 'share',
    hamburger: 'bars',
    search: 'search',
    book: 'book',
  };

  const steps = [
    {
      title: 'Step 1 Title',
      description: 'Step 1 Description',
      videoUrl: require('../assets/videos/ZegynTikTok11.mp4'),
      buttonText: 'Next',
    },
    {
      title: 'Step 2 Title',
      description: 'Step 2 Description',
      videoUrl: require('../assets/videos/ZegynTikTok16.mp4'),
      buttonText: 'Next',
    },
    {
      title: 'Step 3 Title',
      description: 'Step 3 Description',
      videoUrl: require('../assets/videos/ZegynTikTok12.mp4'),
      buttonText: 'Homepage',
    },
    // Add more steps if needed
  ];

  const VideoPlayer = ({ videoUrl }) => {
    const videoRef = useRef(null);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
      setMounted(true);
      return () => {
        setMounted(true);
        // Release audio focus when the component unmounts
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        });
      };
    }, []);

    const handlePlayPause = async () => {
      try {
        if (videoRef.current) {
          if (isPlaying) {
            await videoRef.current.pauseAsync();
          } else {
            await Audio.requestForegroundPermissionsAsync();
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: false,
              interruptionMode: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
              playsInSilentModeIOS: true,
              shouldDuckAndroid: true,
              interruptionModeAndroid:
                Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            });
            await videoRef.current.playAsync();
          }
          setIsPlaying((prevState) => !prevState);
        }
      } catch (error) {
        console.log('Error handling play/pause:', error);
      }
    };

    return (
      <>
        {videoUrl && (
          <View style={styles.videoContainer}>
            <Video
              ref={videoRef}
              source={videoUrl}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              useNativeControls
              style={styles.video}
              shouldPlay={false} // Set to false, video will be played when the play button is pressed
              isLooping
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={goToPreviousStep}
                style={styles.button}
              ></TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
      setIsPlaying(false); // Pause the video when going to the previous step
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsPlaying(false); // Pause the video when going to the next step
    } else {
      navigation.goBack(); // Replace 'HomePage' with the name of your homepage screen
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.container}
    >
      <View style={styles.overlay} />

      {/* Video Player */}
      <View style={styles.content}>
        <VideoPlayer videoUrl={steps[currentStep].videoUrl} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goToPreviousStep} style={styles.button}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextStep} style={styles.button}>
            <Text style={styles.buttonText}>
              {currentStep === steps.length - 1
                ? steps[currentStep].buttonText
                : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
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
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#EAE4E1',
    opacity: 0.7,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  videoContainer: {
    position: 'relative',
    width: 500,
    height: 310,
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: width < 500 ? 14 : 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
  },
});

export default Videos;
