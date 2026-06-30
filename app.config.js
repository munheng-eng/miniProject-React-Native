export default {
  "expo": {
    "name": "Track Money",
    "slug": "RN-onboarding-2-2API_Integration",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/logo.png",
    "scheme": "rnonboarding22apiintegration",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/logo.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.anonymous.rnonboarding2.apiintegration",
      "googleServicesFile": "./google-services.json",
      "config": {
        "googleMaps": {
          "apiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      },
      "permissions": [
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-camera",
        {
          "cameraPermission": "Give Track Money access to the camera to scan QR codes.",
          "microphonePermission": "Give Track Money access to the microphone."
        }
      ],
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ],
      [
        "expo-image-picker",
        {
          "cameraPermission": "Bro, the app need to access to camera to take phote.",
          "colors": {
            "cropToolbarColor": "#000000"
          },
          "dark": {
            "colors": {
              "cropToolbarColor": "#000000"
            }
          }
        }
      ],
      "expo-web-browser",
      [
        "@react-native-google-signin/google-signin",
        {
          "webClientId": process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
          "iosUrlScheme": "com.googleusercontent.apps.584536588788-7l68nhr22plr14ltjltmdcnk0chqcn14"
        }
      ],
      "expo-notifications",
      "@react-native-firebase/app",
      "@react-native-firebase/messaging"
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "83c1ec6a-6351-4cf8-a935-ff967eb60c28"
      }
    }
  }
}
