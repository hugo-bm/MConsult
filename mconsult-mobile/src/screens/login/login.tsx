import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./login.style";
import Button from "../../components/button/button";
import { logo } from "../../utils/constants/icons";
import { useContext, useState } from "react";
import api from "../../utils/constants/api";
import { AuthContext } from "../../utils/context/auth";


const Login = (props: {navigation: any}): React.JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  async function ExecuteLogin() {
    await auth.login({email, password});
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <View style={styles.containerInput}>
          <TextInput placeholder="E-mail" onChangeText={(t)=>setEmail(t)} style={styles.input} />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(t)=>setPassword(t)}
          />
        </View>
        <Button
          text="Acessar"
          outline={false}
          theme="primary"
          onPress={ExecuteLogin}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tenho conta. </Text>
        <TouchableOpacity onPress={()=>props.navigation.navigate("SignUp")}>
          <Text style={styles.Link}>Criar conta agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
