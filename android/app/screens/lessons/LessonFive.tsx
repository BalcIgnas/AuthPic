import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
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

function LessonFive() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const table = {
    tableData: [
      ['Pirmas paveikslėlis:', <LessonPicture id={'picture22'} />],
      ['Antras paveikslėlis:', <LessonPicture id={'picture12'} />],
      ['Pirma kryptis:', <Direction direction={'left'} />],
      ['Antra kryptis:', <Direction direction={'up'} />],
    ],
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.headerContainer}>
        <Text style={GlobalStyles.header}>Pamoka</Text>
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
          onPress={() => navigation.navigate('LessonSix')}
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

export default LessonFive;
