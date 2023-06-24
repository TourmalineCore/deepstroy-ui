import { ClientTable } from '@tourmalinecore/react-table-responsive';

const steps = [
  {
    numberStep: `1`,
    name: `Предпроектные работы`,
  },
  {
    numberStep: `1.4.2`,
    name: `Заключение ДАЗУ на период строительства`,
  },
  {
    numberStep: `3`,
    name: `Проектно-изыскательские работы`,
  },
  {
    numberStep: `3.1`,
    name: `Задание на проектирование`,
  },
  {
    numberStep: `3.3`,
    name: `Разработка и согласование АПР`,
  },
  {
    numberStep: `3.8`,
    name: `Утверждение перечня ТХ в ДОНМ`,
  },
  {
    numberStep: `3.11`,
    name: `Разработка проектно-сметной документации (Стадия П)`,
  },
  {
    numberStep: `3.13`,
    name: `Экспертиза проекта`,
  },
  {
    numberStep: `3.15`,
    name: `Разработка Рабочей документации`,
  },
  {
    numberStep: `4`,
    name: `Строительно-монтажные работы`,
  },
  {
    numberStep: `4.1.1`,
    name: `Разрешение на строительство`,
  },
  {
    numberStep: `4.2`,
    name: `Подготовительные работы`,
  },
  {
    numberStep: `4.3`,
    name: `Земляные работы (котлован)`,
  },
  {
    numberStep: `4.4`,
    name: `Монолитные работы`,
  },
  {
    numberStep: `4.5`,
    name: `Кровля`,
  },
  {
    numberStep: `4.6`,
    name: `Устройство фасадов и остекление (закрытие контутра)`,
  },
  {
    numberStep: `4.7`,
    name: `Внутренние инженерные системы`,
  },
  {
    numberStep: `4.8`,
    name: `Технологическое оборудование`,
  },
  {
    numberStep: `4.9`,
    name: `Отделочные работы`,
  },
  {
    numberStep: `4.10`,
    name: `ПНР`,
  },
  {
    numberStep: `4.11`,
    name: `Наружные инженерные сети`,
  },
  {
    numberStep: `4.12`,
    name: `Благоустройство`,
  },
  {
    numberStep: `5`,
    name: `Завершение строительства и приемка работ`,
  },
  {
    numberStep: `5.11`,
    name: `Комплексные испытания`,
  },
  {
    numberStep: `7.1`,
    name: `Проведение итоговой проверки МГСН`,
  },
  {
    numberStep: `7.1.8`,
    name: `Получение Заключения о соответствии`,
  },
  {
    numberStep: `7.4`,
    name: `Разрешение на ввод в эксплуатацию`,
  },
  {
    numberStep: `8`,
    name: `Передача объекта на баланс эксплуатирующей организации`,
  },
];

function ListSteps() {
  const columnForMain: any = [
    {
      Header: `Номер этапа`,
      accessor: `numberStep`,
      disableFilters: true,
      disableSortBy: true,
      // Footer: () => (
      //   <div className="analytics-page-table__total">
      //     {employees.rows.length}
      //     {` `}
      //     column total
      //   </div>
      // ),
      // Cell: ({ row }: CellTable<GetTableType>) => {
      //   const { employeeFullName } = row.original;

      //   return (
      //     <div
      //       style={{
      //         overflow: `hidden`,
      //         textOverflow: `ellipsis`,
      //         whiteSpace: `nowrap`,
      //       }}
      //     >
      //       {employeeFullName}
      //     </div>
      //   );
      // },
    },
    {
      Header: `Этап`,
      accessor: `name`,
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: `Дата выполнения`,
      accessor: `date`,
      disableFilters: true,
      disableSortBy: true,
    },
  ];

  return (
  // <ul>
  //   {steps.map(({ name, numberStep }) => (
  //     <li>
  //       <div>{name}</div>
  //       <div>{numberStep}</div>
  //     </li>
  //   ))}

  // </ul>

    <ClientTable
      tableId="analytics-salary-table"
      data={steps}
      order={{
        id: `numberStep`,
        desc: false,
      }}
      // loading={isLoading}
      // renderMobileTitle={(row: Row<{ employeeFullName: string }>) => row.original.employeeFullName}
      enableTableStatePersistance
      maxStillMobileBreakpoint={800}
      actions={[]}
      columns={columnForMain}
    />
  );
}

export default ListSteps;
