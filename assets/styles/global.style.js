import { COLORS } from '../../constants/color'
import { StyleSheet } from 'react-native';

export const globalStyle = StyleSheet.create({
    container: {
        padding: 15,
    },
    swipe: {
        flex: 1,
    },
    
    button: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 40,
        paddingVertical: 14,
        borderRadius: 30,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "600",
    },

    title: {
        fontSize: 25,
        color: COLORS.primary,
        paddingBottom: 10,
        fontWeight: 'bold',
    },

    subTitle: {
        fontSize: 15,
        color: COLORS.text,
        paddingBottom: 10,
    },

    image: {
        width: '90%',
        height: 300,
    },

    emptyText: {
        textAlign: 'center',
        padding: 20,
        color: COLORS.text,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    slideDeleteContainer: {
        backgroundColor: '#ff3b30',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: '80%',
        borderRadius: 8,
        marginTop: 5,
    },

    floatingButtonContainer: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 100,
    },

    actionStyle: {
        color: COLORS.white,
        fontSize: 30,
    },

    bodyFormContainer: {
        position: 'relative',
        padding: 15,
        flex: 1,
        paddingTop: 80,
    },

    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
    },

    backButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 50,
    },

    backButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});