import { Text, View } from "react-native";
import styles from "./frameProfile.style";

const FrameProfile = () => {
return <View style={styles.container}>
    <View style={styles.item}>
        <Text style={styles.title}>Nome</Text>
        <Text style={styles.text}>Fulano de Tal</Text>
    </View>
    <View style={styles.item}>
        <Text style={styles.title}>Data nascimento</Text>
        <Text style={styles.text}>20/20/1989</Text>
    </View>
    <View style={styles.item}>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.text}>Fulano@email.com</Text>
    </View>
    <View style={styles.item}>
        <Text style={styles.title}>Telefone</Text>
        <Text style={styles.text}>(99) 99999-9999</Text>
    </View>
</View>
};

export default FrameProfile;