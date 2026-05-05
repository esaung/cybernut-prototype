# CyberNut Phishing Simulation Micro-Training

An interactive phishing awareness training experience that helps users identify and understand common phishing tactics through gamification.

## Overview

This prototype implements a complete micro-training workflow where users earn "acorns" as rewards for learning to identify phishing emails. The experience is designed to be engaging, educational, and immediately actionable.

## Workflow

### 1. Report Congratulations
When a user reports a phishing email, they're redirected to a congratulations page that:
- Awards 3 initial acorns for reporting the email
- Offers the choice to earn more acorns through training or skip to the leaderboard
- Features a 10-second countdown that auto-advances to the micro-lesson

### 2. Micro-Lesson
An immersive, full-screen learning experience that:
- Shows the same TechZone phishing email used in the assessment
- Highlights one phishing indicator at a time with animated highlights
- Features a sticky bottom info panel explaining each tactic
- Auto-scrolls to center each highlighted indicator
- Teaches 3 key phishing tactics:
  - Suspicious Sender Domain
  - Artificial Urgency
  - Suspicious Call-to-Action

### 3. Interactive Assessment
A gamified quiz where users:
- Click on highlighted areas of the phishing email
- Identify the specific tactic from a multiple-choice list
- Have 3 lives (hearts) to complete the assessment
- Earn 1 acorn per indicator correctly identified
- Receive immediate feedback on their selections

### 4. Remediation Video
For users who miss indicators or use hints:
- Presents short training videos for each missed indicator
- Awards 1 acorn per video watched
- Tracks completion progress
- Allows skipping to the leaderboard at any time

### 5. Leaderboard
Final screen that:
- Displays user rankings based on total acorns earned
- Shows the user's current rank and acorn count
- Highlights the user's entry in the list
- Provides motivation to continue training

## Features

### Gamification
- **Acorn Reward System**: Users earn acorns for completing various tasks
- **Lives System**: 3-heart system in the assessment adds stakes
- **Progress Tracking**: Visual progress indicators throughout
- **Leaderboard**: Competitive element to encourage participation

### Educational Design
- **Realistic Email**: Uses a believable TechZone phishing email
- **Progressive Learning**: Teaches concepts before testing
- **Immediate Feedback**: Users know right away if they're correct
- **Remediation**: Missed concepts are reinforced with video training

### User Experience
- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Engaging transitions and highlights
- **Auto-Scroll**: Centers important content automatically
- **Skip Options**: Users can jump to the leaderboard anytime

## Technical Stack

- **React 18.3.1**: Component-based UI
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling
- **Vite**: Fast build tooling
- **Lucide React**: Icon library

## Project Structure

```
phishing-simulation/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Main orchestrator
│   │   └── components/
│   │       ├── report-congratulations.tsx   # Step 1: Initial reward screen
│   │       ├── micro-lesson.tsx             # Step 2: Teaching module
│   │       ├── interactive-assessment.tsx   # Step 3: Quiz with lives
│   │       ├── remediation-video.tsx        # Step 4: Video training
│   │       └── leaderboard.tsx              # Step 5: Rankings
│   └── styles/
│       └── theme.css                        # Design tokens and base styles
├── package.json                             # Dependencies
├── vite.config.ts                          # Build configuration
└── README.md                               # This file
```

## Key Components

### App.tsx
Main orchestrator that:
- Manages workflow state (current step)
- Tracks total acorns earned
- Handles transitions between screens
- Passes data between components

### ReportCongratulations
- Awards initial 3 acorns
- 10-second countdown timer
- CTA buttons for next actions

### MicroLesson
- Full-screen email display
- Animated indicator highlights
- Sticky bottom info panel
- Auto-scroll functionality
- Progressive indicator reveal

### InteractiveAssessment
- Clickable indicator zones
- Multiple-choice tactic selection
- Lives system (3 hearts)
- Progress tracking
- Immediate feedback
- Game over modal

### RemediationVideo
- Video playlist for missed indicators
- Completion tracking
- Acorn rewards per video
- Progress visualization

### Leaderboard
- Dynamic ranking based on acorns
- User highlighting
- Top 3 special icons
- Restart functionality

## Getting Started

### Prerequisites
- Node.js 16+
- pnpm (recommended) or npm

### Installation

```bash
cd phishing-simulation
pnpm install
```

### Development

```bash
pnpm run dev
```

Note: This project uses Figma Make's custom build system. The dev server is managed by the Figma Make environment.

### Building

```bash
pnpm run build
```

## Design Decisions

### Color Scheme
- **Primary Blue (#2B5FD9)**: CyberNut brand color, used for headers and CTAs
- **Bright Yellow (#F5E16D)**: Attention-grabbing, used for highlights and rewards
- **Green**: Success states and correct answers
- **Red**: Lives/hearts and incorrect feedback

### Animation Strategy
- Pulse effects on interactive elements
- Smooth scroll for better focus
- Fade-in transitions for modals
- Bounce effect on numbered badges

### Accessibility
- High contrast colors
- Clear visual feedback
- Descriptive labels
- Keyboard navigation support

## Future Enhancements

- [ ] Add actual video playback for remediation
- [ ] Implement backend API for real leaderboard data
- [ ] Add more phishing email templates
- [ ] Create difficulty levels
- [ ] Add achievement badges
- [ ] Support for multiple languages
- [ ] Analytics tracking
- [ ] Email report integration
- [ ] Admin dashboard

## License

Private prototype for CyberNut - All rights reserved

## Contact

For questions or feedback about this prototype, please contact the CyberNut development team.