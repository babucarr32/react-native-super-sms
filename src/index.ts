// Reexport the native module. On web, it will be resolved to ReactNativeSuperSmsModule.web.ts
// and on native platforms to ReactNativeSuperSmsModule.ts
export { default } from './ReactNativeSuperSmsModule';
export { default as ReactNativeSuperSmsView } from './ReactNativeSuperSmsView';
export * from  './ReactNativeSuperSms.types';
