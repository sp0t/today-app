import { ImageSourcePropType } from 'react-native';
import { Routes } from '../routes/RouteName';

export interface BackgroundItem {
    topImage: ImageSourcePropType;
    bottomImage: ImageSourcePropType;
    activeCorner: 'learn' | 'invest' | 'trade' | 'send';
}


export type RootStackParamList = {
  [Routes.LOGIN]: undefined;
  [Routes.ONBOARDING]: undefined; 
  [Routes.MARKET]: undefined; 
};

  