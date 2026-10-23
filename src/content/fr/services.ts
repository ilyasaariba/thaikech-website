import type { ServiceCopy, ServiceId } from "../types";

// Links in the text use page keys, resolved per language by <RichText>:
// service:<id>, zone:<id>, guide:<id>, prices, duo, inRoom, hammam, charter…

export const servicesFr: Record<ServiceId, ServiceCopy> = {
  "massage-berbere": {
    slug: "massage-berbere-a-domicile-marrakech",
    name: "Massage Berbère Traditionnel",
    shortName: "massage berbère",
    summary:
      "Un massage enveloppant à l'huile d'argan : pressions glissées et étirements doux pour relâcher le corps et apaiser l'esprit.",
    imageAlt: "Table de massage dressée avec huile d'argan et serviettes dans un décor marocain",
    metaTitle: "Massage Marocain Berbère à Domicile à Marrakech",
    metaDescription:
      "Massage marocain relaxant à l'huile d'argan dans votre riad, villa ou hôtel à Marrakech. 1 h, 450 MAD, thérapeutes femmes, 8h–22h. Réservez sur WhatsApp.",
    h1: "Massage berbère à domicile à Marrakech",
    lead: [
      "Inspiré des gestes de bien-être marocains, le massage berbère est un massage relaxant qui associe l'huile d'argan à des pressions glissées et des étirements doux. C'est le soin idéal pour découvrir le massage marocain sans quitter votre riad, votre villa ou votre chambre d'hôtel.",
      "Votre thérapeute arrive avec la table de massage, les huiles et les serviettes, installe l'espace et vous laisse profiter d'une heure de détente complète. Vous réglez après le soin.",
    ],
    idealFor: [
      "Un premier massage au Maroc, pour découvrir l'huile d'argan",
      "Une journée de visite dans les souks et la Médina",
      "Se remettre d'un long voyage",
      "Une détente globale, sans pression appuyée",
      "Un moment à deux, en [massage duo](duo) dans votre riad ou votre villa",
    ],
    steps: [
      {
        title: "Accueil et installation",
        text: "Votre thérapeute installe la table de massage dans la pièce de votre choix, prépare les huiles et les serviettes, puis vous demande vos zones de tension et la pression que vous aimez.",
      },
      {
        title: "Huile d'argan",
        text: "L'huile d'argan est appliquée sur l'ensemble du corps : elle nourrit la peau et permet des gestes longs et fluides.",
      },
      {
        title: "Pressions glissées et étirements doux",
        text: "Le massage alterne mouvements enveloppants, pressions sur le dos, les épaules et les jambes, et étirements légers pour relâcher les tensions.",
      },
      {
        title: "Retour au calme",
        text: "Le soin se termine en douceur. Prenez quelques minutes avant de vous relever et buvez un verre d'eau.",
      },
    ],
    sections: [
      {
        heading: "Qu'est-ce que le massage berbère ?",
        blocks: [
          "Au Maroc, les soins du corps sont liés à la tradition du hammam, où le gommage et le massage à l'huile se transmettent de génération en génération. Le massage berbère s'inspire de ces gestes : des mouvements amples et enveloppants, réalisés avec de l'huile d'argan, l'huile emblématique du Sud marocain.",
          "Chez Thai Kech, il dure une heure et se concentre sur la détente : on ne cherche pas à travailler un muscle en profondeur, comme dans un [massage sportif](service:massage-sportif), mais à relâcher l'ensemble du corps.",
        ],
      },
      {
        heading: "L'huile d'argan, au cœur du soin",
        blocks: [
          "L'huile d'argan est extraite des amandons de l'arganier, un arbre qui pousse dans le Sud-Ouest du Maroc. Riche en acides gras et en vitamine E, elle est utilisée depuis longtemps pour nourrir la peau et les cheveux.",
          {
            note: "Vous êtes allergique aux fruits à coque ou vous avez la peau réactive ? Dites-le au moment de la réservation pour que nous en tenions compte.",
          },
        ],
      },
      {
        heading: "Massage berbère ou massage thaï ?",
        blocks: [
          "Le massage berbère est fluide et enveloppant, idéal pour se détendre. Le [massage thaï](service:massage-thai) repose davantage sur des pressions ciblées et des étirements, avec des serviettes chaudes. Vous hésitez ? Lisez notre guide [massage berbère ou thaï : lequel choisir](guide:berber-or-thai), ou laissez-nous vous conseiller sur WhatsApp.",
        ],
      },
    ],
    precautions: [
      "Évitez le massage en cas de fièvre, d'infection, de plaie ouverte ou de coup de soleil important.",
      "Si vous êtes enceinte, choisissez notre [massage femme enceinte](service:massage-future-maman), adapté à la grossesse.",
      "En cas de problème de santé (circulation, cœur, opération récente), demandez l'avis de votre médecin avant de réserver.",
      "Signalez toute allergie, notamment aux fruits à coque.",
    ],
    faqs: [
      {
        q: "Combien coûte un massage berbère à domicile à Marrakech ?",
        a: "Le Massage Berbère Traditionnel coûte 450 MAD pour 1 heure. Le déplacement est offert dans toute la région de Marrakech. Retrouvez tous nos prix sur la page [tarifs](prices).",
      },
      {
        q: "Faut-il préparer quelque chose avant l'arrivée de la thérapeute ?",
        a: "Non : la thérapeute apporte la table, l'huile d'argan et les serviettes. Il suffit d'une pièce calme avec assez de place pour installer la table. Une douche avant le soin est agréable, mais pas obligatoire.",
      },
      {
        q: "Peut-on réserver un massage berbère pour deux personnes ?",
        a: "Oui. Deux thérapeutes peuvent venir en même temps pour un [massage en duo](duo) : chaque personne profite de son soin, côte à côte.",
      },
      {
        q: "Le massage berbère est-il un massage sensuel ?",
        a: "Non. Thai Kech propose uniquement des soins bien-être professionnels et non sensuels, réalisés par des thérapeutes femmes. Toute demande à caractère sensuel est refusée. Voir notre [charte qualité](charter).",
      },
      {
        q: "Combien de temps à l'avance faut-il réserver ?",
        a: "Nous recommandons de réserver au moins 2 heures à l'avance. Nous intervenons tous les jours de 8h à 22h et faisons de notre mieux pour les demandes de dernière minute.",
      },
    ],
  },

  "massage-sportif": {
    slug: "massage-sportif-a-domicile-marrakech",
    name: "Massage Sportif Récupération",
    shortName: "massage sportif",
    summary:
      "Un massage profond et tonique qui cible les tensions musculaires, pour retrouver de la souplesse après l'effort.",
    imageAlt: "Table de massage avec huile et pierres, prête pour un massage sportif",
    metaTitle: "Massage Sportif à Domicile à Marrakech – 500 MAD",
    metaDescription:
      "Massage sportif et récupération à domicile à Marrakech, après un trek dans l'Atlas, un golf ou le sport. 1 h, 500 MAD, dans votre riad, villa ou hôtel.",
    h1: "Massage sportif à domicile à Marrakech",
    lead: [
      "Randonnée dans l'Atlas, parcours de golf, journée de marche dans la Médina ou séance de sport : le massage sportif Thai Kech aide votre corps à récupérer. Proche du massage deep tissue, il utilise des pressions plus profondes et des mouvements toniques qui ciblent les zones tendues (jambes, dos, épaules) pour relâcher les muscles et retrouver de la souplesse.",
      "Le soin dure une heure et se déroule chez vous, dans votre riad, votre villa ou votre chambre d'hôtel. Pas de trajet après l'effort : vous restez au calme.",
    ],
    idealFor: [
      "Après un [trek au Toubkal](guide:atlas-trek-recovery) ou une randonnée dans l'Atlas",
      "Après un parcours de golf, une sortie à vélo ou une séance de sport",
      "Des jambes lourdes après une journée de visite à pied",
      "Des tensions dans le dos et les épaules après un long vol",
      "Les personnes qui aiment une pression ferme",
    ],
    steps: [
      {
        title: "Point sur vos besoins",
        text: "Votre thérapeute vous demande quel effort vous avez fait, où vous ressentez des tensions et quelle pression vous convient.",
      },
      {
        title: "Préparation des muscles",
        text: "Des mouvements larges préparent les muscles et réchauffent les zones à travailler.",
      },
      {
        title: "Travail ciblé",
        text: "Pressions plus profondes et pétrissage sur les jambes, le dos et les épaules, avec une intensité adaptée à vos sensations.",
      },
      {
        title: "Étirements et retour au calme",
        text: "Quelques étirements et des gestes plus lents terminent le soin. Pensez à bien vous hydrater ensuite.",
      },
    ],
    sections: [
      {
        heading: "Quand faire un massage sportif ?",
        blocks: [
          "Juste après un effort intense, les muscles sont souvent sensibles : laissez passer quelques heures, prenez une douche et hydratez-vous. Beaucoup préfèrent le soir même ou le lendemain d'une randonnée, quand les courbatures se font sentir.",
          "Avant une activité, un massage plus léger et dynamique peut aider à se sentir prêt : dites-le simplement à votre thérapeute.",
        ],
      },
      {
        heading: "Récupérer après l'Atlas et le Toubkal",
        blocks: [
          "Marrakech est le point de départ de nombreuses randonnées dans le Haut Atlas, dont l'ascension du Toubkal (4 167 m), le plus haut sommet d'Afrique du Nord. Les descentes sollicitent fortement les cuisses et les mollets.",
          "Réservez votre massage pour le soir de votre retour à Marrakech ou pour le lendemain. Notre guide [massage de récupération après le Toubkal](guide:atlas-trek-recovery) détaille les bons réflexes.",
        ],
      },
      {
        heading: "Une pression ferme, jamais douloureuse",
        blocks: [
          "Un massage sportif peut être intense, mais il ne doit pas faire mal. Signalez à tout moment si la pression est trop forte : votre thérapeute l'ajuste immédiatement.",
          "Vous cherchez plutôt une détente globale ? Choisissez le [massage berbère](service:massage-berbere) ou le [massage thaï aux serviettes chaudes](service:massage-thai).",
        ],
      },
    ],
    precautions: [
      "Pas de massage sur une blessure récente, une entorse, une déchirure ou une zone enflée : consultez d'abord un médecin.",
      "Évitez le soin en cas de fièvre, d'infection ou de coup de soleil.",
      "En cas de problème circulatoire ou cardiaque, ou d'opération récente, demandez l'avis de votre médecin.",
      "Signalez toute douleur inhabituelle pendant le soin.",
    ],
    faqs: [
      {
        q: "Quel est le prix d'un massage sportif à domicile à Marrakech ?",
        a: "Le Massage Sportif Récupération coûte 500 MAD pour 1 heure, déplacement offert dans toute la région de Marrakech. Tous les prix sont sur la page [tarifs](prices).",
      },
      {
        q: "Le massage sportif est-il douloureux ?",
        a: "Il est plus appuyé qu'un massage relaxant, mais il ne doit pas être douloureux. Vous pouvez demander à tout moment d'adoucir la pression.",
      },
      {
        q: "Puis-je réserver le jour même, après une randonnée ?",
        a: "Oui, selon les disponibilités, tous les jours de 8h à 22h. Idéalement, réservez au moins 2 heures à l'avance avec le formulaire ou sur WhatsApp.",
      },
      {
        q: "Comment dois-je être installé(e) ?",
        a: "Votre thérapeute vous explique comment vous installer. Les zones qui ne sont pas massées restent couvertes par une serviette.",
      },
      {
        q: "Massage sportif ou massage à 4 mains ?",
        a: "Le massage sportif cible la récupération musculaire, avec une thérapeute. Le [massage à 4 mains](service:massage-4-mains) mobilise deux thérapeutes en même temps pour une détente plus enveloppante.",
      },
    ],
  },

  "massage-thai": {
    slug: "massage-thai-a-domicile-marrakech",
    name: "Massage Thaï Impérial & Serviettes Chaudes",
    shortName: "massage thaï",
    summary:
      "Pressions ciblées et étirements inspirés du Nuad Boran, associés à des serviettes chaudes pour dénouer les tensions.",
    imageAlt: "Thérapeute réalisant un étirement de la jambe pendant un massage thaï",
    metaTitle: "Massage Thaïlandais à Domicile à Marrakech",
    metaDescription:
      "Massage thaï impérial à domicile à Marrakech : pressions, étirements et serviettes chaudes, 1 h 15 pour 550 MAD. Dans votre riad, villa ou hôtel, 8h–22h.",
    h1: "Massage thaï à domicile à Marrakech",
    lead: [
      "Envie d'un massage thaïlandais sans traverser la ville jusqu'à un spa ? Notre Massage Thaï Impérial vient à vous. Il combine des pressions ciblées et des étirements inspirés du Nuad Boran, le massage traditionnel thaïlandais, avec des serviettes chaudes qui aident les muscles à se relâcher.",
      "Le soin dure 1 h 15. Il convient à celles et ceux qui aiment un massage actif, qui délie le dos, les hanches et les jambes tout en restant confortable.",
    ],
    idealFor: [
      "Un dos raide ou des épaules tendues",
      "Retrouver de la mobilité après une longue journée assise ou un vol",
      "Les amateurs d'étirements et de pressions ciblées",
      "Un soin plus long (1 h 15) pour prendre son temps",
    ],
    steps: [
      {
        title: "Échange avant le soin",
        text: "Votre thérapeute fait le point sur vos tensions et vos éventuelles douleurs, puis vous installe confortablement.",
      },
      {
        title: "Serviettes chaudes",
        text: "La chaleur des serviettes détend les zones tendues et prépare le corps aux pressions.",
      },
      {
        title: "Pressions et étirements",
        text: "Pressions le long des muscles et étirements doux inspirés du Nuad Boran, adaptés à votre souplesse.",
      },
      {
        title: "Relâchement final",
        text: "Le soin se termine par des gestes lents pour prolonger la détente.",
      },
    ],
    sections: [
      {
        heading: "Qu'est-ce que le Nuad Boran ?",
        blocks: [
          "Le Nuad Boran est le massage traditionnel de Thaïlande. Il repose sur des pressions avec les mains et sur des mobilisations qui étirent le corps, souvent comparées à une forme de yoga passif.",
          "Notre Massage Thaï Impérial s'en inspire et y ajoute des serviettes chaudes : un soin plus enveloppant, pensé pour la détente pendant votre séjour à Marrakech.",
        ],
      },
      {
        heading: "Massage thaï à domicile ou en spa ?",
        blocks: [
          "Marrakech compte plusieurs spas thaïs, surtout à Guéliz. Recevoir le soin chez vous évite le trajet, l'attente et le retour en taxi : vous restez détendu(e) jusqu'au bout, dans votre [riad de la Médina](zone:medina), votre [villa de la Palmeraie](zone:palmeraie) ou votre [hôtel de l'Hivernage](zone:hivernage).",
        ],
      },
      {
        heading: "Un massage actif, mais adapté",
        blocks: [
          "Les étirements sont toujours réalisés selon votre souplesse. Si vous préférez un massage plus doux et enveloppant, le [massage berbère à l'huile d'argan](service:massage-berbere) est une excellente alternative. Notre guide [massage berbère ou thaï](guide:berber-or-thai) vous aide à choisir.",
        ],
      },
    ],
    precautions: [
      "Signalez tout problème de dos, de hanche ou de genou, ou une opération récente : les étirements seront adaptés ou évités.",
      "Le massage thaï n'est pas conseillé pendant la grossesse : choisissez plutôt le [massage femme enceinte](service:massage-future-maman).",
      "Évitez le soin en cas de fièvre, d'infection ou de coup de soleil important.",
      "Si la chaleur des serviettes vous incommode, dites-le immédiatement.",
    ],
    faqs: [
      {
        q: "Combien coûte le massage thaï à domicile à Marrakech ?",
        a: "Le Massage Thaï Impérial & Serviettes Chaudes coûte 550 MAD pour 1 h 15, déplacement offert dans toute la région de Marrakech. Voir tous nos [tarifs](prices).",
      },
      {
        q: "Le massage thaï est-il douloureux ?",
        a: "Non. Les pressions peuvent être fermes et les étirements profonds, mais votre thérapeute s'adapte à votre souplesse et à vos sensations. Demandez plus ou moins de pression quand vous le souhaitez.",
      },
      {
        q: "Faut-il être souple pour un massage thaï ?",
        a: "Pas du tout. Les étirements sont progressifs et adaptés à chaque personne.",
      },
      {
        q: "Pouvons-nous réserver un massage thaï à deux ?",
        a: "Oui, deux thérapeutes peuvent venir en même temps. Découvrez le [massage en duo](duo).",
      },
    ],
  },

  "massage-future-maman": {
    slug: "massage-femme-enceinte-a-domicile-marrakech",
    name: "Massage Douceur Future Maman",
    shortName: "massage femme enceinte",
    summary:
      "Un massage enveloppant adapté à la grossesse, à l'huile d'argan neutre, pour soulager le bas du dos et se détendre.",
    imageAlt: "Chambre lumineuse avec lit, coussins et fleurs, préparée pour un massage de grossesse",
    metaTitle: "Massage Femme Enceinte à Domicile à Marrakech",
    metaDescription:
      "Massage prénatal à domicile à Marrakech : 1 h 30 de douceur à l'huile d'argan neutre pour la future maman, par nos thérapeutes femmes. 550 MAD, 8h–22h.",
    h1: "Massage femme enceinte à domicile à Marrakech",
    lead: [
      "Le Massage Douceur Future Maman est pensé pour les femmes enceintes en voyage ou en séjour à Marrakech. Des mouvements fluides et enveloppants, réalisés à l'huile d'argan neutre, aident à soulager les tensions du bas du dos et des jambes et offrent un vrai moment de calme.",
      "Il dure 1 h 30 et se déroule dans votre riad, votre villa ou votre hôtel, avec l'une de nos thérapeutes femmes. Pas de trajet ni de salle d'attente : vous restez installée confortablement.",
    ],
    idealFor: [
      "Le bas du dos et les jambes fatigués par la grossesse",
      "Un séjour à Marrakech pendant la grossesse, babymoon compris",
      "Un besoin de douceur plutôt que de pression",
      "Se reposer après une journée de visite, sans ressortir",
    ],
    steps: [
      {
        title: "Questions avant le soin",
        text: "Votre thérapeute vous demande où vous en êtes de votre grossesse, vos éventuelles contre-indications et les zones à soulager.",
      },
      {
        title: "Installation confortable",
        text: "Vous êtes installée dans une position confortable, le plus souvent allongée sur le côté et calée avec des coussins.",
      },
      {
        title: "Massage doux à l'huile d'argan neutre",
        text: "Des gestes lents et enveloppants sur le dos, les épaules, les jambes et les pieds, sans pression profonde.",
      },
      {
        title: "Temps de repos",
        text: "Prenez le temps de vous relever doucement et de boire un verre d'eau.",
      },
    ],
    sections: [
      {
        heading: "Un massage adapté à la grossesse",
        blocks: [
          "Pendant la grossesse, le corps change vite : poids du ventre, cambrure, jambes lourdes, nuits agitées. Un massage doux ne remplace pas un suivi médical, mais il peut aider à se détendre et à se sentir mieux dans son corps.",
          "Nous recommandons de demander l'avis de votre médecin ou de votre sage-femme avant de réserver, surtout au premier trimestre ou si votre grossesse fait l'objet d'un suivi particulier.",
        ],
      },
      {
        heading: "Pourquoi l'huile d'argan neutre ?",
        blocks: [
          "Pendant la grossesse, l'odorat est souvent plus sensible. L'huile d'argan neutre, sans parfum ajouté, nourrit la peau tout en restant douce.",
          "Dites-nous si certaines odeurs vous gênent : la thérapeute peut se passer du diffuseur d'huiles essentielles.",
        ],
      },
      {
        heading: "Hammam et grossesse",
        blocks: [
          "La chaleur et les gommages vigoureux ne sont pas toujours recommandés pendant la grossesse. Avant de réserver un [hammam à domicile](hammam), parlez-en à votre médecin ; en cas de doute, choisissez ce massage doux. Plus de conseils dans notre guide [massage et grossesse pendant un séjour à Marrakech](guide:pregnancy-travel).",
        ],
      },
    ],
    precautions: [
      "Demandez l'avis de votre médecin ou de votre sage-femme avant le soin, en particulier au premier trimestre.",
      "Pas de massage sans accord médical en cas de grossesse à risque, de saignements, de contractions, de fièvre ou de gonflement soudain des jambes.",
      "Signalez tout malaise pendant le soin : il est interrompu immédiatement.",
      "Hydratez-vous bien, surtout pendant les journées chaudes à Marrakech.",
    ],
    faqs: [
      {
        q: "À partir de quand peut-on se faire masser pendant la grossesse ?",
        a: "Beaucoup de professionnels conseillent d'attendre la fin du premier trimestre. Chaque grossesse est différente : demandez l'avis de votre médecin ou de votre sage-femme avant de réserver.",
      },
      {
        q: "Combien coûte le massage femme enceinte à domicile ?",
        a: "Le Massage Douceur Future Maman coûte 550 MAD pour 1 h 30, déplacement offert dans toute la région de Marrakech. Voir tous nos [tarifs](prices).",
      },
      {
        q: "Le massage est-il réalisé par une femme ?",
        a: "Oui. Tous nos soins sont réalisés par nos thérapeutes femmes.",
      },
      {
        q: "Mon conjoint peut-il profiter d'un massage en même temps ?",
        a: "Oui, deux thérapeutes peuvent venir ensemble : chacun profite de son soin, côte à côte. Voir le [massage en duo](duo).",
      },
      {
        q: "Faut-il prévoir quelque chose ?",
        a: "La thérapeute apporte la table, l'huile et les serviettes. Si vous avez des coussins supplémentaires, gardez-les à portée de main : ils aident à trouver une position confortable.",
      },
    ],
  },

  "massage-4-mains": {
    slug: "massage-4-mains-a-domicile-marrakech",
    name: "Massage Royal à 4 Mains",
    shortName: "massage à 4 mains",
    summary:
      "Deux thérapeutes, des gestes synchronisés : une expérience de lâcher-prise totale, dans votre riad ou votre villa.",
    imageAlt: "Deux paires de mains massant le dos d'une cliente pendant un massage à 4 mains",
    metaTitle: "Massage 4 Mains à Domicile, Marrakech – 650 MAD",
    metaDescription:
      "Massage royal à 4 mains à domicile à Marrakech : deux thérapeutes femmes, gestes synchronisés, 1 h 15 pour 650 MAD. Dans votre riad, villa ou hôtel, 8h–22h.",
    h1: "Massage à 4 mains à domicile à Marrakech",
    lead: [
      "Le Massage Royal à 4 Mains est notre soin le plus immersif : deux thérapeutes travaillent en même temps, avec des gestes synchronisés du dos jusqu'aux pieds. Impossible de suivre chaque mouvement, et c'est justement ce qui aide à lâcher prise.",
      "Il dure 1 h 15 et coûte 650 MAD, pour une personne massée par deux thérapeutes. C'est le cadeau idéal pour un anniversaire, une lune de miel ou un moment d'exception pendant votre séjour.",
    ],
    idealFor: [
      "Offrir un moment inoubliable : anniversaire, lune de miel, cadeau",
      "Les personnes qui ont du mal à décrocher pendant un massage classique",
      "Une détente profonde en un temps court",
      "Vivre une expérience de spa haut de gamme sans quitter votre villa",
    ],
    steps: [
      {
        title: "Installation par deux thérapeutes",
        text: "Les deux thérapeutes installent la table, les huiles et l'ambiance, puis font le point avec vous sur vos préférences.",
      },
      {
        title: "Mouvements en miroir",
        text: "Elles commencent par des gestes lents et symétriques, de chaque côté du corps, pour vous aider à vous relâcher.",
      },
      {
        title: "Chorégraphie synchronisée",
        text: "Dos, jambes, bras : les mouvements s'enchaînent en rythme, avec une pression enveloppante.",
      },
      {
        title: "Retour au calme",
        text: "Le soin ralentit progressivement jusqu'à l'immobilité, pour prolonger la sensation de détente.",
      },
    ],
    sections: [
      {
        heading: "Pourquoi un massage à 4 mains ?",
        blocks: [
          "Lors d'un massage classique, l'esprit suit le mouvement de deux mains. Avec quatre mains synchronisées, il ne peut plus anticiper chaque geste : beaucoup de personnes décrivent alors un lâcher-prise plus rapide et plus profond.",
        ],
      },
      {
        heading: "Massage à 4 mains ou massage en duo ?",
        blocks: [
          "Ne les confondez pas :",
          {
            list: [
              "**Massage à 4 mains** : une seule personne, massée par deux thérapeutes en même temps (650 MAD, 1 h 15).",
              "**Massage en duo** : deux personnes, chacune massée par sa thérapeute, côte à côte. Chacun choisit son soin, au prix affiché. Voir le [massage en duo](duo).",
            ],
          },
        ],
      },
      {
        heading: "Organisation à domicile",
        blocks: [
          "Comme ce soin mobilise deux thérapeutes, réservez-le de préférence à l'avance. Il se pratique dans toute pièce assez grande pour circuler autour de la table : chambre de riad, salon de villa ou suite d'hôtel.",
        ],
      },
    ],
    precautions: [
      "Évitez le soin en cas de fièvre, d'infection, de plaie ou de coup de soleil important.",
      "Pendant la grossesse, préférez notre [massage femme enceinte](service:massage-future-maman).",
      "En cas de problème de santé, demandez l'avis de votre médecin avant de réserver.",
    ],
    faqs: [
      {
        q: "Combien coûte un massage à 4 mains à domicile à Marrakech ?",
        a: "Le Massage Royal à 4 Mains coûte 650 MAD pour 1 h 15 avec deux thérapeutes, déplacement offert dans toute la région de Marrakech. Voir nos [tarifs](prices).",
      },
      {
        q: "Le massage à 4 mains est-il réalisé par deux femmes ?",
        a: "Oui, par deux de nos thérapeutes femmes.",
      },
      {
        q: "Peut-on réserver un massage à 4 mains à la dernière minute ?",
        a: "C'est parfois possible, mais comme le soin demande deux thérapeutes disponibles en même temps, nous conseillons de réserver au moins la veille.",
      },
      {
        q: "Peut-on offrir un massage à 4 mains ?",
        a: "Oui. Indiquez le nom de la personne et la date souhaitée dans le formulaire, puis précisez sur WhatsApp qu'il s'agit d'un cadeau.",
      },
    ],
  },

  "hammam-berbere": {
    slug: "hammam-berbere-a-domicile-marrakech",
    name: "Hammam Berbère Traditionnel",
    shortName: "hammam berbère",
    summary:
      "Savon noir à l'eucalyptus, gommage au gant de kessa, enveloppement au rassoul et modelage de 20 minutes à l'huile d'argan.",
    imageAlt: "Savon noir, gant de kessa et rassoul posés sur une table de hammam en marbre",
    metaTitle: "Hammam Berbère à Domicile, Marrakech – 550 MAD",
    metaDescription:
      "Hammam berbère à domicile à Marrakech : savon noir, gommage kessa, rassoul et modelage à l'argan. 1 h 15 pour 550 MAD, dans votre riad, villa ou hôtel.",
    h1: "Hammam berbère à domicile à Marrakech",
    lead: [
      "Le hammam est le rituel de beauté marocain par excellence. Avec le Hammam Berbère Traditionnel, il vient à vous : savon noir à l'eucalyptus, gommage vigoureux au gant de kessa, enveloppement au rassoul de l'Atlas, puis un modelage relaxant de 20 minutes à l'huile d'argan.",
      "Le soin dure 1 h 15. Il se déroule dans votre salle de bain ou dans le hammam privé de votre riad ou de votre villa, et laisse la peau nette, douce et nourrie.",
    ],
    idealFor: [
      "Découvrir le hammam marocain en toute intimité, sans aller dans un hammam public",
      "Une peau douce avant un événement ou en début de séjour",
      "Les riads et villas équipés d'un hammam privé",
      "Associer gommage et massage en un seul soin",
    ],
    steps: [
      {
        title: "Savon noir à l'eucalyptus",
        text: "Le savon noir, une pâte traditionnelle à base d'huile d'olive, est appliqué sur la peau humide et laissé poser quelques minutes.",
      },
      {
        title: "Gommage au gant de kessa",
        text: "Le gant de kessa élimine les peaux mortes par un gommage vigoureux, de la tête aux pieds.",
      },
      {
        title: "Enveloppement au rassoul",
        text: "Le rassoul (ou ghassoul), une argile naturelle extraite dans l'Atlas, est appliqué sur le corps puis rincé : il purifie et adoucit la peau.",
      },
      {
        title: "Modelage à l'huile d'argan (20 min)",
        text: "Après le rinçage, un modelage relaxant de 20 minutes à l'huile d'argan nourrit la peau et termine le rituel en douceur.",
      },
    ],
    sections: [
      {
        heading: "Comment se passe un hammam à domicile ?",
        blocks: [
          "Pas besoin de hammam vapeur. Le rituel se pratique dans le hammam privé de votre riad ou de votre villa s'il en a un, ou simplement dans une salle de bain avec douche et eau chaude pour les rinçages. Le modelage final se fait ensuite sur la table de massage.",
          "Nous vérifions l'espace avec vous sur WhatsApp au moment de la confirmation. Tous les détails dans notre guide [hammam à domicile : comment ça se passe](guide:hammam-at-home).",
        ],
      },
      {
        heading: "Hammam berbère ou hammam royal ?",
        blocks: [
          "Le Hammam Berbère est l'essentiel du rituel marocain, en 1 h 15. Le [Hammam Royal Éclat & Fleur d'Oranger](service:hammam-royal) va plus loin, en 1 h 30 : gommage aux cristaux de sel et fleur d'oranger, râpe des pieds et masque visage et corps à l'argan.",
        ],
      },
      {
        heading: "Après votre hammam",
        blocks: [
          {
            list: [
              "Buvez de l'eau : la chaleur et le gommage donnent soif.",
              "Évitez le soleil fort juste après le gommage : la peau est plus sensible.",
              "Évitez l'épilation juste avant ou juste après le gommage.",
            ],
          },
        ],
      },
    ],
    precautions: [
      "Pas de gommage sur un coup de soleil, une peau irritée, de l'eczéma en poussée ou une plaie.",
      "Si vous êtes enceinte, demandez l'avis de votre médecin ; en cas de doute, préférez le [massage femme enceinte](service:massage-future-maman).",
      "Signalez toute allergie (eucalyptus, argan, fruits à coque).",
      "Évitez l'épilation dans les 24 heures qui précèdent ou qui suivent le gommage.",
    ],
    faqs: [
      {
        q: "Faut-il avoir un hammam dans son riad pour réserver ?",
        a: "Non. Un hammam privé est un plus, mais une salle de bain avec douche et eau chaude suffit pour les rinçages. Nous vérifions l'espace avec vous lors de la confirmation sur WhatsApp.",
      },
      {
        q: "Combien coûte le hammam berbère à domicile ?",
        a: "Le Hammam Berbère Traditionnel coûte 550 MAD pour 1 h 15, modelage de 20 minutes compris, déplacement offert dans toute la région de Marrakech. Voir nos [tarifs](prices).",
      },
      {
        q: "Peut-on faire le hammam dans une chambre d'hôtel ?",
        a: "Oui, si la salle de bain dispose d'une douche. Selon l'établissement, prévenez la réception de la venue de votre thérapeute. Plus d'infos sur le [massage en chambre d'hôtel ou en riad](inRoom).",
      },
      {
        q: "Que faut-il porter pendant le hammam ?",
        a: "Un maillot de bain ou des sous-vêtements que vous ne craignez pas de mouiller. La thérapeute vous guide à chaque étape.",
      },
    ],
  },

  "hammam-royal": {
    slug: "hammam-royal-a-domicile-marrakech",
    name: "Hammam Royal Éclat & Fleur d'Oranger",
    shortName: "hammam royal",
    summary:
      "Gommage au savon noir, soin exfoliant aux cristaux de sel et fleur d'oranger, râpe des pieds et masque corps et visage à l'argan.",
    imageAlt: "Table de hammam en marbre avec aiguière en cuivre, huile d'argan et fleurs",
    metaTitle: "Hammam Royal à Domicile à Marrakech – 650 MAD",
    metaDescription:
      "Hammam royal à domicile à Marrakech : savon noir, sel et fleur d'oranger, râpe des pieds et masque à l'argan. 1 h 30 pour 650 MAD, dans votre riad ou villa.",
    h1: "Hammam royal à domicile à Marrakech",
    lead: [
      "Le Hammam Royal Éclat & Fleur d'Oranger est notre rituel de purification le plus complet. Il reprend les gestes du hammam marocain (savon noir et gommage) et y ajoute un soin exfoliant aux cristaux de sel et à la fleur d'oranger, une râpe des pieds et un masque sublimateur à l'argan pour le corps et le visage.",
      "En 1 h 30, dans votre riad, votre villa ou votre hôtel, c'est le soin idéal pour une peau éclatante avant une soirée, un mariage ou en fin de séjour.",
    ],
    idealFor: [
      "Préparer un événement : soirée, mariage, séance photo",
      "Un moment de beauté complet, du visage aux pieds",
      "Des pieds fatigués par les balades dans la Médina",
      "Offrir un rituel marocain haut de gamme",
    ],
    steps: [
      {
        title: "Savon noir et gommage",
        text: "Application du savon noir, puis gommage du corps pour éliminer les peaux mortes.",
      },
      {
        title: "Cristaux de sel et fleur d'oranger",
        text: "Un soin exfoliant aux cristaux de sel, parfumé à la fleur d'oranger et aux huiles essentielles, affine le grain de peau.",
      },
      {
        title: "Râpe des pieds",
        text: "Les talons et la plante des pieds sont lissés pour retrouver des pieds doux.",
      },
      {
        title: "Masque à l'argan corps et visage",
        text: "Un masque sublimateur à l'argan est appliqué sur le corps et le visage : la peau est nourrie et lumineuse.",
      },
    ],
    sections: [
      {
        heading: "La fleur d'oranger, un parfum du Maroc",
        blocks: [
          "L'eau de fleur d'oranger est omniprésente dans la tradition marocaine : on la retrouve dans les pâtisseries, les fêtes et les soins de beauté. Son parfum doux et frais signe ce rituel royal.",
        ],
      },
      {
        heading: "Hammam royal ou hammam berbère ?",
        blocks: [
          {
            list: [
              "**[Hammam Berbère](service:hammam-berbere)** (550 MAD, 1 h 15) : savon noir, kessa, rassoul et modelage de 20 minutes à l'argan.",
              "**Hammam Royal** (650 MAD, 1 h 30) : savon noir, sel et fleur d'oranger, râpe des pieds et masque corps et visage à l'argan.",
            ],
          },
          "Vous cherchez surtout la détente ? Le hammam berbère inclut un modelage. Vous voulez une peau éclatante de la tête aux pieds ? Choisissez le hammam royal.",
        ],
      },
      {
        heading: "Où se déroule le soin ?",
        blocks: [
          "Dans le hammam privé de votre riad ou de votre villa, ou dans une salle de bain avec douche et eau chaude. Tous les détails pratiques sont sur notre page [hammam à domicile à Marrakech](hammam).",
        ],
      },
    ],
    precautions: [
      "Pas d'exfoliation sur un coup de soleil, une peau irritée ou une plaie.",
      "Grossesse : demandez d'abord l'avis de votre médecin, ce soin contient des huiles essentielles.",
      "Signalez toute allergie (huiles essentielles, argan, fruits à coque).",
      "Évitez l'épilation dans les 24 heures qui précèdent ou qui suivent le soin.",
    ],
    faqs: [
      {
        q: "Combien coûte le hammam royal à domicile à Marrakech ?",
        a: "650 MAD pour 1 h 30, déplacement offert dans toute la région de Marrakech. Voir tous nos [tarifs](prices).",
      },
      {
        q: "Le hammam royal convient-il aux peaux sensibles ?",
        a: "Le gommage aux cristaux de sel est plus intense. Si votre peau est sensible ou réactive, dites-le à la réservation : nous vous conseillerons le rituel le plus adapté.",
      },
      {
        q: "Peut-on réserver un hammam royal à deux ?",
        a: "Oui, deux thérapeutes peuvent venir ensemble. Selon l'espace et le nombre de salles de bain, les soins ont lieu en même temps ou l'un après l'autre.",
      },
      {
        q: "Que faut-il prévoir ?",
        a: "Une salle de bain avec douche et eau chaude, ou un hammam privé. La thérapeute apporte les produits et les serviettes.",
      },
    ],
  },

  brushing: {
    slug: "brushing-a-domicile-marrakech",
    name: "Shampoing & Brushing",
    shortName: "brushing",
    summary:
      "Un shampoing puis un brushing à la brosse ronde et au sèche-cheveux, pour des cheveux lisses, souples et pleins de volume, sans aller au salon.",
    imageAlt: "Brushing à la brosse ronde et au sèche-cheveux sur cheveux mi-longs",
    metaTitle: "Brushing à Domicile à Marrakech – 350 MAD",
    metaDescription:
      "Shampoing et brushing à domicile à Marrakech, dans votre riad, villa ou hôtel : 1 h, 350 MAD, par nos thérapeutes femmes, tous les jours de 8h à 22h.",
    h1: "Brushing à domicile à Marrakech",
    lead: [
      "Un dîner, une soirée, un mariage, ou simplement l'envie de cheveux impeccables après une journée au soleil ? Votre thérapeute vient dans votre riad, votre villa ou votre chambre d'hôtel pour un shampoing suivi d'un brushing, sans que vous ayez à chercher un salon dans une ville que vous connaissez peu.",
      "Le soin dure environ une heure et coûte 350 MAD, déplacement offert dans toute la région de Marrakech. Vous réglez après le soin.",
    ],
    idealFor: [
      "Se préparer pour un dîner, une soirée ou un mariage à Marrakech",
      "Retrouver des cheveux nets après la piscine, le soleil ou le hammam",
      "Un EVJF ou un anniversaire : les brushings s'enchaînent dans votre villa ([EVJF et groupes](groups))",
      "Compléter une [manucure](service:manucure) avant un événement",
    ],
    steps: [
      {
        title: "Installation",
        text: "Votre thérapeute s'installe près de la salle de bain et d'une prise électrique, puis vous demande le résultat souhaité : lisse, souple, avec plus ou moins de volume.",
      },
      {
        title: "Shampoing",
        text: "Les cheveux sont lavés et rincés, puis essorés délicatement dans une serviette.",
      },
      {
        title: "Brushing",
        text: "Mèche par mèche, à la brosse ronde et au sèche-cheveux, les cheveux sont lissés et prennent du volume.",
      },
      {
        title: "Finitions",
        text: "Un dernier passage pour discipliner les longueurs et vérifier le résultat avec vous devant le miroir.",
      },
    ],
    sections: [
      {
        heading: "Un brushing sans aller au salon",
        blocks: [
          "En voyage, trouver un salon de coiffure, réserver un créneau et s'y rendre prend du temps. Avec le brushing à domicile, c'est votre thérapeute qui vient à vous : vous restez dans votre riad, votre villa ou votre chambre d'hôtel, et vous êtes prête au moment de sortir.",
          "Le soin comprend le shampoing et le brushing. Il dure environ une heure, selon la longueur et l'épaisseur des cheveux.",
        ],
      },
      {
        heading: "Combien de temps tient un brushing ?",
        blocks: [
          "Un brushing tient en général jusqu'au prochain shampoing. L'humidité, la chaleur, la piscine ou la vapeur du hammam le font retomber plus vite.",
          {
            note: "Vous avez aussi prévu un [hammam](hammam) ou une baignade ? Placez le brushing après, en fin de journée, juste avant de sortir.",
          },
        ],
      },
      {
        heading: "Avant une soirée ou entre amies",
        blocks: [
          "Pour un dîner, réservez le brushing en fin d'après-midi. Pour un groupe, plusieurs brushings peuvent s'enchaîner dans votre villa ou votre riad, jusqu'à 10 personnes dans la même journée : voir notre page [EVJF et groupes](groups). Et pour des mains assorties, ajoutez une [manucure](service:manucure).",
        ],
      },
    ],
    precautions: [
      "Signalez un cuir chevelu sensible ou irrité, ou une allergie à un produit capillaire.",
      "Si vos cheveux ont été colorés, défrisés ou lissés récemment, précisez-le à la réservation.",
      "Évitez la piscine, le hammam ou une douche juste après le brushing : l'eau et la vapeur le font retomber.",
    ],
    faqs: [
      {
        q: "Combien coûte un brushing à domicile à Marrakech ?",
        a: "Le shampoing et brushing coûte 350 MAD et dure environ 1 heure. Le déplacement est offert dans toute la région de Marrakech. Voir tous nos prix sur la page [tarifs](prices).",
      },
      {
        q: "Le shampoing est-il compris ?",
        a: "Oui. Le soin comprend un shampoing, puis le brushing.",
      },
      {
        q: "Que faut-il prévoir ?",
        a: "Une salle de bain pour le shampoing, une prise électrique et une chaise, idéalement près d'un miroir.",
      },
      {
        q: "Peut-on réserver plusieurs brushings pour un groupe ?",
        a: "Oui, jusqu'à 10 personnes dans la même journée : les soins s'enchaînent dans votre villa ou votre riad. Indiquez le nombre de personnes dans le formulaire, nous organisons le planning sur WhatsApp. Voir [EVJF et groupes](groups).",
      },
      {
        q: "Peut-on combiner brushing et manucure ?",
        a: "Oui. Réservez les deux soins, par exemple une [manucure](service:manucure) puis le brushing, et précisez-le dans votre demande : nous organisons l'horaire avec vous sur WhatsApp.",
      },
    ],
    onSite: [
      "Une salle de bain pour le shampoing",
      "Une prise électrique et une chaise",
      "Un miroir à proximité, si possible",
    ],
  },

  manucure: {
    slug: "manucure-a-domicile-marrakech",
    name: "Manucure & Vernis Classique",
    shortName: "manucure",
    summary:
      "Limage et mise en forme des ongles, soin des cuticules et pose d'un vernis classique, pour des mains soignées sans quitter votre riad ou votre villa.",
    imageAlt: "Pose d'un vernis classique pendant une manucure",
    metaTitle: "Manucure à Domicile à Marrakech – 300 MAD",
    metaDescription:
      "Manucure à domicile à Marrakech : limage, soin des cuticules et vernis classique dans votre riad, villa ou hôtel. 1 h, 300 MAD, thérapeutes femmes, 8h–22h.",
    h1: "Manucure à domicile à Marrakech",
    lead: [
      "Des mains soignées sans chercher un salon : votre thérapeute vient dans votre riad, votre villa ou votre chambre d'hôtel pour une manucure complète. Limage et mise en forme des ongles, soin des cuticules, puis pose d'un vernis classique.",
      "Le soin dure environ une heure et coûte 300 MAD, déplacement offert dans toute la région de Marrakech. Vous réglez après le soin.",
    ],
    idealFor: [
      "Des mains impeccables pour un dîner, un mariage ou vos photos de vacances",
      "Un moment beauté entre amies ou pendant un [EVJF](groups)",
      "Compléter une [pédicure](service:pedicure) pour les mains et les pieds",
      "Se faire chouchouter sans quitter la terrasse ou le bord de la piscine",
    ],
    steps: [
      {
        title: "Installation",
        text: "Votre thérapeute s'installe à une table, dans un endroit bien éclairé, et vous demande comment vous aimez vos ongles.",
      },
      {
        title: "Limage et mise en forme",
        text: "Les ongles sont limés et mis en forme selon la forme que vous préférez.",
      },
      {
        title: "Soin des cuticules",
        text: "Les cuticules sont repoussées et soignées pour un contour d'ongle net.",
      },
      {
        title: "Vernis classique",
        text: "Pose du vernis, couche après couche, puis quelques minutes de séchage avant de reprendre vos activités.",
      },
    ],
    sections: [
      {
        heading: "Une manucure au vernis classique",
        blocks: [
          "Notre manucure comprend la pose d'un vernis classique, qui s'enlève avec un dissolvant ordinaire. Nous ne posons pas de vernis semi-permanent.",
          "Le soin dure environ une heure. Il se déroule à une table, dans votre chambre, votre salon ou à l'ombre sur la terrasse.",
        ],
      },
      {
        heading: "Combien de temps tient le vernis ?",
        blocks: [
          "Un vernis classique tient en général quelques jours, selon l'usage de vos mains : la piscine, le sable et les produits ménagers l'abîment plus vite.",
          {
            note: "Laissez le vernis sécher complètement avant de toucher l'eau ou de fouiller dans votre sac : les premières minutes comptent.",
          },
        ],
      },
      {
        heading: "Manucure et pédicure le même jour",
        blocks: [
          "Pour les mains et les pieds, réservez une manucure et une [pédicure](service:pedicure) : 300 MAD chacune, soit 600 MAD les deux. Précisez-le dans votre demande, nous organisons l'horaire sur WhatsApp. Pour une soirée, ajoutez un [brushing](service:brushing).",
        ],
      },
    ],
    precautions: [
      "Signalez toute allergie connue à un vernis ou à un dissolvant.",
      "En cas de plaie, d'infection ou de mycose de l'ongle, attendez la guérison avant le soin.",
      "Prévoyez le temps de séchage : évitez l'eau et les gestes appuyés juste après la pose.",
    ],
    faqs: [
      {
        q: "Combien coûte une manucure à domicile à Marrakech ?",
        a: "300 MAD pour environ 1 heure, vernis classique compris. Le déplacement est offert dans toute la région de Marrakech. Voir tous nos [tarifs](prices).",
      },
      {
        q: "Que comprend la manucure ?",
        a: "Le limage et la mise en forme des ongles, le soin des cuticules et la pose d'un vernis classique.",
      },
      {
        q: "Proposez-vous le vernis semi-permanent ?",
        a: "Non. Notre manucure comprend un vernis classique, qui s'enlève avec un dissolvant ordinaire.",
      },
      {
        q: "Peut-on faire une manucure et une pédicure ensemble ?",
        a: "Oui. Chaque soin coûte 300 MAD, soit 600 MAD pour la [manucure et la pédicure](service:pedicure). Indiquez les deux soins dans votre demande.",
      },
      {
        q: "Que faut-il prévoir ?",
        a: "Une table, une chaise et un endroit bien éclairé. Votre thérapeute s'occupe du reste.",
      },
    ],
    onSite: ["Une table et une chaise", "Un endroit bien éclairé"],
  },

  pedicure: {
    slug: "pedicure-a-domicile-marrakech",
    name: "Pédicure & Bain de Pieds",
    shortName: "pédicure",
    summary:
      "Bain de pieds, gommage, limage, soin des cuticules et vernis classique : des pieds doux et soignés après vos journées de marche à Marrakech.",
    imageAlt: "Pieds dans un bain de pieds aux fleurs avant une pédicure",
    metaTitle: "Pédicure à Domicile à Marrakech – 300 MAD",
    metaDescription:
      "Pédicure à domicile à Marrakech : bain de pieds, gommage, limage, soin des cuticules et vernis classique dans votre riad, villa ou hôtel. 1 h, 300 MAD.",
    h1: "Pédicure à domicile à Marrakech",
    lead: [
      "Après des journées à marcher dans la Médina ou en sandales au bord de la piscine, vos pieds méritent une pause. Votre thérapeute vient dans votre riad, votre villa ou votre chambre d'hôtel pour une pédicure complète : bain de pieds, gommage, limage, soin des cuticules et vernis classique.",
      "Le soin dure environ une heure et coûte 300 MAD, déplacement offert dans toute la région de Marrakech. Vous réglez après le soin.",
    ],
    idealFor: [
      "Des pieds doux après des journées de marche dans les souks",
      "Être prête pour les sandales, la piscine ou une soirée",
      "Un moment de détente avant ou après un [massage](service:massage-berbere)",
      "Compléter une [manucure](service:manucure) pour les mains et les pieds",
    ],
    steps: [
      {
        title: "Bain de pieds",
        text: "Vos pieds se détendent dans un bain d'eau tiède qui assouplit la peau.",
      },
      {
        title: "Gommage",
        text: "Un gommage élimine les peaux mortes et adoucit les pieds.",
      },
      {
        title: "Limage et cuticules",
        text: "Les ongles sont limés et mis en forme, puis les cuticules sont soignées.",
      },
      {
        title: "Vernis classique",
        text: "Pose du vernis, puis un temps de séchage avant de remettre vos chaussures.",
      },
    ],
    sections: [
      {
        heading: "Une pédicure de confort, à domicile",
        blocks: [
          "Notre pédicure est un soin esthétique et de bien-être : bain de pieds, gommage, limage, soin des cuticules et vernis classique, en une heure environ.",
          {
            note: "Ce n'est pas un soin médical. Pour un ongle incarné, une verrue, une mycose ou une douleur au pied, consultez un podologue.",
          },
        ],
      },
      {
        heading: "Après la marche dans la Médina ou dans l'Atlas",
        blocks: [
          "Les ruelles de la Médina, les souks ou une randonnée dans l'Atlas mettent les pieds à rude épreuve. Le bain de pieds et le gommage les remettent en forme. Pour les jambes lourdes, associez la pédicure à un [massage sportif](service:massage-sportif), et lisez nos conseils pour [récupérer après le Toubkal](guide:atlas-trek-recovery).",
        ],
      },
      {
        heading: "Manucure et pédicure le même jour",
        blocks: [
          "Réservez une [manucure](service:manucure) et une pédicure : 300 MAD chacune, soit 600 MAD les deux. Précisez-le dans votre demande, nous organisons l'horaire sur WhatsApp.",
        ],
      },
    ],
    precautions: [
      "Diabète, troubles de la circulation ou plaie au pied : demandez l'avis de votre médecin avant le soin.",
      "En cas de mycose, de verrue ou d'ongle incarné, consultez un podologue : la pédicure esthétique ne les soigne pas.",
      "Signalez toute allergie connue à un vernis ou à un produit de gommage.",
    ],
    faqs: [
      {
        q: "Combien coûte une pédicure à domicile à Marrakech ?",
        a: "300 MAD pour environ 1 heure, vernis classique compris. Le déplacement est offert dans toute la région de Marrakech. Voir tous nos [tarifs](prices).",
      },
      {
        q: "Que comprend la pédicure ?",
        a: "Un bain de pieds, un gommage, le limage et la mise en forme des ongles, le soin des cuticules et la pose d'un vernis classique.",
      },
      {
        q: "Que faut-il prévoir ?",
        a: "Un fauteuil ou une chaise confortable et un accès à l'eau tiède pour le bain de pieds.",
      },
      {
        q: "Soignez-vous les ongles incarnés ou les cors ?",
        a: "Non. Notre pédicure est un soin esthétique. Pour un ongle incarné, un cor douloureux ou une mycose, consultez un podologue.",
      },
      {
        q: "Peut-on faire une manucure et une pédicure ensemble ?",
        a: "Oui. Chaque soin coûte 300 MAD, soit 600 MAD pour la [manucure](service:manucure) et la pédicure.",
      },
    ],
    onSite: ["Un fauteuil ou une chaise confortable", "Un accès à l'eau tiède pour le bain de pieds"],
  },
};
