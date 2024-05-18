import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Table, TableWrapper, Rows} from 'react-native-table-component';
import GlobalStyles from '../../../config/GlobalStyles';
import Direction from '../../../components/Direction';
import Picture from '../../../components/Picture';

function LessonTwo() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const table = {
    tableData: [
      ['Pirmas paveikslėlis:', <Picture id={'t6PczjnZ1FTJy1fAfZTi'} />],
      ['Antras paveikslėlis:', <Picture id={'YWeXhA4TIFHNA6NE6jXC'} />],
      ['Pirma kryptis:', <Direction direction={'up'} />],
      ['Atra kryptis:', <Direction direction={'left'} />],
    ],
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pamoka</Text>
      </View>
      <Text style={GlobalStyles.instructions}>
        1. Pirmos figūros eilutės numeris parodo, kiek kartų reikės pajudėti
        pasinaudojant pirmą kryptimi nuo antros figūros.{'\n'}
        2. Pirmos figūros stulpelio numeris parodo, kiek kartų reikės pajudėti
        pasinaudojant antra kryptimi nuo antros figūros.
      </Text>

      <View style={GlobalStyles.selectionArea}>
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
          onPress={() => navigation.navigate('LessonThree')}
          style={[GlobalStyles.button, GlobalStyles.buttonGreen]}>
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

export default LessonTwo;
