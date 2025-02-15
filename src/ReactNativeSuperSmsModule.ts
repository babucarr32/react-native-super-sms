import { NativeModule, requireNativeModule } from 'expo';

declare class ReactNativeSuperSmsModule {
  sendSMS (phoneNumber: string, message: string, simSlot?: number): Promise<any>
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ReactNativeSuperSmsModule>('ReactNativeSuperSms');
