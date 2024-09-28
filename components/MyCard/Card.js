import FlipCard from 'react-native-flip-card';
import { CardBack } from './CardBack';
import { CardFront } from './CardFront';


export const Card = ({cardData}) => {
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
        <CardFront cardData={cardData} />
        <CardBack cardData={cardData} /> 
        </FlipCard>
    );
};

