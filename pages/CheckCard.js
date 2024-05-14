import { View, Text } from "react-native";
import { theme  } from "../theme";
import { MyCard } from "../components/MyCard/MyCard";

function CheckCard() {
    return (
        <View>
            <Text style={{ color: theme.pink }}>CheckCard</Text>
           <MyCard />
        </View>
    );
  }
  export default CheckCard;