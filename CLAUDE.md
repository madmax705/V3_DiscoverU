# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with TypeScript support

### Database Operations
- `npm run types:supabase` - Generate TypeScript types from Supabase schema
  - Requires `SUPABASE_PROJECT_ID` environment variable
  - Outputs to `src/types/supabase.ts`

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Styling**: TailwindCSS with extensive custom theming
- **UI Components**: Radix UI primitives with shadcn/ui patterns
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with email/password
- **State Management**: React Context (Auth, Notifications, Bookmarks)
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation

### Application Structure

**Core App Layout**: The app uses a nested provider structure:
```
ErrorBoundary > AuthProvider > NotificationProvider > BookmarkProvider > ParallaxProvider > Layout
```

**Key Contexts**:
- `AuthContext` - User authentication state and methods
- `NotificationContext` - In-app notification system
- `BookmarkContext` - Club bookmarking functionality (syncs with Supabase + localStorage fallback)

**Database Integration**: 
- Uses Supabase client (`src/lib/supabase-client.ts`) for all database operations
- Implements comprehensive club rating system with user-specific ratings
- Fallback to static club data (`src/data/clubsData.ts`) when database is unavailable
- All database queries include proper error handling and loading states

### Data Flow Architecture

**Club Data Management**:
- Primary source: Supabase `Club` table
- Fallback: Static data in `src/data/clubsData.ts` (comprehensive club definitions)
- Club profiles support: ratings, memberships, bookmarks, events, galleries
- Uses slug-based routing for club pages (`/club/:slug`)

**User Features**:
- Authentication with profile creation (stores in `user` table)
- Bookmark system with optimistic updates and database sync
- Club membership tracking via `ClubMember` table
- Notification system with preferences and real-time updates
- Club rating system (1-5 stars) with statistics and distribution

**Component Organization**:
- `src/components/` - All React components (pages, UI, modals)
- `src/components/ui/` - Reusable UI primitives (shadcn/ui style)
- `src/hooks/` - Custom React hooks
- `src/contexts/` - React Context providers
- `src/lib/` - Utility functions and Supabase client

### Path Aliases
- `@/*` maps to `src/*` (configured in both Vite and TypeScript)

### Important Implementation Notes

**Environment Configuration**:
- Supabase integration requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Application gracefully degrades when Supabase is not configured (uses localStorage + static data)

**Database Schema Dependencies**:
- Club rating system requires `ClubRating` table (see `RATING_SYSTEM_SETUP.md`)
- User profiles stored in `user` table with grade and metadata
- Notifications system uses `notifications` and `notification_preferences` tables

**Code Patterns**:
- All database operations return consistent `{ success: boolean; error?: any; data?: any }` format
- Components use loading states and error boundaries
- Optimistic updates for bookmarks and ratings with rollback on failure
- TypeScript strict mode enabled with comprehensive type definitions

**Asset Management**:
- Club images organized in `public/ClubBannerPhoto/` and `public/ClubGalleryPhotos/`
- Uses placeholder APIs for avatars (dicebear.com)
- Responsive image handling with proper aspect ratios