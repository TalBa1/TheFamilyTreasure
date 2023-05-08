import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, icons, images, SIZES } from '../assets/theme';
import { Stack, useRouter } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import Missions from './Missions';

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
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.xxLarge,
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
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View>
          <Image
            source={require('../assets/images/3.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>

      {/* Middle */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={handlePress}
          style={{ width: 390, height: 350, borderRadius: 125 }}
        >
          <Image
            source={require('../assets/images/1.png')}
            style={{ width: 400, height: 400, borderRadius: 125 }}
          />
        </TouchableOpacity>
      </View>

      {/* Another section */}
      <View
        style={{
          height: 100,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../assets/images/5.png')}
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../assets/images/6.png')}
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../assets/images/8.png')}
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../assets/images/7.png')}
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <SafeAreaView
        style={{
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
