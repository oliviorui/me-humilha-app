import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { notificationMessages } from "./notificationMessages";

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    if (!Device.isDevice) {
      return false;
    }

    const existingPermissions = await Notifications.getPermissionsAsync();
    let finalStatus = existingPermissions.status;

    if (finalStatus !== "granted") {
      const requestedPermissions =
        await Notifications.requestPermissionsAsync();
      finalStatus = requestedPermissions.status;
    }

    return finalStatus === "granted";
  } catch {
    return false;
  }
}

export function getRandomNotificationMessage(): string {
  const randomIndex = Math.floor(Math.random() * notificationMessages.length);
  return notificationMessages[randomIndex];
}

export async function scheduleDailyNotification(): Promise<boolean> {
  try {
    // 🚨 proteção para Expo Go
    const isExpoGo =
      typeof (global as unknown as { ExpoGo?: boolean }).ExpoGo !== "undefined";

    if (isExpoGo) {
      return false;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Me Humilha",
        body: getRandomNotificationMessage(),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 8,
        minute: 0,
      },
    });

    return true;
  } catch {
    return false;
  }
}
