import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyles from '../../config/GlobalStyles';
import PictureGrid from '../../components/PictureGrid';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useGridItems} from '../../components/contexts/GridItemsContext';
import firestore from '@react-native-firebase/firestore';
import {getCorrectPicture} from '../functions/navigationHelpers';
import {useUser} from '../../components/contexts/UserContext';
import {useAuthentication} from '../../components/contexts/AuthenticationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBlock} from '../../components/contexts/BlockContext';

interface Auth {
  dirOne: Direction;
  dirTwo: Direction;
  picOne: string;
  picTwo: string;
}

function Login() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [correctPicture, setCorrectPicture] = useState<Coord | null>(null);
  const [page, setPage] = useState<number>(1);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const {gridItems} = useGridItems();
  const {user} = useUser();
  const {setAuthenticated} = useAuthentication();
  const {setBlocked} = useBlock();

  useEffect(() => {
    const checkBlockStatus = async () => {
      const blockTime = await AsyncStorage.getItem('blockTime');
      if (blockTime) {
        const currentTime = new Date().getTime();
        if (currentTime < parseInt(blockTime)) {
          setBlocked(true);
          setTimeout(() => {
            setBlocked(false);
            AsyncStorage.removeItem('blockTime');
          }, parseInt(blockTime) - currentTime);
        } else {
          AsyncStorage.removeItem('blockTime');
        }
      }
    };
    checkBlockStatus();
  }, []);

  async function getAuth() {
    if (user.authentication) {
      try {
        const snapshot = await firestore()
          .collection('authentication')
          .doc(user.authentication)
          .get();
        const data = snapshot.data();
        if (data) {
          const auth: Auth = {
            picOne: data.picOne,
            picTwo: data.picTwo,
            dirOne: data.dirOne,
            dirTwo: data.dirTwo,
          };
          return auth;
        }
        return null;
      } catch (error) {
        console.error('Error fetching auth data:', error);
        return null;
      }
    } else {
      console.error('Could not get user information');
      return null;
    }
  }

  const getCoordinatesByIds = (
    id1: string,
    id2: string,
  ): PictureCoord | null => {
    const pic1 = gridItems.find(pic => pic.id === id1);
    const pic2 = gridItems.find(pic => pic.id === id2);

    if (pic1 && pic2) {
      return {
        picOne: {row: pic1.row, col: pic1.col},
        picTwo: {row: pic2.row, col: pic2.col},
      };
    }
    return null;
  };

  async function handleSelectPicture(selectedPicture: Picture): Promise<void> {
    if (
      correctPicture &&
      selectedPicture.coord.row === correctPicture.row &&
      selectedPicture.coord.col === correctPicture.col
    ) {
      if (page === 1 || page === 0) {
        setPage(2);
      } else {
        Alert.alert('Sėkmingai prisijungta', 'Autentifikacija sėkminga', [
          {
            text: 'Tęsti',
            onPress: () => {
              setAuthenticated(true);
              navigation.popToTop();
            },
          },
        ]);
      }
    } else {
      const guesses = incorrectGuesses + 1;
      setIncorrectGuesses(guesses);
      if (guesses == 5) {
        const blockDuration = 5 * 60 * 1000;
        const blockTime = new Date().getTime() + blockDuration;
        await AsyncStorage.setItem('blockTime', blockTime.toString());
        setBlocked(true);
        setTimeout(() => {
          setBlocked(false);
          AsyncStorage.removeItem('blockTime');
        }, blockDuration);
        Alert.alert(
          'Bandymų limitas pasiektas',
          'Bandykite vėl po 5 minučių.',
          [{text: 'Užverti', onPress: () => navigation.popToTop()}],
        );
      } else {
        Alert.alert(
          'Pasirinkta neteisingai',
          'Pasirinkote neteisingą figūrą, bandykite dar kartą.',
          [{text: 'Užverti', onPress: () => setPage(page === 1 ? 0 : 1)}],
        );
      }
    }
  }

  useEffect(() => {
    getAuth().then(auth => {
      if (auth) {
        const pictures = getCoordinatesByIds(auth.picOne, auth.picTwo);
        if (pictures) {
          const pic = getCorrectPicture(
            {dirOne: auth.dirOne, dirTwo: auth.dirTwo},
            pictures,
          );
          setCorrectPicture(pic);
        }
      }
    });
  }, [gridItems]);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={[GlobalStyles.headerContainer, {margin: 20}]}>
        <Text style={GlobalStyles.header}>
          {page === 2 ? 'Prisijungimas #2' : 'Prisijungimas #1'}
        </Text>
      </View>
      <Text style={GlobalStyles.instructions}>
        Pasirinkite teisingą figūrą:
      </Text>
      {page === 0 && (
        <PictureGrid
          lesson={false}
          shuffle={true}
          onSelect={handleSelectPicture}
        />
      )}
      {page === 1 && (
        <PictureGrid
          lesson={false}
          shuffle={true}
          onSelect={handleSelectPicture}
        />
      )}
      {page === 2 && (
        <PictureGrid
          lesson={false}
          shuffle={true}
          onSelect={handleSelectPicture}
        />
      )}

      <View style={GlobalStyles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[GlobalStyles.button, GlobalStyles.buttonBlue]}>
          <Text style={GlobalStyles.buttonText}>Grįžti</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Login;
