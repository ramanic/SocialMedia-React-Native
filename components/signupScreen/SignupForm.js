/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import * as Yup from 'yup';
import Validator from 'email-validator';
import {db, firebase} from './../../config/firebase';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const SignupForm = ({navigation}) => {
  const onSignUp = async (email, username, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredential => {
        Alert.alert('Sign up Successful');
        navigation.push('LoginScreen');
        const user = userCredential.user;
        db.collection('users')
          .doc(user.email)
          .set({
            owner_uid: user.uid,
            username: username,
            profile_picture: await getRandomProfilePic(),
          });
      })
      .catch(e => {
        console.log(e.message);
        Alert.alert('Sign up failed');
      });
  };
  const getRandomProfilePic = async () => {
    const res = await fetch('https://randomuser.me/api/?lego&randomapi');
    const data = await res.json();
    return data.results[0].picture.large;
  };
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required.'),
    username: Yup.string()
      .required('A username is required.')
      .min(2, 'Username should be mimimum 2 charcter long.'),
    password: Yup.string()
      .required()
      .min(6, 'Password is atleast 8 characters long'),
  });
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', password: '', username: ''}}
        onSubmit={values => {
          onSignUp(values.email, values.username, values.password);
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View
              style={[
                styles.inputFields,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                autofocus={true}
                autoCorrect={false}
                placeholderTextColor="#444"
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputFields,
                {
                  borderColor:
                    values.username.length < 1 || values.username.length >= 2
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholder="Username"
                autoCapitalize="none"
                autofocus={true}
                autoCorrect={false}
                placeholderTextColor="#444"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>
            <View
              style={[
                styles.inputFields,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length >= 6
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholder="Password"
                autoCapitalize="none"
                autofocus={true}
                autoCorrect={false}
                placeholderTextColor="#444"
                textContentType="password"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>

            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={() => {
                handleSubmit();
              }}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Sign Up
              </Text>
            </Pressable>
            <View style={styles.loginContainer}>
              <Text>Already Have an Account? </Text>
              <TouchableOpacity
                onPress={async () => {
                  navigation.push('LoginScreen');
                }}>
                <Text style={{color: '#6bb0f5'}}>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
    marginHorizontal: 10,
  },
  inputFields: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    borderWidth: 1,
  },
  button: isValid => ({
    backgroundColor: isValid ? '#0096f6' : '#9acaf7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    borderRadius: 4,
  }),
  loginContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'center',
  },
});
