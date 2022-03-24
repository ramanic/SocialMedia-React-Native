/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Alert} from 'native-base';
import {Formik} from 'formik';
import React, {useState} from 'react';
import * as Yup from 'yup';
import Validator from 'email-validator';
import {firebase} from './../../config/firebase';
import {
  Button,
  Input,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
} from 'native-base';
const LoginForm = ({navigation}) => {
  const [alert, setAlert] = useState({show: false, type: 'success', text: ''});
  const onLogin = async (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Firebase Login Success');
        })
        .catch(e => {
          setAlert({
            ...alert,
            show: true,
            type: 'danger',
            text: 'Invalid Username or Passsord',
          });
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
            <View style={[styles.inputFields]}>
              <Input
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
            <View style={[styles.inputFields]}>
              <Input
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
      {alert.show ? (
        <Alert w="100%" status={alert.type} style={{marginTop: 30}}>
          <VStack space={2} flexShrink={1} w="100%" mt={2}>
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="0" />
                <Text fontSize="md" color="coolGray.800">
                  {alert.text}
                </Text>
              </HStack>
              <IconButton
                onPress={() =>
                  setAlert({show: false, type: 'success', text: ''})
                }
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
              />
            </HStack>
          </VStack>
        </Alert>
      ) : null}
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
