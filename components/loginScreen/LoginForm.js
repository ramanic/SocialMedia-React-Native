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
import React from 'react';
import * as Yup from 'yup';
import Validator from 'email-validator';
import {firebase} from './../../config/firebase';

const LoginForm = ({navigation}) => {
  const onLogin = async (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Firebase Login Success');
        })
        .catch(e => {
          Alert.alert('Inavlid username or password');
        });
    } catch (e) {}
  };
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required.'),
    password: Yup.string()
      .required()
      .min(6, 'Password is atleast 8 characters long'),
  });
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          onLogin(values.email, values.password);
        }}
        validationSchema={loginFormSchema}
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
            <View style={{alignItems: 'flex-end', marginBottom: 30}}>
              <Text style={{color: '#6bb0f5'}}>Forgor Password?</Text>
            </View>

            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={() => {
                handleSubmit();
              }}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Log In
              </Text>
            </Pressable>
            <View style={styles.signUpContainer}>
              <Text>Don't Have an Account? </Text>
              <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
                <Text style={{color: '#6bb0f5'}}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

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
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'center',
  },
});
