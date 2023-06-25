import { makeAutoObservable } from "mobx";

type StepType = {
  codeTask: string | number;
  nameTask: string;
  completionPercentageTask: number;
  dateStartTask: string | Date;
  dateEndTask: string | Date;
  dateStartContract: string | Date;
  dateEndContract: string | Date;
  statusExpertise: string | number;
  expertise: string;
};

class PlanState {
  private _steps: StepType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get allSteps() {
    return this._steps;
  }

  addNewStep(obj: StepType) {
    this._steps.push(obj);
  }

  refreshData() {
    this._steps = [];
  }
}

export default PlanState;
