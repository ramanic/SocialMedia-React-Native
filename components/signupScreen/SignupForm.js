/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  Button,
  Input,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Alert,
} from 'native-base';
import {Formik} from 'formik';
import React, {useState} from 'react';
import * as Yup from 'yup';
import Validator from 'email-validator';
import {db, firebase} from './../../config/firebase';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const SignupForm = ({navigation}) => {
  const [alert, setAlert] = useState({show: false, type: 'success', text: ''});

  const onSignUp = async (email, username, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredential => {
        const user = userCredential.user;
        db.collection('users')
          .doc(user.email)
          .set({
            owner_uid: user.uid,
            username: username,
            profile_picture: await getRandomProfilePic(),
          })
          .then(() => {});
      })
      .catch(e => {
        console.log(e.message);
        setAlert({
          ...alert,
          show: true,
          type: 'danger',
          text: 'Singup Failed',
        });
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
              <Input
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
              <Input
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

export default SignupForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
    marginHorizontal: 10,
  },
  inputFields: {
    borderRadius: 4,

    backgroundColor: '#fafafa',
    marginBottom: 10,
    borderWidth: 2,
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
