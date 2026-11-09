import { DisasterProfile } from '../types/montage';

export const DISASTERS: DisasterProfile[] = [
  {
    id: 'montagne-pelee-1902',
    title: 'Éruption de la Montagne Pelée',
    frenchTitle: '1902 : Le Souffle de Feu de la Montagne Pelée',
    date: '8 mai 1902',
    location: 'Saint-Pierre, Martinique (Antilles françaises)',
    type: 'Éruption Volcanique Explosive (Nuée Ardente)',
    deathToll: '~30 000 victimes',
    vei: 'VEI 4 (Indice d’explosivité volcanique)',
    summaryFr:
      "Le 8 mai 1902, la ville de Saint-Pierre en Martinique, surnommée « le Petit Paris des Antilles », est anéantie en moins de trois minutes par une nuée ardente dévastatrice émanant de la Montagne Pelée. C'est la catastrophe volcanique la plus meurtrière du XXe siècle.",
    scenes: [
      {
        id: 'scene-1',
        order: 1,
        title: 'Le Petit Paris des Antilles',
        subtitle: 'Saint-Pierre à l’aube du drame',
        timestampDisplay: 'Mai 1902 · Rade de Saint-Pierre',
        duration: 11,
        image: '/src/assets/images/pelee_calm_bay_1794264147876.jpg',
        animation: 'pan-right',
        shakeIntensity: 'none',
        soundMood: 'calm-port',
        narrationFr:
          'Au début de mai 1902, Saint-Pierre est le joyau flamboyant de la Martinique. Plus de trente mille âmes s’affairent dans ses théâtres, ses marchés parfumés et sa rade bordée de voiliers du monde entier. Pourtant, dans l’ombre des brumes caribéennes, la Montagne Pelée commence à gronder.',
        subtitles: [
          { id: 'sub-1-1', start: 0, end: 3.5, text: 'Au début de mai 1902, Saint-Pierre est le joyau flamboyant de la Martinique.' },
          { id: 'sub-1-2', start: 3.6, end: 7.2, text: 'Plus de trente mille âmes s’affairent dans ses théâtres et sa rade encombrée de navires.' },
          { id: 'sub-1-3', start: 7.3, end: 11, text: 'Mais au-dessus des toits, le géant endormi commence son sinistre éveil.' }
        ],
        historicalFact:
          'Saint-Pierre comptait un tramway à traction hippomobile, une chambre de commerce prestigieuse et un grand théâtre à l’italienne réplique de celui de Bordeaux.',
        eyewitnessQuote: {
          author: 'Témoignage d’époque',
          role: 'Journal Les Colonies, 3 mai 1902',
          text: 'Une fine pluie de cendres grises recouvre les chapeaux des dames et les chevaux des attelages. L’air prend une saveur âcre de soufre.'
        }
      },
      {
        id: 'scene-2',
        order: 2,
        title: 'L’Aube Apocalyptique',
        subtitle: '07h52 : La montagne s’embrase',
        timestampDisplay: '8 Mai 1902 · 07:52',
        duration: 12,
        image: '/src/assets/images/pelee_eruption_cloud_1794264148353.jpg',
        animation: 'zoom-in',
        shakeIntensity: 'light',
        soundMood: 'warning-rumble',
        narrationFr:
          'Le 8 mai, à 7 heures 52 précises, l’horloge de l’hôpital militaire s’arrête pour l’éternité. Dans une détonation sourde entendue jusqu’au Venezuela, le dôme de lave explose. Une colonne d’asphalte, de pierres et de foudre volcanique s’élève à plus de quinze kilomètres dans la stratosphère.',
        subtitles: [
          { id: 'sub-2-1', start: 0, end: 3.8, text: 'Le 8 mai, à 7 heures 52 précises, le flanc de la montagne se déchire avec violence.' },
          { id: 'sub-2-2', start: 3.9, end: 7.8, text: 'Un panache colossal d’ash et d’éclairs volcaniques transperce la stratosphère.' },
          { id: 'sub-2-3', start: 7.9, end: 12, text: 'Le ciel s’obscurcit en plein jour sous une muraille d’ébène et de foudre.' }
        ],
        historicalFact:
          'L’énergie libérée lors de la déflagration initiale est estimée à l’équivalent de plusieurs dizaines de bombes d’Hiroshima, pulvérisant la roche en poussière microscopique.',
        eyewitnessQuote: {
          author: 'Capitaine Freeman',
          role: 'Commandant du vapeur Roddam',
          text: 'La montagne semblait avoir été littéralement sciée en deux. Des gerbes d’étincelles incandescentes balayaient l’horizon.'
        }
      },
      {
        id: 'scene-3',
        order: 3,
        title: 'La Nuée Ardente',
        subtitle: '500 km/h d’ouragan incandescent',
        timestampDisplay: '8 Mai 1902 · 07:53 - 07:55',
        duration: 13,
        image: '/src/assets/images/pelee_nuee_ardente_1794264149243.jpg',
        animation: 'zoom-in',
        shakeIntensity: 'intense',
        soundMood: 'cataclysm-explosion',
        narrationFr:
          'Ce n’est pas de la lave liquide qui dévale les pentes, mais une émulsion terrifiante de gaz à plus de mille degrés et de fragments de magma. La nuée ardente, bête aveugle de 500 kilomètres par heure, balaie tout sur son passage. En deux minutes, les édifices sont rasés, la rade prend feu et la mer entre en ébullition.',
        subtitles: [
          { id: 'sub-3-1', start: 0, end: 4.2, text: 'Un rouleau compresseur de gaz à mille degrés dévale les ravines à 500 km/h.' },
          { id: 'sub-3-2', start: 4.3, end: 8.4, text: 'Les navires au mouillage chavirent, l’eau de mer se met à bouillir instantanément.' },
          { id: 'sub-3-3', start: 8.5, end: 13, text: 'Trente mille existences sont soufflées comme de vulgaires fétus de paille.' }
        ],
        historicalFact:
          'Le phénomène de « nuée ardente » (pyroclastic surge) a été scientifiquement théorisé pour la première fois par le géologue français Alfred Lacroix suite à cette tragédie.',
        eyewitnessQuote: {
          author: 'Matelot du Roraima',
          role: 'Témoin rescapé en mer',
          text: 'Une tempête de flammes et de décombres s’est abattue sur nous. Il n’y avait nulle part où respirer, l’air lui-même brûlait nos poitrines.'
        }
      },
      {
        id: 'scene-4',
        order: 4,
        title: 'Le Silence et la Cendre',
        subtitle: 'Pompéi moderne & Le Survivant du Cachot',
        timestampDisplay: '11 Mai 1902 · Les Décombres',
        duration: 12,
        image: '/src/assets/images/pelee_aftermath_ruins_1794264148815.jpg',
        animation: 'zoom-out',
        shakeIntensity: 'none',
        soundMood: 'eerie-silence',
        narrationFr:
          'Quand la fumée se dissipe enfin, Saint-Pierre n’est plus qu’un sépulcre de calcaire et de cendre. Au milieu de ce champ de désolation, un miracle survient : Louis-Auguste Cyparis, prisonnier enfermé dans un cachot sans fenêtre, survit protégé par l’épaisseur de la pierre. La science moderne de la volcanologie venait de naître dans la douleur.',
        subtitles: [
          { id: 'sub-4-1', start: 0, end: 3.8, text: 'Saint-Pierre est devenue une nécropole silencieuse, figée sous un linceul gris.' },
          { id: 'sub-4-2', start: 3.9, end: 7.9, text: 'Dans les entrailles de la prison, Louis-Auguste Cyparis échappe miraculeusement à la mort.' },
          { id: 'sub-4-3', start: 8.0, end: 12, text: 'De ce tombeau antillais naîtra la volcanologie moderne pour protéger les générations futures.' }
        ],
        historicalFact:
          'Cyparis a été gracié par le gouverneur et a ensuite rejoint le cirque américain Barnum & Bailey, où il montrait ses cicatrices et contait son calvaire.',
        eyewitnessQuote: {
          author: 'Louis-Auguste Cyparis',
          role: 'Unique survivant du cœur de la ville',
          text: 'J’ai entendu un grand cri venant de dehors, puis une chaleur atroce est entrée par la fente d’aération. J’ai prié jusqu’à ce que le monde se taise.'
        }
      }
    ]
  }
];

export const HISTORICAL_CHRONOLOGY = [
  {
    time: '23 Avril 1902',
    title: 'Les Premiers Signaux d’Alarme',
    description: 'De légères secousses sismiques réveillent la ville. Le cratère supérieur de l’Étang Sec projette des fumerolles d’hydrogène sulfuré et des cendres fines.'
  },
  {
    time: '2 Mai 1902',
    title: 'Pluie de Cendres & Exode Animal',
    description: 'Une pluie dense de débris volcaniques recouvre la campagne. Des milliers de serpents fer-de-lance et d’insectes venimeux fuient les pentes pour envahir la ville.'
  },
  {
    time: '5 Mai 1902',
    title: 'Le Lahar Dévastateur de l’Usine Guérin',
    description: 'Une coulée de boue brûlante (lahar) submerge l’usine sucrière Guérin, causant la mort de 30 personnes et créant un premier raz-de-marée dans la rade.'
  },
  {
    time: '8 Mai 1902 · 07:50',
    title: 'Rupture Télégraphique',
    description: 'Le câble sous-marin reliant la Martinique à Fort-de-France et Sainte-Lucie est soudainement cisaillé par un glissement de terrain sous-marin.'
  },
  {
    time: '8 Mai 1902 · 07:52',
    title: 'L’Explosion Latérale Cataclysmique',
    description: 'Le bouchon de lave visqueux explose latéralement. Une nuée ardente de 100 000 tonnes de débris à 1050°C fond sur Saint-Pierre à la vitesse d’un avion de chasse.'
  },
  {
    time: '8 Mai 1902 · 07:55',
    title: 'Anéantissement Total',
    description: 'La ville entière est carbonisée. Les coques des navires dans la baie prennent feu spontanément. 28 000 à 30 000 personnes meurent asphyxiées et brûlées.'
  },
  {
    time: '11 Mai 1902',
    title: 'Le Sauvetage de Cyparis',
    description: 'Des sauveteurs de Fort-de-France entendent des gémissements sous les décombres de la prison : Louis-Auguste Cyparis est extrait vivant après trois jours d’agonie.'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "En quelle année s'est produite l'éruption destructrice de la Montagne Pelée à Saint-Pierre ?",
    options: ["1883", "1902", "1914", "1944"],
    correctAnswer: 1,
    explanation: "L'éruption a eu lieu le matin du 8 mai 1902, faisant environ 30 000 victimes en quelques minutes."
  },
  {
    id: 2,
    question: "Quel phénomène volcanique spécifique et meurtrier a anéanti la ville de Saint-Pierre ?",
    options: ["Une coulée de lave fluide basaltique", "Une nuée ardente (courant pyroclastique)", "Un glissement de terrain sous-marin pur", "Un feu de forêt généralisé"],
    correctAnswer: 1,
    explanation: "C'est une 'nuée ardente' (mélange de gaz surchauffés à plus de 1000°C, de cendres et de roches dévalant à plus de 400-500 km/h) qui a rasé la ville."
  },
  {
    id: 3,
    question: "Comment s'appelait le célèbre survivant retrouvé vivant dans son cachot souterrain ?",
    options: ["Alfred Lacroix", "Louis-Auguste Cyparis", "Aimé Césaire", "Victor Schœlcher"],
    correctAnswer: 1,
    explanation: "Louis-Auguste Cyparis était enfermé dans une cellule en pierre très épaisse aux murs massifs, ce qui l'a préservé de l'ouragan thermique fatal."
  },
  {
    id: 4,
    question: "Quel surnom donnait-on à la ville de Saint-Pierre avant la catastrophe ?",
    options: ["La Cité Éternelle", "Le Petit Paris des Antilles", "La Perle de l'Atlantique", "L'Athènes Tropicale"],
    correctAnswer: 1,
    explanation: "Saint-Pierre était surnommée 'Le Petit Paris des Antilles' en raison de son théâtre, sa vie culturelle raffinée et son intense commerce maritime."
  }
];
