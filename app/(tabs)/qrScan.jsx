import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Linking, AppState, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { COLORS } from '../../constants/color';
import { Ionicons } from "@expo/vector-icons";
import { globalStyle } from '../../assets/styles/global.style';
import { qrScanStyle } from '../../assets/styles/qrScan.style';

const qrScan = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (nextAppState === 'active' && requestPermission) {
                await requestPermission();
            }
        });
        return () => subscription.remove();
    }, [requestPermission]);

    const handleBarcodeScanned = async ({ type, data }) => {
        if (scanned) return;
        setScanned(true);
        const isUrl = data.startsWith('http://') || data.startsWith('https://');

        if (isUrl) {
            Alert.alert(
                "Link Detected",
                `Do you want to open this page in your browser?\n\n${data}`,
                [
                    { text: "Cancel", onPress: () => setScanned(false), style: "cancel" },
                    {
                        text: "Open Browser",
                        onPress: async () => {
                            try {
                                const supported = await Linking.canOpenURL(data);
                                if (supported) {
                                    await Linking.openURL(data);
                                } else {
                                    Alert.alert("Error", "Your phone cannot open this specific URL scheme.");
                                }
                            } catch (err) {
                                Alert.alert("Error", "An unexpected error occurred opening the link.");
                            } finally {
                                setScanned(false);
                            }
                        }
                    }
                ]
            );
        } else {
            Alert.alert(
                "Text Scanned",
                `Data content:\n${data}`,
                [{ text: "Scan Again", onPress: () => setScanned(false) }]
            );
        }
    };

    if (!permission) {
        return (
            <View style={qrScanStyle.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={qrScanStyle.center}>
                <Text style={qrScanStyle.infoText}>Camera permissions are required to use the QR scanner features.</Text>
                <TouchableOpacity style={qrScanStyle.permissionBtn} onPress={requestPermission}>
                    <Text style={qrScanStyle.btnText}>Enable Camera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={qrScanStyle.container}>
            <CameraView
                style={qrScanStyle.cameraViewFull}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />

            <View style={qrScanStyle.overlayContainer}>
                <View style={qrScanStyle.scanTargetBox} />
                <Text style={qrScanStyle.scanText}>Position the QR code inside the white window box frame</Text>
            </View>
        </View>
    );
}

export default qrScan
