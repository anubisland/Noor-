import os

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
