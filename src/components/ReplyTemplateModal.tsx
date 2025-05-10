import clsx from "clsx";
import {
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import Modal from "../library/Modal";
import { InputBox } from "../library/InputBox";
import type { ReplyTemplateType } from "../types/replyTemplate";

interface Props {
  isOpen: boolean;
  replyTemplates: ReplyTemplateType[];
  selectedTemplate?: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTemplate: Dispatch<SetStateAction<number | undefined>>;
  setReplyTemplates: Dispatch<SetStateAction<ReplyTemplateType[]>>;
}

const ReplyTemplateModal: FC<Props> = ({
  isOpen,
  replyTemplates,
  selectedTemplate,
  setIsOpen,
  setSelectedTemplate,
  setReplyTemplates,
}) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isBodyFocus, setIsBodyFocus] = useState(false);

  const onClose = () => {
    setSelectedTemplate(undefined);
    setIsOpen(false);
    setName("");
    setSubject("");
    setBody("");
  };
  const onOK = () => {
    if (!name || !subject || !body) return;

    if (selectedTemplate === undefined) {
      setReplyTemplates([...replyTemplates, { body, name, subject }]);
    } else {
      const newTemplates = structuredClone(replyTemplates);
      newTemplates[selectedTemplate] = {
        body,
        name,
        subject,
      };
      setReplyTemplates(newTemplates);
    }
    onClose();
  };

  useEffect(() => {
    if (selectedTemplate !== undefined) {
      const template = replyTemplates[selectedTemplate];
      setName(template.name);
      setBody(template.body);
      setSubject(template.subject);
    }
  }, [selectedTemplate, replyTemplates]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOK={onOK}
      okBtnLabel={selectedTemplate !== undefined ? "Update" : "Add"}
      title={`${
        selectedTemplate !== undefined ? "Update a" : "Add New"
      } Reply Templates`}
    >
      <InputBox
        onChange={(e) => setName(e)}
        value={name}
        label="Name"
        className="mb-3"
      />
      <InputBox
        onChange={(e) => setSubject(e)}
        value={subject}
        label="Value"
        placeholder='e.g. "RE: {original_subject}"'
        className="mb-3"
      />
      <div
        className={clsx("mb-2 transition-all duration-300", {
          "text-sky-600": isBodyFocus,
        })}
      >
        Body
      </div>
      <textarea
        className="rounded-md border border-gray-700 w-full py-2 px-3 focus:border-sky-600 focus:outline-none transition-all duration-300"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        onFocus={() => setIsBodyFocus(true)}
        onBlur={() => setIsBodyFocus(false)}
      />
    </Modal>
  );
};

export default ReplyTemplateModal;
