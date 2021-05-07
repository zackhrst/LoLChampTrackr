import {
    CREATE_CHAMPION,
    RETRIEVE_CHAMPIONS,
    UPDATE_CHAMPION,
    DELETE_CHAMPION,
    DELETE_ALL_CHAMPIONS
} from "./types";

import ChampionDataService from "../services/champion.service";

export const createChampion = (name, description) => async (dispatch) => {
    try {
        const res = await ChampionDataService.create({ name, description });

        dispatch({
            type: CREATE_CHAMPION,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    }   catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveChampions = () => async (dispatch) => {
    try {
        const res = await ChampionDataService.getAll();

        dispatch({
            type: RETRIEVE_CHAMPIONS,
            payload: res.data,
        });
    }   catch (err) {
        console.log(err);
    }
};

export const updateChampion = (id, data) => async (dispatch) => {
    try {
        const res = await ChampionDataService.update(id, data);

        dispatch({
            type: UPDATE_CHAMPION,
            payload: data,
        });

        return Promise.resolve(res.data);
    }   catch (err) {
        return Promise.reject(err);
    }
};

export const deleteChampion = (id) => async (dispatch) => {
    try {
        await ChampionDataService.delete(id);

        dispatch({
            type: DELETE_CHAMPION,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllChampions = () => async (dispatch) => {
    try {
        const res = await ChampionDataService.deleteAll();

        dispatch({
            type: DELETE_ALL_CHAMPIONS,
            payload: res.data,
        });    

        return Promise.resolve(res.data);
    }   catch (err) {
        return Promise.reject(err);
    }
};

export const findChampionsByName = (name) => async (dispatch) => {
    try {
        const res = await ChampionDataService.findByName(name);

        dispatch({
            type: RETRIEVE_CHAMPIONS,
            payload: res.data,
        });
    }   catch (err) {
        console.log(err);
    }
};