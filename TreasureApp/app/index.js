import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const icons = {
    home: 'home',
    share: 'share',
    hamburger: 'bars',
    search: 'search',
    book: 'book',
  };

  const handlePress = () => {
    navigation.navigate('Missions');
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      {/* Overlay background */}
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

      {/* Header */}
      <SafeAreaView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: height * 0.2,
        }}
      >
        <View>
          <Image
            source={require('../assets/images/2.png')}
            style={{ width: width * 0.4, height: width * 0.4 }}
          />
        </View>
        <View>
          <Image
            source={require('../assets/images/3.png')}
            style={{ width: width * 0.4, height: width * 0.4 }}
          />
        </View>
      </SafeAreaView>

      {/* Middle */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -height * 0.25,
        }}
      >
        <TouchableOpacity
          onPress={handlePress}
          style={{
            width: width * 0.9,
            height: width * 0.8,
            borderRadius: width * 0.3,
          }}
        >
          <Image
            source={require('../assets/images/1.png')}
            style={{ width: '100%', height: '100%', borderRadius: width * 0.3 }}
          />
        </TouchableOpacity>
      </View>

      {/* Another section */}
      <View
        style={{
          position: 'absolute',
          bottom: height * 0.15,
          width: '100%',
          paddingHorizontal: width * 0.1,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('QuestionsPage')}
            style={{ alignItems: 'center' }}
          >
            <Image
              source={require('../assets/images/QuestBtn.png')}
              style={{ width: width * 0.39, height: width * 0.39 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SongsPage')}
            style={{ alignItems: 'center' }}
          >
            <Image
              source={require('../assets/images/SongBtn.png')}
              style={{ width: width * 0.39, height: width * 0.39 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/images/ActivBtn.png')}
              style={{ width: width * 0.39, height: width * 0.39 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/images/WhoBtn.png')}
              style={{ width: width * 0.39, height: width * 0.39 }}
            />
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity>
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

export default Home;
