import React, {useContext} from 'react';
import {Dimensions, Image} from 'react-native';
import {LessonImageContext} from './contexts/LessonImageContext';

interface PictureProps {
  id: string;
}

const LessonPicture: React.FC<PictureProps> = ({id}) => {
  const {getLessonImageById} = useContext(LessonImageContext);

  const windowWidth = Dimensions.get('window').width;
  const itemSize = windowWidth / 6;

  return (
    <Image
      source={{
        uri: getLessonImageById(id),
        width: itemSize * 0.9,
        height: itemSize * 0.9,
      }}
      style={{margin: 2}}
    />
  );
};

export default LessonPicture;
