# 🚀 Android App Deployment Playbook (Flutter to Google Play Store)

A production-ready, step-by-step guide for configuring, digitally signing, building, and deploying Flutter applications to the Google Play Store.

---

## 📑 Table of Contents
1. [Phase 1: In-App Preparation & Digital Signing](#phase-1-in-app-preparation--digital-signing)
2. [Phase 2: Building the Release Bundle](#phase-2-building-the-release-bundle)
3. [Phase 3: Google Play Console Configuration](#phase-3-google-play-console-configuration)
4. [Phase 4: Release Tracks & Deployment](#phase-4-release-tracks--deployment)
5. [Maintenance & Subsequent Releases](#maintenance--subsequent-releases)

---

## Phase 1: In-App Preparation & Digital Signing

### 1.1 Launcher Icon Generation
Ensure high-density app launcher icons are generated across all screen densities.

Add `flutter_launcher_icons` to `dev_dependencies` in `pubspec.yaml`:
```yaml
dev_dependencies:
  flutter_launcher_icons: ^0.14.3

flutter_launcher_icons:
  android: true
  ios: true
  image_path: "assets/icons/app_icon.png" # Must be minimum 1024x1024 PNG
```
Run icon generation:
```bash
flutter pub get
flutter pub run flutter_launcher_icons
```
### 1.2 Android Namespace & SDK Targets
Review `android/app/build.gradle` (or `build.gradle.kts`):
```groovy
android {
    namespace "com.yourcompany.yourapp" // Unique Application ID

    defaultConfig {
        applicationId "com.yourcompany.yourapp"
        minSdkVersion 24
        targetSdkVersion 35
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
    }
}
```

### 1.3 Upload Keystore Generation (PKCS12 Standard)
Generate the cryptographic upload key used by Google Play App Signing.

Navigate to your `android/` directory:
```bash
cd android
```
Run the `keytool` command with modern PKCS12 formatting:

- **macOS / Linux:**
    ```bash
    keytool -genkey -v -keystore upload-keystore.jks -storetype PKCS12 -keyalg RSA -keysize 2048 -validity 10000 -alias upload
    ```
- **Windows (PowerShell):**
    ```PowerShell
    keytool -genkey -v -keystore 'upload-keystore.jks' -storetype PKCS12 -keyalg RSA -keysize 2048 -validity 10000 -alias upload
    ```
>  ⚠️ *Key Prompt Values:*
>- Set a strong keystore password and save it securely.
>- Fill in your certificate details (Name, Organization, City, Country).
>- Confirm with yes when prompted.

### 14. Secret Key Configuration (`key.properties`)
Create `android/key.properties` to reference the local keystore without hardcoding secrets:

```Properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEYSTORE_PASSWORD
keyAlias=upload
storeFile=upload-keystore.jks
```

##### Git Protection
Add keys and secret properties to `.gitignore` at the project root:

```Code snippet
# Keystore & Android secrets
*.jks
*.keystore
android/key.properties
```

### 1.5 Linking Signing Configurations in Gradle
Update `android/app/build.gradle` to load `key.properties` dynamically for release builds:

```Groovy
import java.io.FileInputStream
import java.util.Properties

def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

## Phase 2: Building the Release Bundle
### 2.1 Update Versioning

Increment the build code and name in `pubspec.yaml`:

```yaml
version: 1.0.0+1
# Format: [Major].[Minor].[Patch]+[BuildNumber]
```

### 2.2 Compile the Android App Bundle (AAB)
Clean caches and compile the production bundle:

```bash
flutter clean
flutter pub get
flutter build appbundle --release
```

(Optional - with code obfuscation to protect IP):
```bash
flutter build appbundle --release --obfuscate --split-debug-info=build/app/outputs/symbols
```

##### Artifact Output Location:
📁 `build/app/outputs/bundle/release/app-release.aab`

## Phase 3: Google Play Console Configuration

### 3.1 App Creation
1. Sign in to [Google Play Console](https://play.google.com/console).
2. Click **Create app** in the top-right corner.
3. Configure primary application properties:
   - **App name:** Up to 30 characters.
   - **Default language:** Select your primary target locale (e.g., `English (United States)`).
   - **App or game:** Select **App**.
   - **Free or Paid:** Select your commercial monetization model (cannot be switched from Free to Paid after publishing).
4. Accept Developer Program Policies and US export laws declarations.

---

### 3.2 Main Store Listing Assets
Navigate to **Grow → Store presence → Main store listing** and supply the following metadata and graphics:

#### Text Metadata
* **App name:** Max 30 characters.
* **Short description:** Up to 80 characters (surfaced directly in search previews).
* **Full description:** Up to 4,000 characters (detailed feature specifications, contact avenues, value propositions).

#### Graphical Assets Matrix
| Asset Type | Dimension / Ratio | Format & Constraints | Required? |
| :--- | :--- | :--- | :--- |
| **App Icon** | `512 x 512 px` | 32-bit PNG (with alpha), max 1024 KB | **Yes** |
| **Feature Graphic** | `1024 x 500 px` | JPEG or 24-bit PNG (no alpha), max 15 MB | **Yes** |
| **Phone Screenshots** | Min `1080 x 1920 px` (9:16 portrait) or `1920 x 1080 px` (16:9 landscape) | JPEG / 24-bit PNG, 320–3840 px per side, max 8 MB each | **Yes (Min 2, Max 8)** |
| **7-Inch Tablet Screenshots** | Min `1080 px` short side | 16:9 or 9:16, max 8 MB each | Optional *(Recommended)* |
| **10-Inch Tablet Screenshots** | Min `1080 px` short side | 16:9 or 9:16, max 8 MB each | Optional *(Recommended)* |

---

### 3.3 App Content & Policy Compliance Checklist
Navigate to **Policy & programmes → App content**. Google review bots will reject the application unless every module below is completed:

- [ ] **Privacy Policy:** Provide a live HTTPS link disclosing PII collection, storage, and retention mechanisms.
- [ ] **Ads Declaration:** Declare whether the app contains ad SDKs or promotional interstitials.
- [ ] **App Access Credentials:** If features require authentication, create a test account (e.g., email/phone + OTP/password) with instructions so Google QA reviewers can log in.
- [ ] **Target Audience & Content Rating:** Complete the IARC questionnaire regarding violence, profanity, and financial features to earn official age ratings (PEGI, ESRB).
- [ ] **Financial Features / Government Services:** Declare non-affiliation unless officially authorized.
- [ ] **Data Safety Form:** Accurately map collected data types (User identifiers, precise/approximate location, crash logs, device telemetry) and declare encryption in transit/rest protocols.

---

## Phase 4: Release Tracks & Deployment
```
[ Local Build: .aab ]
│
▼
[ 1. Internal Testing ] ── (Validate install mechanics & API telemetry)
│
▼
[ 2. Closed Testing ] ─── (Mandatory 12 testers / 14-day rule for Personal Accounts)
│
▼
[ 3. Production Rollout ] ── (Full rollout or Staged percentage)
```

---

### 4.1 Step 1: Internal Testing Track (Initial Verification)
Internal testing has zero review wait times and allows up to 100 internal developers/testers to install immediately:

1. In the Play Console menu, go to **Release → Testing → Internal testing**.
2. Click **Create new release**.
3. Under **App bundles**, upload your compiled `app-release.aab` file from `build/app/outputs/bundle/release/`.
4. Enter **Release name** (e.g., `1.0.0 (1)`) and internal release notes.
5. Click **Next** → **Save** → **Start rollout to Internal testing**.
6. Switch to the **Testers** tab, create an email list, check the box to select it, and copy the **Join on Android** or **Join on the web** link to install and verify your release locally.

---

### 4.2 Step 2: Closed Testing Track (The 14-Day Evaluation Rule)

> ⚠️ **Google Play Policy for Personal Accounts:**
> Personal developer accounts created after November 13, 2023, must run a **Closed Test with at least 12 opted-in testers for 14 continuous, consecutive days** before Google Play permits applying for production release access.

1. Navigate to **Release → Testing → Closed testing**.
2. Create a track (e.g., `Alpha` or `Closed Alpha`).
3. Click **Manage track → Create new release** and promote your tested `.aab` or upload a fresh build.
4. Set up tester recruitment:
   * Navigate to **Testers** tab.
   * Add a minimum of **15–20 tester Google accounts** (buffer against dropouts).
   * Share the **Web/Android Opt-in Link** with testers.
   * Verify all 12+ testers click the link, accept the invite, and download the build to their devices.
5. Keep testers actively opening the application across the 14-day window. Track progress on the Play Console dashboard counter.

---

### 4.3 Step 3: Production Rollout

Once closed testing requirements are fulfilled (or immediately if you are using an established Organization Developer Account):

1. Navigate to **Release → Production**.
2. Click **Create new release** (or promote directly from Closed Testing).
3. Confirm the verified `.aab` version code.
4. Input public release notes categorized by locale:
    ```text
    en-US
    - Initial release of Kindred mobile app.
    - Offline vCard QR generation & card management features.
    ```
5. Choose your rollout strategy:
    - Full Rollout: Available to 100% of store users upon review approval.
    - Staged Rollout (Recommended): Release incrementally (e.g., 10% → 20% → 50% → 100%) over several days to monitor crash rates in production.

6. Click Next → Save → Review release → Start rollout to Production.

##### 🔄 Maintenance & Subsequent Updates
To deploy app updates after your production build is live:

1. Update the version string in pubspec.yaml:
    ```yaml
    version: 1.0.1+2 # Increment build integer (+1)
    ```
2. Clean and compile a new bundle:
    ```Bash
    flutter clean && flutter pub get
    flutter build appbundle --release
    ```
3. In Play Console, go to **Release → Production → Create new release**, upload the new `app-release.aab`, add release notes, and submit for review.