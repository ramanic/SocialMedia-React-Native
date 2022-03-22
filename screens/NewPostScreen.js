import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import AddNewPost from '../components/newPost/AddNewPost';

export default function NewPostScreen({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
}
