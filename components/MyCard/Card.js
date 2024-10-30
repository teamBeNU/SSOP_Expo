import FlipCard from 'react-native-flip-card';
import { CardBack } from './CardBack';
import { CardFront } from './CardFront';

export const Card = ({cardData, onVerticalScrollStart, onVerticalScrollEnd}) => {
    return (
        <FlipCard
            friction={6}
            perspective={1000}
            flipHorizontal
            flipVertical={false}
            flip={false}
            clickable={true}
            // onFlipEnd={(isFlipped) => console.log('isFlipped', isFlipped)}
        >
        <CardFront cardData={cardData} />
        <CardBack 
            cardData={cardData}
            onVerticalScrollStart={onVerticalScrollStart}
            onVerticalScrollEnd={onVerticalScrollEnd} /> 
        </FlipCard>
    );
};

