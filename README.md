# Trading Journal

A web application for tracking and analyzing trading activities.

## Features

- Track trades with detailed information
- Analyze performance with visual charts
- Add technical and psychological analysis
- View trade screenshots
- Track P&L over time

## Tech Stack

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS
- shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL
- Docker (optional, for containerized database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/trading-journal.git
cd trading-journal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` with your database credentials.

4. Start the development server:
```bash
npm run dev
```

5. For database with Docker:
```bash
docker-compose up -d
```

### Database Setup

1. Run migrations:
```bash
npx prisma generate
npx prisma db push
```

## Project Structure

```
src/
  ├── app/              # Next.js app router files
  ├── components/       # React components
  │   ├── ui/          # Reusable UI components
  │   └── trading/     # Trading-specific components
  ├── lib/             # Utility functions
  ├── types/           # TypeScript types
  └── services/        # API services
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details