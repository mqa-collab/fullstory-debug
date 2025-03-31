import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import FS from '@fullstory/react-native';


export default function App() {
  return (
      <View fsClass={'fs-unmask'} style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}><Text fsClass={'fs-unmask'}>Hello world!</Text></View>
  );
}