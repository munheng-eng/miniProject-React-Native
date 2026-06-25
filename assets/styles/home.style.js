import { COLORS } from '../../constants/color'
import { StyleSheet } from 'react-native';

export const homeStyle = StyleSheet.create({
    bodyContainer: {
        position: 'relative',
    },

    floatingButtonContainer: {
        position: 'absolute',
        top: 5,
        right: 15,
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 100,
    }, 

    actionStyle: {
        color: COLORS.white,
        fontSize: 25,
    },
        
});