import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';
import App from './src/App';

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App);
AppRegistry.registerComponent('modulo6expo', () => App);
