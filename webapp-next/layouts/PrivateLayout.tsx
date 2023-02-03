import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { BsBook, BsInboxFill, BsPeople } from "react-icons/bs";
import Menu from "../components/bo/menu";

export interface MenuItem {
  id: number;
  name: string;
  icon: ReactNode;
  link?: string;
  blank?: boolean;
  hidden?: boolean;
}

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Accueil",
      icon: <AiTwotoneHome />,
      link: "/dashboard/bo/home",
    },
    {
      id: 2,
      name: "Ressources",
      icon: <BsBook />,
      link: "/dashboard/bo/ressources",
    },
    {
      id: 3,
      name: "Contributions",
      icon: <BsPeople />,
      link: "/dashboard/bo/contributions",
    },
    {
      id: 4,
      name: "Cas d'usage",
      icon: <BsInboxFill />,
      link: "/dashboard/bo/usecases",
    },
  ];

  return (
    <Box display={"flex"} flexDirection="row">
      <Menu menuItems={menuItems} />
      <Box display="flex" w="full" p={12}>
        {children}
      </Box>
    </Box>
  );
};

export default PrivateLayout;