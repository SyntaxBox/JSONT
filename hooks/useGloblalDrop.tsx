import { useEffect, useState, useRef } from "react";

type FileDropHandler = (files: FileList) => void;

export const useGlobalFileDrop = (onFileDrop: FileDropHandler) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
      dragTimeoutRef.current = window.setTimeout(() => {
        setIsDragging(true);
      }, 100); // Delay of 100ms before setting isDragging to true
    };

    const handleDragEnter = (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (event: DragEvent) => {
      event.preventDefault();
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
      dragTimeoutRef.current = window.setTimeout(() => {
        setIsDragging(false);
      }, 100); // Delay of 100ms before setting isDragging to false
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
      setIsDragging(false);
      if (event.dataTransfer?.files.length) {
        onFileDrop(event.dataTransfer.files);
      }
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
    };
  }, [onFileDrop]);

  return isDragging;
};
