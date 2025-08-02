export interface BishopData {
  image: string;
  title: string;
  description: string;
  link?: string;
}

export const bishop: BishopData[] = [
  {
    image: "https://placehold.co/600x400/png?text=Ekprikpo",
    title: "The Rt. Rev. Wilfred G. Ekprikpo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "/archdeaconries/akampka",
  },
  {
    image: "https://placehold.co/600x400/png?text=Adeleye",
    title: "The Most. Rev. Tunde A (Rtd)",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    link: "/archdeaconries/ascension",
  },
  {
    image: "https://placehold.co/600x400/png?text=Egbe",
    title: "The Rt. Rev. Nneoyi O. Egbe",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    link: "/archdeaconries/cathedral",
  },
];
