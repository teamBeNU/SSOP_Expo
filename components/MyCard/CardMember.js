import FlipCard from 'react-native-flip-card';
import { CardBackMember } from './CardBackMember';
import { CardFrontMember } from './CardFrontMember';

export const CardMember = ({cardData}) => {
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
        <CardFrontMember cardData={cardData} />
        <CardBackMember cardData={cardData} /> 
        </FlipCard>
    );
};

