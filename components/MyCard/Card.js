import { View, Text, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardStyle';
import FlipCard from 'react-native-flip-card';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';


export const Card = () => {
    return (
        <FlipCard
            friction={6}
            perspective={1000}
            flipHorizontal
            flipVertical={false}
            flip={false}
            clickable
            // onFlipEnd={(isFlipped) => console.log('isFlipped', isFlipped)}
        >
        {/* Front of the card */}
        <CardFront />
        {/* Back of the card */}
        <CardBack /> 
        </FlipCard>
    );
};

