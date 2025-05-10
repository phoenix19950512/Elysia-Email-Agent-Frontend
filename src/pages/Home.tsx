import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  FaChartLine,
  FaRegClock,
  FaRegEnvelope,
  FaReply,
} from "react-icons/fa";
import Chat from "../components/Chat";
import FileUpload from "../components/FileUpload";
import MeetingNotes from "../components/MeetingNotes";
import Content from "../layout/Content";
import type { SummaryType } from "../types/summary";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function Home() {
  const [summary, setSummary] = useState<SummaryType>({
    emails_sorted: 0,
    replies_sent: 0,
    follow_ups_set: 0,
  });

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/activity-summary/user123`).then((res) => {
      setSummary(res.data);
    });
    const updateListener = (e: CustomEvent<SummaryType>) => {
      setSummary(e.detail);
    };
    window.addEventListener(
      "activity-updated",
      updateListener as EventListener
    );
    return () =>
      window.removeEventListener(
        "activity-updated",
        updateListener as EventListener
      );
  }, []);

  return (
    <Content>
      <div className="flex flex-wrap w-full h-full">
        <div
          ref={sidebarRef}
          className="w-full md:w-fit bg-gray-950/50 h-fit md:h-full flex flex-col items-center gap-3 py-3 px-5"
        >
          <div className="flex gap-3 justify-between rounded-lg bg-gray-800 aspect-[1.5] min-w-52 p-3">
            <div>
              <div className="text-gray-300">Emails Sorted</div>
              <div className="font-bold text-3xl">
                {summary.emails_sorted || 0}
              </div>
            </div>
            <div className="flex flex-col gap-5 justify-center text-sky-400 mx-2 text-2xl">
              <FaRegEnvelope />
              <FaChartLine />
            </div>
          </div>
          <div className="flex gap-3 justify-between rounded-lg bg-gray-800 aspect-[1.5] min-w-52 p-3">
            <div>
              <div className="text-gray-300">Replies Sent</div>
              <div className="font-bold text-3xl">
                {summary.replies_sent || 0}
              </div>
            </div>
            <div className="flex flex-col gap-5 justify-center text-sky-400 mx-2 text-2xl">
              <FaReply />
              <FaChartLine />
            </div>
          </div>
          <div className="flex gap-3 justify-between rounded-lg bg-gray-800 aspect-[1.5] min-w-52 p-3">
            <div>
              <div className="text-gray-300">Follow-ups Set</div>
              <div className="font-bold text-3xl">
                {summary.follow_ups_set || 0}
              </div>
            </div>
            <div className="flex flex-col gap-5 justify-center text-sky-400 mx-2 text-2xl">
              <FaRegClock />
              <FaChartLine />
            </div>
          </div>
        </div>
        <div
          className="md:h-full grow overflow-y-auto px-4 py-2 md:px-8 md:py-6"
          style={{
            width: sidebarRef.current
              ? `calc(100% - ${sidebarRef.current.offsetWidth}px)`
              : undefined,
          }}
        >
          <Chat className="my-2" />
          <FileUpload className="mt-5 mb-2" />
          <MeetingNotes className="mt-5" />
        </div>
      </div>
    </Content>
  );
}
