import { COLORS } from '../../constants/color'
import { StyleSheet } from 'react-native';

export const onboardingStyle = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    onboardingTitleStyle: {
        fontSize: 45,
        color: COLORS.primary,
        paddingBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});