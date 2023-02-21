import {
  TextInputProps,
  StyleSheet,
  TextInput,
  View,
  Text,
  Animated,
  TextStyle,
} from 'react-native';
import React, { useRef } from 'react';

interface Props extends TextInputProps {
  value: string;
  onChangeText: (value: string) => void;
  errorText?: string;
  stylePlaceholder?: TextStyle;
}

const CustomInput: React.FC<Props> = (props: Props) => {
  const {
    stylePlaceholder = {},
    value = '',
    onChangeText,
    errorText = '',
    style = {},
    placeholder = 'Placeholder',
    ...remainProps
  } = props;

  const TextAnimated = useRef(new Animated.Value(0)).current;

  const onFocus = () => {
    Animated.timing(TextAnimated, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    if (!value) {
      Animated.timing(TextAnimated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const styleAnimated = {
    top: TextAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [12, -10],
    }),
    left: TextAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 15],
    }),
    paddingHorizontal: TextAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 5],
    }),
    color: TextAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: ['gray', errorText ? 'red' : 'blue'],
    }),
  };

  const colorText = errorText ? 'red' : 'gray';

  return (
    <>
      <View style={[styles.container, { borderColor: colorText }]}>
        <TextInput
          style={[styles.textInputContainer, style]}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          {...remainProps}
        />
        <Animated.Text
          style={[styles.placeholder, stylePlaceholder, styleAnimated]}
        >
          {placeholder}
        </Animated.Text>
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  textInputContainer: {},
  placeholder: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: -1,
  },
  errorText: {
    color: 'red',
    paddingVertical: 5,
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
});
