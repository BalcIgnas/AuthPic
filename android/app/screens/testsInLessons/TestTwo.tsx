import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyles from '../../../config/GlobalStyles';
import PictureGrid from '../../../components/PictureGrid';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {getCorrectPicture} from '../../functions/navigationHelpers';

function TestTwo() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const pics: PictureCoord = {
    picOne: {
      row: 3,
      col: 1,
    },
    picTwo: {
      row: 1,
      col: 4,
    },
  };

  const directions: Directions = {
    dirOne: 'down',
    dirTwo: 'right',
  };

  const correctPicture: Coord = getCorrectPicture(directions, pics);

  const handleSelectPicture = (selectedPicture: Picture) => {
    if (
      selectedPicture.coord.row === correctPicture.row &&
      selectedPicture.coord.col === correctPicture.col
    ) {
      Alert.alert('Teisingai', 'Pasirinkote teisingai, galite tęsti pamoką', [
        {text: 'Tęsti', onPress: () => navigation.navigate('LessonFive')},
      ]);
    } else {
      Alert.alert(
        'Neteisingai',
        'Pasirinkote neteisingą figūrą, bandykite dar kartą.',
        [{text: 'Užverti'}],
      );
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.headerContainer}>
        <Text style={GlobalStyles.header}>Išbandymas</Text>
      </View>
      <Text style={GlobalStyles.instructions}>
        Pasirinkite teisingą figūrą:
      </Text>
      <PictureGrid
        lesson={true}
        shuffle={false}
        onSelect={handleSelectPicture}
      />
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

export default TestTwo;
