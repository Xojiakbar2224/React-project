import Navbar from "../Navbar";
import { Trans } from 'react-i18next';
const Rules = () => {
    return (
        <>
        <Navbar/>
        <div className=" m-auto " style={{overflowWrap: "break-word"}}>
        <div className=" mb-n1 m-auto p-2 text-light border-0" role="alert" style={{backgroundColor:"#3498DB", width:"50%"}}>
                         <h4 className=""> <Trans i18nKey="navbar.rule">Qoidalar</Trans></h4>
                      </div>
            <p className="w-50 m-auto p-4 text-dark bg-light">
            <Trans i18nKey="navbar.rules">
                1 . Saytdan foydalanish uchun foydalanuvchi ro'yxatdan o'tgan bo'lishi, foydalanuvchi ismida ortiqcha simvollar, behayo so'zlar bo'lmasligi va uning akkaunti tasdiqlangan, sayt ma'muriyati tomonidan faollashtirilgan bo'lishi lozim <br/>
                2 . Ushbu saytda faqat axborot texnologiyalariga, aynan, dasturlash, elektronika va tizim administratorligiga oid bo'lga savollar berilishi shart! Agar ushbu qoida buzilsa, berilgan savol ogohlantirishsiz o'chiriladi va ushbu hol aynan bir foydalanuvchi tomonidan bir necha bor takrorlansa, foydalanuvchi bloklanadi;
          <br/> 3 . Saytda O’zbekiston Respublikasi qonunlariga zid bo’lgan, ta'qiqlangan ma'lumotlarni tarqatish mumkin emas;
          <br/> 4 . Din, siyosatga oid bo'lgan savollar, javoblar va izohlar e'lon qilish, hamda shunday materiallarga ega saytlarni yordam.uz orqali tarqatish taqiqlanadi;
          <br/> 5 . Shaxsiy adovat sababli yoki bilib-bilmay biron-bir foydalanuvchini omma oldida kamsitish, haqorat qilish va qoralash taqiqlanadi;
          <br/> 6 . Foydalanuvchilar o'rtasida janjallar, o'zaro nizolar chiqarish, hamda shunday mojorolarga qatnashish Sizni qoida buzarlikdan ozod etmaydi;
          <br/> 7 . Boshqa foydalanuvchilarga nisbatan hurmatsiz munosabatda bo'lish va mazah qilish mumkin emas;
          <br/> 8 . O’zbekiston Respublikasi qonunlariga zid bo’lgan har qanday harakatlar taqiqlanadi;
          <br/> 9 . Fido_Bizness.uz'ga zarar keltiruvchi(obro', texnik va boshqa tomondan) har qanday harakatlar ta'qiqlanadi;
          <br/> 10 . Boshqa saytlarni yordam.uz'da reklama qilish mumkin emas;
          <br/> 11. Fido_Bizness.uz'da savollar, javoblar va izohlar ko'rinishi va tartibi aniq belgilab qo'yilgan bo'lib, sayt ma'muriyati va sayt foydalanuvchilari savollar, javoblar va izohlarni tekshirishda va ularni sifatini yaxshilashda to'g'ridan-to'g'ri qatnashishlari mumkin;
          <br/> 12. Saytdagi ma'lumotlar boshqa resurslarga ko'chirilganda albatta yordam.uz manzili manba sifatida ko'rsatilishi lozim.
          <br/> 13. Fido_Bizness.uz'da yozilayotgan ma'lumotlar to'g'riligiga amin bo'lgan holda joylanishi va o'sha ma'lumot olingan resurs manba sifatida yozilishi kerak;
          <br/> 14. Joylanayotgan ma'lumotlar faqat o'zbek tilida bo'lishi, imloviy xatolarsiz va lotin alifbosiga asoslangan o'zbek alifbosida yozilishi lozim;
          <br/> 15. Saytda firibgarlik qilish ta'qiqlanadi;
                Agar yuqorida aytilgan qoida buzarlikga ko'zingiz tushsa, sayt ma'muriyatiga albatta xabar berilishi kerak.

                Foydalanuvchilarni ushbu qoidalarni bilmasliklari, ularni sayt qoidalarini buzishiga sabab bo'lmaydi va ularni javobgarlikdan ozod etmaydi.
                </Trans></p>
        </div>
        </>
    );
}
 
export default Rules;