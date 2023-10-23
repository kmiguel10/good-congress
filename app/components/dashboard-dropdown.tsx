"use client";

import React from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 *
 * @returns Need to bubble up the state for the dropdown
 */

interface DashboardDropdownProps {
  onChamberChange: (newChamber: number) => void;
}
export default function DashboardDropdown({
  onChamberChange,
}: DashboardDropdownProps) {
  function handleDropdownChange(e: any) {
    onChamberChange(parseInt(e));
  }
  return (
    <>
      <Label htmlFor="Chamber">Chamber</Label>
      <Select defaultValue="1" onValueChange={handleDropdownChange}>
        <SelectTrigger
          id="security-level"
          className="line-clamp-1 w-[160px] truncate"
        >
          <SelectValue placeholder="Select Chamber" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Both Chamber</SelectItem>
          <SelectItem value="2">House</SelectItem>
          <SelectItem value="3">Senate</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
