"use client";
import { useUser } from "@clerk/nextjs";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function AdminBtn() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn || !user) {
    return null;
  }

  return (
    <>
      {user.publicMetadata.role === "admin" && (
        <Link href="/admin" className="ml-4 border-green-500">
          <Button variant="outlined" className="border-2 border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-white">Admin Panel</Button>
        </Link>
      )}
    </>
  );
}