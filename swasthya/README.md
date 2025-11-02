# Swasthya - Smart AI + Blockchain Medical Platform

<div align="center">
  <h3>🏥 Redefining Healthcare with Blockchain and AI 🏥</h3>
  <p>A next-generation medical platform where users securely store, access, and analyze their health data using blockchain technology with AI-powered insights.</p>
</div>

## ✨ Features

### 🔐 **Blockchain Security**
- **Immutable Health Records**: All medical data is stored on a secure blockchain network
- **Patient-Controlled Access**: You own and control your health data
- **Cryptographic Verification**: Every record is cryptographically signed and verified
- **Decentralized Storage**: No single point of failure for your medical information

### 🤖 **AI-Powered Healthcare**
- **Smart Diagnosis**: Upload medical images (X-rays, skin photos) for AI analysis
- **Symptom Assessment**: Intelligent symptom checker with personalized recommendations
- **Health Insights**: ML-powered health predictions and trend analysis
- **24/7 AI Assistant**: Real-time health guidance and emergency support

### 📱 **Native Mobile Experience**
- **Futuristic Design**: Clean, modern UI with smooth microinteractions
- **Dark/Light Themes**: Adaptive theming for optimal viewing experience
- **Offline Capability**: Access critical health data without internet connection
- **Biometric Security**: Fingerprint and Face ID authentication

### 🏥 **Comprehensive Health Management**
- **Digital Health Records**: Lab results, prescriptions, imaging, visit notes
- **Provider Network**: Connect with healthcare providers and specialists
- **Appointment Scheduling**: Integrated calendar with reminder notifications
- **Medication Tracking**: Smart reminders and interaction checking

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Expo CLI
- iOS Simulator or Android Emulator
- Physical device for testing (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/swasthya-app.git
   cd swasthya-app/swasthya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your device

## 📱 App Screens

### 🌟 **Core Screens**
- **Splash Screen**: Animated logo with smooth transitions
- **Onboarding**: 3-step carousel introducing key features
- **Authentication**: Login/Signup with Google integration and biometric options
- **Dashboard**: Health overview with quick actions and insights
- **Health Records**: Blockchain-verified medical records with search and filters

### 🤖 **AI Features**
- **AI Diagnosis**: Image upload and analysis with confidence scoring
- **AI Chat**: Conversational health assistant with emergency detection
- **Health Analytics**: Trend analysis and predictive insights

### 👤 **User Management**
- **Profile**: User information with blockchain wallet integration
- **Settings**: Comprehensive app configuration and privacy controls
- **About**: App information, team, and legal documents

### 🔧 **Additional Features**
- **Modal Views**: Detailed record viewing with export options
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Smooth loading animations and progress indicators

## 🎨 Design System

### **Color Palette**
- **Primary**: Deep Blue (#0A2342) to Aqua (#00B4D8)
- **Secondary**: Soft White (#F8F9FA) with Accent Green (#2ECC71)
- **Alternative**: Midnight Navy (#081229) to Cyan Glow (#00FFFF)

### **Typography**
- **Primary Font**: Inter (clean, modern readability)
- **Accent Font**: Poppins (friendly, approachable)
- **Monospace**: For blockchain hashes and technical data

### **Animations**
- **Micro-interactions**: Moti-powered smooth transitions
- **Page Transitions**: Spring-based navigation animations
- **Loading States**: Engaging spinner and progress animations
- **Gesture Feedback**: Haptic feedback for user interactions

## 🛠 Technology Stack

### **Frontend**
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation and routing

### **UI/UX**
- **Moti**: Declarative animations for React Native
- **React Native Reanimated**: High-performance animations
- **Expo Linear Gradient**: Beautiful gradient backgrounds
- **React Native Vector Icons**: Comprehensive icon library

### **State Management**
- **React Context**: Theme and global state management
- **React Hooks**: Local state and side effects

### **Development Tools**
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Expo Dev Tools**: Debugging and development

## 📁 Project Structure

```
swasthya/
├── app/                          # Main application screens
│   ├── (tabs)/                   # Tab navigator screens
│   │   ├── index.tsx            # Dashboard screen
│   │   ├── records.tsx          # Health records screen
│   │   ├── diagnosis.tsx        # AI diagnosis screen
│   │   ├── chat.tsx             # AI chat screen
│   │   └── profile.tsx          # User profile screen
│   ├── auth/                    # Authentication screens
│   │   ├── login.tsx            # Login screen
│   │   └── signup.tsx           # Signup screen
│   ├── _layout.tsx              # Root layout with navigation
│   ├── splash.tsx               # Splash screen
│   ├── onboarding.tsx           # Onboarding carousel
│   ├── modal.tsx                # Modal screens
│   ├── settings.tsx             # Settings screen
│   └── about.tsx                # About screen
├── components/                   # Reusable components
│   ├── ui/                      # UI components
│   ├── error-boundary.tsx       # Error handling
│   └── loading-screen.tsx       # Loading states
├── constants/                    # App constants
│   └── theme.ts                 # Theme configuration
├── contexts/                     # React contexts
│   └── ThemeContext.tsx         # Theme provider
└── hooks/                       # Custom hooks
    └── use-color-scheme.ts      # Theme hook
```

## 🔒 Security Features

### **Data Protection**
- **End-to-End Encryption**: All health data encrypted before blockchain storage
- **Zero-Knowledge Architecture**: App cannot access your private keys
- **Biometric Authentication**: Secure device-level authentication
- **Session Management**: Automatic logout and session expiry

### **Privacy Controls**
- **Granular Permissions**: Control who can access specific health data
- **Anonymous Analytics**: Optional usage statistics without personal data
- **Data Portability**: Export your data in standard formats
- **Right to Deletion**: Complete data removal from blockchain (where legally possible)

## 🚀 Future Roadmap

### **Phase 2: Enhanced AI**
- [ ] Integration with wearable devices (Apple Watch, Fitbit)
- [ ] Advanced ML models for chronic disease prediction
- [ ] Personalized nutrition and fitness recommendations
- [ ] Voice-activated health assistant

### **Phase 3: Ecosystem Expansion**
- [ ] Healthcare provider portal
- [ ] Insurance integration and claims processing
- [ ] Telemedicine video consultations
- [ ] Pharmacy integration for prescription management

### **Phase 4: Global Health**
- [ ] Multi-language support
- [ ] Regional healthcare system integration
- [ ] Public health data contribution (anonymized)
- [ ] Emergency response network

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines and code of conduct before submitting pull requests.

### **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.swasthya.health](https://docs.swasthya.health)
- **Community**: [Discord Server](https://discord.gg/swasthya)
- **Email Support**: support@swasthya.health
- **Bug Reports**: [GitHub Issues](https://github.com/your-username/swasthya-app/issues)

## 🙏 Acknowledgments

- **Medical Advisors**: Dr. Sarah Johnson, MD
- **Blockchain Consultants**: Ethereum Foundation
- **AI/ML Partners**: OpenAI, Hugging Face
- **Design Inspiration**: Apple Health, Google Fit
- **Open Source Libraries**: React Native community

---

<div align="center">
  <p><strong>Built with ❤️ for better healthcare outcomes</strong></p>
  <p>© 2024 Swasthya. All rights reserved.</p>
</div>