import React, { useEffect, useRef } from "react";
import "./Archdeaconry.css";
import ArchdeaconryCard from "./ArchdeaconryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

interface ArchdeaconryData {
  image: string;
  title: string;
  description: string;
  link: string;
}

const archdeaconries: ArchdeaconryData[] = [
  {
    image: "https://placehold.co/600x400/png?text=Akampka",
    title: "Akampka Archdeaconry",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "/archdeaconries/akampka",
  },
  {
    image: "https://placehold.co/600x400/png?text=Ascension",
    title: "Ascension Deanery",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    link: "/archdeaconries/ascension",
  },
  {
    image: "https://placehold.co/600x400/png?text=Cathedral",
    title: "Cathedral Archdeaconry",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    link: "/archdeaconries/cathedral",
  },
  {
    image: "https://placehold.co/600x400/png?text=Calabar",
    title: "Calabar Archdeaconry",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: "/archdeaconries/calabar",
  },
  {
    image: "https://placehold.co/600x400/png?text=Christ",
    title: "Christ-church Deanery",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    link: "/archdeaconries/christ-church",
  },
  {
    image: "https://placehold.co/600x400/png?text=Efut",
    title: "Efut Deanery",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    link: "/archdeaconries/efut",
  },
  {
    image: "https://placehold.co/600x400/png?text=Ikom",
    title: "Ikom Archdeaconry",
    description:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    link: "/archdeaconries/ikom",
  },
  {
    image: "https://placehold.co/600x400/png?text=Obubra",
    title: "Obubra Missionary Archdeaconry",
    description:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    link: "/archdeaconries/obubra",
  },
  {
    image: "https://placehold.co/600x400/png?text=Obudu",
    title: "Obudu Missionary Archdeaconry",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    link: "/archdeaconries/obudu",
  },
  {
    image: "https://placehold.co/600x400/png?text=Ogoja",
    title: "Ogoja Archdeaconry",
    description:
      "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi.",
    link: "/archdeaconries/ogoja",
  },
  {
    image: "https://placehold.co/600x400/png?text=Yakurr",
    title: "Yakurr Missionary Archdeaconry",
    description:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.",
    link: "/archdeaconries/yakurr",
  },
  {
    image: "https://placehold.co/600x400/png?text=Yala-East",
    title: "Yala-East Missionary Archdeaconry",
    description:
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias.",
    link: "/archdeaconries/yala-east",
  },
  {
    image: "https://placehold.co/600x400/png?text=Yala-West",
    title: "Yala-West Missionary Archdeaconry",
    description:
      "Nulla pariatur. Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.",
    link: "/archdeaconries/yala-west",
  },
];
function Archdeaconry() {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      // Update navigation after refs are set
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <section className="arch-section">
      <div className="arch-header">
        <div className="arch-header-text">
          <span className="arch-header-sub">ARCHDEACONRIES</span>
          <h1 className="arch-title">Our Archdeaconries</h1>
          <div className="archtitle-underline"></div>
        </div>

        <div className="arch-controls">
          <button
            ref={navigationPrevRef}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            &larr;
          </button>
          <button
            ref={navigationNextRef}
            onClick={() => swiperRef.current?.slideNext()}
          >
            &rarr;
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
          // Initialize navigation after swiper is created
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="arch-slider"
      >
        {archdeaconries.map((item, index) => (
          <SwiperSlide key={index}>
            <ArchdeaconryCard
              image={item.image}
              title={item.title}
              description={item.description}
              link={item.link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Archdeaconry;