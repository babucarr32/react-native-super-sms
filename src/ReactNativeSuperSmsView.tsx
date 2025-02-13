import { requireNativeView } from 'expo';
import * as React from 'react';

import { ReactNativeSuperSmsViewProps } from './ReactNativeSuperSms.types';

const NativeView: React.ComponentType<ReactNativeSuperSmsViewProps> =
  requireNativeView('ReactNativeSuperSms');

export default function ReactNativeSuperSmsView(props: ReactNativeSuperSmsViewProps) {
  return <NativeView {...props} />;
}
