import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

interface ImageContextType {
  getImageById: (id: string) => string | undefined;
  getAllImages: () => Record<string, string> | null;
}

const defaultValue: ImageContextType = {
  getImageById: () => undefined,
  getAllImages: () => null,
};

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageContext = createContext<ImageContextType>(defaultValue);

async function getDownloadURL(path: string) {
  const url = await storage().refFromURL(path).getDownloadURL();
  return url;
}

async function getPictures() {
  const snapshot = await firestore().collection('pictures').get();
  const picturesPromises = snapshot.docs.map(async doc => {
    const url = await getDownloadURL(doc.data().path);
    return {
      id: doc.id,
      path: url,
    };
  });
  const pictures = await Promise.all(picturesPromises);
  console.log('Images fetched');
  return pictures;
}

export const ImageProvider: FunctionComponent<ImageProviderProps> = ({
  children,
}) => {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    getPictures().then((pictures: {id: string; path: string}[]) => {
      const imagesMap = pictures.reduce(
        (acc: Record<string, string>, picture) => {
          acc[picture.id] = picture.path;
          return acc;
        },
        {},
      );
      setImages(imagesMap);
    });
  }, []);

  const getImageById = (id: string) => images[id];
  const getAllImages = () => images;

  return (
    <ImageContext.Provider value={{getImageById, getAllImages}}>
      {children}
    </ImageContext.Provider>
  );
};
