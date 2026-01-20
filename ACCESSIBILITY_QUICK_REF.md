# Accessibility Quick Reference Guide

## Quick Testing Checklist ✅

### Keyboard Testing (5 minutes)
```
□ Press Tab - Skip link appears at top
□ Tab through all interactive elements
□ Open modal - press Tab (focus stays in modal)
□ Press ESC - modal closes, focus returns
□ Navigate menu with keyboard
□ Submit forms with Enter key
□ All buttons activate with Space/Enter
```

### Screen Reader Testing (10 minutes)
```
□ Turn on screen reader (NVDA: Ctrl+Alt+N)
□ Navigate between pages - hear route announcements
□ Tab through forms - hear all labels
□ Trigger an error - hear error announcement
□ Open modal - hear modal title
□ Navigate blog posts - hear article structure
```

### Visual Testing (5 minutes)
```
□ Zoom to 200% - content still readable
□ Enable high contrast mode - everything visible
□ Disable CSS animations - no jarring motion
□ Check all focus indicators are visible
□ Verify button text is readable
```

---

## Common Accessibility Patterns Used

### Modal Pattern
```tsx
import { useFocusTrap } from '../hooks/useFocusTrap';

function MyModal({ isOpen, onClose }) {
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);
  
  if (!isOpen) return null;
  
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div onClick={onClose} aria-hidden="true" /> {/* Backdrop */}
      <div ref={modalRef}>
        <h2 id="modal-title">Modal Title</h2>
        {/* Content */}
      </div>
    </div>
  );
}
```

### Form Field Pattern
```tsx
<div>
  <label htmlFor="email">
    Email <span aria-label="required">*</span>
  </label>
  <input
    type="email"
    id="email"
    required
    aria-required="true"
    autoComplete="email"
  />
</div>
```

### Error Message Pattern
```tsx
{error && (
  <div 
    role="alert" 
    aria-live="assertive"
    className="bg-red-100 text-red-700 p-3"
  >
    {error}
  </div>
)}
```

### Loading State Pattern
```tsx
{isLoading && (
  <div role="status" aria-live="polite">
    <p>Loading...</p>
  </div>
)}
```

### Button Pattern
```tsx
<button
  onClick={handleClick}
  aria-label="Descriptive action"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <Icon aria-hidden="true" />
  Text
</button>
```

---

## ARIA Attributes Reference

### Common ARIA Roles
- `role="dialog"` - Modal dialogs
- `role="alert"` - Error messages (announced immediately)
- `role="status"` - Loading states (announced politely)
- `role="search"` - Search forms
- `role="navigation"` - Navigation areas
- `role="main"` - Main content area

### Common ARIA Properties
- `aria-label="Description"` - Accessible name
- `aria-labelledby="id"` - Label by another element
- `aria-describedby="id"` - Additional description
- `aria-hidden="true"` - Hide from screen readers
- `aria-expanded="true/false"` - Collapsible state
- `aria-controls="id"` - Controls another element
- `aria-required="true"` - Required field
- `aria-invalid="true"` - Field has error
- `aria-live="polite/assertive"` - Dynamic updates
- `aria-modal="true"` - Modal dialog
- `aria-busy="true"` - Loading state

---

## Keyboard Shortcuts

### Universal
- `Tab` - Next focusable element
- `Shift+Tab` - Previous focusable element
- `Enter` - Activate button/link
- `Space` - Activate button
- `ESC` - Close modal/dialog

### Screen Reader Specific (NVDA)
- `Insert+Down` - Read all
- `H` - Next heading
- `K` - Next link
- `B` - Next button
- `F` - Next form field
- `D` - Next landmark

---

## CSS for Accessibility

### Focus Indicators
```css
*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

### Screen Reader Only
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Touch Targets
```css
@media (pointer: coarse) {
  button, a {
    min-height: 44px;
    min-width: 44px;
  }
}
```

---

## Automated Testing Commands

### Install Testing Tools
```bash
npm install -D @axe-core/cli pa11y
```

### Run Tests
```bash
# Start dev server
npm run dev

# In another terminal:

# Axe-core (comprehensive)
npx @axe-core/cli http://localhost:5173 --exit

# Pa11y (detailed reports)
npx pa11y http://localhost:5173 --reporter html > report.html
```

---

## Resources

### Documentation
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)

### Tools
- [NVDA Screen Reader](https://www.nvaccess.org/) - Free
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Web accessibility checker

### Testing
- [Keyboard Testing](https://webaim.org/articles/keyboard/)
- [Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## When to Use What

| Situation | Solution |
|-----------|----------|
| New modal/dialog | Use `useFocusTrap` hook |
| Form input | Always use `<label>` with `htmlFor` |
| Loading content | `role="status"` + `aria-live="polite"` |
| Error message | `role="alert"` + `aria-live="assertive"` |
| Icon-only button | Add `aria-label` |
| Decorative image | `alt=""` or `aria-hidden="true"` |
| Meaningful image | Descriptive `alt` text |
| Required field | Visual indicator + `aria-required` |
| New route | Update RouteAnnouncer if needed |
| Hide from SR | `aria-hidden="true"` |
| Button vs Link | Button for actions, Link for navigation |

---

## Red Flags 🚩

**Avoid these anti-patterns:**

❌ `<div onClick={...}>` without `role="button"` and keyboard support
❌ Removing focus outlines without providing alternative
❌ Using color alone to convey information  
❌ `<img>` without alt attribute
❌ Forms without labels
❌ Modal without focus trap
❌ Dynamic content changes without announcements
❌ `<button>` inside `<button>` or `<a>`
❌ Using `tabindex` > 0
❌ Generic link text like "Click here" or "Read more"

✅ **Use instead:**
- Semantic HTML (`<button>`, `<a>`, `<nav>`, etc.)
- Proper focus management
- Clear, descriptive labels
- ARIA when semantic HTML isn't enough
- Test with keyboard and screen reader

---

## Support

Questions? Check:
1. `ACCESSIBILITY.md` - Full documentation
2. `ACCESSIBILITY_SUMMARY.md` - Implementation overview
3. Component source code - Inline comments
4. [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)

**Remember**: When in doubt, test it with:
1. Keyboard only
2. Screen reader
3. axe-core automated checks

Happy accessible coding! 🎉
