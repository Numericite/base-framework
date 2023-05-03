import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Footer from '../components/ui/footer';
import Navbar from '../components/ui/navbar';
import Head from 'next/head';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Ressourcerie RH de Normandie</title>
        <meta
          name="description"
          content="Simple et Efficace ! Venez découvrir la fonction publique sous un autre angle, grace à notre nouvel espace d’exploration et d’expérimentation."
        ></meta>
        <meta
          property="og:url"
          content="https://ressourcerie-pfrh.numericite.fr"
        ></meta>
        <meta property="og:title" content="Ressourcerie RH de Normandie"></meta>
        <meta
          property="og:description"
          content="Simple et Efficace ! Venez découvrir la fonction publique sous un autre angle, grace à notre nouvel espace d’exploration et d’expérimentation."
        ></meta>
        <meta property="og:image" content="/chatbot/cuteRobot_cute.png"></meta>
      </Head>
      <Box minH="100vh" minW="100%">
        <Navbar />
        {children}
      </Box>
      <Footer />
    </>
  );
}
