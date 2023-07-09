import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Questions = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const icons = {
    home: 'home',
    share: 'share',
    hamburger: 'bars',
    search: 'search',
    book: 'book',
  };

  const steps = [
    {
      title: 'Kysymykset',
      description:
        'Nämä ovat kysymyksiä, jotka voi esittää milloin tahansa luodaksesi hyvän yhteyden perheenjäsenten välille ja herättääksesi positiivisuutta.',
      buttonText: 'Aloita',
    },
    {
      title: 'Kuvittele, että voisit luoda oman unelmakuninkaasi.',
      description:
        'Millaisia ihmeellisiä asioita rakentaisit ja luot kunkin sisälle?',
      buttonText: 'Seuraava',
    },
    {
      title: 'Menestys on unelman saavuttamisen prosessi.',
      description: 'Mikä mielestäsi on tärkeämpää, prosessi vai lopputulos?',
      buttonText: 'Seuraava',
    },
    {
      title:
        'Zegy rakastaa laulamista, leikkimistä metsässä, aarteiden piilottelua perheille ja lohen syömistä.',
      description:
        'Mitä nautit todella tekemisestä tai luomisesta? Miksi pidät siitä?',
      buttonText: 'Seuraava',
    },
    {
      title: 'By you reading this, Zegy has achieved a big dream of his..,',
      description:
        'Miltä sinusta tuntuu, kun kuvittelet unelmiesi toteutumisen? Voitko kuvailla sitä tunnetta?',
      buttonText: 'Seuraava',
    },
    {
      title:
        'Zegy tykkää hymyillä, laulaa ja sanoa asioita, joita toiset saattavat tarvita kuulla...',
      description:
        'Mitä ystävällistä tai auttavaista voit tehdä toiselle tehdäksesi hänet onnelliseksi?',
      buttonText: 'Seuraava',
    },
    {
      title:
        'Happily giving to others is a very powerful way to enjoy and grow in life.',
      description:
        'Voitko ajatella erityistä lahjaa tai luomusta, jonka haluaisit antaa jollekulle, josta välität? Miltä se saattaisi saada hänet tuntemaan?',
      buttonText: 'Seuraava',
    },
    {
      title:
        'Zegy unelmoi ja laajentaa jatkuvasti haluamalla kokea enemmän ja parempaa.',
      description:
        'Mitä uutta haluaisit kokeilla tai oppia? Miksi se kiinnostaa sinua?',
      buttonText: 'Seuraava',
    },
    {
      title:
        'If you do not make your dreams a reality, maybe nobody else will..so..',
      description:
        'Miksi mielestäsi on tärkeää tavoitella intohimojasi ja unelmiasi?',
      buttonText: 'Seuraava',
    },
    {
      title:
        'Zegyllä on lapsen sydän, täynnä iloa, ystävällisyyttä ja optimismia.',
      description:
        'Miten mielestäsi lapsen sydämellä, joka on täynnä iloa ja ystävällisyyttä, voi tehdä maailmasta paremman paikan?',
      buttonText: 'Seuraava',
    },
    {
      title:
        'Zegy on luonut koko valtakunnan mielikuvituksensa ja luovuutensa avulla.',
      description:
        'Mitä haluaiset luoda tai rakentaa käyttäen mielikuvitustasi?',
      buttonText: 'Mene kotisivulle',
    },
    {
      title: 'Tarinat auttavat meitä näkemään maailman eri tavalla...',
      description:
        'Mikä on suosikkikirjasi tai tarinasi, ja miksi pidät siitä?',
      buttonText: 'Mene kotisivulle',
    },
  ];

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
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

      {/* Steps */}
      <View style={styles.content}>
        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.description}>{steps[currentStep].description}</Text>
        <TouchableOpacity onPress={goToNextStep} style={styles.button}>
          <Text style={styles.buttonText}>
            {currentStep === 0
              ? steps[currentStep].buttonText
              : currentStep === steps.length - 1
              ? steps[currentStep].buttonText
              : 'Seuraava'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <SafeAreaView style={styles.footer}>
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
  title: {
    fontSize: width < 500 ? 20 : 24,
    fontWeight: 'bold',
    marginBottom: width < 500 ? 10 : 20,
    textAlign: 'center',
  },
  description: {
    fontSize: width < 500 ? 14 : 16,
    textAlign: 'center',
    marginBottom: width < 500 ? 10 : 20,
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

export default Questions;
