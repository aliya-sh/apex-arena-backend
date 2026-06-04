// backend/seed.js
// Run once to populate the database with player data:
//   node seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Player   = require('./models/Player');

const players = [
  {
    name: 'Marcus Silva',
    country: '🇧🇷 Brazil',
    rank: 1,
    wins: 47,
    losses: 3,
    game: 'Valorant',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Elena Voss',
    country: '🇷🇺 Russia',
    rank: 2,
    wins: 44,
    losses: 5,
    game: 'CS2',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Yuki Tanaka',
    country: '🇯🇵 Japan',
    rank: 3,
    wins: 41,
    losses: 7,
    game: 'League of Legends',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Aisha Okonkwo',
    country: '🇳🇬 Nigeria',
    rank: 4,
    wins: 39,
    losses: 8,
    game: 'Valorant',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Jin Park',
    country: '🇰🇷 South Korea',
    rank: 5,
    wins: 37,
    losses: 10,
    game: 'League of Legends',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Dmitri Volkov',
    country: '🇷🇺 Russia',
    rank: 6,
    wins: 35,
    losses: 11,
    game: 'CS2',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Omar Hassan',
    country: '🇪🇬 Egypt',
    rank: 7,
    wins: 33,
    losses: 12,
    game: 'Apex Legends',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Carlos Reyes',
    country: '🇲🇽 Mexico',
    rank: 8,
    wins: 31,
    losses: 13,
    game: 'Apex Legends',
    photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Lena Braun',
    country: '🇩🇪 Germany',
    rank: 9,
    wins: 29,
    losses: 14,
    game: 'CS2',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Hana Kim',
    country: '🇰🇷 South Korea',
    rank: 10,
    wins: 27,
    losses: 15,
    game: 'Valorant',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Ravi Patel',
    country: '🇮🇳 India',
    rank: 11,
    wins: 25,
    losses: 16,
    game: 'League of Legends',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Sofia Andrade',
    country: '🇦🇷 Argentina',
    rank: 12,
    wins: 22,
    losses: 18,
    game: 'Apex Legends',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅  MongoDB connected');

    await Player.deleteMany({});
    console.log('🗑️   Cleared existing players');

    await Player.insertMany(players);
    console.log(`✅  Seeded ${players.length} players`);
  } catch (err) {
    console.error('❌  Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌  Disconnected');
    process.exit(0);
  }
}

seed();