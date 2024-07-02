import { IPassedComponets, IlikedComponents, LikedMeComponets } from "./ILikedComponent";

export const MatchComponent = ({ components}) => {
    switch (components) {
        case 0:
            return (
                <IlikedComponents />
            );
        case 1:
            return (
                <IPassedComponets />

            );
        case 2:
            return (
                <LikedMeComponets />

            );
    }
}