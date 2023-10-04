module.exports = {
  routes: [
    {
      method: "GET",
      path: "/ressources/akinator",
      handler: "ressource.akinator",
    },
    {
      method: "PUT",
      path: "/ressources/updateStatus",
      handler: "ressource.updateStatus",
    },
  ],
};
