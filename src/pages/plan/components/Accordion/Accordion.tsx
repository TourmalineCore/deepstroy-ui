import moment from 'moment';
import React, { useState } from 'react';

const FORMAT_DATE = `DD-MM-YYYY`;

function Accordion({
  codeTask,
  nameTask,
  completionPercentageTask,
  dateStartTask,
  dateEndTask,
  dateStartContract,
  dateEndContract,
  statusExpertise,
  expertise,
}: {
  codeTask: string | number;
  nameTask: string;
  completionPercentageTask: number;
  dateStartTask: string | Date;
  dateEndTask: string | Date;
  dateStartContract: string | Date;
  dateEndContract: string | Date;
  statusExpertise?: string | number;
  expertise?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="accordion">
      <button
        type="button"
        className="accordion__header"
        onClick={() => setIsOpen(!isOpen)}
      >

        <span>
          {nameTask}
        </span>

        <span style={{ marginLeft: `8px` }}>{isOpen ? `↥` : `↧`}</span>
      </button>

      {isOpen && (
        <div>
          <div>
            <span style={{ marginRight: `10px` }}>Идентификатор вида задачи</span>
            <span><b>{codeTask}</b></span>
          </div>

          <div>
            <span style={{ marginRight: `10px` }}>Фактический процент завершения</span>
            <span><b>{completionPercentageTask}</b></span>
          </div>

          <div>
            <span style={{ marginRight: `10px` }}>Дата начала выполнения задачи</span>
            <span><b>{moment(dateStartTask).format(FORMAT_DATE)}</b></span>
          </div>

          <div>
            <span style={{ marginRight: `10px` }}>Дата конца выполнения задачи</span>
            <span>{moment(dateEndTask).format(FORMAT_DATE)}</span>
          </div>

          <div>
            <span style={{ marginRight: `10px` }}>Дата начала выполнения задачи согласно договору</span>
            <span><b>{moment(dateStartContract).format(FORMAT_DATE)}</b></span>
          </div>

          <div>
            <span style={{ marginRight: `10px` }}>Дата конца выполнения задачи согласно договору</span>
            <span><b>{moment(dateEndContract).format(FORMAT_DATE)}</b></span>
          </div>

          <div>
            <span style={{ marginRight: `10px` }}>Статус по экспертизе</span>
            <span><b>{statusExpertise}</b></span>
          </div>

          <div>
            <span style={{ marginRight: `10px` }}>Экспертиза</span>
            <span><b>{expertise}</b></span>
          </div>
        </div>
      )}
    </li>
  );
}

export default Accordion;
