"use client";
import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserButton, UserProfile } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminHeader() {
  // State to control whether the profile modal is open.
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleOpenProfile = () => {
    setOpenProfileModal(true);
  };

  const handleCloseProfile = () => {
    setOpenProfileModal(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Search Input */}
          <div className="flex-1 mr-4">
            <div className="relative">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-full max-w-md"
              />
            </div>
          </div>

          {/* Right-side Controls */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  {/* Custom trigger text or icon for account menu */}
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleOpenProfile}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Team
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {/* Optionally add more actions */}
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Optional: You can also include the Clerk UserButton for quick access */}
            <UserButton />
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {openProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Modal overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleCloseProfile}
          ></div>
          {/* Modal content */}
          <div className="relative bg-white p-6 rounded shadow-lg z-10 max-w-md mx-auto">
            <UserProfile />
            <Button
              onClick={handleCloseProfile}
              className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
