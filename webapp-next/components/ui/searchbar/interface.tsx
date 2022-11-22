import { FormEvent } from "react";

export interface SearchbarProps {
  onSearch: (search: FormEvent<HTMLInputElement>) => void;
  size: "sm" | "md" | "lg";
  placeholder?: string;
}
