export interface Distributor {
  id: string;
  name: string;
  feesPercentage: number;
  logo: string;
}

export const distributors: Distributor[] = [
  {
    id: "musicpro",
    name: "MusicPro",
    feesPercentage: 25,
    logo: "https://play-lh.googleusercontent.com/GbRLRa5YJJuaF1fNLiwwlBwFXOEkG_HC_yP12exSdFeTb9MbXIorl0KdKO1OuzsALg",
  },
  {
    id: "cdbaby",
    name: "CD Baby",
    feesPercentage: 9,
    logo: "https://seeklogo.com/images/C/cd-baby-logo-7B56E727C6-seeklogo.com.png",
  },
  {
    id: "onerpm",
    name: "ONErpm",
    feesPercentage: 15,
    logo: "https://offstep.com/wp-content/uploads/sites/10/2022/11/logo.webp",
  },
  {
    id: "unitedmasters",
    name: "UnitedMasters",
    feesPercentage: 10,
    logo: "https://cdn6.aptoide.com/imgs/f/5/a/f5ad4c7f71818f4d8035a7374c6dbb78_icon.png",
  },
];
