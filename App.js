import React from 'react';
import type {Node} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';

import {HomeScreen} from './screens/HomeScreen';
import SignedInStack from './screens/Navigation';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AuthNavigation from './config/AuthNavigation';
import {NativeBaseProvider} from 'native-base';

const App: () => Node = () => {
  return (
    <NativeBaseProvider>
      <AuthNavigation />
    </NativeBaseProvider>
  );
};

export default App;
