import { COLORS } from '../../constants/color'
import { StyleSheet } from 'react-native';

export const mapStyle = StyleSheet.create({
    mapContainer: {
        height: 300,
        width: '100%',
        position: 'relative',
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },

    map: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        overflow: 'hidden',
    },

    loaderOverlay: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: COLORS.card,
        padding: 8,
        borderRadius: 20,
    },

    locationDetailContainer: {
        paddingVertical: 30,
    },

    buttonRow: {
        flexDirection: 'row',
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#3498db',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    secondaryBtn: {
        backgroundColor: '#2ecc71',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});