import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {firebase} from './../../config/firebase';

const Header = ({navigation}) => {
  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <Image style={styles.logo} source={require('../../assets/insta.png')} />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
          <Image
            style={styles.icons}
            source={require('../../assets/add.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icons}
            source={require('../../assets/heart.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            style={styles.icons}
            source={require('../../assets/message.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItem: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  iconsContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  icons: {
    width: 30,
    height: 30,
    marginLeft: 15,
    resizeMode: 'contain',
  },

  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 20,
    bottom: 30,
    width: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Header;
