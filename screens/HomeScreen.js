import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './../components/home/Header';
import {Stories} from './../components/home/Stories';
import Post from '../components/home/Post';

import BottomNavs, {BottomIcons} from '../components/home/BottomNavs';
import {firebase, db} from '../config/firebase';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
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
  useEffect(() => {
    db.collectionGroup('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} currentUser={currentUser} />
        ))}
      </ScrollView>
      <BottomNavs icons={BottomIcons} currentUser={currentUser} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',

    flex: 1,
  },
});
export default HomeScreen;
