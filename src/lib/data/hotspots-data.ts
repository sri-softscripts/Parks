export type AnimalHotspot = {
  id: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  image: string;
  thumbnail: string;
  title: string;
  description: string;
  citation: string;
  behaviors: {
    name: string;
    icon: string;
    active: boolean;
  }[];
};

export type HumanHotspot = {
  id: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  image: string;
  thumbnail: string;
  title: string;
  description: string;
  citation: string;
  effects: {
    name: string;
    icon: string;
    active: boolean;
  }[];
};

export const animalHotspots: AnimalHotspot[] = [
  {
    id: 'frog',
    position: { x: 360, y: 50, z: 20 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/frog@2x.jpg',
    thumbnail: '/images/button-frog@2x.jpg',
    title: 'Frogs',
    description: 'Female frogs exposed to traffic noise have more difficulty locating the male\'s signal.',
    citation: '(Brumm 2004)',
    behaviors: [
      { name: 'Mating', icon: '/icons/icon-mating.svg', active: true },
      { name: 'Habitat Patterns', icon: '/icons/icon-habitat-pattern.svg', active: false },
      { name: 'Hunting', icon: '/icons/icon-hunting.svg', active: false },
      { name: 'Predator Avoidance', icon: '/icons/icon-predatory-avoidance.svg', active: false }
    ]
  },
//   {
//     id: 'bat',
//     position: { x: -300, y: 65, z: 350 },
//     rotation: { x: 0, y: 0, z: 0 },
//     image: '/images/button-bat@2x.jpg',
//     thumbnail: '/images/button-bat@2x.jpg',
//     title: 'Bats',
//     description: 'Gleaning bats avoid hunting in areas with road noise.',
//     citation: '(Brumm 2004)',
//     behaviors: [
//       { name: 'Mating', icon: '/icons/icon-mating.svg', active: false },
//       { name: 'Habitat Patterns', icon: '/icons/icon-habitat-pattern.svg', active: false },
//       { name: 'Hunting', icon: '/icons/icon-hunting.svg', active: true },
//       { name: 'Predator Avoidance', icon: '/icons/icon-predatory-avoidance.svg', active: false }
//     ]
//   },
  {
    id: 'squirrel',
    position: { x: 0, y: -175, z: -400 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/squirel@2x.jpg',
    thumbnail: '/images/button-squirel@2x.jpg',
    title: 'Squirrels',
    description: 'Tree squirrels in noisy areas spend less time foraging for food, and more time on the look out for predators —resulting in reduced food intake.',
    citation: '(Francis et al., 2009)',
    behaviors: [
      { name: 'Mating', icon: '/icons/icon-mating.svg', active: false },
      { name: 'Habitat Patterns', icon: '/icons/icon-habitat-pattern.svg', active: false },
      { name: 'Hunting', icon: '/icons/icon-hunting.svg', active: false },
      { name: 'Predator Avoidance', icon: '/icons/icon-predatory-avoidance.svg', active: true }
    ]
  },
  {
    id: 'songbird',
    position: { x: -400, y: 85, z: 60 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/songbird@2x.jpg',
    thumbnail: '/images/thumb-bird.png',
    title: 'Songbirds',
    description: 'Songbirds show greater nest desertion and abandonment within 100 m of off-road vehicle trails.',
    citation: '(Barton & Holmes, 2007)',
    behaviors: [
      { name: 'Mating', icon: '/icons/icon-mating.svg', active: false },
      { name: 'Habitat Patterns', icon: '/icons/icon-habitat-pattern.svg', active: true },
      { name: 'Hunting', icon: '/icons/icon-hunting.svg', active: false },
      { name: 'Predator Avoidance', icon: '/icons/icon-predatory-avoidance.svg', active: false }
    ]
  },
  {
    id: 'pronghorn',
    position: { x: -300, y: 65, z: 350 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/pronghorn.jpeg',
    thumbnail: '/images/thumb-pronghorn@2x.png',
    title: 'Pronghorn',
    description: 'The endangered Sonoran pronghorn avoids noisy areas created by military jets.',
    citation: '(Brumm 2004)',
    behaviors: [
      { name: 'Mating', icon: '/icons/icon-mating.svg', active: false },
      { name: 'Habitat Patterns', icon: '/icons/icon-habitat-pattern.svg', active: true },
      { name: 'Hunting', icon: '/icons/icon-hunting.svg', active: false },
      { name: 'Predator Avoidance', icon: '/icons/icon-predatory-avoidance.svg', active: false }
    ]
  }
];

export const humanHotspots: HumanHotspot[] = [
  {
    id: 'recovery',
    position: { x: 480, y: 40, z: 20 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/recovery@2x.jpg',
    thumbnail: '/images/button-recovery@2x.jpg',
    title: 'Facilitate Recovery',
    description: 'Nature sounds can help facilitate recovery from psychological stress.',
    citation: '(Alvarsson et al., 2010)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', active: true },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', active: false }
    ]
  },
  {
    id: 'physical',
    position: { x: -300, y: 35, z: 350 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/physical@2x.jpg',
    thumbnail: '/images/button-physical@2x.jpg',
    title: 'Physical Effects',
    description: 'Exposure to aircraft or road traffic noise can result have physiological impacts including high blood pressure, increased heart rate, and increased stress hormones.',
    citation: '(Babisch 2011)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', active: false },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', active: true }
    ]
  },
  {
    id: 'appreciation',
    position: { x: 0, y: 50, z: -490 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/appreciation@2x.jpg',
    thumbnail: '/images/button-appreciation@2x.jpg',
    title: 'Appreciation',
    description: 'One study found that helicopter noise interferes with the quality of the visitor experience and even affects the perceived aesthetic quality of landscapes.',
    citation: '(Weinzimmer et al., 2014)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', active: false },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', active: true }
    ]
  },
  {
    id: 'peace',
    position: { x: 463.69, y: 66.77, z: -180.77 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/peace@2x.jpg',
    thumbnail: '/images/button-peace@2x.jpg',
    title: 'Experience Peace',
    description: '95% of Americans say one of the most important reasons for preserving national parks is to provide opportunities to experience natural peace and the sounds of nature.',
    citation: '(McDonald et al., 1995)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', active: true },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', active: false }
    ]
  },
  {
    id: 'annoyance',
    position: { x: -150.52, y: 100, z: -550.1 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/annoyance@2x.jpg',
    thumbnail: '/images/button-annoyance@2x.jpg',
    title: 'Annoyance',
    description: 'Park visitors reported that air tours, maintenance equipment, noisy visitors, loud talking, and other related sounds substantially detract from the quality of the visitor experience.',
    citation: '(Pilcher et al., 2009)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', active: false },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', active: true }
    ]
  },
  {
    id: 'disturbance',
    position: { x: -478.92, y: 83.92, z: -195.34 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/disturbance@2x.jpg',
    thumbnail: '/images/button-disturbance@2x.jpg',
    title: 'Disturbance',
    description: 'Noise has been shown to be more disturbing to visitors if it is loud, occurs in bursts (Bell et al., 2010), is unpredictable, or if it interferes with quiet activities such as bird watching.',
    citation: '(Miller et al., 2014)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', active: false },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', active: true }
    ]
  }
];