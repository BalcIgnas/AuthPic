import React from 'react';
import {StyleSheet} from 'react-native';
import {Row} from 'react-native-table-component';
import Direction from './Direction';

interface DirectionRowProps {
  text: string;
  direction: Direction | null;
}

const DirectionRow: React.FC<DirectionRowProps> = ({text, direction}) => {
  const data = [text, <Direction direction={direction} />];

  return <Row data={data} flexArr={[2, 1]} textStyle={styles.text} />;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
  },
});

export default DirectionRow;
