import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import GlobalStyles from '../../../config/GlobalStyles';

function LessonOne() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pamoka</Text>
      </View>
      <Text style={GlobalStyles.instructions}>
        Prisijungimas atrodys štai taip.
      </Text>
      <Text style={GlobalStyles.instructions}>
        Lentelėje, kuri yra sudaryta iš 5 eilučių ir 5 stulpelių, reikės
        pasirinkti teisingą figūrą.
      </Text>
      <View style={GlobalStyles.selectionArea}>
        <Image
          source={require('../../assets/lesson/main.png')}
          style={{width: windowWidth * 0.8, height: windowHeight * 0.41}}
          resizeMode="cover"
        />
      </View>
      <View style={GlobalStyles.buttonContainer}>
        <TouchableOpacity
          style={[GlobalStyles.button, GlobalStyles.buttonBlue]}
          onPress={() => navigation.goBack()}>
          <Text style={GlobalStyles.buttonText}>Grįžti</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[GlobalStyles.button, GlobalStyles.buttonGreen]}
          onPress={() => navigation.navigate('LessonTwo')}>
          <Text style={GlobalStyles.buttonText}>Toliau</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  header: {
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default LessonOne;
