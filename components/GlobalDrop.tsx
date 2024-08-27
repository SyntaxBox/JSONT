"use client";
import { useGlobalFileDrop } from "@/hooks/useGloblalDrop";

export default function GlobalDrop() {
  const handleFileDrop = (files: FileList) => {
    console.log(files);
  };
  const isDropping = useGlobalFileDrop(handleFileDrop);
  if (isDropping)
    return (
      <div className="fixed h-screen w-screen bg-cyan-500/30 flex items-center justify-center z-[1000]">
        <p className="text-white font-bold">Drop your JSON File here</p>
      </div>
    );
  return <></>;
}
