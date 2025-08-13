# Environment Setup Guide

This guide will help you set up your development environment for React Native development with this whitelabel template.

## Prerequisites

### Required Software

#### Node.js
- **Version**: Node.js 18 or higher
- **Download**: [nodejs.org](https://nodejs.org/)
- **Verify installation**: `node --version`

#### Package Manager
- **npm** (comes with Node.js) or **yarn**
- **Verify npm**: `npm --version`
- **Install Yarn** (optional): `npm install -g yarn`

#### Git
- **Download**: [git-scm.com](https://git-scm.com/)
- **Verify installation**: `git --version`

### Development Tools

#### Visual Studio Code (Recommended)
- **Download**: [code.visualstudio.com](https://code.visualstudio.com/)
- **Recommended Extensions**:
  - React Native Tools
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Hero
  - Prettier - Code formatter
  - ESLint

#### Expo CLI
```bash
npm install -g @expo/cli
```

## Platform-Specific Setup

### For Android Development

#### Android Studio
1. **Download**: [developer.android.com/studio](https://developer.android.com/studio)
2. **Install** with default settings
3. **Configure Android SDK**:
   - Open Android Studio
   - Go to Tools → SDK Manager
   - Install latest SDK Platform
   - Install Android SDK Build-Tools
   - Install Android Emulator

#### Environment Variables
Add to your system PATH:
```bash
# Windows
ANDROID_HOME = C:\Users\%USERNAME%\AppData\Local\Android\Sdk
PATH += %ANDROID_HOME%\platform-tools
PATH += %ANDROID_HOME%\emulator
PATH += %ANDROID_HOME%\tools
PATH += %ANDROID_HOME%\tools\bin

# macOS/Linux
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### Android Emulator Setup
1. Open Android Studio
2. Go to Tools → AVD Manager
3. Create Virtual Device
4. Choose a device (Pixel 6 recommended)
5. Download and select a system image (API 33+ recommended)
6. Configure and finish

### For iOS Development (macOS Only)

#### Xcode
1. **Install** from Mac App Store
2. **Open Xcode** and accept license agreements
3. **Install Command Line Tools**:
   ```bash
   xcode-select --install
   ```

#### iOS Simulator
- Comes with Xcode
- Launch via: Xcode → Open Developer Tool → Simulator

#### CocoaPods
```bash
sudo gem install cocoapods
```

## Project Setup

### 1. Clone the Template
```bash
git clone <your-whitelabel-template-repo>
cd ReactNativeTemplateProject
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run start
# or
yarn start
```

### 4. Run on Device/Emulator

#### Using Expo Go (Easiest)
1. Install Expo Go on your phone
2. Scan QR code from terminal
3. App loads instantly

#### Using Android Emulator
```bash
npm run android
# or press 'a' in the terminal
```

#### Using iOS Simulator
```bash
npm run ios
# or press 'i' in the terminal
```

## Troubleshooting

### Common Issues

#### Metro Bundler Issues
```bash
# Clear cache and restart
npx expo start --clear
```

#### Android Emulator Not Found
- Ensure Android Studio is installed
- Check ANDROID_HOME environment variable
- Restart terminal after setting environment variables

#### iOS Simulator Issues
- Ensure Xcode Command Line Tools are installed
- Reset simulator: Device → Erase All Content and Settings

#### Port Already in Use
```bash
# Kill process on port 8081
npx kill-port 8081
```

### Getting Help

- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev/)
- **React Native Documentation**: [reactnative.dev](https://reactnative.dev/)
- **Community Support**: [expo.dev/community](https://expo.dev/community)

## Next Steps

Once your environment is set up:
1. Read [WHITELABEL_GUIDE.md](./WHITELABEL_GUIDE.md) for customization
2. Follow [DEPLOYMENT_ANDROID.md](./DEPLOYMENT_ANDROID.md) for Android deployment
3. Follow [DEPLOYMENT_IOS.md](./DEPLOYMENT_IOS.md) for iOS deployment
