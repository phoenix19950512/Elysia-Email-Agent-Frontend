import {
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import type { SortingRuleType } from "../types/sortingRule";
import Modal from "../library/Modal";
import { InputBox } from "../library/InputBox";

interface Props {
  isOpen: boolean;
  selectedRule?: number;
  sortingRules: SortingRuleType[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedRule: Dispatch<SetStateAction<number | undefined>>;
  setSortingRules: Dispatch<SetStateAction<SortingRuleType[]>>;
}

const SortingRuleModal: FC<Props> = ({
  isOpen,
  selectedRule,
  sortingRules,
  setIsOpen,
  setSelectedRule,
  setSortingRules,
}) => {
  const [field, setField] = useState("");
  const [value, setValue] = useState("");
  const [targetFolder, setTargetFolder] = useState("");

  const onClose = () => {
    setSelectedRule(undefined);
    setIsOpen(false);
    setField("");
    setValue("");
    setTargetFolder("");
  };
  const onOK = () => {
    if (!field || !value || !targetFolder) return;

    if (selectedRule === undefined) {
      setSortingRules([
        ...sortingRules,
        {
          field,
          value,
          target_folder: targetFolder,
        },
      ]);
    } else {
      const newRules = structuredClone(sortingRules);
      newRules[selectedRule] = {
        field,
        target_folder: targetFolder,
        value,
      };
      setSortingRules(newRules);
    }
    onClose();
  };

  useEffect(() => {
    if (selectedRule !== undefined) {
      const rule = sortingRules[selectedRule];
      setField(rule.field);
      setTargetFolder(rule.target_folder);
      setValue(rule.value);
    }
  }, [selectedRule, sortingRules]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOK={onOK}
      okBtnLabel={selectedRule !== undefined ? "Update" : "Add"}
      title={`${
        selectedRule !== undefined ? "Update a" : "Add New"
      } Sorting Rule`}
    >
      <InputBox
        onChange={(e) => setField(e)}
        value={field}
        label="Field"
        className="mb-3"
      />
      <InputBox
        onChange={(e) => setValue(e)}
        value={value}
        label="Value"
        className="mb-3"
      />
      <InputBox
        onChange={(e) => setTargetFolder(e)}
        value={targetFolder}
        label="Target Folder"
      />
    </Modal>
  );
};

export default SortingRuleModal;
