# ConsentManager Component

A comprehensive React cookie consent manager component with context API integration for managing cookie preferences and loading tracking scripts based on user consent.

## Features

✅ **Cookie Consent Banner** - Shows on first visit  
✅ **Cookie Settings Modal** - Allows granular control over cookie categories  
✅ **Toast Notifications** - Confirms when preferences are saved  
✅ **localStorage Persistence** - Saves preferences across sessions  
✅ **Google Analytics Integration** - Loads GA only when analytics consent is given  
✅ **Meta Pixel Integration** - Loads Facebook pixel when marketing consent is given  
✅ **Context API** - Access cookie settings from any component  
✅ **TypeScript Support** - Fully typed interfaces  
✅ **Responsive Design** - Works on mobile and desktop  

---

## Cookie Categories

1. **Strictly Necessary** (Always On)
   - Required for site functionality
   - Cannot be disabled

2. **Preferences / Functional**
   - Remembers user choices
   - Enhanced features

3. **Analytics**
   - Google Analytics
   - Performance tracking

4. **Marketing / Advertising**
   - Facebook Pixel
   - Ad targeting

---

## Setup

### 1. Wrap Your App with ConsentProvider

Update `src/main.tsx`:

```tsx
import { ConsentProvider } from "./components/ConsentManager";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConsentProvider>
      <ToastProvider>
        <App />
        <ToastContainer />
      </ToastProvider>
    </ConsentProvider>
  </StrictMode>,
);
```

### 2. Use the useConsent Hook in Any Component

```tsx
import { useConsent } from "@/components/ConsentManager";

export function MyComponent() {
  const { openCookieSettings, closeCookieSettings, showBanner, showModal } = useConsent();

  return (
    <div>
      <button onClick={openCookieSettings}>
        Manage Cookies
      </button>
      
      {showBanner && <p>Consent banner is visible</p>}
      {showModal && <p>Settings modal is visible</p>}
    </div>
  );
}
```

---

## Hook API

### useConsent()

#### Methods

- **`openCookieSettings()`** - Opens the cookie settings modal
- **`closeCookieSettings()`** - Closes the cookie settings modal

#### State

- **`showBanner`** - Boolean indicating if the consent banner is visible
- **`showModal`** - Boolean indicating if the settings modal is visible

---

## Example: Adding Cookie Settings Link to Login Page

```tsx
import { useConsent } from "@/components/ConsentManager";

export default function LoginPage() {
  const { openCookieSettings } = useConsent();

  return (
    <div>
      {/* Login form here */}
      
      {/* Cookie Settings Button */}
      <button
        onClick={openCookieSettings}
        className="text-sm text-primary hover:underline"
      >
        Manage Cookie Settings
      </button>
    </div>
  );
}
```

---

## Data Structure

### ConsentState

Stored in `localStorage` under key `portfolio-consent-v1`:

```ts
{
  strictly_necessary: true,      // Always true
  preferences: false,             // User choice
  analytics: false,               // User choice
  marketing: false,               // User choice
  timestamp: "2026-03-19T..."    // ISO timestamp
}
```

---

## Script Loading

### Google Analytics

Loads when `consent.analytics === true`:

```ts
// GA ID: G-Y8YN12RW15
// Track page views automatically
```

### Meta Pixel

Loads when `consent.marketing === true`:

```ts
// Facebook Pixel ID: PIXEL_ID
// Tracks page views and events
```

---

## Styling

All CSS is scoped within the component using inline `<style>` tags. The component uses:

- **Color scheme**: Dark theme with lemon (#D0950F) accents
- **Animations**: Smooth slide-up and fade-in transitions
- **Responsive**: Mobile-first design with 640px breakpoint
- **Font**: Montserrat with fallbacks

### CSS Classes

- `.consent-banner` - Main banner
- `.consent-modal-overlay` - Modal overlay
- `.consent-modal` - Modal dialog
- `.consent-toggle` - Toggle switches
- `.consent-btn` - Buttons (primary, secondary, tertiary)
- `.consent-toast` - Toast notification

---

## Integration Checklist

- [x] ConsentManager component created
- [x] ConsentProvider wraps app in main.tsx
- [x] useConsent hook available globally
- [x] Login page has "Manage Cookies" button
- [x] localStorage persistence working
- [x] Google Analytics configured
- [x] Meta Pixel configured
- [x] All interactions fully functional
- [x] TypeScript types complete
- [x] Responsive design implemented

---

## Usage in Different Pages

### Dashboard
```tsx
import { useConsent } from "@/components/ConsentManager";

export function Dashboard() {
  const { openCookieSettings } = useConsent();
  
  return (
    <footer>
      <button onClick={openCookieSettings}>Privacy Settings</button>
    </footer>
  );
}
```

### Navigation/Header
```tsx
import { useConsent } from "@/components/ConsentManager";

export function Header() {
  const { openCookieSettings } = useConsent();
  
  return (
    <nav>
      {/* Other nav items */}
      <a onClick={openCookieSettings}>Cookies</a>
    </nav>
  );
}
```

---

## Notes

- The consent banner only shows on first visit (no localStorage entry)
- Once consent is given, banner won't show again unless localStorage is cleared
- Users can always access settings via the `useConsent()` hook
- All user preferences persist in localStorage
- Google Analytics and Facebook Pixel won't load until appropriate consent is given

---

## Future Enhancements

- [ ] Add regional consent logic (GDPR, CCPA)
- [ ] Support for additional tracking platforms
- [ ] Consent withdrawal/revocation UX
- [ ] Consent history/audit trail
- [ ] Custom cookie categories
