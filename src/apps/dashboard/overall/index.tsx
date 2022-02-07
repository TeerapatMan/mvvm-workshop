import Toggle from "baseUI/button/toggle";
import { Table, TableBody } from "baseUI/table";
import useViewModel from "../viewModel";
import { TableColumn } from "./components/tableColumn";
import { TableRow } from "./components/tableRow";

export const OverallPage = () => {
  const {
    dataModal,
    onHandleRemoveError,
    errorsRows,
    onHandleDuplicateColumns,
    enabledToggle,
    onToggleErrors,
  } = useViewModel();

  return (
    <div className=" p-8 pt-[72px] mx-auto">
      <div className="mb-6">
        <Toggle setEnabled={onToggleErrors} enabled={enabledToggle} />
        {/* TODO */}
      </div>

      <Table>
        <TableColumn />
        <TableBody>
          {dataModal.map((entry, index) => (
            <TableRow
              data={entry}
              index={index}
              onRemove={onHandleRemoveError}
              onDuplicateData={onHandleDuplicateColumns}
              error={errorsRows.includes(index)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
