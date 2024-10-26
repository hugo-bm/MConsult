import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./login.style";
import Button from "../../components/button/button";
import {logo} from "../../utils/constants/icons"

const Login = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={logo}
          style={styles.logo}
        />
      </View>
      <View>
        <View style={styles.containerInput}>
          <TextInput placeholder="E-mail" style={styles.input} />
        </View>
        <View style={styles.containerInput}>
          <TextInput placeholder="Senha" style={styles.input} secureTextEntry={true} />
        </View>
        <Button text="Acessar" outline={false} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tenho conta. </Text>
        <TouchableOpacity >
          <Text style={styles.Link}>Criar conta agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
