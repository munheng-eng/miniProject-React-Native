import { Label } from '@react-navigation/elements';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { login } from '../../api/apiServiceAuth';
import { inputForm } from '../../assets/styles/inputForm.style';
import { IMAGES } from "../../constants/image";
import { COLORS } from '../../constants/color'
import { globalStyle } from '../../assets/styles/global.style';

const LoginScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState('great@example.com');
    const [password, setPassword] = useState('password123');

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Required Fields", "Please fill in your email and password.");
            return;
        }
        try {
            const loginData = {
                email: email.trim(),
                password: password
            };
            await login(loginData);

            Alert.alert(
                'Success! Welcome Back',
            );

            router.replace("/(tabs)/home");
        } catch (error) {
            Alert.alert('Error', 'Failed to login or fetch data.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={inputForm.layout}>
                <View style={inputForm.headerTitle}>
                    <Image source={IMAGES.logo} style={inputForm.image} resizeMode='contain' />
                </View>
                <View>
                    <Text style={inputForm.middleText}>Login To Your Account</Text>
                    <View style={inputForm.inputField}>
                        <Label style={inputForm.inputFieldLabel}>Email</Label>
                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            placeholderTextColor={COLORS.faded}
                            style={inputForm.inputFieldContainer}
                        />
                    </View>
                    <View style={inputForm.inputField}>
                        <Label style={inputForm.inputFieldLabel}>Password</Label>
                        <TextInput
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholderTextColor={COLORS.faded}
                            keyboardType="password"
                            style={inputForm.inputFieldContainer}
                        />
                    </View>
                    <TouchableOpacity onPress={handleLogin}>
                        <View style={inputForm.authButton}>
                            <Text style={inputForm.authButtonText}>L O G I N</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={inputForm.bottomTitle}>
                    <Text style={inputForm.bottomText}>Or Sign In With</Text>
                    <View style={inputForm.imageList}>
                        <Image source={IMAGES.google_icon} style={inputForm.imageLogo} resizeMode='contain' />
                        <Image source={IMAGES.apple_icon} style={inputForm.imageLogo} resizeMode='contain' />
                    </View>
                    <Text style={inputForm.bottomText}>Don't have an account.
                        <Text onPress={() => router.push('./RegisterScreen')} style={inputForm.navigationLink}> Sign Up!</Text>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen