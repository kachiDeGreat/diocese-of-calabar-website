export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Church {
  id: string;
  name: string;
  address: string;
  image: string;
  link: string;
}

export interface ArchdeaconryDetail {
  slug: string;
  name: string;
  history: {
    paragraphs1: string[];
    quote: string;
    paragraphs2: string[];
    image: string;
  };
  leaders: Leader[];
  churches: Church[];
}

export const archdeaconryDetailsData: Record<string, ArchdeaconryDetail> = {
  akampka: {
    slug: "akampka",
    name: "Akampka Archdeaconry",
    history: {
      paragraphs1: [
        "The Akampka Archdeaconry has a rich history rooted in the early missionary expansions into the Akampka region.",
        "For decades, it has served as a central hub for Anglican worship, bringing together diverse communities across the local government area.",
      ],
      quote: "Faith planted in Akampka grows to shelter many.",
      paragraphs2: [
        "Through various challenges, the faithful in Akampka have remained steadfast, building schools and community centers.",
        "Today, the archdeaconry focuses on rural evangelism and community empowerment, ensuring the Gospel reaches every corner.",
      ],
      image: "https://placehold.co/600x800/eeeeee/999999?text=Akampka+History",
    },
    leaders: [
      {
        id: "1",
        name: "Venerable [Name]",
        role: "Archdeacon of Akampka",
        bio: "Leading the Akampka Archdeaconry with a focus on rural outreach and spiritual growth.",
        image:
          "https://placehold.co/400x400/eeeeee/999999?text=Akampka+Archdeacon",
      },
      {
        id: "2",
        name: "Venerable [Name]",
        role: "Curate of Akampka",
        bio: "Leading the Akampka Archdeaconry with a focus on rural outreach and spiritual growth.",
        image:
          "https://placehold.co/400x400/eeeeee/999999?text=Akampka+Archdeacon",
      },
    ],
    churches: [
      {
        id: "1",
        name: "St. Paul's Church, Akampka",
        address: "Akampka Main Road",
        image:
          "https://placehold.co/600x400/eeeeee/999999?text=St+Paul+Akampka",
        link: "#",
      },
      {
        id: "2",
        name: "Christ Church, Odukpani",
        address: "Odukpani Junction",
        image: "https://placehold.co/600x400/eeeeee/999999?text=Christ+Church",
        link: "#",
      },
    ],
  },

  ascension: {
    slug: "ascension",
    name: "Ascension Deanery",
    history: {
      paragraphs1: [
        "The Ascension Deanery was carved out to better serve the growing Anglican population in its designated district.",
        "It takes its name from the Feast of the Ascension, reminding the congregants of Christ's exalted place and our call to heavenly realities.",
      ],
      quote: "Lifting our eyes, our hearts, and our community to Christ.",
      paragraphs2: [
        "The deanery has seen rapid structural development over the last twenty years, birthing several new parishes.",
        "Currently, Ascension Deanery is pioneering youth-led worship initiatives and urban ministry programs.",
      ],
      image:
        "https://placehold.co/600x800/eeeeee/999999?text=Ascension+History",
    },
    leaders: [
      {
        id: "1",
        name: "Rev. Canon [Name]",
        role: "Dean of Ascension",
        bio: "A dynamic leader passionate about urban ministry and equipping the next generation of believers.",
        image: "https://placehold.co/400x400/eeeeee/999999?text=Ascension+Dean",
      },
    ],
    churches: [
      {
        id: "1",
        name: "Church of the Ascension",
        address: "Ascension Drive, Calabar",
        image:
          "https://placehold.co/600x400/eeeeee/999999?text=Church+of+Ascension",
        link: "#",
      },
    ],
  },

  cathedral: {
    slug: "cathedral",
    name: "Cathedral Archdeaconry",
    history: {
      paragraphs1: [
        "The Cathedral Archdeaconry sits at the very heart of the Diocese of Calabar. It encompasses the mother church of the Diocese.",
        "Its history is intertwined with the establishment of the Anglican Communion in Cross River State, serving as the seat of the Bishop.",
      ],
      quote:
        "The Mother Church: A beacon of orthodox faith and Anglican heritage in Calabar.",
      paragraphs2: [
        "Hosting major diocesan events, synods, and ordinations, the Cathedral Archdeaconry sets the liturgical standard.",
        "It continues to be a monument of faith, blending historical architecture with a vibrant, modern worshipping community.",
      ],
      image:
        "https://placehold.co/600x800/eeeeee/999999?text=Cathedral+History",
    },
    leaders: [
      {
        id: "1",
        name: "Very Rev. [Name]",
        role: "Provost / Archdeacon",
        bio: "Overseeing the Cathedral and its surrounding parishes, maintaining the rich liturgical traditions of the Church.",
        image:
          "https://placehold.co/400x400/eeeeee/999999?text=Cathedral+Provost",
      },
    ],
    churches: [
      {
        id: "1",
        name: "Cathedral Church of the Holy Trinity",
        address: "81 Calabar Rd, Calabar",
        image:
          "https://placehold.co/600x400/eeeeee/999999?text=Holy+Trinity+Cathedral",
        link: "#",
      },
      {
        id: "2",
        name: "St. Jude's Parish",
        address: "Cathedral District",
        image: "https://placehold.co/600x400/eeeeee/999999?text=St+Judes",
        link: "#",
      },
    ],
  },

  calabar: {
    slug: "calabar",
    name: "Calabar Archdeaconry",
    history: {
      paragraphs1: [
        "Spanning key residential and commercial areas of the city, the Calabar Archdeaconry represents a diverse and thriving cross-section of the Diocese.",
        "It was established to provide closer episcopal oversight to the rapidly multiplying churches within the municipal area.",
      ],
      quote:
        "Taking the light of the Gospel into the streets and homes of our city.",
      paragraphs2: [
        "This Archdeaconry is known for its strong evangelical movements and robust Women's and Men's fellowships.",
        "Looking forward, Calabar Archdeaconry is actively engaged in church planting and expanding educational facilities.",
      ],
      image: "https://i.postimg.cc/bJby6gTr/image.png",
    },
    leaders: [
      {
        id: "1",
        name: "Venerable [Name]",
        role: "Archdeacon of Calabar",
        bio: "An experienced administrator and pastor, dedicated to strengthening the urban parishes of Calabar.",
        image:
          "https://placehold.co/400x400/eeeeee/999999?text=Calabar+Archdeacon",
      },
    ],
    churches: [
      {
        id: "1",
        name: "All Saints Anglican Church",
        address: "Calabar Municipality",
        image:
          "https://placehold.co/600x400/eeeeee/999999?text=All+Saints+Calabar",
        link: "#",
      },
      {
        id: "2",
        name: "St. Stephen's Parish",
        address: "Calabar South",
        image: "https://placehold.co/600x400/eeeeee/999999?text=St+Stephens",
        link: "#",
      },
    ],
  },

  "christ-church": {
    slug: "christ-church",
    name: "Christ-church Deanery",
    history: {
      paragraphs1: [
        "Christ-church Deanery was formed to consolidate the pastoral care of specific communities, focusing heavily on teaching and discipleship.",
        "The deanery has historically been a strong center for theological training and lay-reader preparation.",
      ],
      quote: "Built on Christ the solid rock, our foundation stands sure.",
      paragraphs2: [
        "In recent decades, the deanery has experienced a revival, with a surge in young professionals joining the congregation.",
        "They are heavily invested in medical missions and providing support to the less privileged in their immediate communities.",
      ],
      image:
        "https://placehold.co/600x800/eeeeee/999999?text=Christ+Church+History",
    },
    leaders: [
      {
        id: "1",
        name: "Rev. Canon [Name]",
        role: "Dean of Christ-church",
        bio: "A deeply theological mind committed to discipleship and pastoral care within the deanery.",
        image:
          "https://placehold.co/400x400/eeeeee/999999?text=Christ+Church+Dean",
      },
    ],
    churches: [
      {
        id: "1",
        name: "Christ Church Parish",
        address: "Christ Church Avenue",
        image: "https://placehold.co/600x400/eeeeee/999999?text=Christ+Church",
        link: "#",
      },
    ],
  },

  efut: {
    slug: "efut",
    name: "Efut Deanery",
    history: {
      paragraphs1: [
        "Serving the Efut communities and surrounding regions, this Deanery blends Anglican tradition with deep respect for local cultural heritage.",
        "The early missionaries worked closely with local leaders to establish the first chapels in this area, many of which still stand today.",
      ],
      quote:
        "A community united by faith, reflecting the diverse beauty of God's kingdom.",
      paragraphs2: [
        "Efut Deanery is characterized by its vibrant worship styles and strong community bonds.",
        "The deanery is currently expanding its physical infrastructure to accommodate a growing membership and expanding its welfare programs.",
      ],
      image: "https://placehold.co/600x800/eeeeee/999999?text=Efut+History",
    },
    leaders: [
      {
        id: "1",
        name: "Rev. [Name]",
        role: "Dean of Efut",
        bio: "Working tirelessly to bridge traditional community values with the transformative power of the Gospel.",
        image: "https://placehold.co/400x400/eeeeee/999999?text=Efut+Dean",
      },
    ],
    churches: [
      {
        id: "1",
        name: "St. Mary's Efut",
        address: "Efut Community Road",
        image: "https://placehold.co/600x400/eeeeee/999999?text=St+Marys+Efut",
        link: "#",
      },
    ],
  },
};
