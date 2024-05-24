import React, {useContext} from 'react';
import {Image} from 'react-native';
import {LessonImageContext} from './contexts/LessonImageContext';

interface PictureProps {
  id: string;
}

const LessonPicture: React.FC<PictureProps> = ({id}) => {
  const {getLessonImageById} = useContext(LessonImageContext);

  return (
    <Image
      source={{uri: getLessonImageById(id), height: 55, width: 55}}
      style={{margin: 2}}
    />
  );
};

export default LessonPicture;
