import {
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import Modal from "../library/Modal";
import { InputBox } from "../library/InputBox";
import type { FollowUpScheduleType } from "../types/followUpSchedule";

interface Props {
  isOpen: boolean;
  followUpSchedules: FollowUpScheduleType[];
  selectedSchedule?: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedSchedule: Dispatch<SetStateAction<number | undefined>>;
  setFollowUpSchedules: Dispatch<SetStateAction<FollowUpScheduleType[]>>;
}

const FollowUpScheduleModal: FC<Props> = ({
  isOpen,
  followUpSchedules,
  selectedSchedule,
  setIsOpen,
  setSelectedSchedule,
  setFollowUpSchedules,
}) => {
  const [name, setName] = useState("");
  const [days, setDays] = useState(1);

  const onClose = () => {
    setSelectedSchedule(undefined);
    setIsOpen(false);
    setName("");
    setDays(1);
  };
  const onOK = () => {
    if (!name || !days) return;

    if (selectedSchedule === undefined) {
      setFollowUpSchedules([...followUpSchedules, { name, days }]);
    } else {
      const newSchedules = structuredClone(followUpSchedules);
      newSchedules[selectedSchedule] = { days, name };
      setFollowUpSchedules(newSchedules);
    }
    onClose();
  };

  useEffect(() => {
    if (selectedSchedule !== undefined) {
      setName(followUpSchedules[selectedSchedule].name);
      setDays(followUpSchedules[selectedSchedule].days);
    }
  }, [selectedSchedule, followUpSchedules]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOK={onOK}
      okBtnLabel={selectedSchedule !== undefined ? "Update" : "Add"}
      title={`${
        selectedSchedule !== undefined ? "Update a" : "Add New"
      } Follow-up Schedule`}
    >
      <InputBox
        onChange={(e) => setName(e)}
        value={name}
        label="Name"
        className="mb-3"
      />
      <InputBox
        onChange={(e) => setDays(Number(e) || 0)}
        value={days.toString()}
        type="number"
        label="Days"
      />
    </Modal>
  );
};

export default FollowUpScheduleModal;
