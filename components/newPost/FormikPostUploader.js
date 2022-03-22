/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';
import {Formik} from 'formik';
import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import validUrl from 'valid-url';
import {db, firebase} from '../../config/firebase';
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required.'),
  caption: Yup.string()
    .max(2200, 'Caption must be less than 2,200 characters.')
    .required('A caption is required.'),
});

export default function FormikPostUploader({navigation}) {
  const [thumbnailURL, setThumbnailURL] = useState(
    'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=',
  );
  const [currentUser, setCurrentUser] = useState(null);
  const getUsername = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection('users')
      .where('owner_uid', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc => {
          setCurrentUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        }),
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUsername();
  }, []);

  const uploadPost = (image, caption) => {
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('posts')
      .add({
        imageUrl: image,
        user: currentUser.username,
        profilePicture: currentUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        liked_by_users: [],
        components: [],
      })
      .then(() => navigation.goBack());
    return unsubscribe;
  };

  return (
    <View>
      <Formik
        initialValues={{caption: '', imageUrl: ''}}
        onSubmit={value => {
          uploadPost(value.imageUrl, value.caption);
        }}
        validateOnMount={true}
        validationSchema={uploadPostSchema}>
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
              style={{
                margin: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Image
                source={{
                  uri: validUrl.isUri(thumbnailURL)
                    ? thumbnailURL
                    : 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=',
                }}
                style={{width: 100, height: 100}}
              />
              <View style={{flex: 1, marginLeft: 12}}>
                <TextInput
                  style={{color: 'white'}}
                  placeholder="Write a caption.."
                  fontSize={20}
                  placeholderTextColor="grey"
                  multiline={true}
                  onChangeText={handleChange('caption')}
                  onBlur={handleBlur('caption')}
                  value={values.caption}
                />
              </View>
            </View>

            <TextInput
              onChange={e => setThumbnailURL(e.nativeEvent.text)}
              style={{color: 'white'}}
              placeholder="Enter Image URL"
              placeholderTextColor="grey"
              onChangeText={handleChange('imageUrl')}
              onBlur={handleBlur('imageUrl')}
              value={values.imageUrl}
              fontSize={18}
            />
            {errors.imageUrl && (
              <Text style={{color: 'red', fontSize: 10}}>
                {errors.imageUrl}
              </Text>
            )}
            <Button
              onPress={() => {
                handleSubmit();
              }}
              title="Share"
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({});
