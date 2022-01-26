import React, {PropsWithChildren} from 'react';
import {useColorScheme, Text} from 'react-native';

import Colors from '../common/Colors';

const ThemedText: React.FC<{
  style?: PropsWithChildren<any>;
  numberOfLines?: number;
  children: React.ReactNode;
}> = ({style, numberOfLines, children}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        color: isDarkMode ? Colors.foregroundDark : Colors.foregroundLight,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export default ThemedText;
