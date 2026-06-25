import { COLORS } from '../../constants/color'
import { StyleSheet } from 'react-native';

export const fileStyle = StyleSheet.create({
    container: {
        marginVertical: 5,
        width: '100%',
    },

    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        borderRadius: 8,
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
    buttonText: {
        color: COLORS.primary,
        fontWeight: '600',
        marginLeft: 8,
    },
    fileNameText: {
        marginTop: 6,
        fontSize: 13,
        color: COLORS.faded,
        fontStyle: 'italic',
        paddingLeft: 4,
    },
    activeFileText: {
        color: '#2e7d32',
        fontWeight: '500',
    }
});