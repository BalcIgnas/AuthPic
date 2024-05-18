type RootStackParamList = {
  Home: undefined;
  Lesson: undefined;
  LessonTwo: undefined;
  LessonThree: undefined;
  LessonFour: undefined;
  TestOne: undefined;
  TestTwo: undefined;
  LessonFive: undefined;
  LessonSix: undefined;
  LessonSeven: undefined;
  LessonEight: undefined;
  LessonNine: undefined;
  LessonTen: undefined;
  LessonEleven: undefined;
  TestThree: undefined;
  TestFour: undefined;
  Registration: undefined;
  Login: undefined;
};

type Direction = 'right' | 'left' | 'down' | 'up';

type Directions = {
  dirOne: Direction | null;
  dirTwo: Direction | null;
};

type Coord = {
  row: number;
  col: number;
};

type PictureCoord = {
  picOne: Coord | null;
  picTwo: Coord | null;
};

type Picture = {
  id: string;
  coord: Coord;
};
