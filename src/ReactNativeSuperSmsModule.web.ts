import { registerWebModule, NativeModule } from 'expo';

import { ReactNativeSuperSmsModuleEvents } from './ReactNativeSuperSms.types';

class ReactNativeSuperSmsModule extends NativeModule<ReactNativeSuperSmsModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ReactNativeSuperSmsModule);
