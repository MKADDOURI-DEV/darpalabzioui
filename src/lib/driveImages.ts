/**
 * Photos hébergées sur Google Drive (dossier partagé "anyone with the link").
 * Pour changer le mapping chambre -> dossier, modifier uniquement ce fichier.
 */
export const driveImg = (id: string, width = 1600) =>
  `https://lh3.googleusercontent.com/d/${id}=w${width}`;

// Dossiers Drive: Photos/1, Photos/2, Photos/3, Photos/4, Photos/Espaces Riad
export const DRIVE_FOLDERS = {
  folder1: [
    '1WzJy8st8kA_vvf3_nhT0b909rNFphicA', // _DSC3865
    '1lhx9EFJqZkaPXnVfb1xAMIFvgnQZs9TQ', // _DSC3928
    '1wXv02BGgYa0j-07COsBMWCPIDyPJ-whk', // _DSC3915
  ],
  folder2: [
    '1b5G9bs4Rwk55zzTsR28HYX6kBJLX9KEe', // _DSC3962
    '121ftbGJGLYlh8hm06fnk068F_AvPMU2k', // _DSC3965
  ],
  folder3: [
    '1tuWw-JJTfs6PlN3GdNreQOTypy_ayNZd', // _DSC4070
    '1GRtI-v5RmowwSp1jkSIAv4BIugimqqdd', // _DSC4061
    '1OMGfw7ivv9QzgAOFVsr-787EtL2gb1rI', // _DSC4082
  ],
  folder4: [
    '1R3wlPxJ30CG22C6fKz7j89-peTwnH5-v', // _DSC3980
    '1s120oQ9TBxwsidapJQMofJLvtc0IfN42', // _DSC3995
  ],
  espaces: [
    '19sM8ynyE_x8HjNafF3mzghWC_jool6yK', // _DSC4091
    '1JpmckJpMB6gIMRMNkDNr7ANGC7SRlSHk', // _DSC4109
    '1pvRUYWyIzTQBAbbiz326AGR8Pmxx1n_o', // _DSC4129
    '1kTpZlCYNj0P_KqMvzaV6a89v7QK18HhV', // _DSC4147
  ],
} as const;

// Mapping chambre -> dossier (à ajuster si besoin)
export const ROOM_FOLDERS = {
  double: DRIVE_FOLDERS.folder1,
  twin: DRIVE_FOLDERS.folder2,
  triple: DRIVE_FOLDERS.folder3,
} as const;

// Vidéo du hero: fichier compressé à placer dans public/assets/video/hero.mp4
// Tant que le fichier n'existe pas (ou en cas d'erreur), le hero affiche la photo.
export const HERO_VIDEO_URL = '/assets/video/hero.mp4';
export const HERO_POSTER = driveImg(DRIVE_FOLDERS.espaces[0], 1920);

// Moteur de réservation Nozoul
export const NOZOUL_BOOKING_URL =
  'https://dar-ba-labzioui.nozoul.ma/#/be/5088ac11-f29f-4eff-bf9d-4281884e42e5/book';
