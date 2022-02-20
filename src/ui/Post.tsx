import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../common/Colors';
import ThemedText from './ThemedText';

interface Props {
  title: string;
  author: string;
  content: string;
}

const Post: React.FC<Props | any> = ({props}: {props: Props}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.backgroundDarkDim
            : Colors.backgroundLight,
          shadowColor: isDarkMode ? Colors.shadowDark : Colors.shadowLight,
        },
      ]}>
      <ThemedText style={styles.titleText}>{props.title}</ThemedText>
      <ThemedText style={styles.authorText}>{props.author}</ThemedText>
      <ThemedText style={styles.contentText} numberOfLines={8}>
        {props.content}
      </ThemedText>
      <TouchableOpacity style={styles.readMore}>
        <Text
          style={[
            styles.readMoreText,
            {
              color: isDarkMode
                ? Colors.backgroundLightDim
                : Colors.backgroundDarkDim,
            },
          ]}>
          Read more
        </Text>
      </TouchableOpacity>
      <View style={styles.postActionsContainer}>
        <TouchableOpacity style={{marginHorizontal: 5}}>
          <Icons name={'heart'} size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icons name={'flag'} size={30} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: '6%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.4,
  },
  titleText: {
    fontSize: 20,
    marginBottom: 5,
  },
  authorText: {
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.6,
    marginBottom: 5,
  },
  contentText: {
    textAlign: 'justify',
    opacity: 0.8,
  },
  readMore: {
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  readMoreText: {
    fontWeight: 'bold',
  },
  postActionsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default Post;
