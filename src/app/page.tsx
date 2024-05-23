"use client";
import useFakeUser from "./_hooks/useFakeUser";

export default function Home() {
  const { key } = useFakeUser();
  return <div>{key}</div>;
}
