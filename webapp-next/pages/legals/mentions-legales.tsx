import { Text, Heading, Container, UnorderedList, ListItem } from "@chakra-ui/react";

const MentionsLegales = () => {
  return (
    <Container maxW="container.2lg" py={[6]}>
      <Heading mb={10}>Mentions légales</Heading>
      <Text fontWeight="bold" fontSize="xl" my={6}>
        Editeur de la plateforme
      </Text>
      La plateforme « Ressourcerie PFRH Normandie » est éditée par : <br />
      <br />
      La préfecture de région Normandie :
      <br />
      <br /> 7, place de la Madeleine
      <br /> CS16036
      <br /> 76036 Rouen Cedex
      <br /> Téléphone : 02 32 76 50 00 <br />
      Fax : 02 35 98 10 50
      <Text fontWeight="bold" fontSize="xl" my={6}>
        Directeur de la publication
      </Text>
      Le directeur de la publication est Pierre-André DURAND, préfet de la
      région Normandie.
      <Text fontWeight="bold" fontSize="xl" my={6}>
        Hébergement de la Plateforme
      </Text>{" "}
      Ce site est hébergé en propre par :
      <br />
      <br /> Amazon Web Services
      <br /> 31 Pl. des Corolles
      <br /> 92400 Courbevoie
      <br /> France
      <Text fontWeight="bold" fontSize="xl" my={6}>
        Accessibilité
      </Text>
      La conformité aux normes d’accessibilité numérique est un objectif
      ultérieur mais nous tâchons de rendre ce site accessible à toutes et à
      tous.
      <Text fontWeight="bold" fontSize="xl" my={6}>
        Signaler un dysfonctionnement
      </Text>{" "}
      Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder à un
      contenu ou une fonctionnalité du site, merci de nous en faire part :
      <a href="mailto:prefecture@seine-maritime.gouv.fr">
        prefecture@seine-maritime.gouv.fr
      </a>
      <br />
      <br /> Si vous n’obtenez pas de réponse rapide de notre part, vous êtes en
      droit de faire parvenir vos doléances ou une demande de saisine au
      Défenseur des droits.
      <br />
      <br /> Pour le joindre, vous pouvez :
      <UnorderedList ml={8}>
        <ListItem>
          Utiliser le formulaire de contact en ligne ici :{" "}
          <a
            rel="noreferrer"
            href="https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=accueil_2016"
            target="_blank"
          >
            https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=accueil_2016
          </a>
        </ListItem>
        <ListItem>Composer le 09 69 39 00 00 (du lundi au vendredi de 8h à 20h)</ListItem>
        <ListItem>
          Envoyer un courrier (sans timbre) à l’adresse suivante : Défenseur des
          droits, Libre réponse 71120, 75342 Paris CEDEX 07.
        </ListItem>
      </UnorderedList>{" "}
      <Text fontWeight="bold" fontSize="xl" my={6}>
        En savoir plus
      </Text>{" "}
      Pour en savoir plus sur la politique d’accessibilité numérique de l’État :{" "}
      <a
        rel="noreferrer"
        href="http://references.modernisation.gouv.fr/accessibilite-numerique"
        target="_blank"
      >
        http://references.modernisation.gouv.fr/accessibilite-numerique
      </a>
      <Text fontWeight="bold" fontSize="xl" my={6}>
        Sécurité
      </Text>
      Le site est protégé par un certificat électronique, matérialisé pour la
      grande majorité des navigateurs par un cadenas. Cette protection participe
      à la confidentialité des échanges. En aucun cas les services associés à la
      plateforme ne seront à l’origine d’envoi de courriels pour demander la
      saisie d’informations personnelles.
    </Container>
  );
};

export default MentionsLegales;
