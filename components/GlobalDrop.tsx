import { useGlobalFileDrop } from "@/hooks/useGloblalDrop";

export default function GlobalDrop({
  onDrop,
}: {
  onDrop: (jsonContent: string) => void;
}) {
  const handleFileDrop = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];

      // Check if the file is a JSON file
      if (file.type === "application/json") {
        const reader = new FileReader();

        // Read the file content as text
        reader.onload = (event) => {
          const jsonContent = event.target?.result as string;
          try {
            // Validate the content to ensure it's valid JSON
            JSON.parse(jsonContent);
            onDrop(jsonContent); // Pass the JSON content as a string
          } catch (error) {
            console.error("Invalid JSON file");
          }
        };

        reader.readAsText(file); // Trigger file read
      } else {
        console.error("Please drop a valid JSON file");
      }
    }
  };

  const isDropping = useGlobalFileDrop(handleFileDrop);

  if (isDropping) {
    return (
      <div className="fixed h-screen w-screen bg-cyan-500/30 flex items-center justify-center z-[1000]">
        <p className="text-white font-bold">Drop your JSON File here</p>
      </div>
    );
  }

  return null;
}
