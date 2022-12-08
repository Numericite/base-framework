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

export const ressourceVideoSourceEnum: readonly [string, ...string[]] = [
  "youtube",
  "vimeo",
];
