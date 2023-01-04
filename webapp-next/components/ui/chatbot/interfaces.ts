export interface ChatBotProps {
    notif: boolean;
    showDialogue: boolean;
    setStepQuestion?: any;
}

export  interface ChatBotStepResponse {
    label: string;
    value: number;
    checked?: boolean;
}

export interface ChatBotStep {
    title: JSX.Element;
    slug: "help" | "personae" | "occupation" | "theme" | "subTheme";
    responses?: ChatBotStepResponse[];
}