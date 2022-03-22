/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {USERS} from '../../data/users';
export const BottomIcons = [
  {
    name: 'Home',
    active: 'https://img.icons8.com/ios-filled/50/ffffff/home.png',
    inactive: 'https://img.icons8.com/ios/50/ffffff/home.png',
  },
  {
    name: 'Search',
    active: 'https://img.icons8.com/ios-filled/100/ffffff/search--v1.png',
    inactive: 'https://img.icons8.com/ios/100/ffffff/search--v1.png',
  },
  {
    name: 'Reels',
    active: 'https://img.icons8.com/ios-filled/100/ffffff/instagram-reel.png',
    inactive: 'https://img.icons8.com/ios/100/ffffff/instagram-reel.png',
  },
  {
    name: 'Shop',
    active:
      'https://img.icons8.com/fluency-systems-filled/96/ffffff/shop-two--v2.png',
    inactive:
      'https://img.icons8.com/fluency-systems-regular/96/ffffff/shop-two--v2.png',
  },
  {name: 'Profile', active: USERS[0].image, inactive: USERS[0].image},
];
export default function BottomNavs({icons, currentUser}) {
  const [activeTab, setActiveTab] = useState('Home');
  const Icon = ({icon}) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{uri: activeTab === icon.name ? icon.active : icon.inactive}}
        style={[
          styles.icon,
          icon.name === 'Profile' ? styles.profilePic(activeTab) : null,
        ]}
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          borderBottomColor: '#808080',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon
            key={index}
            icon={
              icon.name === 'Profile'
                ? {
                    ...icon,
                    active: currentUser?.profilePicture,
                    inactive: currentUser?.profilePicture,
                  }
                : icon
            }
          />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    bottom: '3%',
    zIndex: 999,
    backgroundColor: '#000000',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = '') => ({
    borderRadius: 50,
    borderColor: '#ffffff',
    borderWidth: activeTab === 'Profile' ? 3 : 0,
  }),
});
