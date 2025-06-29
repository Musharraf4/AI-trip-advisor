import { TourType, TourContextProps } from "@/interfaces";
import { TourAction, tourInitialState, tourReducer } from "@/reducers/TourReducer";
import { FC, ReactNode, Reducer, createContext, useReducer } from "react";

export const TourContext = createContext<TourContextProps>({
  state: tourInitialState,
  dispatch: () => {},
});

export const TourContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<TourType, TourAction>>(
    tourReducer,
    tourInitialState
  );

  return <TourContext.Provider value={{ state, dispatch }}>{children}</TourContext.Provider>;
};
