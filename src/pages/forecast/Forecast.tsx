/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import { ChangeEvent, useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import Input from "../../components/Input/Input";
import { api } from '../../common/api';

type HistoryUploadFiles = Array<{
  dateOfUpload: string | Date;
  path: string;
  fileName: string;
}>;

function Forecast() {
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [historyData, setHistoryData] = useState<HistoryUploadFiles>([]);

  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingUploadFile, setIsLoadingUploadFile] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    file: FileList | null;
  }>({
    name: ``,
    file: null,
  });

  const columnForMain: any = [
    {
      Header: `Дата`,
      accessor: `dateOfUpload`,
      disableFilters: true,
      Cell: ({ row }: any) => (
        <div>{moment(row.original.dateOfUpload).format(`DD-MM-YYYY`)}</div>
      ),
    },
    {
      Header: `Имя файла`,
      accessor: `fileName`,
      disableFilters: true,
    },
    {
      Header: `Файл`,
      accessor: `path`,
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }: any) => (
        <a
          href={row.original.path}
          download
          style={{
            color: `#fff`,
            cursor: `pointer`,
            border: `1px solid #e2e2e2`,
            padding: 6,
            background: `#5d35ff`,
            borderRadius: 6,
          }}
        >
          Получить результат
        </a>
      ),
    },
  ];

  useEffect(() => {
    getHistoryUpload();
  }, []);

  useEffect(() => {
    if (isFileUpload) {
      getHistoryUpload();
    }
  }, [isFileUpload]);

  return (
    <section className="forecast">
      <h1
        className="forecast__title"
      >
        Прогнозирование для файла
      </h1>

      <Input
        className="forecast__input"
        label="Имя файла"
        type="text"
        placeholder="Имя файла"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({
          ...formData,
          name: event.target.value,
        })}
      />

      <Input
        className="forecast__input"
        type="file"
        accept=".xlsx"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({
          ...formData,
          file: event.target.files,
        })}
      />

      <button
        type="button"
        className="forecast__button"
        disabled={!(formData.file !== null && formData.name.length > 1) || isLoadingUploadFile}
        onClick={() => {
          uploadFile();
        }}
      >
        {!isLoadingUploadFile ? `Отправить фаил` : `Отправяем...`}
      </button>

      <div className="forecast__history">
        <h3>История</h3>

        <ClientTable
          tableId="analytics-salary-table"
          data={historyData}
          order={{
            id: `numberStep`,
            desc: false,
          }}
          loading={isLoadingHistory}
          renderMobileTitle={(row: any) => row.original.fileName}
          enableTableStatePersistance
          maxStillMobileBreakpoint={800}
          actions={[]}
          columns={columnForMain}
        />
      </div>
    </section>
  );

  async function uploadFile() {
    setIsLoadingUploadFile(true);

    try {
      // @ts-ignore
      await api.post(`/forecast/upload-file/${formData.name}`, formData.file[0]);

      toast.success(`Фаил отправлен, скоро появится в таблице`);
      setIsFileUpload(true);
    } catch {
      alert(`Error`);
      toast.error(`Произошла ошибка, попробуйте еще раз чуть-чуть позже`);
      setIsFileUpload(false);
    } finally {
      setIsLoadingUploadFile(false);
    }
  }

  async function getHistoryUpload() {
    setIsLoadingHistory(true);

    try {
      const { data } = await api.get<HistoryUploadFiles>(`/forecast/history`);

      setHistoryData(data);
    } finally {
      setIsLoadingHistory(false);
    }
  }
}

export default Forecast;
