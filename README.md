# Portfolio Website with Admin CRUD

A modern, single-page portfolio website built with Next.js, featuring a public portfolio view and an admin interface for managing skills and sections.

## Features

- **Public Portfolio**: Beautiful single-page portfolio showcasing your work
- **Admin Interface**: Secure admin dashboard for CRUD operations on skills and sections
- **Modern Design**: Glassmorphism effects and responsive design
- **JSON Storage**: Simple file-based data storage (no database required)
- **Netlify Ready**: Configured for easy deployment on Netlify

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- JSON file storage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
ADMIN_PASSWORD=your-secure-password-here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/
├── app/
│   ├── page.tsx              # Public portfolio page
│   ├── admin/                # Admin interface
│   │   ├── page.tsx          # Admin login
│   │   └── dashboard/        # Admin dashboard
│   └── api/                  # API routes
├── components/
│   ├── portfolio/            # Portfolio section components
│   └── admin/                # Admin interface components
├── lib/
│   ├── data.ts               # Data management utilities
│   └── auth.ts               # Authentication utilities
└── data/
    └── portfolio.json        # Portfolio data store
```

## Admin Access

1. Navigate to `/admin` in your browser
2. Enter the password set in `ADMIN_PASSWORD` environment variable
3. Access the dashboard to manage skills and sections

## Managing Content

### Skills
- Add, edit, and delete skills
- Organize by category (Design, Development, etc.)
- Set skill levels and icons

### Sections
- Enable/disable portfolio sections
- Reorder sections
- Edit section content (titles, descriptions)

## Deployment to Netlify

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. In Netlify:
   - Click "New site from Git"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

3. Add environment variable:
   - Go to Site settings > Environment variables
   - Add `ADMIN_PASSWORD` with your secure password

4. Deploy!

The site will automatically build and deploy.

## Customization

### Update Profile
Edit `data/portfolio.json` to update your profile information, or use the admin interface once implemented.

### Styling
Modify `app/globals.css` and `tailwind.config.ts` to customize colors, fonts, and glassmorphism effects.

### Add Projects
Projects can be added via the admin interface or directly in `data/portfolio.json`.

## Notes

- The `data/portfolio.json` file is used for data storage
- Images should be placed in the `public/` directory
- Make sure to set a strong `ADMIN_PASSWORD` in production

## License

MIT
