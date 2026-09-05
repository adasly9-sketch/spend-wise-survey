import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "tr" | "pl";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
];

type Dict = Record<string, string | string[] | Record<string, string>>;

const STORAGE_KEY = "thesis-lang";

// ------- Translations -------
// Keep stored data (option values, answer scores) in English; only display text is translated.
const dict: Record<Lang, Dict> = {
  en: {
    // Language switcher
    langLabel: "Language",

    // Consent page
    consent_eyebrow: "University of Warsaw · Psychology Faculty",
    consent_title: "Research Consent Form",
    consent_intro: "Please read the following information carefully before proceeding.",
    consent_h_purpose: "What is the purpose of this study?",
    consent_purpose_1:
      "This study is conducted by researchers at the University of Warsaw, Faculty of Psychology. The purpose of this research is to investigate individual differences in psychological characteristics and everyday behaviours. The study aims to explore whether certain individual characteristics are associated with differences in people's everyday choices, experiences, and behaviours.",
    consent_purpose_2:
      "To avoid influencing participants' responses, the specific relationships being investigated will not be described in detail before participation. A full explanation of the research purpose and hypotheses will be provided in the debriefing information at the end of the study.",
    consent_h_involve: "What does your participation involve?",
    consent_involve_1:
      "Your participation involves completing an online questionnaire that will take approximately 10 minutes to complete.",
    consent_involve_2:
      "You will be asked questions about your personality, everyday behaviours, spending habits, and some basic demographic information such as age, gender, and income range.",
    consent_involve_3:
      "Participation in this study is completely voluntary. If you decide not to participate, there will be no negative consequences. If you choose to participate, you may withdraw from the study at any time without penalty and without having to provide a reason, subject to the point at which your data have been anonymised.",
    consent_h_important: "Why is your participation important?",
    consent_important_1:
      "Every participant's response is valuable. Your participation will help us collect data and examine patterns between psychological characteristics and everyday behaviour. The information collected from participants will contribute to a better understanding of individual differences and behavioural patterns.",
    consent_important_2:
      "Because this research relies on participants' individual responses, it is particularly important that you answer all questions honestly and to the best of your knowledge. There are no right or wrong answers to the questions in this study. Honest responses will help ensure that the results are as reliable and meaningful as possible.",
    consent_h_privacy: "How will your personal information be kept?",
    consent_privacy_1:
      "Your participation will be confidential and your responses will be treated as anonymous. No personally identifiable information will be collected as part of the study. The data will be analysed collectively, meaning that individual participants will not be identified in the research results.",
    consent_privacy_2:
      "The research data will be stored securely and access will be restricted to the research team. Data will be handled in accordance with applicable data protection requirements, including GDPR regulations in Poland.",
    consent_h_risks: "Are there any possible risks?",
    consent_risks_1:
      "This study is considered to involve low risk. Some questions may ask you to reflect on personal characteristics, behaviours, or spending habits, which may cause mild discomfort for some participants. You may discontinue participation if you become uncomfortable.",
    consent_risks_2:
      "A full debriefing explaining the purpose of the research and what the study was specifically investigating will be provided after you complete the questionnaire.",
    consent_h_contact: "Contact information",
    consent_contact_prefix: "If you have any questions about this study, please contact:",
    consent_h_consent: "Consent",
    consent_confirm: "By selecting “YES – I give consent”, I confirm that:",
    consent_points: [
      "I have read and understood the information provided above.",
      "I understand that participation is voluntary.",
      "I understand that I may withdraw from the study without penalty, subject to the point at which my data have been anonymised.",
      "I understand what participation in the study involves.",
      "I agree to answer all questions honestly and to the best of my knowledge.",
      "I understand that there are no right or wrong answers.",
      "I understand that the specific research relationships being investigated will be explained to me after completing the study.",
      "I freely agree to participate in this research.",
    ],
    consent_select_one: "Please select one:",
    consent_yes: "YES — I give my consent to participate",
    consent_no: "NO — I do not agree to participate",
    consent_yes_hint:
      "Selecting YES confirms you have read and understood the information above, agree to these terms, and will answer the questions honestly and to the best of your knowledge.",

    // Survey page
    survey_eyebrow: "Academic Research Survey",
    survey_title: "Spending on Physical Appearance",
    survey_intro:
      "Part 1 of 2. Your answers are anonymous and used solely for academic research. This short survey takes about 2 minutes.",
    step_survey: "1 · Survey",
    step_questionnaire: "2 · Questionnaire",

    q_age_label: "What is your age?",
    q_age_hint: "Enter your age in years.",
    q_age_ph: "e.g. 24",
    q_age_err: "Please enter a whole number between 16 and 100.",

    q_gender_label: "What is your gender?",
    q_gender_hint: "Select the option that best describes you.",
    q_gender_err: "Please select an option.",
    gender_female: "Female",
    gender_male: "Male",
    gender_na: "Prefer not to say",

    q_nat_label: "What is your nationality?",
    q_nat_hint:
      "Enter the country you hold citizenship or identify with (e.g. “Polish”, “Turkish”, “American”).",
    q_nat_ph: "e.g. Polish",
    q_nat_err: "Please enter your nationality.",

    q_spend_label:
      "Roughly what share of your disposable income do you spend on physical-appearance-related purchases?",
    q_spend_hint:
      "Disposable income is the total amount of money you have left to spend or save after paying taxes and mandatory government deductions. Pick the range that best fits your typical spending.",
    q_spend_err: "Please select an estimated range.",
    q_spend_includes: "Includes, for example",
    q_spend_examples:
      "Hair trimming & hair care, Makeup, Skincare, Anti-aging products, Fitness & body-composition products (e.g. push-up bras, shaping underwear, gym supplements), Cosmetics, Clothing, Accessories.",
    q_spend_note:
      "Think about recurring and occasional spending together — not a single month, but your typical pattern over a year.",
    spend_0: "0% — None",
    spend_1_5: "1–5%",
    spend_6_10: "6–10%",
    spend_11_15: "11–15%",
    spend_16_25: "16–25%",
    spend_26_40: "26–40%",
    spend_41_60: "41–60%",
    spend_61: "Over 60%",

    q_career_label: "What is your current career or occupation?",
    q_career_hint:
      "Describe your job title, field, or professional area (e.g. “marketing manager”, “student”, “teacher”, “nurse”, “self-employed designer”).",
    q_career_ph: "e.g. software developer",
    q_career_err: "Please describe your current occupation or field.",

    q_email_label:
      "Would you like to take part in further studies? If so, please leave your email.",
    q_email_hint:
      "This is entirely optional — you can skip this question and leave the box empty. Your email will only be used to contact you about future research.",
    q_email_ph: "optional — e.g. your.name@example.com",
    q_email_err: "Please enter a valid email address, or leave this field empty.",
    q_email_note: "Leaving this blank is perfectly fine.",

    survey_review: "You can review your answers before continuing.",
    survey_next: "Next: Questionnaire",
    survey_footer: "Anonymous academic research · No personal identifying data is collected.",

    // Questionnaire
    questionnaire_title: "Questionnaire",
    questionnaire_intro:
      "Part 2 of the study. Read each statement and choose how much you agree or disagree. There are no right or wrong answers — answer honestly and go with your first impression.",
    percent_complete: "{n}% complete",
    page_of: "Page {a} of {b}",
    submit: "Submit answers",
    submitting: "Submitting…",
    previous: "Previous",
    next: "Next",
    q_error_all: "Please answer every question before submitting.",
    q_error_save: "Something went wrong while saving your answers. Please try again.",
    q_bottom_note: "You must answer every question before you can submit.",
    back_to_survey: "Back to survey",
    likert_1: "Strongly Disagree",
    likert_2: "Disagree",
    likert_3: "Neutral",
    likert_4: "Agree",
    likert_5: "Strongly Agree",

    // Debriefing
    debrief_eyebrow: "Research Debriefing Form",
    debrief_title: "Thank you for participating!",
    debrief_intro: "Thank you for taking the time to complete this study.",
    debrief_h_about: "What was this study about?",
    debrief_about_1:
      "The purpose of this study was to investigate the relationship between personality traits and appearance-related spending.",
    debrief_about_2:
      "More specifically, the study examined whether individual differences in personality, particularly Neuroticism and Conscientiousness, are associated with the amount people spend on products and services related to their physical appearance.",
    debrief_about_3: "Appearance-related spending in this study includes areas such as:",
    debrief_areas: [
      "Skincare and cosmetics",
      "Clothing and accessories purchased primarily for appearance",
      "Hair treatments and styling",
      "Cosmetic or aesthetic procedures",
      "Fitness and body-composition products",
    ],
    debrief_h_expect: "What were the researchers expecting to find?",
    debrief_expect_intro: "The study was based on the following hypotheses:",
    debrief_h1_label: "Hypothesis 1:",
    debrief_h1_text:
      "Higher levels of Neuroticism will be associated with greater appearance-related spending.",
    debrief_h2_label: "Hypothesis 2:",
    debrief_h2_text:
      "Higher levels of Conscientiousness will be associated with appearance-related spending, particularly spending related to health and fitness.",
    debrief_expect_note:
      "These hypotheses are predictions and are not guaranteed outcomes. The collected data will be used to determine whether the predicted relationships are supported.",
    debrief_h_why: "Why is this research important?",
    debrief_why_1:
      "Appearance-related spending is an important part of everyday consumer behaviour. However, the individual characteristics that may be associated with differences in this type of spending are not fully understood.",
    debrief_why_2:
      "By examining the relationship between personality traits and appearance-related spending, this research may contribute to a better understanding of personality psychology and consumer behaviour. The results may also help researchers better understand why individuals differ in the amount they spend on appearance-related products and services.",
    debrief_h_you: "Your participation",
    debrief_you_1:
      "Your responses are valuable to this research. By answering the questions honestly and to the best of your knowledge, you have helped contribute to the data used to investigate these relationships.",
    debrief_you_2:
      "There were no right or wrong answers to the personality or spending questions. The study was interested in your genuine responses and individual experiences.",
    debrief_h_thanks: "Thank you!",
    debrief_thanks_1: "We sincerely appreciate your time and participation in this research.",
    debrief_thanks_2:
      "If you have any questions about the study or would like further information, please contact:",
    back_to_start: "Back to start",
    debrief_footer: "Anonymous academic research · University of Warsaw",

    // Thank you (declined)
    thanks_title: "Thank you",
    thanks_declined:
      "You chose not to take part in this study.\u00A0\nNo data has been collected from you, and none will be stored.",
    thanks_generic: "Thank you for your time. No data has been collected from you.",

    // Big Five items
    big5: {
      "1": "I am the life of the party.",
      "2": "I feel little concern for others.",
      "3": "I am always prepared.",
      "4": "I get stressed out easily.",
      "5": "I have a rich vocabulary.",
      "6": "I don't talk a lot.",
      "7": "I am interested in people.",
      "8": "I leave my belongings around.",
      "9": "I am relaxed most of the time.",
      "10": "I have difficulty understanding abstract ideas.",
      "11": "I feel comfortable around people.",
      "12": "I insult people.",
      "13": "I pay attention to details.",
      "14": "I worry about things.",
      "15": "I have a vivid imagination.",
      "16": "I keep in the background.",
      "17": "I sympathize with others' feelings.",
      "18": "I make a mess of things.",
      "19": "I seldom feel blue.",
      "20": "I am not interested in abstract ideas.",
      "21": "I start conversations.",
      "22": "I am not interested in other people's problems.",
      "23": "I get chores done right away.",
      "24": "I am easily disturbed.",
      "25": "I have excellent ideas.",
      "26": "I have little to say.",
      "27": "I have a soft heart.",
      "28": "I often forget to put things back in their proper place.",
      "29": "I get upset easily.",
      "30": "I do not have a good imagination.",
      "31": "I talk to a lot of different people at parties.",
      "32": "I am not really interested in others.",
      "33": "I like order.",
      "34": "I change my mood a lot.",
      "35": "I am quick to understand things.",
      "36": "I don't like to draw attention to myself.",
      "37": "I take time out for others.",
      "38": "I shirk my duties.",
      "39": "I have frequent mood swings.",
      "40": "I use difficult words.",
      "41": "I don't mind being the center of attention.",
      "42": "I feel others' emotions.",
      "43": "I follow a schedule.",
      "44": "I get irritated easily.",
      "45": "I spend time reflecting on things.",
      "46": "I am quiet around strangers.",
      "47": "I make people feel at ease.",
      "48": "I am exacting in my work.",
      "49": "I often feel blue.",
      "50": "I am full of ideas.",
    },
  },

  tr: {
    langLabel: "Dil",

    consent_eyebrow: "Varşova Üniversitesi · Psikoloji Fakültesi",
    consent_title: "Araştırma Onam Formu",
    consent_intro: "Devam etmeden önce lütfen aşağıdaki bilgileri dikkatlice okuyun.",
    consent_h_purpose: "Bu çalışmanın amacı nedir?",
    consent_purpose_1:
      "Bu çalışma, Varşova Üniversitesi Psikoloji Fakültesi'ndeki araştırmacılar tarafından yürütülmektedir. Araştırmanın amacı, psikolojik özelliklerdeki bireysel farklılıkları ve günlük davranışları incelemektir. Çalışma, belirli bireysel özelliklerin insanların günlük seçimlerindeki, deneyimlerindeki ve davranışlarındaki farklılıklarla ilişkili olup olmadığını araştırmayı hedeflemektedir.",
    consent_purpose_2:
      "Katılımcıların yanıtlarını etkilememek için, araştırılan spesifik ilişkiler katılımdan önce ayrıntılı olarak açıklanmayacaktır. Araştırmanın amacı ve hipotezleri hakkında tam bir açıklama, çalışmanın sonundaki bilgilendirme (debriefing) bölümünde sunulacaktır.",
    consent_h_involve: "Katılımınız neleri içerir?",
    consent_involve_1:
      "Katılımınız, tamamlanması yaklaşık 10 dakika sürecek bir çevrimiçi anketi doldurmayı içerir.",
    consent_involve_2:
      "Kişiliğiniz, günlük davranışlarınız, harcama alışkanlıklarınız ve yaş, cinsiyet ve gelir aralığı gibi bazı temel demografik bilgileriniz hakkında sorular sorulacaktır.",
    consent_involve_3:
      "Bu çalışmaya katılım tamamen gönüllüdür. Katılmamaya karar verirseniz olumsuz bir sonucu olmayacaktır. Katılmayı seçerseniz, verileriniz anonimleştirilene kadar herhangi bir zamanda ceza ödemeden ve gerekçe göstermek zorunda kalmadan çalışmadan çekilebilirsiniz.",
    consent_h_important: "Katılımınız neden önemli?",
    consent_important_1:
      "Her katılımcının yanıtı değerlidir. Katılımınız, psikolojik özellikler ile günlük davranışlar arasındaki örüntüleri incelemek için veri toplamamıza yardımcı olacaktır. Katılımcılardan toplanan bilgiler, bireysel farklılıkların ve davranış örüntülerinin daha iyi anlaşılmasına katkıda bulunacaktır.",
    consent_important_2:
      "Bu araştırma katılımcıların bireysel yanıtlarına dayandığından, tüm soruları dürüstçe ve bildiğiniz en iyi şekilde yanıtlamanız özellikle önemlidir. Bu çalışmadaki soruların doğru ya da yanlış cevabı yoktur. Dürüst yanıtlar, sonuçların mümkün olduğunca güvenilir ve anlamlı olmasına yardımcı olacaktır.",
    consent_h_privacy: "Kişisel bilgileriniz nasıl saklanacak?",
    consent_privacy_1:
      "Katılımınız gizli olacak ve yanıtlarınız anonim olarak ele alınacaktır. Çalışma kapsamında kimliği belirleyici hiçbir bilgi toplanmayacaktır. Veriler toplu olarak analiz edilecek, yani araştırma sonuçlarında bireysel katılımcılar tanımlanmayacaktır.",
    consent_privacy_2:
      "Araştırma verileri güvenli bir şekilde saklanacak ve erişim yalnızca araştırma ekibiyle sınırlı olacaktır. Veriler, Polonya'daki GDPR düzenlemeleri de dahil olmak üzere geçerli veri koruma gerekliliklerine uygun olarak işlenecektir.",
    consent_h_risks: "Olası riskler var mı?",
    consent_risks_1:
      "Bu çalışma düşük riskli kabul edilmektedir. Bazı sorular kişisel özellikler, davranışlar veya harcama alışkanlıkları üzerinde düşünmenizi isteyebilir; bu bazı katılımcılar için hafif bir rahatsızlığa neden olabilir. Rahatsız olursanız katılımı bırakabilirsiniz.",
    consent_risks_2:
      "Araştırmanın amacını ve çalışmanın özellikle neyi araştırdığını açıklayan tam bir bilgilendirme, anketi tamamladıktan sonra size sunulacaktır.",
    consent_h_contact: "İletişim bilgileri",
    consent_contact_prefix: "Bu çalışma hakkında sorularınız varsa lütfen iletişime geçin:",
    consent_h_consent: "Onam",
    consent_confirm: "\"EVET – Onay veriyorum\" seçeneğini seçerek şunları onaylıyorum:",
    consent_points: [
      "Yukarıda verilen bilgileri okudum ve anladım.",
      "Katılımın gönüllü olduğunu anlıyorum.",
      "Verilerim anonimleştirilene kadar ceza almadan çalışmadan çekilebileceğimi anlıyorum.",
      "Çalışmaya katılımın neleri içerdiğini anlıyorum.",
      "Tüm soruları dürüstçe ve bildiğim en iyi şekilde yanıtlamayı kabul ediyorum.",
      "Doğru ya da yanlış cevap olmadığını anlıyorum.",
      "Araştırılan spesifik ilişkilerin çalışma tamamlandıktan sonra bana açıklanacağını anlıyorum.",
      "Bu araştırmaya katılmayı özgürce kabul ediyorum.",
    ],
    consent_select_one: "Lütfen birini seçin:",
    consent_yes: "EVET — Katılmayı onaylıyorum",
    consent_no: "HAYIR — Katılmayı kabul etmiyorum",
    consent_yes_hint:
      "EVET seçmek, yukarıdaki bilgileri okuyup anladığınızı, bu koşulları kabul ettiğinizi ve soruları dürüstçe, bildiğiniz en iyi şekilde yanıtlayacağınızı doğrular.",

    survey_eyebrow: "Akademik Araştırma Anketi",
    survey_title: "Fiziksel Görünüme Yönelik Harcamalar",
    survey_intro:
      "2 bölümden 1. bölüm. Yanıtlarınız anonimdir ve yalnızca akademik araştırma için kullanılır. Bu kısa anket yaklaşık 2 dakika sürer.",
    step_survey: "1 · Anket",
    step_questionnaire: "2 · Sorular",

    q_age_label: "Kaç yaşındasınız?",
    q_age_hint: "Yaşınızı yıl olarak girin.",
    q_age_ph: "örn. 24",
    q_age_err: "Lütfen 16 ile 100 arasında tam bir sayı girin.",

    q_gender_label: "Cinsiyetiniz nedir?",
    q_gender_hint: "Sizi en iyi tanımlayan seçeneği işaretleyin.",
    q_gender_err: "Lütfen bir seçenek belirleyin.",
    gender_female: "Kadın",
    gender_male: "Erkek",
    gender_na: "Belirtmek istemiyorum",

    q_nat_label: "Milliyetiniz nedir?",
    q_nat_hint:
      "Vatandaşı olduğunuz ya da kendinizi ait hissettiğiniz ülkeyi girin (örn. \"Türk\", \"Polonyalı\", \"Amerikalı\").",
    q_nat_ph: "örn. Türk",
    q_nat_err: "Lütfen milliyetinizi girin.",

    q_spend_label:
      "Kullanılabilir gelirinizin yaklaşık ne kadarını fiziksel görünümle ilgili harcamalara ayırıyorsunuz?",
    q_spend_hint:
      "Kullanılabilir gelir; vergiler ve zorunlu devlet kesintileri ödendikten sonra harcamak veya biriktirmek için elinizde kalan toplam paradır. Tipik harcamanıza en uygun aralığı seçin.",
    q_spend_err: "Lütfen tahmini bir aralık seçin.",
    q_spend_includes: "Örneğin şunları içerir",
    q_spend_examples:
      "Saç kesimi ve saç bakımı, Makyaj, Cilt bakımı, Yaşlanma karşıtı ürünler, Fitness ve vücut şekillendirme ürünleri (örn. push-up sütyenler, şekillendirici iç çamaşırları, spor takviyeleri), Kozmetik, Giyim, Aksesuar.",
    q_spend_note:
      "Düzenli ve arada bir yapılan harcamaları birlikte düşünün — tek bir ayı değil, yıl içindeki tipik alışkanlığınızı.",
    spend_0: "%0 — Hiç",
    spend_1_5: "%1–5",
    spend_6_10: "%6–10",
    spend_11_15: "%11–15",
    spend_16_25: "%16–25",
    spend_26_40: "%26–40",
    spend_41_60: "%41–60",
    spend_61: "%60'ın üzerinde",

    q_career_label: "Şu anki mesleğiniz veya işiniz nedir?",
    q_career_hint:
      "Ünvanınızı, alanınızı veya çalıştığınız sektörü kısaca yazın (örn. \"pazarlama müdürü\", \"öğrenci\", \"öğretmen\", \"hemşire\", \"serbest çalışan tasarımcı\").",
    q_career_ph: "örn. yazılım geliştirici",
    q_career_err: "Lütfen şu anki mesleğinizi veya alanınızı belirtin.",

    q_email_label:
      "İleride yapılacak çalışmalara katılmak ister misiniz? İsterseniz lütfen e-postanızı bırakın.",
    q_email_hint:
      "Bu tamamen isteğe bağlıdır — bu soruyu atlayabilir ve kutuyu boş bırakabilirsiniz. E-postanız yalnızca ileride yapılacak araştırmalar hakkında sizinle iletişime geçmek için kullanılacaktır.",
    q_email_ph: "isteğe bağlı — örn. adin.soyadin@ornek.com",
    q_email_err: "Lütfen geçerli bir e-posta adresi girin veya bu alanı boş bırakın.",
    q_email_note: "Boş bırakmanızda hiçbir sakınca yoktur.",

    survey_review: "Devam etmeden önce yanıtlarınızı gözden geçirebilirsiniz.",
    survey_next: "Devam: Sorular",
    survey_footer:
      "Anonim akademik araştırma · Kimliği belirleyen hiçbir bilgi toplanmaz.",

    questionnaire_title: "Sorular",
    questionnaire_intro:
      "Çalışmanın 2. bölümü. Her ifadeyi okuyun ve ne kadar katılıp katılmadığınızı seçin. Doğru ya da yanlış cevap yoktur — dürüstçe ve ilk izleniminize göre yanıtlayın.",
    percent_complete: "%{n} tamamlandı",
    page_of: "Sayfa {a} / {b}",
    submit: "Yanıtları gönder",
    submitting: "Gönderiliyor…",
    previous: "Önceki",
    next: "Sonraki",
    q_error_all: "Göndermeden önce lütfen tüm soruları yanıtlayın.",
    q_error_save: "Yanıtlarınız kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin.",
    q_bottom_note: "Gönderebilmek için tüm soruları yanıtlamış olmanız gerekir.",
    back_to_survey: "Ankete geri dön",
    likert_1: "Kesinlikle Katılmıyorum",
    likert_2: "Katılmıyorum",
    likert_3: "Kararsızım",
    likert_4: "Katılıyorum",
    likert_5: "Kesinlikle Katılıyorum",

    debrief_eyebrow: "Araştırma Bilgilendirme Formu",
    debrief_title: "Katıldığınız için teşekkür ederiz!",
    debrief_intro: "Bu çalışmayı tamamlamak için zaman ayırdığınız için teşekkür ederiz.",
    debrief_h_about: "Bu çalışma neyle ilgiliydi?",
    debrief_about_1:
      "Bu çalışmanın amacı, kişilik özellikleri ile görünümle ilgili harcamalar arasındaki ilişkiyi araştırmaktı.",
    debrief_about_2:
      "Daha spesifik olarak, çalışma; kişilikteki bireysel farklılıkların, özellikle Nevrotiklik ve Sorumluluk boyutlarının, insanların fiziksel görünümleriyle ilgili ürün ve hizmetlere harcadıkları miktarla ilişkili olup olmadığını inceledi.",
    debrief_about_3:
      "Bu çalışmadaki görünümle ilgili harcamalar aşağıdaki gibi alanları kapsar:",
    debrief_areas: [
      "Cilt bakımı ve kozmetik",
      "Öncelikle görünüm için satın alınan giyim ve aksesuar",
      "Saç bakımı ve şekillendirme",
      "Kozmetik veya estetik işlemler",
      "Fitness ve vücut şekillendirme ürünleri",
    ],
    debrief_h_expect: "Araştırmacılar ne bulmayı bekliyorlardı?",
    debrief_expect_intro: "Çalışma aşağıdaki hipotezlere dayanıyordu:",
    debrief_h1_label: "Hipotez 1:",
    debrief_h1_text:
      "Daha yüksek Nevrotiklik düzeyleri, daha yüksek görünümle ilgili harcamalarla ilişkilendirilecektir.",
    debrief_h2_label: "Hipotez 2:",
    debrief_h2_text:
      "Daha yüksek Sorumluluk düzeyleri, özellikle sağlık ve fitness ile ilgili görünüm harcamalarıyla ilişkilendirilecektir.",
    debrief_expect_note:
      "Bu hipotezler tahmindir ve garanti edilmiş sonuçlar değildir. Toplanan veriler, öngörülen ilişkilerin desteklenip desteklenmediğini belirlemek için kullanılacaktır.",
    debrief_h_why: "Bu araştırma neden önemli?",
    debrief_why_1:
      "Görünümle ilgili harcamalar, günlük tüketici davranışının önemli bir parçasıdır. Ancak bu tür harcamalardaki farklılıklarla ilişkili olabilecek bireysel özellikler tam olarak anlaşılamamıştır.",
    debrief_why_2:
      "Kişilik özellikleri ile görünüm harcamaları arasındaki ilişkiyi inceleyerek bu araştırma, kişilik psikolojisinin ve tüketici davranışının daha iyi anlaşılmasına katkıda bulunabilir. Sonuçlar ayrıca araştırmacıların, bireylerin görünümle ilgili ürün ve hizmetlere harcadıkları miktarların neden farklılaştığını daha iyi anlamasına yardımcı olabilir.",
    debrief_h_you: "Katılımınız",
    debrief_you_1:
      "Yanıtlarınız bu araştırma için değerlidir. Soruları dürüstçe ve bildiğiniz en iyi şekilde yanıtlayarak, bu ilişkileri araştırmak için kullanılan verilere katkıda bulundunuz.",
    debrief_you_2:
      "Kişilik veya harcama sorularının doğru ya da yanlış cevabı yoktu. Çalışma sizin gerçek yanıtlarınız ve bireysel deneyimlerinizle ilgileniyordu.",
    debrief_h_thanks: "Teşekkürler!",
    debrief_thanks_1:
      "Bu araştırmaya ayırdığınız zaman ve katılımınız için içtenlikle teşekkür ederiz.",
    debrief_thanks_2:
      "Çalışma hakkında sorularınız varsa veya daha fazla bilgi almak isterseniz lütfen iletişime geçin:",
    back_to_start: "Başlangıca dön",
    debrief_footer: "Anonim akademik araştırma · Varşova Üniversitesi",

    thanks_title: "Teşekkürler",
    thanks_declined:
      "Bu çalışmaya katılmamayı tercih ettiniz.\u00A0\nSizden hiçbir veri toplanmadı ve hiçbir veri saklanmayacak.",
    thanks_generic: "Zamanınız için teşekkür ederiz. Sizden hiçbir veri toplanmadı.",

    big5: {
      "1": "Partinin ruhu benim.",
      "2": "Başkalarını pek düşünmem.",
      "3": "Her zaman hazırlıklıyım.",
      "4": "Kolayca strese girerim.",
      "5": "Zengin bir kelime dağarcığım var.",
      "6": "Çok konuşmam.",
      "7": "İnsanlarla ilgilenirim.",
      "8": "Eşyalarımı ortalıkta bırakırım.",
      "9": "Çoğu zaman rahatım.",
      "10": "Soyut fikirleri anlamakta zorlanırım.",
      "11": "İnsanların yanında rahat hissederim.",
      "12": "İnsanlara hakaret ederim.",
      "13": "Ayrıntılara dikkat ederim.",
      "14": "Bazı şeyler hakkında endişelenirim.",
      "15": "Canlı bir hayal gücüm var.",
      "16": "Kendimi arka planda tutarım.",
      "17": "Başkalarının duygularına empati kurarım.",
      "18": "İşleri dağıtırım.",
      "19": "Nadiren mutsuz hissederim.",
      "20": "Soyut fikirlerle ilgilenmem.",
      "21": "Sohbet başlatırım.",
      "22": "Başkalarının sorunlarıyla ilgilenmem.",
      "23": "Ev işlerini hemen hallederim.",
      "24": "Kolayca rahatsız olurum.",
      "25": "Mükemmel fikirlerim vardır.",
      "26": "Söyleyecek pek bir şeyim yoktur.",
      "27": "Yumuşak kalpliyim.",
      "28": "Eşyaları yerine koymayı sık sık unuturum.",
      "29": "Kolayca üzülürüm.",
      "30": "İyi bir hayal gücüm yoktur.",
      "31": "Partilerde birçok farklı insanla konuşurum.",
      "32": "Aslında başkalarıyla pek ilgilenmem.",
      "33": "Düzeni severim.",
      "34": "Ruh halim sık sık değişir.",
      "35": "Bir şeyleri çabuk kavrarım.",
      "36": "İlgi çekmekten hoşlanmam.",
      "37": "Başkaları için zaman ayırırım.",
      "38": "Sorumluluklarımdan kaçarım.",
      "39": "Sık sık ruh hali dalgalanmaları yaşarım.",
      "40": "Zor kelimeler kullanırım.",
      "41": "İlginin odağı olmaktan çekinmem.",
      "42": "Başkalarının duygularını hissederim.",
      "43": "Bir programa uyarım.",
      "44": "Kolayca sinirlenirim.",
      "45": "Bazı şeyler üzerine düşünmek için zaman ayırırım.",
      "46": "Yabancıların yanında sessizimdir.",
      "47": "İnsanları rahat hissettiririm.",
      "48": "İşimde titizimdir.",
      "49": "Sık sık mutsuz hissederim.",
      "50": "Fikirlerle doluyum.",
    },
  },

  pl: {
    langLabel: "Język",

    consent_eyebrow: "Uniwersytet Warszawski · Wydział Psychologii",
    consent_title: "Formularz świadomej zgody",
    consent_intro: "Przed dalszym krokiem prosimy o uważne zapoznanie się z poniższymi informacjami.",
    consent_h_purpose: "Jaki jest cel tego badania?",
    consent_purpose_1:
      "Badanie jest prowadzone przez naukowców z Wydziału Psychologii Uniwersytetu Warszawskiego. Celem badania jest zbadanie różnic indywidualnych w cechach psychologicznych i codziennych zachowaniach. Badanie ma na celu sprawdzenie, czy pewne cechy indywidualne są związane z różnicami w codziennych wyborach, doświadczeniach i zachowaniach ludzi.",
    consent_purpose_2:
      "Aby nie wpływać na odpowiedzi uczestników, konkretne badane zależności nie zostaną szczegółowo opisane przed udziałem. Pełne wyjaśnienie celu badania i hipotez zostanie przedstawione w informacji podsumowującej (debriefingu) na końcu badania.",
    consent_h_involve: "Co obejmuje Twój udział?",
    consent_involve_1:
      "Twój udział polega na wypełnieniu ankiety internetowej, której wypełnienie zajmuje około 10 minut.",
    consent_involve_2:
      "Zostaniesz zapytany/a o Twoją osobowość, codzienne zachowania, nawyki wydatkowe oraz podstawowe informacje demograficzne, takie jak wiek, płeć i zakres dochodów.",
    consent_involve_3:
      "Udział w tym badaniu jest całkowicie dobrowolny. Jeśli zdecydujesz się nie brać udziału, nie poniesiesz żadnych negatywnych konsekwencji. Jeśli zdecydujesz się wziąć udział, możesz wycofać się z badania w dowolnym momencie bez konsekwencji i bez podania przyczyny, do momentu zanonimizowania Twoich danych.",
    consent_h_important: "Dlaczego Twój udział jest ważny?",
    consent_important_1:
      "Odpowiedź każdego uczestnika jest cenna. Twój udział pomoże nam zebrać dane i zbadać zależności między cechami psychologicznymi a codziennym zachowaniem. Informacje zebrane od uczestników przyczynią się do lepszego zrozumienia różnic indywidualnych i wzorców zachowań.",
    consent_important_2:
      "Ponieważ badanie opiera się na indywidualnych odpowiedziach uczestników, szczególnie ważne jest, abyś odpowiadał/a na wszystkie pytania szczerze i zgodnie ze swoją najlepszą wiedzą. Nie ma prawidłowych ani nieprawidłowych odpowiedzi. Szczere odpowiedzi pomogą zapewnić, że wyniki będą jak najbardziej wiarygodne i znaczące.",
    consent_h_privacy: "Jak będą przechowywane Twoje dane osobowe?",
    consent_privacy_1:
      "Twój udział będzie poufny, a odpowiedzi będą traktowane jako anonimowe. W ramach badania nie będą zbierane żadne dane pozwalające na identyfikację osoby. Dane będą analizowane zbiorczo, co oznacza, że w wynikach badania nie będą identyfikowani poszczególni uczestnicy.",
    consent_privacy_2:
      "Dane badawcze będą przechowywane w bezpieczny sposób, a dostęp do nich będzie ograniczony do zespołu badawczego. Dane będą przetwarzane zgodnie z obowiązującymi wymogami ochrony danych, w tym z przepisami RODO obowiązującymi w Polsce.",
    consent_h_risks: "Czy istnieje jakiekolwiek ryzyko?",
    consent_risks_1:
      "Badanie uznaje się za obarczone niskim ryzykiem. Niektóre pytania mogą wymagać refleksji nad cechami osobistymi, zachowaniami lub nawykami wydatkowymi, co u niektórych uczestników może wywołać lekki dyskomfort. Możesz przerwać udział, jeśli poczujesz się niekomfortowo.",
    consent_risks_2:
      "Pełny debriefing wyjaśniający cel badania i to, co badanie konkretnie sprawdzało, zostanie przedstawiony po zakończeniu ankiety.",
    consent_h_contact: "Dane kontaktowe",
    consent_contact_prefix: "W razie pytań dotyczących badania prosimy o kontakt:",
    consent_h_consent: "Zgoda",
    consent_confirm: "Wybierając „TAK – Wyrażam zgodę”, potwierdzam, że:",
    consent_points: [
      "Zapoznałem/-am się z powyższymi informacjami i je rozumiem.",
      "Rozumiem, że udział jest dobrowolny.",
      "Rozumiem, że mogę wycofać się z badania bez konsekwencji, do momentu zanonimizowania moich danych.",
      "Rozumiem, na czym polega udział w badaniu.",
      "Zgadzam się odpowiadać na wszystkie pytania szczerze i zgodnie z moją najlepszą wiedzą.",
      "Rozumiem, że nie ma prawidłowych ani nieprawidłowych odpowiedzi.",
      "Rozumiem, że konkretne badane zależności zostaną mi wyjaśnione po zakończeniu badania.",
      "Dobrowolnie wyrażam zgodę na udział w tym badaniu.",
    ],
    consent_select_one: "Wybierz jedną opcję:",
    consent_yes: "TAK — Wyrażam zgodę na udział",
    consent_no: "NIE — Nie zgadzam się na udział",
    consent_yes_hint:
      "Wybór TAK potwierdza, że zapoznałeś/-aś się z powyższymi informacjami, zgadzasz się na te warunki i będziesz odpowiadać na pytania szczerze i zgodnie z najlepszą wiedzą.",

    survey_eyebrow: "Ankieta badawcza",
    survey_title: "Wydatki na wygląd fizyczny",
    survey_intro:
      "Część 1 z 2. Twoje odpowiedzi są anonimowe i wykorzystywane wyłącznie w celach badawczych. Krótka ankieta zajmuje około 2 minut.",
    step_survey: "1 · Ankieta",
    step_questionnaire: "2 · Kwestionariusz",

    q_age_label: "Ile masz lat?",
    q_age_hint: "Podaj swój wiek w latach.",
    q_age_ph: "np. 24",
    q_age_err: "Podaj liczbę całkowitą między 16 a 100.",

    q_gender_label: "Jaka jest Twoja płeć?",
    q_gender_hint: "Wybierz opcję, która najlepiej Cię opisuje.",
    q_gender_err: "Wybierz jedną z opcji.",
    gender_female: "Kobieta",
    gender_male: "Mężczyzna",
    gender_na: "Wolę nie mówić",

    q_nat_label: "Jaka jest Twoja narodowość?",
    q_nat_hint:
      "Podaj kraj, którego jesteś obywatelem/-ką lub z którym się identyfikujesz (np. „polska”, „turecka”, „amerykańska”).",
    q_nat_ph: "np. polska",
    q_nat_err: "Podaj swoją narodowość.",

    q_spend_label:
      "Jaką część swojego dochodu rozporządzalnego przeznaczasz na zakupy związane z wyglądem fizycznym?",
    q_spend_hint:
      "Dochód rozporządzalny to całkowita kwota, która pozostaje Ci do wydania lub zaoszczędzenia po opłaceniu podatków i obowiązkowych składek. Wybierz zakres najlepiej odpowiadający Twoim typowym wydatkom.",
    q_spend_err: "Wybierz szacunkowy zakres.",
    q_spend_includes: "Obejmuje na przykład",
    q_spend_examples:
      "Strzyżenie i pielęgnacja włosów, Makijaż, Pielęgnacja skóry, Produkty przeciwstarzeniowe, Fitness i produkty kształtujące sylwetkę (np. biustonosze push-up, bielizna modelująca, suplementy), Kosmetyki, Odzież, Akcesoria.",
    q_spend_note:
      "Weź pod uwagę zarówno wydatki regularne, jak i okazjonalne — nie jeden miesiąc, ale typowy wzorzec w skali roku.",
    spend_0: "0% — Brak",
    spend_1_5: "1–5%",
    spend_6_10: "6–10%",
    spend_11_15: "11–15%",
    spend_16_25: "16–25%",
    spend_26_40: "26–40%",
    spend_41_60: "41–60%",
    spend_61: "Powyżej 60%",

    q_career_label: "Jaki jest Twój obecny zawód lub zajęcie?",
    q_career_hint:
      "Opisz swoje stanowisko, dziedzinę lub obszar zawodowy (np. „menedżer marketingu”, „student”, „nauczyciel”, „pielęgniarka”, „projektant na własną rękę”).",
    q_career_ph: "np. programista",
    q_career_err: "Opisz swoje obecne zajęcie lub dziedzinę.",

    q_email_label:
      "Czy chciałbyś/-abyś wziąć udział w kolejnych badaniach? Jeśli tak, zostaw swój adres e-mail.",
    q_email_hint:
      "Ta odpowiedź jest w pełni opcjonalna — możesz pominąć pytanie i zostawić pole puste. Twój e-mail zostanie użyty wyłącznie do kontaktu w sprawie przyszłych badań.",
    q_email_ph: "opcjonalnie — np. imie.nazwisko@example.com",
    q_email_err: "Podaj prawidłowy adres e-mail lub zostaw pole puste.",
    q_email_note: "Pozostawienie pustego pola jest zupełnie w porządku.",

    survey_review: "Możesz przejrzeć swoje odpowiedzi przed dalszym krokiem.",
    survey_next: "Dalej: Kwestionariusz",
    survey_footer:
      "Anonimowe badanie akademickie · Nie są zbierane żadne dane osobowe.",

    questionnaire_title: "Kwestionariusz",
    questionnaire_intro:
      "Część 2 badania. Przeczytaj każde stwierdzenie i wybierz, w jakim stopniu się z nim zgadzasz. Nie ma prawidłowych ani nieprawidłowych odpowiedzi — odpowiadaj szczerze, kierując się pierwszym wrażeniem.",
    percent_complete: "{n}% ukończono",
    page_of: "Strona {a} z {b}",
    submit: "Wyślij odpowiedzi",
    submitting: "Wysyłanie…",
    previous: "Poprzednia",
    next: "Dalej",
    q_error_all: "Przed wysłaniem odpowiedz na wszystkie pytania.",
    q_error_save: "Coś poszło nie tak podczas zapisywania odpowiedzi. Spróbuj ponownie.",
    q_bottom_note: "Musisz odpowiedzieć na wszystkie pytania, aby móc wysłać.",
    back_to_survey: "Powrót do ankiety",
    likert_1: "Zdecydowanie się nie zgadzam",
    likert_2: "Nie zgadzam się",
    likert_3: "Neutralnie",
    likert_4: "Zgadzam się",
    likert_5: "Zdecydowanie się zgadzam",

    debrief_eyebrow: "Formularz debriefingu badawczego",
    debrief_title: "Dziękujemy za udział!",
    debrief_intro: "Dziękujemy za poświęcenie czasu na wypełnienie tego badania.",
    debrief_h_about: "O czym było to badanie?",
    debrief_about_1:
      "Celem badania było zbadanie związku między cechami osobowości a wydatkami związanymi z wyglądem.",
    debrief_about_2:
      "Dokładniej, badanie sprawdzało, czy różnice indywidualne w osobowości, w szczególności w zakresie Neurotyczności i Sumienności, są związane z kwotą, jaką ludzie wydają na produkty i usługi związane z ich wyglądem fizycznym.",
    debrief_about_3:
      "Wydatki związane z wyglądem w tym badaniu obejmują takie obszary jak:",
    debrief_areas: [
      "Pielęgnacja skóry i kosmetyki",
      "Odzież i akcesoria kupowane głównie ze względu na wygląd",
      "Zabiegi na włosy i stylizacja",
      "Zabiegi kosmetyczne lub estetyczne",
      "Fitness i produkty kształtujące sylwetkę",
    ],
    debrief_h_expect: "Czego spodziewali się badacze?",
    debrief_expect_intro: "Badanie opierało się na następujących hipotezach:",
    debrief_h1_label: "Hipoteza 1:",
    debrief_h1_text:
      "Wyższy poziom Neurotyczności będzie związany z większymi wydatkami związanymi z wyglądem.",
    debrief_h2_label: "Hipoteza 2:",
    debrief_h2_text:
      "Wyższy poziom Sumienności będzie związany z wydatkami związanymi z wyglądem, szczególnie z wydatkami związanymi ze zdrowiem i sprawnością fizyczną.",
    debrief_expect_note:
      "Te hipotezy to przewidywania i nie są gwarantowanymi wynikami. Zebrane dane posłużą do sprawdzenia, czy przewidywane zależności zostaną potwierdzone.",
    debrief_h_why: "Dlaczego to badanie jest ważne?",
    debrief_why_1:
      "Wydatki związane z wyglądem to istotny element codziennych zachowań konsumenckich. Jednak cechy indywidualne, które mogą wiązać się z różnicami w tego typu wydatkach, nie są w pełni poznane.",
    debrief_why_2:
      "Badając związek między cechami osobowości a wydatkami związanymi z wyglądem, badanie może przyczynić się do lepszego zrozumienia psychologii osobowości i zachowań konsumenckich. Wyniki mogą również pomóc badaczom lepiej zrozumieć, dlaczego jednostki różnią się pod względem kwot wydawanych na produkty i usługi związane z wyglądem.",
    debrief_h_you: "Twój udział",
    debrief_you_1:
      "Twoje odpowiedzi są cenne dla tego badania. Odpowiadając na pytania szczerze i zgodnie ze swoją najlepszą wiedzą, przyczyniłeś/-aś się do danych wykorzystywanych do badania tych zależności.",
    debrief_you_2:
      "W pytaniach o osobowość i wydatki nie było prawidłowych ani nieprawidłowych odpowiedzi. Badanie interesowało się Twoimi szczerymi odpowiedziami i indywidualnymi doświadczeniami.",
    debrief_h_thanks: "Dziękujemy!",
    debrief_thanks_1:
      "Szczerze doceniamy Twój czas i udział w tym badaniu.",
    debrief_thanks_2:
      "W razie pytań o badanie lub chęci uzyskania dodatkowych informacji prosimy o kontakt:",
    back_to_start: "Powrót do początku",
    debrief_footer: "Anonimowe badanie akademickie · Uniwersytet Warszawski",

    thanks_title: "Dziękujemy",
    thanks_declined:
      "Zdecydowałeś/-aś się nie brać udziału w tym badaniu.\u00A0\nŻadne dane nie zostały od Ciebie zebrane i nie będą przechowywane.",
    thanks_generic: "Dziękujemy za Twój czas. Żadne dane nie zostały od Ciebie zebrane.",

    big5: {
      "1": "Jestem duszą towarzystwa.",
      "2": "Mało mnie obchodzą inni ludzie.",
      "3": "Zawsze jestem przygotowany/-a.",
      "4": "Łatwo się stresuję.",
      "5": "Mam bogate słownictwo.",
      "6": "Niewiele mówię.",
      "7": "Interesuję się ludźmi.",
      "8": "Zostawiam swoje rzeczy w nieładzie.",
      "9": "Przez większość czasu jestem zrelaksowany/-a.",
      "10": "Mam trudności ze zrozumieniem abstrakcyjnych idei.",
      "11": "Czuję się swobodnie w towarzystwie innych.",
      "12": "Obrażam ludzi.",
      "13": "Zwracam uwagę na szczegóły.",
      "14": "Martwię się różnymi rzeczami.",
      "15": "Mam żywą wyobraźnię.",
      "16": "Trzymam się w cieniu.",
      "17": "Współczuję innym.",
      "18": "Robię bałagan.",
      "19": "Rzadko czuję smutek.",
      "20": "Nie interesują mnie abstrakcyjne idee.",
      "21": "Zaczynam rozmowy.",
      "22": "Nie interesują mnie problemy innych.",
      "23": "Załatwiam obowiązki od razu.",
      "24": "Łatwo mnie zaniepokoić.",
      "25": "Mam świetne pomysły.",
      "26": "Niewiele mam do powiedzenia.",
      "27": "Mam miękkie serce.",
      "28": "Często zapominam odłożyć rzeczy na miejsce.",
      "29": "Łatwo się denerwuję.",
      "30": "Nie mam dobrej wyobraźni.",
      "31": "Rozmawiam z wieloma różnymi osobami na przyjęciach.",
      "32": "Tak naprawdę nie interesują mnie inni.",
      "33": "Lubię porządek.",
      "34": "Często zmienia mi się nastrój.",
      "35": "Szybko rozumiem różne rzeczy.",
      "36": "Nie lubię zwracać na siebie uwagi.",
      "37": "Poświęcam czas innym.",
      "38": "Uchylam się od obowiązków.",
      "39": "Mam częste wahania nastroju.",
      "40": "Używam trudnych słów.",
      "41": "Nie mam nic przeciwko byciu w centrum uwagi.",
      "42": "Odczuwam emocje innych.",
      "43": "Trzymam się harmonogramu.",
      "44": "Łatwo mnie zirytować.",
      "45": "Poświęcam czas na refleksję.",
      "46": "W towarzystwie obcych jestem cichy/-a.",
      "47": "Sprawiam, że ludzie czują się swobodnie.",
      "48": "Jestem wymagający/-a w swojej pracy.",
      "49": "Często czuję smutek.",
      "50": "Jestem pełen/pełna pomysłów.",
    },
  },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  tArr: (key: string) => string[];
  tBig5: (id: number) => string;
}

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && (stored === "en" || stored === "tr" || stored === "pl")) {
        setLangState(stored);
        return;
      }
      const nav = navigator.language?.slice(0, 2).toLowerCase();
      if (nav === "tr" || nav === "pl") setLangState(nav);
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(() => {
    const d = dict[lang];
    const t = (key: string, vars?: Record<string, string | number>) => {
      const raw = d[key];
      let s = typeof raw === "string" ? raw : (dict.en[key] as string) ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return s;
    };
    const tArr = (key: string) => {
      const raw = d[key];
      if (Array.isArray(raw)) return raw;
      const fb = dict.en[key];
      return Array.isArray(fb) ? fb : [];
    };
    const tBig5 = (id: number) => {
      const map = (d.big5 as Record<string, string>) || {};
      return map[String(id)] ?? (dict.en.big5 as Record<string, string>)[String(id)] ?? "";
    };
    return { lang, setLang, t, tArr, tBig5 };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}
