import { FaFile, FaGamepad, FaLink, FaVideo } from "react-icons/fa";

export const ressourceKindEnum: readonly [string, ...string[]] = [
  "link",
  "video",
  "file",
  "quiz",
];
export const displayKindReadable = (kind: string) => {
  switch (kind) {
    case "link":
      return "Lien";
    case "video":
      return "Vidéo";
    case "file":
      return "Fichier";
    case "quiz":
      return "Jeu";
  }
};

export const displayKindIcon = (kind: string) => {
  switch (kind) {
    case "link":
      return <FaLink />;
    case "video":
      return <FaVideo />;
    case "file":
      return <FaFile />;
    case "quiz":
      return <FaGamepad />;
  }
};

export const ressourceVideoSourceEnum: readonly [string, ...string[]] = [
  "youtube",
  "vimeo",
];
