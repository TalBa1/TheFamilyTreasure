import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { Audio } from 'expo-av';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SongsPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);
  const navigation = useNavigation();
  const icons = {
    home: 'home',
    share: 'share',
    hamburger: 'bars',
    search: 'search',
    book: 'book',
  };
  const songs = [
    {
      id: 1,
      title: 'Minä Olen Zegy',
      audioUrl: require('../assets/songs/iamzegy.mp3'),
    },
    {
      id: 2,
      title: 'Marietta lohikäärme',
      audioUrl: require('../assets/songs/SongMarietta.wav'),
    },
    {
      id: 3,
      title: 'Kaikki On Hyvin Tänään',
      audioUrl: require('../assets/songs/kaikkionhyvä.mp3'),
    },
    {
      id: 4,
      title: 'Ystäväni',
      audioUrl: require('../assets/songs/ystavani.mp3'),
    },
    {
      id: 5,
      title: 'Paras Lahja',
      audioUrl: require('../assets/songs/paraslahja.mp3'),
    },
  ];

  const playSong = async (song) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(song.audioUrl);
    setSound(newSound);
    setCurrentSong(song);
    setIsPlaying(true);
    await newSound.playAsync();
  };

  const pauseSong = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resumeSong = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => playSong(item)} style={styles.songItem}>
      <Text style={styles.songTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

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
      <View style={styles.container}>
        <Text style={styles.heading}>Kuuntele Zegin laulut</Text>
        <FlatList
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        {isPlaying ? (
          <TouchableOpacity onPress={pauseSong} style={styles.pauseButton}>
            <Text style={styles.pauseButtonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={resumeSong} style={styles.resumeButton}>
            <FontAwesome name="play" size={30} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
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

const styles = {
  container: {
    padding: 120,
    marginBottom: 120,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  songItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 16,
  },
  pauseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 8,
    alignItems: 'center',
  },
  pauseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  resumeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#00ff00',
    borderRadius: 8,
    alignItems: 'center',
  },
  stopButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#0000ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 16,
  },
};

export default SongsPage;
