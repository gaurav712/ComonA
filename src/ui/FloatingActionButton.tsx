import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../common/Colors';
import ThemedTextInput from './ThemedTextInput';

interface Props {
  enableCreatePostPopUp: boolean;
  setEnableCreatePostPopUp: (arg0: boolean) => void;
}

const windowDimensions = Dimensions.get('window');

const FloatingActionButton: React.FC<Props> = (props: Props) => {
  const {enableCreatePostPopUp, setEnableCreatePostPopUp} = props;

  const isDarkMode = useColorScheme() === 'dark';

  const [keyboardActive, setKeyboardActive] = useState<boolean>(false);
  const [margin, setMargin] = useState<number>(0);

  /* Animation Values */
  const createPostPopupAnimatedWidth = useRef(new Animated.Value(0)).current;
  const createPostPopupAnimatedHeight = useRef(new Animated.Value(0)).current;
  const createPostPopupAnimatedXOffset = useRef(
    new Animated.Value(windowDimensions.width / 2),
  ).current;
  const createPostPopupAnimatedYOffset = useRef(
    new Animated.Value(windowDimensions.height / 2),
  ).current;
  const createPostPopupAnimatedOpacity = useRef(new Animated.Value(0)).current;

  const buttonColors = {
    backgroundColor: isDarkMode ? 'grey' : Colors.backgroundLight,
    shadowColor: enableCreatePostPopUp
      ? 'transparent'
      : isDarkMode
      ? Colors.shadowDark
      : Colors.shadowLight,
  };

  const handleCreatePost = () => {
    setEnableCreatePostPopUp(true);
    Animated.parallel([
      Animated.spring(createPostPopupAnimatedWidth, {
        toValue: windowDimensions.width * 0.8,
        useNativeDriver: false,
      }),
      Animated.spring(createPostPopupAnimatedHeight, {
        toValue: windowDimensions.height * 0.75 - margin,
        useNativeDriver: false,
      }),
      Animated.spring(createPostPopupAnimatedXOffset, {
        toValue: (windowDimensions.width - windowDimensions.width * 0.8) / 2,
        useNativeDriver: false,
      }),
      Animated.spring(createPostPopupAnimatedYOffset, {
        toValue:
          (windowDimensions.height -
            (windowDimensions.height * 0.75 - margin)) /
          2,
        useNativeDriver: false,
      }),
      Animated.timing(createPostPopupAnimatedOpacity, {
        toValue: 1,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setMargin(e.endCoordinates.height);
      setKeyboardActive(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setMargin(0);
      setKeyboardActive(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      <View
        style={[styles.container, {opacity: enableCreatePostPopUp ? 0.1 : 1}]}
        pointerEvents={enableCreatePostPopUp ? 'none' : 'auto'}>
        <TouchableOpacity
          style={[styles.floatingButton, {...buttonColors}]}
          onPress={() => {
            console.log('hey there');
          }}>
          <Icons
            style={styles.floatingButtonIcon}
            name="menu"
            size={windowDimensions.width * 0.075}
            color={
              isDarkMode ? Colors.foregroundDark : Colors.backgroundDarkDim
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.floatingButton, {...buttonColors}]}
          onPress={handleCreatePost}>
          <Icons
            style={styles.floatingButtonIcon}
            name="pencil"
            size={windowDimensions.width * 0.075}
            color={
              isDarkMode ? Colors.foregroundDark : Colors.backgroundDarkDim
            }
          />
        </TouchableOpacity>
      </View>
      {enableCreatePostPopUp && (
        <TouchableWithoutFeedback
          onPress={e => {
            const {pageX, pageY} = e.nativeEvent;
            const bounds = {
              x: (windowDimensions.width - windowDimensions.width * 0.8) / 2,
              y:
                (windowDimensions.height -
                  (windowDimensions.height * 0.75 - margin)) /
                2,
            };
            if (
              pageX < bounds.x ||
              pageX > bounds.x + windowDimensions.width * 0.8 ||
              pageY < bounds.y ||
              pageY >
                windowDimensions.height * 0.75 -
                  margin +
                  (keyboardActive ? 0 : bounds.y)
            ) {
              /* Touch event detected out of the bounds of popup */
              Animated.parallel([
                Animated.timing(createPostPopupAnimatedWidth, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: false,
                }),
                Animated.timing(createPostPopupAnimatedHeight, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: false,
                }),
                Animated.timing(createPostPopupAnimatedXOffset, {
                  toValue: windowDimensions.width / 2,
                  duration: 200,
                  useNativeDriver: false,
                }),
                Animated.timing(createPostPopupAnimatedYOffset, {
                  toValue: (windowDimensions.height - margin) / 2,
                  duration: 200,
                  useNativeDriver: false,
                }),
                Animated.timing(createPostPopupAnimatedOpacity, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: false,
                }),
              ]).start(() => setEnableCreatePostPopUp(false));

              //setEnableCreatePostPopUp(false);
            }
          }}>
          <View style={styles.createPostOverlayWrapper}>
            <Animated.View
              style={[
                styles.createPostOverlay,
                {
                  height: keyboardActive
                    ? windowDimensions.height * 0.75 - margin
                    : createPostPopupAnimatedHeight,
                  width: createPostPopupAnimatedWidth,
                  left: createPostPopupAnimatedXOffset,
                  top: createPostPopupAnimatedYOffset,
                  opacity: createPostPopupAnimatedOpacity,
                  backgroundColor: isDarkMode
                    ? Colors.backgroundDarkDim
                    : Colors.backgroundLight,
                  shadowColor: isDarkMode
                    ? Colors.shadowDark
                    : Colors.shadowLight,
                },
              ]}>
              <ScrollView>
                <ThemedTextInput placeholder="Enter Text..." />
                <ThemedTextInput placeholder="Enter Text..." />
                <ThemedTextInput placeholder="Enter Text..." />
                <ThemedTextInput placeholder="Enter Text..." />
              </ScrollView>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: windowDimensions.height * 0.025,
  },
  floatingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowDimensions.width * 0.15,
    height: windowDimensions.width * 0.15,
    borderRadius: windowDimensions.width * 0.1,
    marginHorizontal: windowDimensions.width * 0.05,
    marginVertical: windowDimensions.height * 0.0125,
    elevation: 10,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.4,
  },
  floatingButtonIcon: {
    textShadowOffset: {width: 0, height: 1.5},
    textShadowColor: 'black',
    textShadowRadius: 2,
  },
  createPostOverlay: {
    position: 'absolute',
    elevation: 10,
    borderRadius: 10,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.4,
  },
  createPostOverlayWrapper: {
    position: 'absolute',
    width: windowDimensions.width,
    height: windowDimensions.height,
  },
});

export default FloatingActionButton;
