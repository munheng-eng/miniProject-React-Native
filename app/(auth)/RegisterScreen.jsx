import { Label } from '@react-navigation/elements';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView } from 'react-native';
import { login } from '../../api/apiServiceAuth';
import { inputForm } from '../../assets/styles/inputForm.style';
import { IMAGES } from "../../constants/image";
import { COLORS } from '../../constants/color'
import { globalStyle } from '../../assets/styles/global.style';
import { register } from '../../api/apiServiceAuth'

const RegisterScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        let errors = [];
        if (!name || !name.trim()) {
            error.push("- Name is required.");
        }

        if (!email || !email.trim()) {
            error.push("- Email is required.");
        }

        if (!password || !password.trim()) {
            error.push("- Password is required.");
        }

        if (password && password.length < 8) {
            errors.push("- Password must be at least 8 characters long.");
        }

        if (password !== confirmPassword) {
            errors.push("- Passwords do not match.");
        }

        if (errors.length > 0) {
            Alert.alert(
                "Validation Error",
                `Please fix the following problems:\n${errors.join("\n")}`
            );
            return;
        }

        const registerData = {
            name: name.trim(),
            email: email.trim(),
            password: password,
            password_confirmation: confirmPassword,
        };

        try {
            await register(registerData);

            Alert.alert(
                'Success Registration!',
            );

            router.replace("/(tabs)/home");

        } catch (error) {
            Alert.alert('Error', 'Failed to login or fetch data. Check console.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <ScrollView>
                    <View style={inputForm.layout}>
                        <View style={inputForm.headerTitle}>
                            <Image source={IMAGES.logo} style={inputForm.imageRegister} resizeMode='contain' />
                        </View>
                        <View>
                            <Text style={inputForm.middleText}>Register To Get Your Account</Text>
                            <View style={inputForm.inputField}>
                                <Label style={inputForm.inputFieldLabel}>Name</Label>
                                <TextInput
                                    placeholder="Enter your email"
                                    value={name}
                                    onChangeText={setName}
                                    placeholderTextColor={COLORS.faded}
                                    style={inputForm.inputFieldContainer}
                                />
                            </View>
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
                                    keyboardType="password"
                                    secureTextEntry={true}
                                    placeholderTextColor={COLORS.faded}
                                    style={inputForm.inputFieldContainer}
                                />
                            </View>
                            <View style={inputForm.inputField}>
                                <Label style={inputForm.inputFieldLabel}>Confirm Password</Label>
                                <TextInput
                                    placeholder="Enter your password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    keyboardType="password"
                                    secureTextEntry={true}
                                    placeholderTextColor={COLORS.faded}
                                    style={inputForm.inputFieldContainer}
                                />
                            </View>
                            <TouchableOpacity onPress={handleRegister}>
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
                            <Text style={inputForm.bottomText}>Have an account? Already?
                                <Text onPress={() => router.push('./LoginScreen')} style={inputForm.navigationLink}> Sign In!</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default RegisterScreen