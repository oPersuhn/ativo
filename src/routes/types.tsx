// types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  signin: undefined;
  signup: undefined;
  main: undefined;
  config: undefined;
  profile: undefined;
  new: undefined;
  report: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;
