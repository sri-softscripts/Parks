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
    class: string;
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
    class: string;
    active: boolean;
  }[];
};

export const animalHotspots: AnimalHotspot[] = [
  {
    id: 'frog',
    position: { x: 50, y: 100, z: -400 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/frog@2x.jpg',
    thumbnail: '/images/thumb-frog.png',
    title: 'Frogs',
    description: 'Female frogs exposed to traffic noise have more difficulty locating the male\'s signal.',
    citation: '(Brumm 2004)',
    behaviors: [
      { name: 'Mating', icon: '/icons/icon-mating.svg', class:'icon-mating', active: true },
      { name: 'Habitat Patterns', icon: '/icons/icon-habitat-pattern.svg', class:'icon-habitat-pattern', active: false },
      { name: 'Hunting', icon: '/icons/icon-hunting.svg', class:'icon-hunting', active: false },
      { name: 'Predator Avoidance', icon: '/icons/icon-predatory-avoidance.svg', class:'icon-predator-avoidance', active: false }
    ]
  },


  
  {
    id: 'bat',
    position: { x: 360, y: 50, z: 20 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/bat@2x.jpg',
    thumbnail: '/images/thumb-bat.svg',    
    title: 'Bats',
    description: 'Gleaning bats avoid hunting in areas with road noise.',
    citation: '(Brumm 2004)',
    behaviors: [
      { name: 'Mating', icon: '/icons/icon-mating.svg', class:'icon-mating', active: false },
      { name: 'Habitat Patterns', icon: '/icons/icon-habitat-pattern.svg', class:'icon-habitat-pattern', active: false },
      { name: 'Hunting', icon: '/icons/icon-hunting.svg', class:'icon-hunting', active: true },
      { name: 'Predator Avoidance', icon: '/icons/icon-predatory-avoidance.svg', class:'icon-predator-avoidance', active: false }
    ]
  },
  {
    id: 'squirrel',
    position: { x: 0, y: -175, z: -400 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/squirel@2x.jpg',
    thumbnail: '/images/thumb-squirrel.webp',
    title: 'Squirrels',
    description: 'Tree squirrels in noisy areas spend less time foraging for food, and more time on the look out for predators —resulting in reduced food intake.',
    citation: '(Francis et al., 2009)',
    behaviors: [
      { name: 'Mating', icon: '/icons/icon-mating.svg', class:'icon-mating',  active: false },
      { name: 'Habitat Patterns', icon: '/icons/icon-habitat-pattern.svg', class:'icon-habitat-patterns',  active: false },
      { name: 'Hunting', icon: '/icons/icon-hunting.svg', class:'icon-hunting',  active: false },
      { name: 'Predator Avoidance', icon: '/icons/icon-predatory-avoidance.svg', class:'icon-predator-avoidance',  active: true }
    ]
  },
  {
    id: 'songbird',
    position: { x: -400, y: 85, z: 60 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/songbird@2x.jpg',
    thumbnail: '/images/thumb-bird.webp',
    title: 'Songbirds',
    description: 'Songbirds show greater nest desertion and abandonment within 100 m of off-road vehicle trails.',
    citation: '(Barton & Holmes, 2007)',
    behaviors: [
      { name: 'Mating', icon: '/icons/icon-mating.svg', class:'icon-mating',  active: false },
      { name: 'Habitat Patterns', icon: '/icons/icon-habitat-pattern.svg', class:'icon-habitat-patterns',  active: true },
      { name: 'Hunting', icon: '/icons/icon-hunting.svg', class:'icon-hunting',  active: false },
      { name: 'Predator Avoidance', icon: '/icons/icon-predatory-avoidance.svg', class:'icon-predator-avoidance',  active: false }
    ]
  },
  {
    id: 'pronghorn',
    position: { x: -300, y: 65, z: 350 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/pronghorn@2x.jpg',
    thumbnail: '/icons/thumb-pronghorn.svg',
    title: 'Pronghorn',
    description: 'The endangered Sonoran pronghorn avoids noisy areas created by military jets.',
    citation: '(Brumm 2004)',
    behaviors: [
      { name: 'Mating', icon: '/icons/icon-mating.svg', class:'icon-mating',  active: false },
      { name: 'Habitat Patterns', icon: '/icons/icon-habitat-pattern.svg', class:'icon-habitat-patterns',  active: true },
      { name: 'Hunting', icon: '/icons/icon-hunting.svg', class:'icon-hunting',  active: false },
      { name: 'Predator Avoidance', icon: '/icons/icon-predatory-avoidance.svg', class:'icon-predator-avoidance',  active: false }
    ]
  }
];

export const humanHotspots: HumanHotspot[] = [
  {
    id: 'recovery',
    position: { x: 480, y: 40, z: 20 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/recovery@2x.jpg',
    thumbnail: '/images/thumb-recovery.webp',
    title: 'Facilitate Recovery',
    description: 'Nature sounds can help facilitate recovery from psychological stress.',
    citation: '(Alvarsson et al., 2010)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg',class:'icon-benefit', active: true },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg',class:'icon-negative', active: false }
    ]
  },
  {
    id: 'physical',
    position: { x: -300, y: 35, z: 350 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/physical@2x.jpg',
    thumbnail: '/images/thumb-physical.webp',
    title: 'Physical Effects',
    description: 'Exposure to aircraft or road traffic noise can result have physiological impacts including high blood pressure, increased heart rate, and increased stress hormones.',
    citation: '(Babisch 2011)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', class:'icon-benefit', active: false },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', class:'icon-negative', active: true }
    ]
  },
  {
    id: 'appreciation',
    position: { x: -400, y: 85, z: 60 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/appreciation@2x.jpg',
    thumbnail: '/images/thumb-appreciation.webp',
    title: 'Appreciation',
    description: 'One study found that helicopter noise interferes with the quality of the visitor experience and even affects the perceived aesthetic quality of landscapes.',
    citation: '(Weinzimmer et al., 2014)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', class:'icon-benefit', active: false },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', class:'icon-negative', active: true }
    ]
  },
  {
    id: 'peace',
    position: { x: -20, y: 65, z: 350 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/peace@2x.jpg',
    thumbnail: '/images/thumb-peace.svg',
    title: 'Experience Peace',
    description: '95% of Americans say one of the most important reasons for preserving national parks is to provide opportunities to experience natural peace and the sounds of nature.',
    citation: '(McDonald et al., 1995)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', class:'icon-benefit', active: true },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', class:'icon-negative', active: false }
    ] 
  },
  {
    id: 'annoyance',
    position: { x: -300, y: -200, z: 20 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/annoyance@2x.jpg',
    thumbnail: '/images/thumb-crowd-gather.webp',
    title: 'Annoyance',
    description: 'Park visitors reported that air tours, maintenance equipment, noisy visitors, loud talking, and other related sounds substantially detract from the quality of the visitor experience.',
    citation: '(Pilcher et al., 2009)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', class:'icon-benefit', active: false },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', class:'icon-negative', active: true }
    ]
  },
  {
    id: 'disturbance',
    position: { x: 50, y: 100, z: -400 },
    rotation: { x: 0, y: 0, z: 0 },
    image: '/images/disturbance@2x.jpg',
    thumbnail: '/images/thumb-distrubance.webp',
    title: 'Disturbance',
    description: 'Noise has been shown to be more disturbing to visitors if it is loud, occurs in bursts (Bell et al., 2010), is unpredictable, or if it interferes with quiet activities such as bird watching.',
    citation: '(Miller et al., 2014)',
    effects: [
      { name: 'Benefit', icon: '/icons/icon-benefit.svg', class:'icon-benefit', active: false },
      { name: 'Negative Effect', icon: '/icons/icon-negative.svg', class:'icon-negative', active: true }
    ]
  }
];