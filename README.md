# WeatherApp – Application météo (Front + Back)

WeatherApp est une application permettant d’ajouter des villes et d’afficher leurs conditions météorologiques en direct via l’API OpenWeatherMap.
Ce projet a été réalisé dans le cadre de mon apprentissage du JavaScript, puis légèrement amélioré pour être intégré dans mon portfolio et déployé entièrement sur Vercel (frontend + backend).

## Fonctionnalités

### Frontend:
- Recherche et ajout de villes : Affichage des informations météo en temps réel (températures, conditions, icône associée).
- Suppression d’une ville : Une carte météo peut être supprimée de la base MongoDB en un clic.
- Affichage visuel dynamique : Icônes météo correspondant aux conditions actuelles (Clear, Clouds, Rain, Snow…).
- Persistance des données : Les villes ajoutées restent visibles même après un rechargement.
- Limite de 20 villes : Mise en place d’une règle pour éviter de surcharger une base de données publique. Une alerte élégante s’affiche lorsque la limite est atteinte ou lorsqu’une ville existe déjà.

### Backend:

- API REST en Node.js / Express
- Endpoints pour gérer les villes météo
- MongoDB + Mongoose pour stocker les villes ajoutées
- Connexion à l’API OpenWeatherMap
- Dotenv pour sécuriser la clé API
- Logique métier :
    * Vérification des doublons
    * Limite maximale de 20 villes
    * Vérification que la ville existe réellement via l’API
- Déploiement sur Vercel (serverless)


## Déploiement

Frontend : https://weather-app4-front-ten.vercel.app
Backend : https://weather-app4-back-ten.vercel.app/

## Stack technique

### Frontend :
- HTML5 / CSS3
- JavaScript vanilla (DOM, fetch, events)
- Hébergement : Vercel

### Backend :
- Node.js
- Express
- MongoDB + Mongoose
- OpenWeatherMap API
- Dotenv
- Hébergement : Vercel (API serverless)


## Structure du projet (extrait)
```
MyMoviz-Front/
├── index.html
├── script.js
├── style2.css
└── images/

WeatherApp4-Back/
├── app.js
├── models/
│   ├── cities.js
│   └── connection.js
├── routes/
│   ├── index.js
│   └── weather.js
└── .env
```

## Endpoints API
| Méthode    | Route            | Description                               |
| ---------- | ---------------- | ----------------------------------------- |
| **GET**    | `/weather`       | Récupère la liste des villes stockées     |
| **POST**   | `/weather`       | Ajoute une ville (si < 20, non dupliquée) |
| **DELETE** | `/weather/:city` | Supprime une ville                        |



## Installation & lancement en local

### Cloner les deux dépôts
```bash
git clone https://github.com/ElysaG/WeatherApp4-Front.git
git clone https://github.com/ElysaG/WeatherApp4-Back.git
```
### Backend — Installation & lancement
```bash
cd WeatherApp4-Back
npm install
npm run dev
```
Backend disponible sur : http://localhost:3000

Ajouter un fichier .env :
```bash
OWM_API_KEY=VOTRE_CLE
```

### Frontend — Installation & lancement
Ouvrir le dossier WeatherApp4-Front dans VS Code
→ clic droit sur index.html
→ Open with Live Server

Le frontend sera accessible via : http://127.0.0.1:5500/index.html 

## À propos
Ce projet a été réalisé dans le cadre de ma formation à La Capsule, dans le but de mettre en pratique la stack :
- la communication front/back avec fetch
- la manipulation du DOM sans framework
- la création d'une API Express
- la gestion de données avec MongoDB
- la consommation d’une API tierce (OpenWeatherMap)
- le déploiement full-stack sur Vercel

Il démontre ma capacité à coder une petite application full-stack simple, propre et déployée.

## Améliorations possibles

- Refonte UI encore plus cohérente (mode dark plus poussé, animations)
- Ajout de tests unitaires (Jest)
- Ajout d’un champ de recherche local (filtrage instantané)
- Optimisation des appels API (caching, refresh auto)
- Gestion d’erreurs enrichie pour l’API OpenWeatherMap






