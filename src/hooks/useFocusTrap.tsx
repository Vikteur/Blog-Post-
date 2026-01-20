import { useEffect, useRef } from 'react';

/**
 * Custom hook to trap focus within a modal or dialog
 * Returns a ref to attach to the modal container
 */
export function useFocusTrap<T extends HTMLElement>(isActive: boolean) {
  const elementRef = useRef<T>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !elementRef.current) return;

    // Store the currently focused element to restore later
    previousActiveElement.current = document.activeElement as HTMLElement;

    const element = elementRef.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus the first focusable element
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);

    return () => {
      element.removeEventListener('keydown', handleTabKey);
      
      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive]);

  return elementRef;
}
