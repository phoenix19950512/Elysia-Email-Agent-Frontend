import clsx from "clsx";
import type { FC } from "react";

interface Props {
  className?: string;
}

const MeetingNotes: FC<Props> = ({ className }) => {
  return (
    <div
      className={clsx(
        "flex px-5 py-3 rounded-xl flex-col bg-gray-800",
        className
      )}
    >
      <div className="text-xl">Meeting Notes</div>
      <div className="text-gray-400">
        10th April – Summary of discussion on email automation...
      </div>
      <div className="mt-3">
        <button className="cursor-pointer rounded bg-sky-800 hover:bg-sky-700 px-3 py-1.5 transition-all duration-300">
          View & Edit Follow-up
        </button>
      </div>
    </div>
  );
};

export default MeetingNotes;
