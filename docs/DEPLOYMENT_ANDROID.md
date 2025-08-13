# Android Deployment Guide

This guide covers everything needed to deploy your whitelabel React Native app to the Google Play Store.

## Prerequisites

Before starting deployment, ensure you have:
- ✅ Completed [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
- ✅ Customized your app using [WHITELABEL_GUIDE.md](./WHITELABEL_GUIDE.md)
- ✅ Google Play Developer Account ($25 one-time fee)
- ✅ Android Studio installed and configured

## 1. Prepare Your App for Production

### Update App Configuration

Edit `app.json` with production settings:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "android": {
      "package": "com.yourcompany.yourapp",
      "versionCode": 1,
      "compileSdkVersion": 34,
      "targetSdkVersion": 34,
      "buildToolsVersion": "34.0.0",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": [
        "android.permission.INTERNET",
        "android.permission.ACCESS_NETWORK_STATE"
      ]
    }
  }
}
```

### Environment Variables

Create `.env.production` file:
```bash
API_URL=https://your-production-api.com
WEBAPP_URL=https://your-production-webapp.com
ENVIRONMENT=production
```

## 2. Generate Signing Key

### Create Keystore

```bash
# Navigate to android/app directory
cd android/app

# Generate signing key (replace with your details)
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# You'll be prompted for:
# - Keystore password (save this securely!)
# - Key password (save this securely!)
# - Your name, organization, city, state, country
```

### Store Keystore Securely

⚠️ **IMPORTANT**: 
- Back up your keystore file - losing it means you cannot update your app
- Store passwords in a secure password manager
- Never commit keystore to version control

### Configure Gradle

Create `android/gradle.properties`:
```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=your_keystore_password
MYAPP_UPLOAD_KEY_PASSWORD=your_key_password
```

Update `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

## 3. Build Production APK/AAB

### Using Expo Build Service (Recommended)

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for Android
eas build --platform android --profile production
```

### Local Build (Advanced)

```bash
# Generate native Android project
npx expo prebuild --platform android

# Navigate to android directory
cd android

# Build release APK
./gradlew assembleRelease

# Build release AAB (recommended for Play Store)
./gradlew bundleRelease
```

Build outputs:
- **APK**: `android/app/build/outputs/apk/release/app-release.apk`
- **AAB**: `android/app/build/outputs/bundle/release/app-release.aab`

## 4. Test Your Build

### Install on Device

```bash
# Install APK on connected device
adb install android/app/build/outputs/apk/release/app-release.apk

# Or install via Android Studio
# Open Android Studio → Build → Generate Signed Bundle/APK
```

### Testing Checklist

- [ ] App launches successfully
- [ ] WebView loads your webapp correctly
- [ ] All navigation works properly
- [ ] App icon displays correctly
- [ ] Splash screen appears
- [ ] Performance is acceptable
- [ ] Network connectivity works
- [ ] No debug logs in production

## 5. Google Play Store Submission

### Create Play Console Account

1. Visit [play.google.com/console](https://play.google.com/console)
2. Pay $25 registration fee
3. Verify your identity
4. Accept developer agreements

### Prepare Store Assets

#### App Screenshots (Required)
- **Phone**: 2-8 screenshots, 320-3840px on each side
- **7-inch Tablet**: 1-8 screenshots (optional)
- **10-inch Tablet**: 1-8 screenshots (optional)

#### Graphics Assets
- **App Icon**: 512x512px PNG
- **Feature Graphic**: 1024x500px JPG/PNG
- **Promo Video**: YouTube URL (optional)

#### Store Listing Content
```
App Title: Your App Name (max 50 characters)

Short Description: Brief description of your app (max 80 characters)

Full Description: Detailed description (max 4000 characters)
Example:
"Experience the full power of [Your Platform] in a native mobile app. 
Access all your tools, data, and workflows optimized for mobile devices.

Features:
• Full webapp functionality in native app
• Optimized mobile experience  
• Secure authentication
• Offline capability
• Push notifications

Perfect for professionals who need [Your Platform] on the go."
```

### Upload Your App

1. **Create New App**
   - Go to Play Console
   - Click "Create App"
   - Fill in app details
   - Select free/paid

2. **Upload App Bundle**
   - Go to Production → Releases
   - Click "Create new release"
   - Upload your AAB file
   - Add release notes

3. **Complete Store Listing**
   - Add screenshots and graphics
   - Write store description
   - Set content rating
   - Select target audience

4. **Set Up App Access**
   - Choose app availability
   - Set pricing (if paid)
   - Select countries/regions

5. **Review and Publish**
   - Complete pre-launch checklist
   - Submit for review

## 6. Post-Deployment

### Monitor Your App

- **Play Console Dashboard**: Track downloads, ratings, crashes
- **Firebase Crashlytics**: Monitor app stability
- **Google Analytics**: Track user behavior

### Update Process

For app updates:
1. Increment `versionCode` in `app.json`
2. Update `version` for user-visible changes
3. Build new AAB
4. Upload to Play Console
5. Add release notes
6. Submit for review

### Version Management

```json
{
  "expo": {
    "version": "1.0.1",        // User-visible version
    "android": {
      "versionCode": 2         // Internal version (must increase)
    }
  }
}
```

## 7. Troubleshooting

### Common Build Issues

#### Gradle Build Fails
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleRelease
```

#### Keystore Issues
- Verify keystore file path
- Check passwords are correct
- Ensure keystore is not corrupted

#### Memory Issues
Update `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m
```

### Common Play Store Rejections

#### Content Policy Violations
- Ensure your webapp content complies with Play Store policies
- Add proper content ratings
- Include privacy policy

#### Technical Issues
- Test on various Android versions
- Ensure app doesn't crash on startup
- Verify all required permissions are declared

#### Metadata Issues
- Screenshots must show actual app functionality
- Store description must be accurate
- App title must not contain promotional text

## 8. Advanced Configuration

### Multiple Build Variants

Create different builds for different brands:

```gradle
// android/app/build.gradle
android {
    flavorDimensions "brand"
    productFlavors {
        brandA {
            dimension "brand"
            applicationId "com.yourcompany.branda"
            versionName "1.0.0"
        }
        brandB {
            dimension "brand"
            applicationId "com.yourcompany.brandb"
            versionName "1.0.0"
        }
    }
}
```

### Custom Permissions

Add specific permissions for your use case:

```json
{
  "expo": {
    "android": {
      "permissions": [
        "android.permission.INTERNET",
        "android.permission.ACCESS_NETWORK_STATE",
        "android.permission.CAMERA",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

### ProGuard (Code Obfuscation)

Enable ProGuard for release builds:

```gradle
// android/app/build.gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

## Resources

- [Google Play Console Help](https://support.google.com/googleplay/android-developer/)
- [Android Developer Guide](https://developer.android.com/guide)
- [Expo Build Documentation](https://docs.expo.dev/build/introduction/)
- [React Native Android Setup](https://reactnative.dev/docs/running-on-device)

## Next Steps

After successful Android deployment:
1. Monitor app performance and user feedback
2. Plan iOS deployment using [DEPLOYMENT_IOS.md](./DEPLOYMENT_IOS.md)
3. Set up automated CI/CD for future updates
4. Implement analytics and crash reporting
