import { COLORS } from '../../constants/color'
import { StyleSheet } from 'react-native';

export const inputForm = StyleSheet.create({
    layout: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        padding: 30,
    },

    authButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginVertical: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
    },

    authButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: 'bold',
    },

    image: {
        height: 100,
        width: 100,
    },

    imageRegister: {
        height: 100,
        width: 100,
        marginTop: 10,
        marginBottom: 40,
    },

    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.primary,
    },

    middleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
        paddingBottom: 20,
        textAlign: 'center',
    },

    inputFieldLabel: {
        fontSize: 15,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    
    inputField: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingBottom: 20,
        
    },

    inputFieldContainer: {
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 15,
        width: '100%',
    },

    bottomTitle: {
        borderTopColor: COLORS.textLight,
        borderTopWidth: 1,
    },

    bottomText: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 15,
    },

    imageLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    imageList: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        paddingBottom: 10,
    },

    multilineInput: {
        height: 150,   
        textAlignVertical: 'top',
        lineHeight: 22,
    },

    navigationLink: {
        fontWeight: 'bold',
    },

    halfInputFieldContainer: {
        flexDirection: 'row',
        gap: 10,
    },

    halfInputField: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingBottom: 20,
    },

});