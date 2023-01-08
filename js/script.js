// Definition des variables
const affichageBonnesLettres = document.getElementById('mots');
const mauvaiseLettres = document.querySelector('.lettreErronees');
const btnVerifier = document.getElementById('verifier');
const dessin = document.querySelectorAll('.dessin-bonhomme');
const notification = document.querySelector('.gagne');
const btnRejouer = document.querySelector('#btn-rejouer');
const motADeviner = ['guinee','devellopement','believemy','programmation','javascript','france'];
const tableauDeBonnesLettres = [];
const tableauDeMauvaisesLettres = [];

// Selectionner un mot dans le tableau

let motSelectionne = motADeviner[Math.floor(Math.random() * motADeviner.length)];
console.log(motSelectionne);
// Afficher le mot

function afficherMot() {
    affichageBonnesLettres.innerHTML = `
        ${motSelectionne
            .split('')
            .map(lettre => `<span class="lettre">${tableauDeBonnesLettres.includes(lettre) ? lettre : ''}</span>`)
            .join('')
        }
    `;
    
    //Supprimer les espaces dans le mot affiché.
    const motAfficher = affichageBonnesLettres.innerText.replace(/\n/g, '');
    console.log(affichageBonnesLettres.innerText, motAfficher);

    //Verifier si le mot afficher correspond au mot selectionné
    if(motAfficher == motSelectionne){
        notification.innerText = 'Bravo, vous avez gagné !';
        notification.style.transition = 'transfor 0.3 ease-in-out';
    }else{
        notification.style.display='none';
    }

    // Afficher les mauvaises lettres
    function miseAJourMauvaisesLettres(){
        // Afficher les mauvaise lettres
        mauvaiseLettres.innerHTML = `
            ${tableauDeMauvaisesLettres.map(lettre => `<span>${lettre}</span>`)}
        `;

        // Afficher le corps
        dessin.forEach((partieDuCorps, index) => {
            const nbErreurs = tableauDeMauvaisesLettres.length;

            if(index < nbErreurs){
                partieDuCorps.style.display = "block";
            }else{
                partieDuCorps.style.display = "none";
            }
        });

        // Vérifier si on a perdu
        if(tableauDeMauvaisesLettres.length == partieDuCorps.length){
            document.querySelector('.gagne-phase').innerHTML = "Désolé, vous avez perdu !";
            notification.style.display = "block";
            btnRejouer.style.display = "block";
        }
    }

    // Ajouter des évènements
    window.addEventListener('keyup', e => {
        if(e.keyCode >= 65 && e.keyCode <= 90) {
            const laLettre = e.key;

            if(motSelectionne.includes(laLettre)) {

                if(!tableauDeBonnesLettres.includes(laLettre)){

                    tableauDeBonnesLettres.push(laLettre);
                    afficherMot();
                }else{
                    
                    notification.style.display="block";
                    notification.innerText = 'Vous avez déjà essayé cette lettre !';
                    setTimeout(() => {
                        notification.style.display = 'none';
                    }, 2000);
                }
            }else{

                if(!tableauDeMauvaisesLettres.includes(laLettre)){
                    tableauDeMauvaisesLettres.push(laLettre);

                    miseAJourMauvaisesLettres();
                }else{
                    //affichierNotification();
                }
            }
        }
    });
}

// Redémarrer le jeu
btnRejouer.addEventListener('click', () => {
    tableauDeBonnesLettres.slice(0);
    tableauDeMauvaisesLettres.slice(0);
    motSelectionne = motADeviner[Math.floor(Math.random() * motADeviner.length)];
    afficherMot();
    miseAJourMauvaisesLettres();
    notification.style.display = 'none';
});
afficherMot();