import { Text, View } from "react-native";
import styles from "./frameProfile.style";
import api from "../../utils/constants/api";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/button";
import { AuthContext } from "../../utils/context/auth";

type userProfile = {
  name: string;
  birthDate: Date;
  email: string;
  mobile: string;
};

const FrameProfile = () => {
  const [user, setUser] = useState<userProfile>();

  const {logout} = useContext(AuthContext);

  async function getUserInfo() {
    const resp = await api.get("/user");
    const { name, birth_date, email, phone } = resp.data.data;
    setUser({
      name,
      birthDate: new Date(birth_date),
      email: email.value,
      mobile: phone,
    });
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.item}>
            <Text style={styles.title}>Nome</Text>
            <Text style={styles.text}>{user ? user.name : ""}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Data nascimento</Text>
            <Text style={styles.text}>
              {user
                ? new Intl.DateTimeFormat("pt-BR").format(user.birthDate)
                : ""}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>E,mail</Text>
            <Text style={styles.text}>{user ? user.email : ""}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Telefone</Text>
            <Text style={styles.text}>{user ? user.mobile : ""}</Text>
          </View>
          <View style={styles.item}>
            <Button text={"Sair"} outline={false} theme={"danger"} onPress={()=>logout()}/>
          </View>
        </>
      ) : (
        <Text>Perfil não encontrado</Text>
      )}
    </View>
  );
};

export default FrameProfile;
