import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./Archdeaconry.css";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../styles/event.module.css";
import ArchdeaconryCard from "./ArchdeaconryCard";
import type { Swiper as SwiperType } from "swiper";
import { useEffect, useRef, useState } from "react";

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
    image: "https://i.postimg.cc/bJby6gTr/image.png",
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

export default function ArchdeaconrySlider() {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (swiper) {
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.1,
      },
    },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <section
      className={styles.eventSection}
      style={{ marginTop: "40px", backgroundColor: "#fff" }}
    >
      <div className={styles.container}>
        <br />
        <motion.div
          className="arch-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div className="arch-header-text" variants={containerVariants}>
            <motion.span className="arch-header-sub" variants={itemVariants}>
              ARCHDEACONRIES
            </motion.span>
            <motion.h1 className="arch-title" variants={itemVariants}>
              Our Archdeaconries
            </motion.h1>
            <motion.div
              className="archtitle-underline"
              variants={itemVariants}
            />
          </motion.div>

          <motion.div
            className="display-none arch-controls"
            variants={containerVariants}
          >
            <button
              ref={navigationPrevRef}
              onClick={() => swiper?.slidePrev()}
              className="arch-nav-btn arch-nav-prev"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              ref={navigationNextRef}
              onClick={() => swiper?.slideNext()}
              className="arch-nav-btn arch-nav-next"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          loop={true}
          onSwiper={setSwiper}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className={styles.swiper}
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
      </div>
    </section>
  );
}
