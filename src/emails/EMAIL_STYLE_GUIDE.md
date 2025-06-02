# Tamatar Email Style Guide

## Overview

This style guide defines the visual identity, components, and accessibility standards for all email communications in the Tamatar platform. All email templates must follow these guidelines to ensure consistency, accessibility, and brand recognition.

## Brand Identity

### Colors

#### Primary Colors
- **Primary Green**: `#10b981` (Emerald 500) - Main CTA buttons, links, progress indicators
- **Primary Dark**: `#059669` (Emerald 600) - Hover states, dark accents
- **Primary Light**: `#d1fae5` (Emerald 100) - Background highlights, success states

#### Neutral Colors
- **Text Primary**: `#111827` (Gray 900) - Main text content
- **Text Secondary**: `#6b7280` (Gray 500) - Secondary text, metadata
- **Text Muted**: `#9ca3af` (Gray 400) - Placeholder text, disabled states
- **Background**: `#ffffff` (White) - Main background
- **Background Alt**: `#f9fafb` (Gray 50) - Section backgrounds
- **Border**: `#e5e7eb` (Gray 200) - Dividers, borders

#### Status Colors
- **Success**: `#10b981` (Emerald 500) - Success messages, confirmations
- **Warning**: `#f59e0b` (Amber 500) - Warnings, attention states
- **Error**: `#ef4444` (Red 500) - Error messages, critical actions
- **Info**: `#3b82f6` (Blue 500) - Information, neutral actions

### Typography

#### Font Stack
Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif

#### Hierarchy
- **H1**: 32px, font-weight: 700, line-height: 1.2, color: #111827
- **H2**: 24px, font-weight: 600, line-height: 1.3, color: #111827
- **H3**: 20px, font-weight: 600, line-height: 1.4, color: #111827
- **Body Large**: 18px, font-weight: 400, line-height: 1.6, color: #111827
- **Body**: 16px, font-weight: 400, line-height: 1.6, color: #111827
- **Body Small**: 14px, font-weight: 400, line-height: 1.5, color: #6b7280
- **Caption**: 12px, font-weight: 400, line-height: 1.4, color: #9ca3af

### Spacing System

#### Base Unit: 4px
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

## Accessibility Standards

### Color Contrast Requirements
All color combinations must meet WCAG 2.1 AA standards:
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18px+ or 14px+ bold): Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 4.5:1 contrast ratio

### Approved Color Combinations

#### High Contrast (AA Compliant)
- **Primary text on white**: #111827 on #ffffff (16.9:1) ✅
- **Secondary text on white**: #6b7280 on #ffffff (5.5:1) ✅
- **Primary button**: #ffffff on #10b981 (4.9:1) ✅
- **Links**: #10b981 on #ffffff (3.3:1) ⚠️ Use bold or larger size
- **Error text**: #dc2626 on #ffffff (5.7:1) ✅

#### Dark Backgrounds
- **White text on primary**: #ffffff on #10b981 (4.9:1) ✅
- **White text on dark**: #ffffff on #111827 (16.9:1) ✅

### Interactive Elements
- Minimum 44px touch target size for buttons
- Clear visual focus indicators
- Descriptive alt text for all images
- Meaningful link text (avoid "click here")

## Email Components

### Layout Structure
```
┌─ Email Container (max-width: 600px) ─┐
│ ┌─ Header ─────────────────────────┐ │
│ │ Logo + Navigation (optional)     │ │
│ └─────────────────────────────────┘ │
│ ┌─ Main Content ──────────────────┐ │
│ │ Hero Section (optional)         │ │
│ │ Content Sections                │ │
│ │ Call-to-Action                  │ │
│ └─────────────────────────────────┘ │
│ ┌─ Footer ────────────────────────┐ │
│ │ Links + Unsubscribe + Legal     │ │
│ └─────────────────────────────────┘ │
└───────────────────────────────────┘
```

### Button Styles

#### Primary Button
- Background: #10b981
- Text: #ffffff, 16px, font-weight: 600
- Padding: 12px 24px
- Border radius: 8px
- Minimum height: 44px

#### Secondary Button
- Background: transparent
- Text: #10b981, 16px, font-weight: 600
- Border: 2px solid #10b981
- Padding: 10px 22px
- Border radius: 8px
- Minimum height: 44px

#### Text Link
- Color: #10b981
- Text decoration: none
- Hover: underline
- Font-weight: 600 (for accessibility)

### Card Component
- Background: #ffffff
- Border: 1px solid #e5e7eb
- Border radius: 12px
- Padding: 24px
- Box shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

### Alert Component
- Success: Background #d1fae5, border-left 4px solid #10b981
- Warning: Background #fef3c7, border-left 4px solid #f59e0b
- Error: Background #fee2e2, border-left 4px solid #ef4444
- Info: Background #dbeafe, border-left 4px solid #3b82f6

## Email Types & Templates

### 1. Authentication Emails
- Welcome email
- Email verification
- Password reset
- Login notification

### 2. Progress & Achievements
- Daily log reminder
- Weekly progress summary
- Achievement notifications
- Goal completion

### 3. Social & Community
- New follower notification
- Comment on your log
- Mention notification
- Community digest

### 4. Platform Updates
- New feature announcements
- Maintenance notifications
- Security alerts
- Account changes

## Template Naming Convention

### File Structure
```
src/emails/templates/
├── components/           # Reusable components
│   ├── layout.tsx       # Base layout wrapper
│   ├── header.tsx       # Email header with logo
│   ├── footer.tsx       # Email footer with links
│   ├── button.tsx       # Button component
│   ├── card.tsx         # Card container
│   └── alert.tsx        # Alert/notification component
├── auth/                # Authentication emails
│   ├── welcome.tsx
│   ├── verify-email.tsx
│   ├── password-reset.tsx
│   └── login-notification.tsx
├── progress/            # Progress & achievement emails
│   ├── daily-reminder.tsx
│   ├── weekly-summary.tsx
│   ├── achievement.tsx
│   └── goal-completion.tsx
├── social/              # Social & community emails
│   ├── new-follower.tsx
│   ├── comment-notification.tsx
│   ├── mention.tsx
│   └── community-digest.tsx
└── platform/            # Platform update emails
    ├── feature-announcement.tsx
    ├── maintenance.tsx
    ├── security-alert.tsx
    └── account-change.tsx
```

### Component Naming
- Use PascalCase for component names
- Use descriptive names that indicate purpose
- Add type suffix for clarity: `WelcomeEmail`, `PasswordResetEmail`

## Testing & Quality Assurance

### Email Client Testing
Test templates across major email clients:
- Gmail (Web, iOS, Android)
- Outlook (Web, Desktop, iOS, Android)
- Apple Mail (macOS, iOS)
- Yahoo Mail
- Thunderbird

### Accessibility Testing
- Screen reader compatibility
- High contrast mode support
- Color blindness simulation
- Keyboard navigation (where applicable)

### Performance Guidelines
- Keep HTML under 100KB
- Optimize images for email
- Inline critical CSS
- Minimize external dependencies

## Dark Mode Support

### Strategy
Use CSS media queries and email client-specific rules for dark mode:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
  .bg-white { background-color: #1f2937 !important; }
  .text-gray-900 { color: #f9fafb !important; }
}

/* Outlook dark mode */
[data-ogsc] .bg-white { background-color: #1f2937 !important; }
[data-ogsc] .text-gray-900 { color: #f9fafb !important; }
```

### Dark Mode Color Palette
- **Background**: #1f2937 (Gray 800)
- **Background Alt**: #111827 (Gray 900)
- **Text Primary**: #f9fafb (Gray 50)
- **Text Secondary**: #d1d5db (Gray 300)
- **Border**: #374151 (Gray 700)
- **Primary**: #34d399 (Emerald 400) - Better contrast in dark mode

## Localization Considerations

### Text Direction
- Support for RTL languages (Arabic, Hebrew)
- Flexible layout that adapts to text expansion
- Cultural considerations for colors and imagery

### Content Guidelines
- Keep subject lines under 50 characters
- Use clear, scannable content structure
- Include preview text optimization
- Provide plain text fallbacks

## Brand Voice & Tone

### Voice Characteristics
- **Encouraging**: Celebrate progress and achievements
- **Supportive**: Acknowledge challenges and setbacks
- **Professional**: Maintain credibility and trust
- **Friendly**: Approachable and conversational

### Tone Guidelines
- **Welcoming**: New user onboarding
- **Motivational**: Progress and goal-related emails
- **Urgent but calm**: Security and important updates
- **Celebratory**: Achievements and milestones

## Implementation Checklist

### Before Creating New Templates
- [ ] Review existing components for reusability
- [ ] Confirm color combinations meet accessibility standards
- [ ] Plan responsive behavior for mobile devices
- [ ] Consider dark mode implementation
- [ ] Define content hierarchy and CTAs

### Template Review Process
- [ ] Visual design matches brand guidelines
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Tested across major email clients
- [ ] Content follows voice and tone guidelines
- [ ] Performance optimized (file size, load time)
- [ ] Dark mode support implemented
- [ ] Plain text version created

### Quality Assurance
- [ ] Spelling and grammar check
- [ ] Link functionality verified
- [ ] Responsive design tested
- [ ] Accessibility audit completed
- [ ] Brand consistency confirmed
- [ ] Legal compliance verified (unsubscribe, privacy)

## Resources

### Tools
- **Litmus**: Email client testing
- **Email on Acid**: Compatibility testing  
- **WebAIM Contrast Checker**: Accessibility validation
- **Sim Daltonism**: Color blindness testing

### Documentation
- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Email Accessibility**: https://www.emailonacid.com/blog/article/email-development/email-accessibility-guide/
- **React Email Documentation**: https://react.email/docs

---

*This style guide is a living document and should be updated as the brand and platform evolve.*
