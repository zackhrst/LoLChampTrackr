import {
    CREATE_CHAMPION,
    RETRIEVE_CHAMPIONS,
    UPDATE_CHAMPION,
    DELETE_CHAMPION,
    DELETE_ALL_CHAMPIONS,
} from "../actions/types";

const initialState = [];

function ChampionReducer(champions = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_CHAMPION:
            return [...champions, payload];
        
        case RETRIEVE_CHAMPIONS:
            return payload;

        case UPDATE_CHAMPION:
            return champions.map((champion) => {
                if (champion.id === payload.id) {
                    return {
                        ...champion,
                        ...payload,
                    };
                }   else {
                    return champion;
                }
            });

        case DELETE_CHAMPION:
            return champions.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_CHAMPIONS:
            return [];

        default:
            return champions;
    }
};

export default ChampionReducer;