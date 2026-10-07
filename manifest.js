// manifest.js — محتوای پایه قالب + برچسب فارسی + منو/قصه/نظرات
window.MANIFEST = {
  site: {
    title: "کافه ما | قهوه تازه، هر روز",
    description: "کافه و کارگاه بوداده‌سازی؛ هر هفته دو بار بوداده می‌کنیم و همان روز می‌ریزیم. منو، اشتراک و فروش عمده."
  },
  menu: [
    { title: "منوی بار گرم", sizes: "", items: [
      { name: "اسپرسو", note: "همیشه دبل", price: "85,000 تومان" },
      { name: "ماکیاتو", note: "", price: "90,000 تومان" },
      { name: "کورتادو", note: "", price: "95,000 تومان" },
      { name: "فلت وایت", note: "", price: "105,000 تومان" },
      { name: "کاپوچینو", note: "", price: "100,000 / 110,000 تومان" },
      { name: "لاته", note: "", price: "105,000 / 115,000 تومان" },
      { name: "موکا", note: "با شکلات ۷۰٪", price: "120,000 / 130,000 تومان" }
    ]},
    { title: "نوشیدنی سرد", sizes: "", items: [
      { name: "آیس لاته", note: "", price: "115,000 تومان" },
      { name: "کلد برو", note: "دم‌کرده ۱۸ ساعته", price: "110,000 تومان" },
      { name: "آیس آمریکانو", note: "", price: "95,000 تومان" },
      { name: "آب پرتقال تازه", note: "فصلی", price: "130,000 تومان" }
    ]},
    { title: "سالاد", sizes: "", items: [
      { name: "سالاد سزار", note: "با مرغ و پارمزان", price: "185,000 تومان" },
      { name: "سالاد یونانی", note: "", price: "165,000 تومان" },
      { name: "سالاد سبز", note: "", price: "120,000 تومان" }
    ]},
    { title: "غذا", sizes: "", items: [
      { name: "ساندویچ کلاب", note: "با سیب‌زمینی", price: "210,000 تومان" },
      { name: "پاستا آلفردو", note: "", price: "240,000 تومان" },
      { name: "برگر گوشت", note: "", price: "260,000 تومان" }
    ]}
  ],
  story: {
    title: "قصه ما",
    intro: "از روز اول باور داشتیم کافه فقط جای قهوه خوردن نیست؛ بهانه‌ای است برای دور هم بودن، خندیدن و شروع روز با یک انرژی خوب. این، قصه کوتاه ماست.",
    timeline: [
      { year: "۱۳۹۸", text: "با یک دستگاه اسپرسوی دست‌دوم و یک مغازه دوازده متری شروع کردیم" },
      { year: "۱۴۰۰", text: "کارگاه بوداده‌سازی را اضافه کردیم تا هر دانه را خودمان و تازه بوداده کنیم" },
      { year: "۱۴۰۲", text: "تیم بزرگ‌تر شد و شعبه دوم رسید؛ اما حال‌وهوای مغازه اول هرگز عوض نشد" },
      { year: "امروز", text: "هر صبح ساعت ۷، بوی نان تازه و قهوه، قول ما به شماست" }
    ]
  },
  reviews: {
    title: "حرف دوست‌های ما",
    items: [
      { name: "مریم ر.", role: "مشتری همیشگی", stars: 5, text: "بوی فضای کافه همان لحظه اول می‌خردت! باریستاها سفارش همیشگی‌ات را از بر دارند." },
      { name: "علی م.", role: "طراح محله", stars: 5, text: "بهترین فلت‌ویت شهر؛ نور و موسیقی فضا دقیقاً برای کار کردن تنظیم شده است." },
      { name: "ندا ک.", role: "دانشجو", stars: 4, text: "بان کاردامومشان خطرناک است! تنها ایراد: آخر هفته‌ها به سختی جا پیدا می‌کنی." }
    ]
  },
  text: {
    "top.intro": "We roast twice a week in the back room on Canal Street and pour it in the front, seven days a week. Everything below is on the board today.",
    "left.text": "Open now, until 6 pm",
    "left.link.0": "Menu", "left.link.1": "Beans", "left.link.2": "Subscriptions",
    "left.link.3": "Wholesale", "left.link.4": "Events", "left.link.5": "Visit",
    "left.link2.0": "Menu", "left.link2.1": "Beans", "left.link2.2": "Subscriptions",
    "left.link2.3": "Wholesale", "left.link2.4": "Events", "left.link2.5": "Visit",
    "left.name": "Morrow Coffee",
    "left.tagline": "A coffee bar at the front, a roaster at the back.",
    "left.term.0": "Today", "left.body.0": "Thursday, 7 am to 6 pm",
    "left.term.1": "Where", "left.body.1": "88 Canal Street, at Mill Bridge",
    "left.term.2": "Roasting", "left.body.2": "Monday and Thursday mornings",
    "menu.secNo": "01", "menu.title": "منو",
    "menu.fine": "شیر جو، بادام یا کامل بدون هزینه اضافی؛ شات اضافه ۲۵,۰۰ تومان.",
    "beans.secNo": "02", "beans.title": "Beans on the shelf",
    "beans.secNote": "Whole bean or ground to order, in 12 oz bags with the roast date on the front. Two pounds of any coffee for twice the bag price, less ten percent.",
    "beans.title2.0": "Canal Blend", "beans.beanOrigin.0": "Brazil and Colombia, the house espresso", "beans.beanNotes.0": "Milk chocolate, hazelnut, raisin", "beans.roastLabel.0": "Medium", "beans.beanPrice.0": "850,000 تومان",
    "beans.title2.1": "Kochere", "beans.beanOrigin.1": "Yirgacheffe, Ethiopia. Washed heirloom", "beans.beanNotes.1": "Jasmine, lemon peel, black tea", "beans.roastLabel.1": "Light", "beans.beanPrice.1": "980,000 تومان",
    "beans.title2.2": "La Esperanza", "beans.beanOrigin.2": "Huila, Colombia. Honey-processed Caturra", "beans.beanNotes.2": "Red apple, caramel, orange", "beans.roastLabel.2": "Medium-light", "beans.beanPrice.2": "920,000 تومان",
    "beans.title2.3": "Kerinci", "beans.beanOrigin.3": "Sumatra, Indonesia. Wet-hulled", "beans.beanNotes.3": "Cedar, dark chocolate, molasses", "beans.roastLabel.3": "Medium-dark", "beans.beanPrice.3": "890,000 تومان",
    "beans.title2.4": "Cajamarca Decaf", "beans.beanOrigin.4": "Peru. Sugarcane decaffeinated", "beans.beanNotes.4": "Cocoa, brown sugar, almond", "beans.roastLabel.4": "Medium", "beans.beanPrice.4": "870,000 تومان",
    "subscriptions.secNo": "03", "subscriptions.title": "Subscriptions",
    "subscriptions.secNote": "Fresh coffee on a schedule, roasted the day before it leaves.",
    "subscriptions.title2.0": "Fortnightly", "subscriptions.planWhat.0": "One 12 oz bag every two weeks", "subscriptions.planPrice.0": "780,000 تومان هر بسته",
    "subscriptions.title2.1": "Weekly", "subscriptions.planWhat.1": "One 12 oz bag every week", "subscriptions.planPrice.1": "720,000 تومان هر بسته",
    "subscriptions.title2.2": "Office", "subscriptions.planWhat.2": "Two pounds of the Canal Blend every week", "subscriptions.planPrice.2": "1,550,000 تومان هر هفته",
    "subscriptions.item.0": "Roaster's choice, or the same coffee every time",
    "subscriptions.item.1": "Delivered by bike in town for free; 45,000 تومان shipping anywhere else",
    "subscriptions.item.2": "Skip, swap or pause from the link in every email",
    "subscriptions.button": "Start a subscription",
    "wholesale.secNo": "04", "wholesale.title": "Wholesale",
    "wholesale.secNote": "We roast for nine cafes, two restaurants and a bike shop. If you want to serve Morrow, we will come and pull shots on your machine before you decide anything.",
    "wholesale.term.0": "Minimum", "wholesale.body.0": "10 lb a week, any mix of coffees",
    "wholesale.term.1": "Delivery", "wholesale.body.1": "Tuesday and Friday, within fifteen miles",
    "wholesale.term.2": "Training", "wholesale.body.2": "Two barista sessions for your staff, included",
    "wholesale.term.3": "Equipment", "wholesale.body.3": "Grinders and espresso machines to lease or buy",
    "wholesale.text": "Write to Dana at ", "wholesale.link": "wholesale@morrowcoffee.example",
    "events.secNo": "05", "events.title": "Events",
    "events.secNote": "Small, early and mostly free. Sign up at the counter or by email; we keep a waiting list.",
    "events.dateDay.0": "04", "events.dateMonth.0": "Oct", "events.title2.0": "Public cupping", "events.eventWhen.0": "Saturday, 9 am", "events.eventDetail.0": "Taste the week's roasts side by side with the roaster. Free, twelve places.",
    "events.dateDay.1": "08", "events.dateMonth.1": "Oct", "events.title2.1": "Brewing at home", "events.eventWhen.1": "Wednesday, 7 pm", "events.eventDetail.1": "Pour-over, French press and a cheap grinder done well. $35, with a bag to take home.",
    "events.dateDay.2": "18", "events.dateMonth.2": "Oct", "events.title2.2": "Latte art basics", "events.eventWhen.2": "Saturday, 8 am", "events.eventDetail.2": "Steaming milk and pouring a heart on our machine, before we open. $45, six places.",
    "events.dateDay.3": "26", "events.dateMonth.3": "Oct", "events.title2.3": "Roastery open morning", "events.eventWhen.3": "Sunday, 10 am", "events.eventDetail.3": "The back room with the door open, a roast from green to bag, and coffee on us.",
    "visit.secNo": "06", "visit.title": "Visit",
    "visit.label": "Hours",
    "visit.term.0": "Monday to Friday", "visit.body.0": "7 am to 6 pm",
    "visit.term.1": "Saturday", "visit.body.1": "8 am to 5 pm",
    "visit.term.2": "Sunday", "visit.body.2": "8 am to 3 pm",
    "visit.term.3": "Holidays", "visit.body.3": "Posted a week ahead",
    "visit.label2": "Address",
    "visit.body": "Morrow Coffee\n88 Canal Street\nat Mill Bridge",
    "visit.link": "(555) 013-4478", "visit.link2": "hello@morrowcoffee.example",
    "visit.term2.0": "Seats", "visit.body2.0": "Twenty inside and eight on the bench out front",
    "visit.term2.1": "Access", "visit.body2.1": "Step-free entrance and an accessible restroom",
    "visit.term2.2": "Dogs", "visit.body2.2": "Welcome on the bench, with a bowl of water",
    "visit.term2.3": "Laptops", "visit.body2.3": "Welcome on weekdays; the tables are for people at the weekend",
    "footer.footName": "Morrow Coffee",
    "footer.body": "A fictional coffee shop and roastery. Coffees, prices and hours are invented.",
    "footer.link": "Tabbied"
  },
  images: { "photo.morrow-coffee-cup-cutout": "./images/morrow-coffee-cup-cutout.webp" },
  colors: { oat: "#f3eee6", espresso: "#231a14", roast: "#b06a3b", gray: "#8d8177", pale: "#e3dacd" }
};