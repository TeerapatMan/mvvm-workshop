import { DataType } from "constants/dataModelType";
import { useEffect, useState } from "react";
import { getData } from "service/getData";

const ErrorsRow = [1, 2];

const useViewModel = () => {
  const [dataModal, setDataModel] = useState<DataType[]>([]);
  const [errorsRowData, setErrorsRowData] = useState(ErrorsRow);
  const [enabledToggle, setEnabledToggle] = useState(false);

  useEffect(() => {
    getData().then((res) => {
      if (res) {
        setDataModel(res);
      }
    });

    return () => {};
  }, []);

  const onHandleRemoveError = (indexRow: number) => {
    const error = dataModal.filter((_data, index) => index !== indexRow);

    if (error) {
      setDataModel(error);
    }

    const updateErrorsRow = errorsRowData
      .filter((error) => error !== indexRow)
      .map((errorItem) => (errorItem >= indexRow ? errorItem - 1 : errorItem));

    setErrorsRowData([...updateErrorsRow]);
  };

  const onHandleDuplicateColumns = (indexDuplicate: number) => {
    const preventDataModel = [...dataModal];
    const currentDataMode: DataType[] = [];
    const filterDataModel = preventDataModel.filter(
      (_item, index) => index === indexDuplicate
    );

    preventDataModel.splice(indexDuplicate + 1, 0, filterDataModel[0]);
    preventDataModel.forEach((data, index) => {
      currentDataMode.push({ ...data, id: index });
    });

    onHandleDuplicateOfErrors({ rowIndex: indexDuplicate });

    setDataModel(currentDataMode);
  };

  const onHandleDuplicateOfErrors = ({ rowIndex }: { rowIndex: number }) => {
    const updateErrorsRow = errorsRowData.map((errorIndex) =>
      errorIndex >= rowIndex ? errorIndex + 1 : errorIndex
    );

    const getDuplicateErrors = () => {
      if (errorsRowData.includes(rowIndex)) {
        return [...updateErrorsRow, rowIndex];
      } else {
        return [...updateErrorsRow];
      }
    };

    setErrorsRowData(getDuplicateErrors());
  };

  const onToggleErrors = () => {
    setEnabledToggle(!enabledToggle);
  };

  return {
    dataModal,
    onHandleRemoveError,
    errorsRows: errorsRowData,
    onHandleDuplicateColumns,
    enabledToggle,
    onToggleErrors,
  };
};

export default useViewModel;
