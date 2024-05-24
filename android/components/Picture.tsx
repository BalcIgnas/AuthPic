import React, {useContext} from 'react';
import {Dimensions, Image} from 'react-native';
import {ImageContext} from './contexts/ImageContext';

interface PictureProps {
  id: string;
}

const Picture: React.FC<PictureProps> = ({id}) => {
  const {getImageById} = useContext(ImageContext);

  const windowWidth = Dimensions.get('window').width;
  const itemSize = windowWidth / 6;

  return (
    <Image
      source={{
        uri: getImageById(id),
        width: itemSize * 0.9,
        height: itemSize * 0.9,
      }}
      style={{margin: 2}}
    />
  );
};

export default Picture;
