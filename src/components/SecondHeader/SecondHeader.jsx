// components/CustomHeader/CustomHeaders.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/color';

const SecondHeader = ({ title, subTitle, description, onBack, extrastyle }) => {
  return (
    <View style={[styles.headerWrapper, extrastyle]}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>

        {!subTitle && <Text style={styles.headerTitle}>{title}</Text>}

        <View style={styles.rightSpace} />
      </View>

      {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}

      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </View>
  );
};

export default SecondHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: colors.white,
    marginTop: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
  },
  rightSpace: {
    width: 40,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'left',
    color: colors.black,
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    marginVertical: 4,
    textAlign: 'left',
    color: colors.description,
  },
});
