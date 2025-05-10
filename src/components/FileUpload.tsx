import clsx from "clsx";
import { useRef, useState, type FC } from "react";
import { FaFileUpload, FaTrash } from "react-icons/fa";

interface Props {
  className?: string;
}

const FileUpload: FC<Props> = ({ className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddFiles = (newFiles: File[]) => {
    const fileList = [...files, ...newFiles];
    setFiles(Array.from(new Set(fileList)));
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const newFiles = Array.from(e.dataTransfer.files);
    handleAddFiles(newFiles);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      handleAddFiles(newFiles);
      e.target.files = null;
      e.target.value = "";
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };
  const handleRemoveFile = (index: number) => {
    const newFiles = structuredClone(files);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  const formatFileSize = (size: number) => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    let sizeInBytes = size;
    while (sizeInBytes >= 1024 && unitIndex < units.length - 1) {
      sizeInBytes /= 1024;
      unitIndex++;
    }
    return `${sizeInBytes.toFixed(2)} ${units[unitIndex]}`;
  };

  return (
    <div className={className}>
      {!!files.length && (
        <div className="mb-3 flex flex-col gap-1.5">
          {files.map((file, index) => (
            <div
              className="flex items-center gap-4 rounded p-2 bg-gray-800"
              key={`file-${index}`}
            >
              <FaFileUpload className="text-4xl text-gray-400" />
              <div>
                <div className="text-lg">{file.name}</div>
                <div className="text-gray-400 text-sm">
                  {formatFileSize(file.size)}
                </div>
              </div>
              <div className="ml-auto mr-0">
                <button
                  className="p-3 cursor-pointer text-red-500 hover:text-white hover:bg-red-500/20 rounded transition-all duration-300"
                  onClick={() => handleRemoveFile(index)}
                >
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className={clsx(
          "p-8 rounded border border-dashed flex flex-col items-center gap-2 w-full transition-all duration-300 hover:text-sky-400 hover:border-sky-600",
          isDragging
            ? "cursor-grabbing text-sky-400 border-sky-600"
            : "cursor-pointer text-gray-400 border-gray-700"
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDragEnter={handleDrag}
        onDrop={handleDrop}
      >
        <FaFileUpload className="text-3xl" />
        <div className="text-center">
          <div>Drag & drop files here or click to upload PDFs and images</div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleChange}
          multiple
        />
      </div>
    </div>
  );
};

export default FileUpload;
