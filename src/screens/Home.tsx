import React, {useState, useRef, Ref, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  useColorScheme,
  Keyboard,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';

import ThemedText from '../ui/ThemedText';
import Colors from '../common/Colors';
import {fetchPost} from '../utils/fetchPost';
import Post from '../ui/Post';
import FloatingActionButton from '../ui/FloatingActionButton';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestionActive, setSuggestionsActive] = useState<boolean>(false);
  const [posts, setPosts] = useState<Array<any> | undefined>([]);
  const [scrollViewTopOffset, setScrollViewTopOffset] = useState<number>(0);
  const [enableCreatePostPopUp, setEnableCreatePostPopUp] =
    useState<boolean>(false);

  const isDarkTheme = useColorScheme() === 'dark';

  useEffect(() => {
    fetchPost().then(data => {
      setPosts(data);
    });
  }, []);

  //useEffect(() => {
  //if (posts?.length !== 0) console.log('heyyy', posts);
  //}, [posts]);

  const handleSearchBoxLayout = (e: any) => {
    setScrollViewTopOffset(
      parseFloat(e.nativeEvent.layout.y) +
        parseFloat(e.nativeEvent.layout.height),
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchBoxContainer,
          {opacity: enableCreatePostPopUp ? 0.3 : 1},
        ]}
        pointerEvents={enableCreatePostPopUp ? 'none' : 'auto'}>
        <TextInput
          onLayout={handleSearchBoxLayout}
          placeholder="Type to find posts..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onFocus={() => setSuggestionsActive(true)}
          onBlur={() => setSuggestionsActive(false)}
          placeholderTextColor={
            isDarkTheme ? Colors.secondaryDark : Colors.secondaryLight
          }
          style={[
            styles.searchBox,
            {
              color: isDarkTheme
                ? Colors.foregroundDark
                : Colors.foregroundLight,
              backgroundColor: isDarkTheme
                ? Colors.backgroundDarkDim
                : Colors.backgroundLight,
              borderBottomLeftRadius: suggestionActive ? 0 : 20,
              borderBottomRightRadius: suggestionActive ? 0 : 20,
              shadowColor: enableCreatePostPopUp
                ? 'transparent'
                : isDarkTheme
                ? Colors.shadowDark
                : Colors.shadowLight,
            },
          ]}
        />
        {suggestionActive ? (
          <View
            style={[
              styles.suggestions,
              {
                backgroundColor: isDarkTheme
                  ? Colors.backgroundDarkDim
                  : Colors.backgroundLight,
                shadowColor: isDarkTheme
                  ? Colors.shadowDark
                  : Colors.shadowLight,
              },
            ]}>
            <ThemedText>This is the Popup</ThemedText>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View
        style={[
          {
            height: Dimensions.get('window').height - scrollViewTopOffset - 20,
          },
          {opacity: enableCreatePostPopUp ? 0.3 : 1},
        ]}
        pointerEvents={enableCreatePostPopUp ? 'none' : 'auto'}>
        <ScrollView
          style={[
            styles.postsContainer,
            {
              top: scrollViewTopOffset,
              opacity: suggestionActive || enableCreatePostPopUp ? 0.3 : 1,
            },
          ]}
          pointerEvents={enableCreatePostPopUp ? 'none' : 'auto'}
          showsVerticalScrollIndicator={false}>
          {posts?.map(item => (
            <Post key={item._id} props={item} />
          ))}
        </ScrollView>
      </View>
      <FloatingActionButton
        enableCreatePostPopUp={enableCreatePostPopUp}
        setEnableCreatePostPopUp={(value: boolean) =>
          setEnableCreatePostPopUp(value)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  searchBoxContainer: {
    position: 'absolute',
    zIndex: 1,
    top: StatusBar.currentHeight,
    left: '5%',
    width: '90%',
  },
  searchBox: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    elevation: 10,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.4,
  },
  suggestions: {
    justifyContent: 'center',
    height: '50%',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.4,
  },
  postsContainer: {
    marginVertical: 20,
  },
});

export default Home;
