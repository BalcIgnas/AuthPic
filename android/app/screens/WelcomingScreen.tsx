import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../components/contexts/UserContext';
import {useAuthentication} from '../../components/contexts/AuthenticationContext';
import {useBlock} from '../../components/contexts/BlockContext';

function WelcomingScreen() {
  const [login, setLogin] = useState(false);
  const {authenticated} = useAuthentication();
  const {blocked} = useBlock();
  const {setUser} = useUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const checkAccountRegistration = async () => {
    const isRegistered = await isAccountRegistered();
    setLogin(isRegistered);
  };

  function handleLogin() {
    if (blocked) {
      Alert.alert('Viršytas bandymų limitas', 'Bandykite dar kartą vėliau.', [
        {text: 'Uždaryti'},
      ]);
    } else {
      navigation.navigate('Login');
    }
  }

  async function isAccountRegistered() {
    console.log('AccountRegistered triggered');
    const uniqueId = await DeviceInfo.getUniqueId();
    try {
      const userSnapshot = await firestore()
        .collection('users')
        .where('user', '==', uniqueId)
        .get();

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userDocId = userDoc.id;
        const userData = userDoc.data();
        const auth = userData.authentication;
        setUser({user: userDocId, authentication: auth});
        return auth ? true : false;
      } else {
        const newUserDoc = await firestore()
          .collection('users')
          .add({user: uniqueId});
        setUser({user: newUserDoc.id, authentication: null});
        return false;
      }
    } catch (error) {
      console.error('Error getting/setting user data:', error);
      return false;
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      checkAccountRegistration();
    }, []),
  );

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {login && !authenticated && (
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#62D9FF'}]}
          onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>Prisijungimas</Text>
        </TouchableOpacity>
      )}

      {!login && (
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#b8e986'}]}
          onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.buttonText}>Registracija</Text>
        </TouchableOpacity>
      )}

      {authenticated && (
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#b8e986'}]}
          onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.buttonText}>Registracijos atnaujinimas</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#ffde03'}]}
        onPress={() => navigation.navigate('Lesson')}>
        <Text style={styles.buttonText}>Pamoka</Text>
      </TouchableOpacity>

      {authenticated && (
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#ff0000'}]}
          onPress={handleExitApp}>
          <Text style={styles.buttonText}>Atsijungti</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#000000',
  },
  button: {
    width: 180,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default WelcomingScreen;
