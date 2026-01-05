
export interface Hotspot {
  id: string;
  name: string;
  image: string;
  showAt: number;
  highlightAt: number;
  maskNumber: number;
  description: string;
}

export interface VisibilityState {
  mask1: boolean;
  mask2: boolean;
  mask3: boolean;
  mask4: boolean;
}

export interface PlaneVisibilityState {
  plane1: boolean;
  plane2: boolean;
  plane3: boolean;
}

export interface SliderStep {
  value: number;
  label: string;
}

export interface SliderStyles {
  fill: string;
  handle: string;
}


