import { IBaseData } from "model";

export enum ActionCell {
  DUPLICATE = +1,
  REMOVE = -1,
}

class HandleActionTable {
  dataModel: IBaseData[];
  errorsRowData: number[];

  constructor(dataModel: IBaseData[], errorsRowData: number[]) {
    this.dataModel = dataModel;
    this.errorsRowData = errorsRowData;
  }

  private handleUpdateErrorsRow = (targetIndex: number, action: ActionCell) => {
    let updateErrorsRow: number[] = [];

    if (action === ActionCell.REMOVE) {
      updateErrorsRow = this.errorsRowData
        .filter((error) => error !== targetIndex)
        .map((errorItem) =>
          errorItem >= targetIndex ? errorItem - 1 : errorItem
        );
    } else {
      updateErrorsRow = this.errorsRowData.map((errorIndex) =>
        errorIndex >= targetIndex ? errorIndex + 1 : errorIndex
      );
    }

    return updateErrorsRow;
  };

  handleRemoveError = ({
    targetIndex,
    action,
  }: {
    targetIndex: number;
    action: ActionCell;
  }) => {
    const updatedValidRows = this.dataModel.filter(
      (_data, index) => index !== targetIndex
    );
    const updateErrorsRow = this.handleUpdateErrorsRow(targetIndex, action);

    return { updatedValidRows, updateErrorsRow };
  };

  handleDuplicateColumns = ({
    targetIndex,
    action,
  }: {
    targetIndex: number;
    action: ActionCell;
  }) => {
    const preventDataModel = [...this.dataModel];
    const currentDataMode: IBaseData[] = [];
    const filterDataModel = preventDataModel.filter(
      (_item, index) => index === targetIndex
    );

    preventDataModel.splice(targetIndex + 1, 0, filterDataModel[0]);
    preventDataModel.forEach((data, index) => {
      currentDataMode.push({ ...data, id: index });
    });

    const updateErrorsRow = this.handleUpdateErrorsRow(targetIndex, action);

    const duplicateErrors = () => {
      if (this.errorsRowData.includes(targetIndex)) {
        return [...updateErrorsRow, targetIndex];
      } else {
        return [...updateErrorsRow];
      }
    };

    return { currentDataMode, duplicateErrors };
  };
}

export default HandleActionTable;
