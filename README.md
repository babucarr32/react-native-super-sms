# react-native-super-sms

The ultimate SMS API for your react native project.

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

Add the following permissions to your `app.json`

```.json
"android": {
  "permissions": [
    "android.permission.SEND_SMS",
    "android.permission.READ_PHONE_STATE"
  ]
}
```

### Request permission
```.tsx
  const [isPreviledgeResult, setIsPreviledgeResult] = useState(false);
  const [canSendSMS, setCanSendSMS] = useState(false);

  async function requestSmsPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: "Send SMS Permission",
        message: "This app needs access to send SMS messages.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  async function requestReadPrivilege() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: "Read phone state",
        message: "This app needs to access your phone state(SIM).",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  useEffect(() => {
    (async () => {
      setIsPreviledgeResult(await requestReadPrivilege());
      setCanSendSMS(await requestSmsPermission());
    })();
  }, []);
```

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

#### usage
```.tsx
const sendSms = async (subId: string) => {
  if (isPreviledgeResult && canSendSMS) {
    const PHONE_NUMBER = "+9991234567";
    const MESSAGE = `Your subscription ID is ${subId}`;
    const SIM_SLOT = 1;

    ReactNativeSuperSms.sendSMS(PHONE_NUMBER, MESSAGE, SIM_SLOT)
      .then((result) => {
        console.log({ result });
      })
      .catch((err) => {
        console.log({ err });
      });
  }
};
```

### Full sample
```.tsx
import { useEffect, useState } from "react";
import { Button, PermissionsAndroid, SafeAreaView } from "react-native";
import ReactNativeSuperSms from "react-native-super-sms";

export default function App() {
  const [isPreviledgeResult, setIsPreviledgeResult] = useState(false);
  const [canSendSMS, setCanSendSMS] = useState(false);

  async function requestSmsPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: "Send SMS Permission",
        message: "This app needs access to send SMS messages.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  async function requestReadPrivilege() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: "Read phone state",
        message: "This app needs access phone state(sim state).",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  useEffect(() => {
    (async () => {
      setIsPreviledgeResult(await requestReadPrivilege());
      setCanSendSMS(await requestSmsPermission());
    })();
  }, []);

  const sendSms = async (subId: string) => {
    if (isPreviledgeResult && canSendSMS) {
      const PHONE_NUMBER = "+9991234567";
      const MESSAGE = `Your subscription ID is ${subId}`;
      const SIM_SLOT = 1;

      ReactNativeSuperSms.sendSMS(PHONE_NUMBER, MESSAGE, SIM_SLOT)
        .then((result) => {
          console.log({ result });
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Send sms" onPress={() => sendSms('212345')} />
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
};
```

# Contributing

Contributions are very welcome!
