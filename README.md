# ProjetSMS
Implementation d'une plateforme d'envoi des SMS pour permettre à l'utilisateur d'enregistrer ses contacts, envoyer des messages à partir des numéros de téléphone ou des contacts enregistrés.

# Documentations Officiel
1) AngularJS: https://angular.io/start
2) ExpressJS: https://expressjs.com
3) NodeJS: https://nodejs.org/docs/latest-v16.x/api/

# l'API d'envoie des messages (Email, whatsapp, sms)
Az sms proxy: https://asap-desk.com/apidocs/index.html#api-EMAIL-createShortMessageFromGet

# Lien du design(Figma) Frontend
Figma: https://www.figma.com/team_invite/redeem/ctcgESwUELAyde6cU0Blzs

# Structure du repository

Backend (NodeJs, ExpressJS)

    |____API
        |____config
                |____.env: Contient les données d'environements
        |____Controllers: Contient les fonctions associés a chaque modèle de la BD
                |____ContactController.js
        |____Routes: Contient les defintions de routes vers les endpoints des controlleurs
                |____contact.js
        |____server.js: Le fichier principale de l'api
    |____Database
        |____Models
        |____index.js

Documentation

    |____angular7_tutorial.pdf
    |____express-handbook.pdf
    |____Projet 4GI ENSPY 2022-2023.pdf
    |____nodejs_tutorial.pdf

Frontend (En AngularJS)

    |____projet-sms
            |____src
                    |____app: Composant racine du projet
                    |____assets
                            |____Images
                    |____Components: Contient toutes les composants necessaire pour réaliser les interfaces principales
                    |____Directives: Contient toutes les directives customizé au projet
                    |____Modules: Contient toutes les modules associés au projet 
                    |____Pipes: Contient toutes les pipe customizé au projet
                    |____Routes: Contient toutes les interfaces principales
                            |____contacts-page
                            |____forgot-password-page
                            |____import-contacts-page
                            |____login-page
                            |____messages-page
                            |____save-contacts-page
                            |____send-sms-page
                            |____signin-page
                    |____Services: Contient toutes les services associés au projet
            |____index.ts
            |____main.ts
            |____styles.css

# Guide de Presentation du projet

Le dépot est organisé selon plusieurs branches. Le nom d'une branche correspond au nom de la personne qui a manipulé le code présent sur cette branche:

1- la branche 'main' qui est la principale branche contenant le code final

2- la branche 'alfred' correspondant à ALFRED

3- la branche 'azoa' correspondant à AZOA

4- la branche 'vicky' correspondant à ZIINAM

5- la branche 'anzie' correspondant à ANZIE (le repo du projet final)

6- la branche 'amanda' correspondant à DJEUNNANG

7- la branche 'afane' correspondant à AFANE

8- la branche 'Hervézor' correspondant à DJOMGUEM

9- la branche 'leprodige' correspondant à ADZABA
