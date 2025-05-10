import axios from "axios";
import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import {
  FaPlus,
  FaRegClock,
  FaRegHandPointRight,
  FaRegTrashAlt,
  FaReply,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Content from "../layout/Content";
import { SwtichWithLabel } from "../library/Switch";
import type { SortingRuleType } from "../types/sortingRule";
import type { ReplyTemplateType } from "../types/replyTemplate";
import type { FollowUpScheduleType } from "../types/followUpSchedule";
import SortingRuleModal from "../components/SortingRuleModal";
import ReplyTemplateModal from "../components/ReplyTemplateModal";
import FollowUpScheduleModal from "../components/FollowUpScheduleModal";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function Settings() {
  const [sortingRules, setSortingRules] = useState<SortingRuleType[]>([]);
  const [replyTemplates, setReplyTemplates] = useState<ReplyTemplateType[]>([]);
  const [followUpSchedules, setFollowUpSchedules] = useState<
    FollowUpScheduleType[]
  >([]);
  const [isTurnedOn, setIsTurnedOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState<number>();
  const [selectedTemplate, setSelectedTemplate] = useState<number>();
  const [selectedSchedule, setSelectedSchedule] = useState<number>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/api/settings/user123`)
      .then((res) => {
        const { email_rules, templates, schedules } = res.data;
        setSortingRules(email_rules || []);
        setReplyTemplates(templates || []);
        setFollowUpSchedules(schedules || []);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = () => {
    setIsLoading(true);
    axios
      .post(`${API_URL}/api/settings/user123`, {
        email_rules: sortingRules,
        templates: replyTemplates,
        schedules: followUpSchedules,
      })
      .then(() => toast.success("Settings saved successfully"))
      .catch((e) => {
        console.error(e);
        toast.error("Failed to update settings");
      })
      .finally(() => setIsLoading(false));
  };
  const handleOpenRuleModal = (index: number) => {
    setSelectedRule(index);
    setShowRuleModal(true);
  };
  const handleOpenTemplateModal = (index: number) => {
    setSelectedTemplate(index);
    setShowTemplateModal(true);
  };
  const handleOpenScheduleModal = (index: number) => {
    setSelectedSchedule(index);
    setShowScheduleModal(true);
  };
  const handleDeleteRule = (index: number) => {
    const newRules = structuredClone(sortingRules);
    newRules.splice(index, 1);
    setSortingRules(newRules);
  };
  const handleDeleteSchedule = (index: number) => {
    const newSchedules = structuredClone(followUpSchedules);
    newSchedules.splice(index, 1);
    setFollowUpSchedules(newSchedules);
  };
  const handleDeleteTemplate = (index: number) => {
    const newTemplates = structuredClone(replyTemplates);
    newTemplates.splice(index, 1);
    setReplyTemplates(newTemplates);
  };

  return (
    <Content>
      <div className="px-4 md:px-10">
        <div className="mt-8 mb-6 text-4xl">Settings</div>
        <div className="my-4 flex items-center gap-3">
          <SwtichWithLabel
            value={isTurnedOn}
            onChange={(e) => setIsTurnedOn(e)}
          />
          <div>Turned On</div>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="p-3 rounded-xl bg-gray-800">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xl">Sorting Rules</div>
              <button
                className="cursor-pointer rounded p-1.5 text-lg hover:bg-sky-700/20 hover:text-sky-500 transition-all duration-300"
                disabled={isLoading}
                onClick={() => setShowRuleModal(true)}
              >
                <FaPlus />
              </button>
            </div>
            <div className="p-2 min-h-32 flex flex-col justify-center gap-2">
              {sortingRules.length ? (
                sortingRules.map((rule, index) => (
                  <div
                    key={`rule-${index}`}
                    className="max-w-full flex items-center gap-2 justify-between w-80"
                  >
                    <div className="size-10 bg-gray-600 rounded flex items-center justify-center">
                      <FaRegHandPointRight />
                    </div>
                    <div
                      className="flex flex-col"
                      style={{ width: "calc(100% - 144px)" }}
                    >
                      <div className="font-semibold">
                        {rule.field}: {rule.value}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {rule.target_folder}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className="cursor-pointer rounded p-3 text-lg hover:bg-sky-700/20 hover:text-sky-500 transition-all duration-300"
                        disabled={isLoading}
                        onClick={() => handleOpenRuleModal(index)}
                      >
                        <FaPencil />
                      </button>
                      <button
                        className="cursor-pointer rounded p-3 text-lg text-red-500 hover:bg-red-700/20 transition-all duration-300"
                        disabled={isLoading}
                        onClick={() => handleDeleteRule(index)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-80 max-w-full flex items-center gap-2 flex-col">
                  <div>There is no rules.</div>
                  <button
                    className="cursor-pointer rounded border border-sky-800 text-sky-400 hover:text-white hover:bg-sky-700 px-3 py-1.5 transition-all duration-300"
                    disabled={isLoading}
                    onClick={() => setShowRuleModal(true)}
                  >
                    Add New Rule
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="text-xl">Reply Templates</div>
              <button
                className="cursor-pointer rounded p-1.5 text-lg hover:bg-sky-700/20 hover:text-sky-500 transition-all duration-300"
                disabled={isLoading}
                onClick={() => setShowTemplateModal(true)}
              >
                <FaPlus />
              </button>
            </div>
            <div className="p-2 min-h-32 flex flex-col justify-center gap-2">
              {replyTemplates.length ? (
                replyTemplates.map((template, index) => (
                  <div
                    key={`template-${index}`}
                    className="max-w-full flex items-center gap-2 w-80"
                  >
                    <div className="size-10 bg-gray-600 rounded flex items-center justify-center">
                      <FaReply />
                    </div>
                    <div
                      className="flex flex-col"
                      style={{ width: "calc(100% - 144px)" }}
                    >
                      <div className="font-semibold truncate">
                        {template.name}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {template.subject}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className="cursor-pointer rounded p-3 text-lg hover:bg-sky-700/20 hover:text-sky-500 transition-all duration-300"
                        disabled={isLoading}
                        onClick={() => handleOpenTemplateModal(index)}
                      >
                        <FaPencil />
                      </button>
                      <button
                        className="cursor-pointer rounded p-3 text-lg text-red-500 hover:bg-red-700/20 transition-all duration-300"
                        disabled={isLoading}
                        onClick={() => handleDeleteTemplate(index)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-80 max-w-full flex items-center gap-2 flex-col">
                  <div>There is no templates.</div>
                  <button
                    className="cursor-pointer rounded border border-sky-800 text-sky-400 hover:text-white hover:bg-sky-700 px-3 py-1.5 transition-all duration-300"
                    disabled={isLoading}
                    onClick={() => setShowTemplateModal(true)}
                  >
                    Add New Template
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="text-xl">Follow-up Schedule</div>
              <button
                className="cursor-pointer rounded p-1.5 text-lg hover:bg-sky-700/20 hover:text-sky-500 transition-all duration-300"
                disabled={isLoading}
                onClick={() => setShowScheduleModal(true)}
              >
                <FaPlus />
              </button>
            </div>
            <div className="p-2 min-h-32 flex flex-col justify-center gap-2">
              {followUpSchedules.length ? (
                followUpSchedules.map((schedule, index) => (
                  <div
                    key={`schedule-${index}`}
                    className="max-w-full flex items-center gap-2 justify-between w-80"
                  >
                    <div className="size-10 bg-gray-600 rounded flex items-center justify-center">
                      <FaRegClock />
                    </div>
                    <div
                      className="flex flex-col"
                      style={{ width: "calc(100% - 144px)" }}
                    >
                      <div className="font-semibold truncate">
                        {schedule.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {schedule.days} days
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className="cursor-pointer rounded p-3 text-lg hover:bg-sky-700/20 hover:text-sky-500 transition-all duration-300"
                        disabled={isLoading}
                        onClick={() => handleOpenScheduleModal(index)}
                      >
                        <FaPencil />
                      </button>
                      <button
                        className="cursor-pointer rounded p-3 text-lg text-red-500 hover:bg-red-700/20 transition-all duration-300"
                        disabled={isLoading}
                        onClick={() => handleDeleteSchedule(index)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-80 max-w-full flex items-center gap-2 flex-col">
                  <div>There is no schedules.</div>
                  <button
                    className="cursor-pointer rounded border border-sky-800 text-sky-400 hover:text-white hover:bg-sky-700 px-3 py-1.5 transition-all duration-300"
                    disabled={isLoading}
                    onClick={() => setShowScheduleModal(true)}
                  >
                    Add New Schedule
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="cursor-pointer rounded bg-sky-800 hover:bg-sky-700 px-3 py-1.5 transition-all duration-300"
            onClick={handleSave}
            disabled={isLoading}
          >
            Save Settings
          </button>
        </div>
        <SortingRuleModal
          isOpen={showRuleModal}
          selectedRule={selectedRule}
          sortingRules={sortingRules}
          setIsOpen={setShowRuleModal}
          setSelectedRule={setSelectedRule}
          setSortingRules={setSortingRules}
        />
        <ReplyTemplateModal
          isOpen={showTemplateModal}
          replyTemplates={replyTemplates}
          selectedTemplate={selectedTemplate}
          setReplyTemplates={setReplyTemplates}
          setSelectedTemplate={setSelectedTemplate}
          setIsOpen={setShowTemplateModal}
        />
        <FollowUpScheduleModal
          isOpen={showScheduleModal}
          followUpSchedules={followUpSchedules}
          selectedSchedule={selectedSchedule}
          setIsOpen={setShowScheduleModal}
          setSelectedSchedule={setSelectedSchedule}
          setFollowUpSchedules={setFollowUpSchedules}
        />
      </div>
    </Content>
  );
}
