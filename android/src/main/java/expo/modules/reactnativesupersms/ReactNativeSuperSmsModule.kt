package expo.modules.reactnativesupersms

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.os.Build
import android.telephony.SmsManager
import androidx.core.content.ContextCompat
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

import android.app.Activity
import android.telephony.SubscriptionManager
import androidx.core.app.ActivityCompat
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.CodedException


data class SimCard (
  val slot: Int,
  val number: String = "",
  val carrier: String = "",
  val displayName: String = "",
  val countryCode: String = "",
  val subId: Int
)

class ReactNativeSuperSmsModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ReactNativeSuperSms')` in JavaScript.
    Name("ReactNativeSuperSms")

    AsyncFunction("sendSMS") { phoneNumber: String, message: String, simSlot: Int?, promise: Promise ->
      if (!isPermissionGranted(Manifest.permission.READ_PHONE_STATE)) {
        val exception = CodedException("PERMISSION_DENIED: Read phone state permission not granted")
        promise.reject(exception)
        return@AsyncFunction
      }
      try {
        val smsManager:SmsManager = if (Build.VERSION.SDK_INT>=23) {
          appContext.reactContext?.getSystemService(SmsManager::class.java)!!
        } else {
          SmsManager.getDefault()
        }

        val simInfo = getSimInfo()

        if (simSlot != null && simSlot > simInfo.size) {
          val exception = CodedException("Specified simSlot is more the available Sim cards.")
          promise.reject(exception)
          return@AsyncFunction
        }

        val simToUse: Int = if (simSlot !== null) {
          simSlot - 1
        } else {
          SubscriptionManager.getDefaultSmsSubscriptionId()
        }

        if (Build.VERSION.SDK_INT >= 31) {
          smsManager
            .createForSubscriptionId(simInfo[simToUse].subId)
            .sendTextMessage(phoneNumber, null, message, null, null)
        } else {
          val newSmsManager= SmsManager.getSmsManagerForSubscriptionId(simInfo[simToUse].subId)
          newSmsManager
            .sendTextMessage(phoneNumber, null, message, null, null)
        }
        promise.resolve(true)
      } catch (e: Exception) {
        val exception = CodedException(e)
        promise.reject(exception)
      }
    }
  }

  @SuppressLint("MissingPermission")
  fun getSimInfo(): MutableList<SimCard> {
    try {
      val context = appContext.reactContext!!
      val simInfo: MutableList<SimCard> = mutableListOf()

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        val subscriptionManager = context
          .getSystemService(SubscriptionManager::class.java)

        val activeSubscriptions = subscriptionManager?.activeSubscriptionInfoList

        if (activeSubscriptions.isNullOrEmpty()) {
          throw Exception("No SIM cards found")
        }

        for (subscription in activeSubscriptions) {
          simInfo.add(
            SimCard(
              slot = subscription.simSlotIndex,
              carrier = subscription.carrierName?.toString() ?: "",
              countryCode = subscription.countryIso,
              number = subscription.number,
              displayName = subscription.displayName?.toString() ?: "",
              subId = subscription.subscriptionId
            )
          )
        }
      }
      return simInfo
    } catch (e: Exception) {
      return mutableListOf()
    }
  }

  private fun isPermissionGranted (permission: String): Boolean {
    val result = ContextCompat.checkSelfPermission(
      appContext.reactContext!!,
      permission
    ) == PackageManager.PERMISSION_GRANTED
    return result
  }

  private fun askPermission() {
    val currentActivity = appContext.currentActivity
    val activity = currentActivity as Activity

    val permissions = arrayOf(
      Manifest.permission.CAMERA
    )
    ActivityCompat.requestPermissions(activity, permissions, 1235)
  }
}
