import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

interface LessonImageContextType {
  getLessonImageById: (id: string) => string | undefined;
  getAllLessonImages: () => Record<string, string> | null;
}

const defaultValue: LessonImageContextType = {
  getLessonImageById: () => undefined,
  getAllLessonImages: () => null,
};

interface LessonImageProviderProps {
  children: ReactNode;
}

export const LessonImageContext =
  createContext<LessonImageContextType>(defaultValue);

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
  console.log('Lesson images fetched');
  return pictures;
}

export const LessonImageProvider: FunctionComponent<
  LessonImageProviderProps
> = ({children}) => {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    getLessonPictures().then((pictures: {id: string; path: string}[]) => {
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

  const getLessonImageById = (id: string) => images[id];
  const getAllLessonImages = () => images;

  return (
    <LessonImageContext.Provider
      value={{getLessonImageById, getAllLessonImages}}>
      {children}
    </LessonImageContext.Provider>
  );
};
