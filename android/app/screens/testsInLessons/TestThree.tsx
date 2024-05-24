import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rows, Table, TableWrapper} from 'react-native-table-component';
import GlobalStyles from '../../../config/GlobalStyles';
import Direction from '../../../components/Direction';
import LessonPicture from '../../../components/LessonPicture';

function TestThree() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const table = {
    tableData: [
      ['Pirmas paveikslėlis:', <LessonPicture id={'picture3'} />],
      ['Antras paveikslėlis:', <LessonPicture id={'picture16'} />],
      ['Pirma kryptis:', <Direction direction={'down'} />],
      ['Antra kryptis:', <Direction direction={'down'} />],
    ],
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.headerContainer}>
        <Text style={GlobalStyles.header}>Išbandymas</Text>
      </View>

      <View style={styles.selectionArea}>
        <Table borderStyle={{borderWidth: 10, borderColor: '#FFFFFF'}}>
          <TableWrapper style={GlobalStyles.wrapper}>
            <Rows
              data={table.tableData}
              flexArr={[3, 1]}
              style={GlobalStyles.row}
              textStyle={GlobalStyles.selectionText}
            />
          </TableWrapper>
        </Table>
      </View>

      <View style={GlobalStyles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[GlobalStyles.button, GlobalStyles.buttonBlue]}>
          <Text style={GlobalStyles.buttonText}>Grįžti</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TestFour')}
          style={[GlobalStyles.button, GlobalStyles.buttonGreen]}>
          <Text style={GlobalStyles.buttonText}>Toliau</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  selectionArea: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default TestThree;
