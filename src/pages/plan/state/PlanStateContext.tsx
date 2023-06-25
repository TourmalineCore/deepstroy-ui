import { createContext } from "react";
import PlanState from "./PlanState";

const PlanePageStateContext = createContext<PlanState>(null as unknown as PlanState);

export default PlanePageStateContext;
