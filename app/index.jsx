import { Text, View, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { globalStyle } from '../assets/styles/global.style'
import { onboardingStyle } from '../assets/styles/onboarding.style'
import { IMAGES } from "../constants/image";

export default function Index() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.replace("/(auth)/LoginScreen");
  };
  return (
    <View style={onboardingStyle.bodyContainer} >
      <Text style={onboardingStyle.onboardingTitleStyle}>Hello, What's Can I Help</Text>
      <Image source={IMAGES.onboardingImage} style={globalStyle.image} resizeMode='contain' />
      <TouchableOpacity style={globalStyle.button} onPress={handleGetStarted}>
        <Text style={globalStyle.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
