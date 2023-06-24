/* eslint-disable @typescript-eslint/no-shadow */
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import { ChangeEvent, useEffect, useState } from 'react';
import clsx from 'clsx';
import Input from "../../components/Input/Input";
import { api } from '../../common/api';

const RELOAD_INTERVAL_MS = 5000;

type HistoryUploadFiles = Array<{
  dateOfUpload: string | Date;
  path: string;
  fileName: string;
}>;

function Forecast() {
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [idFile, setIdFile] = useState<null | number>(null);
  const [historyData, setHistoryData] = useState<HistoryUploadFiles>([]);
  const [pathForFile, setPathForFile] = useState(``);

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
      disableSortBy: true,
    },
    {
      Header: `Имя файла`,
      accessor: `fileName`,
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: `Файл`,
      accessor: `path`,
      disableFilters: true,
      disableSortBy: true,
    },
  ];

  useEffect(() => {
    getHistoryUpload();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (isFileUpload) {
      interval = setInterval(async () => {
        await Promise.all([downloadFile()]);
      }, RELOAD_INTERVAL_MS);
    }

    return () => {
      clearInterval(interval!);
    };
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
        onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({
          ...formData,
          name: event.target.value,
        })}
      />

      <Input
        className="forecast__input"
        type="file"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({
          ...formData,
          file: event.target.files,
        })}
      />

      <button
        type="button"
        className="forecast__button"
        disabled={formData.file === null || isLoadingUploadFile}
        onClick={() => {
          uploadFile();
        }}
      >
        {!isLoadingUploadFile ? `Отправить фаил` : `Отправяем...`}
      </button>

      <button
        type="button"
        disabled={idFile === null}
        className={clsx(`forecast__button forecast__download`, {
          'forecast__download--active': idFile,
        })}
      >
        <a
          href={pathForFile}
          download
          target="_blank"
          rel="noreferrer"
        >
          Получить результат
        </a>
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
    setIsFileUpload(true);
    setIsLoadingUploadFile(true);

    try {
      const { data } = await api.post<number>(`/forecast/upload-file/${formData.name}`, {
        file: formData.file,
      });

      setIdFile(data);
    } catch {
      alert(`Error`);
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

  async function downloadFile() {
    const { data } = await api.get<{ path: string }>(`/forecast/download-file/${idFile}`);

    setPathForFile(data.path);
  }
}

export default Forecast;
