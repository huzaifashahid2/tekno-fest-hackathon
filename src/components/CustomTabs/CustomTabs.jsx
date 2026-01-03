import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';

const CustomTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTab === index && styles.activeTab]}
          onPress={() => onTabChange(index)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === index && styles.activeTabText,
            ]}
          >
            {tab}
          </Text>
          {activeTab === index && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    // gap: 10,
  },
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // Active tab styling
  },
  tabText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#999999',
    fontFamily: FONTS.display_regular,
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    fontFamily: FONTS.display_bold,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.black,
    borderRadius: 1,
  },
});
