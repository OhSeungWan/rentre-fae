import { Command } from "lucide-react";

import Link from "next/link";

export const Header = () => {
  return (
    <nav className="flex items-center justify-between p-16 w-full border-b bg-white">
      <Link href="/" className="flex items-center space-x-8">
        <Command className="h-32 w-32" />
        <h2 className="text-xl font-semibold">Rentre-Fae</h2>
      </Link>
      <div className="flex items-center space-x-32 text-sm font-medium">
        <Link href="/edit" className="hover:underline">
          편집
        </Link>
        <Link href="/approved" className="hover:underline">
          승인 목록
        </Link>
      </div>
    </nav>
  );
};
