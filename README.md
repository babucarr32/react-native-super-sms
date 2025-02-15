# react-native-super-sms

The ultimate sms API for react native

# API documentation

### sendSMS
`sendSMS (phoneNumber: string, message: string, simSlot?: number): Promise<any>`

This is used for sending direct SMS.

#### Arguments
`phoneNumber` This the receipients phone number (`required`).

`message` This is the message to send (`required`).

`simSlot` This determines which sim slot to use. If not specified, it defaults to the devices default sim.

#### Return type
`Promise<any>`

- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/react-native-super-sms/)
- [Documentation for the main branch](https://docs.expo.dev/versions/unversioned/sdk/react-native-super-sms/)

# Installation in managed Expo projects

```
npx expo install react-native-super-sms
```
# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install react-native-super-sms
```

### Configure for Android




### Configure for iOS

Run `npx pod-install` after installing the npm package.

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
