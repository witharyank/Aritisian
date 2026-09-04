# Project Overview
AI-powered Virtual Business Manager and Digital Marketplace for Traditional Artisans.

# Problem Statement Summary
Traditional artisans, weavers, handicraft makers, and marginalized micro-entrepreneurs lack the technical knowledge, digital tools, and market access to digitize, showcase, manage, and sell their products effectively in the modern digital economy.

# Core Product Vision
An AI-powered mobile application that acts as a "Virtual Business Manager" for artisans, empowering them to easily digitize and sell their crafts without requiring advanced technical skills, while offering customers a culturally rich, storytelling-led shopping experience.

# Target Users
1. **Artisan / Seller**: Traditional craftsmen, weavers, and artists looking to digitize their products, get pricing suggestions, and sell online with minimal technical friction.
2. **Customer / Buyer**: Users who appreciate traditional crafts, want to discover authentic products, watch the creation process through videos, and purchase directly from artisans.

# Current Features (Planned)
- AI Product Image Enhancement
- Voice-based Multilingual Auto-Cataloging
- AI Product Description Generation
- Dynamic Pricing Assistant
- AI Virtual Business Manager
- Shoppable Artisan Video/Reels Feed
- Product Marketplace
- Direct Product Linking from Videos
- B2B Buyer-Artisan Matching (future phase)
- Cluster-based Collective Fulfillment (future phase)
- Digital Artisan Identity/Passport (future phase)

# Differentiating Factors
**Shoppable Storytelling**: Customers can watch artisans create traditional crafts in a video/reels format and directly purchase the product being shown or created in the video. (e.g., Click "Shop This Product" while watching a reel).

# Technology Decisions
- **Platform**: Cross-platform MOBILE APPLICATION (React Native / Expo). NOT a website. Designed with mobile-first navigation, bottom tabs, and touch interactions.
- **Language**: TypeScript.
# Current Status
**Final Prototype — Demo Ready**

# Tech Stack
- React Native
- Expo
- TypeScript
- React Navigation (Bottom Tabs + Native Stack)
- Context API (Cart & Products)

# Completed Phases
- Phase 1 — Foundation & Demo Data
- Phase 1.5 — Mobile Environment Setup
- Phase 2 — Customer Marketplace Experience
- Phase 3A — AI Infrastructure & Services
- Phase 3B — AI Artisan Studio
- Phase 4A — Testing & Demo Readiness Audit
- Phase 4B — UI/UX Polish
- Phase 4C — Presentation & Final Demo Readiness

# Final Features

## Customer
- Premium artisan marketplace
- Product discovery
- Category browsing
- Artisan storytelling
- Shoppable Reels
- Reel-to-product navigation
- Product details
- Artisan identity
- Functional cart
- Empty Cart & Profile screens

## Artisan
- AI Product Studio
- Camera/gallery product upload
- AI image enhancement demonstration
- Voice recording/manual description
- Multilingual-ready architecture
- AI catalog generation
- Product description generation
- Product attribute extraction
- AI pricing suggestion
- Publish product workflow

# Differentiating Factors
1. AI Virtual Business Manager
2. Voice-first product digitization
3. AI-powered catalog generation
4. AI-assisted pricing
5. Shoppable Artisan Storytelling
6. Direct Watch → Experience → Buy journey
7. Human connection between customer and artisan

# Known Prototype Limitation
- Product and cart state currently use in-memory React Context and reset on full application refresh.
- Created `memory.md` to document project vision and architecture.
- Defined TypeScript interfaces/types for User, Artisan, Product, Reel, Category, CartItem.
- Created realistic sample demo data for artisans, products, categories, and reels.
- Set up foundational mobile app structure with separated folders (`src/types`, `src/data`, `src/navigation`, `src/screens`).
- Created placeholder screens and bottom navigation foundation.

# Important Architecture Decisions
- Must be designed and developed as a MOBILE APP experience (Android/iOS).
- Keep sample/mock data separated from UI components.
- Every reel must contain a `linkedProductId` to support the core "Shoppable Storytelling" user journey.
