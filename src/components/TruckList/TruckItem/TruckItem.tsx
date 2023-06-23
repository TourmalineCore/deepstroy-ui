/* eslint-disable @typescript-eslint/no-shadow */
import axios from "axios";
import clsx from "clsx";
import moment from "moment";
import {
  ChangeEvent, ChangeEventHandler, DetailedHTMLProps, HTMLAttributes, useState,
} from "react";
import { QUEUE_API_URL } from "../../../config/config";

interface ITruckItem extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'id'>, TruckType {
  onChangePriority: (truckNumber: string, number: number) => unknown;
}

enum SidesEnum {
  South = `South`,
  North = `North`,
}

enum StatusesEnum {
  Kpp = `Kpp`,
  City = `City`,
  Parking = `Parking`,
  Loading = `Loading`,
  Loaded = `Loaded`,
}

function TruckItem({
  priorityNumber,
  truck,
  truckNumber,
  driver,
  status,
  serviceUp,
  side,
  products = [],
  viewonly,
  onChangeSide,
  onChangePriority,
  ...props
}: ITruckItem) {
  const [isChangePriorityNumber, setIsChangePriorityNumber] = useState(false);
  const [priorityNumberValue, setPriorityNumberValue] = useState(``);

  return (
    <div
      data-priority={priorityNumber}
      className="truck-item"
      {...props}
    >
      <div className="truck-item__priority-number">{priorityNumber}</div>
      <div className="truck-item__header">
        <div>
          <div className="truck-item__truck-number">
            {truck}
          </div>
          <div className="truck-item__driver">{driver}</div>
        </div>

        <div className={clsx(`truck-item__status`, {
          'truck-item__status--city': status === StatusesEnum.City,
          'truck-item__status--kpp': status === StatusesEnum.Kpp,
          'truck-item__status--loaded': status === StatusesEnum.Loaded,
          'truck-item__status--loading': status === StatusesEnum.Loading,
          'truck-item__status--parking': status === StatusesEnum.Parking,
        })}
        >
          {getStatus(status)}
        </div>

        <div className="truck-item__box-info">
          <div>
            Обслужить до
            {` `}
            {moment(serviceUp).format(`DD.MM`)}
          </div>

          <select
            className="truck-item__select-side"
            title="Вход склада"
            disabled={viewonly}
            onChange={(e) => onChangeSide(truckNumber, e.target.value)}
            defaultValue={side}
          >
            {Object.keys(SidesEnum).map((side) => (
              <option
                value={side}
              >
                {side === `South` ? `Юг` : `Север`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!isChangePriorityNumber && !viewonly && (
        <button
          type="button"
          onClick={() => setIsChangePriorityNumber(true)}
        >
          Изменить порядок
        </button>
      )}

      {isChangePriorityNumber && (
        <div className="truck-item__update-queue-box">
          <input
            type="number"
            min={0}
            className="truck-item__update-input"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPriorityNumberValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                onChangePriority(truck, Number(priorityNumberValue));
                setIsChangePriorityNumber(false);
              }
            }}
          />

          <div>
            <button
              className="truck-item__close"
              type="button"
              onClick={() => setIsChangePriorityNumber(false)}
            >
              Закрыть
            </button>
            <button
              className="truck-item__update-button"
              type="button"
              onClick={() => {
                onChangePriority(truck, Number(priorityNumberValue));
                setIsChangePriorityNumber(false);
              }}
            >
              Изменить
            </button>
          </div>
        </div>
      )}
      <table className="truck-item__products">
        <thead>
          <tr>
            <th>Вид продукции</th>
            <th>Объем продукции</th>
            <th>Единица измерения</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ type, volume, measurement }, index) => (
            <tr
              key={`${type} ${index.toString()}`}
              style={{ border: `1px solid` }}
            >
              <td className="truck-item__products-name">{type}</td>
              <td>{volume}</td>
              <td>{measurement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function getStatus(status: StatusesEnum) {
    let text = ``;

    switch (status) {
      case StatusesEnum.City:
        text = `В городе в очереди`;
        break;
      case StatusesEnum.Kpp:
        text = `Досмотр на КПП`;
        break;
      case StatusesEnum.Parking:
        text = `На парковке СТК`;
        break;
      case StatusesEnum.Loading:
        text = `На погрузке`;
        break;
      case StatusesEnum.Loaded:
        text = `Погрузка завершена`;
        break;
      default:
        text = `неизвестный статус`;
    }

    return text;
  }
}

export default TruckItem;
