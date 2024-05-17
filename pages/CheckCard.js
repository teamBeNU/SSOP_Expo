import { View, Text } from "react-native";
import { theme  } from "../theme";
import { Card } from "../components/MyCard/Card";

function CheckCard() {
    return (
        <View>
            <Text style={{ color: theme.pink }}>CheckCard</Text>
           <Card />
        </View>
    );
  }
  export default CheckCard;