# Deployment Guide

## Payroll Management System Deployment

This guide covers building and deploying the Payroll Management System to Firebase Hosting.

---

## Prerequisites

- Node.js v18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created at https://console.firebase.google.com/
- GitHub repository configured
- `.env.local` file with Firebase credentials

---

## Environment Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**⚠️ Important:** Never commit `.env.local` to version control!

---

## Development

### Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

This will:

1. Run TypeScript type checking
2. Build optimized bundles with code splitting
3. Generate static files in the `dist/` folder

### Preview Production Build

```bash
npm run preview
```

---

## Firebase Hosting Deployment

### 1. Initialize Firebase (First Time Only)

```bash
firebase init hosting
```

Select:

- Use an existing project
- Choose your project
- Use `dist` as public directory
- Configure as SPA (yes)
- Don't overwrite dist/index.html

### 2. Configure Firebase (`firebase.json`)

Ensure `firebase.json` contains:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 3. Build and Deploy

```bash
npm run build
firebase deploy --only hosting
```

Or use the one-liner:

```bash
npm run build && firebase deploy --only hosting
```

### 4. View Deployment

After deployment, you'll see a URL like:

```
https://your-project-id.web.app/
```

---

## GitHub Actions CI/CD (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: your-project-id
```

### Setup GitHub Secrets

1. Get Firebase Service Account:

```bash
firebase login
firebase login:ci
# Copy the token for FIREBASE_TOKEN
```

2. Add to GitHub:
   - Go to repository Settings → Secrets and variables → Actions
   - Add `FIREBASE_TOKEN` with the token from step 1

---

## Bundle Analysis

### View Bundle Size

```bash
npm run build
```

The build output shows:

- `vendor-*.js` - React, React Router
- `firebase-*.js` - Firebase libraries
- `recharts-*.js` - Chart libraries
- `ui-components-*.js` - Lucide icons
- `index-*.js` - Application code

### Optimize Further

If bundles are still large, consider:

1. **Lazy load routes:**

```typescript
const Dashboard = lazy(() => import("@/features/dashboard/pages/dashboard"));
```

2. **Reduce dependencies:**

```bash
npm audit
npm update
```

3. **Enable compression in Firebase:**

```json
{
  "hosting": {
    "gzip": true
  }
}
```

---

## Firestore Setup

### Initialize Firestore

1. Go to Firebase Console
2. Create Cloud Firestore database
3. Set location and security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Protect all collections
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Create Collections

The app expects these collections:

- `employees` - Employee records
- `departments` - Department information
- `payrolls` - Payroll records
- `users` - User profiles (optional)

---

## Security Considerations

### 1. Firebase Security Rules

**Employees Collection:**

```javascript
match /employees/{doc=**} {
  allow read: if request.auth != null;
  allow create, update: if request.auth.token.role in ['admin', 'hr'];
  allow delete: if request.auth.token.role == 'admin';
}
```

**Departments Collection:**

```javascript
match /departments/{doc=**} {
  allow read: if request.auth != null;
  allow create, update, delete: if request.auth.token.role == 'admin';
}
```

### 2. Environment Variables

Never hardcode sensitive data. Always use environment variables:

- ✅ Use `.env.local`
- ✅ Use `import.meta.env.VITE_*` to access
- ❌ Don't commit `.env.local`
- ❌ Don't hardcode API keys

### 3. CORS Configuration

Firebase Hosting handles CORS automatically. For custom API endpoints:

```javascript
// firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "/api/**",
        "headers": [
          {
            "key": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ]
      }
    ]
  }
}
```

---

## Monitoring & Debugging

### View Logs

```bash
firebase functions:log
```

### Check Deployment Status

```bash
firebase hosting:sites
```

### View Real-time Database

```bash
firebase database:get /
```

### Performance Monitoring

Enable in Firebase Console:

1. Performance → Monitoring
2. Add custom traces
3. Monitor page load times

---

## Rollback Deployment

### View Deployment History

```bash
firebase hosting:sites:list
```

### Rollback to Previous Version

```bash
firebase hosting:rollback
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deploy Fails

```bash
# Login again
firebase logout
firebase login

# Check project
firebase projects:list

# Set current project
firebase use your-project-id
```

### Environment Variables Not Loading

1. Check `.env.local` exists
2. Restart dev server: `npm run dev`
3. Verify variable names start with `VITE_`
4. Use `import.meta.env.VITE_*` to access

### Performance Issues

1. Check bundle sizes
2. Enable code splitting
3. Compress images
4. Minify CSS/JS (automatic in build)

---

## Performance Benchmarks

Target metrics:

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Bundle Size:** < 500 KB (main chunk)

Current metrics (with code splitting):

- Main bundle: ~366 KB (minified)
- Firebase chunk: ~193 KB
- Recharts chunk: ~384 KB
- Vendor chunk: ~47 KB
- CSS: ~32 KB

---

## Production Checklist

- [ ] Environment variables configured
- [ ] `.env.local` in `.gitignore`
- [ ] Build succeeds without errors
- [ ] No console errors or warnings
- [ ] Firebase project created
- [ ] Firestore initialized
- [ ] Security rules configured
- [ ] Authentication enabled
- [ ] Deploy to Firebase
- [ ] Test all features on production
- [ ] Monitor performance
- [ ] Set up error logging

---

## Support & Resources

- **Firebase Docs:** https://firebase.google.com/docs
- **React Router:** https://reactrouter.com/
- **Vite:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/

---

**Last Updated:** March 16, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
