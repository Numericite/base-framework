import { Dispatch, SetStateAction } from "react";

export interface ChatBotProps {
  showToast: boolean;
  setShowToast: Dispatch<SetStateAction<boolean>>;
  toast: boolean;
  stepQuestion?: number;
  setStepQuestion?: any;
  responseParams?: {
    personae: number;
    occupation: number;
    theme: number;
    subTheme: number;
  };
}

export interface ChatBotStepResponse {
  label: string;
  value: number;
  checked?: boolean;
}

export interface ChatBotStep {
  title: JSX.Element;
  slug: "personae" | "occupation" | "theme" | "subTheme";
  responses?: ChatBotStepResponse[];
}
