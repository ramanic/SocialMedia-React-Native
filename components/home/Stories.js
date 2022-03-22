import {Text, View, ScrollView, Image, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {USERS} from '../../data/users';

export class Stories extends Component {
  render() {
    return (
      <View style={{marginBottom: 15}}>
        <ScrollView horizontal showHorizontalScrollIndicator={false}>
          {USERS.map(({user, image}, index) => (
            <View key={index} style={{alignItems: 'center'}}>
              <Image source={{uri: image}} style={styles.story} />
              <Text style={styles.text}>
                {user.length > 11 ? user.slice(0, 10) + '...' : user}
              </Text>
            </View>
          ))}
        </ScrollView>
        <Text>Stories</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 18,
    borderWidth: 3,
    borderColor: '#ff8501',
  },
  text: {
    color: 'white',
  },
});

export default Stories;
