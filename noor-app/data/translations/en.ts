export interface TranslationEntry {
  surahId: number;
  ayahNumber: number;
  text: string;
}

export const englishTranslation: TranslationEntry[] = [
  // Al-Fatiha
  { surahId: 1, ayahNumber: 1, text: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
  { surahId: 1, ayahNumber: 2, text: '[All] praise is [due] to Allah, Lord of the worlds.' },
  { surahId: 1, ayahNumber: 3, text: 'The Entirely Merciful, the Especially Merciful.' },
  { surahId: 1, ayahNumber: 4, text: 'Sovereign of the Day of Recompense.' },
  { surahId: 1, ayahNumber: 5, text: 'It is You we worship and You we ask for help.' },
  { surahId: 1, ayahNumber: 6, text: 'Guide us to the straight path.' },
  { surahId: 1, ayahNumber: 7, text: 'The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.' },

  // Al-Baqarah (first 20 ayahs)
  { surahId: 2, ayahNumber: 1, text: 'Alif, Lam, Meem.' },
  { surahId: 2, ayahNumber: 2, text: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.' },
  { surahId: 2, ayahNumber: 3, text: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them.' },
  { surahId: 2, ayahNumber: 4, text: 'And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].' },
  { surahId: 2, ayahNumber: 5, text: 'Those are upon [right] guidance from their Lord, and it is those who are the successful.' },
  { surahId: 2, ayahNumber: 6, text: 'Indeed, those who disbelieve - it is all the same for them whether you warn them or do not warn them - they will not believe.' },
  { surahId: 2, ayahNumber: 7, text: 'Allah has set a seal upon their hearts and upon their hearing, and over their vision is a veil. And for them is a great punishment.' },
  { surahId: 2, ayahNumber: 8, text: 'And of the people are some who say, "We believe in Allah and the Last Day," but they are not believers.' },
  { surahId: 2, ayahNumber: 9, text: 'They [think to] deceive Allah and those who believe, but they deceive not except themselves and perceive [it] not.' },
  { surahId: 2, ayahNumber: 10, text: 'In their hearts is disease, so Allah has increased their disease; and for them is a painful punishment because they [habitually] used to lie.' },
  { surahId: 2, ayahNumber: 11, text: 'And when it is said to them, "Do not cause corruption on the earth," they say, "We are but reformers."' },
  { surahId: 2, ayahNumber: 12, text: 'Unquestionably, it is they who are the corrupters, but they perceive [it] not.' },
  { surahId: 2, ayahNumber: 13, text: 'And when it is said to them, "Believe as the people have believed," they say, "Should we believe as the foolish have believed?" Unquestionably, it is they who are the foolish, but they know [it] not.' },
  { surahId: 2, ayahNumber: 14, text: 'And when they meet those who believe, they say, "We believe"; but when they are alone with their evil ones, they say, "Indeed, we are with you; we were only mockers."' },
  { surahId: 2, ayahNumber: 15, text: '[But] Allah mocks them and prolongs them in their transgression [while] they wander blindly.' },
  { surahId: 2, ayahNumber: 16, text: 'Those are the ones who have purchased error [in exchange] for guidance, so their transaction has brought no profit, nor were they guided.' },
  { surahId: 2, ayahNumber: 17, text: 'Their example is that of one who kindled a fire, but when it illuminated what was around him, Allah took away their light and left them in darkness [so] they could not see.' },
  { surahId: 2, ayahNumber: 18, text: 'Deaf, dumb and blind - so they will not return [to the right path].' },
  { surahId: 2, ayahNumber: 19, text: 'Or [it is] like a rainstorm from the sky within which is darkness, thunder and lightning. They put their fingers in their ears against the thunderclaps in dread of death. But Allah is encompassing of the disbelievers.' },
  { surahId: 2, ayahNumber: 20, text: 'The lightning almost snatches away their sight. Every time it lights [the way] for them, they walk therein; but when darkness comes over them, they stand [still]. And if Allah had willed, He could have taken away their hearing and their sight. Indeed, Allah is over all things competent.' },

  // Al-Imran (first 10)
  { surahId: 3, ayahNumber: 1, text: 'Alif, Lam, Meem.' },
  { surahId: 3, ayahNumber: 2, text: 'Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining.' },
  { surahId: 3, ayahNumber: 3, text: 'He has sent down upon you, [O Muhammad], the Book in truth, confirming what was before it. And He revealed the Torah and the Gospel.' },
  { surahId: 3, ayahNumber: 4, text: 'Before, as guidance for the people. And He revealed the Criterion. Indeed, those who disbelieve in the verses of Allah will have a severe punishment, and Allah is exalted in Might, the Owner of Retribution.' },
  { surahId: 3, ayahNumber: 5, text: 'Indeed, from Allah nothing is hidden in the earth nor in the heaven.' },
  { surahId: 3, ayahNumber: 6, text: 'It is He who forms you in the wombs however He wills. There is no deity except Him, the Exalted in Might, the Wise.' },
  { surahId: 3, ayahNumber: 7, text: 'It is He who has sent down to you the Book; in it are verses [that are] precise - they are the foundation of the Book - and others unspecific.' },
  { surahId: 3, ayahNumber: 8, text: '[Who say], "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower."' },
  { surahId: 3, ayahNumber: 9, text: '"Our Lord, surely You will gather the people for a Day about which there is no doubt. Indeed, Allah does not fail in His promise."' },
  { surahId: 3, ayahNumber: 10, text: 'Indeed, those who disbelieve - never will their wealth or their children avail them against Allah at all. And it is they who are fuel for the Fire.' },

  // An-Nisa (first 5)
  { surahId: 4, ayahNumber: 1, text: 'O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women.' },
  { surahId: 4, ayahNumber: 2, text: 'And give to the orphans their properties and do not substitute the defective [of your own] for the good [of theirs].' },
  { surahId: 4, ayahNumber: 3, text: 'And if you fear that you will not deal justly with the orphan girls, then marry those that please you of [other] women, two or three or four.' },
  { surahId: 4, ayahNumber: 4, text: 'And give the women [upon marriage] their [bridal] gifts graciously.' },
  { surahId: 4, ayahNumber: 5, text: 'And do not give the weak-minded your property, which Allah has made a means of sustenance for you.' },

  // Al-Ma\'idah (first 5)
  { surahId: 5, ayahNumber: 1, text: 'O you who have believed, fulfill [all] contracts.' },
  { surahId: 5, ayahNumber: 2, text: 'And cooperate in righteousness and piety, but do not cooperate in sin and aggression. And fear Allah; indeed, Allah is severe in penalty.' },
  { surahId: 5, ayahNumber: 3, text: 'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion.' },
  { surahId: 5, ayahNumber: 4, text: 'They ask you, [O Muhammad], what has been made lawful for them. Say, "Lawful for you are [all] good foods."' },
  { surahId: 5, ayahNumber: 5, text: 'This day [all] good foods have been made lawful, and the food of those who were given the Scripture is lawful for you and your food is lawful for them.' },
];
