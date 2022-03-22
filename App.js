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

const App: () => Node = () => {
  return <AuthNavigation />;
};

export default App;
