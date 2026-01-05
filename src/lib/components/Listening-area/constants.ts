import type { Hotspot, VisibilityState, PlaneVisibilityState } from './types';

export const STEPS: number[] = [0, 25, 50, 75, 100];

export const STEP_LABELS: string[] = [
  'Step 1: No airplane noise - All animals visible',
  'Step 2: Red Fox highlighted with airplane 1',
  'Step 3: Predator highlighted with airplane 2',
  'Step 4: Mate highlighted with airplane 3',
  'Step 5: Prey highlighted with all airplanes'
];

export const PLANE_VISIBILITY: Record<number, PlaneVisibilityState> = {
  0: { plane1: false, plane2: false, plane3: false },
  25: { plane1: false, plane2: false, plane3: false },
  50: { plane1: true, plane2: false, plane3: false },
  75: { plane1: false, plane2: true, plane3: false },
  100: { plane1: false, plane2: false, plane3: true }
};

export const MASK_VISIBILITY: Record<number, VisibilityState> = {
  0: { mask1: false, mask2: false, mask3: false, mask4: false },
  25: { mask1: true, mask2: false, mask3: false, mask4: false },
  50: { mask1: false, mask2: true, mask3: false, mask4: false },
  75: { mask1: false, mask2: false, mask3: true, mask4: false },
  100: { mask1: false, mask2: false, mask3: false, mask4: true }
};

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'red-fox',
    name: 'Red Fox',
    image: '/src/lib/assets/images/fox-2.png',
    showAt: 0,
    highlightAt: 25,
    maskNumber: 1,
    description: 'The red fox\'s listening area spans a 100-foot radius. Currently, she can hear her prey, her mate, and a predator. Move the slider to see how her listening area is affected by background noise.'
  },
  {
    id: 'predator',
    name: 'Predator',
    image: '/src/lib/assets/images/mountain-lion.png',
    showAt: 0,
    highlightAt: 50,
    maskNumber: 2,
    description: 'An airplane has entered our environment from the left. Our subject\'s listening area has decreased and she can no longer hear the mountain lion lurking around.'
  },
  {
    id: 'mate',
    name: 'Mate',
    image: '/src/lib/assets/images/fox.png',
    showAt: 0,
    highlightAt: 75,
    maskNumber: 3,
    description: 'Our subject\'s listening area decreases further as the airplane gets closer. Now she is unable to hear her mate who may be calling for her.'
  },
  {
    id: 'prey',
    name: 'Prey',
    image: '/src/lib/assets/images/rabbit.png',
    showAt: 0,
    highlightAt: 100,
    maskNumber: 4,
    description: 'The airplane is now directly above our subject reducing her listening area even further. The sound from the airplane masks the noise of her prey who was hiding near the bushes.'
  }
];
