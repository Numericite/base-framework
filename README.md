# Numéricité ressourcerie PFRH Normandie

## Launch project

This github repository is composed of 2 apps : strapi for backend & a nextjs application for frontend.
The project is using postgresql as database and docker-compose is used for developpement.

### Database

```
docker-compose up -d
```

### Strapi backend / back-office

```
cd strapi
cp .env.example .env
yarn
yarn develop
(you can access strapi web interface on http://localhost:1337/)
```

### Nextjs frontend

```
cd webapp-next
cp .env.example .env
yarn
yarn dev
(you can access nextjs project on http://localhost:3000/)
```
