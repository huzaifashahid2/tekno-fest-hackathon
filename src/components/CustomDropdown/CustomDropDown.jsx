import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../utils/color.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const screenHeight = Dimensions.get('window').height;
const DROPDOWN_MAX_HEIGHT = 200;
const DROPDOWN_ITEM_HEIGHT = 40;

const CustomDropdown = ({
  data,
  placeholder,
  onSelect,
  icon,
  iconType = 'MaterialIcons',
  iconColor = '#AAA',
  iconSize = 20,
  label,
  image,
  wrapper_style,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || placeholder || 'Select',
  );
  const [dropdownDirection, setDropdownDirection] = useState('down');
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [isOpen]);

  const handleSelect = item => {
    setSelectedValue(item);
    onSelect(item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, height, pageX, pageY) => {
        const spaceBelow = screenHeight - pageY - height;

        const estimatedDropdownHeight = Math.min(
          DROPDOWN_MAX_HEIGHT,
          data.length * DROPDOWN_ITEM_HEIGHT + 20,
        );

        if (
          spaceBelow < estimatedDropdownHeight &&
          pageY > estimatedDropdownHeight
        ) {
          setDropdownDirection('up');
        } else {
          setDropdownDirection('down');
        }

        setIsOpen(!isOpen);
      });
    } else {
      setIsOpen(!isOpen);
    }
  };

  const renderLeftIcon = () => {
    if (!icon && !image) return null;

    return (
      <View style={styles.leftIconWrapper}>
        {image ? (
          <Image source={image} style={styles.leftImage} resizeMode="contain" />
        ) : (
          (() => {
            const IconComponent =
              iconType === 'FontAwesome' ? FontAwesome : MaterialIcons;
            return (
              <IconComponent name={icon} size={iconSize} color={iconColor} />
            );
          })()
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, wrapper_style]} ref={containerRef}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Dropdown Button */}
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        {renderLeftIcon()}

        <Text
          style={[
            styles.selectedText,
            icon && styles.selectedTextWithIcon,
            selectedValue === placeholder || selectedValue === 'Select'
              ? styles.placeholderText
              : styles.selectedValueText,
          ]}
        >
          {selectedValue}
        </Text>

        <View style={styles.arrow_icons_wrapper}>
          <MaterialIcons
            name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            style={styles.arrow}
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            styles.dropdownOptions,
            dropdownDirection === 'up'
              ? styles.dropdownOptionsUp
              : styles.dropdownOptionsDown,
          ]}
        >
          <ScrollView
            nestedScrollEnabled
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedValue === item && styles.selectedOption,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    height: 60,
  },
  leftIconWrapper: {
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftImage: {
    width: 20,
    height: 20,
  },
  arrow_icons_wrapper: {
    width: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    fontSize: 14,
    flex: 1,
  },
  selectedTextWithIcon: {
    marginLeft: 0,
  },
  placeholderText: {
    color: '#AAA',
  },
  selectedValueText: {
    color: '#000',
  },
  arrow: {
    fontSize: 20,
    color: '#AAA',
  },
  dropdownOptions: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 10,
    paddingVertical: 5,
    maxHeight: DROPDOWN_MAX_HEIGHT,
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownOptionsDown: {
    top: 45,
    marginTop: 45,
  },
  dropdownOptionsUp: {
    bottom: 55,
    marginBottom: 5,
  },
  scrollView: {
    maxHeight: DROPDOWN_MAX_HEIGHT,
  },
  scrollViewContent: {
    paddingVertical: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 12,
    color: '#000',
  },
  selectedOption: {
    backgroundColor: '#E0E0E0',
  },
});

export default CustomDropdown;
