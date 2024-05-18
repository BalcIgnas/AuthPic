import React from 'react';
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import GlobalStyles from '../../../config/GlobalStyles';
import PictureGrid from '../../../components/PictureGrid';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {getCorrectPicture} from '../../functions/navigationHelpers';

function TestFour() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const pics: PictureCoord = {
    picOne: {
      row: 1,
      col: 4,
    },
    picTwo: {
      row: 4,
      col: 2,
    },
  };

  const directions: Directions = {
    dirOne: 'down',
    dirTwo: 'down',
  };

  const correctPicture: Coord = getCorrectPicture(directions, pics);

  const handleSelectPicture = (selectedPicture: Picture) => {
    if (
      selectedPicture.coord.row === correctPicture.row &&
      selectedPicture.coord.col === correctPicture.col
    ) {
      Alert.alert(
        'Teisingai',
        'Baigėte pamoką. Galite grįžti į pradinį langą.',
        [{text: 'Tęsti', onPress: () => navigation.popToTop()}],
      );
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

export default TestFour;
