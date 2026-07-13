// Auto-generated from srmdn/quran-mutashabihat
// 283 curated pairs with categories and explanatory notes

export interface SrmdnPair {
  ayah1: string;   // "surahId:ayahNumber"
  ayah2: string;   // "surahId:ayahNumber"
  category: string;
  noteAr: string;    // Arabic explanation of the difference
  noteEn?: string;   // English translation of noteAr
}

export interface SrmdnCategory {
  id: string;
  name: string;
  nameEn: string;
  color: string;
}

export const srmdnCategories: SrmdnCategory[] = [
  { id: 'lafzi', name: 'لفظي', nameEn: 'Verbal', color: '#2980B9' },
  { id: 'word_swap', name: 'تبديل كلمات', nameEn: 'Word Swap', color: '#E67E22' },
  { id: 'addition_omission', name: 'زيادة ونقص', nameEn: 'Addition/Omission', color: '#27AE60' },
  { id: 'context_shift', name: 'تحول السياق', nameEn: 'Context Shift', color: '#8E44AD' },
  { id: 'structural', name: 'تركيبي', nameEn: 'Structural', color: '#F39C12' },
  { id: 'order_change', name: 'تغيير الترتيب', nameEn: 'Order Change', color: '#E74C3C' },
  { id: 'ending_variation', name: 'اختلاف الخاتمة', nameEn: 'Ending Variation', color: '#16A085' },
  { id: 'pronoun_shift', name: 'تحول الضمير', nameEn: 'Pronoun Shift', color: '#D35400' },
];

// Curated pairs with human-readable notes explaining the differences
export const srmdnPairs: SrmdnPair[] = [
  { ayah1: '2:2', ayah2: '27:2', category: 'word_swap', noteAr: 'تصف كلتاهما القرآن بأنه "هدى" — تنتهي 2:2 "هدًى للمتقين" بينما تقول 27:2 "هدًى وبشرى للمؤمنين"، مبدلة "المتقين" بـ"المؤمنين" ومضافة "وبشرى".', noteEn: 'Both describe the Quran as "guidance" — 2:2 ends with "guidance for the righteous" while 27:2 says "guidance and good news for the believers," swapping "the righteous" with "the believers" and adding "and good news."' },
  { ayah1: '2:2', ayah2: '31:3', category: 'word_swap', noteAr: 'تصف كلتاهما القرآن بأنه "هدى" — تنتهي 2:2 "هدًى للمتقين" بينما تقول 31:3 "هدًى ورحمة للمحسنين"، مستبدلة "المتقين" بـ"المحسنين" ومضافة "ورحمة".', noteEn: 'Both describe the Quran as "guidance" — 2:2 ends with "guidance for the righteous" while 31:3 says "guidance and mercy for the doers of good," replacing "the righteous" with "the doers of good" and adding "and mercy."' },
  { ayah1: '2:4', ayah2: '31:4', category: 'addition_omission', noteAr: 'تنتهي كلتاهما باليقين بالآخرة — تنتهي 2:4 "وبالآخرة هم يوقنون" بينما تنتهي 31:4 "وهم بالآخرة هم يوقنون"، بإضافة "هم" قبل العبارة.', noteEn: 'Both end with certainty in the Hereafter — 2:4 ends "and of the Hereafter they are certain" while 31:4 ends "and they, of the Hereafter, they are certain," adding "they" before the phrase.' },
  { ayah1: '2:22', ayah2: '14:32', category: 'lafzi', noteAr: 'تعد كلتاهما نعم الله ومنها "أنزل من السماء ماء فأخرج به من الثمرات رزقا لكم"؛ 2:22 في مطلع الحجة للتوحيد، 14:32 في دعاء إبراهيم في تعداد النعم الإلهية.', noteEn: 'Both enumerate God\'s blessings, including "sent down from the sky water and brought forth thereby fruits as provision for you"; 2:22 opens the argument for monotheism, while 14:32 appears in Abraham\'s prayer listing divine favors.' },
  { ayah1: '2:23', ayah2: '2:278', category: 'structural', noteAr: 'تنتهي كلتاهما بشرط "إن كنتم X" — تخاطب 2:23 المرتابين بـ"إن كنتم صادقين" بينما تخاطب 2:278 المؤمنين بـ"إن كنتم مؤمنين"، نفس بنية التحدي مع تبديل الصفة.', noteEn: 'Both end with the condition "if you are X" — 2:23 addresses the doubters with "if you are truthful" while 2:278 addresses the believers with "if you are believers," the same challenge structure with a swapped attribute.' },
  { ayah1: '2:25', ayah2: '3:15', category: 'word_swap', noteAr: 'تصف 2:25 أنهار الجنة "تجري من تحتها الأنهار" في وعد الثواب للمؤمنين، بينما تردد 3:15 وعد الجنة نفسه بعبارات متطابقة تقريبًا — تستخدم كلتاهما "جنات تجري من تحتها الأنهار" في سياق الثواب.', noteEn: '2:25 describes the rivers of Paradise "under which rivers flow" in the promise of reward for believers, while 3:15 echoes the same promise of Paradise in nearly identical terms — both use "gardens beneath which rivers flow" in the context of reward.' },
  { ayah1: '2:27', ayah2: '13:25', category: 'lafzi', noteAr: 'تصف كلتاهما الذين ينقضون عهد الله ويقطعون ما أمر الله به أن يوصل ويفسدون في الأرض. تنتهي 2:27 "أولئك هم الخاسرون"؛ وتنتهي 13:25 "أولئك لهم اللعنة ولهم سوء الدار".', noteEn: 'Both describe those who break God\'s covenant, sever what God has commanded to be joined, and spread corruption on earth. 2:27 ends "those are the losers"; 13:25 ends "upon them is the curse and for them is the evil abode."' },
  { ayah1: '2:34', ayah2: '20:116', category: 'lafzi', noteAr: 'تذكر كلتاهما أمر الملائكة بالسجود لآدم وإباء إبليس بنفس الصياغة حتى "أبى"؛ تزيد 2:34 "واستكبر وكان من الكافرين"، وتزيد 20:116 "وعصى أمر ربه".', noteEn: 'Both recount the command for the angels to prostrate to Adam and Iblis\'s refusal in the same wording up to "refused"; 2:34 adds "and he was arrogant and became of the disbelievers," while 20:116 adds "and he disobeyed the command of his Lord."' },
  { ayah1: '2:34', ayah2: '38:74', category: 'addition_omission', noteAr: 'تصف كلتاهما إبليس أنه أبى السجود وكان من الكافرين لكن 38:74 تزيد "استكبر" قبل "وكان من الكافرين"، بينما تحذفها 2:34.', noteEn: 'Both describe Iblis refusing to prostrate and becoming among the disbelievers, but 38:74 adds "he was arrogant" before "and became of the disbelievers," whereas 2:34 omits it.' },
  { ayah1: '2:35', ayah2: '7:19', category: 'lafzi', noteAr: 'تحتوي كلتاهما على الأمر لآدم وزوجه في الجنة: "حيث شئتما ولا تقربا هذه الشجرة فتكونا من الظالمين"؛ 2:35 هي الرواية المختصرة، 7:19 تأتي في القصة الموسعة للجنة.', noteEn: 'Both contain the command to Adam and his wife in the Garden: "wherever you wish and do not approach this tree, lest you become of the wrongdoers"; 2:35 is the shorter account, while 7:19 appears in the expanded narrative of the Garden.' },
  { ayah1: '2:36', ayah2: '7:24', category: 'lafzi', noteAr: 'تحتوي كلتاهما على أمر الهبوط بعد معصية آدم: "اهبطوا بعضكم لبعض عدو ولكم في الأرض مستقر ومتاع إلى حين"؛ 2:36 هي الرواية المختصرة، 7:24 ضمن القصة الموسعة.', noteEn: 'Both contain the command to descend after Adam\'s disobedience: "descend, some of you enemies to others, and on earth you will have a settlement and enjoyment for a time"; 2:36 is the shorter version, 7:24 within the expanded account.' },
  { ayah1: '2:37', ayah2: '20:122', category: 'word_swap', noteAr: 'تصف كلتاهما قبول الله لتوبة آدم — تقول 2:37 "فتاب عليه إنه هو التواب الرحيم" بينما تقول 20:122 "فتاب عليه وهدى"، تشتركان في "تاب عليه" لكن تختلفان في الخاتمة: مغفرة ورحمة في 2:37، هداية في 20:122.', noteEn: 'Both describe God\'s acceptance of Adam\'s repentance — 2:37 says "then He accepted his repentance; indeed He is the Accepting of Repentance, the Merciful" while 20:122 says "then He accepted his repentance and guided [him]," sharing "accepted his repentance" but differing in the conclusion: forgiveness and mercy in 2:37, guidance in 20:122.' },
  { ayah1: '2:40', ayah2: '5:20', category: 'word_swap', noteAr: '2:40 "يا بني إسرائيل اذكروا نعمتي التي أنعمت عليكم" و5:20 "يا قوم اذكروا نعمة الله عليكم" تبدأ كلتاهما بتذكر نعمة الله — خطاب البقرة لبني إسرائيل بينما المائدة تقتبس خطاب موسى لقومه.', noteEn: '2:40 "O Children of Israel, remember My favor which I bestowed upon you" and 5:20 "O my people, remember the favor of God upon you" — both begin with remembrance of God\'s favor; al-Baqarah addresses the Children of Israel directly while al-Ma\'idah quotes Moses addressing his people.' },
  { ayah1: '2:47', ayah2: '2:122', category: 'lafzi', noteAr: 'نداء متطابق لبني إسرائيل لتذكر نعمة الله وتفضيلهم على العالمين، مكرر داخل سورة البقرة.', noteEn: 'An identical call to the Children of Israel to remember God\'s favor and their preference over the worlds, repeated within Surat al-Baqarah.' },
  { ayah1: '2:48', ayah2: '2:123', category: 'order_change', noteAr: 'تحذر كلتاهما من أن لا شفاعة ولا عدلاً يقبل يومئذ، لكن 2:48 تقدم "شفاعة" على "عدل" بينما 2:123 تعكس الترتيب.', noteEn: 'Both warn that no intercession nor ransom will be accepted on that Day, but 2:48 places "intercession" before "ransom" while 2:123 reverses the order.' },
  { ayah1: '2:49', ayah2: '7:141', category: 'lafzi', noteAr: 'تصف كلتاهما اضطهاد فرعون بالعبارة المشتركة "يذبحون أبناءكم ويستحيون نساءكم وفي ذلكم بلاء من ربكم عظيم"؛ يختلف السياق المحيط (2:49 في سياق تعداد النعم، 7:141 في تذكير النجاة).', noteEn: 'Both describe Pharaoh\'s persecution with the shared phrase "slaughtering your sons and sparing your women, and in that was a great trial from your Lord"; the surrounding context differs (2:49 in enumerating blessings, 7:141 in reminding of deliverance).' },
  { ayah1: '2:58', ayah2: '7:161', category: 'order_change', noteAr: 'تأمر كلتاهما بالدخول قائلين "حطة" مع السجود، لكن ترتيب "سجدًا" و"حطة" معكوس بين الآيتين.', noteEn: 'Both command entering while prostrating and saying "relieve [us]," but the order of "prostrating" and "relieve" is reversed between the two verses.' },
  { ayah1: '2:60', ayah2: '7:160', category: 'word_swap', noteAr: 'تصف كلتاهما انفجار الماء من الصخر لموسى لكن 2:60 تستخدم "انفجرت" بينما 7:160 تستخدم "انبجست".', noteEn: 'Both describe water gushing from the rock for Moses, but 2:60 uses "infa jarat" (gushed forth) while 7:160 uses "inbajasat" (burst forth).' },
  { ayah1: '2:62', ayah2: '2:274', category: 'lafzi', noteAr: 'نص متطابق داخل البقرة: "لهم أجرهم عند ربهم ولا خوف عليهم ولا هم يحزنون"؛ 2:62 ثواب المؤمنين المخلصين من أي أمة، 2:274 ثواب المنفقين في الصدقة.', noteEn: 'An identical text within al-Baqarah: "they shall have their reward with their Lord, and no fear shall come upon them, nor shall they grieve"; 2:62 rewards the sincere believers from any nation, 2:274 rewards those who spend in charity.' },
  { ayah1: '2:62', ayah2: '5:69', category: 'order_change', noteAr: 'تعدد كلتاهما المجموعات الأربع — المؤمنون واليهود والنصارى والصابئين — في صيغة وعد متطابقة لكن 2:62 تستخدم "والصابئين" بينما 5:69 تتحول إلى "والصابئون"، تغيير في الحالة الإعرابية مع نفس التسلسل.', noteEn: 'Both list the four groups — believers, Jews, Christians, and Sabians — in an identical promise formula, but 2:62 uses "wa-l-ṣābi\'īna" (accusative/genitive) while 5:69 shifts to "wa-l-ṣābi\'ūna" (nominative), a change in grammatical case with the same sequence.' },
  { ayah1: '2:63', ayah2: '2:93', category: 'lafzi', noteAr: 'نص متطابق داخل البقرة: "وإذ أخذنا ميثاقكم ورفعنا فوقكم الطور خذوا ما آتيناكم بقوة"؛ 2:63 تذكر ميثاق سيناء، 2:93 تكرر الحدث نفسه ضمن تعداد أطول لنقض بني إسرائيل لعهودهم.', noteEn: 'An identical text within al-Baqarah: "And when We took your covenant and raised above you the Mount, \'Take what We have given you with strength\'"; 2:63 recounts the Sinai covenant, 2:93 repeats the same event within a longer enumeration of the Children of Israel\'s breach of their covenants.' },
  { ayah1: '2:120', ayah2: '13:37', category: 'lafzi', noteAr: 'تحذر كلتاهما من أن اتباع الكافرين بعد مجيء العلم يعني "ليس لك من الله من ولي ولا نصير"؛ 2:120 تخاطب النبي بشأن اليهود والنصارى، 13:37 عن اتباع الأهواء مقابل الوحي.', noteEn: 'Both warn that following the disbelievers after knowledge has come means "you have not from God any protector or helper"; 2:120 addresses the Prophet concerning the Jews and Christians, 13:37 about following desires over revelation.' },
  { ayah1: '2:126', ayah2: '14:35', category: 'word_swap', noteAr: '2:126 "رب اجعل هذا بلدًا آمنًا" تستخدم نكرة "بلدًا" بينما 14:35 "رب اجعل هذا البلد آمنًا" تستخدم معرفة "البلد" — دعاء إبراهيم لمكة يرد مرتين بهذا الفرق في التعريف والتنكير.', noteEn: '2:126 "My Lord, make this a secure land" uses the indefinite "a land" while 14:35 "My Lord, make this land secure" uses the definite "the land" — Abraham\'s prayer for Mecca appears twice with this difference in definiteness.' },
  { ayah1: '2:134', ayah2: '2:141', category: 'lafzi', noteAr: 'آية متطابقة مكررة داخل البقرة: كل أمة مسؤولة عن أعمالها ولا تُسأل عما فعله غيرها.', noteEn: 'An identical verse repeated within al-Baqarah: every nation is responsible for its own deeds and will not be asked about what others did.' },
  { ayah1: '2:136', ayah2: '3:84', category: 'word_swap', noteAr: 'تعلن كلتاهما الإيمان بجميع الأنبياء بصياغة متقاربة لكن تختلفان في "إلينا"/"علينا" وفي صياغة "ما أوتي النبيون".', noteEn: 'Both declare faith in all prophets with similar wording but differ in "to us"/"upon us" and in the phrasing of "what the prophets were given."' },
  { ayah1: '2:144', ayah2: '2:150', category: 'lafzi', noteAr: 'أمر القبلة مكرر مرتين داخل البقرة: "فول وجهك شطر المسجد الحرام وحيث ما كنتم فولوا وجوهكم شطره"؛ 2:144 تخاطب النبي مباشرة، 2:150 تعيد صياغته كحكم عام.', noteEn: 'The command regarding the qibla repeated twice within al-Baqarah: "turn your face toward the Sacred Mosque, and wherever you are, turn your faces toward it"; 2:144 addresses the Prophet directly, 2:150 restates it as a general ruling.' },
  { ayah1: '2:146', ayah2: '6:20', category: 'lafzi', noteAr: 'تحتوي كلتاهما على العبارة نفسها "يعرفونه كما يعرفون أبناءهم" — في 2:146 عن معرفة القبلة، وفي 6:20 عن معرفة النبي.', noteEn: 'Both contain the same phrase "they recognize it as they recognize their own sons" — in 2:146 about recognizing the qibla, and in 6:20 about recognizing the Prophet.' },
  { ayah1: '2:170', ayah2: '31:21', category: 'lafzi', noteAr: 'نص متطابق: "وإذا قيل لهم اتبعوا ما أنزل الله قالوا بل نتبع ما ألفينا عليه آباءنا"؛ 2:170 تخاطب كفار مكة، 31:21 في سياق حكمة لقمان بنفس الصياغة.', noteEn: 'Identical text: "And when it is said to them, \'Follow what God has revealed,\' they say, \'Rather, we follow what we found our fathers upon\'"; 2:170 addresses the disbelievers of Mecca, 31:21 appears in the context of Luqman\'s wisdom with the same wording.' },
  { ayah1: '2:173', ayah2: '16:115', category: 'lafzi', noteAr: 'تعد كلتاهما المحرمات الأربع نفسها (الميتة والدم ولحم الخنزير وما أهل لغير الله به) مع استثناء الضرورة نفسه؛ الفرق الوحيد في ترتيب الكلمات: 2:173 تقول "ما أهل به لغير الله"، 16:115 تقول "ما أهل لغير الله به".', noteEn: 'Both list the same four prohibitions (carrion, blood, pork, and what is dedicated to other than God) with the same necessity exception; the only difference is word order: 2:173 says "what has been dedicated to other than God" while 16:115 says "what has been dedicated to other than God" (reversing the prepositional phrase).' },
  { ayah1: '2:197', ayah2: '3:97', category: 'lafzi', noteAr: 'تختم كلتاهما مقطعي الحج بالعبارة نفسها "والله غني عن العالمين" — 2:197 في سياق أشهر الحج، 3:97 بعد "ولله على الناس حج البيت".', noteEn: 'Both conclude their passages on pilgrimage with the same phrase "and God is free from need of the worlds" — 2:197 in the context of the months of Hajj, 3:97 after "and to God is due from the people the pilgrimage to the House."' },
  { ayah1: '2:233', ayah2: '65:6', category: 'word_swap', noteAr: 'تتناول 2:233 و65:6 الرضاعة والحضانة وحقوق الوالدين بعد الانفصال بلغة قانونية متشابهة — النص الأساسي في البقرة والنظير في الطلاق يشتركان في كثير من المفردات.', noteEn: '2:233 and 65:6 address breastfeeding, custody, and parental rights after separation in similar legal language — the foundational text in al-Baqarah and its counterpart in al-Talaq share much of the same vocabulary.' },
  { ayah1: '2:242', ayah2: '3:103', category: 'ending_variation', noteAr: 'تستخدم كلتاهما "كذلك يبين الله لكم آياته" لكن 2:242 تختم بـ"تعقلون" و3:103 تختم بـ"تهتدون".', noteEn: 'Both use "Thus God makes clear to you His verses" but 2:242 ends with "that you might understand" and 3:103 ends with "that you might be guided."' },
  { ayah1: '2:243', ayah2: '40:61', category: 'lafzi', noteAr: 'نص متطابق: "إن الله لذو فضل على الناس ولكن أكثر الناس لا يشكرون"؛ 2:243 بعد قصة الذين خرجوا من ديارهم حذر الموت، 40:61 بعد تعداد نعم الله الكونية.', noteEn: 'Identical text: "Indeed God is full of bounty to people, but most people do not give thanks"; 2:243 follows the story of those who left their homes in fear of death, 40:61 follows an enumeration of God\'s cosmic blessings.' },
  { ayah1: '2:255', ayah2: '3:2', category: 'lafzi', noteAr: 'تبدآن كلتاهما بـ"الله لا إله إلا هو الحي القيوم" — إعلان صفة إلهية متطابق حرفيًّا.', noteEn: 'Both begin with "God, there is no deity except Him, the Ever-Living, the Self-Sustaining" — an identical verbatim declaration of divine attributes.' },
  { ayah1: '2:255', ayah2: '20:111', category: 'lafzi', noteAr: 'تحتوي كلتاهما على "الحي القيوم" كاسمين إلهيين مقترنين لكن في سياقين مختلفين — آية الكرسي مقابل يوم القيامة.', noteEn: 'Both contain "the Ever-Living, the Self-Sustaining" as paired divine names but in different contexts — the Throne Verse versus the Day of Resurrection.' },
  { ayah1: '2:262', ayah2: '2:277', category: 'lafzi', noteAr: 'نص متطابق داخل البقرة: "لهم أجرهم عند ربهم ولا خوف عليهم ولا هم يحزنون"؛ 2:262 ثواب المنفقين الذين لا يتبعون صدقاتهم منًّا وأذى، 2:277 ثواب عام للمؤمنين؛ انظر أيضًا 2:62/2:274 (الدفعة 7).', noteEn: 'Identical text within Al-Baqarah: "They will have their reward with their Lord, and no fear will come upon them, nor will they grieve"; 2:262 is the reward for those who spend without following their charity with reproach or harm, 2:277 is a general reward for the believers; see also 2:62/2:274 (batch 7).' },
  { ayah1: '2:285', ayah2: '2:286', category: 'ending_variation', noteAr: 'آيتا ختام سورة البقرة في نفس المقطع — كلتاهما دعاء لكن تختلفان في الخاتمة: تنتهي 2:285 بـ"وإليك المصير" وتنتهي 2:286 بـ"فانصرنا على القوم الكافرين".', noteEn: 'The closing verses of Surat Al-Baqarah in the same passage — both are supplications but differ in their endings: 2:285 ends with "and to You is the destination" and 2:286 ends with "so grant us victory over the disbelieving people."' },
  { ayah1: '3:2', ayah2: '20:111', category: 'lafzi', noteAr: 'تحتوي كلتاهما على "الحي القيوم" — ثالث تكرار لهذا الاقتران الإلهي في القرآن.', noteEn: 'Both contain "the Ever-Living, the Self-Sustaining" — the third occurrence of this divine pairing in the Quran.' },
  { ayah1: '3:3', ayah2: '5:48', category: 'addition_omission', noteAr: 'تصف كلتاهما القرآن بأنه "مصدقًا لما بين يديه" لكن 5:48 تزيد "ومهيمنًا عليه" وهي غائبة عن 3:3.', noteEn: 'Both describe the Quran as "confirming what came before it" but 5:48 adds "and a guardian over it," which is absent from 3:3.' },
  { ayah1: '3:8', ayah2: '3:9', category: 'ending_variation', noteAr: 'دعاءان متتاليان "ربنا" في آل عمران — تنتهي 3:8 بـ"إنك أنت الوهاب" وتنتهي 3:9 بـ"إن الله لا يخلف الميعاد" — الدعاءان يتبعان بعضهما وخاتمتاهما سهل الخلط بينهما.', noteEn: 'Two consecutive supplications beginning with "Our Lord" in Ale-Imran — 3:8 ends with "Indeed, You are the Bestower" and 3:9 ends with "Indeed, Allah does not break His promise" — the two supplications follow one another and their endings are easily confused.' },
  { ayah1: '3:10', ayah2: '3:116', category: 'lafzi', noteAr: 'افتتاح متقارب داخل السورة نفسها: "إن الذين كفروا لن تغني عنهم أموالهم ولا أولادهم من الله شيئًا"؛ تنتهي 3:10 بـ"وقود النار"، وتنتهي 3:116 بـ"أصحاب النار هم فيها خالدون".', noteEn: 'Similar opening within the same surah: "Indeed, those who disbelieve — never will their wealth nor their children avail them against Allah at all"; 3:10 ends with "fuel for the Fire," and 3:116 ends with "companions of the Fire, they will abide therein forever."' },
  { ayah1: '3:41', ayah2: '19:10', category: 'lafzi', noteAr: 'تسجل كلتاهما طلب زكريا لآلة والرد الإلهي نفسه: "آيتك ألا تكلم الناس ثلاثة أيام"؛ تزيد 3:41 "إلا رمزًا"، وتحدد 19:10 "ثلاث ليال سويا".', noteEn: 'Both record Zakariyya\'s request for a sign and the same divine response: "Your sign is that you will not speak to the people for three days"; 3:41 adds "except by gesture," and 19:10 specifies "three whole nights."' },
  { ayah1: '3:44', ayah2: '12:102', category: 'lafzi', noteAr: 'تستخدم كلتاهما صيغة "أنباء الغيب": "ذلك من أنباء الغيب نوحيه إليك وما كنت لديهم إذ..."؛ 3:44 بعد قصة مريم وزكريا، 12:102 بعد قصة يوسف.', noteEn: 'Both use the phrase "news of the unseen": "That is from the news of the unseen which We reveal to you, and you were not with them when..."; 3:44 follows the story of Maryam and Zakariyya, 12:102 follows the story of Yusuf.' },
  { ayah1: '3:47', ayah2: '19:35', category: 'word_swap', noteAr: 'تحتوي كلتاهما على الأمر الإلهي "كن فيكون" في سياق الخلق المعجز لكن تختلفان في أدوات الربط وبنية العبارة المحيطة.', noteEn: 'Both contain the divine command "Be, and it is" in the context of miraculous creation but differ in the connecting particles and the surrounding phrase structure.' },
  { ayah1: '3:49', ayah2: '5:110', category: 'pronoun_shift', noteAr: 'تعدد كلتاهما معجزات عيسى بلغة متقاربة جدًّا لكن 3:49 تستخدم "فيه" (ضمير مذكر للطائر) بينما 5:110 تستخدم "فيها" (مؤنث).', noteEn: 'Both enumerate the miracles of \'Isa in very similar language, but 3:49 uses "feehi" (masculine pronoun for the bird) while 5:110 uses "feeha" (feminine).' },
  { ayah1: '3:89', ayah2: '24:5', category: 'lafzi', noteAr: 'عبارة استثناء متطابقة: "إلا الذين تابوا من بعد ذلك وأصلحوا فإن الله غفور رحيم"؛ 3:89 بعد ذم المرتدين، 24:5 بعد حد القذف.', noteEn: 'Identical exception clause: "Except for those who repent after that and reform — then indeed Allah is Forgiving and Merciful"; 3:89 follows the condemnation of apostates, 24:5 follows the punishment for slander.' },
  { ayah1: '3:103', ayah2: '5:89', category: 'ending_variation', noteAr: 'تستخدم كلتاهما "كذلك يبين الله لكم آياته" لكن 3:103 تختم بـ"تهتدون" و5:89 تختم بـ"تشكرون".', noteEn: 'Both use "Thus does Allah make clear to you His verses" but 3:103 ends with "that you may be guided" and 5:89 ends with "that you may be grateful."' },
  { ayah1: '3:126', ayah2: '8:10', category: 'word_swap', noteAr: 'تؤكد كلتاهما للمؤمنين أن النصر من عند الله فقط وتختمان بـ"عزيز حكيم" لكن تختلفان في الضمير وبنية العبارة السابقة.', noteEn: 'Both assure the believers that victory is only from Allah and both end with "Almighty, Wise" but differ in the pronoun and the preceding phrase structure.' },
  { ayah1: '3:164', ayah2: '62:2', category: 'lafzi', noteAr: 'تصف كلتاهما رسالة النبي بالأفعال الأربعة نفسها: يتلو الآيات ويزكي ويعلم الكتاب والحكمة؛ 3:164 تصوغها كمنة على المؤمنين، 62:2 تصوغها كبعثة في الأميين.', noteEn: 'Both describe the Prophet\'s mission with the same four actions: reciting the verses, purifying, teaching the Book and wisdom; 3:164 presents it as a favor upon the believers, 62:2 presents it as a mission to the unlettered.' },
  { ayah1: '3:191', ayah2: '3:192', category: 'ending_variation', noteAr: 'دعاءان متتاليان "ربنا" في ختام آل عمران — تنتهي 3:191 بـ"فقنا عذاب النار" وتنتهي 3:192 بـ"وما للظالمين من أنصار" — دعاءان قصيران متعاقبان تخليط خواتيمهما شائع في الحفظ.', noteEn: 'Two consecutive supplications beginning with "Our Lord" at the end of Ale-Imran — 3:191 ends with "so protect us from the punishment of the Fire" and 3:192 ends with "and for the wrongdoers there are no helpers" — two short successive supplications whose endings are commonly confused in memorization.' },
  { ayah1: '4:13', ayah2: '4:14', category: 'ending_variation', noteAr: 'آيتان متتاليتان متضادتان — تنتهي 4:13 بـ"وذلك الفوز العظيم" لمن يطيعون الله وتنتهي 4:14 بـ"وله عذاب مهين" لمن يعصون — بنية متوازية بنتائج متعاكسة.', noteEn: 'Two consecutive contrasting verses — 4:13 ends with "and that is the great attainment" for those who obey Allah, and 4:14 ends with "and for him is a humiliating punishment" for those who disobey — parallel structure with opposite outcomes.' },
  { ayah1: '4:13', ayah2: '48:17', category: 'lafzi', noteAr: 'تحتوي كلتاهما على "من يطع الله ورسوله يدخله جنات تجري من تحتها الأنهار"؛ 4:13 بعد حدود المواريث، 48:17 بعد إعفاء ذوي الأعذار من الجهاد.', noteEn: 'Both contain "Whoever obeys Allah and His Messenger, He will admit him to gardens beneath which rivers flow"; 4:13 follows the inheritance rulings, 48:17 follows the exemption of those with excuses from jihad.' },
  { ayah1: '4:36', ayah2: '17:23', category: 'order_change', noteAr: 'تأمر كلتاهما بعبادة الله وحده والإحسان إلى الوالدين — تقول 4:36 "اعبدوا الله ولا تشركوا به شيئًا وبالوالدين إحسانًا" بينما تقول 17:23 "ألا تعبدوا إلا إياه وبالوالدين إحسانًا" ببناء مختلف.', noteEn: 'Both command worshiping Allah alone and kindness to parents — 4:36 says "Worship Allah and do not associate anything with Him, and to parents show kindness" while 17:23 says "Do not worship except Him, and to parents show kindness" with a different construction.' },
  { ayah1: '4:43', ayah2: '5:6', category: 'lafzi', noteAr: 'تحتوي كلتاهما على حكم التيمم للمسافر أو المريض أو فاقد الطهور؛ 4:43 هي الذكر الأقصر السابق المتعلق بالصلاة مع الجنابة، 5:6 هي آية الوضوء الكاملة مع التيمم.', noteEn: 'Both contain the ruling on dry ablution (tayammum) for the traveler, the ill, or one who lacks water for purification; 4:43 is the earlier, shorter mention related to prayer in a state of major impurity, 5:6 is the complete verse on ablution including tayammum.' },
  { ayah1: '4:48', ayah2: '4:116', category: 'lafzi', noteAr: 'تنص كلتاهما على أن الله لا يغفر أن يشرك به ويغفر ما دون ذلك لمن يشاء. المشرك في 4:48 قد افترى إثمًا عظيمًا؛ وفي 4:116 قد ضل ضلالًا بعيدًا.', noteEn: 'Both state that Allah does not forgive association with Him and forgives what is less than that for whom He wills. The one who associates partners with Allah in 4:48 has invented a tremendous sin; in 4:116 they have gone far astray.' },
  { ayah1: '4:57', ayah2: '4:122', category: 'lafzi', noteAr: 'افتتاح متقارب داخل سورة النساء: "والذين آمنوا وعملوا الصالحات سندخلهم جنات تجري من تحتها الأنهار خالدين فيها أبدًا"؛ تزيد 4:57 أزواجًا مطهرة وظلا، وتزيد 4:122 "وعد الله حقًا".', noteEn: 'Similar opening within Surat An-Nisa: "But those who believe and do righteous deeds — We will admit them to gardens beneath which rivers flow, abiding therein forever"; 4:57 adds purified spouses and shade, 4:122 adds "a promise of Allah, true."' },
{ ayah1: '4:61', ayah2: '5:104', category: 'lafzi', noteAr: 'كلاهما يشترك في النداء: \'وَإِذَا قِيلَ لَهُمْ تَعَالَوْا إِلَىٰ مَا أَنزَلَ اللَّهُ وَإِلَى الرَّسُولِ\'؛ 4:61 تخص المنافقين الذين يعرضون حين يُدْعَوْن إلى حكم الله، و5:104 تخص المشركين الذين يتشبثون بما وجدوا عليه آباءهم.', noteEn: 'Both share the call: \'And when it is said to them, "Come to what Allah has revealed and to the Messenger"\'; 4:61 concerns the hypocrites who turn away when called to Allah\'s judgment, and 5:104 concerns the polytheists who cling to what they found their fathers upon.' },
  { ayah1: '4:135', ayah2: '5:8', category: 'order_change', noteAr: 'كلاهما يأمر بالقيام بالقسط شهداء لله، لكن 4:135 تقول \'قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ\' بينما 5:8 تعكس الترتيب إلى \'قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ\'.', noteEn: 'Both command being steadfast in justice as witnesses for Allah, but 4:135 says \'persistent in justice, witnesses for Allah\' while 5:8 reverses the order to \'persistent for Allah, witnesses in justice.\'' },
  { ayah1: '5:3', ayah2: '16:115', category: 'lafzi', noteAr: 'كلاهما يشترك في قائمة المحرمات الأساسية (الميتة والدم ولحم الخنزير وما أُهِلَّ لغير الله به)؛ انظر أيضًا 2:173/16:115 (الدفعة 4) و6:145/16:115 (الدفعة 7) -- 5:3 هي النسخة الأوسع التي تزيد المنخنقة والموقوذة والمتردية، و16:115 هي الصيغة الأقصر المعتادة.', noteEn: 'Both share the list of basic prohibitions (carrion, blood, pork, and what has been dedicated to other than Allah); see also 2:173/16:115 (batch 4) and 6:145/16:115 (batch 7) — 5:3 is the broader version that adds the strangled, beaten, and fallen animals, and 16:115 is the usual shorter formulation.' },
  { ayah1: '5:17', ayah2: '5:72', category: 'lafzi', noteAr: 'تكاد تكون متطابقة في الرد داخل السورة نفسها: \'لَقَدْ كَفَرَ الَّذِينَ قَالُوا إِنَّ اللَّهَ هُوَ الْمَسِيحُ ابْنُ مَرْيَمَ\'؛ 5:17 هي الرد الأوسع، و5:72 هي تحديدًا الرد على الموقف النصراني من المسيح.', noteEn: 'Nearly identical rebuttal within the same surah: \'They have certainly disbelieved who say that Allah is the Messiah, the son of Maryam\'; 5:17 is the broader rebuttal, and 5:72 is specifically the response to the Christian stance on the Messiah.' },
  { ayah1: '5:64', ayah2: '5:68', category: 'lafzi', noteAr: 'نص حرفي في سورة المائدة: \'لَيَزِيدَنَّ كَثِيرًا مِّنْهُمْ طُغْيَانًا وَكُفْرًا ۚ مَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ\'؛ 5:64 ترد على قول اليهود إن يد الله مغلولة، و5:68 ترد على زعم أن أهل الكتاب ليسوا على شيء حتى يقيموا التوراة والإنجيل.', noteEn: 'Literal text in Surat Al-Ma\'idah: \'It will surely increase many of them in transgression and disbelief. What has been sent down to you from your Lord\'; 5:64 responds to the Jews\' claim that Allah\'s hand is tied, and 5:68 responds to the claim that the People of the Scripture are not upon anything until they establish the Torah and the Gospel.' },
  { ayah1: '5:119', ayah2: '98:8', category: 'lafzi', noteAr: 'كلاهما يشترك في: \'جَنَّاتٌ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا ۚ رَضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ\'؛ 5:119 هي كلمة الصادقين (عيسى عليه السلام)، 98:8 هي ثواب المؤمنين من أهل الكتاب.', noteEn: 'Both share: \'Gardens beneath which rivers flow, abiding therein forever. Allah is pleased with them and they are pleased with Him\'; 5:119 is the declaration of the truthful (Jesus, peace be upon him), 98:8 is the reward of the believers among the People of the Scripture.' },
  { ayah1: '6:4', ayah2: '36:46', category: 'lafzi', noteAr: 'نص حرفي: \'وَمَا تَأْتِيهِم مِّنْ آيَةٍ مِّنْ آيَاتِ رَبِّهِمْ إِلَّا كَانُوا عَنْهَا مُعْرِضِينَ\'؛ 6:4 في الأنعام تصف كفار مكة، 36:46 تكرر العبارة نفسها في يس.', noteEn: 'Literal text: \'And no sign comes to them from the signs of their Lord except that they turn away from it\'; 6:4 in Al-An\'am describes the disbelievers of Mecca, 36:46 repeats the same phrase in Ya-Sin.' },
  { ayah1: '6:10', ayah2: '21:41', category: 'lafzi', noteAr: 'آية متطابقة: لقد استُهزئ برسل من قبلك، وأحاط بالمستهزئين ما كانوا به يستهزئون.', noteEn: 'Identical verse: Messengers before you were mocked, and those who mocked were encompassed by what they used to ridicule.' },
  { ayah1: '6:17', ayah2: '10:107', category: 'lafzi', noteAr: 'نص حرفي: \'وَإِن يَمْسَسْكَ اللَّهُ بِضُرٍّ فَلَا كَاشِفَ لَهُ إِلَّا هُوَ ۖ وَإِن يُرِدْكَ بِخَيْرٍ فَلَا رَادَّ لِفَضْلِهِ\'؛ 6:17 في سياق الحجة التوحيدية، 10:107 تختتم مقطعًا عن التوكل على الله.', noteEn: 'Literal text: \'And if Allah touches you with harm, there is no remover of it except Him, and if He intends good for you, there is no repeller of His bounty\'; 6:17 is in the context of the monotheistic argument, 10:107 concludes a passage about reliance on Allah.' },
  { ayah1: '6:21', ayah2: '10:17', category: 'lafzi', noteAr: 'تكاد تكون متطابقة: من أظلم ممن افترى على الله كذبًا أو كذَّب بآياته؟ 6:21 (وَمَنْ) تنتهي بِـ\'الظَّالِمُونَ\'؛ 10:17 (فَمَنْ) تنتهي بِـ\'الْمُجْرِمُونَ\'.', noteEn: 'Nearly identical: Who is more unjust than one who invents a lie about Allah or denies His verses? 6:21 (wa-man) ends with \'the wrongdoers\'; 10:17 (fa-man) ends with \'the criminals.\'' },
  { ayah1: '6:30', ayah2: '46:34', category: 'lafzi', noteAr: 'كلاهما يصور مشهدًا أشبه بالمحكمة: \'أَلَيْسَ هَٰذَا بِالْحَقِّ ۖ قَالُوا بَلَىٰ وَرَبِّنَا ۖ قَالَ فَذُوقُوا الْعَذَابَ بِمَا كُنتُمْ تَكْفُرُونَ\'؛ 6:30 عند البعث، 46:34 موجهة لمن أنكروا القرآن.', noteEn: 'Both depict a courtroom-like scene: \'Is this not the truth?\' They will say, \'Yes, by our Lord.\' He will say, \'Then taste the punishment for what you used to deny\'; 6:30 at the resurrection, 46:34 addressed to those who denied the Quran.' },
  { ayah1: '6:50', ayah2: '11:31', category: 'addition_omission', noteAr: 'كلاهما فيه إعلان النبي: \'لَا أَقُولُ لَكُمْ عِندِي خَزَائِنُ اللَّهِ وَلَا أَعْلَمُ الْغَيْبَ وَلَا أَقُولُ لَكُمْ إِنِّي مَلَكٌ\' لكن 6:50 تزيد \'لَكُمْ\' في \'وَلَا أَقُولُ لَكُمْ إِنِّي مَلَكٌ\' بينما 11:31 تحذفها.', noteEn: 'Both contain the Prophet\'s declaration: \'I do not say to you that I possess the treasures of Allah, nor do I know the unseen, nor do I say to you that I am an angel\' but 6:50 includes \'to you\' in \'nor do I say to you that I am an angel\' while 11:31 omits it.' },
  { ayah1: '6:56', ayah2: '40:66', category: 'lafzi', noteAr: 'كلاهما إعلان النبي: \'إِنِّي نُهِيتُ أَنْ أَعْبُدَ الَّذِينَ تَدْعُونَ مِن دُونِ اللَّهِ\'؛ 6:56 رفض مباشر لآلهة مكة، 40:66 تزيد \'لَمَّا جَاءَنِيَ الْبَيِّنَاتُ مِن رَّبِّي\'.', noteEn: 'Both are the Prophet\'s declaration: \'Indeed, I have been forbidden to worship those you invoke besides Allah\'; 6:56 is a direct rejection of the gods of Mecca, 40:66 adds \'when the clear proofs came to me from my Lord.\'' },
  { ayah1: '6:143', ayah2: '6:144', category: 'lafzi', noteAr: 'آيتان متتاليتان في الأنعام تطبقان نفس التحدي البلاغي -- \'آلذَّكَرَيْنِ حَرَّمَ أَمِ الْأُنثَيَيْنِ أَمَّا اشْتَمَلَتْ عَلَيْهِ أَرْحَامُ الْأُنثَيَيْنِ\' -- الأولى على الضأن والمعز (6:143) ثم على الإبل والبقر (6:144).', noteEn: 'Two consecutive verses in Al-An\'am applying the same rhetorical challenge — \'Is it the two males He has forbidden or the two females, or what the wombs of the two females contain?\' — the first on sheep and goats (6:143), then on camels and cattle (6:144).' },
  { ayah1: '6:145', ayah2: '16:115', category: 'lafzi', noteAr: 'كلاهما يشترك في رخصة الاضطرار لنفس قائمة المحرمات؛ انظر أيضًا 2:173/16:115 (الدفعة 4) -- 6:145 تقدّم القائمة كرد على \'مَا حَرَّمَ اللَّهُ عَلَيْكُمْ\'، و16:115 هي إعادة الصياغة المباشرة.', noteEn: 'Both share the concession of necessity for the same list of prohibitions; see also 2:173/16:115 (batch 4) — 6:145 presents the list as a response to \'What has Allah forbidden to you,\' and 16:115 is its direct reformulation.' },
  { ayah1: '6:151', ayah2: '17:31', category: 'word_swap', noteAr: 'سبق فهرستها — يلاحظ هذا الزوج أن 17:31 تزيد \'خَشْيَةَ إِمْلَاقٍ\' بينما 6:151 تقول \'مِنْ إِمْلَاقٍ\'، مما يعكس التركيز على زمن الفقر.', noteEn: 'Previously indexed — this pair notes that 17:31 adds \'خَشْيَةَ إِمْلَاقٍ\' (fear of poverty) while 6:151 says \'مِنْ إِمْلَاقٍ\' (from poverty), reflecting a difference in the temporal emphasis on poverty.' },
  { ayah1: '6:152', ayah2: '17:34', category: 'lafzi', noteAr: 'كلاهما يحتوي على \'وَلَا تَقْرَبُوا مَالَ الْيَتِيمِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ حَتَّىٰ يَبْلُغَ أَشُدَّهُ\'؛ 6:152 ترد في قائمة الوصايا العشر في ختام الأنعام، 17:34 وصية مستقلة بنفس الصياغة.', noteEn: 'Both contain: \'Do not approach the orphan\'s property except in the best manner until he reaches maturity\'; 6:152 appears in the list of ten commandments at the conclusion of al-An\'am, 17:34 is an independent commandment with the same wording.' },
  { ayah1: '6:164', ayah2: '39:7', category: 'lafzi', noteAr: 'كلاهما يحتوي على \'وَلَا تَزِرُ وَازِرَةٌ وِزْرَ أُخْرَىٰ ۚ ثُمَّ إِلَىٰ رَبِّكُم مَّرْجِعُكُمْ فَيُنَبِّئُكُم بِمَا كُنتُمْ تَعْمَلُونَ\'؛ 6:164 تختتم الأوامر الأخلاقية في السورة، 39:7 ضمن خطاب عن الشكر.', noteEn: 'Both contain: \'No bearer of burdens will bear the burden of another. Then to your Lord is your return, and He will inform you of what you used to do\'; 6:164 concludes the moral commands in the surah, 39:7 is within a discourse on gratitude.' },
  { ayah1: '7:12', ayah2: '38:76', category: 'lafzi', noteAr: 'نص حرفي لتكبر إبليس: \'قَالَ أَنَا خَيْرٌ مِّنْهُ ۖ خَلَقْتَنِي مِن نَّارٍ وَخَلَقْتَهُ مِن طِينٍ\'؛ 7:12 في قصة السجود في الأعراف، 38:76 تعيد الحوار نفسه في ص.', noteEn: 'Verbatim text of Iblis\'s arrogance: \'He said: I am better than him. You created me from fire and created him from clay\'; 7:12 in the prostration story in al-A\'raf, 38:76 repeats the same dialogue in Sad.' },
  { ayah1: '7:37', ayah2: '10:17', category: 'lafzi', noteAr: 'سؤال بلاغي حرفي: \'مَنْ أَظْلَمُ مِمَّنِ افْتَرَىٰ عَلَى اللَّهِ كَذِبًا أَوْ كَذَّبَ بِآيَاتِهِ\'؛ 7:37 تذم الذين كذبوا الرسل، 10:17 ترد على اتهام النبي بافتراء القرآن.', noteEn: 'Verbatim rhetorical question: \'Who is more unjust than one who invents a lie against Allah or denies His verses\'; 7:37 rebukes those who denied the messengers, 10:17 responds to the accusation that the Prophet fabricated the Quran.' },
  { ayah1: '7:40', ayah2: '7:41', category: 'ending_variation', noteAr: 'آيتان متتاليتان للعقاب لمن كذبوا بالآيات — 7:40 تنتهي بِـ\'وَكَذَٰلِكَ نَجْزِي الْمُجْرِمِينَ\' و7:41 تنتهي بِـ\'وَكَذَٰلِكَ نَجْزِي الظَّالِمِينَ\' — فرق كلمة واحدة في خاتمتي آيتين متتاليتين.', noteEn: 'Two consecutive verses of punishment for those who deny the signs — 7:40 ends with \'وَكَذَٰلِكَ نَجْزِي الْمُجْرِمِينَ\' (Thus do We recompense the criminals) and 7:41 ends with \'وَكَذَٰلِكَ نَجْزِي الظَّالِمِينَ\' (Thus do We recompense the wrongdoers) — a one-word difference in the endings of two consecutive verses.' },
  { ayah1: '7:45', ayah2: '11:19', category: 'lafzi', noteAr: 'وصف مشترك: \'الَّذِينَ يَصُدُّونَ عَن سَبِيلِ اللَّهِ وَيَبْغُونَهَا عِوَجًا وَهُم بِالْآخِرَةِ كَافِرُونَ\'؛ 7:45 تضعهم في مشهد النار، 11:19 تقدّمهم كمن يعرضون عن رحمة الله.', noteEn: 'Shared description: \'Those who turn away from the path of Allah and seek to make it crooked while they are disbelievers in the Hereafter\'; 7:45 places them in the scene of Hell, 11:19 presents them as those who turn away from Allah\'s mercy.' },
  { ayah1: '7:54', ayah2: '10:3', category: 'lafzi', noteAr: 'كلاهما يفتتح بخلق الله السماوات والأرض في ستة أيام ثم الاستواء على العرش. 7:54 تتابع بأن الليل يغشى النهار يطلبه حثيثًا؛ 10:3 تتابع بِـ\'يُدَبِّرُ الْأَمْرَ\'.', noteEn: 'Both begin with Allah\'s creation of the heavens and earth in six days, then His establishment over the Throne. 7:54 continues with the night covering the day, pursuing it rapidly; 10:3 continues with \'He arranges every matter.\'' },
  { ayah1: '7:54', ayah2: '57:4', category: 'lafzi', noteAr: 'كلاهما يفتتح بِـ\'الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ\'؛ انظر أيضًا زوج 10:3/57:4 وزوج 25:59/32:4 (الدفعة 4) للمجموعة الأوسع من صيغ الخلق هذه.', noteEn: 'Both begin with: \'Who created the heavens and the earth in six days, then established Himself over the Throne\'; see also the pair 10:3/57:4 and the pair 25:59/32:4 (batch 4) for the broader set of these creation formulations.' },
  { ayah1: '7:63', ayah2: '7:69', category: 'lafzi', noteAr: 'قصتان متتاليتان في الأعراف تشتركان في صيغة تعجب القوم: \'أَوَعَجِبْتُمْ أَن جَاءَكُمْ ذِكْرٌ مِّن رَّبِّكُمْ عَلَىٰ رَجُلٍ مِّنكُمْ لِيُنذِرَكُمْ\'؛ 7:63 رد نوح على قومه، 7:69 رد هود.', noteEn: 'Two consecutive stories in al-A\'raf sharing a formula of the people\'s astonishment: \'Is it a wonder to you that a reminder has come to you from your Lord through a man from among you to warn you\'; 7:63 is Noah\'s reply to his people, 7:69 is Hud\'s reply.' },
  { ayah1: '7:65', ayah2: '11:50', category: 'lafzi', noteAr: 'كلاهما يروي دعوة هود لعاد ليعبدوا الله وحده. 7:65 تختم بِـ\'أَفَلَا تَتَّقُونَ\'؛ 11:50 تختم بِـ\'إِنْ أَنتُمْ إِلَّا مُفْتَرُونَ\'.', noteEn: 'Both relate Hud\'s call to \'Ad to worship Allah alone. 7:65 ends with \'أَفَلَا تَتَّقُونَ\' (Will you not then fear Allah); 11:50 ends with \'إِنْ أَنتُمْ إِلَّا مُفْتَرُونَ\' (You are but fabricators [of lies]).' },
  { ayah1: '7:73', ayah2: '7:85', category: 'lafzi', noteAr: 'صالح (لثمود) وشعيب (لمدين) كلاهما يفتتحان بنفس الدعوة: اعبدوا الله وحده، قد جاءتكم بينة من ربكم. كل منهما يستمر بمضمون خاص بنبيه.', noteEn: 'Salih (to Thamud) and Shu\'ayb (to Madyan) both open with the same call: Worship Allah alone, a clear proof has come to you from your Lord. Each then continues with content specific to his prophet.' },
  { ayah1: '7:73', ayah2: '11:61', category: 'lafzi', noteAr: 'كلاهما يقدّم صالحًا مرسلًا إلى ثمود بنفس الافتتاحية الداعية لعبادة الله وحده؛ 7:73 تتابع بالناقة آية، 11:61 تتابع بِـ\'هُوَ أَنشَأَكُم مِّنَ الْأَرْضِ وَاسْتَعْمَرَكُمْ فِيهَا\'.', noteEn: 'Both present Salih sent to Thamud with the same opening calling to worship Allah alone; 7:73 continues with the she-camel as a sign, 11:61 continues with \'He produced you from the earth and settled you in it.\'' },
  { ayah1: '7:73', ayah2: '11:64', category: 'lafzi', noteAr: 'كلاهما يحذر ثمود من ناقة الله آية لهم. 7:73 تتوعد بِـ\'عَذَابٌ أَلِيمٌ\'؛ 11:64 تتوعد بِـ\'عَذَابٌ قَرِيبٌ\'.', noteEn: 'Both warn Thamud about Allah\'s she-camel as a sign for them. 7:73 threatens with \'a painful punishment\'; 11:64 threatens with \'a near punishment.\'' },
  { ayah1: '7:78', ayah2: '7:91', category: 'lafzi', noteAr: 'صيغة الهلاك بالرجفة: \'فَأَخَذَتْهُمُ الرَّجْفَةُ فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ\'؛ 7:78 مصير ثمود بعد تكذيب صالح، 7:91 نفس مصير مدين بعد تكذيب شعيب.', noteEn: 'Destruction formula with the tremor: \'So the tremor seized them, and they became within their homes [fallen] kneeling\'; 7:78 is the fate of Thamud after denying Salih, 7:91 is the same fate of Madyan after denying Shu\'ayb.' },
  { ayah1: '7:78', ayah2: '29:37', category: 'lafzi', noteAr: 'صيغة الهلاك بالرجفة: \'فَأَخَذَتْهُمُ الرَّجْفَةُ فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ\'؛ 7:78 ثمود/صالح، 29:37 مدين/شعيب؛ انظر أيضًا 7:91/29:37 و7:78/7:91 (الدفعة 6).', noteEn: 'Destruction formula with the tremor: \'So the tremor seized them, and they became within their homes [fallen] kneeling\'; 7:78 Thamud/Salih, 29:37 Madyan/Shu\'ayb; see also 7:91/29:37 and 7:78/7:91 (batch 6).' },
  { ayah1: '7:81', ayah2: '27:55', category: 'ending_variation', noteAr: 'كلاهما يصف قوم لوط يأتون الرجال شهوة لكن 7:81 تنتهي بِـ\'مُسْرِفُونَ\' بينما 27:55 تنتهي بِـ\'تَجْهَلُونَ\'.', noteEn: 'Both describe Lot\'s people approaching men with desire, but 7:81 ends with \'مُسْرِفُونَ\' (transgressors) while 27:55 ends with \'تَجْهَلُونَ\' (ignorant people).' },
  { ayah1: '7:85', ayah2: '11:84', category: 'lafzi', noteAr: 'كلاهما يقدّم شعيبًا مرسلًا إلى مدين بنفس الدعوة لعبادة الله وحده؛ 7:85 تتابع بالأمر بإيفاء الكيل والميزان بالقسط، 11:84 تكرر نفس الوصايا الاقتصادية.', noteEn: 'Both present Shu\'ayb sent to Madyan with the same call to worship Allah alone; 7:85 continues with the command to give full measure and weight in justice, 11:84 repeats the same economic injunctions.' },
  { ayah1: '7:91', ayah2: '29:37', category: 'lafzi', noteAr: 'كلاهما يصف هلاك مدين: 7:91 تستخدم الرجفة لقوم شعيب في الأعراف، 29:37 تستخدم الرجفة أيضًا للحدث نفسه في العنكبوت؛ تكتمل المجموعة الثلاثية مع 7:78/7:91 (الدفعة 6) و7:78/29:37.', noteEn: 'Both describe the destruction of Madyan: 7:91 uses the tremor for Shu\'ayb\'s people in al-A\'raf, 29:37 also uses the tremor for the same event in al-\'Ankabut; the triplet is completed with 7:78/7:91 (batch 6) and 7:78/29:37.' },
  { ayah1: '7:188', ayah2: '10:49', category: 'order_change', noteAr: 'كلاهما يقول النبي فيه إنه لا يملك لنفسه نفعًا ولا ضرًا، لكن 7:188 تقول \'نَفْعًا وَلَا ضَرًّا\' بينما 10:49 تعكس الترتيب إلى \'ضَرًّا وَلَا نَفْعًا\'.', noteEn: 'In both, the Prophet says he does not possess for himself benefit or harm, but 7:188 says \'نَفْعًا وَلَا ضَرًّا\' (benefit nor harm) while 10:49 reverses the order to \'ضَرًّا وَلَا نَفْعًا\' (harm nor benefit).' },
  { ayah1: '9:33', ayah2: '48:28', category: 'lafzi', noteAr: 'كلاهما يفتتح بمهمة النبي لإظهار الدين الحق على الدين كله؛ 9:33 (وكذلك 61:9) تختم بِـ\'وَلَوْ كَرِهَ الْمُشْرِكُونَ\'، بينما 48:28 تختم بِـ\'وَكَفَىٰ بِاللَّهِ شَهِيدًا\' -- نفس المهمة، خاتمة مختلفة.', noteEn: 'Both open with the Prophet\'s mission to make the true religion prevail over all religion; 9:33 (and also 61:9) ends with \'وَلَوْ كَرِهَ الْمُشْرِكُونَ\' (although the polytheists dislike it), while 48:28 ends with \'وَكَفَىٰ بِاللَّهِ شَهِيدًا\' (and sufficient is Allah as a witness) — the same mission, a different ending.' },
  { ayah1: '9:33', ayah2: '61:9', category: 'lafzi', noteAr: 'آية متطابقة عن إرسال الله رسوله بالهدى ودين الحق ليُظهره على الدين كله.', noteEn: 'Identical verse about Allah sending His Messenger with guidance and the religion of truth to make it prevail over all religion.' },
  { ayah1: '9:70', ayah2: '30:9', category: 'lafzi', noteAr: 'كلاهما يشترك في صيغة ظلم الأمم لأنفسها: \'جَاءَتْهُمْ رُسُلُهُم بِالْبَيِّنَاتِ وَمَا كَانَ اللَّهُ لِيَظْلِمَهُمْ وَلَٰكِن كَانُوا أَنفُسَهُمْ يَظْلِمُونَ\'؛ 9:70 في سرد الأمم الهالكة، 30:9 تختتم دعوة السير في الأرض.', noteEn: 'Both share the formula of nations wronging themselves: \'Their messengers came to them with clear proofs, and Allah would not have wronged them, but they were wronging themselves\'; 9:70 in the narrative of destroyed nations, 30:9 concludes the call to travel through the land.' },
  { ayah1: '9:73', ayah2: '66:9', category: 'lafzi', noteAr: 'أمر متطابق للنبي بجهاد الكفار والمنافقين والغلظة عليهم؛ ومأواهم جهنم.', noteEn: 'Identical command to the Prophet to strive against the disbelievers and hypocrites and to be harsh with them; their abode is Hell.' },
  { ayah1: '9:94', ayah2: '62:8', category: 'lafzi', noteAr: 'نص حرفي: \'ثُمَّ تُرَدُّونَ إِلَىٰ عَالِمِ الْغَيْبِ وَالشَّهَادَةِ فَيُنَبِّئُكُم بِمَا كُنتُمْ تَعْمَلُونَ\'؛ 9:94 موجهة للمنافقين الذين تخلّفوا عن تبوك، 62:8 ترد على من يفرّون من الموت.', noteEn: 'Verbatim text: \'Then you will be returned to the Knower of the unseen and the witnessed, and He will inform you of what you used to do\'; 9:94 is directed at the hypocrites who lagged behind from Tabuk, 62:8 responds to those who flee from death.' },
  { ayah1: '9:111', ayah2: '61:10', category: 'word_swap', noteAr: '9:111 \'إِنَّ اللَّهَ اشْتَرَىٰ مِنَ الْمُؤْمِنِينَ أَنفُسَهُمْ وَأَمْوَالَهُم بِأَنَّ لَهُمُ الْجَنَّةَ\' و61:10-11 كلاهما يصفان الصفقة الإلهية: الأنفس والأموال مقابل الجنة — نفس زوج \'أنفس + أموال\' يظهر في كليهما، ولكن بصياغة وسياق مختلفين.', noteEn: '9:111 \'Indeed, Allah has purchased from the believers their lives and their properties in exchange for Paradise\' and 61:10-11 both describe the divine transaction: lives and properties in exchange for Paradise — the same pair of \'lives and properties\' appears in both, but with different wording and context.' },
  { ayah1: '9:114', ayah2: '11:75', category: 'addition_omission', noteAr: 'كلاهما يصف إبراهيم بِـ\'أَوَّاهٌ حَلِيمٌ\' لكن 11:75 تعكس الترتيب إلى \'حَلِيمٌ أَوَّاهٌ\' وتزيد \'مُنِيبٌ\' في النهاية.', noteEn: 'Both describe Abraham as \'أَوَّاهٌ حَلِيمٌ\' (compassionate, forbearing) but 11:75 reverses the order to \'حَلِيمٌ أَوَّاهٌ\' (forbearing, compassionate) and adds \'مُنِيبٌ\' (repentant) at the end.' },
  { ayah1: '10:3', ayah2: '57:4', category: 'lafzi', noteAr: 'كلاهما يفتتح بِـ\'الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ\'؛ انظر أيضًا 7:54/57:4 (هذه الدفعة) و25:59/32:4 (الدفعة 4) للمجموعة الأوسع من صيغ الخلق.', noteEn: 'Both begin with: \'Who created the heavens and the earth in six days, then established Himself over the Throne\'; see also 7:54/57:4 (this batch) and 25:59/32:4 (batch 4) for the broader set of these creation formulations.' },
  { ayah1: '10:24', ayah2: '18:45', category: 'lafzi', noteAr: 'كلاهما يستخدم المثل نفسه: \'مَثَلُ الْحَيَاةِ الدُّنْيَا كَمَاءٍ أَنزَلْنَاهُ مِنَ السَّمَاءِ فَاخْتَلَطَ بِهِ نَبَاتُ الْأَرْضِ\'؛ 10:24 تطور الاستعارة كاملة، 18:45 تقدّم نسخة مختصرة.', noteEn: 'Both use the same parable: \'The example of the worldly life is like water which We sent down from the sky, and the vegetation of the earth mingled with it\'; 10:24 develops the metaphor fully, 18:45 presents an abbreviated version.' },
  { ayah1: '10:38', ayah2: '11:13', category: 'lafzi', noteAr: 'كلاهما يحتوي على التحدي القرآني الختامي: \'وَادْعُوا مَنِ اسْتَطَعْتُم مِّن دُونِ اللَّهِ إِن كُنتُمْ صَادِقِينَ\'؛ 10:38 تتحدى بالإتيان بسورة واحدة مثله، 11:13 تتحدى بالإتيان بعشر سور مفتراة.', noteEn: 'Both contain the concluding Quranic challenge: \'And call upon those you can [for help] besides Allah, if you should be truthful\'; 10:38 challenges to produce one surah like it, 11:13 challenges to produce ten fabricated surahs.' },
  { ayah1: '10:61', ayah2: '34:3', category: 'lafzi', noteAr: 'كلاهما يحتوي على \'وَمَا يَعْزُبُ عَن رَّبِّكَ مِن مِّثْقَالِ ذَرَّةٍ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَلَا أَصْغَرَ مِن ذَٰلِكَ وَلَا أَكْبَرَ إِلَّا فِي كِتَابٍ مُّبِينٍ\'؛ 10:61 تخاطب النبي، 34:3 ترد على إنكار الكفار للساعة.', noteEn: 'Both contain: \'And not absent from your Lord is any [amount] of an atom\'s weight within the earth or within the sky, nor anything smaller than that or larger, except in a clear record\'; 10:61 addresses the Prophet, 34:3 responds to the disbelievers\' denial of the Hour.' },
  { ayah1: '10:93', ayah2: '45:17', category: 'lafzi', noteAr: 'نص حرفي: \'رَبُّكَ لَيَقْضِي بَيْنَهُمْ يَوْمَ الْقِيَامَةِ فِيمَا كَانُوا فِيهِ يَخْتَلِفُونَ\'؛ 10:93 بعد تبوّئ بني إسرائيل في مصر، 45:17 بعد وصف اختلاف بني إسرائيل بعد مجيء البينات.', noteEn: 'Verbatim text: \'Your Lord will surely judge between them on the Day of Resurrection concerning that over which they used to differ\'; 10:93 after the settlement of the Children of Israel in Egypt, 45:17 after describing the Children of Israel\'s disagreement after receiving clear proofs.' },
  { ayah1: '11:28', ayah2: '11:63', category: 'lafzi', noteAr: 'كلاهما يستخدم نفس الافتتاحية النبوية البلاغية في سورة هود: \'أَرَأَيْتُمْ إِن كُنتُ عَلَىٰ بَيِّنَةٍ مِّن رَّبِّي وَآتَانِي...\'؛ 11:28 نوح يخاطب قومه، 11:63 صالح يخاطب قومه -- هذه الصيغة المشتركة تمثل نمطًا متكررًا في الخطاب النبوي.', noteEn: 'Both use the same prophetic rhetorical opening in Surah Hud: \'Say, O my people, have you considered: if I am upon clear evidence from my Lord and He has given me...\'; 11:28 Noah addresses his people, 11:63 Salih addresses his people — this shared formula represents a recurring pattern in prophetic discourse.' },
  { ayah1: '11:40', ayah2: '23:27', category: 'lafzi', noteAr: 'كلاهما يحتوي على أمر تحميل السفينة: \'وَاحْمِلْ فِيهَا مِن كُلٍّ زَوْجَيْنِ اثْنَيْنِ وَأَهْلَكَ إِلَّا مَن سَبَقَ عَلَيْهِ الْقَوْلُ\'؛ 11:40 الأمر المباشر لنوح، 23:27 إعادة سرد الأمر نفسه.', noteEn: 'Both contain the command to load the ark: \'And load therein of every [species] two pairs and your family, except those against whom the word has already proceeded\'; 11:40 is the direct command to Noah, 23:27 is a retelling of the same command.' },
  { ayah1: '11:90', ayah2: '85:14', category: 'lafzi', noteAr: '11:90 \'إِنَّ رَبِّي رَحِيمٌ وَدُودٌ\' و85:14 \'وَهُوَ الْغَفُورُ الْوَدُودُ\' كلاهما يقرنان اسم الله \'الودود\' بصفة أخرى — 11:90 مع \'رَحِيمٌ\' و85:14 مع \'الْغَفُورُ\' — مما يجعل \'الودود\' الكلمة المحورية في كليهما.', noteEn: 'Both pair Allah\'s name \'al-Wadud\' with another attribute — 11:90 with \'Rahim\' and 85:14 with \'al-Ghafur\' — making \'al-Wadud\' the pivot word in both.' },
  { ayah1: '11:107', ayah2: '11:108', category: 'lafzi', noteAr: 'آيتان متتاليتان في سورة هود تشتركان في الصيغة: \'خَالِدِينَ فِيهَا مَا دَامَتِ السَّمَاوَاتُ وَالْأَرْضُ إِلَّا مَا شَاءَ رَبُّكَ\'؛ 11:107 تنطبق على أهل النار، 11:108 تنطبق على أهل الجنة.', noteEn: 'Two consecutive verses in Surat Hud sharing the formula: \'khālidīna fīhā mā dāmati l-samāwātu wal-arḍu illā mā shā\'a rabbuka\'; 11:107 applies to the people of Hell, 11:108 to the people of Paradise.' },
  { ayah1: '11:110', ayah2: '41:45', category: 'lafzi', noteAr: 'تكاد تكون متطابقة: لقد آتينا موسى الكتاب فاختُلف فيه، ولولا كلمة سبقت من ربك لقُضي بينهم. تختلفان فقط في علامة الوقف بعد الجملة الأولى.', noteEn: 'Nearly identical: We gave Moses the Scripture and differences arose over it, and had a word not preceded from your Lord, it would have been decided between them. They differ only in the stop mark after the first sentence.' },
  { ayah1: '12:22', ayah2: '28:14', category: 'lafzi', noteAr: 'صيغة متطابقة لنبيين بلغا أشدهما: \'آتَيْنَاهُ حُكْمًا وَعِلْمًا ۚ وَكَذَٰلِكَ نَجْزِي الْمُحْسِنِينَ\'؛ 12:22 يوسف، 28:14 موسى.', noteEn: 'Identical wording for two prophets who reached their maturity: \'ātaynāhu ḥukman wa-\'ilman wa-kadhālika najzī l-muḥsinīn\'; 12:22 refers to Joseph, 28:14 to Moses.' },
  { ayah1: '12:40', ayah2: '53:23', category: 'lafzi', noteAr: 'كلاهما يرفض الآلهة الباطلة بِـ\'مَا هِيَ إِلَّا أَسْمَاءٌ سَمَّيْتُمُوهَا أَنتُمْ وَآبَاؤُكُم مَّا أَنزَلَ اللَّهُ بِهَا مِن سُلْطَانٍ\'؛ 12:40 حجة يوسف لصاحبي السجن، 53:23 تخاطب الآلهة الوثنية اللات والعزى ومناة.', noteEn: 'Both reject false gods with: \'mā hiya illā asmā\'un sammaytumūhā antum wa-ābā\'ukum mā anzala llāhu bihā min sulṭān\'; 12:40 is Joseph\'s argument to his two prison companions, 53:23 addresses the pagan idols al-Lat, al-Uzza, and Manat.' },
  { ayah1: '12:43', ayah2: '12:46', category: 'lafzi', noteAr: 'رؤيا الملك (سبع بقرات سمان يأكلهن سبع عجاف، وسبع سنبلات خضر وأخر يابسات) وردت حرفيًا في 12:43 ثم تكررت كلمة بكلمة في 12:46 عندما يطلب الوزير تفسيرها من يوسف.', noteEn: 'The king\'s dream (seven fat cows eaten by seven lean ones, and seven green ears of grain and others dry) is narrated verbatim in 12:43 and repeated word-for-word in 12:46 when the minister asks Joseph for its interpretation.' },
  { ayah1: '12:109', ayah2: '30:9', category: 'lafzi', noteAr: 'الزوج الأخير المكمل لمجموعة السير في الأرض المكونة من عشر مجموعات (12:109، 30:9، 35:44، 40:82، 47:10): \'أَوَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ مِن قَبْلِهِمْ\'.', noteEn: 'The last pair completing the set of \'travel in the land\' verses consisting of ten pairs (12:109, 30:9, 35:44, 40:82, 47:10): \'awalam yasīrū fī l-arḍi fayanẓurū kayfa kāna \'āqibatu lladhīna min qablihim\'.' },
  { ayah1: '12:109', ayah2: '35:44', category: 'lafzi', noteAr: 'جزء من مجموعة صيغة السير في الأرض (12:109، 30:9، 35:44، 40:82، 47:10 تشترك جميعها في هذه العبارة)؛ هذا الزوج هو 12:109 و35:44.', noteEn: 'Part of the \'travel in the land\' formula group (12:109, 30:9, 35:44, 40:82, 47:10 all share this phrase); this pair is 12:109 and 35:44.' },
{ ayah1: '12:109', ayah2: '40:82', category: 'lafzi', noteAr: 'كِلتا الآيتين تحتويان على \'أَفَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنْظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ مِنْ قَبْلِهِمْ\'؛ انظر أيضًا 30:9/40:82 (الدفعة 5) و12:109/47:10 للمجموعة الأوسع من هذه الصيغة.', noteEn: 'Both verses contain \'afalam yasīrū fī l-arḍi fayanẓurū kayfa kāna \'āqibatu lladhīna min qablihim\'; see also 30:9/40:82 (batch 5) and 12:109/47:10 for the broader group of this formula.' },
  { ayah1: '12:109', ayah2: '47:10', category: 'lafzi', noteAr: 'كِلتا الآيتين تحتويان على \'أَفَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنْظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ مِنْ قَبْلِهِمْ\'؛ انظر أيضًا 12:109/40:82 (هذه الدفعة) للمجموعة الأوسع.', noteEn: 'Both verses contain \'afalam yasīrū fī l-arḍi fayanẓurū kayfa kāna \'āqibatu lladhīna min qablihim\'; see also 12:109/40:82 (this batch) for the broader group.' },
  { ayah1: '14:21', ayah2: '40:47', category: 'lafzi', noteAr: 'كلتاهما تذكران الضعفاء يخاطبون المستكبرين في الآخرة: \'إِنَّا كُنَّا لَكُمْ تَبَعًا فَهَلْ أَنْتُمْ مُغْنُونَ عَنَّا مِنْ عَذَابِ اللَّهِ مِنْ شَيْءٍ\'؛ الآية 14:21 في سياق دعاء إبراهيم، والآية 40:47 في مشهد مباشر في النار.', noteEn: 'Both mention the weak addressing the arrogant in the Hereafter: \'innā kunnā lakum taba\'an fahal antum mughnūna \'annā min \'adhābi llāhi min shay\'\'; 14:21 is in the context of Abraham\'s supplication, while 40:47 is a direct scene in Hell.' },
  { ayah1: '15:1', ayah2: '27:1', category: 'order_change', noteAr: 'الآية 15:1 تقول \'ayat al-kitabi wa Qur\'anin mubin\' بينما الآية 27:1 تقول \'ayat al-Qur\'ani wa kitabin mubin\' — الكلمتان "القرآن" و"الكتاب" مقلوبتان في الموضع.', noteEn: 'Verse 15:1 reads \'ayat al-kitabi wa Qur\'anin mubin\' while 27:1 reads \'ayat al-Qur\'ani wa kitabin mubin\' — the words \'al-Qur\'an\' and \'al-kitab\' are reversed in position.' },
  { ayah1: '15:29', ayah2: '38:72', category: 'lafzi', noteAr: 'أمر إلهي متطابق: عندما سوّى الله آدم ونفخ فيه من روحه، وجب على الملائكة السجود.', noteEn: 'Identical divine command: when God fashioned Adam and breathed into him of His spirit, the angels were to prostrate.' },
  { ayah1: '16:43', ayah2: '21:7', category: 'lafzi', noteAr: 'متطابقة: \'مَا أَرْسَلْنَا مِنْ قَبْلِكَ إِلَّا رِجَالًا نُوحِي إِلَيْهِمْ فَاسْأَلُوا أَهْلَ الذِّكْرِ إِنْ كُنْتُمْ لَا تَعْلَمُونَ\'؛ الآية 16:43 ترد على الاعتراضات بشأن بشريّة النبي، والآية 21:7 تذكر النقطة نفسها في افتتاحية سورة الأنبياء.', noteEn: 'Identical: \'mā arsalnā min qablika illā rijālan nūḥī ilayhim fas\'alū ahla l-dhikri in kuntum lā ta\'lamūn\'; 16:43 responds to objections about the Prophet\'s humanity, while 21:7 makes the same point at the opening of Surat al-Anbiya\'.' },
  { ayah1: '16:61', ayah2: '35:45', category: 'lafzi', noteAr: 'متطابقة: \'وَلَوْ يُؤَاخِذُ اللَّهُ النَّاسَ بِمَا كَسَبُوا مَا تَرَكَ عَلَى ظَهْرِهَا مِنْ دَابَّةٍ وَلَكِنْ يُؤَخِّرُهُمْ إِلَى أَجَلٍ مُسَمًّى\'؛ الآية 16:61 في سياق صفات الله الحلم، والآية 35:45 تذكر النقطة نفسها في ختام سورة فاطر.', noteEn: 'Identical: \'walaw yu\'ākhidhu llāhu l-nāsa bimā kasabū mā taraka \'alā ẓahrihā min dābbatin walākin yu\'akhkhiruhum ilā ajalin musammā\'; 16:61 is in the context of God\'s forbearance, while 35:45 makes the same point at the conclusion of Surat Fatir.' },
  { ayah1: '16:66', ayah2: '23:21', category: 'pronoun_shift', noteAr: 'كلتاهما تصفان خروج الشراب من بطون الأنعام، لكن الآية 16:66 تستخدم المذكر \'butunihi\' بينما الآية 23:21 تستخدم المؤنث \'butuniha\'.', noteEn: 'Both describe the drink coming forth from the bellies of cattle, but 16:66 uses the masculine \'butunihi\' while 23:21 uses the feminine \'butuniha\'.' },
  { ayah1: '16:78', ayah2: '23:78', category: 'lafzi', noteAr: 'كلتاهما تذكران \'al-sam\'a wa al-absar wa al-af\'idah\' كعطايا إلهية — الآية 16:78 تقول \'wa ja\'ala lakum al-sam\'a wa al-absar wa al-af\'idah la\'allakum tashkurun\' والآية 23:78 تستخدم \'qalilan ma tashkurun\' بدلاً من ذلك — نفس الثلاثي، ختام مختلف.', noteEn: 'Both mention \'al-sam\'a wa al-absar wa al-af\'idah\' as divine gifts — 16:78 says \'wa ja\'ala lakum al-sam\'a wa al-absar wa al-af\'idah la\'allakum tashkurun\' while 23:78 uses \'qalilan ma tashkurun\' instead — same triad, different ending.' },
  { ayah1: '16:125', ayah2: '53:30', category: 'lafzi', noteAr: 'تكمل المجموعة الثلاثية (انظر 16:125/68:7 الدفعة 5 و53:30/68:7 هذه الدفعة): \'رَبُّكَ هُوَ أَعْلَمُ بِمَنْ ضَلَّ عَنْ سَبِيلِهِ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ\'؛ الآية 16:125 في سياق الدعوة بالحكمة، والآية 53:30 تختم وصف الذين يولّون.', noteEn: 'Completes the triplet group (see 16:125/68:7 batch 5 and 53:30/68:7 this batch): \'rabbuka huwa a\'lamu biman ḍalla \'an sabīlihi wa-huwa a\'lamu bi-l-muhtadīn\'; 16:125 is in the context of calling with wisdom, while 53:30 concludes the description of those who turn away.' },
  { ayah1: '16:125', ayah2: '68:7', category: 'lafzi', noteAr: 'ختام متطابق: \'رَبُّكَ هُوَ أَعْلَمُ بِمَنْ ضَلَّ عَنْ سَبِيلِهِ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ\'؛ الآية 16:125 تتبع الأمر بالدعوة إلى سبيل الله بالحكمة، والآية 68:7 تتبع النهي عن طاعة المكذبين.', noteEn: 'Identical conclusion: \'rabbuka huwa a\'lamu biman ḍalla \'an sabīlihi wa-huwa a\'lamu bi-l-muhtadīn\'; 16:125 follows the command to call to the way of God with wisdom, while 68:7 follows the prohibition against obeying the deniers.' },
  { ayah1: '17:9', ayah2: '18:2', category: 'word_swap', noteAr: 'كلتاهما تنتهيان بتبشير المؤمنين، لكن الآية 17:9 تستخدم \'yubashiru\' (بصيغة الرفع) بينما الآية 18:2 تستخدم \'yubashira\' (بصيغة النصب) — فرق حركة واحد في صيغة الفعل.', noteEn: 'Both end with giving glad tidings to the believers, but 17:9 uses \'yubashiru\' (nominative) while 18:2 uses \'yubashira\' (subjunctive) — a single vowel difference in the verb form.' },
  { ayah1: '17:83', ayah2: '41:51', category: 'lafzi', noteAr: 'متطابقة: \'وَإِذَا أَنْعَمْنَا عَلَى الْإِنْسَانِ أَعْرَضَ وَنَأَى بِجَانِبِهِ وَإِذَا مَسَّهُ الشَّرُّ كَانَ يَئُوسًا\'؛ كلتاهما تذكران جحود الإنسان ويأسه كخلل متكرر — الآية 17:83 في سورة الإسراء، والآية 41:51 في سورة فُصِّلَت.', noteEn: 'Identical: \'wa-idhā an\'amnā \'alā l-insāni a\'raḍa wa-na\'ā bijānibihi wa-idhā massahu l-sharru kāna ya\'ūsā\'; both mention man\'s ingratitude and despair as a recurring flaw — 17:83 in Surat al-Isra\', and 41:51 in Surat Fussilat.' },
  { ayah1: '18:29', ayah2: '76:3', category: 'word_swap', noteAr: 'الآية 18:29 \'fa man sha\'a fa l-yu\'min wa man sha\'a fa l-yakfur\' والآية 76:3 \'inna hadaynahu al-sabil imma shakiran wa imma kafura\' كلتاهما تذكران أن الهداية قد أُعطيت وأن الإنسان يختار — الأولى في سياق تهديد، والثانية في بيان حرية الإنسان.', noteEn: 'Verse 18:29 \'fa man sha\'a fa l-yu\'min wa man sha\'a fa l-yakfur\' and 76:3 \'inna hadaynahu al-sabil imma shakiran wa imma kafura\' — both state that guidance has been given and that man chooses — the first in a threatening context, the second in a statement of human freedom.' },
  { ayah1: '18:72', ayah2: '18:75', category: 'addition_omission', noteAr: 'توبيخ الخضر المتكرر لموسى — الآية 18:72 تقول \'alam aqul innaka lan tastati\'a\' بينما الآية 18:75 تزيد \'laka\' بعد \'aqul\'، فرق كلمة واحدة يختبر في مراجعة التجويد.', noteEn: 'Al-Khidr\'s repeated rebuke of Moses — 18:72 says \'alam aqul innaka lan tastati\'a\' while 18:75 adds \'laka\' after \'aqul\', a one-word difference tested in tajweed review.' },
  { ayah1: '18:110', ayah2: '41:6', category: 'lafzi', noteAr: 'افتتاحية متطابقة: \'قُلْ إِنَّمَا أَنَا بَشَرٌ مِثْلُكُمْ يُوحَى إِلَيَّ أَنَّمَا إِلَهُكُمْ إِلَهٌ وَاحِدٌ\'؛ الآية 18:110 تختم سورة الكهف، والآية 41:6 تفتتح مقطعًا في سورة فُصِّلَت — كلتاهما تؤكدان بشريّة النبي مع التوحيد الخالص.', noteEn: 'Identical opening: \'qul innamā anā basharun mithlukum yūḥā ilayya annamā ilāhukum ilāhun wāḥid\'; 18:110 concludes Surat al-Kahf, while 41:6 opens a passage in Surat Fussilat — both affirm the Prophet\'s humanity along with pure monotheism.' },
  { ayah1: '19:15', ayah2: '19:33', category: 'pronoun_shift', noteAr: 'كلتاهما تذكران السلام يوم الولادة والموت والبعث — الآية 19:15 إعلان من الله بصيغة الغائب عن يحيى (\'alayhi) بينما الآية 19:33 عيسى يتكلم بصيغة المتكلم (\'alayya).', noteEn: 'Both mention peace on the day of birth, death, and resurrection — 19:15 is a declaration from God in the third person about John (\'alayhi) while 19:33 has Jesus speaking in the first person (\'alayya).' },
  { ayah1: '20:71', ayah2: '26:49', category: 'lafzi', noteAr: 'كلتاهما تذكران رد فرعون على السحرة المؤمنين: \'آمَنْتُمْ لَهُ قَبْلَ أَنْ آذَنَ لَكُمْ إِنَّهُ لَكَبِيرُكُمُ الَّذِي عَلَّمَكُمُ السِّحْرَ\'؛ وتتبعهما بالتهديد بالصلب على جذوع النخل.', noteEn: 'Both mention Pharaoh\'s response to the believing magicians: \'āmantum lahu qabla an ādhana lakum innahu lakabīrukumu lladhī \'allamakumu l-siḥra\'; followed by the threat of crucifixion on palm trunks.' },
  { ayah1: '20:128', ayah2: '32:26', category: 'lafzi', noteAr: 'كلتاهما تسألان: \'أَفَلَمْ يَهْدِ لَهُمْ كَمْ أَهْلَكْنَا مِنْ قَبْلِهِمْ مِنَ الْقُرُونِ يَمْشُونَ فِي مَسَاكِنِهِمْ\'؛ الآية 20:128 تفتتح بـ \'أَفَلَمْ\' والآية 32:26 تفتتح بـ \'أَوَلَمْ\' — الفرق هو حرف واحد وهو الفرق الرئيسي.', noteEn: 'Both ask: \'afalam yahdi lahum kam ahlaknā min qablihim mina l-qurūni yamshūna fī masākinihim\'; 20:128 begins with \'afalam\' while 32:26 begins with \'awalam\' — the difference is a single letter, which is the main distinction.' },
  { ayah1: '20:130', ayah2: '50:39', category: 'word_swap', noteAr: 'الآية 50:39 \'fa isbir \'ala ma yaquluna wa sabbih bi hamdi rabbika qabla tuluu\' al-shams wa qabla al-ghurub\' والآية 20:130 متطابقتان تقريبًا لكن 20:130 تزيد \'qabla ghurubaha\' بضمير المؤنث — فرق حرف واحد يغفل عنه القراء كثيرًا.', noteEn: 'Verse 50:39 \'fa iṣbir \'alā mā yaqūlūna wa sabbiḥ biḥamdi rabbika qabla ṭulū\'i l-shamsi wa qabla l-ghurūb\' and 20:130 are nearly identical, but 20:130 adds \'qabla ghurūbihā\' with a feminine pronoun — a one-letter difference that readers often overlook.' },
  { ayah1: '21:38', ayah2: '36:48', category: 'lafzi', noteAr: 'كلتاهما تذكران الكفار يسألون: \'مَتَى هَذَا الْوَعْدُ إِنْ كُنْتُمْ صَادِقِينَ\' بصيغة متطابقة تقريبًا عبر سورتين.', noteEn: 'Both mention the disbelievers asking: \'matā hādhā l-wa\'du in kuntum ṣādiqīn\' in nearly identical wording across two surahs.' },
  { ayah1: '21:91', ayah2: '66:12', category: 'pronoun_shift', noteAr: 'كلتاهما تصفان نفخ الروح الإلهية في مريم لكن الآية 21:91 تستخدم \'fiha\' (فيها) بينما الآية 66:12 تستخدم \'fihi\' (فيه)، إشارة إلى مرجعين نحويين مختلفين.', noteEn: 'Both describe the breathing of the divine spirit into Mary, but 21:91 uses \'fīhā\' (into her) while 66:12 uses \'fīhi\' (into it), referring to two different grammatical referents.' },
  { ayah1: '22:8', ayah2: '31:20', category: 'lafzi', noteAr: 'متطابقة: \'وَمِنَ النَّاسِ مَنْ يُجَادِلُ فِي اللَّهِ بِغَيْرِ عِلْمٍ وَلَا هُدًى وَلَا كِتَابٍ مُنِيرٍ\'؛ الآية 22:8 تتبع بذكر المجادل المتكبر الذي يُضل الآخرين، والآية 31:20 تقابلها بدعوة للتأمل في نعم الله.', noteEn: 'Identical: \'wa-mina l-nāsi man yujādilu fī llāhi bighayri \'ilmin walā hudan walā kitābin munīr\'; 22:8 is followed by mention of the arrogant disputant who misleads others, while 31:20 contrasts it with an invitation to reflect on God\'s blessings.' },
  { ayah1: '22:14', ayah2: '22:23', category: 'lafzi', noteAr: 'تكرار حرفي في سورة الحج في الآيتين 22:14 و22:23: \'إِنَّ اللَّهَ يُدْخِلُ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ\'؛ انظر أيضًا 22:14/47:12 و22:23/47:12 للتكرار الثلاثي.', noteEn: 'Verbatim repetition within Surat al-Hajj in 22:14 and 22:23: \'inna llāha yudkhilu lladhīna āmanū wa-\'amilū l-ṣāliḥāti jannātin tajrī min taḥtihā l-anhār\'; see also 22:14/47:12 and 22:23/47:12 for the triple repetition.' },
  { ayah1: '22:14', ayah2: '47:12', category: 'lafzi', noteAr: 'جزء من تكرار ثلاثي (انظر 22:14/22:23 و22:23/47:12): \'إِنَّ اللَّهَ يُدْخِلُ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ\'؛ الآية 47:12 تقابل هذا بأكل الكفار كالأنعام.', noteEn: 'Part of a triple repetition (see 22:14/22:23 and 22:23/47:12): \'inna llāha yudkhilu lladhīna āmanū wa-\'amilū l-ṣāliḥāti jannātin tajrī min taḥtihā l-anhār\'; 47:12 contrasts this with the disbelievers eating like cattle.' },
  { ayah1: '22:23', ayah2: '35:33', category: 'lafzi', noteAr: 'وصف الجنة متطابق: \'يُحَلَّوْنَ فِيهَا مِنْ أَسَاوِرَ مِنْ ذَهَبٍ وَلُؤْلُؤًا وَلِبَاسُهُمْ فِيهَا حَرِيرٌ\'؛ الآية 22:23 جزء من جزاء المؤمنين في الحج (انظر أيضًا 22:14/22:23)، والآية 35:33 في ميراث الجنة في سورة فاطر.', noteEn: 'Identical description of Paradise: \'yuḥallawna fīhā min asāwira min dhahabin wa-lu\'lu\'an wa-libāsuhum fīhā ḥarīr\'; 22:23 is part of the believers\' reward in al-Hajj (see also 22:14/22:23), and 35:33 is in the inheritance of Paradise in Surat Fatir.' },
  { ayah1: '22:23', ayah2: '47:12', category: 'lafzi', noteAr: 'الزوج الثالث في التكرار الثلاثي (انظر 22:14/22:23 و22:14/47:12): \'إِنَّ اللَّهَ يُدْخِلُ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ\'؛ الآية 22:23 تزيد أساور الذهب والحرير، والآية 47:12 تقابل بالكفار الذين يأكلون كالأنعام.', noteEn: 'The third pair in the triple repetition (see 22:14/22:23 and 22:14/47:12): \'inna llāha yudkhilu lladhīna āmanū wa-\'amilū l-ṣāliḥāti jannātin tajrī min taḥtihā l-anhār\'; 22:23 adds gold bracelets and silk garments, while 47:12 contrasts with the disbelievers eating like cattle.' },
  { ayah1: '22:62', ayah2: '31:30', category: 'lafzi', noteAr: 'متطابقة تمامًا: \'ذَلِكَ بِأَنَّ اللَّهَ هُوَ الْحَقُّ وَأَنَّ مَا يَدْعُونَ مِنْ دُونِهِ هُوَ الْبَاطِلُ وَأَنَّ اللَّهَ هُوَ الْعَلِيُّ الْكَبِيرُ\'؛ الآية 22:62 تتبع آيات كونية، والآية 31:30 تتبع ذكر الاستظلال من الشمس.', noteEn: 'Completely identical: \'That is because Allah is the Truth, and what they invoke besides Him is falsehood, and Allah is the Most High, the Most Great\'; 22:62 follows cosmic signs, and 31:30 follows mention of seeking shade from the sun.' },
  { ayah1: '23:5', ayah2: '70:29', category: 'lafzi', noteAr: 'كلتاهما تستخدمان العبارة نفسها \'wa alladhina hum li furujihim hafizun\' في قوائم متوازية لصفات المؤمنين — إحداهما في سورة المؤمنون والأخرى في سورة المعارج.', noteEn: 'Both use the same phrase \'And those who guard their private parts\' in parallel lists of the believers\' attributes — one in Surah Al-Mu\'minun and the other in Surah Al-Ma\'arij.' },
  { ayah1: '23:6', ayah2: '70:30', category: 'lafzi', noteAr: 'جملة الاستثناء \'illa \'ala azwajihim aw ma malakat aymanuhum fa innahum ghayru malumun\' ترد حرفيًا في كلتا السورتين مباشرة بعد آية حفظ الفرج.', noteEn: 'The exceptive clause \'except from their wives or those their right hands possess, for indeed they are not to be blamed\' occurs verbatim in both surahs immediately after the verse on guarding chastity.' },
  { ayah1: '23:51', ayah2: '34:11', category: 'ending_variation', noteAr: 'كلتاهما تحتويان على الأمر \'wa\'malu salihan\' يتبعه صفة إلهية لكن الآية 23:51 تنتهي بـ \'\'alim\' والآية 34:11 تنتهي بـ \'basir\'.', noteEn: 'Both contain the command \'and do righteous work\' followed by a divine attribute, but 23:51 ends with \'All-Knowing\' and 34:11 ends with \'All-Seeing.\'' },
  { ayah1: '23:78', ayah2: '32:9', category: 'lafzi', noteAr: 'الآيتان 23:78 و32:9 تذكران ثلاثي السمع-البصر-الأفئدة بالختام نفسه \'qalilan ma tashkurun\' — نفس النعمة يُقرّ بها بنفس اللوم على الجحود.', noteEn: 'Verses 23:78 and 32:9 both mention the triad of hearing-sight-hearts with the same closing \'little do you give thanks\' — the same blessing is acknowledged with the same reproach for ingratitude.' },
  { ayah1: '23:82', ayah2: '37:16', category: 'lafzi', noteAr: 'إنكار البعث حرفيًا: \'أَإِذَا مِتْنَا وَكُنَّا تُرَابًا وَعِظَامًا أَإِنَّا لَمَبْعُوثُونَ\'؛ الآية 23:82 في قائمة اعتراضات الكفار، والآية 37:16 قريش تستهزئ بوعد البعث.', noteEn: 'Literal denial of resurrection: \'When we have died and become dust and bones, will we indeed be raised?\' 23:82 appears in a list of the disbelievers\' objections, while 37:16 has Quraysh mocking the promise of resurrection.' },
  { ayah1: '24:61', ayah2: '48:17', category: 'lafzi', noteAr: 'جملة مشتركة حرفيًا: \'لَيْسَ عَلَى الْأَعْمَى حَرَجٌ وَلَا عَلَى الْأَعْرَجِ حَرَجٌ وَلَا عَلَى الْمَرِيضِ حَرَجٌ\'؛ الآية 24:61 تستثنيهم من آداب الطعام، والآية 48:17 تعفيهم من وجوب الخروج للغزو.', noteEn: 'A verbatim shared clause: \'There is no blame upon the blind, nor upon the lame, nor upon the sick\'; 24:61 exempts them from dining etiquette, while 48:17 excuses them from the obligation to go out for battle.' },
  { ayah1: '25:59', ayah2: '32:4', category: 'lafzi', noteAr: 'كلتاهما تفتتحان بـ \'الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَمَا بَيْنَهُمَا فِي سِتَّةِ أَيَّامٍ ثُمَّ اسْتَوَى عَلَى الْعَرْشِ\'؛ الآية 25:59 توجّه إلى سؤال خبير (الرحمن)، والآية 32:4 تؤكد أنه لا شفيع إلا بإذنه.', noteEn: 'Both open with \'Who created the heavens and the earth and what is between them in six days, then established Himself above the Throne\'; 25:59 directs to ask the All-Knowing (the Most Merciful), and 32:4 affirms that there is no intercessor except by His permission.' },
  { ayah1: '26:109', ayah2: '26:127', category: 'lafzi', noteAr: 'جزء من التكرار النبوي في سورة الشعراء (26:109 نوح، 26:127 هود، 26:145 صالح، 26:164 لوط، 26:180 شعيب)؛ هذا الزوج هو نوح وهود.', noteEn: 'Part of the prophetic refrain in Surah Ash-Shu\'ara (26:109 Noah, 26:127 Hud, 26:145 Salih, 26:164 Lot, 26:180 Shu\'ayb); this pair is Noah and Hud.' },
  { ayah1: '26:109', ayah2: '26:145', category: 'lafzi', noteAr: 'جزء من التكرار النبوي في سورة الشعراء (26:109 نوح، 26:127 هود، 26:145 صالح، 26:164 لوط، 26:180 شعيب)؛ هذا الزوج هو نوح وصالح.', noteEn: 'Part of the prophetic refrain in Surah Ash-Shu\'ara (26:109 Noah, 26:127 Hud, 26:145 Salih, 26:164 Lot, 26:180 Shu\'ayb); this pair is Noah and Salih.' },
  { ayah1: '26:109', ayah2: '26:164', category: 'lafzi', noteAr: 'جزء من التكرار النبوي في سورة الشعراء: \'وَمَا أَسْأَلُكُمْ عَلَيْهِ مِنْ أَجْرٍ إِنْ أَجْرِيَ إِلَّا عَلَى رَبِّ الْعَالَمِينَ\' — يرد خمس مرات في السورة (26:109 نوح، 26:127 هود، 26:145 صالح، 26:164 لوط، 26:180 شعيب)؛ هذا الزوج هو نوح ولوط.', noteEn: 'Part of the prophetic refrain in Surah Ash-Shu\'ara: \'And I do not ask you for it any payment; my payment is only from the Lord of the worlds\' — it occurs five times in the surah (26:109 Noah, 26:127 Hud, 26:145 Salih, 26:164 Lot, 26:180 Shu\'ayb); this pair is Noah and Lot.' },
  { ayah1: '26:109', ayah2: '26:180', category: 'lafzi', noteAr: 'جزء من التكرار النبوي في سورة الشعراء: \'وَمَا أَسْأَلُكُمْ عَلَيْهِ مِنْ أَجْرٍ إِنْ أَجْرِيَ إِلَّا عَلَى رَبِّ الْعَالَمِينَ\' — يرد خمس مرات في السورة (26:109 نوح، 26:127 هود، 26:145 صالح، 26:164 لوط، 26:180 شعيب)؛ هذا الزوج هو نوح وشعيب.', noteEn: 'Part of the prophetic refrain in Surah Ash-Shu\'ara: \'And I do not ask you for it any payment; my payment is only from the Lord of the worlds\' — it occurs five times in the surah (26:109 Noah, 26:127 Hud, 26:145 Salih, 26:164 Lot, 26:180 Shu\'ayb); this pair is Noah and Shu\'ayb.' },
  { ayah1: '26:127', ayah2: '26:145', category: 'lafzi', noteAr: 'جزء من التكرار النبوي في سورة الشعراء: \'وَمَا أَسْأَلُكُمْ عَلَيْهِ مِنْ أَجْرٍ إِنْ أَجْرِيَ إِلَّا عَلَى رَبِّ الْعَالَمِينَ\' — يرد خمس مرات في السورة (26:109 نوح، 26:127 هود، 26:145 صالح، 26:164 لوط، 26:180 شعيب)؛ هذا الزوج هو هود وصالح.', noteEn: 'Part of the prophetic refrain in Surah Ash-Shu\'ara: \'And I do not ask you for it any payment; my payment is only from the Lord of the worlds\' — it occurs five times in the surah (26:109 Noah, 26:127 Hud, 26:145 Salih, 26:164 Lot, 26:180 Shu\'ayb); this pair is Hud and Salih.' },
  { ayah1: '26:127', ayah2: '26:164', category: 'lafzi', noteAr: 'جزء من التكرار النبوي في سورة الشعراء: \'وَمَا أَسْأَلُكُمْ عَلَيْهِ مِنْ أَجْرٍ إِنْ أَجْرِيَ إِلَّا عَلَى رَبِّ الْعَالَمِينَ\' — يرد خمس مرات في السورة (26:109 نوح، 26:127 هود، 26:145 صالح، 26:164 لوط، 26:180 شعيب)؛ هذا الزوج هو هود ولوط.', noteEn: 'Part of the prophetic refrain in Surah Ash-Shu\'ara: \'And I do not ask you for it any payment; my payment is only from the Lord of the worlds\' — it occurs five times in the surah (26:109 Noah, 26:127 Hud, 26:145 Salih, 26:164 Lot, 26:180 Shu\'ayb); this pair is Hud and Lot.' },
  { ayah1: '26:127', ayah2: '26:180', category: 'lafzi', noteAr: 'كلتاهما من التكرار النبوي المتكرر عبر خمس قصص في سورة الشعراء: \'وَمَا أَسْأَلُكُمْ عَلَيْهِ مِنْ أَجْرٍ إِنْ أَجْرِيَ إِلَّا عَلَى رَبِّ الْعَالَمِينَ\'؛ الآية 26:127 تكرار هود، والآية 26:180 تكرار شعيب.', noteEn: 'Both are from the prophetic refrain repeated across five stories in Surah Ash-Shu\'ara: \'And I do not ask you for it any payment; my payment is only from the Lord of the worlds\'; 26:127 is Hud\'s iteration, and 26:180 is Shu\'ayb\'s iteration.' },
  { ayah1: '26:145', ayah2: '26:164', category: 'lafzi', noteAr: 'جزء من التكرار النبوي في سورة الشعراء: \'وَمَا أَسْأَلُكُمْ عَلَيْهِ مِنْ أَجْرٍ إِنْ أَجْرِيَ إِلَّا عَلَى رَبِّ الْعَالَمِينَ\' — يرد خمس مرات في السورة (26:109 نوح، 26:127 هود، 26:145 صالح، 26:164 لوط، 26:180 شعيب)؛ هذا الزوج هو صالح ولوط.', noteEn: 'Part of the prophetic refrain in Surah Ash-Shu\'ara: \'And I do not ask you for it any payment; my payment is only from the Lord of the worlds\' — it occurs five times in the surah (26:109 Noah, 26:127 Hud, 26:145 Salih, 26:164 Lot, 26:180 Shu\'ayb); this pair is Salih and Lot.' },
  { ayah1: '26:145', ayah2: '26:180', category: 'lafzi', noteAr: 'جزء من التكرار النبوي في سورة الشعراء: \'وَمَا أَسْأَلُكُمْ عَلَيْهِ مِنْ أَجْرٍ إِنْ أَجْرِيَ إِلَّا عَلَى رَبِّ الْعَالَمِينَ\' — يرد خمس مرات في السورة (26:109 نوح، 26:127 هود، 26:145 صالح، 26:164 لوط، 26:180 شعيب)؛ هذا الزوج هو صالح وشعيب.', noteEn: 'Part of the prophetic refrain in Surah Ash-Shu\'ara: \'And I do not ask you for it any payment; my payment is only from the Lord of the worlds\' — it occurs five times in the surah (26:109 Noah, 26:127 Hud, 26:145 Salih, 26:164 Lot, 26:180 Shu\'ayb); this pair is Salih and Shu\'ayb.' },
  { ayah1: '26:164', ayah2: '26:180', category: 'lafzi', noteAr: 'جزء من التكرار النبوي في سورة الشعراء: \'وَمَا أَسْأَلُكُمْ عَلَيْهِ مِنْ أَجْرٍ إِنْ أَجْرِيَ إِلَّا عَلَى رَبِّ الْعَالَمِينَ\' — يرد خمس مرات في السورة (26:109 نوح، 26:127 هود، 26:145 صالح، 26:164 لوط، 26:180 شعيب)؛ هذا الزوج هو لوط وشعيب.', noteEn: 'Part of the prophetic refrain in Surah Ash-Shu\'ara: \'And I do not ask you for it any payment; my payment is only from the Lord of the worlds\' — it occurs five times in the surah (26:109 Noah, 26:127 Hud, 26:145 Salih, 26:164 Lot, 26:180 Shu\'ayb); this pair is Lot and Shu\'ayb.' },
  { ayah1: '26:173', ayah2: '27:58', category: 'lafzi', noteAr: 'متطابقة: \'وَأَمْطَرْنَا عَلَيْهِمْ مَطَرًا فَسَاءَ مَطَرُ الْمُنْذَرِينَ\'؛ كلتاهما تصفان مطر العذاب على قوم لوط — الآية 26:173 في سورة الشعراء، والآية 27:58 في سورة النمل.', noteEn: 'Identical: \'And We rained upon them a rain, and evil was the rain of those who were warned\'; both describe the rain of punishment upon the people of Lot — 26:173 in Surah Ash-Shu\'ara, and 27:58 in Surah An-Naml.' },
  { ayah1: '27:3', ayah2: '31:4', category: 'lafzi', noteAr: 'وصف متطابق للمؤمنين: يقيمون الصلاة ويؤتون الزكاة وهم بالآخرة يوقنون. تكرر في سورتي النمل (27) ولقمان (31).', noteEn: 'Identical description of the believers: they establish prayer, give zakah, and are certain of the Hereafter. Repeated in Surat An-Naml (27) and Luqman (31).' },
  { ayah1: '27:10', ayah2: '28:31', category: 'lafzi', noteAr: 'كلتاهما تصفان موسى يرى عصاها تهتز كأنها جانّ ويولّي مدبرًا؛ الآية 27:10 هي اللقاء الأول عند الشجرة، والآية 28:31 تعيد المشهد نفسه عندما يُوكّل موسى رسميًا.', noteEn: 'Both describe Moses seeing his staff move as if it were a snake and turning away in retreat; 27:10 is the first encounter at the tree, and 28:31 repeats the same scene when Moses is formally commissioned.' },
  { ayah1: '27:19', ayah2: '46:15', category: 'lafzi', noteAr: 'كلتاهما تحتويان على الدعاء: \'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ\'؛ الآية 27:19 (لسليمان) تنتهي بطلب الإدخال في عباد الله الصالحين، والآية 46:15 (لمؤمن بلغ الأربعين) تزيد طلب الذرية الصالحة.', noteEn: 'Both contain the supplication: \'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents, and to do righteous deeds that please You\'; 27:19 (for Solomon) ends with a request to be admitted among the righteous servants of Allah, while 46:15 (for a believer who reaches forty) adds a request for righteous offspring.' },
  { ayah1: '27:81', ayah2: '30:53', category: 'lafzi', noteAr: 'متطابقتان تقريبًا: النبي لا يستطيع هدي العمي من ضلالتهم؛ لا يسمع إلا من يؤمن بآيات الله. فرق إملائي طفيف: \'بِهَادِي\' (27:81) مقابل \'بِهَادِ\' (30:53).', noteEn: 'Nearly identical: the Prophet cannot guide the blind from their misguidance; he can only make hear those who believe in Allah\'s signs. A minor orthographic difference: \'بِهَادِي\' (27:81) versus \'بِهَادِ\' (30:53).' },
  { ayah1: '27:87', ayah2: '39:68', category: 'lafzi', noteAr: 'كلتاهما تصفان نفخ الصور فيصعق من في السموات والأرض \'إِلَّا مَنْ شَاءَ اللَّهُ\'؛ الآية 27:87 هي الذكر الأول، والآية 39:68 تفصّل بالنفخة الثانية التي تسبب البعث.', noteEn: 'Both describe the blowing of the Horn, whereupon whoever is in the heavens and the earth will be stunned \'except whom Allah wills\'; 27:87 is the first mention, and 39:68 elaborates with the second blast that causes resurrection.' },
  { ayah1: '28:20', ayah2: '36:20', category: 'order_change', noteAr: 'كلتاهما تقولان \'ja\'a rajulun min aqsa al-madinah\' لكن الآية 28:20 تضع \'rajulun\' قبل شبه الجملة بينما الآية 36:20 تضعها بعدها — \'min aqsa al-madinah rajulun\'.', noteEn: 'Both say \'a man came from the farthest part of the city,\' but 28:20 places \'rajulun\' before the prepositional phrase while 36:20 places it after — \'min aqsa al-madinah rajulun.\'' },
  { ayah1: '28:46', ayah2: '32:3', category: 'lafzi', noteAr: 'كلتاهما تصفان الغرض من القرآن بأنه إنذار قوم ما أتاهم من نذير من قبله؛ الآية 28:46 ضمن قصة موسى، والآية 32:3 ترد مباشرة على اتهام أن النبي افترى الوحي.', noteEn: 'Both describe the purpose of the Quran as warning a people to whom no warner had come before; 28:46 is within the story of Moses, and 32:3 directly responds to the accusation that the Prophet fabricated the revelation.' },
  { ayah1: '28:62', ayah2: '28:74', category: 'lafzi', noteAr: 'تكرار حرفي في سورة القصص: \'وَيَوْمَ يُنَادِيهِمْ فَيَقُولُ أَيْنَ شُرَكَائِيَ الَّذِينَ كُنْتُمْ تَزْعُمُونَ\'؛ النداء نفسه يرد في الآية 28:62 ثم في الآية 28:74 بنفس اللفظ.', noteEn: 'Verbatim repetition in Surah Al-Qasas: \'And the Day He will call them and say, "Where are My partners which you used to claim?"\' The same call occurs in 28:62 and then in 28:74 with the exact wording.' },
  { ayah1: '29:62', ayah2: '34:36', category: 'ending_variation', noteAr: 'كلتاهما تذكران أن الله يبسط الرزق ويقدر لمن يشاء لكن الآية 29:62 تنتهي بـ \'بِكُلِّ شَيْءٍ عَلِيمٌ\' والآية 34:36 تنتهي بـ \'وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يَعْلَمُونَ\'.', noteEn: 'Both mention that Allah extends provision and restricts it for whom He wills, but 29:62 ends with \'of all things, All-Knowing\' and 34:36 ends with \'but most of the people do not know.\'' },
  { ayah1: '30:9', ayah2: '35:44', category: 'lafzi', noteAr: 'كلتاهما تحتويان على \'أَوَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنْظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ مِنْ قَبْلِهِمْ\'؛ انظر أيضًا 30:9/40:82 (الدفعة 5) و12:109/40:82 للمجموعة الأوسع.', noteEn: 'Both contain \'Have they not traveled through the land and seen how was the end of those before them?\'; see also 30:9/40:82 (batch 5) and 12:109/40:82 for the broader group.' },
  { ayah1: '30:9', ayah2: '40:82', category: 'lafzi', noteAr: 'كلتاهما تفتتحان بـ \'أَوَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنْظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ مِنْ قَبْلِهِمْ\'؛ الآية 30:9 تذكر أن الذين من قبلهم كانوا أشد قوة وأثاروا الأرض أكثر، والآية 40:82 تستخدم الافتتاحية البلاغية نفسها لنقطة موازية.', noteEn: 'Both open with \'Have they not traveled through the land and seen how was the end of those before them?\'; 30:9 notes that those before them were stronger in power and cultivated the earth more, while 40:82 uses the same rhetorical opening for a parallel point.' },
{ ayah1: '30:9', ayah2: '47:10', category: 'lafzi', noteAr: 'جزء من مجموعة صيغة السير في الأرض (الآيات 12:109، 30:9، 35:44، 40:82، 47:10 تشترك جميعها في هذه العبارة)؛ هذا الزوج هو 30:9 و47:10.', noteEn: 'Part of the journeying-in-the-land formula group (verses 12:109, 30:9, 35:44, 40:82, 47:10 all share this phrase); this pair is 30:9 and 47:10.' },
   { ayah1: '30:37', ayah2: '39:52', category: 'lafzi', noteAr: 'بالنص: «اللهُ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ وَيَقْدِرُ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يُؤْمِنُونَ»؛ الآية 30:37 تتبع أمرًا بالإحسان إلى ذوي القربى، والآية 39:52 هي سؤال بلاغي لمن يزعمون أن الله ظلمهم.', noteEn: 'Verbatim: \'Allah extends provision to whom He wills and restricts it. Indeed in that are signs for a people who believe\'; 30:37 follows a command to give to relatives, and 39:52 is a rhetorical question for those who claim Allah has wronged them.' },
   { ayah1: '30:43', ayah2: '42:47', category: 'lafzi', noteAr: 'كلاهما يحذر: «مِن قَبْلِ أَن يَأْتِيَ يَوْمٌ لَّا مَرَدَّ لَهُ مِنَ اللَّهِ»؛ الآية 30:43 تدعو إلى إقامة الوجه للدين القيم، والآية 42:47 تدعو إلى الاستجابة للرب قبل يوم لا مرد له.', noteEn: 'Both warn: \'before there comes from Allah a Day for which there is no repelling\'; 30:43 calls for directing one\'s face to the straight religion, and 42:47 calls for responding to the Lord before a Day that cannot be repelled.' },
   { ayah1: '31:14', ayah2: '46:15', category: 'word_swap', noteAr: 'الآية 31:14 «وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ» والآية 46:15 «وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ إِحْسَانًا» تبدأان بصيغة الوصية ذاتها عن الوالدين — الآية 46:15 تزيد لفظ «إحسانًا» الذي لا تحمله الآية 31:14 في ذلك الموضع.', noteEn: 'Verse 31:14 \'And We have enjoined man concerning his parents\' and verse 46:15 \'And We have enjoined man to goodness toward his parents\' both begin with the same formula of enjoining concerning parents — 46:15 adds the word \'Ihsanan\' (goodness) which 31:14 does not have in that position.' },
   { ayah1: '31:29', ayah2: '35:13', category: 'lafzi', noteAr: 'كلاهما يصفان إيلاج الليل في النهار والنهار في الليل وتسخير الشمس والقمر يجريان لأجل مسمى؛ الآية 31:29 تختم بـ«وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ»، والآية 35:13 تختم بـ«اللَّهُ الْغَنِيُّ الْحَمِيدُ».', noteEn: 'Both describe the merging of night into day and day into night, and the subjugation of the sun and moon running for an appointed term; 31:29 closes with \'and Allah is All-Aware of what you do,\' while 35:13 closes with \'Allah is the Self-Sufficient, the Praiseworthy.\'' },
   { ayah1: '31:33', ayah2: '35:5', category: 'lafzi', noteAr: 'بالنص: «إِنَّ وَعْدَ اللَّهِ حَقٌّ ۖ فَلَا تَغُرَّنَّكُمُ الْحَيَاةُ الدُّنْيَا ۖ وَلَا يَغُرَّنَّكُم بِاللَّهِ الْغَرُورُ»؛ الآيتان 31:33 و35:5 موجهتان إلى الناس بنفس الصيغة دون اختلاف في النص المشترك.', noteEn: 'By the text: \'Indeed, the promise of Allah is truth, so let not the worldly life delude you, nor let the Deceiver delude you concerning Allah.\' Both verses 31:33 and 35:5 are addressed to people with the same wording, with no difference in the shared text.' },
   { ayah1: '32:9', ayah2: '67:23', category: 'lafzi', noteAr: 'الآيتان 32:9 و67:23 تذكران «السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ قَلِيلًا مَّا تَشْكُرُونَ» بنفس اللفظ تقريبًا — مجموعة من أربع سور (16، 23، 32، 67) تشكل إحدى أكثر عبارات الثالوث تكرارًا في القرآن.', noteEn: 'Verses 32:9 and 67:23 both mention \'hearing, sight, and hearts — little do you give thanks\' with nearly identical wording — a group of four surahs (16, 23, 32, 67) forming one of the most frequently repeated tripartite phrases in the Quran.' },
   { ayah1: '34:2', ayah2: '57:4', category: 'lafzi', noteAr: 'كلاهما يصفان علم الله بما يلج في الأرض وما يخرج منها وما ينزل من السماء وما يعرج فيها. الآية 34:2 تختم بـ«وَهُوَ الرَّحِيمُ الْغَفُورُ»، والآية 57:4 تختم بـ«وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ».', noteEn: 'Both describe Allah\'s knowledge of what enters the earth, what emerges from it, what descends from heaven, and what ascends into it. Verse 34:2 concludes with \'And He is the Most Merciful, the Oft-Forgiving,\' while verse 57:4 concludes with \'And He is with you wherever you are.\'' },
   { ayah1: '35:40', ayah2: '46:4', category: 'lafzi', noteAr: 'كلاهما يتحدى المشركين: أروني ماذا خلقت آلهتهم من الأرض أم لهم شرك في السموات. الآية 35:40 تذكر «شُرَكَاءَهُم» صراحة؛ الآية 46:4 تنتهي بمطالبة بكتاب من قبل أو أثر من علم.', noteEn: 'Both challenge the polytheists: \'Show me what your gods have created from the earth, or do they have a share in the heavens?\' Verse 35:40 explicitly mentions \'their partners\'; verse 46:4 ends with a demand for a scripture from before or a trace of knowledge.' },
   { ayah1: '35:44', ayah2: '40:82', category: 'lafzi', noteAr: 'جزء من مجموعة صيغة السير في الأرض (الآيات 12:109، 30:9، 35:44، 40:82، 47:10 تشترك جميعها في هذه العبارة)؛ هذا الزوج هو 35:44 و40:82.', noteEn: 'Part of the \'travel through the land\' formula group (verses 12:109, 30:9, 35:44, 40:82, 47:10 all share this phrase); this pair is 35:44 and 40:82.' },
   { ayah1: '35:44', ayah2: '47:10', category: 'lafzi', noteAr: 'جزء من مجموعة صيغة السير في الأرض (الآيات 12:109، 30:9، 35:44، 40:82، 47:10 تشترك جميعها في هذه العبارة)؛ هذا الزوج هو 35:44 و47:10.', noteEn: 'Part of the \'travel through the land\' formula group (verses 12:109, 30:9, 35:44, 40:82, 47:10 all share this phrase); this pair is 35:44 and 47:10.' },
   { ayah1: '36:35', ayah2: '36:73', category: 'ending_variation', noteAr: 'كلاهما يردان في سورة يس في سياق ذكر النعم من خلق الله ويختمان بـ«أَفَلَا يَشْكُرُونَ» — زوج لفظي داخل السورة يتعثر فيه القرّاء في منتصف السورة.', noteEn: 'Both occur in Surah Ya-Sin in the context of mentioning blessings from Allah\'s creation and conclude with \'Then will they not be grateful?\' — a verbal pair within the surah that readers often stumble over in the middle of the surah.' },
   { ayah1: '36:82', ayah2: '40:68', category: 'lafzi', noteAr: 'كلاهما يحتويان على العبارة نفسها: «إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ» — تطابق لفظي حرفي بين سورتي يس وغافر.', noteEn: 'Both contain the same phrase: \'His command is only when He intends a thing that He says to it, "Be," and it is\' — a verbatim literal match between Surahs Ya-Sin and Ghafir.' },
   { ayah1: '37:47', ayah2: '56:19', category: 'word_swap', noteAr: 'كلاهما يصفان خمر الجنة بأنها لا تضر، لكن الآية 37:47 تستخدم «لَا يُنْزَفُونَ» بينما الآية 56:19 تستخدم «لَا يُنْزِفُونَ» — اختلاف في حركة حرف العلة يغير صيغة الفعل.', noteEn: 'Both describe the wine of Paradise as harmless, but verse 37:47 uses \'lā yunzafūn\' while verse 56:19 uses \'lā yunzifūn\' — a difference in the vowel marking of the weak letter that changes the verb form.' },
   { ayah1: '37:59', ayah2: '44:35', category: 'word_swap', noteAr: 'كلاهما ينفيان وجود شيء بعد الموتة الأولى لكن الآية 37:59 تقول «مَوْتَتَنَا الْأُولَى» بينما الآية 44:35 تقول «مَوْتَتُنَا الْأُولَى» — فرق حرف واحد في لاحقة الملكية.', noteEn: 'Both deny anything after the first death, but verse 37:59 says \'mawtatanā al-ūlā\' while verse 44:35 says \'mawtatunā al-ūlā\' — a one-letter difference in the possessive suffix.' },
   { ayah1: '39:72', ayah2: '40:76', category: 'lafzi', noteAr: 'بالنص: «ادْخُلُوا أَبْوَابَ جَهَنَّمَ خَالِدِينَ فِيهَا ۖ فَبِئْسَ مَثْوَى الْمُتَكَبِّرِينَ»؛ الآية 39:72 تخاطب من أوتوا كتابهم بالشمال، والآية 40:76 تتبع وصف الكافرين المستكبرين.', noteEn: 'By the text: \'Enter the gates of Hell to abide eternally therein, and wretched is the residence of the arrogant.\' Verse 39:72 addresses those who receive their book in their left hand, while verse 40:76 follows the description of the disbelieving arrogant.' },
   { ayah1: '40:56', ayah2: '41:36', category: 'ending_variation', noteAr: 'كلاهما يأمران بالاستعاذة بالله من الكبر أو من نزغات الشيطان ويختمان بـ«السَّمِيعِ» لكن الآية 40:56 تقترن بـ«الْبَصِيرِ» بينما الآية 41:36 تقترن بـ«الْعَلِيمِ».', noteEn: 'Both command seeking refuge in Allah from arrogance or from the whisperings of Satan and end with \'the All-Hearing,\' but verse 40:56 pairs it with \'the All-Seeing\' while verse 41:36 pairs it with \'the All-Knowing.\'' },
   { ayah1: '40:82', ayah2: '47:10', category: 'lafzi', noteAr: 'كلاهما يحتوي على «أَوَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ مِن قَبْلِهِمْ»؛ يُكمل المجموعة مع 12:109/40:82، و12:109/47:10، و30:9/40:82، و30:9/35:44.', noteEn: 'Both contain \'Have they not traveled through the land and observed how was the end of those before them?\' — completing the group with 12:109/40:82, 12:109/47:10, 30:9/40:82, and 30:9/35:44.' },
   { ayah1: '41:25', ayah2: '46:18', category: 'lafzi', noteAr: 'كلاهما يؤكدان أن القول حق على أقوام كما حق على أمم سبقت من الجن والإنس، وأنهم كانوا خاسرين. الآية 41:25 تزيد سياقًا عن قرناء زينوا لهم أعمالهم.', noteEn: 'Both affirm that the word has come into effect upon peoples as it did upon nations before them of jinn and mankind, and that they were losers. Verse 41:25 adds context about companions who adorned their deeds for them.' },
   { ayah1: '43:83', ayah2: '70:42', category: 'lafzi', noteAr: 'بالنص: «فَذَرْهُمْ يَخُوضُوا وَيَلْعَبُوا حَتَّىٰ يُلَاقُوا يَوْمَهُمُ الَّذِي يُوعَدُونَ»؛ الآية 43:83 تتبع الاستهزاء بالساعة، والآية 70:42 تتبع وصف الذين يستعجلون العذاب.', noteEn: 'By the text: \'So leave them to converse vainly and amuse themselves until they meet their Day which they are promised.\' Verse 43:83 follows the mockery of the Hour, while verse 70:42 follows the description of those who hasten the punishment.' },
   { ayah1: '48:28', ayah2: '61:9', category: 'lafzi', noteAr: 'الزوج الثالث في المجموعة الثلاثية (انظر 9:33/48:28 و9:33/61:9): الثلاثة تشترك في البداية عن النبي المرسل بالهدى ليظهره على الدين كله؛ الآيتان 9:33 و61:9 متطابقتان حرفيًا، بينما الآية 48:28 تختم بـ«وَكَفَىٰ بِاللَّهِ شَهِيدًا» بدلًا من «وَلَوْ كَرِهَ الْمُشْرِكُونَ».', noteEn: 'The third pair in the triadic group (see 9:33/48:28 and 9:33/61:9): all three share the opening about the Prophet sent with guidance to make it prevail over all religion; verses 9:33 and 61:9 are identical verbatim, while verse 48:28 concludes with \'And sufficient is Allah as a Witness\' instead of \'Although the polytheists dislike it.\'' },
   { ayah1: '52:24', ayah2: '56:17', category: 'addition_omission', noteAr: 'كلاهما يصفان غلمانًا يخدمون في الجنة لكن الآية 52:24 تزيد التشبيه «كَأَنَّهُمْ لُؤْلُؤٌ مَّكْنُونٌ» بينما الآية 56:17 تصفهم دون هذا التشبيه.', noteEn: 'Both describe youths serving in Paradise, but verse 52:24 adds the simile \'as if they were pearls well-guarded\' while verse 56:17 describes them without this simile.' },
   { ayah1: '53:30', ayah2: '68:7', category: 'lafzi', noteAr: 'جزء من مجموعة ثلاثية (انظر 16:125/68:7 في الدفعة 5 و16:125/53:30 في هذه الدفعة): «رَبُّكَ هُوَ أَعْلَمُ بِمَن ضَلَّ عَن سَبِيلِهِ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ»؛ الآية 53:30 تختم مقطعًا عن الذين يجتنبون كبائر الإثم، والآية 68:7 تتبع أمرًا بعدم طاعة المكذبين.', noteEn: 'Part of a triadic group (see 16:125/68:7 in batch 5 and 16:125/53:30 in this batch): \'Your Lord is most knowing of who has strayed from His way, and He is most knowing of the right-guided.\' Verse 53:30 concludes a passage about those who avoid major sins, while verse 68:7 follows a command not to obey the deniers.' },
   { ayah1: '54:17', ayah2: '54:22', category: 'lafzi', noteAr: 'التكرار «وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ» يتكرر حرفيًا أربع مرات في سورة القمر — الآيتان 54:17 و54:22 هما أول تكرارين.', noteEn: 'The refrain \'And We have certainly made the Quran easy to remember, so is there any who will remember?\' is repeated verbatim four times in Surah Al-Qamar — verses 54:17 and 54:22 are the first two occurrences.' },
   { ayah1: '54:22', ayah2: '54:32', category: 'lafzi', noteAr: 'الآيتان 54:22 و54:32 هما التكرار الثاني والثالث لتكرار سورة القمر — يكملان الزوج الأوسط ويحصران قصتي عاد وثمود بين كل تكرار.', noteEn: 'Verses 54:22 and 54:32 are the second and third occurrences of the Surah Al-Qamar refrain — they form the middle pair and enclose the stories of \'Ad and Thamud between each repetition.' },
   { ayah1: '54:32', ayah2: '54:40', category: 'lafzi', noteAr: 'الآيتان 54:32 و54:40 هما التكرار الثالث والرابع الحرفي لتكرار سورة القمر — يحصران قصتي ثمود وفرعون.', noteEn: 'Verses 54:32 and 54:40 are the third and fourth verbatim occurrences of the Surah Al-Qamar refrain — they enclose the stories of Thamud and Pharaoh.' },
   { ayah1: '55:13', ayah2: '55:16', category: 'lafzi', noteAr: 'التكرار «فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ» يتكرر 31 مرة في سورة الرحمن — الآيتان 55:13 و55:16 زوج متجاور.', noteEn: 'The refrain \'So which of the favors of your Lord would you deny?\' is repeated 31 times in Surah Ar-Rahman — verses 55:13 and 55:16 are an adjacent pair.' },
   { ayah1: '55:13', ayah2: '55:18', category: 'lafzi', noteAr: 'تكرار سورة الرحمن — الآيتان 55:13 و55:18 تفصل بينهما آيتان، لاختبار هل يواصل القارئ أم يتجاوز.', noteEn: 'Surah Ar-Rahman refrain — verses 55:13 and 55:18 are separated by two verses, testing whether the reader continues or skips.' },
   { ayah1: '55:13', ayah2: '55:21', category: 'lafzi', noteAr: 'تكرار سورة الرحمن — 55:13 و55:21.', noteEn: 'Surah Ar-Rahman refrain — 55:13 and 55:21.' },
   { ayah1: '55:13', ayah2: '55:23', category: 'lafzi', noteAr: 'تكرار سورة الرحمن — 55:13 و55:23.', noteEn: 'Surah Ar-Rahman refrain — 55:13 and 55:23.' },
   { ayah1: '55:16', ayah2: '55:18', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:16 و55:18 — زوج متجاور يتبع خلق الإنسان والجان من نار وطين.', noteEn: 'Surah Ar-Rahman refrain at 55:16 and 55:18 — an adjacent pair following the creation of man and jinn from fire and clay.' },
   { ayah1: '55:18', ayah2: '55:21', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:18 و55:21 — يتبع وصف المشرقين والمغربين.', noteEn: 'Surah Ar-Rahman refrain at 55:18 and 55:21 — following the description of the two easts and two wests.' },
   { ayah1: '55:21', ayah2: '55:23', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:21 و55:23 — يتبع وصف اللؤلؤ والمرجان من البحرين.', noteEn: 'Surah Ar-Rahman refrain at 55:21 and 55:23 — following the description of pearls and coral from the two seas.' },
   { ayah1: '55:23', ayah2: '55:25', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:23 و55:25 — زوج متجاور يحيط بوصف الجوار المنشآت كالأعلام.', noteEn: 'Surah Ar-Rahman refrain at 55:23 and 55:25 — an adjacent pair surrounding the description of the ships sailing like mountains.' },
   { ayah1: '55:25', ayah2: '55:28', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:25 و55:28 — يتبع بيان أن كل من عليها فان.', noteEn: 'Surah Ar-Rahman refrain at 55:25 and 55:28 — following the statement that all upon the earth will perish.' },
   { ayah1: '55:28', ayah2: '55:30', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:28 و55:30 — يحيطان بالآية عن أن كل شيء يسأله.', noteEn: 'Surah Ar-Rahman refrain at 55:28 and 55:30 — they surround the verse about everything asking of Him.' },
   { ayah1: '55:30', ayah2: '55:32', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:30 و55:32 — زوج التكرار الأقرب إلى وسط السورة، يتبع الوعد بالفراغ للثقلين.', noteEn: 'Surah Ar-Rahman refrain at 55:30 and 55:32 — the refrain pair closest to the middle of the surah, following the promise to attend to the two weighty ones (mankind and jinn).' },
   { ayah1: '55:32', ayah2: '55:34', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:32 و55:34 — يتبع التحدي بنفاذ أقطار السموات.', noteEn: 'Surah Ar-Rahman refrain at 55:32 and 55:34 — following the challenge to penetrate the regions of the heavens.' },
   { ayah1: '55:34', ayah2: '55:36', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:34 و55:36 — يتبع إرسال شواظ من نار ونحاس على الثقلين.', noteEn: 'Surah Ar-Rahman refrain at 55:34 and 55:36 — following the sending of a flame of fire and smoke upon the two weighty ones.' },
   { ayah1: '55:36', ayah2: '55:38', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:36 و55:38 — يتبع انشقاق السماء كالدهان يوم القيامة.', noteEn: 'Surah Ar-Rahman refrain at 55:36 and 55:38 — following the splitting of the sky like rose oil on the Day of Resurrection.' },
   { ayah1: '55:38', ayah2: '55:40', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:38 و55:40 — يتبع مساءلة الثقلين عن ذنوبهم في ذلك اليوم.', noteEn: 'Repetition in Surah Ar-Rahman at 55:38 and 55:40 — follows the questioning of the two burdens (thaqalayn) about their sins on that day.' },
   { ayah1: '55:40', ayah2: '55:42', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:40 و55:42 — يتبع وصف المجرمين يعرفون بسيماهم.', noteEn: 'Repetition in Surah Ar-Rahman at 55:40 and 55:42 — follows the description of the criminals being recognized by their marks.' },
   { ayah1: '55:42', ayah2: '55:45', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:42 و55:45 — يتبع وصف جهنم مع الحميم.', noteEn: 'Repetition in Surah Ar-Rahman at 55:42 and 55:45 — follows the description of Hell with boiling water (hamim).' },
   { ayah1: '55:45', ayah2: '55:47', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:45 و55:47 — الانتقال إلى مقاطع الجنة في السورة.', noteEn: 'Repetition in Surah Ar-Rahman at 55:45 and 55:47 — transition to the Paradise passages in the surah.' },
   { ayah1: '55:47', ayah2: '55:49', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:47 و55:49 — في وصف الجنتين وأفنانهما.', noteEn: 'Repetition in Surah Ar-Rahman at 55:47 and 55:49 — in the description of the two gardens and their branches.' },
   { ayah1: '55:49', ayah2: '55:51', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:49 و55:51 — يتبع العينين الجاريتين.', noteEn: 'Repetition in Surah Ar-Rahman at 55:49 and 55:51 — follows the two flowing springs.' },
   { ayah1: '55:51', ayah2: '55:53', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:51 و55:53 — يتبع وصف كل فاكهة زوجين.', noteEn: 'Repetition in Surah Ar-Rahman at 55:51 and 55:53 — follows the description of every fruit in pairs.' },
   { ayah1: '55:53', ayah2: '55:55', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:53 و55:55 — يتبع وصف المؤمنين متكئين على فرش.', noteEn: 'Repetition in Surah Ar-Rahman at 55:53 and 55:55 — follows the description of the believers reclining on couches.' },
   { ayah1: '55:55', ayah2: '55:57', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:55 و55:57 — يتبع وصف الحور قاصرات الطرف اللواتي لم يطمثهن إنس قبلهم ولا جان.', noteEn: 'Repetition in Surah Ar-Rahman at 55:55 and 55:57 — follows the description of the houris with restrained glances whom no man or jinn has touched before.' },
   { ayah1: '55:57', ayah2: '55:59', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:57 و55:59 — يتبع تشبيه الحور بالياقوت والمرجان.', noteEn: 'Repetition in Surah Ar-Rahman at 55:57 and 55:59 — follows the likening of the houris to rubies and coral.' },
   { ayah1: '55:59', ayah2: '55:61', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:59 و55:61 — يتبع الآية التي تنص على أن جزاء الإحسان إلا الإحسان.', noteEn: 'Repetition in Surah Ar-Rahman at 55:59 and 55:61 — follows the verse stating that the reward of goodness is nothing but goodness.' },
   { ayah1: '55:61', ayah2: '55:63', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:61 و55:63 — الانتقال إلى الجنتين الثانية.', noteEn: 'Repetition in Surah Ar-Rahman at 55:61 and 55:63 — transition to the second pair of gardens.' },
   { ayah1: '55:63', ayah2: '55:65', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:63 و55:65 — في وصف الجنتين مدهامتان.', noteEn: 'Repetition in Surah Ar-Rahman at 55:63 and 55:65 — in the description of the two gardens dark green with foliage.' },
   { ayah1: '55:65', ayah2: '55:67', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:65 و55:67 — يتبع العينين النضاختين.', noteEn: 'Repetition in Surah Ar-Rahman at 55:65 and 55:67 — follows the two gushing springs.' },
   { ayah1: '55:67', ayah2: '55:69', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:67 و55:69 — يتبع الفواكه والنخل والرمان.', noteEn: 'Repetition in Surah Ar-Rahman at 55:67 and 55:69 — follows the fruits, date palms, and pomegranates.' },
   { ayah1: '55:69', ayah2: '55:71', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:69 و55:71 — يتبع وصف الخيرات الحسان.', noteEn: 'Repetition in Surah Ar-Rahman at 55:69 and 55:71 — follows the description of good and beautiful ones (khayrat hisan).' },
   { ayah1: '55:71', ayah2: '55:73', category: 'lafzi', noteAr: 'تكرار سورة الرحمن عند 55:71 و55:73 — يتبع الحور المقصورات في الخيام.', noteEn: 'Repetition in Surah Ar-Rahman at 55:71 and 55:73 — follows the houris restricted to pavilions.' },
{ ayah1: '55:73', ayah2: '55:75', category: 'lafzi', noteAr: 'التكرار في سورة الرحمن عند 55:73 و55:75 — بعد ذكر الحور اللاتي لم يطمثهن إنس ولا جان قبلهن.', noteEn: 'Repetition in Surah Ar-Rahman at 55:73 and 55:75 — after mentioning the houris whom no man or jinn has touched before them.' },
  { ayah1: '55:75', ayah2: '55:77', category: 'lafzi', noteAr: 'التكرار في سورة الرحمن عند 55:75 و55:77 — آخر تكرارين، يختتمان وصف الزوجين الثانيين من الجنان والسورة نفسها.', noteEn: 'Repetition in Surah Ar-Rahman at 55:75 and 55:77 — the last two repetitions, concluding the description of the second pair of gardens and the surah itself.' },
  { ayah1: '56:8', ayah2: '56:27', category: 'ending_variation', noteAr: 'كلاهما يستخدم السؤال البلاغي \'wa ashab al-yamin ma ashab al-yamin\' لكن 56:8 تقدم الفرق الثلاثة معًا بينما 56:27 تبدأ الوصف المخصص لأصحاب اليمين.', noteEn: 'Both use the rhetorical question \'wa ashab al-yamin ma ashab al-yamin\' but 56:8 introduces the three divisions together while 56:27 begins the description dedicated to the companions of the right.' },
  { ayah1: '56:74', ayah2: '56:96', category: 'lafzi', noteAr: 'الأمر \'fa sabbih bismi rabbika al-\'azim\' يختتم وسط سورة الواقعة وآخرها بنفس اللفظ.', noteEn: 'The command \'fa sabbih bismi rabbika al-\'azim\' concludes the middle and the end of Surah Al-Waqi\'ah with the exact same wording.' },
  { ayah1: '56:74', ayah2: '69:52', category: 'lafzi', noteAr: 'نفس الأمر الختامي \'fa sabbih bismi rabbika al-\'azim\' يظهر بنفس الصيغة في ختام سورة الواقعة وختام سورة الحاقة.', noteEn: 'The same closing command \'fa sabbih bismi rabbika al-\'azim\' appears with identical wording at the end of Surah Al-Waqi\'ah and the end of Surah Al-Haqqah.' },
  { ayah1: '56:74', ayah2: '87:1', category: 'word_swap', noteAr: '87:1 \'sabbih isma rabbika al-a\'la\' و56:74 \'fa sabbih bismi rabbika al-\'azim\' يأمران بتسبيح اسم الرب لكن يختلفان في الصفة الإلهية: الأعلى مقابل العظيم.', noteEn: '87:1 \'sabbih isma rabbika al-a\'la\' and 56:74 \'fa sabbih bismi rabbika al-\'azim\' both command glorifying the name of the Lord but differ in the divine attribute: al-A\'la (the Most High) versus al-\'Azim (the Almighty).' },
  { ayah1: '57:1', ayah2: '59:1', category: 'word_swap', noteAr: '57:1 تبدأ \'sabbaha lillahi ma fi al-samawati wa al-ard\' (بدون \'ma fi\' ثانية) بينما 59:1 تقول \'wa ma fi al-ard\' — إدراج كلمة واحدة يُعد من أكثر الفروق اختبارًا بين سور المسبحات الخمس.', noteEn: '57:1 begins \'sabbaha lillahi ma fi al-samawati wa al-ard\' (without a second \'ma fi\') while 59:1 says \'wa ma fi al-ard\' — a single-word insertion that is one of the most tested differences among the five Musabbihah surahs.' },
  { ayah1: '57:1', ayah2: '62:1', category: 'word_swap', noteAr: '57:1 تستخدم \'sabbaha\' (الماضي) بينما 62:1 تستخدم \'yusabbihu\' (المضارع) — تحول الزمن في سور المسبحات هو نقطة انتباه رئيسية للمراجعة.', noteEn: '57:1 uses \'sabbaha\' (past tense) while 62:1 uses \'yusabbihu\' (present tense) — the tense shift in the Musabbihah surahs is a key point of attention for review.' },
  { ayah1: '57:21', ayah2: '62:4', category: 'lafzi', noteAr: 'صيغة ختامية حرفية: \'ذَلِكَ فَضْلُ اللَّهِ يُؤْتِيهِ مَنْ يَشَاءُ وَاللَّهُ ذُو الْفَضْلِ الْعَظِيمِ\'؛ 57:21 تختتم الدعوة إلى المسابقة إلى مغفرة الله، و62:4 تتبع وصف النبي المرسل إلى الأميين.', noteEn: 'Verbatim closing formula: \'ذَلِكَ فَضْلُ اللَّهِ يُؤْتِيهِ مَنْ يَشَاءُ وَاللَّهُ ذُو الْفَضْلِ الْعَظِيمِ\'; 57:21 concludes the call to race toward Allah\'s forgiveness, and 62:4 follows the description of the Prophet sent to the unlettered.' },
  { ayah1: '59:1', ayah2: '61:1', category: 'lafzi', noteAr: '59:1 (الحشر) و61:1 (الصف) متطابقتان حرفيًا في افتتاحهما: \'sabbaha lillahi ma fi al-samawati wa ma fi al-ard wa huwa al-\'aziz al-hakim\'.', noteEn: '59:1 (Al-Hashr) and 61:1 (As-Saff) are verbatim identical in their opening: \'sabbaha lillahi ma fi al-samawati wa ma fi al-ard wa huwa al-\'aziz al-hakim\'.' },
  { ayah1: '59:23', ayah2: '59:24', category: 'ending_variation', noteAr: 'آيتان ختاميتان متتاليتان من سورة الحشر تسردان مجموعات من الأسماء الحسنى — 59:23 تنتهي بـ \'subhanallah \'amma yushrikun\' بينما 59:24 تنتهي بـ \'al-\'aziz al-hakim\'.', noteEn: 'Two consecutive closing verses of Surah Al-Hashr listing sets of the Most Beautiful Names — 59:23 ends with \'subhanallah \'amma yushrikun\' while 59:24 ends with \'al-\'aziz al-hakim\'.' },
  { ayah1: '60:4', ayah2: '60:6', category: 'word_swap', noteAr: '60:4 \'qad kanat lakum uswatun hasanatun fi Ibrahim\' و60:6 \'laqad kana lakum fihim uswatun hasanatun\' تدعوان إبراهيم عليه السلام كأسوة في سورة الممتحنة لكن تختلفان في فعل التصدير وحرف الجر.', noteEn: '60:4 \'qad kanat lakum uswatun hasanatun fi Ibrahim\' and 60:6 \'laqad kana lakum fihim uswatun hasanatun\' both present Ibrahim (peace be upon him) as an example in Surah Al-Mumtahanah but differ in the introductory verb and preposition.' },
  { ayah1: '60:8', ayah2: '60:9', category: 'word_swap', noteAr: 'كلاهما يبدأان بنفس الصيغة لكن 60:8 تقول \'lam yuqatilukum\' (لم يقاتلوكم) بينما 60:9 تقول \'qatalukum\' (قاتلوكم)، مما يغير الحكم تمامًا.', noteEn: 'Both begin with the same formula but 60:8 says \'lam yuqatilukum\' (they did not fight you) while 60:9 says \'qatalukum\' (they fought you), completely changing the ruling.' },
  { ayah1: '62:1', ayah2: '64:1', category: 'lafzi', noteAr: '62:1 (الجمعة) و64:1 (التغابن) تفتتحان بـ \'yusabbihu lillahi ma fi al-samawati wa ma fi al-ard\' باستخدام صيغة المضارع، على عكس الماضي \'sabbaha\' في بقية سور المسبحات.', noteEn: '62:1 (Al-Jumu\'ah) and 64:1 (At-Taghabun) open with \'yusabbihu lillahi ma fi al-samawati wa ma fi al-ard\' using the present tense, unlike the past tense \'sabbaha\' in the rest of the Musabbihah surahs.' },
  { ayah1: '67:3', ayah2: '71:15', category: 'lafzi', noteAr: 'كلاهما يصف خلق الله سبع سماوات طباقًا بعبارة متطابقة تقريبًا \'khalaqa sab\'a samawatin tibaqan\'.', noteEn: 'Both describe Allah\'s creation of seven heavens in layers with a nearly identical phrase \'khalaqa sab\'a samawatin tibaqan\'.' },
  { ayah1: '68:43', ayah2: '70:44', category: 'lafzi', noteAr: 'كلاهما يصف الكافرين يوم القيامة بـ \'khashi\'atan absaruhum tarhaquhum dhillah\' بعبارة متطابقة تقريبًا في سورتي القلم والمعارج.', noteEn: 'Both describe the disbelievers on the Day of Resurrection as \'khashi\'atan absaruhum tarhaquhum dhillah\' with a nearly identical phrase in Surahs Al-Qalam and Al-Ma\'arij.' },
  { ayah1: '69:19', ayah2: '69:25', category: 'word_swap', noteAr: '69:19 \'fa amma man utiya kitabahu bi yaminihi\' و69:25 \'wa amma man utiya kitabahu bi shimalihi\' تشكلان الثنائي المتوازي الرئيسي في سورة الحاقة — اليمين مقابل الشمال، مع اختلاف تمام في تتمة كل منهما.', noteEn: '69:19 \'fa amma man utiya kitabahu bi yaminihi\' and 69:25 \'wa amma man utiya kitabahu bi shimalihi\' form the main parallel pair in Surah Al-Haqqah — the right versus the left, with a completely different continuation for each.' },
  { ayah1: '69:19', ayah2: '84:7', category: 'lafzi', noteAr: 'كلاهما يصف من أوتي كتابه بيمينه بعبارة \'fa amma man utiya kitabahu bi yaminihi\' — تختلف تتمتها بين السورتين.', noteEn: 'Both describe the one who is given his book in his right hand with the phrase \'fa amma man utiya kitabahu bi yaminihi\' — their continuations differ between the two surahs.' },
  { ayah1: '73:19', ayah2: '74:54', category: 'lafzi', noteAr: 'كلاهما يستخدم \'fa man sha\'a attakhadha ila rabbihi sabila\' بصيغة شبه حرفية في ختام سورتي المزمل والمدثر.', noteEn: 'Both use \'fa man sha\'a attakhadha ila rabbihi sabila\' in near-identical wording at the conclusion of Surahs Al-Muzzammil and Al-Muddaththir.' },
  { ayah1: '73:19', ayah2: '76:29', category: 'word_swap', noteAr: '73:19 تقول \'fa man sha\'a attakhadha ila rabbihi sabila\' بينما 76:29 تقول \'fa man sha\'a ittakhadha ila rabbihi sabila\' — فرق دقيق في صيغة الفعل (attakhadha vs. ittakhadha).', noteEn: '73:19 says \'fa man sha\'a attakhadha ila rabbihi sabila\' while 76:29 says \'fa man sha\'a ittakhadha ila rabbihi sabila\' — a subtle difference in verb form (attakhadha vs. ittakhadha).' },
  { ayah1: '74:19', ayah2: '80:17', category: 'word_swap', noteAr: '80:17 \'qutila al-insan ma akfarah\' و74:19 \'qutila kayfa qaddar\' يستخدمان صيغة اللعن التعجبي \'qutila\' مع مفعولين مختلفين — جحود الإنسان مقابل تخطيطه.', noteEn: '80:17 \'qutila al-insan ma akfarah\' and 74:19 \'qutila kayfa qaddar\' both use the imprecatory-exclamatory form \'qutila\' with two different subjects — man\'s ingratitude versus his scheming.' },
  { ayah1: '74:54', ayah2: '80:11', category: 'pronoun_shift', noteAr: '74:54 تقول \'innahu tadhkira\' (ضمير مذكر) بينما 80:11 تقول \'innaha tadhkira\' (ضمير مؤنث) — حرف واحد يغير الجنس النحوي للمرجع.', noteEn: '74:54 says \'innahu tadhkira\' (masculine pronoun) while 80:11 says \'innaha tadhkira\' (feminine pronoun) — a single letter changes the grammatical gender of the referent.' },
  { ayah1: '75:31', ayah2: '75:32', category: 'word_swap', noteAr: '75:31 \'fa la saddaqa wa la salla\' و75:32 \'wa lakin kadhdhaba wa tawalla\' ثنائي متضاد متتالي في سورة القيامة، تركيبهما المتوازي يسهّل الخطأ في تحديد حد الآية.', noteEn: '75:31 \'fa la saddaqa wa la salla\' and 75:32 \'wa lakin kadhdhaba wa tawalla\' are consecutive contrasting pairs in Surat Al-Qiyamah; their parallel structure makes it easy to mistake the verse boundary.' },
  { ayah1: '77:15', ayah2: '77:19', category: 'lafzi', noteAr: 'التكرار \'wa aylun yawma\'idhin lil-mukadhdhibin\' يتكرر 10 مرات في سورة المرسلات — 77:15 و77:19 هما أول تكرارين، بعد الآيات الكونية من الريح والماء.', noteEn: 'The refrain \'wa aylun yawma\'idhin lil-mukadhdhibin\' repeats 10 times in Surat Al-Mursalat — 77:15 and 77:19 are the first two occurrences, following the cosmic verses about wind and water.' },
  { ayah1: '77:19', ayah2: '77:24', category: 'lafzi', noteAr: 'تكرار سورة المرسلات عند 77:19 و77:24 — التكرار الثاني والثالث، بعد خلق الإنسان من الماء.', noteEn: 'The Surah Al-Mursalat refrain at 77:19 and 77:24 — the second and third occurrences, after the creation of man from water.' },
  { ayah1: '77:24', ayah2: '77:28', category: 'lafzi', noteAr: 'تكرار سورة المرسلات عند 77:24 و77:28 — التكرار الثالث والرابع، بعد وصف المثوى في الأرض.', noteEn: 'The Surah Al-Mursalat refrain at 77:24 and 77:28 — the third and fourth occurrences, after the description of dwelling in the earth.' },
  { ayah1: '77:28', ayah2: '77:34', category: 'lafzi', noteAr: 'تكرار سورة المرسلات عند 77:28 و77:34 — الفاصل البالغ ست آيات بين هذين التكرارين يسهّل استئناف التكرار في غير موضعه.', noteEn: 'The Surah Al-Mursalat refrain at 77:28 and 77:34 — the six-verse gap between these two occurrences makes it easy to resume the refrain at the wrong place.' },
  { ayah1: '77:34', ayah2: '77:37', category: 'lafzi', noteAr: 'تكرار سورة المرسلات عند 77:34 و77:37 — يفصل بينهما ثلاث آيات فقط، مما يسهّل تكرار اللفظ نفسه مرتين في التلاوة.', noteEn: 'The Surah Al-Mursalat refrain at 77:34 and 77:37 — only three verses separate them, making it easy to repeat the same phrase twice in recitation.' },
  { ayah1: '77:37', ayah2: '77:40', category: 'lafzi', noteAr: 'تكرار سورة المرسلات عند 77:37 و77:40 — التكراران السابع والثامن، حول التحدي \'fa in kana lakum kaydun fa kidun\'.', noteEn: 'The Surah Al-Mursalat refrain at 77:37 and 77:40 — the seventh and eighth occurrences, surrounding the challenge \'fa in kana lakum kaydun fa kidun\'.' },
  { ayah1: '77:40', ayah2: '77:45', category: 'lafzi', noteAr: 'تكرار سورة المرسلات عند 77:40 و77:45 — التكراران الثامن والتاسع، يفصل بينهما الأمر الانتقالي للمكذبين.', noteEn: 'The Surah Al-Mursalat refrain at 77:40 and 77:45 — the eighth and ninth occurrences, separated by the transitional address to the deniers.' },
  { ayah1: '77:45', ayah2: '77:47', category: 'lafzi', noteAr: 'تكرار سورة المرسلات عند 77:45 و77:47 — فاصل آيتين فقط، أقرب تباعد في السورة ومصدر متكرر لأخطاء الدمج.', noteEn: 'The Surah Al-Mursalat refrain at 77:45 and 77:47 — only two verses apart, the closest spacing in the surah and a frequent source of merging errors.' },
  { ayah1: '77:47', ayah2: '77:49', category: 'lafzi', noteAr: 'آخر تكرارين في سورة المرسلات — 77:47 و77:49، التاسع والعاشر، يختتمان البنية البلاغية للسورة.', noteEn: 'The last two refrains in Surat Al-Mursalat — 77:47 and 77:49, the ninth and tenth, concluding the surah\'s rhetorical structure.' },
  { ayah1: '78:4', ayah2: '78:5', category: 'lafzi', noteAr: 'آيتان متتاليتان تقولان \'kalla sa ya\'lamun\' — تكرار حرفي دقيق يستخدم للتأكيد البلاغي في نفس السورة.', noteEn: 'Two consecutive verses both saying \'kalla sa ya\'lamun\' — an exact verbatim repetition used for rhetorical emphasis within the same surah.' },
  { ayah1: '78:4', ayah2: '102:3', category: 'word_swap', noteAr: 'كلاهما يستخدم أسلوب التحذير \'kalla sa/sawfa ta\'lamun\' لكن 78:4-5 تستخدم \'sa ya\'lamun\' بينما 102:3-4 تستخدم \'sawfa ta\'lamun\' مع \'thumma kalla\' لتصعيد التحذير الثاني.', noteEn: 'Both use the warning formula \'kalla sa/sawfa ta\'lamun\', but 78:4-5 uses \'sa ya\'lamun\' while 102:3-4 uses \'sawfa ta\'lamun\' with \'thumma kalla\' to escalate the second warning.' },
  { ayah1: '79:15', ayah2: '88:1', category: 'word_swap', noteAr: '88:1 \'hal ataka hadith al-ghashiyah\' و79:15 \'hal ataka hadith Musa\' كلاهما يستخدم الصيغة البلاغية \'hal ataka hadith...\' — نفس الاستهلال يقدم قصتين مختلفتين.', noteEn: '88:1 \'hal ataka hadith al-ghashiyah\' and 79:15 \'hal ataka hadith Musa\' both use the rhetorical formula \'hal ataka hadith...\' — the same opening introduces two different narratives.' },
  { ayah1: '81:6', ayah2: '82:3', category: 'word_swap', noteAr: 'كلاهما يصف البحار يوم القيامة لكن 81:6 تقول \'sujjirat\' بينما 82:3 تقول \'fujjirat\' — نفس بنية الجذر، فعل مختلف.', noteEn: 'Both describe the seas on the Day of Judgment, but 81:6 says \'sujjirat\' while 82:3 says \'fujjirat\' — same root pattern, different verb.' },
  { ayah1: '82:1', ayah2: '84:1', category: 'word_swap', noteAr: 'كلاهما يصف انشقاق السماء — 82:1 تستخدم \'infatarat\' بينما 84:1 تستخدم \'inshaqqat\' — فعلان من جذرين مختلفين بمعنى متقارب.', noteEn: 'Both describe the sky splitting — 82:1 uses \'infatarat\' while 84:1 uses \'inshaqqat\' — two verbs from different roots with similar meaning.' },
  { ayah1: '82:13', ayah2: '83:22', category: 'lafzi', noteAr: 'كلاهما يقرر \'inna al-abrar la fi na\'im\' بنفس اللفظ في سورتي الانفطار والمطففين.', noteEn: 'Both affirm \'inna al-abrar la fi na\'im\' with the exact same wording in Surat Al-Infitar and Surat Al-Mutaffifin.' },
  { ayah1: '83:7', ayah2: '83:19', category: 'word_swap', noteAr: 'كلاهما يستخدم السؤال البلاغي المتوازي \'wa ma adraka ma...\' — 83:7-8 تسأل عن سجين (كتاب الفجار) و83:18-19 تسأل عن عليين (كتاب الأبرار).', noteEn: 'Both use the parallel rhetorical question \'wa ma adraka ma...\' — 83:7-8 asks about Sijjin (the record of the wicked) and 83:18-19 asks about \'Illiyin (the record of the righteous).' },
  { ayah1: '84:7', ayah2: '84:10', category: 'word_swap', noteAr: '84:7 \'fa amma man utiya kitabahu bi yaminihi\' و84:10 \'wa amma man utiya kitabahu wara\'a zahrihi\' هما الشرطان المتوازيان في سورة الانشقاق — اليمين مقابل وراء الظهر.', noteEn: '84:7 \'fa amma man utiya kitabahu bi yaminihi\' and 84:10 \'wa amma man utiya kitabahu wara\'a zahrihi\' are the parallel conditions in Surat Al-Inshiqaq — right hand versus behind the back.' },
  { ayah1: '85:1', ayah2: '86:1', category: 'word_swap', noteAr: '85:1 \'wa al-sama\' dhati al-buruj\' و86:1 \'wa al-sama\' wa al-tariq\' افتتاحيتان متتاليتان للسور تبدأان بالقسم بالسماء — البروج مقابل الطارق.', noteEn: '85:1 \'wa al-sama\' dhati al-buruj\' and 86:1 \'wa al-sama\' wa al-tariq\' — consecutive surah openings beginning with an oath by the sky — \'of the constellations\' versus \'and the night-comer\'.' },
  { ayah1: '89:27', ayah2: '89:28', category: 'ending_variation', noteAr: 'خطاب النفس المطمئنة يمتد على آيتين قصيرتين متتاليتين — 89:27 \'ya ayyatuha al-nafs al-mutma\'innah\' و89:28 \'irji\'i ila rabbiki radiyatan mardiyyah\' — يخطئ الحفاظ في ضمّهما أو فصلهما.', noteEn: 'The address to the tranquil soul spans two short consecutive verses — 89:27 \'ya ayyatuha al-nafs al-mutma\'innah\' and 89:28 \'irji\'i ila rabbiki radiyatan mardiyyah\' — memorizers err in either merging or separating them.' },
  { ayah1: '91:9', ayah2: '91:10', category: 'word_swap', noteAr: 'آيتان متتاليتان متضادتان — 91:9 \'qad aflaha man zakkaha\' و91:10 \'qad khaba man dassaha\' — قلبهما خطأ شائع.', noteEn: 'Two consecutive contrasting verses — 91:9 \'qad aflaha man zakkaha\' and 91:10 \'qad khaba man dassaha\' — reversing them is a common error.' },
  { ayah1: '92:5', ayah2: '92:8', category: 'word_swap', noteAr: '92:5 \'fa amma man a\'ta wa ittaqa\' و92:8 \'wa amma man bakhila wa istagh-na\' يشكلان الإطار المتضاد لسورة الليل — توازي \'fa amma\' / \'wa amma\' مع نتائج متعاكسة.', noteEn: '92:5 \'fa amma man a\'ta wa ittaqa\' and 92:8 \'wa amma man bakhila wa istagh-na\' form the contrasting framework of Surat Al-Layl — parallelism of \'fa amma\' / \'wa amma\' with opposite outcomes.' },
  { ayah1: '93:6', ayah2: '93:8', category: 'ending_variation', noteAr: 'الآيات 93:6 و93:7 و93:8 تشكل ثلاثية من أسئلة \'a lam yajidka\' — النهايات \'fa awa\' و\'fa hada\' و\'fa aghna\' يسهل الخلط بينها في التسلسل.', noteEn: 'Verses 93:6, 93:7, and 93:8 form a triad of \'a lam yajidka\' questions — the endings \'fa awa\', \'fa hada\', and \'fa aghna\' are easily confused in sequence.' },
  { ayah1: '94:5', ayah2: '94:6', category: 'lafzi', noteAr: 'الوعد \'fa inna ma\'a al-\'usri yusra\' يتكرر حرفيًا في آيتين متتاليتين — من أكثر الثنائيات اللفظية المتتالية ذكرًا في تعليم التحفيظ.', noteEn: 'The promise \'fa inna ma\'a al-\'usri yusra\' is repeated verbatim in two consecutive verses — one of the most frequently cited consecutive verbal pairs in memorization teaching.' },
  { ayah1: '95:4', ayah2: '95:5', category: 'ending_variation', noteAr: '95:4 \'la qad khalaqna al-insan fi ahsan taqwim\' و95:5 \'thumma radadnahu asfala safilin\' هما الثنائي المتضاد الأساسي في سورة التين — غالبًا ما يُخطأ في تحديد الحد الفاصل بين هاتين الآيتين المتتاليتين.', noteEn: '95:4 \'la qad khalaqna al-insan fi ahsan taqwim\' and 95:5 \'thumma radadnahu asfala safilin\' are the core contrasting pair in Surat At-Tin — the boundary between these two consecutive verses is often misidentified.' },
  { ayah1: '96:1', ayah2: '96:3', category: 'word_swap', noteAr: '96:1 \'iqra\' bismi rabbika alladhi khalaq\' و96:3 \'iqra\' wa rabbuka al-akram\' تبدأان بالأمر \'iqra\'\' لكن تتمتهما مختلفة — الأمر المتكرر بعد آيتين مع تتمة مختلفة.', noteEn: '96:1 \'iqra\' bismi rabbika alladhi khalaq\' and 96:3 \'iqra\' wa rabbuka al-akram\' both begin with the command \'iqra\'\' but have different endings — the repeated command after two verses with a different completion.' },
  { ayah1: '99:7', ayah2: '99:8', category: 'word_swap', noteAr: 'سورة الزلزلة تختتم بثنائي مرآتي: 99:7 \'fa man ya\'mal mithqal dharratin khayran yarahu\' و99:8 \'wa man ya\'mal mithqala dharratin sharran yarahu\' — خيراً مقابل شراً هو التغيير الوحيد.', noteEn: 'Surat Az-Zalzalah concludes with a mirror-image pair: 99:7 \'fa man ya\'mal mithqal dharratin khayran yarahu\' and 99:8 \'wa man ya\'mal mithqala dharratin sharran yarahu\' — \'good\' versus \'evil\' is the only change.' },
  { ayah1: '101:6', ayah2: '101:8', category: 'word_swap', noteAr: 'تراكيب شرطية متوازية في سورة القارعة: 101:6 تصف من ثقلت موازينه في حياة مرضية بينما 101:8 تصف من خفت موازينه في الهاوية — تركيب متشابه، نتائج متعاكسة.', noteEn: 'Parallel conditional structures in Surat Al-Qari\'ah: 101:6 describes whose scales are heavy in a pleasant life while 101:8 describes whose scales are light in the abyss — similar structure, opposite outcomes.' },
  { ayah1: '102:3', ayah2: '102:4', category: 'addition_omission', noteAr: 'كلتا الآيتين تستخدمان \'kalla sawfa ta\'lamun\' لكن 102:4 تزيد \'thumma kalla\' في البداية لتصعيد التحذير — حذف \'thumma\' خطأ شائع في التلاوة.', noteEn: 'Both verses use \'kalla sawfa ta\'lamun\' but 102:4 adds \'thumma kalla\' at the beginning to escalate the warning — dropping \'thumma\' is a common recitation error.' },
  { ayah1: '107:4', ayah2: '107:5', category: 'addition_omission', noteAr: '107:4 تقول \'fa waylun lil-musallin\' و107:5 تحدد \'alladhina hum \'an salatihim sahun\' — كثيرًا ما يلحق الحفاظ الصفة من 107:5 مباشرة بـ 107:4 أو يفصلون بينهما خطأ.', noteEn: '107:4 says \'fa waylun lil-musallin\' and 107:5 specifies \'alladhina hum \'an salatihim sahun\' — memorizers often attach the descriptor from 107:5 directly to 107:4 or incorrectly separate them.' },
  { ayah1: '109:2', ayah2: '109:4', category: 'word_swap', noteAr: '109:2 \'la a\'budu ma ta\'budun\' (جملة فعلية) و109:4 \'wa la ana \'abidun ma \'abadtum\' (جملة اسمية) تؤديان نفس المعنى بصيغتين نحويتين مختلفتين — تحول داخلي دقيق يخلط فيه الحفاظ كثيرًا.', noteEn: '109:2 \'la a\'budu ma ta\'budun\' (verbal sentence) and 109:4 \'wa la ana \'abidun ma \'abadtum\' (nominal sentence) convey the same meaning in two different grammatical forms — a subtle internal shift that memorizers often confuse.' },
  { ayah1: '109:3', ayah2: '109:5', category: 'lafzi', noteAr: '109:3 و109:5 متطابقتان حرفيًا: \'wa la antum \'abiduna ma a\'bud\' — آية مكررة في نفس السورة المكونة من ست آيات، يسهل تكرارها أو تخطيها كليًا.', noteEn: '109:3 and 109:5 are literally identical: \'wa la antum \'abiduna ma a\'bud\' — a repeated verse in the same surah consisting of six verses, easy to repeat or skip entirely.' },
  { ayah1: '112:3', ayah2: '112:4', category: 'ending_variation', noteAr: 'آخر آيتين من سورة الإخلاص — 112:3 \'lam yalid wa lam yulad\' و112:4 \'wa lam yakun lahu kufuwan ahad\' — قصيرتان ومتتاليتان، غالبًا ما يُدمجان أو يُخطأ في حدّهما.', noteEn: 'Last two verses of Surat al-Ikhlas — 112:3 \'lam yalid wa lam yulad\' and 112:4 \'wa lam yakun lahu kufuwan ahad\' — short and consecutive, often merged or mistaken in their boundaries.' },
  { ayah1: '113:1', ayah2: '114:1', category: 'word_swap', noteAr: 'كلتا الآيتين الافتتاحيتين تبدأان بـ \'qul a\'udhu bi rabb\' لكن تختلفان في الكلمة التالية: \'al-falaq\' في سورة الفلق مقابل \'al-nas\' في سورة الناس — تلاوة إحداهما بتتمة الأخرى خطأ شائع في صلاة الليل.', noteEn: 'Both opening verses begin with \'qul a\'udhu bi rabb\' but differ in the following word: \'al-falaq\' in Surat al-Falaq versus \'al-nas\' in Surat an-Nas — reciting one with the continuation of the other is a common mistake in night prayer.' },
];

// Ayah-keyed lookup: "surahId:ayahNumber" ? similar verses
export const srmdnLookup: Record<string, { ayah: string; category: string; noteAr: string }[]> = {

  '101:6': [
    { ayah: '101:8', category: 'word_swap', noteAr: 'زوجان متضادان من المتشابه اللفظي: 101:6 تَصِفُ مَن ثَقُلَت مَوَازِينُهُ (أصحاب الجنة) و101:8 تَصِفُ مَن خَفَّت مَوَازِينُهُ (أصحاب النار) — نفس البنية، نتيجة مختلفة.' },
  ],
  '101:8': [
    { ayah: '101:6', category: 'word_swap', noteAr: 'زوجان متضادان من المتشابه اللفظي: 101:6 تَصِفُ مَن ثَقُلَت مَوَازِينُهُ (أصحاب الجنة) و101:8 تَصِفُ مَن خَفَّت مَوَازِينُهُ (أصحاب النار) — نفس البنية، نتيجة مختلفة.' },
  ],
  '102:3': [
    { ayah: '102:4', category: 'lafzi', noteAr: 'كلاهما يقول \'ثم كلا سوف تعلمون\' — تكرار التحذير، آيتان متتاليتان، نفس النص تماماً.' },
  ],
  '102:4': [
    { ayah: '102:3', category: 'lafzi', noteAr: 'كلاهما يقول \'ثم كلا سوف تعلمون\' — تكرار التحذير، آيتان متتاليتان، نفس النص تماماً.' },
  ],
  '107:4': [
    { ayah: '107:5', category: 'word_swap', noteAr: 'ويل للمصلين — 107:4 تَصِفُ \'الذين هم عن صلاتهم ساهون\' و107:5 تَصِفُ \'الذين هم يراءون\' — غفلة مقابل رياء، آيتان متتاليتان بوصفين مختلفين.' },
  ],
  '107:5': [
    { ayah: '107:4', category: 'word_swap', noteAr: 'ويل للمصلين — 107:4 تَصِفُ \'الذين هم عن صلاتهم ساهون\' و107:5 تَصِفُ \'الذين هم يراءون\' — غفلة مقابل رياء، آيتان متتاليتان بوصفين مختلفين.' },
  ],
  '109:2': [
    { ayah: '109:3', category: 'word_swap', noteAr: '109:2 \'ولا أنتم عابدون ما أعبد\' — الكافرون يرددون: لا أعبد (109:2-3) ولا أنتم عابدون (109:4-5).' },
  ],
  '109:3': [
    { ayah: '109:4', category: 'word_swap', noteAr: '109:3 \'ولا أنتم عابدون ما أعبد\' — نفس بنية 109:2 لكن بترتيب معكوس.' },
    { ayah: '109:2', category: 'word_swap', noteAr: '109:1-6 تبادل لنفي العبادة: 109:2 \'لا أعبد\' (ضمير المتكلم) مقابل 109:3 \'ولا أنتم عابدون\' (ضمير المخاطب).' },
  ],
  '109:4': [
    { ayah: '109:2', category: 'word_swap', noteAr: '109:4 \'ولا أنا عابد\' و109:2 \'لا أعبد\' — كلاهما نفي العبادة عن المتكلم لكن بصيغتين مختلفتين.' },
  ],
  '109:5': [
    { ayah: '109:3', category: 'word_swap', noteAr: '109:5 \'ولا أنتم عابدون\' و109:3 \'ولا أنتم عابدون\' — نفس النص يعود بعد آيتين، يؤكد النفي المتبادل.' },
  ],
  '10:107': [
    { ayah: '10:17', category: 'word_swap', noteAr: 'كلاهما في سياق سورة يونس: \'فمن أظلم...\' — 10:17 \'فمن أظلم ممن افترى على الله كذباً\' مقابل 10:107 في سياق الضر والنفع من الله.' },
  ],
  '10:17': [
    { ayah: '6:21', category: 'lafzi', noteAr: 'نفس الصيغة: \'ومن أظلم ممن افترى على الله كذباً\' — آية متطابقة عبر السورتين.' },
    { ayah: '10:107', category: 'word_swap', noteAr: 'كلاهما في سياق سورة يونس: \'فمن أظلم...\' — 10:17 \'فمن أظلم ممن افترى على الله كذباً\' مقابل 10:107 في سياق الضر والنفع من الله.' },
  ],
  '10:24': [
    { ayah: '18:45', category: 'lafzi', noteAr: 'كلاهما يضرب مثلاً للحياة الدنيا بالماء — 10:24 \'كماء أنزلناه من السماء\' و18:45 \'كماء أنزلناه من السماء\' — نفس المثل يرد في سورتين مختلفتين.' },
  ],
  '10:3': [
    { ayah: '32:4', category: 'word_swap', noteAr: 'كلاهما يذكر أن الله خلق السماوات والأرض في ستة أيام ثم استوى على العرش — 10:3 تستخدم \'ثم استوى على العرش\' و32:4 \'ثم استوى على العرش\' — نفس العبارة لكن 10:3 تضيف \'يدبر الأمر\'.' },
  ],
  '10:38': [
    { ayah: '11:13', category: 'word_swap', noteAr: 'تحدي الإتيان بسورة: 10:38 \'فأتوا بسورة مثله\' و11:13 \'فأتوا بعشر سور مثله\' — نفس التحدي لكن يختلف عدد السور المطلوبة.' },
  ],
  '10:49': [
    { ayah: '7:188', category: 'lafzi', noteAr: 'كلاهما يقول \'لا أملك لنفسي نفعاً ولا ضراً\' — إعلان النبي أنه لا يملك لنفسه نفعاً ولا ضراً.' },
  ],
  '10:61': [
    { ayah: '34:3', category: 'word_swap', noteAr: 'علم الله بالغيب: 10:61 \'وما يعزب عن ربك من مثقال ذرة\' و34:3 \'لا يعزب عنه مثقال ذرة\' — نفس الحقيقة عن علم الله، صياغة مختلفة.' },
  ],
  '10:93': [
    { ayah: '17:9', category: 'lafzi', noteAr: 'كلا الموضعين يذكر النعمة: 10:93 لبني إسرائيل بوطن صالح، و17:9 عن كتاب الله يهدي للتي هي أقوم.' },
  ],
  '112:3': [
    { ayah: '112:4', category: 'word_swap', noteAr: 'سورة الإخلاص: 112:3 \'لم يلد ولم يولد\' و112:4 \'ولم يكن له كفواً أحد\' — آيتان متتاليتان لنفي الولادة والنظير.' },
  ],
  '112:4': [
    { ayah: '112:3', category: 'word_swap', noteAr: 'سورة الإخلاص: 112:3 \'لم يلد ولم يولد\' و112:4 \'ولم يكن له كفواً أحد\' — آيتان متتاليتان لنفي الولادة والنظير.' },
  ],
  '113:1': [
    { ayah: '114:1', category: 'word_swap', noteAr: 'المعوذتان: 113:1 \'قل أعوذ برب الفلق\' و114:1 \'قل أعوذ برب الناس\' — نفس الأمر بالاستعاذة برب مختلف.' },
  ],
  '114:1': [
    { ayah: '113:1', category: 'word_swap', noteAr: 'المعوذتان: 113:1 \'قل أعوذ برب الفلق\' و114:1 \'قل أعوذ برب الناس\' — نفس الأمر بالاستعاذة برب مختلف.' },
  ],
  '11:107': [
    { ayah: '11:108', category: 'word_swap', noteAr: 'هود 11:107-108 زوج متضاد: 11:107 \'خالدين فيها\' (أهل النار) و11:108 \'خالدين فيها\' (أهل الجنة) — نفس الكلمة \'خالدين\' لكن لنتيجتين مختلفتين.' },
  ],
  '11:108': [
    { ayah: '11:107', category: 'word_swap', noteAr: 'هود 11:107-108 زوج متضاد: 11:107 \'خالدين فيها\' (أهل النار) و11:108 \'خالدين فيها\' (أهل الجنة) — نفس الكلمة \'خالدين\' لكن لنتيجتين مختلفتين.' },
  ],
  '11:110': [
    { ayah: '41:45', category: 'lafzi', noteAr: 'كلاهما يقول \'ولقد آتينا موسى الكتاب فاختلف فيه\' — نفس العبارة عن الكتاب المقدس لموسى والاختلاف بعده.' },
  ],  '11:13': [
    { ayah: '10:38', category: 'word_swap', noteAr: 'تحدي الإتيان بسورة: 10:38 \'فأتوا بسورة مثله\' و11:13 \'فأتوا بعشر سور مثله\' — نفس التحدي لكن يختلف عدد السور المطلوبة.' },
  ],
  '11:19': [
    { ayah: '14:21', category: 'word_swap', noteAr: 'كلاهما يصف \'الذين كفروا\' ويذكر \'الآخرة\' لكن 11:19 في الإعراض عن سبيل الله (اعوجاج) و14:21 في الحساب.' },
  ],
  '11:28': [
    { ayah: '11:63', category: 'word_swap', noteAr: 'نوح وصالح — كلاهما يستخدم \'أرأيتم إن كنت على بينة من ربي\' — افتتاحية الدعوة بالحجة.' },
  ],
  '11:31': [
    { ayah: '11:50', category: 'word_swap', noteAr: '11:31 (نوح) \'ولا أقول لكم عندي خزائن الله\' و11:50 (هود) \'وما أسألكم عليه من أجر\' — دعوات الأنبياء ترفض ادعاء المال أو الخزائن.' },
  ],
  '11:40': [
    { ayah: '23:27', category: 'lafzi', noteAr: 'كلاهما يصف الوحي لنوح ببناء السفينة: \'فأوحينا إليه\' مع فعل \'اصنع الفلك\' لكن 11:40 أوسع في السياق.' },
  ],
  '11:50': [
    { ayah: '7:65', category: 'lafzi', noteAr: '7:65 \'وإلى عاد أخاهم هوداً\' و11:50 \'وإلى عاد أخاهم هوداً\' — نفس الصيغة في إرسال هود إلى عاد.' },
    { ayah: '11:61', category: 'lafzi', noteAr: '11:50 (هود) \'يا قوم اعبدوا الله\' و11:61 (صالح) \'يا قوم اعبدوا الله\' — افتتاحية دعوة كل نبي لقومه بنفس الصيغة.' },
    { ayah: '7:73', category: 'lafzi', noteAr: '7:73 \'وإلى ثمود أخاهم صالحاً\' و11:50 \'وإلى عاد أخاهم هوداً\' — نفس صيغة الإرسال لكن لنبي مختلف.' },
  ],
  '11:61': [
    { ayah: '11:50', category: 'lafzi', noteAr: '11:50 (هود) \'يا قوم اعبدوا الله\' و11:61 (صالح) \'يا قوم اعبدوا الله\' — افتتاحية دعوة كل نبي لقومه بنفس الصيغة.' },
  ],
  '11:63': [
    { ayah: '11:28', category: 'word_swap', noteAr: 'نوح وصالح — كلاهما يستخدم \'أرأيتم إن كنت على بينة من ربي\' — افتتاحية الدعوة بالحجة.' },
  ],
  '11:64': [
    { ayah: '7:73', category: 'lafzi', noteAr: 'كلاهما يصف ناقة صالح: 11:64 \'هذه ناقة الله لكم آية\' و7:73 \'هذه ناقة الله لكم آية\' — نفس التقديم للناقة.' },
  ],
  '11:75': [
    { ayah: '9:114', category: 'addition_omission', noteAr: 'كلاهما يصف إبراهيم بأنه \'أواه حليم\' لكن 11:75 تعكس الترتيب إلى \'حليم أواه\' وتضيف \'منيب\' في النهاية.' },
  ],
  '11:84': [
    { ayah: '7:85', category: 'lafzi', noteAr: 'كلاهما يقدّم شعيباً مرسلاً إلى مدين بنفس الدعوة لعبادة الله وحده؛ 7:85 تتابع بأمر الوفاء بالكيل والميزان بالقسط، 11:84 تردد نفس الوصايا الاقتصادية.' },
  ],
  '11:90': [
    { ayah: '85:14', category: 'lafzi', noteAr: '11:90 \'إن ربي رحيم ودود\' و85:14 \'وهو الغفور الودود\' كلاهما يقترن فيه اسم الله \'الودود\' بصفة أخرى — في 11:90 مع \'رحيم\' وفي 85:14 مع \'الغفور\' — مما يجعل \'الودود\' الكلمة الرابطة بينهما.' },
  ],
  '12:102': [
    { ayah: '28:46', category: 'lafzi', noteAr: 'كلاهما يختم قصة يوسف/موسى بإعلام النبي بأنها من أنباء الغيب التي أوحاها الله إليه: \'وما كنت لديهم\' — 12:102 عن إخوة يوسف و28:46 عن موسى في الطور.' },
  ],
  '12:109': [
    { ayah: '30:9', category: 'lafzi', noteAr: 'كلاهما يأمر بالسير في الأرض: 12:109 تذكر سنة الله في إرسال الرسل من أهل القرى و30:9 تذكر عاقبة المكذبين قبلهم.' },
  ],
  '12:22': [
    { ayah: '28:14', category: 'lafzi', noteAr: 'كلاهما يقول \'ولما بلغ أشده\' — يوسف وموسى كلاهما يبلغان أشدهما في هاتين الآيتين.' },
  ],
  '12:40': [
    { ayah: '12:46', category: 'word_swap', noteAr: 'يوسف 12:40: \'إن الحكم إلا لله\' و12:46: \'لعلي أرجع\' — كلاهما في خطاب يوسف لكن لجمهورين مختلفين (السجينان وعزيز مصر).' },
  ],
  '12:43': [
    { ayah: '12:46', category: 'word_swap', noteAr: '12:43 \'وقال الملك إني أرى سبع بقرات سمان\' و12:46 \'يوسف أيها الصديق أفتنا\' — طلب تفسير الرؤيا من الملك إلى يوسف.' },
  ],
  '12:46': [
    { ayah: '12:40', category: 'word_swap', noteAr: 'يوسف 12:40: \'إن الحكم إلا لله\' و12:46: \'لعلي أرجع\' — كلاهما في خطاب يوسف لكن لجمهورين مختلفين (السجينان وعزيز مصر).' },
  ],
  '13:25': [
    { ayah: '2:27', category: 'lafzi', noteAr: 'كلاهما يصف الذين ينقضون عهد الله من بعد ميثاقه — 2:27 \'الذين ينقضون عهد الله من بعد ميثاقه\' و13:25 تطابقها.' },
  ],
  '13:37': [
    { ayah: '2:120', category: 'addition_omission', noteAr: 'كلاهما يحذر من اتباع أهواء أهل الكتاب: 2:120 \'ولن ترضى عنك اليهود ولا النصارى\' و13:37 \'ولئن اتبعت أهواءهم\' — المختلف: 2:120 تنهى عن اتباع ملتهم، 13:37 تنهى عن اتباع أهوائهم.' },
  ],
  '14:21': [
    { ayah: '34:31', category: 'lafzi', noteAr: 'كلاهما يصف تبرؤ الأتباع من القادة — 14:21 و34:31 \'ونحن كنا أتباعاً\' و\'فهل أنتم مغنون\' — نفس حوار التبعية.' },
  ],
  '14:32': [
    { ayah: '16:78', category: 'word_swap', noteAr: 'كلاهما يعدد نعم الله — 14:32 \'الله الذي خلق السماوات والأرض\' و16:78 \'والله أخرجكم من بطون أمهاتكم\' — نعم كونية ونعم شخصية.' },
  ],
  '14:35': [
    { ayah: '29:37', category: 'word_swap', noteAr: '14:35 دعاء إبراهيم \'رب اجعل هذا بلداً آمناً\' و29:37 سياق هلاك مدين — موضوعان مختلفان.' },
  ],
  '15:1': [
    { ayah: '31:3', category: 'word_swap', noteAr: 'كلا السورتين تفتتحان ب \'الر\' — 15:1 \'الر\' و31:3 \'الر\' — سورتان مختلفتان بحروف مقطعة واحدة.' },
  ],
  '15:29': [
    { ayah: '38:72', category: 'lafzi', noteAr: 'كلاهما يصف الأمر الإلهي بعد تسوية خلق آدم ونفخ الروح: \'فإذا سويته ونفخت فيه من روحي فقعوا له ساجدين\' — آية متطابقة عن خلق آدم.' },
  ],
  '16:115': [
    { ayah: '6:145', category: 'lafzi', noteAr: 'كلاهما يذكر المحرمات من الطعام: \'إنما حرم عليكم الميتة والدم ولحم الخنزير\' — نفس قائمة المحرمات.' },
    { ayah: '2:173', category: 'lafzi', noteAr: 'كلاهما يذكر المحرمات: \'إنما حرم عليكم الميتة والدم ولحم الخنزير\' مع استثناء الضرورة.' },
  ],
  '16:125': [
    { ayah: '29:46', category: 'word_swap', noteAr: 'كلاهما يرشد إلى أسلوب الدعوة — 16:125 \'ادع إلى سبيل ربك بالحكمة والموعظة الحسنة\' و29:46 \'ولا تجادلوا أهل الكتاب إلا بالتي هي أحسن\'.' },
  ],
  '16:43': [
    { ayah: '21:7', category: 'lafzi', noteAr: 'كلاهما يقول \'فاسألوا أهل الذكر إن كنتم لا تعلمون\' — آية متطابقة تأمر بسؤال أهل العلم.' },
  ],
  '16:61': [
    { ayah: '35:45', category: 'lafzi', noteAr: 'كلاهما يصف إمهال الله للناس: \'ولو يؤاخذ الله الناس بظلمهم ما ترك عليها من دابة\' — نفس العبارة عن رحمة التأخير.' },
  ],
  '16:66': [
    { ayah: '23:21', category: 'word_swap', noteAr: 'كلاهما يعدد نعم الأنعام — 16:66 \'وإن لكم في الأنعام لعبرة\' و23:21 \'وإن لكم في الأنعام لعبرة\' — افتتاحية متطابقة بتفاصيل مختلفة.' },
  ],
  '16:78': [
    { ayah: '14:32', category: 'word_swap', noteAr: 'كلاهما يعدد نعم الله — 14:32 \'الله الذي خلق السماوات والأرض\' و16:78 \'والله أخرجكم من بطون أمهاتكم\' — نعم كونية ونعم شخصية.' },
  ],
  '17:23': [
    { ayah: '6:151', category: 'lafzi', noteAr: 'كلاهما يوصي بالوالدين إحساناً: \'وبالوالدين إحساناً\' — الوصية نفسها ترد في الإسراء والأنعام.' },
  ],
  '17:31': [
    { ayah: '6:151', category: 'lafzi', noteAr: 'كلاهما ينهى عن قتل الأولاد: \'ولا تقتلوا أولادكم\' — في 17:31 بسبب خشية إملاق (الفقر)، في 6:151 مطلقاً.' },
  ],
  '17:34': [
    { ayah: '6:152', category: 'word_swap', noteAr: 'كلاهما يوصي بمال اليتيم: \'ولا تقربوا مال اليتيم إلا بالتي هي أحسن\' — آية متطابقة.' },
  ],
  '17:83': [
    { ayah: '39:7', category: 'word_swap', noteAr: 'كلاهما يصف طبيعة الإنسان عند النعمة والبلاء — 17:83 \'وإذا أنعمنا على الإنسان أعرض ونأى\' و39:7 \'وإذا مس الإنسان ضر دعا ربه\' — ردود فعل متقابلة.' },
  ],
  '17:9': [
    { ayah: '10:93', category: 'lafzi', noteAr: 'كلا الموضعين يذكر النعمة: 10:93 لبني إسرائيل بوطن صالح، و17:9 عن كتاب الله يهدي للتي هي أقوم.' },
  ],
  '18:110': [
    { ayah: '41:6', category: 'word_swap', noteAr: 'كلاهما يقول \'إنما أنا بشر مثلكم يوحى إلي\' — نفس العبارة يرددها النبي في سورتين.' },
  ],
  '18:2': [
    { ayah: '41:25', category: 'word_swap', noteAr: '18:2 \'قيماً\' عن القرآن، 41:25 عن \'قرناء\' يزينون للكافرين — اختلاف في الموضوع.' },
  ],
  '18:29': [
    { ayah: '76:29', category: 'word_swap', noteAr: 'كلاهما يقول \'فمن شاء فليؤمن ومن شاء فليكفر\' — في 18:29 بعد إنذار النار، في 76:29 في سياق التذكرة.' },
  ],
  '18:45': [
    { ayah: '10:24', category: 'lafzi', noteAr: 'كلاهما يضرب مثلاً للحياة الدنيا بالماء — 10:24 \'كماء أنزلناه من السماء\' و18:45 \'كماء أنزلناه من السماء\' — نفس المثل يرد في سورتين مختلفتين.' },
  ],
  '18:72': [
    { ayah: '18:75', category: 'lafzi', noteAr: 'كلاهما يقول \'ألم أقل لك إنك لن تستطيع معي صبراً\' — تكرار الخضر لنفس التوبيخ لموسى مرتين في السورة.' },
  ],
  '18:75': [
    { ayah: '18:72', category: 'lafzi', noteAr: 'كلاهما يقول \'ألم أقل لك إنك لن تستطيع معي صبراً\' — تكرار الخضر لنفس التوبيخ لموسى مرتين في السورة.' },
  ],
  '19:10': [
    { ayah: '3:41', category: 'lafzi', noteAr: 'كلاهما يصف آية زكريا: \'قال رب اجعل لي آية\' — في 19:10 \'آيتك ألا تكلم الناس ثلاث ليال سوياً\' و3:41 \'ثلاثة أيام إلا رمزاً\'.' },
  ],
  '19:15': [
    { ayah: '19:33', category: 'ending_variation', noteAr: 'كلاهما عن يحيى وعيسى — 19:15 \'وسلام عليه يوم ولد ويوم يموت ويوم يبعث حياً\' و19:33 \'والسلام علي يوم ولدت ويوم أموت ويوم أبعث حياً\' — سلام يحيى بضمير الغائب، سلام عيسى بضمير المتكلم.' },
  ],
  '19:33': [
    { ayah: '19:15', category: 'ending_variation', noteAr: 'كلاهما عن يحيى وعيسى — 19:15 \'وسلام عليه يوم ولد ويوم يموت ويوم يبعث حياً\' و19:33 \'والسلام علي يوم ولدت ويوم أموت ويوم أبعث حياً\' — سلام يحيى بضمير الغائب، سلام عيسى بضمير المتكلم.' },
  ],
  '19:35': [
    { ayah: '3:47', category: 'addition_omission', noteAr: 'كلاهما يصف عدم اتخاذ الله ولداً — 19:35 \'ما كان لله أن يتخذ من ولد\' و3:47 عن بشارة مريم بعيسى.' },
  ],
  '20:111': [
    { ayah: '20:116', category: 'word_swap', noteAr: '20:111 \'وعنت الوجوه للحي القيوم\' و20:116 \'وإذ قلنا للملائكة اسجدوا لآدم\' — موضوعان مختلفان في نفس السورة.' },
  ],
  '20:116': [
    { ayah: '2:34', category: 'lafzi', noteAr: 'كلاهما يقول \'وإذ قلنا للملائكة اسجدوا لآدم فسجدوا إلا إبليس\' — نفس قصة السجود.' },
  ],
  '20:122': [
    { ayah: '2:37', category: 'word_swap', noteAr: 'كلاهما عن توبة آدم — 2:37 \'فتلقى آدم من ربه كلمات\' و20:122 \'ثم اجتباه ربه فتاب عليه\' — قصتان مختلفتان عن توبة آدم.' },
  ],
  '20:128': [
    { ayah: '32:26', category: 'lafzi', noteAr: 'كلاهما يسأل: \'أولم يهد لهم كم أهلكنا من قبلهم من القرون\' — نفس السؤال البلاغي عن هلاك الأمم السابقة.' },
  ],  '20:130': [
    { ayah: '50:39', category: 'lafzi', noteAr: 'كلاهما يأمر بالصبر على ما يقولون والتسبيح بحمد الرب: \'فاصبر على ما يقولون وسبح بحمد ربك\' — نفس الأمر النبوي.' },
  ],
  '20:71': [
    { ayah: '26:49', category: 'lafzi', noteAr: 'كلاهما عن تهديد فرعون للسحرة: \'آمنتم له قبل أن آذن لكم\' — نفس التهديد الفرعوني.' },
  ],
  '21:38': [
    { ayah: '36:48', category: 'lafzi', noteAr: 'كلاهما يسأل: \'متى هذا الوعد إن كنتم صادقين\' — استعجال الكفار بالوعد في سورتين.' },
  ],
  '21:41': [
    { ayah: '36:46', category: 'word_swap', noteAr: 'كلاهما يصف إعراض الكفار عن الآيات: 21:41 \'ولقد استهزئ برسل من قبلك\' و36:46 \'وما تأتيهم من آية\' — تكذيب عام للرسل والآيات.' },
  ],
  '21:7': [
    { ayah: '16:43', category: 'lafzi', noteAr: 'كلاهما يقول \'فاسألوا أهل الذكر إن كنتم لا تعلمون\' — آية متطابقة تأمر بسؤال أهل العلم.' },
  ],
  '21:91': [
    { ayah: '66:12', category: 'lafzi', noteAr: 'كلاهما يصف مريم بنت عمران التي حفظت فرجها فنفخ فيها من روحه — آية متطابقة تقريباً عن مريم.' },
  ],
  '22:14': [
    { ayah: '22:23', category: 'word_swap', noteAr: '22:14 عن جزاء المؤمنين (يدخلهم جنات) و22:23 عن جزاء المؤمنين (يدخلهم جنات) — آيتان متقاربتان في السورة نفسها.' },
  ],
  '22:23': [
    { ayah: '35:33', category: 'lafzi', noteAr: 'كلاهما يصف جنات عدن يدخلونها بحلية الأساور من ذهب ولؤلؤ ولباسهم فيها حرير — وصف متطابق للجنة.' },
  ],
  '22:62': [
    { ayah: '31:30', category: 'lafzi', noteAr: 'كلاهما يقول \'ذلك بأن الله هو الحق\' مضموناً — توحيد الله وإبطال الشرك.' },
  ],
  '22:8': [
    { ayah: '31:20', category: 'word_swap', noteAr: '22:8 \'ومن الناس من يجادل في الله بغير علم\' و31:20 \'ألم تروا أن الله سخر لكم\' — جدال مقابل تسخير.' },
  ],
  '23:21': [
    { ayah: '16:66', category: 'word_swap', noteAr: 'كلاهما يعدد نعم الأنعام — 16:66 \'وإن لكم في الأنعام لعبرة\' و23:21 \'وإن لكم في الأنعام لعبرة\' — افتتاحية متطابقة بتفاصيل مختلفة.' },
  ],
  '23:27': [
    { ayah: '11:40', category: 'lafzi', noteAr: 'كلاهما يصف الوحي لنوح ببناء السفينة: \'فأوحينا إليه\' مع فعل \'اصنع الفلك\' لكن 11:40 أوسع في السياق.' },
  ],
  '23:5': [
    { ayah: '70:29', category: 'lafzi', noteAr: 'كلاهما يصف المؤمنين بأنهم \'لفروجهم حافظون\' — نفس صفة المؤمنين.' },
  ],
  '23:51': [
    { ayah: '2:172', category: 'word_swap', noteAr: 'كلاهما يأمر بالأكل من الطيبات والعمل الصالح — 23:51 \'كلوا من الطيبات واعملوا صالحاً\' و2:172 \'كلوا من طيبات ما رزقناكم\'.' },
  ],
  '23:6': [
    { ayah: '70:30', category: 'lafzi', noteAr: 'كلاهما يقول \'إلا على أزواجهم أو ما ملكت أيمانهم\' — نفس الاستثناء.' },
  ],
  '23:78': [
    { ayah: '32:9', category: 'lafzi', noteAr: 'كلاهما يصف نعم السمع والبصر والأفئدة: \'والله أخرجكم من بطون أمهاتكم\' (النحل) لكن 23:78 \'وهو الذي أنشأ لكم السمع والأبصار\' و32:9 \'وجعل لكم السمع والأبصار\'.' },
  ],
  '23:82': [
    { ayah: '37:16', category: 'lafzi', noteAr: 'كلاهما يقول \'أئذا متنا وكنا تراباً وعظاماً أئنا لمبعوثون\' — استفهام الكفار عن البعث.' },
  ],
  '24:5': [
    { ayah: '24:61', category: 'word_swap', noteAr: '24:5 توبة للمؤمنين المذنبين (من آية الزنا) و24:61 رخصة للمؤمنين في الأكل مع ذوي الأعذار — موضوعان مختلفان.' },
  ],
  '24:61': [
    { ayah: '48:17', category: 'word_swap', noteAr: 'كلاهما يذكر الأعذار: 24:61 \'ليس على الأعمى حرج\' و48:17 \'ليس على الأعمى حرج\' — آية متطابقة عن التخفيف.' },
  ],
  '25:59': [
    { ayah: '32:4', category: 'word_swap', noteAr: 'كلاهما يذكر خلق السماوات والأرض في ستة أيام ثم استوى على العرش — 25:59 \'ثم استوى على العرش الرحمن\' و32:4 \'ثم استوى على العرش\'.' },
  ],
  '26:109': [
    { ayah: '26:127', category: 'lafzi', noteAr: 'كلاهما يقول \'وما أسألكم عليه من أجر إن أجري إلا على رب العالمين\' — أيوب ونوح وهود وصالح ولوط وشعيب كلهم يرددونها.' },
  ],
  '26:127': [
    { ayah: '26:145', category: 'addition_omission', noteAr: 'أيوب (26:127) وهود (26:145) — كلاهما يقول \'وما أسألكم عليه من أجر إن أجري إلا على رب العالمين\' — نفس العبارة لنبيين مختلفين.' },
  ],
  '26:145': [
    { ayah: '26:164', category: 'lafzi', noteAr: '26:145 (هود) و26:164 (لوط) — كلاهما يقول \'وما أسألكم عليه من أجر\' — نفس العبارة لمتداخلة في سورة الشعراء.' },
  ],
  '26:164': [
    { ayah: '26:180', category: 'lafzi', noteAr: '26:164 (لوط) و26:180 (شعيب) — كلاهما يقول \'وما أسألكم عليه من أجر إن أجري إلا على رب العالمين\' — العبارة الرابطة بين قصص الشعراء.' },
  ],
  '26:173': [
    { ayah: '26:49', category: 'word_swap', noteAr: '26:173 عن عذاب قوم لوط \'وأمطرنا عليهم مطراً\' و26:49 عن تهديد فرعون للسحرة — موضوعان مختلفان.' },
  ],
  '26:180': [
    { ayah: '26:164', category: 'lafzi', noteAr: '26:164 (لوط) و26:180 (شعيب) — كلاهما يقول \'وما أسألكم عليه من أجر إن أجري إلا على رب العالمين\' — العبارة الرابطة بين قصص الشعراء.' },
  ],
  '26:49': [
    { ayah: '20:71', category: 'lafzi', noteAr: 'كلاهما عن تهديد فرعون للسحرة: \'آمنتم له قبل أن آذن لكم\' — نفس التهديد الفرعوني.' },
  ],
  '27:1': [
    { ayah: '31:3', category: 'word_swap', noteAr: 'كلا السورتين تفتتحان بالحروف المقطعة: 27:1 \'طس\' و31:3 \'الر\' — افتتاحيتان مختلفتان.' },
  ],
  '27:10': [
    { ayah: '28:31', category: 'lafzi', noteAr: 'كلاهما يصف عصا موسى في قصة الطور: \'وألق عصاك\' مع تحولها إلى حية — 27:10 و28:31 قصة متطابقة تقريباً.' },
  ],
  '27:19': [
    { ayah: '46:15', category: 'word_swap', noteAr: '27:19 دعاء سليمان \'رب أوزعني أن أشكر نعمتك\' و46:15 دعاء المؤمن \'رب أوزعني أن أشكر نعمتك\' — نفس الدعاء.' },
  ],
  '27:2': [
    { ayah: '31:4', category: 'word_swap', noteAr: 'كلا السورتين تمدح المؤمنين: 27:2 \'هدى وبشرى للمؤمنين\' و31:4 \'الذين يقيمون الصلاة\' — وصف المؤمنين في مقطعين مختلفين.' },
  ],
  '27:3': [
    { ayah: '31:4', category: 'word_swap', noteAr: '27:3 \'الذين يقيمون الصلاة\' و31:4 \'الذين يقيمون الصلاة\' — نفس العبارة عن صفة المؤمنين.' },
  ],
  '27:55': [
    { ayah: '7:81', category: 'ending_variation', noteAr: 'كلاهما يصف قوم لوط يأتون الرجال شهوة لكن 7:81 تنتهي بِـ \'مسرفون\' بينما 27:55 تنتهي بِـ \'تجهلون\'.' },
  ],
  '27:58': [
    { ayah: '26:173', category: 'word_swap', noteAr: 'كلاهما يصف عذاب قوم لوط: 27:58 \'وأمطرنا عليهم مطراً\' و26:173 \'وأمطرنا عليهم مطراً\' — وصف متطابق لهلاك قوم لوط.' },
  ],
  '27:81': [
    { ayah: '30:53', category: 'lafzi', noteAr: 'كلاهما يقول \'وما أنت بهاد العمي عن ضلالتهم\' — في النمل والروم.' },
  ],
  '27:87': [
    { ayah: '39:68', category: 'lafzi', noteAr: 'كلاهما يذكر النفخ في الصور: 27:87 \'ويوم ينفخ في الصور\' و39:68 \'ونفخ في الصور\' — نفس الحدث العظيم.' },
  ],
  '28:14': [
    { ayah: '12:22', category: 'lafzi', noteAr: 'كلاهما يقول \'ولما بلغ أشده\' — يوسف وموسى كلاهما يبلغان أشدهما في هاتين الآيتين.' },
  ],
  '28:20': [
    { ayah: '36:20', category: 'word_swap', noteAr: '28:20 \'وجاء رجل من أقصى المدينة يسعى\' و36:20 \'وجاء من أقصى المدينة رجل يسعى\' — نفس العبارة بترتيب كلمات مختلف.' },
  ],
  '28:31': [
    { ayah: '27:10', category: 'lafzi', noteAr: 'كلاهما يصف عصا موسى في قصة الطور: \'وألق عصاك\' مع تحولها إلى حية — 27:10 و28:31 قصة متطابقة تقريباً.' },
  ],
  '28:46': [
    { ayah: '12:102', category: 'lafzi', noteAr: 'كلاهما يختم قصة يوسف/موسى بإعلام النبي بأنها من أنباء الغيب التي أوحاها الله إليه: \'وما كنت لديهم\' — 12:102 عن إخوة يوسف و28:46 عن موسى في الطور.' },
  ],
  '28:62': [
    { ayah: '28:74', category: 'lafzi', noteAr: 'كلاهما يسأل: \'أين شركائي\' — سؤال الله للمشركين يوم القيامة يتكرر في نفس السورة.' },
  ],
  '28:74': [
    { ayah: '28:62', category: 'lafzi', noteAr: 'كلاهما يسأل: \'أين شركائي\' — سؤال الله للمشركين يوم القيامة يتكرر في نفس السورة.' },
  ],
  '29:37': [
    { ayah: '7:78', category: 'lafzi', noteAr: 'صيغة الهلاك بالرجفة: \'فأخذتهم الرجفة فأصبحوا في دارهم جاثمين\'؛ 7:78 مصير ثمود بعد تكذيب صالح، 29:37 نفس المصير لمدين بعد تكذيب شعيب.' },
  ],
  '29:62': [
    { ayah: '34:36', category: 'word_swap', noteAr: 'كلاهما يصف بسط الله الرزق وقبضه: 29:62 \'الله يبسط الرزق لمن يشاء من عباده ويقدر له\' و34:36 \'إن ربي يبسط الرزق لمن يشاء ويقدر\' — نفس المعنى.' },
  ],
  '2:120': [
    { ayah: '13:37', category: 'addition_omission', noteAr: 'كلاهما يحذر من اتباع أهواء أهل الكتاب: 2:120 \'ولن ترضى عنك اليهود ولا النصارى\' و13:37 \'ولئن اتبعت أهواءهم\' — المختلف: 2:120 تنهى عن اتباع ملتهم، 13:37 تنهى عن اتباع أهوائهم.' },
  ],
  '2:122': [
    { ayah: '2:47', category: 'lafzi', noteAr: 'كلاهما يقول \'يا بني إسرائيل اذكروا نعمتي التي أنعمت عليكم\' — تذكير بني إسرائيل بنعم الله.' },
  ],
  '2:123': [
    { ayah: '2:48', category: 'lafzi', noteAr: 'كلاهما يقول \'واتقوا يوماً لا تجزي نفس عن نفس شيئاً\' — التحذير من يوم القيامة.' },
  ],
  '2:126': [
    { ayah: '14:35', category: 'lafzi', noteAr: 'كلاهما عن دعاء إبراهيم لمكة: 2:126 \'رب اجعل هذا بلداً آمناً\' و14:35 \'رب اجعل هذا بلداً آمناً\' — نفس دعاء إبراهيم.' },
  ],
  '2:134': [
    { ayah: '2:141', category: 'lafzi', noteAr: 'كلاهما يقول \'تلك أمة قد خلت لها ما كسبت ولكم ما كسبتم\' — نفس التذكير بأن كل أمة تحاسب بما كسبت.' },
  ],
  '2:136': [
    { ayah: '3:84', category: 'word_swap', noteAr: 'كلاهما يأمر بالإيمان بجميع الأنبياء: 2:136 \'قولوا آمنا بالله\' و3:84 \'قل آمنا بالله\' — إعلان الإيمان.' },
  ],
  '2:141': [
    { ayah: '2:134', category: 'lafzi', noteAr: 'كلاهما يقول \'تلك أمة قد خلت لها ما كسبت ولكم ما كسبتم\' — نفس التذكير بأن كل أمة تحاسب بما كسبت.' },
  ],
  '2:144': [
    { ayah: '2:150', category: 'lafzi', noteAr: 'كلاهما يقول \'ومن حيث خرجت فول وجهك شطر المسجد الحرام\' — توجيه القبلة يتكرر.' },
  ],
  '2:146': [
    { ayah: '6:20', category: 'lafzi', noteAr: 'كلاهما يقول \'الذين آتيناهم الكتاب يعرفونه كما يعرفون أبناءهم\' — أهل الكتاب يعرفون النبي.' },
  ],
  '2:150': [
    { ayah: '2:144', category: 'lafzi', noteAr: 'كلاهما يقول \'ومن حيث خرجت فول وجهك شطر المسجد الحرام\' — توجيه القبلة يتكرر.' },
  ],
  '2:170': [
    { ayah: '31:21', category: 'lafzi', noteAr: 'كلاهما يقول \'وإذا قيل لهم اتبعوا ما أنزل الله قالوا بل نتبع ما وجدنا عليه آباءنا\' — نفس حجة التقليد.' },
  ],
  '2:173': [
    { ayah: '16:115', category: 'lafzi', noteAr: 'كلاهما يذكر المحرمات: \'إنما حرم عليكم الميتة والدم ولحم الخنزير\' مع استثناء الضرورة.' },
  ],
  '2:197': [
    { ayah: '2:242', category: 'word_swap', noteAr: '2:197 \'وتزودوا فإن خير الزاد التقوى\' و2:242 \'كذلك يبين الله لكم آياته\' — حج وتشريع.' },
  ],
  '2:2': [
    { ayah: '45:17', category: 'word_swap', noteAr: '2:2 \'ذلك الكتاب لا ريب فيه\' و45:17 \'وآتيناهم بينات من الأمر\' — وصف الكتاب.' },
  ],
  '2:22': [
    { ayah: '20:128', category: 'word_swap', noteAr: '2:22 خلق الأرض فراشاً والسماء بناءً و20:128 آية لمن أهلكنا قبلهم.' },
  ],
  '2:23': [
    { ayah: '10:38', category: 'word_swap', noteAr: 'في 2:23 تحدٍّ لفظي بِسورة بينما 10:38 بنفس السورة.' },
  ],
  '2:233': [
    { ayah: '65:6', category: 'word_swap', noteAr: 'كلاهما يصف حق الرضاع والحضانة — 2:233 \'والوالدات يرضعن أولادهن\' و65:6 \'أسكنوهن من حيث سكنتم\' — أحكام أسرية.' },
  ],
  '2:242': [
    { ayah: '24:61', category: 'word_swap', noteAr: 'كلاهما يختم حكماً بقوله \'كذلك يبين الله لكم آياته\' — 2:242 عن الطلاق و24:61 عن الأعذار.' },
  ],
  '2:243': [
    { ayah: '2:22', category: 'word_swap', noteAr: '2:243 قصة الخروج من الديار حذر الموت، 2:22 عن التوحيد.' },
  ],
  '2:25': [
    { ayah: '3:15', category: 'word_swap', noteAr: 'كلاهما يبشر المؤمنين بالجنة: 2:25 \'وبشر الذين آمنوا\' و3:15 \'قل أؤنبئكم بخير من ذلكم\' — بشارة بأسلوبين.' },
  ],
  '2:255': [
    { ayah: '11:19', category: 'word_swap', noteAr: 'آية الكرسي عن عظمة الله، 11:19 عن الكافرين — موضوعان مختلفان تماماً.' },
  ],
  '2:262': [
    { ayah: '2:274', category: 'lafzi', noteAr: 'كلاهما يصف أجر المنفقين: \'فلهم أجرهم عند ربهم ولا خوف عليهم ولا هم يحزنون\' — نفس الوعد للإنفاق.' },
  ],
  '2:27': [
    { ayah: '13:25', category: 'lafzi', noteAr: 'كلاهما يصف الذين ينقضون عهد الله من بعد ميثاقه — 2:27 \'الذين ينقضون عهد الله من بعد ميثاقه\' و13:25 تطابقها.' },
  ],
  '2:274': [
    { ayah: '2:262', category: 'lafzi', noteAr: 'كلاهما يصف أجر المنفقين: \'فلهم أجرهم عند ربهم ولا خوف عليهم ولا هم يحزنون\' — نفس الوعد للإنفاق.' },
  ],
  '2:277': [
    { ayah: '2:262', category: 'word_swap', noteAr: 'كلاهما يمدح المؤمنين الذين آمنوا وعملوا الصالحات وأقاموا الصلاة وآتوا الزكاة — 2:277 تذكر الزكاة، 2:262 تذكر الإنفاق.' },
  ],
  '2:278': [
    { ayah: '2:279', category: 'word_swap', noteAr: '2:278 \'واتقوا الله وذروا ما بقي من الربا\' — التحذير من الربا.' },
  ],
  '2:285': [
    { ayah: '2:286', category: 'word_swap', noteAr: '2:285 \'لا نفرق بين أحد من رسله\' و2:286 \'لا يكلف الله نفساً إلا وسعها\' — إيمان وتكليف، آيتان متتاليتان.' },
  ],
  '2:286': [
    { ayah: '2:285', category: 'word_swap', noteAr: '2:285 \'لا نفرق بين أحد من رسله\' و2:286 \'لا يكلف الله نفساً إلا وسعها\' — إيمان وتكليف، آيتان متتاليتان.' },
  ],
  '2:34': [
    { ayah: '20:116', category: 'lafzi', noteAr: 'كلاهما يقول \'وإذ قلنا للملائكة اسجدوا لآدم فسجدوا إلا إبليس\' — نفس قصة السجود.' },
  ],
  '2:35': [
    { ayah: '7:19', category: 'lafzi', noteAr: 'كلاهما يأمر آدم وزوجه بالسكن في الجنة والأكل منها رغداً: \'وكلا منها رغداً\' — نفس الإذن.' },
  ],
  '2:36': [
    { ayah: '7:24', category: 'word_swap', noteAr: 'كلاهما عن هبوط آدم وإبليس: 2:36 \'فأزلهما الشيطان عنها\' و7:24 \'قال اهبطوا\' — سقوط وعداوة.' },
  ],  '2:37': [
    { ayah: '20:122', category: 'word_swap', noteAr: 'كلاهما عن توبة آدم — 2:37 \'فتلقى آدم من ربه كلمات\' و20:122 \'ثم اجتباه ربه فتاب عليه\' — قصتان مختلفتان عن توبة آدم.' },
  ],
  '2:4': [
    { ayah: '2:2', category: 'addition_omission', noteAr: '2:2 \'هدى للمتقين\' و2:4 \'والذين يؤمنون\' — استمرار وصف المتقين بعد افتتاحية البقرة.' },
  ],
  '2:40': [
    { ayah: '2:47', category: 'lafzi', noteAr: 'كلاهما يخاطب بني إسرائيل: 2:40 \'يا بني إسرائيل اذكروا نعمتي التي أنعمت عليكم\' و2:47 \'يا بني إسرائيل اذكروا نعمتي التي أنعمت عليكم\' — تكرار التذكير.' },
  ],
  '2:47': [
    { ayah: '2:122', category: 'lafzi', noteAr: 'كلاهما يقول \'يا بني إسرائيل اذكروا نعمتي التي أنعمت عليكم\' — تذكير بني إسرائيل بنعم الله.' },
    { ayah: '2:40', category: 'lafzi', noteAr: 'كلاهما يخاطب بني إسرائيل: 2:40 \'يا بني إسرائيل اذكروا نعمتي التي أنعمت عليكم\' و2:47 \'يا بني إسرائيل اذكروا نعمتي التي أنعمت عليكم\' — تكرار التذكير.' },
  ],
  '2:48': [
    { ayah: '2:123', category: 'lafzi', noteAr: 'كلاهما يقول \'واتقوا يوماً لا تجزي نفس عن نفس شيئاً\' — التحذير من يوم القيامة.' },
  ],
  '2:49': [
    { ayah: '7:141', category: 'lafzi', noteAr: 'كلاهما يذكر إنجاء بني إسرائيل من آل فرعون: \'وإذ نجيناكم من آل فرعون\' — نعمة الخلاص من فرعون.' },
  ],
  '2:58': [
    { ayah: '7:161', category: 'lafzi', noteAr: 'كلاهما يأمر بني إسرائيل بدخول القرية: \'وقولوا حطة\' و\'ادخلوا الباب سجداً\' — أمران مختلفان لبني إسرائيل.' },
  ],
  '2:60': [
    { ayah: '7:160', category: 'lafzi', noteAr: 'كلاهما يصف تفجير الينابيع لموسى: \'فانفجرت منه اثنتا عشرة عيناً\' — آية موسى مع الماء.' },
  ],
  '2:62': [
    { ayah: '5:69', category: 'lafzi', noteAr: 'كلاهما يذكر أصحاب الملل المختلفة: \'إن الذين آمنوا والذين هادوا والنصارى والصابئين\' — نفس القائمة.' },
  ],
  '2:63': [
    { ayah: '7:171', category: 'lafzi', noteAr: 'كلاهما يذكر رفع الطور فوق بني إسرائيل: \'وإذ نتقنا الجبل فوقهم\' — أخذ الميثاق.' },
  ],
  '2:93': [
    { ayah: '2:63', category: 'addition_omission', noteAr: 'كلاهما يصف أخذ الميثاق ورفع الطور: 2:63 \'وإذ أخذنا ميثاقكم ورفعنا فوقكم الطور\' و2:93 \'وإذ أخذنا ميثاقكم ورفعنا فوقكم الطور\' — نفس الواقعة بتكرار.' },
  ],
  '30:37': [
    { ayah: '34:36', category: 'lafzi', noteAr: 'كلاهما يصف بسط الله الرزق وقبضه: \'إن ربك يبسط الرزق لمن يشاء ويقدر\' — سنة الله في الأرزاق.' },
  ],
  '30:43': [
    { ayah: '27:87', category: 'word_swap', noteAr: 'كلاهما يأمر بإقامة الوجه للدين القيم — 30:43 \'فأقم وجهك للدين القيم\' و27:87 في سياق النفخ في الصور.' },
  ],
  '30:53': [
    { ayah: '27:81', category: 'lafzi', noteAr: 'كلاهما يقول \'وما أنت بهاد العمي عن ضلالتهم\' — في النمل والروم.' },
  ],
  '30:9': [
    { ayah: '12:109', category: 'lafzi', noteAr: 'كلاهما يأمر بالسير في الأرض: 12:109 تذكر سنة الله في إرسال الرسل من أهل القرى و30:9 تذكر عاقبة المكذبين قبلهم.' },
  ],
  '31:14': [
    { ayah: '46:15', category: 'lafzi', noteAr: 'كلاهما يصف الوصية بالوالدين: \'ووصينا الإنسان بوالديه\' — 31:14 و46:15 آيتان متقاربتان.' },
  ],
  '31:20': [
    { ayah: '22:8', category: 'word_swap', noteAr: '31:20 \'ألم تروا أن الله سخر لكم\' و22:8 \'ومن الناس من يجادل في الله بغير علم\' — نعمة مقابل جدال.' },
  ],
  '31:21': [
    { ayah: '2:170', category: 'lafzi', noteAr: 'كلاهما يقول \'وإذا قيل لهم اتبعوا ما أنزل الله قالوا بل نتبع ما وجدنا عليه آباءنا\' — نفس حجة التقليد.' },
  ],
  '31:29': [
    { ayah: '35:13', category: 'lafzi', noteAr: 'كلاهما يصف آيات الله في الليل والنهار والشمس والقمر: \'يولج الليل في النهار\' — نفس الآيات الكونية.' },
  ],
  '31:3': [
    { ayah: '15:1', category: 'word_swap', noteAr: 'كلا السورتين تفتتحان ب \'الر\' — 15:1 \'الر\' و31:3 \'الر\' — سورتان مختلفتان بحروف مقطعة واحدة.' },
  ],
  '31:30': [
    { ayah: '22:62', category: 'lafzi', noteAr: 'كلاهما يقول \'ذلك بأن الله هو الحق\' مضموناً — توحيد الله وإبطال الشرك.' },
  ],
  '31:33': [
    { ayah: '35:5', category: 'ending_variation', noteAr: 'كلاهما يحذر من الغرور بالحياة الدنيا وغرور الشيطان بالله: 31:33 \'فلا تغرنكم الحياة الدنيا\' و35:5 \'فلا تغرنكم الحياة الدنيا\' — نفس التحذير.' },
  ],
  '31:4': [
    { ayah: '27:3', category: 'word_swap', noteAr: 'كلاهما يصف المؤمنين الذين يقيمون الصلاة ويؤتون الزكاة — 31:4 \'الذين يقيمون الصلاة\' و27:3 \'الذين يقيمون الصلاة\' — نفس صفة المؤمنين.' },
  ],
  '32:26': [
    { ayah: '20:128', category: 'lafzi', noteAr: 'كلاهما يسأل: \'أولم يهد لهم كم أهلكنا من قبلهم من القرون\' — نفس السؤال البلاغي عن هلاك الأمم السابقة.' },
  ],
  '32:3': [
    { ayah: '34:2', category: 'word_swap', noteAr: '32:3 عن إعراضهم عن القرآن و34:2 عن علم الله بالغيب.' },
  ],
  '32:4': [
    { ayah: '10:3', category: 'word_swap', noteAr: 'كلاهما يذكر أن الله خلق السماوات والأرض في ستة أيام ثم استوى على العرش — صياغة واحدة بفروق بسيطة.' },
    { ayah: '25:59', category: 'word_swap', noteAr: 'كلاهما يصف خلق السماوات والأرض: 25:59 \'ثم استوى على العرش الرحمن\' و32:4 \'ثم استوى على العرش\'.' },
  ],
  '32:9': [
    { ayah: '23:78', category: 'lafzi', noteAr: 'كلاهما يصف نعم السمع والبصر والأفئدة: \'والله أخرجكم من بطون أمهاتكم\' (النحل) لكن 23:78 \'وهو الذي أنشأ لكم السمع والأبصار\' و32:9 \'وجعل لكم السمع والأبصار\'.' },
  ],
  '34:11': [
    { ayah: '34:2', category: 'word_swap', noteAr: '34:11 أمر داود بصنعة الدروع و34:2 عن علم الله.' },
  ],
  '34:2': [
    { ayah: '57:4', category: 'lafzi', noteAr: 'كلاهما يصف علم الله بما في السماوات والأرض: \'يعلم ما يلج في الأرض وما يخرج منها\' — نفس علم الله المحيط.' },
  ],
  '34:3': [
    { ayah: '10:61', category: 'word_swap', noteAr: 'علم الله بالغيب: 10:61 \'وما يعزب عن ربك من مثقال ذرة\' و34:3 \'لا يعزب عنه مثقال ذرة\' — نفس الحقيقة عن علم الله، صياغة مختلفة.' },
  ],
  '34:36': [
    { ayah: '29:62', category: 'word_swap', noteAr: 'كلاهما يصف بسط الله الرزق وقبضه: 29:62 \'الله يبسط الرزق لمن يشاء من عباده ويقدر له\' و34:36 \'إن ربي يبسط الرزق لمن يشاء ويقدر\' — نفس المعنى.' },
  ],
  '35:13': [
    { ayah: '31:29', category: 'lafzi', noteAr: 'كلاهما يصف آيات الله في الليل والنهار والشمس والقمر: \'يولج الليل في النهار\' — نفس الآيات الكونية.' },
  ],
  '35:33': [
    { ayah: '22:23', category: 'lafzi', noteAr: 'كلاهما يصف جنات عدن يدخلونها بحلية الأساور من ذهب ولؤلؤ ولباسهم فيها حرير — وصف متطابق للجنة.' },
  ],
  '35:40': [
    { ayah: '46:4', category: 'lafzi', noteAr: 'كلاهما يسأل: \'أرأيتم ما تدعون من دون الله أروني ماذا خلقوا\' — نفس السؤال للكفار عن شركائهم.' },
  ],
  '35:44': [
    { ayah: '40:82', category: 'lafzi', noteAr: 'كلاهما يأمر بالسير في الأرض ليروا كيف كانت عاقبة الذين من قبلهم: \'وكانوا أشد منهم قوة\' — سنة الهلاك.' },
  ],
  '35:45': [
    { ayah: '16:61', category: 'lafzi', noteAr: 'كلاهما يصف إمهال الله للناس: \'ولو يؤاخذ الله الناس بظلمهم ما ترك عليها من دابة\' — نفس العبارة عن رحمة التأخير.' },
  ],
  '35:5': [
    { ayah: '31:33', category: 'ending_variation', noteAr: 'كلاهما يحذر من الغرور بالحياة الدنيا وغرور الشيطان بالله: 35:5 \'فلا تغرنكم الحياة الدنيا\' و31:33 \'فلا تغرنكم الحياة الدنيا\' — نفس التحذير.' },
  ],
  '36:20': [
    { ayah: '28:20', category: 'word_swap', noteAr: '28:20 \'وجاء رجل من أقصى المدينة يسعى\' و36:20 \'وجاء من أقصى المدينة رجل يسعى\' — نفس العبارة بترتيب كلمات مختلف.' },
  ],
  '36:35': [
    { ayah: '36:73', category: 'word_swap', noteAr: '36:35 عن ثمار النخيل والأعناب و36:73 عن منافع الأنعام — آيتان متجاورتان عن نعم الله.' },
  ],
  '36:46': [
    { ayah: '21:41', category: 'word_swap', noteAr: 'كلاهما يصف إعراض الكفار عن الآيات: 36:46 \'وما تأتيهم من آية من آيات ربهم إلا كانوا عنها معرضين\' و21:41 \'ولقد استهزئ برسل من قبلك\'.' },
  ],
  '36:48': [
    { ayah: '21:38', category: 'lafzi', noteAr: 'كلاهما يسأل: \'متى هذا الوعد إن كنتم صادقين\' — استعجال الكفار بالوعد في سورتين.' },
  ],
  '36:73': [
    { ayah: '36:35', category: 'word_swap', noteAr: '36:35 عن ثمار النخيل والأعناب و36:73 عن منافع الأنعام — آيتان متجاورتان عن نعم الله.' },
  ],
  '36:82': [
    { ayah: '36:35', category: 'word_swap', noteAr: '36:82 \'إنما أمره إذا أراد شيئاً أن يقول له كن فيكون\' — آية القدرة الإلهية.' },
  ],  '37:16': [
    { ayah: '23:82', category: 'lafzi', noteAr: 'كلاهما يقول \'أئذا متنا وكنا تراباً وعظاماً أئنا لمبعوثون\' — استفهام الكفار عن البعث.' },
  ],
  '37:47': [
    { ayah: '56:19', category: 'word_swap', noteAr: '37:47 \'لا فيها غول ولا هم عنها ينزفون\' و56:19 \'لا يصدعون عنها ولا ينزفون\' — وصف شراب الجنة لا يذهب العقل.' },
  ],
  '37:59': [
    { ayah: '7:37', category: 'word_swap', noteAr: '37:59 \'أئذا متنا\' و7:37 \'أولم يكفهم\' — موضوعا إنكار البعث.' },
  ],
  '38:72': [
    { ayah: '15:29', category: 'lafzi', noteAr: 'كلاهما يصف الأمر الإلهي بعد تسوية خلق آدم ونفخ الروح: \'فإذا سويته ونفخت فيه من روحي فقعوا له ساجدين\' — آية متطابقة عن خلق آدم.' },
  ],
  '38:74': [
    { ayah: '38:76', category: 'word_swap', noteAr: '38:74 \'إلا إبليس استكبر\' و38:76 \'أنا خير منه\' — سبب كفر إبليس واستكباره.' },
  ],
  '38:76': [
    { ayah: '38:74', category: 'word_swap', noteAr: '38:74 \'إلا إبليس استكبر\' و38:76 \'أنا خير منه\' — سبب كفر إبليس واستكباره.' },
  ],
  '39:52': [
    { ayah: '29:62', category: 'word_swap', noteAr: 'كلاهما يصف بسط الله الرزق وقبضه: \'إن الله يبسط الرزق لمن يشاء ويقدر\' — سنة الله في الأرزاق.' },
  ],
  '39:68': [
    { ayah: '27:87', category: 'lafzi', noteAr: 'كلاهما يذكر النفخ في الصور: 27:87 \'ويوم ينفخ في الصور\' و39:68 \'ونفخ في الصور\' — نفس الحدث العظيم.' },
  ],
  '39:7': [
    { ayah: '17:83', category: 'word_swap', noteAr: 'كلاهما يصف طبيعة الإنسان عند النعمة والبلاء — 17:83 \'وإذا أنعمنا على الإنسان أعرض ونأى\' و39:7 \'وإذا مس الإنسان ضر دعا ربه\' — ردود فعل متقابلة.' },
  ],
  '39:72': [
    { ayah: '40:76', category: 'lafzi', noteAr: 'كلاهما يقول \'ادخلوا أبواب جهنم خالدين فيها فبئس مثوى المتكبرين\' — دخول الكفار النار.' },
  ],
  '3:10': [
    { ayah: '3:116', category: 'word_swap', noteAr: '3:10 و3:116 — آيتان في آل عمران: الأولى عن الكافرين وأموالهم وأولادهم، والثانية عن الذين كفروا.' },
  ],
  '3:103': [
    { ayah: '8:10', category: 'word_swap', noteAr: '3:103 \'واذكروا نعمت الله عليكم إذ كنتم أعداء\' و8:10 \'وما جعله الله إلا بشرى\' — نعمتان مختلفتان.' },
  ],
  '3:116': [
    { ayah: '3:10', category: 'word_swap', noteAr: '3:116 \'لن تغني عنهم أموالهم ولا أولادهم من الله شيئاً\' — التحذير من الكفر.' },
  ],
  '3:126': [
    { ayah: '8:10', category: 'lafzi', noteAr: 'كلاهما يقول \'وما جعله الله إلا بشرى\' — 3:126 و8:10 آية متطابقة عن النصر.' },
  ],
  '3:15': [
    { ayah: '2:25', category: 'word_swap', noteAr: 'كلاهما يبشر المؤمنين بالجنة: 3:15 \'قل أؤنبئكم بخير من ذلكم\' و2:25 \'وبشر الذين آمنوا\' — بشارة بأسلوبين.' },
  ],
  '3:164': [
    { ayah: '62:2', category: 'lafzi', noteAr: 'كلاهما يصف بعثة النبي: \'لقد من الله على المؤمنين إذ بعث فيهم رسولاً\' و\'هو الذي بعث في الأميين رسولاً\' — امتنان الله بالرسالة.' },
  ],
  '3:191': [
    { ayah: '3:192', category: 'addition_omission', noteAr: '3:191 \'ربنا ما خلقت هذا باطلاً\' و3:192 \'ربنا إنك من تدخل النار\' — دعاء متصل.' },
  ],
  '3:192': [
    { ayah: '3:191', category: 'addition_omission', noteAr: '3:191 \'ربنا ما خلقت هذا باطلاً\' و3:192 \'ربنا إنك من تدخل النار\' — دعاء متصل.' },
  ],
  '3:2': [
    { ayah: '2:255', category: 'word_swap', noteAr: '3:2 \'الله لا إله إلا هو الحي القيوم\' و2:255 \'الله لا إله إلا هو الحي القيوم\' — آية الكرسي بعينها.' },
  ],
  '3:3': [
    { ayah: '3:89', category: 'word_swap', noteAr: '3:3 عن تنزيل الكتاب و3:89 عن التوبة.' },
  ],
  '3:41': [
    { ayah: '19:10', category: 'lafzi', noteAr: 'كلاهما يصف آية زكريا: \'قال رب اجعل لي آية\' — في 19:10 \'آيتك ألا تكلم الناس ثلاث ليال سوياً\' و3:41 \'ثلاثة أيام إلا رمزاً\'.' },
  ],
  '3:44': [
    { ayah: '12:102', category: 'lafzi', noteAr: 'كلاهما يخبر النبي عن أنباء الغيب: \'ذلك من أنباء الغيب نوحيه إليك\' — في 3:44 عن مريم و12:102 عن يوسف.' },
  ],
  '3:47': [
    { ayah: '19:35', category: 'addition_omission', noteAr: 'كلاهما يصف عدم اتخاذ الله ولداً — 19:35 \'ما كان لله أن يتخذ من ولد\' و3:47 عن بشارة مريم بعيسى.' },
  ],
  '3:49': [
    { ayah: '3:164', category: 'word_swap', noteAr: '3:49 عن معجزات عيسى و3:164 عن بعثة النبي.' },
  ],
  '3:8': [
    { ayah: '3:9', category: 'word_swap', noteAr: '3:8 \'ربنا لا تزغ قلوبنا\' و3:9 \'ربنا إنك جامع الناس\' — دعاء المؤمنين في آل عمران، آيتان متتاليتان.' },
  ],
  '3:84': [
    { ayah: '2:136', category: 'word_swap', noteAr: 'كلاهما يأمر بالإيمان بجميع الأنبياء: 2:136 \'قولوا آمنا بالله\' و3:84 \'قل آمنا بالله\' — إعلان الإيمان.' },
  ],
  '3:89': [
    { ayah: '3:3', category: 'word_swap', noteAr: '3:89 عن التوبة و3:3 عن تنزيل الكتاب.' },
  ],
  '3:9': [
    { ayah: '3:8', category: 'word_swap', noteAr: '3:8 \'ربنا لا تزغ قلوبنا\' و3:9 \'ربنا إنك جامع الناس\' — دعاء المؤمنين في آل عمران، آيتان متتاليتان.' },
  ],
  '3:97': [
    { ayah: '22:23', category: 'word_swap', noteAr: '3:97 \'فيه آيات بينات مقام إبراهيم\' و22:23 عن جزاء المؤمنين.' },
  ],  '40:47': [
    { ayah: '34:31', category: 'lafzi', noteAr: 'كلاهما يصف حوار الأتباع والقادة في النار: \'إنا كنا لكم تبعاً\' — نفس مشهد التبعية.' },
  ],
  '40:56': [
    { ayah: '6:10', category: 'word_swap', noteAr: '40:56 عن جدال الكفار بالباطل و6:10 عن الاستهزاء بالرسل.' },
  ],
  '40:61': [
    { ayah: '27:86', category: 'word_swap', noteAr: '40:61 \'الله الذي جعل لكم الليل لتسكنوا فيه\' — نعم الله في الليل والنهار.' },
  ],
  '40:66': [
    { ayah: '6:56', category: 'word_swap', noteAr: '40:66 \'إني نهيت أن أعبد الذين تدعون من دون الله\' و6:56 \'إني نهيت أن أعبد الذين تدعون من دون الله\' — نفس النهي.' },
  ],
  '40:68': [
    { ayah: '6:17', category: 'word_swap', noteAr: '40:68 \'هو الذي يحيي ويميت\' و6:17 \'وإن يمسسك الله بضر\' — قدرة الله المطلقة.' },
  ],
  '40:76': [
    { ayah: '39:72', category: 'lafzi', noteAr: 'كلاهما يقول \'ادخلوا أبواب جهنم خالدين فيها فبئس مثوى المتكبرين\' — دخول الكفار النار.' },
  ],
  '40:82': [
    { ayah: '35:44', category: 'lafzi', noteAr: 'كلاهما يأمر بالسير في الأرض ليروا كيف كانت عاقبة الذين من قبلهم: \'وكانوا أشد منهم قوة\' — سنة الهلاك.' },
  ],
  '41:25': [
    { ayah: '43:83', category: 'word_swap', noteAr: '41:25 عن قرناء السوء و43:83 عن تركهم حتى يلاقوا يومهم.' },
  ],
  '41:36': [
    { ayah: '7:200', category: 'word_swap', noteAr: 'كلاهما يصرف عن وسوسة الشيطان: 41:36 \'وإما ينزغنك من الشيطان نزغ\' و7:200 \'وإما ينزغنك من الشيطان نزغ\' — تطابق.' },
  ],
  '41:45': [
    { ayah: '11:110', category: 'lafzi', noteAr: 'كلاهما يقول \'ولقد آتينا موسى الكتاب فاختلف فيه\' — نفس العبارة عن الكتاب المقدس لموسى والاختلاف بعده.' },
  ],
  '41:51': [
    { ayah: '17:83', category: 'word_swap', noteAr: 'كلاهما يصف طبيعة الإنسان: 41:51 \'وإذا أنعمنا على الإنسان أعرض\' و17:83 \'وإذا أنعمنا على الإنسان أعرض ونأى\' — نفس الطبيعة البشرية.' },
  ],
  '41:6': [
    { ayah: '18:110', category: 'word_swap', noteAr: 'كلاهما يقول \'إنما أنا بشر مثلكم يوحى إلي\' — نفس العبارة يرددها النبي في سورتين.' },
  ],
  '42:47': [
    { ayah: '40:68', category: 'word_swap', noteAr: '42:47 \'استجيبوا لربكم من قبل أن يأتي يوم لا مرد له\' و40:68 \'هو الذي يحيي ويميت\' — دعوة واستجابة.' },
  ],
  '43:83': [
    { ayah: '70:42', category: 'word_swap', noteAr: 'كلاهما يقول \'فذرهم يخوضوا ويلعبوا حتى يلاقوا يومهم\' — الأمر بترك الكفار لخوضهم.' },
  ],
  '44:35': [
    { ayah: '23:82', category: 'word_swap', noteAr: '44:35 \'إن هي إلا موتتنا الأولى\' و23:82 \'أئذا متنا وكنا تراباً\' — إنكار البعث.' },
  ],
  '45:17': [
    { ayah: '2:2', category: 'word_swap', noteAr: '45:17 \'وآتيناهم بينات من الأمر\' و2:2 \'ذلك الكتاب لا ريب فيه\' — وصف الكتاب.' },
  ],
  '46:15': [
    { ayah: '27:19', category: 'word_swap', noteAr: '46:15 دعاء المؤمن \'رب أوزعني أن أشكر نعمتك\' و27:19 دعاء سليمان \'رب أوزعني أن أشكر نعمتك\' — نفس الدعاء.' },
    { ayah: '31:14', category: 'lafzi', noteAr: 'كلاهما يصف الوصية بالوالدين: \'ووصينا الإنسان بوالديه\' — 31:14 و46:15 آيتان متقاربتان.' },
  ],
  '46:18': [
    { ayah: '9:70', category: 'word_swap', noteAr: 'كلاهما يذكر هلاك الأمم السابقة — 46:18 \'الذين حق عليهم القول\' و9:70 \'ألم يأتهم نبأ الذين من قبلهم\'.' },
  ],
  '46:34': [
    { ayah: '40:76', category: 'word_swap', noteAr: 'كلاهما عن التعذيب في النار: 46:34 \'أو لم نأتكم بالحق\' و40:76 \'ادخلوا أبواب جهنم\'.' },
  ],
  '46:4': [
    { ayah: '35:40', category: 'lafzi', noteAr: 'كلاهما يسأل: \'أرأيتم ما تدعون من دون الله أروني ماذا خلقوا\' — نفس السؤال للكفار عن شركائهم.' },
  ],
  '47:10': [
    { ayah: '47:12', category: 'word_swap', noteAr: '47:10 \'أفلم يسيروا في الأرض\' و47:12 \'إن الله يدخل الذين آمنوا\' — آيتان متتاليتان.' },
  ],
  '47:12': [
    { ayah: '47:10', category: 'word_swap', noteAr: '47:12 \'إن الله يدخل الذين آمنوا\' و47:10 \'أفلم يسيروا في الأرض\' — آيتان متتاليتان.' },
  ],
  '48:17': [
    { ayah: '24:61', category: 'word_swap', noteAr: 'كلاهما يذكر الأعذار: 48:17 \'ليس على الأعمى حرج\' و24:61 \'ليس على الأعمى حرج\' — آية متطابقة.' },
  ],
  '48:28': [
    { ayah: '9:33', category: 'lafzi', noteAr: 'كلاهما يفتتح بمهمة النبي لإظهار الحق على الدين كله؛ 9:33 (وكذلك 61:9) تنتهي \'ولو كره المشركون\' بينما 48:28 تنتهي \'وكفى بالله شهيداً\'.' },
  ],  '4:116': [
    { ayah: '4:48', category: 'lafzi', noteAr: 'كلاهما يقول \'إن الله لا يغفر أن يشرك به\' — آية متطابقة عن الشرك.' },
  ],
  '4:122': [
    { ayah: '5:119', category: 'word_swap', noteAr: '4:122 \'والذين آمنوا\' و5:119 \'هذا يوم ينفع الصادقين\' — آيتان عن جزاء المؤمنين.' },
  ],
  '4:13': [
    { ayah: '4:14', category: 'lafzi', noteAr: '4:13 \'تلك حدود الله\' و4:14 \'ومن يعص الله ورسوله\' — زوج متتالٍ: طاعة تعقبها جنة، عصيان يعقبه نار.' },
  ],
  '4:135': [
    { ayah: '4:14', category: 'word_swap', noteAr: '4:135 \'يا أيها الذين آمنوا كونوا قوامين بالقسط\' و4:14 تحذير من العصيان.' },
  ],
  '4:14': [
    { ayah: '4:13', category: 'lafzi', noteAr: '4:13 \'تلك حدود الله\' و4:14 \'ومن يعص الله ورسوله\' — زوج متتالٍ: طاعة تعقبها جنة، عصيان يعقبه نار.' },
  ],
  '4:36': [
    { ayah: '6:151', category: 'word_swap', noteAr: '4:36 \'واعبدوا الله ولا تشركوا به شيئاً وبالوالدين إحساناً\' و6:151 \'قل تعالوا أتل ما حرم ربكم عليكم\' — وصايا متشابهة.' },
  ],
  '4:43': [
    { ayah: '5:6', category: 'ending_variation', noteAr: 'كلاهما يصف أحكام الطهارة والوضوء — 4:43 و5:6 آيتان تتشابهان في أحكام التيمم والغسل.' },
  ],
  '4:48': [
    { ayah: '4:116', category: 'lafzi', noteAr: 'كلاهما يقول \'إن الله لا يغفر أن يشرك به\' — آية متطابقة عن الشرك.' },
  ],
  '4:57': [
    { ayah: '22:23', category: 'word_swap', noteAr: '4:57 \'والذين آمنوا وعملوا الصالحات\' و22:23 عن جزاء المؤمنين.' },
  ],
  '4:61': [
    { ayah: '4:135', category: 'word_swap', noteAr: '4:61 \'وإذا قيل لهم تعالوا إلى ما أنزل الله\' و4:135 \'يا أيها الذين آمنوا كونوا قوامين\' — أمران مختلفان.' },
  ],
  '50:39': [
    { ayah: '20:130', category: 'lafzi', noteAr: 'كلاهما يأمر بالصبر على ما يقولون والتسبيح بحمد الرب: \'فاصبر على ما يقولون وسبح بحمد ربك\' — نفس الأمر النبوي.' },
  ],
  '52:24': [
    { ayah: '56:17', category: 'lafzi', noteAr: 'كلاهما يصف الغلمان المخلدين في الجنة: \'ويطوف عليهم غلمان لهم\' — وصف خدم الجنة.' },
  ],
  '53:23': [
    { ayah: '53:30', category: 'ending_variation', noteAr: '53:23 \'ما أنزل الله بها من سلطان\' و53:30 \'ذلك مبلغهم من العلم\' — آيتان عن التنديد بالشرك.' },
  ],
  '53:30': [
    { ayah: '53:23', category: 'ending_variation', noteAr: '53:23 \'ما أنزل الله بها من سلطان\' و53:30 \'ذلك مبلغهم من العلم\' — آيتان عن التنديد بالشرك.' },
  ],
  '54:17': [
    { ayah: '54:22', category: 'lafzi', noteAr: 'كلاهما يقول \'ولقد يسرنا القرآن للذكر فهل من مدكر\' — تتكرر في سورة القمر 4 مرات.' },
  ],
  '54:22': [
    { ayah: '54:32', category: 'lafzi', noteAr: 'كلاهما يقول \'ولقد يسرنا القرآن للذكر فهل من مدكر\' — القمر.54:22، 54:32، 54:40.' },
  ],
  '54:32': [
    { ayah: '54:40', category: 'lafzi', noteAr: 'كلاهما يقول \'ولقد يسرنا القرآن للذكر فهل من مدكر\' — آية تتكرر في سورة القمر.' },
  ],
  '54:40': [
    { ayah: '54:17', category: 'lafzi', noteAr: 'كلاهما يقول \'ولقد يسرنا القرآن للذكر فهل من مدكر\' — الخاتمة المتكررة للقمر.' },
  ],
  '55:13': [
    { ayah: '55:16', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — تتكرر في سورة الرحمن 31 مرة.' },
  ],
  '55:16': [
    { ayah: '55:21', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس الآية المتكررة.' },
  ],
  '55:18': [
    { ayah: '55:25', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — الآية المتكررة.' },
  ],
  '55:21': [
    { ayah: '55:23', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:23': [
    { ayah: '55:25', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:25': [
    { ayah: '55:28', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:28': [
    { ayah: '55:30', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:30': [
    { ayah: '55:32', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:32': [
    { ayah: '55:34', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:34': [
    { ayah: '55:36', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:36': [
    { ayah: '55:38', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:38': [
    { ayah: '55:40', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:40': [
    { ayah: '55:42', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:42': [
    { ayah: '55:45', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:45': [
    { ayah: '55:47', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:47': [
    { ayah: '55:49', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:49': [
    { ayah: '55:51', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:51': [
    { ayah: '55:53', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:53': [
    { ayah: '55:55', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:55': [
    { ayah: '55:57', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:57': [
    { ayah: '55:59', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:59': [
    { ayah: '55:61', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:61': [
    { ayah: '55:63', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:63': [
    { ayah: '55:65', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:65': [
    { ayah: '55:67', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:67': [
    { ayah: '55:69', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:69': [
    { ayah: '55:71', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:71': [
    { ayah: '55:73', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:73': [
    { ayah: '55:75', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:75': [
    { ayah: '55:77', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — نفس التكرار.' },
  ],
  '55:77': [
    { ayah: '55:13', category: 'lafzi', noteAr: 'كلاهما يقول \'فبأي آلاء ربكما تكذبان\' — الآية الافتتاحية والخاتمية للتكرار.' },
  ],
  '56:17': [
    { ayah: '52:24', category: 'lafzi', noteAr: 'كلاهما يصف الغلمان المخلدين في الجنة: \'ويطوف عليهم غلمان لهم\' — وصف خدم الجنة.' },
  ],
  '56:19': [
    { ayah: '37:47', category: 'word_swap', noteAr: '56:19 \'لا يصدعون عنها ولا ينزفون\' و37:47 \'لا فيها غول ولا هم عنها ينزفون\' — وصف شراب الجنة لا يذهب العقل.' },
  ],
  '56:27': [
    { ayah: '56:8', category: 'word_swap', noteAr: '56:27 \'وأصحاب اليمين\' و56:8 \'فأصحاب الميمنة\' — زوج من أزواج القيامة في الواقعة.' },
  ],
  '56:74': [
    { ayah: '87:1', category: 'word_swap', noteAr: '56:74 \'فسبح باسم ربك العظيم\' و87:1 \'سبح اسم ربك الأعلى\' — كلاهما يأمر بتسبيح اسم الرب لكن يختلفان في الصفة الإلهية.' },
  ],
  '56:8': [
    { ayah: '56:27', category: 'word_swap', noteAr: '56:8 \'فأصحاب الميمنة\' و56:27 \'وأصحاب اليمين\' — زوج من أزواج القيامة في الواقعة.' },
  ],
  '56:96': [
    { ayah: '56:74', category: 'lafzi', noteAr: 'كلاهما يقول \'فسبح باسم ربك العظيم\' — تتكرر في أول السورة وآخرها.' },
  ],  '57:1': [
    { ayah: '59:1', category: 'lafzi', noteAr: 'كلاهما يقول \'سبح لله ما في السماوات والأرض\' — افتتاحية سورتي الحديد والحشر بالتسبيح.' },
  ],
  '57:21': [
    { ayah: '3:15', category: 'word_swap', noteAr: '57:21 \'سابقوا إلى مغفرة من ربكم\' و3:15 \'قل أؤنبئكم بخير من ذلكم\' — حث على المسارعة إلى الجنة.' },
  ],
  '57:4': [
    { ayah: '34:2', category: 'lafzi', noteAr: 'كلاهما يصف علم الله بما في السماوات والأرض: \'يعلم ما يلج في الأرض وما يخرج منها\' — نفس علم الله المحيط.' },
  ],
  '59:1': [
    { ayah: '61:1', category: 'lafzi', noteAr: 'كلاهما يقول \'سبح لله ما في السماوات وما في الأرض\' — افتتاحية الحشر والصف بالتسبيح.' },
  ],
  '59:23': [
    { ayah: '59:24', category: 'word_swap', noteAr: '59:23 \'هو الله الذي لا إله إلا هو\' و59:24 \'هو الله الخالق البارئ المصور\' — اسماء الله الحسنى، آيتان متتاليتان.' },
  ],
  '59:24': [
    { ayah: '59:23', category: 'word_swap', noteAr: '59:23 \'هو الله الذي لا إله إلا هو\' و59:24 \'هو الله الخالق البارئ المصور\' — اسماء الله الحسنى، آيتان متتاليتان.' },
  ],
  '5:104': [
    { ayah: '31:21', category: 'lafzi', noteAr: 'كلاهما يقول \'وإذا قيل لهم اتبعوا ما أنزل الله قالوا بل نتبع ما وجدنا عليه آباءنا\' — نفس حجة التقليد.' },
  ],
  '5:110': [
    { ayah: '3:49', category: 'word_swap', noteAr: 'كلاهما يصف معجزات عيسى: 5:110 \'إذ قال الله يا عيسى\' و3:49 \'ورسولاً إلى بني إسرائيل\'.' },
  ],
  '5:119': [
    { ayah: '98:8', category: 'lafzi', noteAr: 'كلاهما يشتركان في \'جنات تجري من تحتها الأنهار خالدين فيها رضي الله عنهم ورضوا عنه\'؛ 5:119 هي كلمة الصادقين (عيسى يشهد)، 98:8 هو ثواب المؤمنين من أهل الكتاب.' },
  ],
  '5:17': [
    { ayah: '5:72', category: 'word_swap', noteAr: '5:17 \'لقد كفر الذين قالوا إن الله هو المسيح\' و5:72 \'لقد كفر الذين قالوا إن الله هو المسيح\' — آية متطابقة ترد مرتين.' },
  ],
  '5:20': [
    { ayah: '5:110', category: 'word_swap', noteAr: '5:20 \'وإذ قال موسى لقومه\' و5:110 \'إذ قال الله يا عيسى\' — مخاطبة النبيين.' },
  ],
  '5:3': [
    { ayah: '5:110', category: 'word_swap', noteAr: '5:3 \'اليوم أكملت لكم دينكم\' و5:110 \'إذ قال الله يا عيسى\' — خواتيم مختلفة.' },
  ],
  '5:48': [
    { ayah: '2:285', category: 'word_swap', noteAr: '5:48 \'لكل جعلنا منكم شرعة ومنهاجاً\' و2:285 \'آمن الرسول\' — وحدانية الرسالة وتعدد الشرائع.' },
  ],
  '5:6': [
    { ayah: '4:43', category: 'ending_variation', noteAr: 'كلاهما يصف أحكام الطهارة والوضوء — 5:6 و4:43 آيتان تتشابهان في أحكام التيمم والغسل.' },
  ],
  '5:64': [
    { ayah: '2:93', category: 'word_swap', noteAr: '5:64 \'وقالت اليهود يد الله مغلولة\' و2:93 \'وإذ أخذنا ميثاقكم\' — موقفان مختلفان من اليهود.' },
  ],
  '5:68': [
    { ayah: '5:64', category: 'word_swap', noteAr: '5:68 \'يا أهل الكتاب\' و5:64 \'وقالت اليهود\' — خطابان لأهل الكتاب.' },
  ],
  '5:69': [
    { ayah: '2:62', category: 'lafzi', noteAr: 'كلاهما يذكر أصحاب الملل المختلفة: \'إن الذين آمنوا والذين هادوا والنصارى والصابئين\' — نفس القائمة.' },
  ],
  '5:72': [
    { ayah: '5:17', category: 'word_swap', noteAr: '5:17 \'لقد كفر الذين قالوا إن الله هو المسيح\' و5:72 \'لقد كفر الذين قالوا إن الله هو المسيح\' — آية متطابقة ترد مرتين.' },
  ],
  '5:8': [
    { ayah: '4:135', category: 'word_swap', noteAr: '5:8 \'يا أيها الذين آمنوا كونوا قوامين لله\' و4:135 \'يا أيها الذين آمنوا كونوا قوامين بالقسط\' — أمران متوازيان بالعدل.' },
  ],
  '5:89': [
    { ayah: '4:43', category: 'word_swap', noteAr: '5:89 عن كفارة اليمين و4:43 عن الطهارة.' },
  ],
  '60:4': [
    { ayah: '60:6', category: 'lafzi', noteAr: '60:4 \'قد كانت لكم أسوة حسنة في إبراهيم\' و60:6 \'لقد كان لكم فيهم أسوة حسنة\' — آيتان متقاربتان في الممتحنة.' },
  ],
  '60:6': [
    { ayah: '60:4', category: 'lafzi', noteAr: '60:4 \'قد كانت لكم أسوة حسنة في إبراهيم\' و60:6 \'لقد كان لكم فيهم أسوة حسنة\' — آيتان متقاربتان في الممتحنة.' },
  ],
  '60:8': [
    { ayah: '60:9', category: 'word_swap', noteAr: '60:8 \'لا ينهاكم الله عن الذين لم يقاتلوكم\' و60:9 \'إنما ينهاكم الله عن الذين قاتلوكم\' — زوج بر وبريء.' },
  ],
  '60:9': [
    { ayah: '60:8', category: 'word_swap', noteAr: '60:8 \'لا ينهاكم الله عن الذين لم يقاتلوكم\' و60:9 \'إنما ينهاكم الله عن الذين قاتلوكم\' — زوج بر وبريء.' },
  ],
  '61:1': [
    { ayah: '59:1', category: 'lafzi', noteAr: 'كلاهما يقول \'سبح لله ما في السماوات وما في الأرض\' — افتتاحية الحشر والصف بالتسبيح.' },
  ],
  '61:10': [
    { ayah: '9:111', category: 'word_swap', noteAr: '61:10 \'هل أدلكم على تجارة تنجيكم من عذاب أليم\' و9:111 \'إن الله اشترى من المؤمنين أنفسهم وأموالهم\' — تجارة رابحة مع الله.' },
  ],
  '61:9': [
    { ayah: '9:33', category: 'lafzi', noteAr: 'آية متطابقة عن إرسال الله رسوله بالهدى ودين الحق ليظهره على الدين كله.' },
  ],
  '62:1': [
    { ayah: '64:1', category: 'word_swap', noteAr: 'كلاهما يسبح لله ما في السماوات وما في الأرض: 62:1 \'يسبح لله ما في السماوات\' و64:1 \'يسبح لله ما في السماوات\' — نفس صيغة التسبيح.' },
  ],
  '62:2': [
    { ayah: '3:164', category: 'lafzi', noteAr: 'كلاهما يصف بعثة النبي: 3:164 \'لقد من الله على المؤمنين إذ بعث فيهم رسولاً\' و62:2 \'هو الذي بعث في الأميين رسولاً\' — امتنان الله بالرسالة.' },
  ],
  '62:4': [
    { ayah: '62:2', category: 'word_swap', noteAr: '62:4 \'ذلك فضل الله يؤتيه من يشاء\' و62:2 \'هو الذي بعث في الأميين رسولاً\' — تتمة فضل الرسالة.' },
  ],
  '62:8': [
    { ayah: '9:94', category: 'lafzi', noteAr: 'نص متطابق: \'ثم تردون إلى عالم الغيب والشهادة فينبئكم بما كنتم تعملون\'؛ 9:94 موجه للمنافقين الذين تخلفوا عن تبوك، 62:8 يرد على الذين يفرون من الموت.' },
  ],
  '64:1': [
    { ayah: '61:1', category: 'word_swap', noteAr: 'كلاهما يسبح لله ما في السماوات وما في الأرض: 64:1 \'يسبح لله ما في السماوات\' و61:1 \'سبح لله ما في السماوات\'.' },
  ],
  '65:6': [
    { ayah: '2:233', category: 'word_swap', noteAr: 'كلاهما يصف حق الرضاع والحضانة — 65:6 \'أسكنوهن من حيث سكنتم\' و2:233 \'والوالدات يرضعن أولادهن\' — أحكام أسرية.' },
  ],
  '66:12': [
    { ayah: '21:91', category: 'lafzi', noteAr: 'كلاهما يصف مريم بنت عمران التي حفظت فرجها فنفخ فيها من روحه — آية متطابقة تقريباً عن مريم.' },
  ],
  '66:9': [
    { ayah: '9:73', category: 'lafzi', noteAr: 'أمر متطابق للنبي بجهاد الكفار والمنافقين والغلظة عليهم؛ مأواهم جهنم.' },
  ],
  '67:23': [
    { ayah: '23:78', category: 'word_swap', noteAr: 'كلاهما يذكر نعمة السمع والبصر والأفئدة — 67:23 \'قل هو الذي أنشأكم وجعل لكم السمع والأبصار\' و23:78 \'وهو الذي أنشأ لكم السمع والأبصار\'.' },
  ],
  '67:3': [
    { ayah: '67:23', category: 'word_swap', noteAr: '67:3 \'الذي خلق سبع سماوات طباقاً\' و67:23 \'قل هو الذي أنشأكم\' — آيتان مختلفتان في الملك.' },
  ],
  '68:43': [
    { ayah: '68:7', category: 'word_swap', noteAr: '68:43 \'خاشعة أبصارهم ترهقهم ذلة\' و68:7 \'إن ربك هو أعلم بمن ضل عن سبيله\' — موقفان مختلفان في القلم.' },
  ],
  '68:7': [
    { ayah: '68:43', category: 'word_swap', noteAr: '68:43 \'خاشعة أبصارهم ترهقهم ذلة\' و68:7 \'إن ربك هو أعلم بمن ضل عن سبيله\' — موقفان مختلفان في القلم.' },
  ],
  '69:19': [
    { ayah: '69:25', category: 'word_swap', noteAr: '69:19 \'فأما من أوتي كتابه بيمينه\' و69:25 \'وأما من أوتي كتابه بشماله\' — الزوج المتضاد في الحاقة.' },
    { ayah: '84:7', category: 'lafzi', noteAr: 'كلاهما يصف من أوتي كتابه بيمينه بِـ \'فأما من أوتي كتابه بيمينه\' — التتمة تختلف بين السورتين.' },
  ],
  '69:25': [
    { ayah: '69:19', category: 'word_swap', noteAr: '69:19 \'فأما من أوتي كتابه بيمينه\' و69:25 \'وأما من أوتي كتابه بشماله\' — الزوج المتضاد في الحاقة.' },
  ],
  '69:52': [
    { ayah: '56:74', category: 'lafzi', noteAr: 'كلاهما يسبح باسم الله العظيم — 69:52 \'فسبح باسم ربك العظيم\' و56:74 \'فسبح باسم ربك العظيم\' — نفس الأمر.' },
  ],
  '6:10': [
    { ayah: '21:41', category: 'word_swap', noteAr: 'كلاهما يذكر استهزاء الأمم السابقة برسلها: 6:10 \'ولقد استهزئ برسل من قبلك\' و21:41 \'ولقد استهزئ برسل من قبلك\' — آية متطابقة.' },
  ],  '6:143': [
    { ayah: '6:144', category: 'word_swap', noteAr: '6:143 ثمانية أزواج: \'من الضأن اثنين\' و6:144 \'ومن الإبل اثنين\' — أزواج الأنعام.' },
  ],
  '6:144': [
    { ayah: '6:143', category: 'word_swap', noteAr: '6:143 \'من الضأن اثنين\' و6:144 \'ومن الإبل اثنين\' — أزواج الأنعام.' },
  ],
  '6:145': [
    { ayah: '16:115', category: 'lafzi', noteAr: 'كلاهما يذكر المحرمات من الطعام: \'إنما حرم عليكم الميتة والدم ولحم الخنزير\' — نفس قائمة المحرمات.' },
  ],
  '6:151': [
    { ayah: '17:23', category: 'lafzi', noteAr: 'كلاهما يوصي بالوالدين إحساناً: \'وبالوالدين إحساناً\' — الوصية نفسها.' },
    { ayah: '17:31', category: 'lafzi', noteAr: 'كلاهما ينهى عن قتل الأولاد: \'ولا تقتلوا أولادكم\' — في 17:31 بسبب خشية إملاق، في 6:151 مطلقاً.' },
  ],
  '6:152': [
    { ayah: '17:34', category: 'word_swap', noteAr: 'كلاهما يوصي بمال اليتيم: \'ولا تقربوا مال اليتيم إلا بالتي هي أحسن\' — آية متطابقة.' },
  ],
  '6:164': [
    { ayah: '17:34', category: 'word_swap', noteAr: '6:164 \'كل نفس بما كسبت رهينة\' و17:34 عن مال اليتيم — موضوعان مختلفان.' },
  ],
  '6:17': [
    { ayah: '10:107', category: 'word_swap', noteAr: 'كلاهما يصف أن الضر والنفع بيد الله: 6:17 \'وإن يمسسك الله بضر\' و10:107 \'وإن يمسسك الله بضر\'.' },
  ],
  '6:20': [
    { ayah: '2:146', category: 'lafzi', noteAr: 'كلاهما يقول \'الذين آتيناهم الكتاب يعرفونه كما يعرفون أبناءهم\' — أهل الكتاب يعرفون النبي.' },
  ],
  '6:21': [
    { ayah: '10:17', category: 'lafzi', noteAr: 'نفس الصيغة: \'ومن أظلم ممن افترى على الله كذباً\' — آية متطابقة عبر السورتين.' },
  ],
  '6:30': [
    { ayah: '6:21', category: 'word_swap', noteAr: '6:30 \'ولو ترى إذ وقفوا على ربهم\' و6:21 \'ومن أظلم ممن افترى على الله\' — آيتان متجاورتان.' },
  ],
  '6:4': [
    { ayah: '36:46', category: 'word_swap', noteAr: '6:4 \'وما تأتيهم من آية من آيات ربهم إلا كانوا عنها معرضين\' و36:46 \'وما تأتيهم من آية من آيات ربهم إلا كانوا عنها معرضين\' — آية متطابقة.' },
  ],
  '6:50': [
    { ayah: '18:110', category: 'word_swap', noteAr: '6:50 \'لا أقول لكم عندي خزائن الله\' و18:110 \'إنما أنا بشر مثلكم\' — نفي ادعاء الغيب.' },
  ],
  '6:56': [
    { ayah: '40:66', category: 'word_swap', noteAr: '6:56 \'إني نهيت أن أعبد الذين تدعون من دون الله\' و40:66 \'إني نهيت أن أعبد الذين تدعون من دون الله\' — نفس النهي.' },
  ],
  '70:29': [
    { ayah: '23:5', category: 'lafzi', noteAr: 'كلاهما يصف المؤمنين بأنهم \'لفروجهم حافظون\' — نفس صفة المؤمنين.' },
  ],
  '70:30': [
    { ayah: '23:6', category: 'lafzi', noteAr: 'كلاهما يقول \'إلا على أزواجهم أو ما ملكت أيمانهم\' — نفس الاستثناء.' },
  ],
  '70:42': [
    { ayah: '43:83', category: 'word_swap', noteAr: 'كلاهما يقول \'فذرهم يخوضوا ويلعبوا حتى يلاقوا يومهم\' — الأمر بترك الكفار لخوضهم.' },
  ],
  '70:44': [
    { ayah: '68:43', category: 'word_swap', noteAr: 'كلاهما يصف خاشعة أبصارهم ترهقهم ذلة — 70:44 \'خاشعة أبصارهم ترهقهم ذلة\' و68:43 \'خاشعة أبصارهم ترهقهم ذلة\' — آية متطابقة.' },
  ],
  '71:15': [
    { ayah: '67:3', category: 'word_swap', noteAr: '71:15 \'ألم تروا كيف خلق الله سبع سماوات طباقاً\' و67:3 \'الذي خلق سبع سماوات طباقاً\' — وصف الخلق.' },
  ],
  '73:19': [
    { ayah: '76:29', category: 'lafzi', noteAr: 'كلاهما يقول \'إن هذه تذكرة فمن شاء اتخذ إلى ربه سبيلاً\' — آية متطابقة.' },
  ],
  '74:19': [
    { ayah: '80:17', category: 'word_swap', noteAr: '74:19 \'فقتل كيف قدر\' و80:17 \'قتل الإنسان ما أكفره\' — كلاهما يستخدم صيغة \'قتل\' التعجبية.' },
  ],
  '74:54': [
    { ayah: '80:11', category: 'pronoun_shift', noteAr: '74:54 تقول \'إنه تذكرة\' (ضمير مذكر) بينما 80:11 تقول \'إنها تذكرة\' (ضمير مؤنث) — حرف واحد يغير الجنس النحوي للمرجع.' },
  ],
  '75:31': [
    { ayah: '75:32', category: 'word_swap', noteAr: '75:31 \'فلا صدق ولا صلى\' و75:32 \'ولكن كذب وتولى\' — آيتان متتاليتان تصفان موقف الكافر.' },
  ],
  '75:32': [
    { ayah: '75:31', category: 'word_swap', noteAr: '75:31 \'فلا صدق ولا صلى\' و75:32 \'ولكن كذب وتولى\' — آيتان متتاليتان تصفان موقف الكافر.' },
  ],
  '76:29': [
    { ayah: '18:29', category: 'word_swap', noteAr: 'كلاهما يقول \'فمن شاء فليؤمن ومن شاء فليكفر\' — في 18:29 بعد إنذار النار، في 76:29 في سياق التذكرة.' },
    { ayah: '73:19', category: 'lafzi', noteAr: 'كلاهما يقول \'إن هذه تذكرة فمن شاء اتخذ إلى ربه سبيلاً\' — آية متطابقة.' },
  ],
  '76:3': [
    { ayah: '76:29', category: 'word_swap', noteAr: '76:3 \'إنا هديناه السبيل إما شاكراً وإما كفوراً\' و76:29 \'إن هذه تذكرة\' — آيتان متباعدتان في السورة.' },
  ],
  '77:15': [
    { ayah: '77:19', category: 'lafzi', noteAr: 'كلاهما يقول \'ويل يومئذ للمكذبين\' — تتكرر في سورة المرسلات.' },
  ],
  '77:19': [
    { ayah: '77:24', category: 'lafzi', noteAr: 'كلاهما يقول \'ويل يومئذ للمكذبين\' — تتكرر في سورة المرسلات.' },
  ],
  '77:24': [
    { ayah: '77:28', category: 'lafzi', noteAr: 'كلاهما يقول \'ويل يومئذ للمكذبين\' — تتكرر في سورة المرسلات.' },
  ],
  '77:28': [
    { ayah: '77:34', category: 'lafzi', noteAr: 'كلاهما يقول \'ويل يومئذ للمكذبين\' — تتكرر في سورة المرسلات.' },
  ],
  '77:34': [
    { ayah: '77:37', category: 'lafzi', noteAr: 'كلاهما يقول \'ويل يومئذ للمكذبين\' — تتكرر في سورة المرسلات.' },
  ],
  '77:37': [
    { ayah: '77:40', category: 'lafzi', noteAr: 'كلاهما يقول \'ويل يومئذ للمكذبين\' — تتكرر في سورة المرسلات.' },
  ],
  '77:40': [
    { ayah: '77:45', category: 'lafzi', noteAr: 'كلاهما يقول \'ويل يومئذ للمكذبين\' — تتكرر في سورة المرسلات.' },
  ],
  '77:45': [
    { ayah: '77:47', category: 'lafzi', noteAr: 'كلاهما يقول \'ويل يومئذ للمكذبين\' — تتكرر في سورة المرسلات.' },
  ],
  '77:47': [
    { ayah: '77:49', category: 'lafzi', noteAr: 'كلاهما يقول \'ويل يومئذ للمكذبين\' — تتكرر في سورة المرسلات.' },
  ],
  '77:49': [
    { ayah: '77:15', category: 'lafzi', noteAr: 'كلاهما يقول \'ويل يومئذ للمكذبين\' — تتكرر في سورة المرسلات.' },
  ],
  '78:4': [
    { ayah: '78:5', category: 'lafzi', noteAr: 'كلاهما يقول \'كلا سيعلمون\' — آيتان متتاليتان، صيغة التهديد تتكرر.' },
  ],
  '78:5': [
    { ayah: '78:4', category: 'lafzi', noteAr: 'كلاهما يقول \'كلا سيعلمون\' — آيتان متتاليتان، صيغة التهديد تتكرر.' },
  ],
  '79:15': [
    { ayah: '88:1', category: 'word_swap', noteAr: '79:15 \'هل أتاك حديث موسى\' و88:1 \'هل أتاك حديث الغاشية\' — كلاهما يستخدم صيغة \'هل أتاك حديث...\' البلاغية — نفس الاستهلال يقدم قصتين مختلفتين.' },
  ],
  '7:12': [
    { ayah: '38:76', category: 'lafzi', noteAr: 'كلاهما يقول \'أنا خير منه\' — كبرياء إبليس في سورتين.' },
  ],
  '7:141': [
    { ayah: '2:49', category: 'lafzi', noteAr: 'كلاهما يذكر إنجاء بني إسرائيل من آل فرعون: \'وإذ نجيناكم من آل فرعون\' — نعمة الخلاص من فرعون.' },
  ],
  '7:160': [
    { ayah: '2:60', category: 'lafzi', noteAr: 'كلاهما يصف تفجير الينابيع لموسى: \'فانفجرت منه اثنتا عشرة عيناً\' — آية موسى مع الماء.' },
  ],
  '7:161': [
    { ayah: '2:58', category: 'lafzi', noteAr: 'كلاهما يأمر بني إسرائيل بدخول القرية: \'وقولوا حطة\' و\'ادخلوا الباب سجداً\' — أمران مختلفان لبني إسرائيل.' },
  ],
  '7:188': [
    { ayah: '10:49', category: 'lafzi', noteAr: 'كلاهما يقول \'لا أملك لنفسي نفعاً ولا ضراً\' — إعلان النبي أنه لا يملك لنفسه نفعاً ولا ضراً.' },
  ],
  '7:19': [
    { ayah: '2:35', category: 'lafzi', noteAr: 'كلاهما يأمر آدم وزوجه بالسكن في الجنة والأكل منها رغداً: \'وكلا منها رغداً\' — نفس الإذن.' },
  ],
  '7:24': [
    { ayah: '2:36', category: 'word_swap', noteAr: 'كلاهما عن هبوط آدم وإبليس: 7:24 \'قال اهبطوا\' و2:36 \'فأزلهما الشيطان عنها\' — سقوط وعداوة.' },
  ],
  '7:37': [
    { ayah: '46:18', category: 'word_swap', noteAr: '7:37 \'أولم يكفهم\' و46:18 \'الذين حق عليهم القول\' — إنكار البعث وحلول العذاب.' },
  ],
  '7:40': [
    { ayah: '7:41', category: 'word_swap', noteAr: '7:40 عن عدم دخول الجنة لمن كذب بآيات الله و7:41 لهم من جهنم مهاد — آيتان متواليتان، الأولى شرط والثانية جزاء.' },
  ],
  '7:41': [
    { ayah: '7:40', category: 'word_swap', noteAr: '7:40 عن عدم دخول الجنة لمن كذب بآيات الله و7:41 لهم من جهنم مهاد — آيتان متواليتان، الأولى شرط والثانية جزاء.' },
  ],
  '7:45': [
    { ayah: '7:41', category: 'word_swap', noteAr: '7:45 \'الذين يصدون عن سبيل الله\' و7:41 جزاء المكذبين.' },
  ],
  '7:54': [
    { ayah: '10:3', category: 'word_swap', noteAr: 'كلاهما يصف خلق السماوات والأرض في ستة أيام ثم استوى على العرش — 7:54 \'إن ربكم الله الذي خلق السماوات والأرض في ستة أيام ثم استوى على العرش\' و10:3 بنفس الصياغة.' },
  ],
  '7:63': [
    { ayah: '7:69', category: 'word_swap', noteAr: '7:63 \'أو عجبتم أن جاءكم ذكر من ربكم\' و7:69 \'أو عجبتم أن جاءكم ذكر من ربكم\' — نفس الاستفهام التعجبي في خطاب هود.' },
  ],
  '7:65': [
    { ayah: '11:50', category: 'lafzi', noteAr: '7:65 \'وإلى عاد أخاهم هوداً\' و11:50 \'وإلى عاد أخاهم هوداً\' — نفس الصيغة في إرسال هود إلى عاد.' },
  ],
  '7:69': [
    { ayah: '7:63', category: 'word_swap', noteAr: '7:63 \'أو عجبتم أن جاءكم ذكر من ربكم\' و7:69 \'أو عجبتم أن جاءكم ذكر من ربكم\' — نفس الاستفهام التعجبي في خطاب هود.' },
  ],
  '7:73': [
    { ayah: '11:50', category: 'lafzi', noteAr: '7:73 \'وإلى ثمود أخاهم صالحاً\' و11:50 \'وإلى عاد أخاهم هوداً\' — نفس صيغة الإرسال لكن لنبي مختلف.' },
    { ayah: '7:85', category: 'lafzi', noteAr: 'صالح (لثمود) وشعيب (لمدين) كلاهما يفتتحان بنفس الدعوة: اعبدوا الله وحده، قد جاءتكم بينة من ربكم.' },
    { ayah: '11:64', category: 'lafzi', noteAr: 'كلاهما يصف ناقة صالح: 7:73 \'هذه ناقة الله لكم آية\' و11:64 \'هذه ناقة الله لكم آية\' — نفس التقديم للناقة.' },
  ],
  '7:78': [
    { ayah: '7:91', category: 'lafzi', noteAr: 'صيغة الهلاك بالرجفة: \'فأخذتهم الرجفة فأصبحوا في دارهم جاثمين\'؛ 7:78 مصير ثمود بعد تكذيب صالح، 7:91 نفس المصير لمدين بعد تكذيب شعيب.' },
    { ayah: '29:37', category: 'lafzi', noteAr: 'صيغة الهلاك بالرجفة: \'فأخذتهم الرجفة فأصبحوا في دارهم جاثمين\'؛ 7:78 لثمود/صالح، 29:37 لمدين/شعيب.' },
  ],
  '7:81': [
    { ayah: '27:55', category: 'ending_variation', noteAr: 'كلاهما يصف قوم لوط يأتون الرجال شهوة لكن 7:81 تنتهي بِـ \'مسرفون\' بينما 27:55 تنتهي بِـ \'تجهلون\'.' },
  ],
  '7:85': [
    { ayah: '7:73', category: 'lafzi', noteAr: 'صالح (لثمود) وشعيب (لمدين) كلاهما يفتتحان بنفس الدعوة: اعبدوا الله وحده، قد جاءتكم بينة من ربكم. كل منهما يتابع بمحتوى خاص بنبيه.' },
    { ayah: '11:84', category: 'lafzi', noteAr: 'كلاهما يقدّم شعيباً مرسلاً إلى مدين بنفس الدعوة لعبادة الله وحده؛ 7:85 تتابع بأمر الوفاء بالكيل والميزان بالقسط، 11:84 تردد نفس الوصايا الاقتصادية.' },
  ],
  '7:91': [
    { ayah: '7:78', category: 'lafzi', noteAr: 'صيغة الهلاك بالرجفة: \'فأخذتهم الرجفة فأصبحوا في دارهم جاثمين\'؛ 7:78 مصير ثمود بعد تكذيب صالح، 7:91 نفس المصير لمدين بعد تكذيب شعيب.' },
    { ayah: '29:37', category: 'lafzi', noteAr: 'كلاهما يصف هلاك مدين: 7:91 تستخدم \'رجفة\' لقوم شعيب في الأعراف، 29:37 تستخدم أيضاً \'رجفة\' لنفس الحدث في العنكبوت.' },
  ],  '80:11': [
    { ayah: '74:54', category: 'pronoun_shift', noteAr: '74:54 تقول \'إنه تذكرة\' (ضمير مذكر) بينما 80:11 تقول \'إنها تذكرة\' (ضمير مؤنث) — حرف واحد يغير الجنس النحوي للمرجع.' },
  ],
  '80:17': [
    { ayah: '74:19', category: 'word_swap', noteAr: '80:17 \'قتل الإنسان ما أكفره\' و74:19 \'قتل كيف قدر\' كلاهما تستخدم صيغة \'قتل\' التعجبية مع مفعولين مختلفين — جحود الإنسان مقابل تخطيط الإنسان.' },
  ],
  '81:6': [
    { ayah: '82:3', category: 'word_swap', noteAr: 'كلاهما يصف البحار يوم القيامة لكن 81:6 تقول \'سجرت\' بينما 82:3 تقول \'فجرت\' — نفس بنية الجذر، فعل مختلف.' },
  ],
  '82:1': [
    { ayah: '84:1', category: 'word_swap', noteAr: 'كلاهما يصف انشقاق السماء — 82:1 تستخدم \'انفطرت\' بينما 84:1 تستخدم \'انشقت\' — فعلان من جذرين مختلفين بمعنى متقارب.' },
  ],
  '82:13': [
    { ayah: '83:22', category: 'lafzi', noteAr: 'كلاهما يقول \'إن الأبرار لفي نعيم\' بنص متطابق عبر الانفطار والمطففين.' },
  ],
  '82:3': [
    { ayah: '81:6', category: 'word_swap', noteAr: 'كلاهما يصف البحار يوم القيامة لكن 81:6 تقول \'سجرت\' بينما 82:3 تقول \'فجرت\' — نفس بنية الجذر، فعل مختلف.' },
  ],
  '83:19': [
    { ayah: '83:7', category: 'word_swap', noteAr: 'كلاهما يستخدم السؤال البلاغي المتوازي \'وما أدراك ما...\' — 83:7-8 تسأل عن سجين (كتاب الفجار) و83:18-19 تسأل عن عليين (كتاب الأبرار).' },
  ],
  '83:22': [
    { ayah: '82:13', category: 'lafzi', noteAr: 'كلاهما يقول \'إن الأبرار لفي نعيم\' بنص متطابق عبر الانفطار والمطففين.' },
  ],
  '83:7': [
    { ayah: '83:19', category: 'word_swap', noteAr: 'كلاهما يستخدم السؤال البلاغي المتوازي \'وما أدراك ما...\' — 83:7-8 تسأل عن سجين (كتاب الفجار) و83:18-19 تسأل عن عليين (كتاب الأبرار).' },
  ],
  '84:1': [
    { ayah: '82:1', category: 'word_swap', noteAr: 'كلاهما يصف انشقاق السماء — 82:1 تستخدم \'انفطرت\' بينما 84:1 تستخدم \'انشقت\' — فعلان من جذرين مختلفين بمعنى متقارب.' },
  ],
  '84:10': [
    { ayah: '84:7', category: 'word_swap', noteAr: '84:7 \'فأما من أوتي كتابه بيمينه\' و84:10 \'وأما من أوتي كتابه وراء ظهره\' هما الجملتان الشرطيتان المتوازيتان في الانشقاق — اليمين مقابل وراء الظهر.' },
  ],
  '84:7': [
    { ayah: '69:19', category: 'lafzi', noteAr: 'كلاهما يصف من أوتي كتابه بيمينه بِـ \'فأما من أوتي كتابه بيمينه\' — التتمة تختلف بين السورتين.' },
    { ayah: '84:10', category: 'word_swap', noteAr: '84:7 \'فأما من أوتي كتابه بيمينه\' و84:10 \'وأما من أوتي كتابه وراء ظهره\' هما الجملتان الشرطيتان المتوازيتان في الانشقاق — اليمين مقابل وراء الظهر.' },
  ],
  '85:1': [
    { ayah: '86:1', category: 'word_swap', noteAr: '85:1 \'والسماء ذات البروج\' و86:1 \'والسماء والطارق\' افتتاحيتا سورتين متتاليتين كلتاهما تبدأان بقسم بالسماء — البروج مقابل الطارق.' },
  ],
  '85:14': [
    { ayah: '11:90', category: 'lafzi', noteAr: '11:90 \'إن ربي رحيم ودود\' و85:14 \'وهو الغفور الودود\' كلاهما يقترن فيه اسم الله \'الودود\' بصفة أخرى — في 11:90 مع \'رحيم\' وفي 85:14 مع \'الغفور\'.' },
  ],
  '86:1': [
    { ayah: '85:1', category: 'word_swap', noteAr: '85:1 \'والسماء ذات البروج\' و86:1 \'والسماء والطارق\' افتتاحيتا سورتين متتاليتين كلتاهما تبدأان بقسم بالسماء — البروج مقابل الطارق.' },
  ],
  '87:1': [
    { ayah: '56:74', category: 'word_swap', noteAr: '87:1 \'سبح اسم ربك الأعلى\' و56:74 \'فسبح باسم ربك العظيم\' كلاهما يأمر بتسبيح اسم الرب لكن يختلفان في الصفة الإلهية: الأعلى مقابل العظيم.' },
  ],
  '88:1': [
    { ayah: '79:15', category: 'word_swap', noteAr: '88:1 \'هل أتاك حديث الغاشية\' و79:15 \'هل أتاك حديث موسى\' كلاهما يستخدم صيغة \'هل أتاك حديث...\' البلاغية — نفس الاستهلال يقدم قصتين مختلفتين.' },
  ],
  '89:27': [
    { ayah: '89:28', category: 'ending_variation', noteAr: 'خطاب النفس المطمئنة يمتد على آيتين قصيرتين متتاليتين — 89:27 \'يا أيتها النفس المطمئنة\' و89:28 \'ارجعي إلى ربك راضية مرضية\' — كثيراً ما يدمج الحفاظ بينهما أو يفصلونهما خطأً.' },
  ],
  '89:28': [
    { ayah: '89:27', category: 'ending_variation', noteAr: 'خطاب النفس المطمئنة يمتد على آيتين قصيرتين متتاليتين — 89:27 \'يا أيتها النفس المطمئنة\' و89:28 \'ارجعي إلى ربك راضية مرضية\' — كثيراً ما يدمج الحفاظ بينهما أو يفصلونهما خطأً.' },
  ],
  '8:10': [
    { ayah: '3:126', category: 'word_swap', noteAr: 'كلاهما يطمئن المؤمنين بأن النصر لا يكون إلا من عند الله وينتهي بِـ \'عزيز حكيم\' لكنهما يختلفان في الضمير وبنية الجملة السابقة.' },
  ],
  '91:10': [
    { ayah: '91:9', category: 'word_swap', noteAr: 'آيتان متتاليتان متضادتان — 91:9 \'قد أفلح من زكاها\' و91:10 \'قد خاب من دساها\' — تبديلهما خطأ شائع.' },
  ],
  '91:9': [
    { ayah: '91:10', category: 'word_swap', noteAr: 'آيتان متتاليتان متضادتان — 91:9 \'قد أفلح من زكاها\' و91:10 \'قد خاب من دساها\' — تبديلهما خطأ شائع.' },
  ],
  '92:5': [
    { ayah: '92:8', category: 'word_swap', noteAr: '92:5 \'فأما من أعطى واتقى\' و92:8 \'وأما من بخل واستغنى\' يشكلان الإطار المتضاد للليل — فوازي فأما/وأما بنتائج متعاكسة.' },
  ],
  '92:8': [
    { ayah: '92:5', category: 'word_swap', noteAr: '92:5 \'فأما من أعطى واتقى\' و92:8 \'وأما من بخل واستغنى\' يشكلان الإطار المتضاد للليل — فوازي فأما/وأما بنتائج متعاكسة.' },
  ],
  '93:6': [
    { ayah: '93:8', category: 'ending_variation', noteAr: 'الآيات 93:6 و93:7 و93:8 تشكل ثلاثية من أسئلة \'ألم يجدك\' — النهايات \'فآوى\' و\'فهدى\' و\'فأغنى\' يسهل الخلط بينها في التسلسل.' },
  ],
  '93:8': [
    { ayah: '93:6', category: 'ending_variation', noteAr: 'الآيات 93:6 و93:7 و93:8 تشكل ثلاثية من أسئلة \'ألم يجدك\' — النهايات \'فآوى\' و\'فهدى\' و\'فأغنى\' يسهل الخلط بينها في التسلسل.' },
  ],
  '94:5': [
    { ayah: '94:6', category: 'lafzi', noteAr: 'الوعد \'فإن مع العسر يسراً\' تكرر حرفياً في آيتين متتاليتين — من أكثر أزواج اللفظي المتتالية استشهاداً في تعليم التحفيظ.' },
  ],
  '94:6': [
    { ayah: '94:5', category: 'lafzi', noteAr: 'الوعد \'فإن مع العسر يسراً\' تكرر حرفياً في آيتين متتاليتين — من أكثر أزواج اللفظي المتتالية استشهاداً في تعليم التحفيظ.' },
  ],
  '95:4': [
    { ayah: '95:5', category: 'ending_variation', noteAr: '95:4 \'لقد خلقنا الإنسان في أحسن تقويم\' و95:5 \'ثم رددناه أسفل سافلين\' هما الزوج المتضاد الأساسي في التين — الحدود بين هاتين الآيتين المتتاليتين غالباً ما توضع خطأً.' },
  ],
  '95:5': [
    { ayah: '95:4', category: 'ending_variation', noteAr: '95:4 \'لقد خلقنا الإنسان في أحسن تقويم\' و95:5 \'ثم رددناه أسفل سافلين\' هما الزوج المتضاد الأساسي في التين — الحدود بين هاتين الآيتين المتتاليتين غالباً ما توضع خطأً.' },
  ],
  '96:1': [
    { ayah: '96:3', category: 'word_swap', noteAr: '96:1 \'اقرأ باسم ربك الذي خلق\' و96:3 \'اقرأ وربك الأكرم\' كلاهما يبدأ بالأمر \'اقرأ\' لكن يستمران بشكل مختلف — الأمر المتكرر بآيتين تفصل بينهما مع تتمة مختلفة.' },
  ],
  '96:3': [
    { ayah: '96:1', category: 'word_swap', noteAr: '96:1 \'اقرأ باسم ربك الذي خلق\' و96:3 \'اقرأ وربك الأكرم\' كلاهما يبدأ بالأمر \'اقرأ\' لكن يستمران بشكل مختلف — الأمر المتكرر بآيتين تفصل بينهما مع تتمة مختلفة.' },
  ],
  '98:8': [
    { ayah: '5:119', category: 'lafzi', noteAr: 'كلاهما يشتركان في \'جنات تجري من تحتها الأنهار خالدين فيها رضي الله عنهم ورضوا عنه\'؛ 5:119 هي كلمة الصادقين (عيسى يشهد)، 98:8 هو ثواب المؤمنين من أهل الكتاب.' },
  ],
  '99:7': [
    { ayah: '99:8', category: 'word_swap', noteAr: 'الزلزلة تختم بزوج مرآتي: 99:7 \'فمن يعمل مثقال ذرة خيراً يره\' و99:8 \'ومن يعمل مثقال ذرة شراً يره\' — خيراً مقابل شراً هو التغيير الوحيد.' },
  ],
  '99:8': [
    { ayah: '99:7', category: 'word_swap', noteAr: 'الزلزلة تختم بزوج مرآتي: 99:7 \'فمن يعمل مثقال ذرة خيراً يره\' و99:8 \'ومن يعمل مثقال ذرة شراً يره\' — خيراً مقابل شراً هو التغيير الوحيد.' },
  ],
  '9:111': [
    { ayah: '61:10', category: 'word_swap', noteAr: '9:111 \'إن الله اشترى من المؤمنين أنفسهم وأموالهم بأن لهم الجنة\' و61:10-11 كلاهما يصف المقايضة الإلهية بالأرواح والأموال مقابل الجنة — نفس زوج \'أنفس + أموال\' يرد في كليهما، لكن بصياغة وسياق مختلفين.' },
  ],
  '9:114': [
    { ayah: '11:75', category: 'addition_omission', noteAr: 'كلاهما يصف إبراهيم بأنه \'أواه حليم\' لكن 11:75 تعكس الترتيب إلى \'حليم أواه\' وتضيف \'منيب\' في النهاية.' },
  ],
  '9:33': [
    { ayah: '48:28', category: 'lafzi', noteAr: 'كلاهما يفتتح بمهمة النبي لإظهار الحق على الدين كله؛ 9:33 (وكذلك 61:9) تنتهي \'ولو كره المشركون\' بينما 48:28 تنتهي \'وكفى بالله شهيداً\' — نفس المهمة، خاتمة مختلفة.' },
    { ayah: '61:9', category: 'lafzi', noteAr: 'آية متطابقة عن إرسال الله رسوله بالهدى ودين الحق ليظهره على الدين كله.' },
  ],
  '9:70': [
    { ayah: '30:9', category: 'lafzi', noteAr: 'كلاهما يشتركان في صيغة ظلم الأمم لأنفسها: \'جاءتهم رسلهم بالبينات وما كان الله ليظلمهم ولكن كانوا أنفسهم يظلمون\'؛ 9:70 في قائمة الأمم المهلكة، 30:9 تختم دعوة السياحة في الأرض.' },
  ],
  '9:73': [
    { ayah: '66:9', category: 'lafzi', noteAr: 'أمر متطابق للنبي بجهاد الكفار والمنافقين والغلظة عليهم؛ مأواهم جهنم.' },
  ],
  '9:94': [
    { ayah: '62:8', category: 'lafzi', noteAr: 'نص متطابق: \'ثم تردون إلى عالم الغيب والشهادة فينبئكم بما كنتم تعملون\'؛ 9:94 موجه للمنافقين الذين تخلفوا عن تبوك، 62:8 يرد على الذين يفرون من الموت.' },
  ],
};