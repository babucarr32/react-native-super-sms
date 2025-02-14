import { Button, PermissionsAndroid, SafeAreaView } from "react-native";
import ReactNativeSuperSms from "react-native-super-sms";

export default function App() {
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

  const sendSms = async () => {
    console.log("Requesting...")
    const isPreviledgeResult = await requestReadPrivilege();
    const canSendSMS = await requestSmsPermission();
    console.log({isPreviledgeResult, canSendSMS})

    if (isPreviledgeResult && canSendSMS) {
      const PHONE_NUMBER = "+2203626260";
      const MESSAGE = "Hello world";
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
      <Button title="Send sms" onPress={sendSms} />
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
};
