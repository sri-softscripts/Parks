import { STEPS, MASK_VISIBILITY, PLANE_VISIBILITY } from './constants';
import type { VisibilityState, PlaneVisibilityState } from './types';

export function snapToStep(value: number): number {
  let closestStep = 0;
  let minDifference = Infinity;
  
  STEPS.forEach(step => {
    const difference = Math.abs(step - value);
    if (difference < minDifference) {
      minDifference = difference;
      closestStep = step;
    }
  });
  
  return closestStep;
}

export function findStepIndex(value: number): number {
  return STEPS.findIndex(step => step === value);
}

export function getSliderStyles(scrubValue: number) {
  // Constrain handle position between 8% and 92%
  // This keeps handle within track boundaries
  const constrainedValue = Math.max(7, Math.min(93, scrubValue));
  
  return {
    fill: `width: ${scrubValue}%;`, // Fill uses actual value
    handle: `left: ${constrainedValue}%; transform: translateX(-50%);` // Handle uses constrained value
  };
}

export function getCurrentMaskVisibility(currentStepValue: number): VisibilityState {
  return MASK_VISIBILITY[currentStepValue] || MASK_VISIBILITY[0];
}

export function getCurrentPlaneVisibility(currentStepValue: number): PlaneVisibilityState {
  return PLANE_VISIBILITY[currentStepValue] || PLANE_VISIBILITY[0];
}

export function getActiveCalloutId(maskVisibility: VisibilityState): string {
  if (maskVisibility.mask1) return 'red-fox';
  if (maskVisibility.mask2) return 'predator';
  if (maskVisibility.mask3) return 'mate';
  if (maskVisibility.mask4) return 'prey';
  return '';
}

export function getAudioToPlay(maskVisibility: VisibilityState): string {
  if (maskVisibility.mask1) return '';
  if (maskVisibility.mask2) return '';
  if (maskVisibility.mask3) return '';
  if (maskVisibility.mask4) return '';
  return ''; 
}
// audio names
// fox.mp3           
// mountain-lion.mp3 
// fox-mate.mp3      
// rabbit.mp3


