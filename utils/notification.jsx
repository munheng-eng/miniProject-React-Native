import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export const requestAndGetFCMToken = async () => {
    try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log('Notification permissions were denied by user.');
            return null;
        }
        const token = await messaging().getToken(messaging().app);
        return token;
    } catch (err) {
        console.log('Notification setup initialization error:', err);
        return null;
    }
};

export const triggerLocalNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            sound: true,
        },
        trigger: null,
    });
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
}, messaging().app);