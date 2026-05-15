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
    name: "Ascension Archdeaconry",
    history: {
      paragraphs1: [
        "BRIEF HISTORY OF ANGLICAN CHURCH OF ASCENSION IKOT OMIN 8 MILES CALABAR ON THE OCCASION OF CHURCH RE-DEDICATION AND VICARAGE DEDICATION THIS THURSDAY 14TH MAY, 2026 AT ANGLICAN CHURCH OF ASCENSION 8 MILES CALABAR.",
        "The Anglican Church of Ascension is a Church with a long history covering over 36years since inception from 1990. It was birthed by Rev. W. G. Ekprikpo. Who later became the Pioneer Bishop of Calabar Diocese. The RT. Rev. W.G. Ekprikpo. (JP). This Church had her first name as St Mark's Anglican Church Ikot-Enobong when it started as a mustard seed under the leadership of L/R Thompson Chijioke Onuoha who later became Rev. Thompson Chijioke Onuoha and the first vicar of the church.",
        "The then congregation used Ikot Eneobong community hall as a place of worship. The church later had two plots of land at Ikot Eneobong but lost the land back to the community on the ground they needed a school not a church. It later relocated to Government Primary School at Ikot Effanga Mkpa in 1993. The school had served as a place of worship till 2002. When the Cross River State Government made a law that no more should Government schools be used for religious worship centers. The congregation relocated under a Mango tree in front of the Pioneer Pastor's residence at Ikot Effangha Mkpa.",
        "In 2003, the Priest in charge Rev. Thompson Onuoha was transferred to the Holy Trinity Anglican Cathedral. He was then replaced by Rev. Prince Christian Anyim. Who is presently Rt. Rev. Prof. Prince Christian Chukwudi Enyinnaya Anyim (JP, GDJ). (Bishop of Isuikwuato-Umunneochi Diocese). Then Rev. Prince Anyim was later replaced that same year 2003 with then Rev. Can. Bar. Lawrence Ngozi Umar who is now Ven. Bar. Dr. Lawrence Ngozi Umar (JP.) in 2004.",
        "The church under the new leadership and his team of workers Rev Cyprain Chukwujekwu(Late), Mr. Anajemba Madueke who is presently (Rev. Anajemba Madueke) and John Dakowa from Siera-Leon who also is presently into ordained ministry. This team of ministers acquired the land being used today on 3rd July, 2004. At the cost of Seven Hundred Thousand Naira only. The first church hall was completed in 2008 after lots of struggles. The church was renamed to ANGLICAN CHURCH OF ASCENSION in 2010, by then RT. Rev. Tunde Adeleye JP (RTD) the 2nd Bishop of Calabar Diocese.",
        "The church had her first worship building dedicated in 2011 by Rt. Rev. Tunde Adeleye Rtd. The church started another one-story building with hall down and parsonage up and as today we are dedicating it to the Glory of God. The hall was completed and was fully fitted with Air conditional for church before the present magnificent building today. It is the first church in the diocese with a building fully equipped with standing split unit air conditioner in the Diocese of Calabar, Under the then Vicar Ven. Bar. Dr. Lawrence Ngozi Umar. The present Church Hall and Vicarage was built, though the parsonage not fully completed.",
        "It was after that the thought of expansion and decision was taken by the then Parochial Church Council (PCC) to demolish the first building/hall and asked that a bigger one be built. While on this the Vicar. Ven Dr. Umar was transferred in December 2016 to ST. Jude's Anglican Church as Vicar and Archdeacon of Calabar Archdeaconry. Meanwhile the Ven. Prof. Chibueze Haggai Njoku was posted as an assisting priest in 2014 who became the Vicar after Ven. Bar. Lawrence was posted out in 2016 to the glory of God and for the advancement of the kingdom of God/church growth.",
        "He also worked tirelessly with his team of workers while some were transferred out. Ord. Charles Esien Eyo who was both made deacon and priest in Ascension Church as Rev. Charles Esien Eyo, Rev Chijioke Osigwe who is today (Rev. Canon Chijioke Osigwe in Ogoja Missionary Diocese) and Rev Isaac Nwafor and later in 2021 Rev. Joel Sunday Emerionwu who was preferred Rev. Canon Sunday Joel Emerionwu working today in (Missionary Diocese of Ikom) and Postulant Kingsley Okechukwu.",
        "In 2017, the old Church building which was a bungalow was reinforced in preparation for this present structure. Some parts of the old Church were pulled down for a better and bigger church with gallery was started and soon was completed in November, 2019. The congregation parked back to the new church building and today it is celebrated to the glory of God and His faithfulness.",
        "Ascension Deanery was birthed by Calabar Archdeaconry whose Pioneer Vicar Ven. John Ezirim who later became Rt. Rev. John Ezirim (late).",
      ],
      quote:
        "Like the mustard seed, the church we dedicate today started from grass to grace having faced many challenges. Times and periods of rejection, back and forth but was never crushed.",
      paragraphs2: [
        "The present Vicar Ven. Prof. Chibueze Haggai Njoku didn't relent but keyed into the Vision and ensured that the current church building today became a reality by God's Grace with other priests and Mission Workers working with him. Donatus Chikendu though served for only four months and presently our able Ven. Ogbuji Justin still with us today as assisting priest.",
        "The Church started with about four families in 1990, who were Lay Reader Inspector Franklin Nwachukwu, Lay Reader Ahuchaogu a police officer who also was the choir master presently Okeso and has retired home but the wife and children are still fully active as Evangelist Mrs Theresa Okeso. We also had few others like Mr. Larry, Mr. Enoch and Mr. Ejiofor among the first worshippers.",
        "In 2003, 5 more families joined which included L/R Ezedinobi and family, L/R Chris Emenogu and family, Sir Nnoli and family, L/R Luis Amaefula and family, Mrs. Chizoma Asomonye Mrs. Chika Nwosu and family, etc. The church numerical strengths from 2006 till 2016 was about 45 families. But as at date the church could boast of over 55 families. The church is growing spiritually as well as materially to the glory of God.",
        "On the 15th December, 2020 inauguration of Ascension Deanery was done by His Grace, The Most Rev. Tunde Adeleye. The Archbishop of Ecclesiastical province of Niger Delta and Bishop Diocese of Calabar. Some who were with us years past has gone to be with the Lord their maker. Some priests too to glory and may their souls receive eternal repose from God of all flesh. Yet, there are many lands to conquer, many souls to be worn and many crowns to wear. May we not be weary in the work of the Lord for in it, we shall be remembered.",
        "On Ascension Day, the 14th of May, 2026, during the re-dedication of the church building and vicarage, the Diocesan Bishop, Rt. Rev. Prof. Nneoyi Onen Egbe, pronounced Ascension a full-fledged Archdeaconry. Source: Ascension Re-dedication Service 2026 Programme.",
      ],
      image:
        "https://i.postimg.cc/tJQJFJ7g/Gemini-Generated-Image-l2snitl2snitl2sn.png",
    },
    leaders: [
      {
        id: "1",
        name: "Ven. Prof. Chibueze Haggai Njoku",
        role: "Archdeacon / Vicar",
        bio: "A visionary leader who guided the church's structural and spiritual expansion from a Deanery into a newly inaugurated Archdeaconry.",
        image: "https://placehold.co/400x400/eeeeee/999999?text=Ven+Njoku",
      },
      {
        id: "2",
        name: "Ven. Ogbuji Justin",
        role: "Assisting Priest",
        bio: "Faithfully serving the Ascension congregation alongside the Archdeacon.",
        image: "https://placehold.co/400x400/eeeeee/999999?text=Ven+Ogbuji",
      },
    ],
    churches: [
      {
        id: "1",
        name: "Anglican Church of Ascension",
        address: "8 Miles, Ikot Omin, Calabar",
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
          "https://placehold.co/1000x1500/eeeeee/999999?text=Calabar+Archdeacon",
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
