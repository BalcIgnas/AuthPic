import React, {useContext} from 'react';
import {Image} from 'react-native';
import {ImageContext} from './contexts/ImageContext';

interface PictureProps {
  id: string;
}

const Picture: React.FC<PictureProps> = ({id}) => {
  const {getImageById} = useContext(ImageContext);

  return (
    <Image
      source={{uri: getImageById(id), height: 55, width: 55}}
      style={{margin: 2}}
    />
  );
};

export default Picture;
