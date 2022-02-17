import React, {PropsWithChildren} from 'react';
import {StyleSheet, TextInput, useColorScheme} from 'react-native';

import Colors from '../common/Colors';

const ThemedTextInput: React.FC<{
  style?: PropsWithChildren<any>;
  numberOfLines?: number;
  placeholder?: string;
}> = ({style, numberOfLines, placeholder}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TextInput
      numberOfLines={numberOfLines}
      placeholder={placeholder}
      placeholderTextColor={
        isDarkMode ? Colors.secondaryLight : Colors.secondaryDark
      }
      style={[
        styles.container,
        {
          ...style,
          color: isDarkMode ? Colors.foregroundDark : Colors.foregroundLight,
          borderColor: isDarkMode
            ? Colors.secondaryDark
            : Colors.secondaryLight,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: 5,
    marginVertical: 20,
    marginHorizontal: '5%',
  },
});

export default ThemedTextInput;
