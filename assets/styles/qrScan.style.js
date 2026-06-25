import { COLORS } from '../../constants/color'
import { StyleSheet } from 'react-native';

export const qrScanStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.shadow,
    },
    cameraViewFull: {
        ...StyleSheet.absoluteFillObject,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    infoText: {
        textAlign: 'center',
        marginBottom: 16,
        color: COLORS.faded,
    },
    permissionBtn: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    btnText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', 
    },
    scanTargetBox: {
        width: 250,
        height: 250,
        borderWidth: 3,
        borderColor: COLORS.white,
        borderRadius: 16,
        backgroundColor: 'transparent',
    },
    scanText: {
        color: COLORS.white,
        marginTop: 24,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        paddingHorizontal: 20,
    }
});