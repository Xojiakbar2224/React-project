import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'uzb',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        uzb: {
            translation: {
              navbar: {
                link1: 'Faolliklar',
                link2: 'Savollar',
                link3: "Chat",
                link4: "Foydalanuvchilar",
                link5: "Savol berish",
                link6: "Qoidalar",
                link7:"Aktiv bo'lgan savollar",
                rule:"Qoidalar",
                rules:`1 . Saytdan foydalanish uchun foydalanuvchi ro'yxatdan o'tgan bo'lishi, foydalanuvchi ismida ortiqcha simvollar, behayo so'zlar bo'lmasligi va uning akkaunti tasdiqlangan, sayt ma'muriyati tomonidan faollashtirilgan bo'lishi lozim
                2 . Ushbu saytda faqat axborot texnologiyalariga, aynan, dasturlash, elektronika va tizim administratorligiga oid bo'lga savollar berilishi shart! Agar ushbu qoida buzilsa, berilgan savol ogohlantirishsiz o'chiriladi va ushbu hol aynan bir foydalanuvchi tomonidan bir necha bor takrorlansa, foydalanuvchi bloklanadi;
                3 . Saytda O’zbekiston Respublikasi qonunlariga zid bo’lgan, ta'qiqlangan ma'lumotlarni tarqatish mumkin emas;
                4 . Din, siyosatga oid bo'lgan savollar, javoblar va izohlar e'lon qilish, hamda shunday materiallarga ega saytlarni Fide_Bizness.uz orqali tarqatish taqiqlanadi;
                5 . Shaxsiy adovat sababli yoki bilib-bilmay biron-bir foydalanuvchini omma oldida kamsitish, haqorat qilish va qoralash taqiqlanadi;
                6 . Foydalanuvchilar o'rtasida janjallar, o'zaro nizolar chiqarish, hamda shunday mojorolarga qatnashish Sizni qoida buzarlikdan ozod etmaydi;
                7 . Boshqa foydalanuvchilarga nisbatan hurmatsiz munosabatda bo'lish va mazah qilish mumkin emas;
                8 . O’zbekiston Respublikasi qonunlariga zid bo’lgan har qanday harakatlar taqiqlanadi;
                9 . Fide_Bizness.uz'ga zarar keltiruvchi(obro', texnik va boshqa tomondan) har qanday harakatlar ta'qiqlanadi;
                10 . Boshqa saytlarni Fide_Bizness.uz'da reklama qilish mumkin emas;
                11. Fide_Bizness.uz'da savollar, javoblar va izohlar ko'rinishi va tartibi aniq belgilab qo'yilgan bo'lib, sayt ma'muriyati va sayt foydalanuvchilari savollar, javoblar va izohlarni tekshirishda va ularni sifatini yaxshilashda to'g'ridan-to'g'ri qatnashishlari mumkin;
                12. Saytdagi ma'lumotlar boshqa resurslarga ko'chirilganda albatta Fide_Bizness.uz manzili manba sifatida ko'rsatilishi lozim.
                13. Fide_Bizness.uz'da yozilayotgan ma'lumotlar to'g'riligiga amin bo'lgan holda joylanishi va o'sha ma'lumot olingan resurs manba sifatida yozilishi kerak;
                14. Joylanayotgan ma'lumotlar faqat o'zbek tilida bo'lishi, imloviy xatolarsiz va lotin alifbosiga asoslangan o'zbek alifbosida yozilishi lozim;
                15. Saytda firibgarlik qilish ta'qiqlanadi; Agar yuqorida aytilgan qoida buzarlikga ko'zingiz tushsa, sayt ma'muriyatiga albatta xabar berilishi kerak. Foydalanuvchilarni ushbu qoidalarni bilmasliklari, ularni sayt qoidalarini buzishiga sabab bo'lmaydi va ularni javobgarlikdan ozod etmaydi.`
              },
              answer:{
                query:"Savol:",
                link:"Oxirgi savollar va javoblar",
                query1:"Savol muallifi",
                queryAnswer:"javob berish",
                answer1:"Sizning Javobingiz:",
                reject:"bekor qilish",
                answered:"Javob berdi",
                answer:"Javob"
              },
              home:{
                main:"so‘radi 16 fevral",
                views:"martta ko'rilgan",
                answers:"javoblar",
                vote:"ovoz",
                text:`Assalomu alaykum, Fide_Bizness.uz saytimizga xush kelibsiz
                Bu saytda o'zingizni qiziqtirgan savollarga javob olishingiz va o'z sohangiz bo'yicha savollarga javob berishingiz mumkin.
                Bizning Oilamizga a'zo bo'lganingiz uchun chuqur Minnatdorchilik bildiramiz`
              }
            }
          },
        rus: {
            translation: {
                navbar: {
                    link1: 'Деятельность',
                    link2: 'Вопросов',
                    link3: "Чат",
                    link4: "Пользователи",
                    link5: "вопрос",
                    link6: "Правила",
                    link7:"Активные вопросы",
                    rule:"Правила",
                    rules:`1. Для использования сайта пользователь должен быть зарегистрирован, имя пользователя не должно содержать лишних символов, нецензурных слов, а его аккаунт должен быть одобрен и активирован администрацией сайта.
                    2. Этот сайт задает только вопросы, связанные с информационными технологиями, а именно программированием, электроникой и системным администрированием! Если это правило нарушается, заданный вопрос будет удален без предупреждения, а если эта ситуация повторяется более одного раза одним и тем же пользователем, пользователь будет заблокирован;
                    3. На сайте не допускается распространение запрещенной информации, что противоречит законодательству Республики Узбекистан;
                    4. Запрещается публиковать вопросы, ответы и комментарии, связанные с религией, политикой, а также распространять сайты с такими материалами через Fide_Bizness.uz;
                    5. Дискриминация, оскорбления и стигматизация любого пользователя в общественных местах, будь то из-за личной неприязни или сознательно, запрещены;
                    6. Конфликты, споры между пользователями, а также участие в таких конфликтах не освобождают вас от нарушений;
                    7. Невозможно относиться к другим пользователям с неуважением и насмешками;
                    8. Запрещаются любые действия, противоречащие законодательству Республики Узбекистан;
                    9. Запрещены любые действия, наносящие ущерб Fide_Bizness.uz (репутационный, технический и т. Д.);
                    10. На Fide_Bizness.uz нельзя размещать рекламу других сайтов;
                    11. Внешний вид и порядок вопросов, ответов и комментариев на Fide_Bizness.uz четко определены, администрация сайта и пользователи сайта принимают непосредственное участие в проверке вопросов, ответов и комментариев и улучшении их качества. 'Могут участвовать;
                    12. При копировании информации с сайта на другие ресурсы в качестве источника необходимо указывать Fide_Bizness.uz.
                    13. Информация на Fide_Bizness.uz должна быть размещена с уверенностью в ее достоверности, и источник информации должен быть указан как источник;
                    14. Информация должна быть только на узбекском языке, без орфографических ошибок и в узбекском алфавите на основе латинского алфавита;
                    15. Мошенничество на сайте запрещено; Если вы заметили нарушение вышеуказанного правила, администрация сайта должна быть уведомлена. Незнание пользователями этих правил не приведет к нарушению ими правил сайта и не освободит их от ответственности.`
                },
                answer:{
                  query:"Вопрос:",
                  link:"Заключительные вопросы и ответы",
                  query1:"Автор вопроса",
                  queryAnswer:"отвечать",
                  answer1:"Твой ответ:",
                  reject:"отменить",
                  answered:"Ответил",
                  answer:"Ответ"
                },
                home:{
                  main:"спросил 16 февраля",
                  views:"видел однажды",
                  answers:"ответы",
                  vote:"голосов",
                text:`Здравствуйте и добро пожаловать на наш сайт Fide_Bizness.uz.
                На этом сайте вы можете найти ответы на свои вопросы и ответить на вопросы о вашей сфере деятельности.
                Большое вам спасибо за то, что вы член нашей семьи`
                }
            }
      },
            eng: {
                translation: {
                navbar: {
                    link1: 'Activities',
                    link2: 'Questions',
                    link3: "Chat",
                    link4: "Users",
                    link5: "Ask a question",
                    link6: "Rules",
                    link7:"Active questions",
                    rule:"Rules",
                    rules:`1. In order to use the site, the user must be registered, the user name must not contain excessive characters, obscene words, and his account must be approved and activated by the site administration
                    2. This site only asks questions related to information technology, namely, programming, electronics and system administration! If this rule is violated, the question asked will be deleted without warning, and if this situation is repeated more than once by the same user, the user will be blocked;
                    3. It is not allowed to disseminate prohibited information on the site, which contradicts the laws of the Republic of Uzbekistan;
                    4. It is forbidden to publish questions, answers and comments related to religion, politics, as well as to distribute sites with such materials through Fide_BFide_Bizness.uz
                    5. Discrimination, insults and stigmatization of any user in public, whether due to personal enmity or knowingly, are prohibited;
                    6. Conflicts, disputes between users, as well as participation in such conflicts do not exempt you from violations;
                    7. It is impossible to be disrespectful and ridiculous to other users;
                    8. Any actions contrary to the laws of the Republic of Uzbekistan are prohibited;
                    9. Any actions that damage Fide_Bizness.uz (reputation, technical, etc.) are prohibited;
                    10. It is not possible to advertise other sites oFide_Bizness.uz;
                    11. The appearance and order of questions, answers and comments on Fide_Bizness.uz are clearly defined, and the site administration and site users are directly involved in checking questions, answers and comments and improving their quality. 'can participate;
                    12. When copying information from the site to other resources, the addresFide_Bizness.uz must be specified as the source.
                    13. The information posted on Fide_Bizness.uz should be posted with confidence in the accuracy of the information and the source of the information should be recorded as a source;
                    14. The information should be in Uzbek only, without spelling errors and in the Uzbek alphabet based on the Latin alphabet;
                    15. Fraud on the site is prohibited; If you notice a violation of the above rule, the site administration must be notified. Failure of users to know these rules will not cause them to violate the rules of the site and will not release them from liability.`
                       },
                answer:{
                  query:"Question:",
                  link:"Final questions and answers",
                  query1:"Question author",
                  queryAnswer:"answer",
                  answer1:"Your Answer:",
                  reject:"cancel",
                  answered:"Answered",
                  answer:"Answer"
                },
                home:{
                  main:"asked Feb. 16",
                  views:"seen once",
                  answers:"answers",
                  vote:"vote",
                  text:`Hello, and welcome to our site Fide_Bizness.uz.
                  On this site you can find answers to your questions and answer questions about your field.
                  Thank you so much for being a member of our Family`
                }
                }
            }
     
    }
  });

export default i18n;