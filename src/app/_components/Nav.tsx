"use client";
import Link from "next/link";
import Home from "./svg/Home";
import Add from "./svg/Add";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isStart = pathname.split("/").find((i) => i === "start");

  if (isStart) {
    return null;
  }
  return (
    <nav className="absolute bottom-5 z-50 flex h-16 w-6/12 max-w-[20em] items-center justify-center gap-1 rounded-full bg-white shadow-sm">
      <Link
        href="/"
        className="flex items-center justify-center rounded-xl p-3 hover:bg-slate-50"
      >
        <Home />
      </Link>
      <Link
        href="/edit-quiz"
        className="flex items-center justify-center rounded-xl p-3 hover:bg-slate-50"
      >
        <Add />
      </Link>
    </nav>
  );
}
