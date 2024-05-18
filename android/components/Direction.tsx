import React from 'react';
import {Image} from 'react-native';

interface DirectionProps {
  direction: Direction | null;
}

const Direction: React.FC<DirectionProps> = ({direction}) => {
  const getImage = () => {
    switch (direction) {
      case 'up':
        return require('../app/assets/arrows/arrow-up.png');
      case 'down':
        return require('../app/assets/arrows/arrow-down.png');
      case 'left':
        return require('../app/assets/arrows/arrow-left.png');
      case 'right':
        return require('../app/assets/arrows/arrow-right.png');
    }
  };

  return <Image source={getImage()} style={{margin: 2}} />;
};

export default Direction;
