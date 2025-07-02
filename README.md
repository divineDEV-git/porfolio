# Portfolio Meli Fouomene Divine

Un portfolio moderne et responsive pour Meli Fouomene Divine, développeuse en génie logiciel.

## 🚀 Fonctionnalités

- ✨ Design moderne et épuré avec palette de couleurs élégante
- 📱 Entièrement responsive (mobile, tablette, desktop)
- 🎨 Animations fluides et micro-interactions
- 📝 Formulaire de contact fonctionnel
- 🔗 Liens vers les réseaux sociaux
- 📊 Visualisation des compétences techniques
- 🎯 Galerie de projets avec descriptions détaillées
- ⚡ Performance optimisée avec React et Vite

## 🛠 Technologies utilisées

- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Vite** pour le bundling
- **Google Fonts (Inter)** pour la typographie

## 📦 Installation

1. Clonez le repository :
```bash
git clone [votre-repo-url]
cd portfolio-meli-divine
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur sur `http://localhost:5173`

## 🏗 Build et déploiement

### Build de production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Déploiement

#### Netlify (Recommandé)

1. Connectez votre repository GitHub à Netlify
2. Configurez les paramètres de build :
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Déployez automatiquement à chaque push

#### Vercel

1. Connectez votre repository à Vercel
2. Vercel détectera automatiquement la configuration Vite
3. Déployez en un clic

#### GitHub Pages

1. Installez `gh-pages` :
```bash
npm install --save-dev gh-pages
```

2. Ajoutez dans `package.json` :
```json
{
  "homepage": "https://[votre-username].github.io/[nom-du-repo]",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Déployez :
```bash
npm run deploy
```

## 🎨 Personnalisation

### Couleurs

Les couleurs principales sont définies dans Tailwind CSS :
- **Primaire:** Bleu (#3b82f6)
- **Secondaire:** Violet (#7c3aed)
- **Accent:** Dégradés personnalisés

### Contenu

Pour personnaliser le contenu :

1. **Informations personnelles:** Modifiez les données dans `src/App.tsx`
2. **Projets:** Mettez à jour le tableau `projects`
3. **Compétences:** Modifiez le tableau `skills`
4. **Images:** Remplacez les URLs d'images Pexels par vos propres images

### Formulaire de contact

Le formulaire est actuellement configuré pour afficher une alerte. Pour une intégration réelle :

1. **Netlify Forms:** Ajoutez `netlify` et `name="contact"` au formulaire
2. **EmailJS:** Intégrez EmailJS pour l'envoi d'emails
3. **API personnalisée:** Créez votre propre endpoint

## 📱 Responsive Design

Le portfolio est optimisé pour :
- **Mobile:** < 768px
- **Tablette:** 768px - 1024px
- **Desktop:** > 1024px

## 🔧 Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation de la build
- `npm run lint` - Vérification du code avec ESLint

## 📧 Contact

Pour toute question ou collaboration :
- **Email:** m.f.divine2@gmail.com
- **LinkedIn:** [Profil LinkedIn]
- **GitHub:** [Profil GitHub]

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

Créé avec ❤️ par Meli Fouomene Divine