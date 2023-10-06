"use client";

import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  existingImages?: string[];
  onChange: (fileList: string[]) => void;
};

const FileUpload = ({ existingImages, onChange }: Props) => {
  const [fileList, setFileList] = useState<string[] | null>(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const [fileListChanged, setFileListChanged] = useState(false);

  useEffect(() => {
    if (fileListChanged && fileList !== null) {
      onChange(fileList);
      setFileListChanged(false);
    }
  }, [fileList, fileListChanged, onChange]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
    isDropped: boolean,
  ) => {
    e.preventDefault();

    const selectedFiles = isDropped
      ? Array.from((e as React.DragEvent<HTMLElement>).dataTransfer.files)
      : Array.from(
          (e as React.ChangeEvent<HTMLInputElement>).target.files as FileList,
        );
    const acceptedExtensions = [".jpg", ".jpeg", ".webp", ".png"];
    const validFiles = selectedFiles.filter((file) => {
      const fileExtension = file.name.split(".").pop()!.toLowerCase();
      return acceptedExtensions.includes(`.${fileExtension}`);
    });

    const ImagesAsString: string[] = [];

    for (const file of validFiles) {
      const fileDataUrl = await readFileAsDataURL(file);
      ImagesAsString.push(fileDataUrl);
    }

    setFileList(ImagesAsString);
    setFileListChanged(true);
    setShouldHighlight(false);
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Error reading file."));
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div
      className={classNames({
        "relative h-96 w-full": true,
        "grid place-content-center p-4": true,
        "rounded-lg text-indigo-500": true,
        "border-4 border-dashed ": true,
        "transition-colors": true,
        "border-indigo-500 bg-indigo-100": shouldHighlight,
        "border-indigo-100 bg-indigo-50": !shouldHighlight,
      })}
      onDragOver={(e) => {
        e.preventDefault();
        setShouldHighlight(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setShouldHighlight(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setShouldHighlight(false);
      }}
      onDrop={(e) => handleFileChange(e, true)}
    >
      <div className="flex flex-col items-center">
        {fileList ? (
          <>
            <div className="flex w-full flex-col gap-5 md:flex-row">
              {fileList.map((src, idx) => (
                <div
                  key={idx}
                  className="relative h-48 w-36 rounded-lg outline outline-blue-400"
                >
                  <Image
                    alt={`product Image ${idx}`}
                    src={src || "/Products/placeholder-image.png"}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <span className="absolute right-2 top-2 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-black to-indigo-400 text-xl text-white">
                    {idx + 1}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="mt-5 rounded-md border border-indigo-500 px-2 py-1"
              onClick={() => {
                setFileList(null);
              }}
            >
              Очистить
            </button>
          </>
        ) : existingImages?.length ? (
          <div className="flex w-full flex-col gap-5 md:flex-row">
            {existingImages.map((image, idx) => (
              <div
                key={idx}
                className="relative h-48 w-36 rounded-lg outline outline-blue-400"
              >
                <Image
                  alt={`product Image ${idx}`}
                  src={image || "/Products/placeholder-image.png"}
                  fill
                  className="rounded-lg object-cover"
                />
                <span className="absolute right-2 top-2 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-black to-indigo-400 text-xl text-white">
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <CloudArrowUpIcon className="h-10 w-10" />
            <span className="inline-flex flex-col">
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(e, false)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              Выберите изображения или перетащите его сюда
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
