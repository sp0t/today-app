import { StackActionType } from '@react-navigation/native';

import Routes from '../routes/RouteName';

export type NavigateProps = {
  (name: string, params?: unknown): void;
};

export type GenericNavigationProps = {
  navigate: NavigateProps;
  setOptions: (options: Partial<unknown>) => void;
  goBack: () => StackActionType;
  canGoBack: () => StackActionType;
};

