import * as React from 'react';

import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomInput from 'react-native-input-library';

export default function App() {
  const [value, setvalue] = React.useState('');
  const [value1, setvalue1] = React.useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomInput value={value} onChangeText={setvalue} errorText="ks dks dk sd" />
        <CustomInput style={{marginTop: 20}} value={value1} onChangeText={setvalue1} type={1} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
