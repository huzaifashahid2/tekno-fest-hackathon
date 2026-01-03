import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';
import bell from '../../assets/icons/bellIcon.png';
import filter from '../../assets/icons/filter.png';
import edit from '../../assets/icons/edit.png';
import menu from '../../assets/icons/newIcon/menu.png';

const Header = ({
  leftIcon,
  onLeftPress,
  title,
  rightIcon,
  onRightPress,
  leftImage,
  styleTitle,
  bellIcon,
  filterIcon,
  editIcon,
  onRightSecondPress,
  bgColorMain = '#fff',
}) => {
  return (
    <View style={[styles.headerContainer, { backgroundColor: bgColorMain }]}>
      {/* Left Icon */}
      <TouchableOpacity onPress={onLeftPress} style={styles.iconContainer}>
        <Text>
          {leftIcon && <Icon name={leftIcon} size={25} color={'#000'} />}
          {leftImage && (
            <Image
              source={leftImage}
              style={{ width: 80, height: 30, resizeMode: 'contain' }}
            />
          )}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.headerTitle, { styleTitle }]}>{title}</Text>

      <View style={styles.iconContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          {bellIcon ? (
            <TouchableOpacity onPress={onRightPress}>
              <Image
                style={{ width: 25, height: 25, objectFit: 'contain' }}
                source={bell}
              />
            </TouchableOpacity>
          ) : (
            rightIcon
          )}
          {filterIcon && (
            <TouchableOpacity onPress={onRightSecondPress}>
              <Image
                style={{ width: 25, height: 25, objectFit: 'contain' }}
                source={filter}
              />
            </TouchableOpacity>
          )}
          {editIcon && (
            <TouchableOpacity onPress={onRightSecondPress}>
              <Image
                style={{ width: 25, height: 25, objectFit: 'contain' }}
                source={edit}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconContainer: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.black,
    fontFamily: FONTS.display_bold,
    width: '60%',
    textAlign: 'center',
  },
});

export default Header;
