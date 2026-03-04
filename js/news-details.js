// Detailed news content for modal
const newsDetails = {
  ua: {
    1: {
      title: "Розширення асортименту моторних олив",
      date: "15 грудня 2025",
      category: "Продукція",
      image: "Materials/oil.jpg",
      content: `
        <p>Раді повідомити про значне розширення нашого асортименту моторних олив! Тепер у нас представлені нові лінійки від провідних світових виробників: Highway, VENOL, Kixx та інших брендів.</p>
        
        <p>Нові продукти відповідають найсучаснішим стандартам якості та підходять для всіх типів двигунів - бензинових, дизельних, турбованих та гібридних.</p>
        
        <p><strong>Що нового в асортименті:</strong></p>
        <ul>
          <li>Синтетичні моторні оливи преміум-класу з технологією Low SAPS</li>
          <li>Напівсинтетичні оливи для сучасних двигунів з турбонаддувом</li>
          <li>Мінеральні оливи для класичних автомобілів</li>
          <li>Спеціалізовані оливи для комерційного транспорту</li>
          <li>Високоефективні оливи для екстремальних умов експлуатації</li>
        </ul>
        
        <p>Всі оливи мають міжнародні сертифікати якості API, ACEA та допуски провідних автовиробників. Ми гарантуємо оригінальність продукції та надаємо повний пакет документів.</p>
        
        <p>Наші фахівці завжди готові допомогти з підбором оптимального мастила для вашого автомобіля, враховуючи умови експлуатації та рекомендації виробника.</p>
      `
    },
    2: {
      title: "Нові акумулятори Quantum та Force Racing",
      date: "10 грудня 2025",
      category: "Продукція",
      image: "Materials/AKM.jpg",
      content: `
        <p>Поповнили склад якісними акумуляторами від перевірених виробників Quantum та Force Racing. Гарантія до 3 років на всю продукцію!</p>
        
        <p><strong>Переваги нових акумуляторів:</strong></p>
        <ul>
          <li>Підвищена пускова потужність для надійного запуску в будь-яку погоду</li>
          <li>Стійкість до глибоких розрядів та швидке відновлення заряду</li>
          <li>Технологія кальцієвих пластин для мінімального саморозряду</li>
          <li>Герметична конструкція - не потребує обслуговування</li>
          <li>Широкий діапазон ємностей від 45 до 225 Ач</li>
        </ul>
        
        <p>Акумулятори Quantum відзначаються надійністю та довговічністю, ідеально підходять для легкових автомобілів та комерційного транспорту. Force Racing - це преміум-серія для автомобілів з підвищеним енергоспоживанням.</p>
        
        <p>При купівлі акумулятора ми безкоштовно проводимо діагностику електросистеми автомобіля та надаємо рекомендації щодо експлуатації.</p>
      `
    },
    3: {
      title: "Знижки на автохімію до кінця року",
      date: "5 грудня 2025",
      category: "Акції",
      image: "Materials/Avtohim.jpg",
      content: `
        <p>Спеціальна пропозиція для наших клієнтів — знижки до 15% на всю автохімію від провідних брендів K2, Atas та PiTon!</p>
        
        <p><strong>Акційні категорії:</strong></p>
        <ul>
          <li>Автошампуні та засоби для безконтактного миття</li>
          <li>Поліролі та воски для захисту кузова</li>
          <li>Очисники скла, пластику та шкіри салону</li>
          <li>Технічні аерозолі та мастила</li>
          <li>Засоби для догляду за двигуном</li>
        </ul>
        
        <p>K2 - польський бренд з 20-річним досвідом, відомий інноваційними формулами та екологічністю. Atas - італійська якість для професійного догляду. PiTon - надійні рішення за доступною ціною.</p>
        
        <p>Акція діє до 31 грудня 2025 року. Знижки поширюються на весь асортимент автохімії зазначених брендів. При купівлі на суму понад 2000 грн - додаткова знижка 5%!</p>
        
        <p>Встигніть підготувати свій автомобіль до зими за вигідною ціною!</p>
      `
    },
    4: {
      title: "Розширення географії доставки",
      date: "1 грудня 2025",
      category: "Сервіс",
      image: "Materials/fonassortiment.jpg",
      content: `
        <p>Тепер доставляємо продукцію по всій Україні! Швидка відправка та надійна упаковка товарів гарантовані.</p>
        
        <p><strong>Умови доставки:</strong></p>
        <ul>
          <li>Безкоштовна доставка при замовленні від 3000 грн</li>
          <li>Відправка в день замовлення при оформленні до 14:00</li>
          <li>Доставка Новою Поштою у відділення або кур'єром</li>
          <li>Можливість оплати при отриманні (накладений платіж)</li>
          <li>Відстеження посилки в режимі реального часу</li>
        </ul>
        
        <p>Ми співпрацюємо з найнадійнішими транспортними компаніями, щоб ваше замовлення прибуло швидко та в ідеальному стані. Кожна посилка ретельно пакується з використанням захисних матеріалів.</p>
        
        <p>Для постійних клієнтів та оптових покупців діють спеціальні умови доставки. Також можлива організація доставки великогабаритних вантажів власним транспортом.</p>
        
        <p>Замовляйте зручно - отримуйте швидко!</p>
      `
    },
    5: {
      title: "Фільтри WIX та KNECHT в наявності",
      date: "25 листопада 2025",
      category: "Продукція",
      image: "Materials/filter.jpg",
      content: `
        <p>Великий вибір повітряних, масляних та паливних фільтрів від європейських виробників WIX та KNECHT тепер в наявності на нашому складі!</p>
        
        <p><strong>Асортимент фільтрів:</strong></p>
        <ul>
          <li>Масляні фільтри для всіх типів двигунів</li>
          <li>Повітряні фільтри та фільтри салону з активованим вугіллям</li>
          <li>Паливні фільтри для бензинових та дизельних двигунів</li>
          <li>Гідравлічні фільтри для спецтехніки</li>
          <li>Комплекти фільтрів для ТО</li>
        </ul>
        
        <p>WIX Filters - американський бренд з понад 80-річною історією, лідер у виробництві фільтрувальних систем. KNECHT - німецька якість від компанії Mahle, офіційного постачальника автоконцернів.</p>
        
        <p>Всі фільтри відповідають оригінальним специфікаціям та мають сертифікати якості. Ми допоможемо підібрати правильні фільтри для вашого автомобіля за VIN-кодом або номером деталі.</p>
        
        <p>Регулярна заміна фільтрів - запорука довговічності двигуна та економії палива!</p>
      `
    },
    6: {
      title: "Підготовка до зими: антифризи",
      date: "20 листопада 2025",
      category: "Продукція",
      image: "Materials/Antifriz.jpg",
      content: `
        <p>Широкий вибір охолоджуючих рідин для підготовки вашого авто до зимового сезону. Якісні антифризи від перевірених виробників за доступними цінами!</p>
        
        <p><strong>В асортименті:</strong></p>
        <ul>
          <li>Антифриз G11 (синій/зелений) для класичних автомобілів</li>
          <li>Антифриз G12/G12+ (червоний) для сучасних двигунів</li>
          <li>Антифриз G13 (фіолетовий) екологічний на основі гліцерину</li>
          <li>Концентрати для самостійного розведення</li>
          <li>Готові суміші -40°C для суворих зим</li>
        </ul>
        
        <p>Правильно підібраний антифриз захищає двигун від перегріву влітку та замерзання взимку, запобігає корозії та відкладенням у системі охолодження.</p>
        
        <p><strong>Чому важливо замінити антифриз перед зимою:</strong></p>
        <ul>
          <li>Старий антифриз втрачає свої захисні властивості</li>
          <li>Знижується температура замерзання</li>
          <li>Можливе утворення осаду та корозії</li>
          <li>Погіршується теплообмін двигуна</li>
        </ul>
        
        <p>Наші спеціалісти безкоштовно перевірять стан вашої охолоджуючої рідини та допоможуть підібрати оптимальний варіант. Не чекайте морозів - подбайте про свій автомобіль зараз!</p>
      `
    }
  },
  ru: {
    1: {
      title: "Расширение ассортимента моторных масел",
      date: "15 декабря 2025",
      category: "Продукция",
      image: "Materials/oil.jpg",
      content: `
        <p>Рады сообщить о значительном расширении нашего ассортимента моторных масел! Теперь у нас представлены новые линейки от ведущих мировых производителей: Highway, VENOL, Kixx и других брендов.</p>
        
        <p>Новые продукты соответствуют самым современным стандартам качества и подходят для всех типов двигателей - бензиновых, дизельных, турбированных и гибридных.</p>
        
        <p><strong>Что нового в ассортименте:</strong></p>
        <ul>
          <li>Синтетические моторные масла премиум-класса с технологией Low SAPS</li>
          <li>Полусинтетические масла для современных двигателей с турбонаддувом</li>
          <li>Минеральные масла для классических автомобилей</li>
          <li>Специализированные масла для коммерческого транспорта</li>
          <li>Высокоэффективные масла для экстремальных условий эксплуатации</li>
        </ul>
        
        <p>Все масла имеют международные сертификаты качества API, ACEA и допуски ведущих автопроизводителей. Мы гарантируем оригинальность продукции и предоставляем полный пакет документов.</p>
        
        <p>Наши специалисты всегда готовы помочь с подбором оптимального масла для вашего автомобиля, учитывая условия эксплуатации и рекомендации производителя.</p>
      `
    },
    2: {
      title: "Новые аккумуляторы Quantum и Force Racing",
      date: "10 декабря 2025",
      category: "Продукция",
      image: "Materials/AKM.jpg",
      content: `
        <p>Пополнили склад качественными аккумуляторами от проверенных производителей Quantum и Force Racing. Гарантия до 3 лет на всю продукцию!</p>
        
        <p><strong>Преимущества новых аккумуляторов:</strong></p>
        <ul>
          <li>Повышенная пусковая мощность для надежного запуска в любую погоду</li>
          <li>Устойчивость к глубоким разрядам и быстрое восстановление заряда</li>
          <li>Технология кальциевых пластин для минимального саморазряда</li>
          <li>Герметичная конструкция - не требует обслуживания</li>
          <li>Широкий диапазон емкостей от 45 до 225 Ач</li>
        </ul>
        
        <p>Аккумуляторы Quantum отличаются надежностью и долговечностью, идеально подходят для легковых автомобилей и коммерческого транспорта. Force Racing - это премиум-серия для автомобилей с повышенным энергопотреблением.</p>
        
        <p>При покупке аккумулятора мы бесплатно проводим диагностику электросистемы автомобиля и даем рекомендации по эксплуатации.</p>
      `
    },
    3: {
      title: "Скидки на автохимию до конца года",
      date: "5 декабря 2025",
      category: "Акции",
      image: "Materials/Avtohim.jpg",
      content: `
        <p>Специальное предложение для наших клиентов — скидки до 15% на всю автохимию от ведущих брендов K2, Atas и PiTon!</p>
        
        <p><strong>Акционные категории:</strong></p>
        <ul>
          <li>Автошампуни и средства для бесконтактной мойки</li>
          <li>Полироли и воски для защиты кузова</li>
          <li>Очистители стекла, пластика и кожи салона</li>
          <li>Технические аэрозоли и смазки</li>
          <li>Средства для ухода за двигателем</li>
        </ul>
        
        <p>K2 - польский бренд с 20-летним опытом, известный инновационными формулами и экологичностью. Atas - итальянское качество для профессионального ухода. PiTon - надежные решения по доступной цене.</p>
        
        <p>Акция действует до 31 декабря 2025 года. Скидки распространяются на весь ассортимент автохимии указанных брендов. При покупке на сумму свыше 2000 грн - дополнительная скидка 5%!</p>
        
        <p>Успейте подготовить свой автомобиль к зиме по выгодной цене!</p>
      `
    },
    4: {
      title: "Расширение географии доставки",
      date: "1 декабря 2025",
      category: "Сервис",
      image: "Materials/fonassortiment.jpg",
      content: `
        <p>Теперь доставляем продукцию по всей Украине! Быстрая отправка и надежная упаковка товаров гарантированы.</p>
        
        <p><strong>Условия доставки:</strong></p>
        <ul>
          <li>Бесплатная доставка при заказе от 3000 грн</li>
          <li>Отправка в день заказа при оформлении до 14:00</li>
          <li>Доставка Новой Почтой в отделение или курьером</li>
          <li>Возможность оплаты при получении (наложенный платеж)</li>
          <li>Отслеживание посылки в режиме реального времени</li>
        </ul>
        
        <p>Мы сотрудничаем с самыми надежными транспортными компаниями, чтобы ваш заказ прибыл быстро и в идеальном состоянии. Каждая посылка тщательно упаковывается с использованием защитных материалов.</p>
        
        <p>Для постоянных клиентов и оптовых покупателей действуют специальные условия доставки. Также возможна организация доставки крупногабаритных грузов собственным транспортом.</p>
        
        <p>Заказывайте удобно - получайте быстро!</p>
      `
    },
    5: {
      title: "Фильтры WIX и KNECHT в наличии",
      date: "25 ноября 2025",
      category: "Продукция",
      image: "Materials/filter.jpg",
      content: `
        <p>Большой выбор воздушных, масляных и топливных фильтров от европейских производителей WIX и KNECHT теперь в наличии на нашем складе!</p>
        
        <p><strong>Ассортимент фильтров:</strong></p>
        <ul>
          <li>Масляные фильтры для всех типов двигателей</li>
          <li>Воздушные фильтры и фильтры салона с активированным углем</li>
          <li>Топливные фильтры для бензиновых и дизельных двигателей</li>
          <li>Гидравлические фильтры для спецтехники</li>
          <li>Комплекты фильтров для ТО</li>
        </ul>
        
        <p>WIX Filters - американский бренд с более чем 80-летней историей, лидер в производстве фильтрующих систем. KNECHT - немецкое качество от компании Mahle, официального поставщика автоконцернов.</p>
        
        <p>Все фильтры соответствуют оригинальным спецификациям и имеют сертификаты качества. Мы поможем подобрать правильные фильтры для вашего автомобиля по VIN-коду или номеру детали.</p>
        
        <p>Регулярная замена фильтров - залог долговечности двигателя и экономии топлива!</p>
      `
    },
    6: {
      title: "Подготовка к зиме: антифризы",
      date: "20 ноября 2025",
      category: "Продукция",
      image: "Materials/Antifriz.jpg",
      content: `
        <p>Широкий выбор охлаждающих жидкостей для подготовки вашего авто к зимнему сезону. Качественные антифризы от проверенных производителей по доступным ценам!</p>
        
        <p><strong>В ассортименте:</strong></p>
        <ul>
          <li>Антифриз G11 (синий/зеленый) для классических автомобилей</li>
          <li>Антифриз G12/G12+ (красный) для современных двигателей</li>
          <li>Антифриз G13 (фиолетовый) экологичный на основе глицерина</li>
          <li>Концентраты для самостоятельного разведения</li>
          <li>Готовые смеси -40°C для суровых зим</li>
        </ul>
        
        <p>Правильно подобранный антифриз защищает двигатель от перегрева летом и замерзания зимой, предотвращает коррозию и отложения в системе охлаждения.</p>
        
        <p><strong>Почему важно заменить антифриз перед зимой:</strong></p>
        <ul>
          <li>Старый антифриз теряет свои защитные свойства</li>
          <li>Снижается температура замерзания</li>
          <li>Возможно образование осадка и коррозии</li>
          <li>Ухудшается теплообмен двигателя</li>
        </ul>
        
        <p>Наши специалисты бесплатно проверят состояние вашей охлаждающей жидкости и помогут подобрать оптимальный вариант. Не ждите морозов - позаботьтесь о своем автомобиле сейчас!</p>
      `
    }
  },
  en: {
    1: {
      title: "Expansion of Motor Oil Range",
      date: "December 15, 2025",
      category: "Products",
      image: "Materials/oil.jpg",
      content: `
        <p>We are pleased to announce a significant expansion of our motor oil range! We now feature new lines from leading global manufacturers: Highway, VENOL, Kixx, and other brands.</p>
        
        <p>The new products meet the most modern quality standards and are suitable for all engine types - gasoline, diesel, turbocharged, and hybrid.</p>
        
        <p><strong>What's new in our range:</strong></p>
        <ul>
          <li>Premium synthetic motor oils with Low SAPS technology</li>
          <li>Semi-synthetic oils for modern turbocharged engines</li>
          <li>Mineral oils for classic vehicles</li>
          <li>Specialized oils for commercial transport</li>
          <li>High-performance oils for extreme operating conditions</li>
        </ul>
        
        <p>All oils have international quality certificates API, ACEA and approvals from leading car manufacturers. We guarantee product authenticity and provide complete documentation.</p>
        
        <p>Our specialists are always ready to help you choose the optimal lubricant for your vehicle, taking into account operating conditions and manufacturer recommendations.</p>
      `
    },
    2: {
      title: "New Quantum and Force Racing Batteries",
      date: "December 10, 2025",
      category: "Products",
      image: "Materials/AKM.jpg",
      content: `
        <p>We have stocked up with quality batteries from trusted manufacturers Quantum and Force Racing. Up to 3 years warranty on all products!</p>
        
        <p><strong>Advantages of new batteries:</strong></p>
        <ul>
          <li>Increased starting power for reliable start in any weather</li>
          <li>Resistance to deep discharge and fast charge recovery</li>
          <li>Calcium plate technology for minimal self-discharge</li>
          <li>Sealed construction - maintenance-free</li>
          <li>Wide capacity range from 45 to 225 Ah</li>
        </ul>
        
        <p>Quantum batteries are known for reliability and durability, perfect for passenger cars and commercial vehicles. Force Racing is a premium series for vehicles with high energy consumption.</p>
        
        <p>When purchasing a battery, we provide free diagnostics of your vehicle's electrical system and give recommendations for operation.</p>
      `
    },
    3: {
      title: "Discounts on Auto Chemistry Until Year End",
      date: "December 5, 2025",
      category: "Promotions",
      image: "Materials/Avtohim.jpg",
      content: `
        <p>Special offer for our customers — discounts up to 15% on all auto chemistry from leading brands K2, Atas, and PiTon!</p>
        
        <p><strong>Promotional categories:</strong></p>
        <ul>
          <li>Car shampoos and touchless wash products</li>
          <li>Polishes and waxes for body protection</li>
          <li>Glass, plastic, and leather interior cleaners</li>
          <li>Technical aerosols and lubricants</li>
          <li>Engine care products</li>
        </ul>
        
        <p>K2 - Polish brand with 20 years of experience, known for innovative formulas and eco-friendliness. Atas - Italian quality for professional care. PiTon - reliable solutions at affordable prices.</p>
        
        <p>The promotion is valid until December 31, 2025. Discounts apply to the entire range of auto chemistry from the specified brands. When purchasing over 2000 UAH - additional 5% discount!</p>
        
        <p>Don't miss the chance to prepare your car for winter at a great price!</p>
      `
    },
    4: {
      title: "Delivery Geography Expansion",
      date: "December 1, 2025",
      category: "Service",
      image: "Materials/fonassortiment.jpg",
      content: `
        <p>We now deliver products throughout Ukraine! Fast shipping and reliable product packaging guaranteed.</p>
        
        <p><strong>Delivery conditions:</strong></p>
        <ul>
          <li>Free delivery for orders over 3000 UAH</li>
          <li>Same-day shipping for orders placed before 2:00 PM</li>
          <li>Nova Poshta delivery to branch or by courier</li>
          <li>Cash on delivery option available</li>
          <li>Real-time package tracking</li>
        </ul>
        
        <p>We work with the most reliable transport companies to ensure your order arrives quickly and in perfect condition. Each package is carefully packed using protective materials.</p>
        
        <p>Special delivery conditions apply for regular customers and wholesale buyers. We can also arrange delivery of oversized cargo with our own transport.</p>
        
        <p>Order conveniently - receive quickly!</p>
      `
    },
    5: {
      title: "WIX and KNECHT Filters in Stock",
      date: "November 25, 2025",
      category: "Products",
      image: "Materials/filter.jpg",
      content: `
        <p>Large selection of air, oil, and fuel filters from European manufacturers WIX and KNECHT now available in our warehouse!</p>
        
        <p><strong>Filter range:</strong></p>
        <ul>
          <li>Oil filters for all engine types</li>
          <li>Air filters and cabin filters with activated carbon</li>
          <li>Fuel filters for gasoline and diesel engines</li>
          <li>Hydraulic filters for special equipment</li>
          <li>Filter kits for maintenance</li>
        </ul>
        
        <p>WIX Filters - American brand with over 80 years of history, leader in filtration systems manufacturing. KNECHT - German quality from Mahle company, official supplier to automotive concerns.</p>
        
        <p>All filters meet original specifications and have quality certificates. We will help you select the right filters for your vehicle by VIN code or part number.</p>
        
        <p>Regular filter replacement is the key to engine longevity and fuel economy!</p>
      `
    },
    6: {
      title: "Winter Preparation: Antifreeze",
      date: "November 20, 2025",
      category: "Products",
      image: "Materials/Antifriz.jpg",
      content: `
        <p>Wide selection of coolants to prepare your car for the winter season. Quality antifreeze from trusted manufacturers at affordable prices!</p>
        
        <p><strong>In stock:</strong></p>
        <ul>
          <li>G11 antifreeze (blue/green) for classic cars</li>
          <li>G12/G12+ antifreeze (red) for modern engines</li>
          <li>G13 antifreeze (purple) eco-friendly glycerin-based</li>
          <li>Concentrates for self-dilution</li>
          <li>Ready-to-use -40°C mixtures for harsh winters</li>
        </ul>
        
        <p>Properly selected antifreeze protects the engine from overheating in summer and freezing in winter, prevents corrosion and deposits in the cooling system.</p>
        
        <p><strong>Why it's important to replace antifreeze before winter:</strong></p>
        <ul>
          <li>Old antifreeze loses its protective properties</li>
          <li>Freezing temperature decreases</li>
          <li>Possible formation of sediment and corrosion</li>
          <li>Engine heat exchange deteriorates</li>
        </ul>
        
        <p>Our specialists will check your coolant condition for free and help you choose the optimal option. Don't wait for frost - take care of your car now!</p>
      `
    }
  }
};

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('newsModal');
  if (!modal) return;
  
  const modalOverlay = modal.querySelector('.news-modal__overlay');
  const modalClose = modal.querySelector('.news-modal__close');
  
  // Select both news-card and news__item (for news page and home page)
  const readMoreButtons = document.querySelectorAll('.news-card__read-more, .item-news__read-more');
  const newsItems = document.querySelectorAll('.news-card, .news__item');
  
  // Get current language
  function getCurrentLanguage() {
    return localStorage.getItem('asl-lang') || 'ua';
  }
  
  // Open modal
  function openModal(newsId) {
    const lang = getCurrentLanguage();
    const newsData = newsDetails[lang][newsId];
    
    if (!newsData) return;
    
    // Fill modal content
    document.getElementById('modalImage').src = newsData.image;
    document.getElementById('modalImage').alt = newsData.title;
    document.getElementById('modalDate').textContent = newsData.date;
    document.getElementById('modalCategory').textContent = newsData.category;
    document.getElementById('modalTitle').textContent = newsData.title;
    document.getElementById('modalText').innerHTML = newsData.content;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Event listeners for read more buttons
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const newsItem = this.closest('.news-card, .news__item');
      const newsId = newsItem.getAttribute('data-news-id');
      if (newsId) {
        openModal(parseInt(newsId));
      }
    });
  });
  
  // Event listeners for clicking on news items (home page)
  newsItems.forEach(item => {
    // Only add click handler if it's a news__item (home page), not news-card (news page)
    if (item.classList.contains('news__item')) {
      item.addEventListener('click', function(e) {
        // Don't trigger if clicking the button directly (already handled above)
        if (e.target.classList.contains('item-news__read-more')) return;
        
        const newsId = this.getAttribute('data-news-id');
        if (newsId) {
          openModal(parseInt(newsId));
        }
      });
    }
  });
  
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
