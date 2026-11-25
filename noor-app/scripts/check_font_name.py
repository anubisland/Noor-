from fontTools.ttLib import TTFont

kfg = TTFont('noor-app/assets/fonts/KFGQPC-Hafs.otf')
for record in kfg['name'].names:
    if record.nameID in [1, 2, 4, 6]:
        try:
            print(f"ID {record.nameID}: {record.toUnicode()}")
        except:
            pass
