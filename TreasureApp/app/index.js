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
import { COLORS, icons, images, SIZES } from '../assets/theme';
import { Stack, useRouter } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import Missions from './Missions';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Missions');
  };
  const icons = {
    home: 'home',
    share: 'share',
    hamburger: 'bars',
    search: 'search',
    book: 'book',
  };
  return (
    <ImageBackground
      source={require('../assets/images/background.png')} // background image
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
          backgroundColor: '#EAE4E1', // set the background color for the overlay
          opacity: 0.7, // set the opacity for the overlay
        }}
      />

      {/* Header */}
      <SafeAreaView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: height * 0.2, // set the height based on the screen height
        }}
      >
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerShadowVisible: false,
            headerTitle: '',
          }}
        />
        <View>
          <Image
            source={require('../assets/images/2.png')}
            style={{ width: width * 0.4, height: width * 0.4 }} // set the width and height based on the screen width
          />
        </View>
        <View>
          <Image
            source={require('../assets/images/3.png')}
            style={{ width: width * 0.4, height: width * 0.4 }} // set the width and height based on the screen width
          />
        </View>
      </SafeAreaView>

      {/* Middle */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            width: width * 0.9,
            height: width * 0.8,
            borderRadius: width * 0.3,
          }} // set the dimensions based on the screen width
        >
          <Image
            source={require('../assets/images/1.png')}
            style={{ width: '100%', height: '100%', borderRadius: width * 0.3 }} // set the dimensions based on the screen width
          />
        </TouchableOpacity>
      </View>
      {/* Another section */}
      <View
        style={{
          height: height * 0.1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../assets/images/5.png')}
            style={{ width: width * 0.4, height: width * 0.4 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../assets/images/6.png')}
            style={{ width: width * 0.4, height: width * 0.4 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: height * 0.12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../assets/images/8.png')}
            style={{ width: width * 0.4, height: width * 0.4 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../assets/images/7.png')}
            style={{ width: width * 0.4, height: width * 0.4 }}
          />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <SafeAreaView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity>
          <FontAwesome name={icons.home} size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name={icons.book} size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name={icons.share} size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name={icons.hamburger} size={24} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
