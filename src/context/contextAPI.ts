import * as React from "react";

import { useGameReturnType } from "../hooks/useGame";

//
const contextAPI = React.createContext<useGameReturnType>(null);

export default contextAPI;
