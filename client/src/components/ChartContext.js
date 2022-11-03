import React, { createContext, useReducer } from "react";

export const ChartContext = createContext();

const chartReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "REMOVE":
            let idx = state.indexOf((x) => x == action.payload);
            return state.splice(idx, 1);
    }
};

const initialState = [];

export function ChartProvider(props) {
    const [chart, dispatch] = useReducer(chartReducer, initialState);
    return (
        <ChartContext.Provider value={{ chart, dispatch }}>
            {props.children}
        </ChartContext.Provider>
    );
}
