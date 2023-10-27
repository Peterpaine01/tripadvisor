document.addEventListener("DOMContentLoaded", () => {
  console.log("content loaded");

  //   -- Au clic n'importe où sur la page
  //   document.addEventListener("click", () => {
  //     console.log("clicked");
  //   });

  // --Au clic sur le bouton Connectez-vous--------------

  document.querySelector(".connectez-vous").addEventListener("click", () => {
    console.log("click connectez-vous button");

    // Cibler la modal (class modal) ajouter une classe CSS
    document.querySelector(".modal").classList.remove("hidden");
  });

  // --Au clic sur le bouton fermer de la modale --------------

  document.querySelector(".fa-xmark").addEventListener("click", () => {
    console.log("click display");

    document.querySelector(".modal").classList.add("hidden");
  });

  //   -- A la soumission du formulaire ---------------

  document
    .querySelector("#contact-form")
    .addEventListener("submit", async (event) => {
      console.log("submit");
      event.preventDefault();

      // Récupération des valeurs des inputs
      const firstname = document.querySelector("#firstname").value;
      const lastname = document.querySelector("#lastname").value;
      const email = document.querySelector("#email").value;
      const message = document.querySelector("#message").value;

      console.log({
        firstname,
        lastname,
        email,
        message,
      });

      // -- requête au back en local
      const response = await axios.post("http://localhost:3000/post", {
        firstname,
        lastname,
        email,
        message,
      });
      // -- Affichage de la response dans la console du navigateur
      console.log(response);
    });
});
