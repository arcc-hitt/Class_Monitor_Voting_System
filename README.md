# 🗳️ Class Monitor Election App

A modern, interactive voting application built with React for conducting class monitor elections. Features real-time vote tracking, persistent data storage, and a beautiful user interface.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Voting**: Cast votes instantly with immediate feedback
- **Vote Tracking**: Monitor vote counts and percentages for each candidate
- **Duplicate Prevention**: Ensures each voter can only vote once
- **Live Results**: Interactive bar chart showing current standings

### 💾 Data Persistence
- **LocalStorage Integration**: All votes are automatically saved to browser storage
- **Session Recovery**: App loads previous voting data when reopened
- **Real-time Sync**: Data is saved immediately when votes are cast

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Gradient Backgrounds**: Beautiful color schemes throughout the app
- **Smooth Animations**: Hover effects, loading states, and transitions
- **Interactive Elements**: Cards with progress bars, vote badges, and voter lists
- **Loading States**: Visual feedback during vote submission

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arcc-hitt/Class_Monitor_Voting_System.git
   cd Class_Monitor_Voting_System
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
src/
├── components/
│   ├── CandidateCard.jsx     # Individual candidate display
│   ├── CandidateList.jsx     # Grid of all candidates
│   ├── VoteForm.jsx          # Voting interface
│   └── VoteSummary.jsx       # Results chart
├── contexts/
│   └── VoteContext.jsx       # State management
├── App.jsx                   # Main application component
├── main.jsx                  # React entry point
└── index.css                 # Tailwind CSS imports
```

## 🎮 How to Use

### For Voters
1. **Enter Your Name**: Type your full name in the input field
2. **Select Candidate**: Choose your preferred candidate from the dropdown
3. **Cast Vote**: Click the "Cast Your Vote" button
4. **View Results**: Scroll down to see live voting results

### For Administrators
- **Monitor Progress**: View real-time vote counts and percentages
- **Track Voters**: See who has voted for each candidate
- **Analyze Results**: Use the interactive bar chart for visual analysis

## 🛠️ Technical Details

### Built With
- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Recharts**: Interactive charts and data visualization
- **LocalStorage API**: Browser-based data persistence
- **Vite**: Fast build tool and development server

### Key Components

#### VoteContext
Central state management using React Context API:
- Manages vote data and voter registry
- Handles localStorage integration
- Provides voting functionality to all components

#### Responsive Design
- Mobile-first approach with Tailwind CSS
- Flexible grid layouts that adapt to screen size
- Touch-friendly interface elements

#### Data Persistence
```javascript
// Automatic saving to localStorage
useEffect(() => {
  localStorage.setItem('voting-votes', JSON.stringify(votes));
}, [votes]);

// Loading data on app start
useEffect(() => {
  const savedVotes = JSON.parse(localStorage.getItem('voting-votes') || '{}');
  setVotes(savedVotes);
}, []);
```

## 🎨 Customization

### Adding New Candidates
Update the candidates array in `CandidateList.jsx` and `VoteForm.jsx`:

```javascript
const candidates = [
  { name: 'alice', label: 'Alice' },
  { name: 'bob', label: 'Bob' },
  { name: 'charlie', label: 'Charlie' },
  { name: 'diana', label: 'Diana' }, // Add new candidate
];
```

### Styling Modifications
The app uses Tailwind CSS classes. Common customizations:

- **Colors**: Modify gradient classes like `from-blue-500 to-purple-600`
- **Spacing**: Adjust padding/margin with classes like `p-6`, `mb-4`
- **Animations**: Customize transitions with `transition-all duration-300`

### Chart Customization
Modify the Recharts configuration in `VoteSummary.jsx`:

```javascript
<BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
  <Bar dataKey="count" fill="#your-color" radius={[8, 8, 0, 0]} />
</BarChart>
```

## 📱 Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Responsive design works on all modern mobile browsers

## 🔒 Data Privacy

- **Local Storage Only**: All data is stored locally in the user's browser
- **No Server Communication**: No data is transmitted to external servers
- **Session-Based**: Data persists only on the device used for voting

## 🐛 Troubleshooting

### Common Issues

**Votes not saving?**
- Check if localStorage is enabled in your browser
- Ensure you're not in private/incognito mode

**Chart not displaying?**
- Verify that at least one vote has been cast
- Check browser console for any JavaScript errors

**Responsive issues?**
- Clear browser cache and reload
- Ensure you're using a supported browser version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Recharts**: For the beautiful charting library
- **Vite**: For the fast development experience

---