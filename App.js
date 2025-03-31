import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import FS from '@fullstory/react-native';


export default function App() {
  FS.consent(true);
  return (
      <View fsClass={'fs-unmask-with-consent'} style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}><Text fsClass={'fs-unmask-with-consent'}>Hello world!</Text></View>
  );
}