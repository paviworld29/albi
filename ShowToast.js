import Toast from 'react-native-root-toast';
export default function showToast(msg) {
    Toast.show(`${msg}`, {
        position: -80,
        duration: Toast.durations.LONG,
        animation: true,
        hideOnPress: true,
    });
}