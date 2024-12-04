import { View, Text } from "react-native";
import styles from "./genericModal.style";
import Button from "../../components/button/button";
import { useNavigation } from "@react-navigation/native";

const ConfirmationModal = (
  props: {route: any}
): React.JSX.Element => {
    const navigation = useNavigation();
    const {title, content} = props.route.params
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.content}>{content}</View>
      <View>
        <Button text="Fechar Modal" outline={false} theme="danger" onPress={()=>navigation.goBack()}/>
      </View>
    </View>
  );
};

export default ConfirmationModal;
