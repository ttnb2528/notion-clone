import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse p-8">
      <ArrowLeftCircle className="w-12 h-12" />
      <div>
        <h1 className="font-bold text-2xl mb-2">Welcome to Notion Clone!</h1>
        <p className="text-gray-600">Get started with creating a New Document</p>
        <p className="text-sm text-gray-500 mt-2">
          Deployment successful - {new Date().toISOString()}
        </p>
      </div>
    </main>
  );
}
