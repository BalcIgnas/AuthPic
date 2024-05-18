import React from 'react';
import WelcomingScreen from './android/app/screens/WelcomingScreen';
import LessonOne from './android/app/screens/lessons/LessonOne';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LessonTwo from './android/app/screens/lessons/LessonTwo';
import LessonThree from './android/app/screens/lessons/LessonThree';
import LessonFour from './android/app/screens/lessons/LessonFour';
import TestOne from './android/app/screens/testsInLessons/TestOne';
import TestTwo from './android/app/screens/testsInLessons/TestTwo';
import LessonFive from './android/app/screens/lessons/LessonFive';
import LessonSix from './android/app/screens/lessons/LessonSix';
import LessonSeven from './android/app/screens/lessons/LessonSeven';
import LessonEight from './android/app/screens/lessons/LessonEight';
import LessonNine from './android/app/screens/lessons/LessonNine';
import LessonTen from './android/app/screens/lessons/LessonTen';
import LessonEleven from './android/app/screens/lessons/LessonEleven';
import TestThree from './android/app/screens/testsInLessons/TestThree';
import TestFour from './android/app/screens/testsInLessons/TestFour';
import Registration from './android/app/screens/Registration';
import {ImageProvider} from './android/components/contexts/ImageContext';
import Login from './android/app/screens/Login';
import {GirdItemsProvider} from './android/components/contexts/GridItemsContext';
import {UserProvider} from './android/components/contexts/UserContext';

const Stack = createStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={WelcomingScreen} />
      <Stack.Screen name="Lesson" component={LessonOne} />
      <Stack.Screen name="LessonTwo" component={LessonTwo} />
      <Stack.Screen name="LessonThree" component={LessonThree} />
      <Stack.Screen name="LessonFour" component={LessonFour} />
      <Stack.Screen name="TestOne" component={TestOne} />
      <Stack.Screen name="TestTwo" component={TestTwo} />
      <Stack.Screen name="LessonFive" component={LessonFive} />
      <Stack.Screen name="LessonSix" component={LessonSix} />
      <Stack.Screen name="LessonSeven" component={LessonSeven} />
      <Stack.Screen name="LessonEight" component={LessonEight} />
      <Stack.Screen name="LessonNine" component={LessonNine} />
      <Stack.Screen name="LessonTen" component={LessonTen} />
      <Stack.Screen name="LessonEleven" component={LessonEleven} />
      <Stack.Screen name="TestThree" component={TestThree} />
      <Stack.Screen name="TestFour" component={TestFour} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <UserProvider>
      <ImageProvider>
        <GirdItemsProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </GirdItemsProvider>
      </ImageProvider>
    </UserProvider>
  );
}

export default App;
