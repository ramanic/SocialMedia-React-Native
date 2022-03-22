/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import React from 'react';
import LoginForm from '../components/loginScreen/LoginForm';
import SignupForm from '../components/signupScreen/SignupForm';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{width: 100, height: 100}}
          source={{
            uri: 'https://www.pngmart.com/files/13/Instagram-Logo-PNG-Free-Download-1.png',
          }}
        />
      </View>
      <SignupForm navigation={navigation} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
});
