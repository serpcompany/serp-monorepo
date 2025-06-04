# Review System Enhancement Specifications

## Overview

This document outlines the specifications for enhancing our existing review system with additional features inspired by TrustPilot, focusing on user review management, dedicated review URLs, and company growth tools.

## New Feature Set

### 1. User Reviews Dashboard

**Objective:** Add a "Reviews" card/view in the user's logged-in dashboard area to display their review history.

#### Specifications:

- **Location:** New tab in the user dashboard sidebar menu
- **URL Route:** `/dashboard/my-reviews`
- **Component Structure:**
  - `UserReviewsCard.vue` - Main container component
  - `UserReviewItem.vue` - Individual review display component

#### Functionality:

- Display all reviews submitted by the logged-in user
- Show review status (pending, approved, rejected, marked as spam)
- Allow filtering by status (All, Pending, Approved, Rejected)
- Allow sorting by date (newest/oldest) and rating (highest/lowest)
- Include pagination (10 reviews per page)
- Enable users to edit pending reviews
- Enable users to delete their own reviews (with confirmation)

#### UI Elements:

- Status badges with appropriate colors (yellow for pending, green for approved, red for rejected)
- Company logo/avatar next to each review
- Direct link to the company page
- Rating display showing the stars given
- Condensed review content with "Read More" expansion
- Edit/Delete action buttons
- Empty state design for users with no reviews

#### Data Requirements:

- User ID
- List of all reviews associated with user
- Review status, creation date, last update date
- Company information (name, logo, slug)

---

### 2. Dedicated Review URL Route

**Objective:** [Move the 'leave a review modal' to a URL route](https://www.f6s.com/software/review?product=serp-blocks) so companies can share [a LINK to the leaving of a review directly with customers](https://www.f6s.com/software/review?product=serp-blocks).

#### Specifications:

- **URL Structure:** `/reviews/write?company=[company-slug]` (similar to the reference example: [https://www.f6s.com/software/review?product=serp-blocks](https://www.f6s.com/software/review?product=serp-blocks))
- **Component Structure:**
  - `WriteReviewPage.vue` - Standalone page component
  - `ReviewForm.vue` - Form component (shared with modal)

#### Functionality:

- Accept company identifier via URL parameter
- Pre-load company information
- Same form fields as current modal (title, rating, review, date of experience)
- Form validation with helpful error messages
- Success state with redirect options
- Authentication check with redirect to login if needed (preserving return URL)

#### UI Elements:

- Company header with logo and name
- Progress indicator showing form completion steps
- Star rating widget
- Date picker for experience date
- Character counter for review text
- Submit button with loading state
- Success confirmation screen
- Mobile-responsive layout

#### Technical Requirements:

- Server-side rendering support for SEO
- Query parameter processing for company identification
- Authentication state preservation through redirects
- Form state preservation if user needs to log in

---

### 3. Company Growth Tools

**Objective:** Add a 'growth-tools' page in the company owner's backend with widgets and review solicitation tools.

#### 3.1. Reviews Widget Generator

**Specifications:**

- **Location:** `/dashboard/company/[company-id]/growth-tools`
- **Component Structure:**
  - `ReviewsWidgetGenerator.vue` - Widget configuration and preview
  - `WidgetPreview.vue` - Live preview component

**Functionality:**

- Generate embeddable HTML/JavaScript code
- Preview widget appearance in real-time
- Copy code to clipboard functionality
- Multiple widget styles/sizes
- Customization options:
  - Color scheme (preset themes or custom colors)
  - Information displayed (rating, review count, company name)
  - Size (small, medium, large)
  - Border and shadow options
- Analytics tracking for widget impressions and clicks

**Widget Requirements:**

- Responsive design that works on any website
- Displays company's star rating
- Shows number of reviews
- Links to company page's reviews section
- Optional direct link to review form
- Lightweight implementation (<50KB total)
- No jQuery dependency
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

#### 3.2. Ask for Reviews Tool

**Specifications:**

- **Location:** Same page as widget generator, tabbed interface
- **Component Structure:**
  - `ReviewRequestManager.vue` - Main container
  - `EmailTemplateEditor.vue` - For customizing message
  - `CustomerImportForm.vue` - For adding recipients

**Functionality:**

- Input box for entering customer email addresses
- Bulk import via CSV/Excel upload
- Email template customization
- Send test email option
- Schedule sending option
- View sending history and statistics
- Compliance features (unsubscribe links, privacy policy)
- Rate limiting to prevent spam (max 100 emails per day)

**Email Template Requirements:**

- Customizable subject line
- Personalization tokens (customer name, company name)
- Branded email template with company logo
- Direct link to review form with company pre-selected
- Mobile-friendly email design
- Plain text alternative version

**Technical Requirements:**

- Queue system for processing emails
- Tracking pixel for open rate statistics
- Unique tokens for tracking conversions
- Bounce and complaint handling
- Email validation before sending
- GDPR/privacy compliance controls

---

## Technical Implementation Details

### Frontend Components

- Vue Router configuration for new routes
- Vuex/Pinia store modules for managing review state
- Form validation using Vuelidate or similar
- Email template editor using WYSIWYG or markdown editor
- Widget preview using iframes or dynamic rendering

### Backend Requirements

- API endpoints for retrieving user's reviews
- Authentication middleware for protected routes
- Email sending service integration
- Widget analytics tracking endpoints
- Rate limiting for email invitations
- Validation rules for all inputs

### Database Changes

- New fields for tracking review invitations
- Analytics tables for widget impressions/clicks
- User permissions for company growth tools access

### Third-party Integrations

- Email service provider (Sendgrid, Mailgun, etc.)
- Analytics tracking (optional)
- CSV parsing library

## Implementation Phases

### Phase 1: User Reviews Dashboard

- Create dashboard view component
- Implement review listing and pagination
- Add filtering and sorting functionality
- Implement edit/delete capabilities

### Phase 2: Dedicated Review URL

- Create standalone review page
- Implement company pre-loading from URL
- Ensure authentication flow works with redirects
- Test sharing functionality

### Phase 3: Company Growth Tools

- Implement widget generator
- Create widget embed code
- Develop email invitation system
- Add analytics tracking

## Future Considerations

- A/B testing for email templates
- Advanced widget customization options
- Review invitation reminder system
- Integration with CRM systems for customer import
- QR code generation for offline review requests
