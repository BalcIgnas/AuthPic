import React, {useContext, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import GlobalStyles from '../config/GlobalStyles';
import {ImageContext} from './contexts/ImageContext';
import {useGridItems} from './contexts/GridItemsContext';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

interface PictureGridProps {
  lesson: boolean;
  shuffle: boolean;
  onSelect: (picture: Picture) => void;
}

interface PictureItem {
  id: string;
  path: string;
}

const shuffleArray = (array: PictureItem[]): PictureItem[] => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

async function getDownloadURL(path: string) {
  const url = await storage().refFromURL(path).getDownloadURL();
  return url;
}

async function getLessonPictures() {
  const snapshot = await firestore().collection('lesssonPictures').get();
  const picturesPromises = snapshot.docs.map(async doc => {
    const url = await getDownloadURL(doc.data().path);
    return {
      id: doc.id,
      path: url,
    };
  });
  const pictures = await Promise.all(picturesPromises);

  const picture25 = pictures.find(picture => picture.id === 'picture25');
  const otherPictures = pictures.filter(picture => picture.id !== 'picture25');

  otherPictures.sort((a, b) => {
    const numA = parseInt(a.id.replace(/\D/g, ''), 10);
    const numB = parseInt(b.id.replace(/\D/g, ''), 10);
    return numA - numB;
  });
  const sortedPictures = picture25
    ? [picture25, ...otherPictures]
    : otherPictures;

  return sortedPictures;
}

const PictureGrid: React.FC<PictureGridProps> = ({
  lesson,
  shuffle,
  onSelect,
}) => {
  const {gridItems, setGridItems} = useGridItems();
  const {getAllImages} = useContext(ImageContext);

  async function generateGridItems() {
    try {
      if (lesson) {
        const pics = await getLessonPictures();
        console.log(pics);
        return pics.map((picture, index) => ({
          id: picture.id,
          path: picture.path,
          row: Math.floor(index / 5) + 1,
          col: (index % 5) + 1,
        }));
      }
      const pictureData = getAllImages();
      if (pictureData != null) {
        const pictureArray: PictureItem[] = Object.entries(pictureData).map(
          ([id, path]) => ({id, path}),
        );

        if (pictureArray.length) {
          const items = shuffle ? shuffleArray(pictureArray) : pictureArray;
          const gridItems = items.map((picture, index) => ({
            id: picture.id,
            path: picture.path,
            row: Math.floor(index / 5) + 1,
            col: (index % 5) + 1,
          }));
          return gridItems;
        }
      }
      return [];
    } catch (error) {
      console.error('Error fetching pictures:', error);
      return [];
    }
  }

  useEffect(() => {
    generateGridItems().then(items => {
      setGridItems(items);
    });
  }, [getAllImages]);

  const selectPicture = (id: string, row: number, col: number) => {
    const selectedPicture = {id, coord: {row, col}};
    if (typeof onSelect === 'function') {
      onSelect(selectedPicture);
    } else {
      console.error('onSelect is not a function');
    }
  };

  const temp = gridItems.map(item => (
    <TouchableOpacity
      key={item.id}
      style={styles.gridItem}
      onPress={() => selectPicture(item.id, item.row, item.col)}>
      {/* {isLesson && <Image source={item.path} />}
      {!isLesson && <Image source={{uri: item.path, width: 55, height: 55}} />} */}
      <Image source={{uri: item.path, width: 55, height: 55}} />
    </TouchableOpacity>
  ));

  const tableRows = [];
  for (let i = 0; i < temp.length; i += 5) {
    tableRows.push(temp.slice(i, i + 5));
  }

  const table = {
    tableRow: ['', '1', '2', '3', '4', '5'],
    tableCol: ['1', '2', '3', '4', '5'],
    tableData: tableRows,
  };

  return (
    <View style={GlobalStyles.selectionArea}>
      <Table>
        <Row
          data={table.tableRow}
          style={styles.head}
          textStyle={styles.text}
          flexArr={[0.3, 1, 1, 1, 1, 1]}
        />
        <TableWrapper style={GlobalStyles.wrapper}>
          <Col data={table.tableCol} textStyle={styles.text} />
          <Rows data={table.tableData} flexArr={[1, 1, 1, 1, 1, 10]} />
        </TableWrapper>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 70,
    marginBottom: 20,
  },
  gridItem: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
  },
  head: {
    height: 40,
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PictureGrid;
