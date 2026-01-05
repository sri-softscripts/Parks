export interface AnimalBehavior {
  type: 'mating' | 'habitat-patterns' | 'hunting' | 'predator-avoidance';
  label: string;
  active: boolean;
  icon: string;
  color: string;
}

export interface AnimalItem {
  id: string;
  title: string;
  description: string;
  citation: string;
  image: string;
  thumb: string;
  behaviors: AnimalBehavior[];
  nextItem?: string;
  prevItem?: string;
}

export interface HumanEffectType {
  type: 'benefit' | 'negative';
  label: string;
  active: boolean;
  icon: string;
  color: string;
}

export interface HumanItem {
  id: string;
  title: string;
  description: string;
  citation: string;
  image: string;
  thumb: string;
  effectType: HumanEffectType;
  nextItem?: string;
  prevItem?: string;
}

export interface Section {
  id: 'animals' | 'humans';
  label: string;
  backgroundImage: string;
  items: (AnimalItem | HumanItem)[];
}

export interface FunctionalEffectsData {
  title: string;
  subtitle: string;
  description: string;
  sections: Section[];
}