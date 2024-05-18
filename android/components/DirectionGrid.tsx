import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import Direction from './Direction';

interface DirectionGridProps {
  onSelect: (direction: Direction) => void;
}

function DirectionGrid({onSelect}: DirectionGridProps) {
  const selectDirection = (direction: Direction) => {
    if (typeof onSelect === 'function') {
      onSelect(direction);
    } else {
      console.error('onSelect is not a function');
    }
  };

  const directions = [
    <TouchableOpacity onPress={() => selectDirection('down')}>
      <Direction direction="down" />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => selectDirection('right')}>
      <Direction direction="right" />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => selectDirection('up')}>
      <Direction direction="up" />
    </TouchableOpacity>,
    <TouchableOpacity onPress={() => selectDirection('left')}>
      <Direction direction="left" />
    </TouchableOpacity>,
  ];

  return (
    <View>
      <Table borderStyle={{borderWidth: 10, borderColor: '#FFFFFF'}}>
        <Row data={directions} flexArr={[1, 1, 1, 1]} />
      </Table>
    </View>
  );
}

export default DirectionGrid;
