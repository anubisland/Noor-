import os
import shutil

print("--- Starting Android Patch Script ---")

# 1. Patch MainApplication.kt for RTL
main_app_path = 'noor-app/android/app/src/main/java/com/anubisland/noor/quran/MainApplication.kt'
if os.path.exists(main_app_path):
    with open(main_app_path, 'r', encoding='utf-8') as f:
        code = f.read()
    if 'i18nUtil' not in code:
        code = code.replace(
            'super.onCreate()',
            'super.onCreate()\n    val i18nUtil = com.facebook.react.modules.i18nmanager.I18nUtil.getInstance()\n    i18nUtil.allowRTL(this, true)\n    i18nUtil.forceRTL(this, true)'
        )
        with open(main_app_path, 'w', encoding='utf-8') as f:
            f.write(code)
        print('Patched MainApplication.kt for RTL successfully')
    else:
        print('MainApplication.kt already has i18nUtil')
else:
    print(f'Warning: {main_app_path} not found')

# 1.1 Patch MainActivity.kt for DecorView RTL
main_activity_path = 'noor-app/android/app/src/main/java/com/anubisland/noor/quran/MainActivity.kt'
if os.path.exists(main_activity_path):
    with open(main_activity_path, 'r', encoding='utf-8') as f:
        m_code = f.read()
    if 'LAYOUT_DIRECTION_RTL' not in m_code:
        m_code = m_code.replace(
            'super.onCreate(null)',
            'super.onCreate(null)\n    window.decorView.layoutDirection = android.view.View.LAYOUT_DIRECTION_RTL'
        )
        with open(main_activity_path, 'w', encoding='utf-8') as f:
            f.write(m_code)
        print('Patched MainActivity.kt for DecorView RTL successfully')
    else:
        print('MainActivity.kt already has LAYOUT_DIRECTION_RTL')
else:
    print(f'Warning: {main_activity_path} not found')

# 2. Patch AndroidManifest.xml for RTL
manifest_path = 'noor-app/android/app/src/main/AndroidManifest.xml'
if os.path.exists(manifest_path):
    with open(manifest_path, 'r', encoding='utf-8') as f:
        xml = f.read()
    if 'android:supportsRtl="true"' not in xml:
        xml = xml.replace('<application', '<application android:supportsRtl="true"')
        with open(manifest_path, 'w', encoding='utf-8') as f:
            f.write(xml)
        print('Patched AndroidManifest.xml for RTL successfully')
    else:
        print('AndroidManifest.xml already has supportsRtl')
else:
    print(f'Warning: {manifest_path} not found')

# 3. Copy ALL fonts directly to android assets
fonts_dest = 'noor-app/android/app/src/main/assets/fonts'
os.makedirs(fonts_dest, exist_ok=True)

# Copy app fonts
app_fonts_src = 'noor-app/assets/fonts'
if os.path.exists(app_fonts_src):
    for font_file in os.listdir(app_fonts_src):
        if font_file.endswith(('.ttf', '.otf')):
            src = os.path.join(app_fonts_src, font_file)
            shutil.copy2(src, os.path.join(fonts_dest, font_file))
            # Also create lowercase version (e.g. Ionicons.ttf -> ionicons.ttf)
            shutil.copy2(src, os.path.join(fonts_dest, font_file.lower()))
    print(f'Copied app fonts from {app_fonts_src} to {fonts_dest}')

# Copy vector icon fonts from @expo/vector-icons
vector_fonts_src = 'noor-app/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts'
if os.path.exists(vector_fonts_src):
    for font_file in os.listdir(vector_fonts_src):
        if font_file.endswith(('.ttf', '.otf')):
            src = os.path.join(vector_fonts_src, font_file)
            shutil.copy2(src, os.path.join(fonts_dest, font_file))
            shutil.copy2(src, os.path.join(fonts_dest, font_file.lower()))
    print(f'Copied vector icon fonts from {vector_fonts_src} to {fonts_dest}')

# List all bundled fonts to log for verification
bundled = os.listdir(fonts_dest)
print(f'Total bundled fonts in assets/fonts: {len(bundled)}')
print(f'Bundled fonts list: {bundled}')

print("--- Android Patch Script Completed ---")
