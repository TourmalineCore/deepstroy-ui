/* eslint-disable react/no-unstable-nested-components */
import {
  ChangeEvent, useContext, useEffect, useState,
} from "react";
import { Modal } from '@tourmalinecore/react-tc-modal';
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import moment from "moment";
import { toast } from 'react-toastify';
import Input from "../../components/Input/Input";
import PlanePageStateContext from "./state/PlanStateContext";
import Accordion from "./components/Accordion/Accordion";
import { api } from "../../common/api";

const RELOAD_INTERVAL_MS = 5000;

const initData = {
  codeTask: ``,
  nameTask: ``,
  completionPercentageTask: 0,
  dateStartTask: ``,
  dateEndTask: ``,
  dateStartContract: ``,
  dateEndContract: ``,
  statusExpertise: ``,
  expertise: ``,
};

const dataMock = [
  {
    step: `Монолитная плита`,
    dateEndContract: `2023-05-30 20:25:35.643809`,
    predictedEndDate: `2023-05-28 20:25:35.643809`,
  },
  {
    step: `Кровля`,
    dateEndContract: `2023-06-10 20:25:35.643809`,
    predictedEndDate: `2023-06-12 20:25:35.643809`,
  },
  {
    step: `Приемка`,
    dateEndContract: `2023-06-15 20:25:35.643809`,
    predictedEndDate: `2023-06-14 20:25:35.643809`,
  },
];

function PlanContext() {
  const planePageState = useContext(PlanePageStateContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [idProject, setIdProject] = useState<null | number>(null);
  const [result, setResult] = useState(``);

  const [modelResult, setModelResult] = useState<{
    step: string;
    dateEndContract: string;
    predictedEndDate: string; }[]>([]);

  const [commonData, setCommonData] = useState<{
    project: string;
    subProject: string;
    keyObject: string;
    keyPwa: string;
    shortName: string;
    dateDesired: string | Date;
  }>({
    project: ``,
    subProject: ``,
    keyObject: ``,
    keyPwa: ``,
    shortName: ``,
    dateDesired: new Date(),
  });

  const [stepData, setStepData] = useState<{
    codeTask: string | number;
    nameTask: string;
    completionPercentageTask: number;
    dateStartTask: string | Date;
    dateEndTask: string | Date;
    dateStartContract: string | Date;
    dateEndContract: string | Date;
    statusExpertise?: string | number;
    expertise?: string;
  }>(initData);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (idProject !== null) {
      interval = setInterval(async () => {
        // await getModeling(idProject!);
        getModeling();
      }, RELOAD_INTERVAL_MS);
    }

    return () => {
      // @ts-ignore
      clearInterval(interval);
    };
  }, [idProject]);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (idProject !== null) {
      interval = setInterval(async () => {
        await getResult();
      }, RELOAD_INTERVAL_MS);
    }

    return () => {
      // @ts-ignore
      clearInterval(interval);
    };
  }, [idProject]);

  return (
    <section className="plan">
      <h1>Планирование проекта</h1>

      <Input
        label="Программа строительства (obj_prg)"
        value={commonData.project}
        name="project"
        placeholder="Образование"
        invalid={isPost && commonData.project.length < 1}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setCommonData({
          ...commonData,
          project: event.target.value,
        })}
      />
      <Input
        label="Подпрограмма строительства (obj_subprg)"
        invalid={isPost && commonData.subProject.length < 1}
        value={commonData.subProject}
        placeholder="Дошкольные учреждения"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setCommonData({
          ...commonData,
          subProject: event.target.value,
        })}
      />
      <Input
        label="Id объекта (obj_key)"
        value={commonData.keyObject}
        invalid={isPost && commonData.keyObject.length < 1}
        placeholder="020-0684"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setCommonData({
          ...commonData,
          keyObject: event.target.value,
        })}
      />
      <Input
        label="Уникальный айди объекта (obj_pwa_key)"
        value={commonData.keyPwa}
        invalid={isPost && commonData.keyPwa.length < 1}
        placeholder="fea30a7e-2f12-ec11-972f-80d21df2d922"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setCommonData({
          ...commonData,
          keyPwa: event.target.value,
        })}
      />
      <Input
        label="Короткое название (obj_shortName)"
        value={commonData.shortName}
        invalid={isPost && commonData.shortName.length < 1}
        placeholder={`ДОУ на 125, ТПУ "Мневники"`}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setCommonData({
          ...commonData,
          shortName: event.target.value,
        })}
      />

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          margin: `20px 0`,
        }}
      >
        Добавить этап
      </button>

      {planePageState.allSteps.length !== 0 && (
        <ul style={{
          padding: 0,
          margin: 0,
          marginBottom: `20px`,
        }}
        >
          {planePageState.allSteps.map(({
            codeTask,
            nameTask,
            completionPercentageTask,
            dateStartTask,
            dateEndTask,
            dateStartContract,
            dateEndContract,
            expertise,
            statusExpertise,
          }) => (
            <Accordion
              key={nameTask}
              codeTask={codeTask}
              nameTask={nameTask}
              completionPercentageTask={completionPercentageTask}
              dateStartTask={dateStartTask}
              dateEndTask={dateEndTask}
              dateStartContract={dateStartContract}
              dateEndContract={dateEndContract}
              expertise={expertise}
              statusExpertise={statusExpertise}
            />
          ))}
        </ul>
      )}

      {planePageState.allSteps.length < 1 && isPost && (<div style={{ color: `#ff2020` }}>Нужно заполнить хотябы один этап</div>)}

      {isOpen && (
        <Modal
          title="Создание этапа"
          onClose={() => setIsOpen(false)}
          content={(
            <div>
              <Input
                label="Идентификатор вида задачи (Кодзадачи)"
                name="codeTask"
                invalid={isPost && stepData.codeTask.toString.length < 1}
                value={stepData.codeTask}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setStepData({
                  ...stepData,
                  codeTask: event.target.value,
                })}
              />
              <Input
                label="Название задачи"
                name="nameTask"
                placeholder="Планирование"
                invalid={isPost && stepData.nameTask.length < 1}
                value={stepData.nameTask}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setStepData({
                  ...stepData,
                  nameTask: event.target.value,
                })}
              />
              <Input
                label="Фактический процент завершения задачи"
                name="completionPercentageTask"
                type="number"
                invalid={isPost && stepData.completionPercentageTask < 0}
                value={stepData.completionPercentageTask}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setStepData({
                  ...stepData,
                  completionPercentageTask: Number(event.target.value),
                })}
              />

              <DatePicker
                selected={stepData.dateStartTask}
                local={ru}
                placeholder="dd.MM.yyyy"
                dateFormat="dd.MM.yyyy"
                customInput={(
                  <Input
                    label="Дата начала выполнения задачи"
                    invalid={isPost && stepData.dateStartTask.toString.length < 1}
                  />
                )}
                onChange={(date: Date) => {
                  setStepData({
                    ...stepData,
                    dateStartTask: date,
                  });
                }}
              />

              <DatePicker
                selected={stepData.dateEndTask}
                local={ru}
                dateFormat="dd.MM.yyyy"
                placeholder="dd.MM.yyyy"
                customInput={(
                  <Input
                    label="Дата конца выполнения задачи"
                    invalid={isPost && stepData.dateEndTask.toString.length < 1}
                  />
                )}
                onChange={(date: Date) => {
                  setStepData({
                    ...stepData,
                    dateEndTask: date,
                  });
                }}
              />

              <DatePicker
                placeholder="dd.MM.yyyy"
                selected={stepData.dateStartContract}
                local={ru}
                dateFormat="dd.MM.yyyy"
                customInput={(
                  <Input
                    label="Дата начала выполнения задачи согласно договору"
                    invalid={isPost && stepData.dateStartContract.toString.length < 1}
                  />
                )}
                onChange={(date: Date) => {
                  setStepData({
                    ...stepData,
                    dateStartContract: date,
                  });
                }}
              />

              <DatePicker
                className="plan-context__date-picker"
                selected={stepData.dateEndContract}
                local={ru}
                dateFormat="dd.MM.yyyy"
                customInput={(
                  <Input
                    label="Дата конца выполнения задачи согласно договору"
                    invalid={isPost && stepData.dateEndContract.toString.length < 1}
                  />
                )}
                onChange={(date: Date) => {
                  setStepData({
                    ...stepData,
                    dateEndContract: date,
                  });
                }}
              />
              <Input
                label="Статус по экспертизе"
                name="statusExpertise"
                invalid={isPost && stepData.statusExpertise!.toString.length < 1}
                value={stepData.statusExpertise}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setStepData({
                  ...stepData,
                  statusExpertise: event.target.value,
                })}
              />
              <Input
                label="Экспертиза"
                name="expertise"
                value={stepData.expertise}
                invalid={isPost && stepData.expertise!.toString.length < 1}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setStepData({
                  ...stepData,
                  expertise: event.target.value,
                })}
              />
            </div>
          )}
          showApply
          showCancel
          onCancel={() => {
            setIsOpen(false);
            setStepData(initData);
            setIsPost(false);
          }}
          cancelText="Отменить"
          applyText="Сохранить"
          onApply={() => {
            create();
          }}
          overlay
          maxWidth="1000px"
        />
      )}

      <div style={{
        display: `grid`,
        gridTemplateColumns: `160px 1fr`,
        alignItems: `center`,
      }}
      >
        <span>Желаемая дата:</span>
        <DatePicker
          selected={commonData.dateDesired}
          local={ru}
          dateFormat="dd.MM.yyyy"
          customInput={<Input invalid={isPost && commonData.dateDesired.toString.length > 1} />}
          onChange={(date: Date) => {
            setCommonData({
              ...commonData,
              dateDesired: date,
            });
          }}
        />
      </div>

      <button
        type="button"
        style={{
          margin: `0 auto`,
          display: `block`,
          marginTop: `20px`,
        }}
        onClick={() => {
          createPrediction();
        }}
      >
        Предсказать
      </button>

      {result && (
        <div style={{ marginTop: 10 }}>
          Дата конца проекта:
          {` `}
          <b>{result}</b>
        </div>
      )}

      {modelResult.length !== 0 && (<h3 style={{ marginTop: 10 }}>Результат моделирования</h3>)}

      {modelResult.length !== 0 && (
        <ClientTable
          tableId="analytics-salary-table"
          data={modelResult}
          order={{
            id: `numberStep`,
            desc: false,
          }}
          renderMobileTitle={(row: any) => row.original.step}
          enableTableStatePersistance
          maxStillMobileBreakpoint={800}
          actions={[]}
          columns={[
            {
              Header: `Этап`,
              accessor: `step`,
              disableFilters: true,
              disableSortBy: true,
            },
            {
              Header: `Дата конца по договору`,
              accessor: `dateEndContract`,
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: any) => (
                <div>{moment(row.original.dateEndContract).format(`DD-MM-YYYY`)}</div>
              ),
            },
            {
              Header: `Дата посчитанная моделью`,
              accessor: `predictedEndDate`,
              disableFilters: true,
              disableSortBy: true,
              Cell: ({ row }: any) => (
                <div style={{
                  color: moment(row.original.predictedEndDate).isBefore(row.original.dateEndContract) ? `green` : `red`,
                }}
                >
                  {moment(row.original.predictedEndDate).format(`DD-MM-YYYY`)}
                </div>
              ),
            },
          ]}
        />
      )}

    </section>
  );

  async function getModeling() {
    // const { data } = await api.post<{
    //   step: string;
    //   dateEndContract: string;
    //   predictedEndDate: string;
    // }[]>(`/modeling/results/${id}`);

    setModelResult(dataMock);
  }

  async function create() {
    if (stepData.dateStartTask.toString().length > 0
    && stepData.dateStartContract.toString().length > 0
    && stepData.dateEndContract.toString().length > 0
    && stepData.dateEndTask.toString().length > 0
    && stepData.codeTask.toString().length > 0
    && stepData.nameTask.length > 0
    && stepData.expertise!.length > 0
    && stepData.statusExpertise!.toString().length > 0
    ) {
      planePageState.addNewStep(stepData);
      setIsOpen(false);
      setStepData(initData);
      setIsPost(false);
    } else {
      setIsPost(true);
    }
  }

  async function createPrediction() {
    setIsPost(true);

    const obj = {
      ...commonData,
      dateDesired: moment(commonData.dateDesired).format(`YYYY-MM-DD`),
      steps: planePageState.allSteps.map((item) => ({
        ...item,
        dateStartTask: moment(item.dateStartTask).format(`YYYY-MM-DD`),
        dateEndTask: moment(item.dateEndTask).format(`YYYY-MM-DD`),
        dateStartContract: moment(item.dateStartContract).format(`YYYY-MM-DD`),
        dateEndContract: moment(item.dateEndContract).format(`YYYY-MM-DD`),
      })),
    };

    if (planePageState.allSteps.length > 0
      && commonData.dateDesired.toString().length > 0
    && commonData.keyObject.length > 0
    && commonData.keyPwa.length > 0
    && commonData.project.length > 0
    && commonData.shortName.length > 0
    && commonData.subProject.length > 0) {
      try {
        await api.post(`/modeling/add`, obj);

        setIdProject(0);
        setIsPost(false);
        toast.success(`Данные отправились на расчеты`);
        setCommonData({
          project: ``,
          subProject: ``,
          keyObject: ``,
          keyPwa: ``,
          shortName: ``,
          dateDesired: new Date(),
        });
        planePageState.refreshData();
      } catch {
        alert(`Error`);
        toast.error(`Есть проблемы с сервером, попробуйте еще раз, но чуть позже`);
      }
    }
  }

  async function getResult() {
    // const { data } = await api.get(`/modeling/result`);

    setResult(`16-06-23`);
  }
}

export default PlanContext;
