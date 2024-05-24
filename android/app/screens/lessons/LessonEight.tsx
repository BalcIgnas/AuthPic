import React from 'react';
import {Table, TableWrapper, Rows} from 'react-native-table-component';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import GlobalStyles from '../../../config/GlobalStyles';
import Direction from '../../../components/Direction';
import LessonPicture from '../../../components/LessonPicture';

function LessonEight() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const table = {
    tableData: [
      [
        'Paveikslėliai:',
        <LessonPicture id={'picture22'} />,
        <LessonPicture id={'picture12'} />,
      ],
      [
        'Kryptys:',
        <Direction direction={'left'} />,
        <Direction direction={'up'} />,
      ],
    ],
  };
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.headerContainer}>
        <Text style={GlobalStyles.header}>Pamoka</Text>
      </View>

      <View>
        <Table borderStyle={{borderWidth: 10, borderColor: '#FFFFFF'}}>
          <TableWrapper style={GlobalStyles.wrapper}>
            <Rows
              data={table.tableData}
              flexArr={[2, 1, 1]}
              style={GlobalStyles.row}
              textStyle={GlobalStyles.selectionText}
            />
          </TableWrapper>
        </Table>
      </View>

      <Text style={styles.instructions}>
        Nuo antros figūros einame į kairę pusę.
      </Text>

      <View style={GlobalStyles.selectionArea}>
        <Image
          source={require('../../assets/lesson/main4.png')}
          style={{width: windowWidth * 0.8, height: windowHeight * 0.41}}
          resizeMode="cover"
        />
      </View>

      <View style={GlobalStyles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[GlobalStyles.button, GlobalStyles.buttonBlue]}>
          <Text style={GlobalStyles.buttonText}>Grįžti</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LessonNine')}
          style={[GlobalStyles.button, GlobalStyles.buttonGreen]}>
          <Text style={GlobalStyles.buttonText}>Toliau</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
    marginBottom: 20,
  },
});

export default LessonEight;
