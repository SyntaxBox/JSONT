import JSONEditor from "@/components/JSONEditor";

export default function Home() {
  return (
    <main className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">JSON Editor</h1>
      <JSONEditor />
    </main>
  );
}
