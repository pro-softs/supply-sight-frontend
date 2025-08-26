# SupplySight Dashboard

A modern supply chain management dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 Real-time KPI tracking (Stock, Demand, Fill Rate)
- 📈 Interactive trend charts
- 🔍 Advanced filtering and search
- 📦 Product inventory management
- 🏢 Multi-warehouse support
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Apollo Client** - GraphQL client (configured for future backend integration)
- **Vite** - Build tool

## Project Structure

```
src/
├── components/
│   ├── dashboard/     # Dashboard-specific components
│   ├── layout/        # Layout components
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and configurations
└── types/            # TypeScript type definitions
├── pages/            # Main page and others can be added later

```

## Features Overview

### Dashboard Components

- **KPI Cards**: Display total stock, demand, and fill rate
- **Trend Chart**: Visualize stock vs demand over time
- **Filters**: Search and filter products by various criteria
- **Products Table**: Comprehensive product listing with status indicators
- **Product Drawer**: Detailed product management interface

### Status Indicators

- 🟢 **Healthy**: Stock > Demand
- 🟡 **Low**: Stock = Demand  
- 🔴 **Critical**: Stock < Demand

## Future Enhancements

- Real GraphQL backend integration
- User authentication
- Advanced analytics
- Export functionality
- Mobile app support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details