import React from 'react';
import {StyleSheet} from 'react-native';
import {Row} from 'react-native-table-component';
import Picture from './Picture';

interface PictureRowProps {
  text: string;
  id: string;
}

const PictureRow: React.FC<PictureRowProps> = ({text, id}) => {
  const data = [text, <Picture id={id} />];

  return <Row data={data} flexArr={[2, 1]} textStyle={styles.text} />;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
  },
});

export default PictureRow;
