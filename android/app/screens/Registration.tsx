import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyles from '../../config/GlobalStyles';
import PictureGrid from '../../components/PictureGrid';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Table} from 'react-native-table-component';
import DirectionGrid from '../../components/DirectionGrid';
import DirectionRow from '../../components/DirectionRow';
import PictureRow from '../../components/PictureRow';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../components/contexts/UserContext';
import {useAuthentication} from '../../components/contexts/AuthenticationContext';

function Registration() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [registrationPage, setPage] = useState(1);
  const [picOne, setPicOne] = useState<string | null>(null);
  const [picTwo, setPicTwo] = useState<string | null>(null);
  const [dirOne, setDirOne] = useState<Direction | null>(null);
  const [dirTwo, setDirTwo] = useState<Direction | null>(null);

  const {user} = useUser();
  const {setAuthenticated} = useAuthentication();

  const handleSelectPictureOne = (selectedPicture: Picture) => {
    if (picOne == null) {
      setPicOne(selectedPicture.id);
    }
    setPage(2);
  };

  const handleSelectPictureTwo = (selectedPicture: Picture) => {
    if (selectedPicture.id != picOne) {
      if (picTwo == null) {
        setPicTwo(selectedPicture.id);
      }
      setPage(3);
    } else {
      Alert.alert(
        'Klaida',
        'Negalima pasirinkti to paties paveikslėlio. Bandykite dar kartą.',
        [{text: 'Uždaryti'}],
      );
    }
  };

  const handleSelectDirectionOne = (selectedDirection: Direction) => {
    if (dirOne == null) {
      setDirOne(selectedDirection);
    }
    setPage(5);
  };

  const handleSelectDirectionTwo = (selectedDirection: Direction) => {
    if (dirTwo == null) {
      setDirTwo(selectedDirection);
    }
    setPage(6);
  };

  const handleReset = () => {
    setPicOne(null);
    setPicTwo(null);
    setPage(1);
  };

  const handleDirectionsReset = () => {
    setDirOne(null);
    setDirTwo(null);
    setPage(4);
  };

  const handleConfirmation = async () => {
    const combinedData = {
      picOne: picOne,
      picTwo: picTwo,
      dirOne: dirOne,
      dirTwo: dirTwo,
    };

    if (user.user) {
      try {
        const newAuthDoc = await firestore()
          .collection('authentication')
          .add(combinedData);
        await firestore().collection('users').doc(user.user).update({
          authentication: newAuthDoc.id,
        });
        console.log('Data sent successfully');
        setAuthenticated(false);
        Alert.alert(
          'Registracija baigta',
          'Sėkmingai užsiregistravote. Galite grįžti į pradinį langą.',
          [{text: 'Uždaryti', onPress: () => navigation.popToTop()}],
        );
      } catch (error) {
        console.error('Error writing document: ', error);
        Alert.alert('Klaida', 'Įvyko klaida. Bandykite dar kartą.', [
          {text: 'Uždaryti'},
        ]);
      }
    } else {
      Alert.alert('Klaida', 'Įvyko klaida. Bandykite dar kartą.', [
        {text: 'Uždaryti'},
      ]);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.headerContainer}>
        <Text style={GlobalStyles.header}>Registracija</Text>
      </View>

      {registrationPage === 1 && (
        <View style={styles.cont}>
          <Text style={GlobalStyles.instructions}>
            Pasirinkite du paveikslėlius:
          </Text>
          <PictureGrid
            lesson={false}
            shuffle={false}
            onSelect={handleSelectPictureOne}
          />
          <View style={GlobalStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[GlobalStyles.button, GlobalStyles.buttonBlue]}>
              <Text style={GlobalStyles.buttonText}>Grįžti</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {registrationPage === 2 && (
        <View style={styles.cont}>
          <Text style={GlobalStyles.instructions}>
            Pasirinkite du paveikslėlius:
          </Text>
          <PictureGrid
            lesson={false}
            shuffle={false}
            onSelect={handleSelectPictureTwo}
          />
          <View style={styles.selectionArea}>
            <Table borderStyle={{borderWidth: 15, borderColor: '#FFFFFF'}}>
              <PictureRow
                text="Pirmas paveikslėlis - "
                id={picOne != null ? picOne : ''}
              />
            </Table>
          </View>
          <View style={GlobalStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleReset()}
              style={[GlobalStyles.button, GlobalStyles.buttonBlue]}>
              <Text style={GlobalStyles.buttonText}>Atstatyti</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {registrationPage === 3 && (
        <View style={styles.cont}>
          <Text style={GlobalStyles.instructions}>
            Pasirinkite du paveikslėlius:
          </Text>
          <PictureGrid lesson={false} shuffle={false} onSelect={() => {}} />
          <View style={styles.selectionArea}>
            <Table borderStyle={{borderWidth: 10, borderColor: '#FFFFFF'}}>
              <PictureRow
                text="Pirmas paveikslėlis - "
                id={picOne != null ? picOne : ''}
              />
              <PictureRow
                text="Antras paveikslėlis - "
                id={picTwo != null ? picTwo : ''}
              />
            </Table>
          </View>
          <View style={GlobalStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleReset()}
              style={[GlobalStyles.button, GlobalStyles.buttonBlue]}>
              <Text style={GlobalStyles.buttonText}>Atstatyti</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPage(4)}
              style={[GlobalStyles.button, GlobalStyles.buttonGreen]}>
              <Text style={GlobalStyles.buttonText}>Tęsti</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {registrationPage === 4 && (
        <View style={styles.cont}>
          <View style={styles.dirs}>
            <Text style={GlobalStyles.instructions}>
              Pasirinkite dvi kryptis:
            </Text>
            <DirectionGrid onSelect={handleSelectDirectionOne} />
          </View>
          <View style={GlobalStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setPage(3)}
              style={[GlobalStyles.button, GlobalStyles.buttonBlue]}>
              <Text style={GlobalStyles.buttonText}>Grįžti</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {registrationPage === 5 && (
        <View style={styles.cont}>
          <View style={styles.dirs}>
            <Text style={GlobalStyles.instructions}>
              Pasirinkite dvi kryptis:
            </Text>
            <DirectionGrid onSelect={handleSelectDirectionTwo} />
          </View>
          <View style={styles.selectionArea}>
            <Table borderStyle={{borderWidth: 10, borderColor: '#FFFFFF'}}>
              <DirectionRow text="Pirma kryptis - " direction={dirOne} />
            </Table>
          </View>
          <View style={GlobalStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleDirectionsReset()}
              style={[GlobalStyles.button, GlobalStyles.buttonBlue]}>
              <Text style={GlobalStyles.buttonText}>Grįžti</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {registrationPage === 6 && (
        <View style={styles.cont}>
          <View style={styles.dirs}>
            <Text style={GlobalStyles.instructions}>
              Pasirinkite dvi kryptis:
            </Text>
            <DirectionGrid onSelect={handleSelectDirectionTwo} />
          </View>
          <View style={styles.selectionArea}>
            <Table borderStyle={{borderWidth: 10, borderColor: '#FFFFFF'}}>
              <DirectionRow text="Pirma kryptis - " direction={dirOne} />
              <DirectionRow text="Antra kryptis - " direction={dirTwo} />
            </Table>
          </View>
          <View style={GlobalStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleDirectionsReset()}
              style={[GlobalStyles.button, GlobalStyles.buttonBlue]}>
              <Text style={GlobalStyles.buttonText}>Atstatyti</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleConfirmation()}
              style={[GlobalStyles.button, GlobalStyles.buttonGreen]}>
              <Text style={GlobalStyles.buttonText}>Patvirtinti</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
  },
  cont: {
    marginTop: 20,
    flex: 1,
  },
  selectionArea: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  dirs: {
    flex: 1,
    marginBottom: 20,
  },
});

export default Registration;
