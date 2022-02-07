import { IBaseData } from "model";
import HandleActionTable, { ActionCell } from "model/model";
import { useEffect, useMemo, useState } from "react";
import { getData } from "service/getData";

const ErrorsRow = [1, 2];

const useViewModel = () => {
  const [dataModal, setDataModel] = useState<IBaseData[]>([]);
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

  const dataHandler = useMemo(
    () => new HandleActionTable(dataModal, errorsRowData),
    [dataModal, errorsRowData]
  );

  const onHandleRemoveError = (index: number) => {
    const { updatedValidRows, updateErrorsRow } = dataHandler.handleRemoveError(
      {
        targetIndex: index,
        action: ActionCell.REMOVE,
      }
    );
    setDataModel(updatedValidRows);
    setErrorsRowData([...updateErrorsRow]);
  };

  const onHandleDuplicateColumns = (index: number) => {
    const { currentDataMode, duplicateErrors } =
      dataHandler.handleDuplicateColumns({
        targetIndex: index,
        action: ActionCell.DUPLICATE,
      });

    setErrorsRowData(duplicateErrors);
    setDataModel(currentDataMode);
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
