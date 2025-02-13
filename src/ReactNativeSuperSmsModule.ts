import { NativeModule, requireNativeModule } from 'expo';

import { ReactNativeSuperSmsModuleEvents } from './ReactNativeSuperSms.types';

declare class ReactNativeSuperSmsModule extends NativeModule<ReactNativeSuperSmsModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ReactNativeSuperSmsModule>('ReactNativeSuperSms');
