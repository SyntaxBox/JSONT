import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-4 text-center">
      <span className="text-6xl font-bold">¯\_(ツ)_/¯</span>
      <h1 className="text-5xl font-bold">Oops, I did it again!</h1>
      <p className="text-xl">Spent money on useless stuff? Yeah, me too. 😂</p>
      <p className="text-lg">Built with Next.js, because why not? 💀</p>
      <div className="flex flex-col items-center gap-2 mt-4">
        <p className="text-lg">While you&apos;re here, why not enjoy:</p>
        <ul className="list-disc list-inside ml-10 text-left">
          <li>A cup of virtual coffee ☕</li>
          <li>A brief moment of existential dread 🤯</li>
          <li>This awesome dance move 🕺</li>
        </ul>
      </div>
      <p className="text-lg mt-4">
        Seriously though, check out{" "}
        <Link
          className="underline text-xl font-bold text-rose-500"
          href="https://hamid.cargopip.dev"
        >
          My Portfolio
        </Link>{" "}
        instead. It&apos;s way cooler! 😎
      </p>
    </main>
  );
}
