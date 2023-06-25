import { useMemo } from "react";
import PlanState from "./state/PlanState";
import PlanePageStateContext from "./state/PlanStateContext";
import PlanContext from "./PlanContext";

function Plan() {
  const planPageState = useMemo(
    () => new PlanState(),
    [],
  );

  return (
    <PlanePageStateContext.Provider value={planPageState}>
      <PlanContext />
    </PlanePageStateContext.Provider>
  );
}

export default Plan;
