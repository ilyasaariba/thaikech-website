import type { ZoneCopy, ZoneId } from "../types";

export const zonesEn: Record<ZoneId, ZoneCopy> = {
  medina: {
    slug: "massage-medina-marrakech",
    name: "Medina",
    teaser: "Riads and guesthouses in the heart of the old city, from the Kasbah to Bab Doukkala.",
    metaTitle: "In-Riad Massage in the Marrakech Medina",
    metaDescription:
      "Massage and hammam in your Medina riad in Marrakech: Kasbah, Mouassine, Bab Doukkala and more. Female therapists, daily 8am–10pm, free travel.",
    h1: "Massage and hammam in your Medina riad, Marrakech",
    lead: [
      "Staying in a riad in the Medina? Our female therapists come to you with the massage table, oils and towels, for a massage or hammam in your room, on the roof terrace or in the riad's private hammam.",
      "After a day in the souks, around Jemaa el-Fna square or through the lanes of the Kasbah, it is the best way to enjoy the calm of your riad. Travel within the Medina is free.",
    ],
    places: ["Kasbah", "Mellah", "Mouassine", "Bab Doukkala", "Riad Zitoun", "Dar El Bacha", "Laksour", "Bab Taghzout"],
    sections: [
      {
        heading: "Finding your riad in the derbs",
        blocks: [
          "Many riads sit at the end of narrow lanes, the derbs, which cars can't enter and where house numbers are hard to spot. To help your therapist arrive on time:",
          {
            list: [
              "send your riad's **WhatsApp location** when you confirm;",
              "give the **riad's name** and a nearby landmark (a gate or 'bab', a square, a mosque);",
              "if possible, ask the riad staff to meet the therapist at the nearest access point.",
            ],
          },
        ],
      },
      {
        heading: "Where to set up the massage in a riad",
        blocks: [
          "Riad rooms can be small. The massage table can also go in a lounge, on the roof terrace if it is private, or near the patio when you have the whole riad. We discuss it with you before the appointment.",
          "For a [couples massage](duo), check that one room can fit two tables side by side, or plan for two rooms.",
        ],
      },
      {
        heading: "The riad's hammam or your bathroom",
        blocks: [
          "Many riads have a small hammam or a spacious bathroom: the ideal place for a [Berber hammam](service:hammam-berbere) with black soap and a kessa glove scrub. A shower with hot water is enough for rinsing.",
        ],
      },
      {
        heading: "Let your riad know",
        blocks: [
          "Riads usually have only a few rooms and know who comes and goes: simply tell reception or the manager what time your treatment is booked.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is travel to the Medina free?",
        a: "Yes, travel within the Medina is free, as it is across the whole Marrakech area.",
      },
      {
        q: "My riad room is small. Is that a problem?",
        a: "Not necessarily. Your therapist needs enough room to set up the table and walk around it. If the room is too small, a lounge or a private terrace in the riad can work.",
      },
      {
        q: "Can you come in the evening?",
        a: "Yes, we work every day from 8am to 10pm, including evenings after your sightseeing.",
      },
      {
        q: "Do you offer hammam treatments in riads?",
        a: "Yes. The [Berber hammam](service:hammam-berbere) and the [royal hammam](service:hammam-royal) take place in the riad's private hammam or in a bathroom with a shower.",
      },
    ],
  },

  gueliz: {
    slug: "massage-gueliz-marrakech",
    name: "Gueliz",
    teaser: "Apartments, holiday rentals and hotels in the new town, around Avenue Mohammed V.",
    metaTitle: "Massage at Home in Gueliz, Marrakech",
    metaDescription:
      "Massage and hammam at home in Gueliz, Marrakech: apartment, Airbnb or hotel near Avenue Mohammed V and Jardin Majorelle. Female therapists, 8am–10pm.",
    h1: "Massage and hammam at home in Gueliz",
    lead: [
      "Gueliz, Marrakech's new town, is full of apartments, holiday rentals and hotels around Avenue Mohammed V. Instead of hunting for a spa, bring the spa to you: our female therapists set up in your living room or bedroom with all the equipment.",
      "Ideal after a day of shopping, a visit to Jardin Majorelle or dinner in town. Travel within Gueliz is free.",
    ],
    places: [
      "Avenue Mohammed V",
      "Place du 16 Novembre",
      "Boulevard Mohammed Zerktouni",
      "Carré Eden",
      "Jardin Majorelle",
      "Semlalia",
    ],
    sections: [
      {
        heading: "Apartments and holiday rentals",
        blocks: [
          "Many travellers choose an apartment or Airbnb in Gueliz. To help your therapist find you, give the building name, floor, apartment number and any door code or intercom.",
          "A clear living room is often the easiest place for the table. Draw the curtains and switch off the TV: the atmosphere is part of the treatment.",
        ],
      },
      {
        heading: "Hotels in Gueliz",
        blocks: [
          "If you are staying in a hotel, let reception know your therapist is coming: each hotel has its own rules for outside visitors. All our tips are on the [in-room massage in hotels and riads](inRoom) page.",
        ],
      },
      {
        heading: "The best treatments for a city stay",
        blocks: [
          "After a day browsing shops and galleries, the [sports massage](service:massage-sportif) relieves tired legs, while the [Thai massage with hot towels](service:massage-thai) loosens the back. Prefer something gentle? Choose the [Berber argan oil massage](service:massage-berbere).",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you come to apartments and Airbnbs in Gueliz?",
        a: "Yes. Just give the exact address, floor and apartment number when you confirm on WhatsApp.",
      },
      {
        q: "Do I need a big room?",
        a: "You need enough space to set up a massage table and walk around it. A living room or a clear bedroom is usually enough.",
      },
      {
        q: "Is travel to Gueliz free?",
        a: "Yes, travel is free in Gueliz and across Marrakech.",
      },
      {
        q: "Can I book for the same day?",
        a: "Yes, subject to availability, between 8am and 10pm. We recommend booking at least 2 hours ahead.",
      },
    ],
  },

  hivernage: {
    slug: "massage-hivernage-marrakech",
    name: "Hivernage",
    teaser: "Marrakech's district of large hotels and residences, between the Medina and Gueliz.",
    metaTitle: "In-Room Massage in Hivernage, Marrakech",
    metaDescription:
      "Massage and hammam in your hotel room or residence in Hivernage, Marrakech: before a night out or after the pool. Female therapists, 8am–10pm, clear prices.",
    h1: "Massage and hammam at home in Hivernage",
    lead: [
      "Between the Medina walls and Gueliz, Hivernage is Marrakech's district of large hotels, residences and nightlife. Our female therapists come to your room, suite or apartment for a massage or hammam, so you never have to leave your hotel.",
      "A treatment before an evening out, after a day by the pool or to recover the next morning: you choose the time, between 8am and 10pm. Travel within Hivernage is free.",
    ],
    places: ["Avenue Echouhada", "Avenue Mohammed VI", "Palais des Congrès", "Menara Gardens", "Bab Jdid"],
    sections: [
      {
        heading: "Massage in your hotel room",
        blocks: [
          "Each hotel in Hivernage has its own policy on outside visitors. Let reception know the time of your treatment so there is no wait when your therapist arrives.",
          "The massage table is set up in the bedroom or the suite's lounge. See our detailed tips on the [in-room massage in hotels and riads](inRoom) page.",
        ],
      },
      {
        heading: "Before or after a night out",
        blocks: [
          "Hivernage is also where the restaurants and nightlife are. A [Berber massage](service:massage-berbere) in the late afternoon helps you unwind before going out; the next day, a [royal hammam](service:hammam-royal) brings back your glow.",
        ],
      },
      {
        heading: "For two in your suite",
        blocks: [
          "As a couple or with a friend, two therapists can come at the same time for a [couples massage](duo). For something even more exclusive, treat yourself to the [royal four-hands massage](service:massage-4-mains).",
        ],
      },
    ],
    faqs: [
      {
        q: "Can therapists come to my hotel room?",
        a: "Yes, depending on your hotel's policy. Let reception know the time of your treatment; we also advise you on WhatsApp when confirming.",
      },
      {
        q: "What is the latest time for a massage in Hivernage?",
        a: "We work every day from 8am to 10pm. For an evening treatment, book ahead if you can.",
      },
      {
        q: "Is discretion guaranteed?",
        a: "Yes. Our female therapists provide professional, non-sensual wellness treatments that respect your privacy and the hotel's. See our [code of conduct](charter).",
      },
      {
        q: "Is travel included?",
        a: "Yes, travel is free in Hivernage and across Marrakech.",
      },
    ],
  },

  palmeraie: {
    slug: "massage-palmeraie-marrakech",
    name: "Palmeraie",
    teaser: "Villas with pools and large hotels among the palm trees, north-east of the city.",
    metaTitle: "Villa Massage in the Palmeraie, Marrakech",
    metaDescription:
      "Massage and hammam at home in your villa or hotel in Marrakech's Palmeraie: couples, four-hands, groups of friends. Female therapists, daily 8am–10pm.",
    h1: "Massage and hammam at home in the Palmeraie",
    lead: [
      "North-east of Marrakech, the Palmeraie is home to villas with pools, guesthouses and large hotels among the palm trees. It is a dream setting for a massage at home: our female therapists bring the spa to your villa, in peace and quiet.",
      "With family, as a couple or with friends, enjoy a treatment without getting in the car. Travel to the Palmeraie is free.",
    ],
    places: ["Circuit de la Palmeraie", "Route de Fès", "Palmeraie Golf"],
    sections: [
      {
        heading: "Giving your villa's location",
        blocks: [
          "In the Palmeraie, villas often sit on tracks or unnumbered lanes behind a gate. When you confirm:",
          {
            list: [
              "send the villa's exact **WhatsApp location**;",
              "give the name of the villa or estate;",
              "let the guard or staff know your therapist is coming.",
            ],
          },
        ],
      },
      {
        heading: "A spa in your villa",
        blocks: [
          "Villas have space: the table can go in a bedroom, a lounge or in the shade by the pool, if the spot is private. The [royal hammam](service:hammam-royal) takes place in the villa's hammam or in a bathroom with a shower.",
        ],
      },
      {
        heading: "Groups, families and special occasions",
        blocks: [
          "Palmeraie stays are often shared. Two therapists can come at the same time for a [couples massage](duo); for larger groups, treatments follow on two at a time. Just enter the number of people in the form and we will suggest a schedule on WhatsApp.",
          "Birthday, honeymoon, girls' trip: the [royal four-hands massage](service:massage-4-mains) is our most exclusive treatment.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you come to villas in the Palmeraie?",
        a: "Yes. Send us the villa's exact location when confirming on WhatsApp and let the guard know your therapist is coming.",
      },
      {
        q: "Can I have a massage by the pool?",
        a: "Yes, if the spot is shaded and private. Otherwise, a bedroom or lounge works perfectly.",
      },
      {
        q: "How many people can you treat in a villa?",
        a: "Two people at the same time, with two therapists. For a group, treatments follow on: enter the number of people in the form and we will plan the schedule with you.",
      },
      {
        q: "Is travel to the Palmeraie included?",
        a: "Yes, travel to the Palmeraie is free.",
      },
    ],
  },

  agdal: {
    slug: "massage-agdal-marrakech",
    name: "Agdal",
    teaser: "Resort hotels and residences with pools along Avenue Mohammed VI, south of the city.",
    metaTitle: "Massage at Home in Agdal, Marrakech",
    metaDescription:
      "Massage and hammam at home in Agdal, Marrakech: resort hotel, residence or apartment along Avenue Mohammed VI. Female therapists, daily 8am–10pm.",
    h1: "Massage and hammam at home in Agdal",
    lead: [
      "South of the Medina, Agdal's tourist zone stretches along Avenue Mohammed VI, with resort hotels, residences with pools and apartments. Our female therapists come to you with the table, oils and towels.",
      "Handy for families and long stays: everyone enjoys their treatment without arranging transport. Travel within Agdal is free.",
    ],
    places: ["Avenue Mohammed VI", "Agdal Gardens", "Agdal tourist zone"],
    sections: [
      {
        heading: "Residences and resort hotels",
        blocks: [
          "In gated residences, give the residence name, building and apartment number, and let the front desk or guard know. In resort hotels, tell reception the time of your treatment: each hotel has its own rules for visitors.",
        ],
      },
      {
        heading: "Family stays",
        blocks: [
          "One parent enjoys a massage while the other looks after the children, then you swap. With two therapists you can also book a [couples massage](duo) at the same time.",
          "Expecting? The [pregnancy massage](service:massage-future-maman) lasts 90 minutes and is gentle, with neutral argan oil.",
        ],
      },
      {
        heading: "After the pool and the sun",
        blocks: [
          "A day in the sun tires the skin: wait for any sunburn to settle before a scrub. In the meantime, the [Berber argan oil massage](service:massage-berbere) relaxes without irritating the skin.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you come to residences in Agdal?",
        a: "Yes. Give the residence, building and apartment number, and let the front desk know your therapist is coming.",
      },
      {
        q: "Is travel to Agdal free?",
        a: "Yes, Agdal is part of Marrakech, so travel is free.",
      },
      {
        q: "Can we book several treatments for the family?",
        a: "Yes. Enter the number of people in the form; two people can be treated at the same time, then treatments follow on.",
      },
      {
        q: "What times are available?",
        a: "Every day from 8am to 10pm. For family stays, mornings and late afternoons are often the most convenient.",
      },
    ],
  },

  "route-ourika": {
    slug: "massage-route-de-l-ourika-marrakech",
    name: "Route de l'Ourika",
    teaser: "Villas, guesthouses and estates south-east of Marrakech, on the road to the Atlas.",
    metaTitle: "Villa Massage on the Route de l'Ourika, Marrakech",
    metaDescription:
      "Massage and hammam at home in your villa on the Route de l'Ourika near Marrakech. Female therapists, 8am–10pm, free travel, pay after your treatment.",
    h1: "Massage and hammam at home on the Route de l'Ourika",
    lead: [
      "The Route de l'Ourika links Marrakech to the Ourika Valley and the foothills of the Atlas. Along the road, villas, guesthouses and estates welcome travellers looking for peace and quiet. Our female therapists come to you with all the equipment.",
      "Even this far from the centre, travel is free: you only pay for your treatment, at the listed price, after the appointment.",
    ],
    places: ["Route de l'Ourika", "Ourika Valley"],
    sections: [
      {
        heading: "Free travel, same prices as in the city",
        blocks: [
          "Each treatment costs the same as anywhere else (see our [prices](prices)), and travel to your villa is free. Send your location when booking and we will plan the journey and confirm the time on WhatsApp.",
        ],
      },
      {
        heading: "Giving your villa's location",
        blocks: [
          "Addresses are often given by kilometre ('Route de l'Ourika, km 10'): add your WhatsApp location and the estate's name, and let the guard know. Allow a little extra time, especially at rush hour leaving Marrakech.",
        ],
      },
      {
        heading: "After a day in the Atlas",
        blocks: [
          "A hike in the Ourika Valley, a walk to the waterfalls or an Atlas excursion: the [sports recovery massage](service:massage-sportif) relieves your legs that same evening. For a real treat, the [royal four-hands massage](service:massage-4-mains) turns your villa into a spa.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a travel fee on the Route de l'Ourika?",
        a: "No, travel is free, as it is across the whole Marrakech area.",
      },
      {
        q: "How far do you travel?",
        a: "Across the whole Marrakech area, the Ourika Valley included. Send us your villa's location and we will confirm availability.",
      },
      {
        q: "Should I book further ahead?",
        a: "It helps: booking the day before or a few hours ahead lets us plan the journey properly.",
      },
      {
        q: "Are treatments more expensive on the Route de l'Ourika?",
        a: "No, treatments cost the same as in Marrakech, and travel is free.",
      },
    ],
  },
};
