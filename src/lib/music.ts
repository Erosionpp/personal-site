export interface Track {
  title: string;
  artist: string;
  src: string; // path to audio file in /public/music/ or URL
}

export const playlist: Track[] = [
  {
    title: "红豆",
    artist: "方大同",
    src: "/music/hongdou.mp3",
  },
];
