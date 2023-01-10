// Definition des variables
const affichageBonnesLettres = document.getElementById('mots');
const mauvaiseLettres = document.querySelector('.lettreErronees');
const btnVerifier = document.getElementById('verifier');
const dessin = document.querySelectorAll('.dessin-bonhomme');
const notification = document.querySelector('.gagne');
const zoneSaisie =document.getElementById('zoneSaisie');
const btnRejouer = document.querySelector('#btn-rejouer');
const motADeviner = ['guinee','devellopement','believemy','programmation','javascript','france'];


// Selectionner un mot dans le tableau

let motSelectionne = motADeviner[Math.floor(Math.random() * motADeviner.length)];
console.log(motSelectionne);

const tableauDeBonnesLettres = [];
const tableauDeMauvaisesLettres = [];
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
    if(motAfficher === motSelectionne){
        notification.innerText = 'Bravo, vous avez gagné !';
        notification.style.display = "block";
        notification.style.transition = 'all 0.3 ease-in-out';
        btnRejouer.style.display = "block";
        zoneSaisie.setAttribute('disabled',true);
    }else{
        notification.style.display='none';
    } 
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
    if(tableauDeMauvaisesLettres.length === dessin.length){
        document.querySelector('.gagne').innerText = "Désolé, vous avez perdu !";
        document.querySelector('.gagne').style.display = "block";
        btnRejouer.style.display = "block";
        zoneSaisie.setAttribute('disabled',true);
    }
}

// Ajouter des évènements
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const laLettre = e.key;

        if(motSelectionne.includes(laLettre)) {

            if( !tableauDeBonnesLettres.includes(laLettre)){

                tableauDeBonnesLettres.push(laLettre);
                afficherMot();
            }else{

                notification.style.display="block";
                notification.innerText = 'Vous avez déjà essayé cette lettre !';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 5000);
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

// Redémarrer le jeu
btnRejouer.addEventListener('click', () => {
    tableauDeBonnesLettres.splice(0);
    tableauDeMauvaisesLettres.splice(0);
    motSelectionne = motADeviner[Math.floor(Math.random() * motADeviner.length)];
    zoneSaisie.value = "";
    zoneSaisie.removeAttribute('disabled');
    zoneSaisie.focus();
    mauvaiseLettres.innerText = "";
    btnRejouer.style.display = "none";
    dessin.forEach(el => el.style.display = "none");
    afficherMot();
    //miseAJourMauvaisesLettres();
    document.querySelector('.gagne').style.display = 'none';
    console.log(motSelectionne);
});
afficherMot();