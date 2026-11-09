import { FloodScene, HistoricalFlood, FloodTypeInfo, WaterDepthLevel } from '../types/flood';

export const FLOOD_SCENES: FloodScene[] = [
  {
    id: 'scene-flash-flood',
    order: 1,
    titleAr: 'السيول الجارفة الخاطفة (Flash Floods)',
    titleFr: 'Les Crues Éclair Ravageuses',
    subtitleAr: 'طوفان مباغت يجتاح الشوارع والوديان في دقائق معدودة',
    subtitleFr: 'Un torrent dévastateur submerge les artères urbaines en quelques minutes',
    timestampDisplay: 'دقيقة 00:00 · اجتياح مباغت',
    duration: 12,
    image: '/src/assets/images/flood_flash_torrent_1794265186487.jpg',
    animation: 'zoom-in',
    soundMood: 'flash-flood',
    waterSpeedKmh: 45,
    threatLevel: 'catastrophic',
    narrationAr:
      'الفيضانات الخاطفة هي السلاح الأكثر فتكاً وقسوة للمياه. تنهمر أمطار طوفانية مفاجئة، فتتحول الشوارع الآمنة ومجاري الوديان الجافة إلى أنهار هادرة من الطين والركام تقتلع السيارات وتدمر الجسور في لحظات خاطفة دون سابق إنذار.',
    narrationFr:
      'Les crues éclair représentent la manifestation la plus soudaine et meurtrière des inondations. En quelques minutes, des précipitations torrentielles transforment les chaussées urbaines en rapides impétueux arrachant véhicules et infrastructures sans préavis.',
    subtitles: [
      {
        id: 'sub-1-1',
        start: 0,
        end: 4.0,
        textAr: 'الفيضانات الخاطفة: حين تتحول الشوارع والوديان في لحظات إلى أنهار جارفة.',
        textFr: 'Les crues éclair : quand les rues urbaines se transforment en rivières impétueuses.'
      },
      {
        id: 'sub-1-2',
        start: 4.1,
        end: 8.0,
        textAr: 'قوة التيار المائي والطين قادرة على حمل السيارات واقتلاع الأشجار والجدران.',
        textFr: 'La force du courant et de la boue soulève les automobiles et arrache les fondations.'
      },
      {
        id: 'sub-1-3',
        start: 8.1,
        end: 12.0,
        textAr: 'تكفي 30 سنتيمتراً فقط من المياه الجارية لتعويم سيارة كاملة وجرفها نحو الهلاك.',
        textFr: 'Seulement 30 centimètres d’eau courante suffisent pour emporter un véhicule lourd.'
      }
    ],
    scientificFactAr:
      'تمتلك المياه الجارية بسرعة 40 كم/س قوة دفع توازي الرياح العاتية من الدرجة الخامسة؛ فكل متر مكعب من الماء يزن طناً كاملاً يرتطم بالمنشآت كالمطرقة الهيدروليكية.',
    scientificFactFr:
      'Une masse d’eau en crue à 40 km/h exerce une pression hydrodynamique colossale : chaque mètre cube d’eau pèse une tonne et agit comme un marteau destructeur sur les fondations.'
  },
  {
    id: 'scene-aerial-inundation',
    order: 2,
    titleAr: 'الغمر الشامل وعمليات الإنقاذ الجوي',
    titleFr: 'Submersion Régionale & Sauvetage Aérien',
    subtitleAr: 'مدن معزولة وقرى غارقة تحت أمتار من المياه الراكدة',
    subtitleFr: 'Des villages entiers coupés du monde sous des mètres d’eaux limoneuses',
    timestampDisplay: 'دقيقة 00:12 · بحار شاسعة من المياه',
    duration: 13,
    image: '/src/assets/images/flood_aerial_rescue_1794265187055.jpg',
    animation: 'pan-left',
    soundMood: 'aerial-inundation',
    waterSpeedKmh: 15,
    threatLevel: 'high',
    narrationAr:
      'حين تفيض الأنهار الكبرى عن ضفافها، يبتلع الماء مساحات تضاهي دولاً بأكملها. تصبح أسطح المنازل وأعالي الأشجار ملاذات أخيرة لآلاف العائلات المحاصرة، بينما تسابق قوارب النجاة والمروحيات الزمن لإجلاء العالقين وسط مياه ملوثة تتهددها الأوبئة.',
    narrationFr:
      'Lorsque les grands cours d’eau saturent leurs lits majeurs, des territoires entiers sont submergés. Les toitures deviennent l’ultime refuge des populations assiégées tandis que les canots et hélicoptères de sauvetage mènent une course effrénée contre l’isolement et les épidémies.',
    subtitles: [
      {
        id: 'sub-2-1',
        start: 0,
        end: 4.2,
        textAr: 'عند فيضان الأنهار الكبرى، تختفي معالم القرى والأراضي الزراعية تحت بحيرات هائلة.',
        textFr: 'Lors du débordement des fleuves majeurs, villes et cultures disparaissent sous d’immenses nappes d’eau.'
      },
      {
        id: 'sub-2-2',
        start: 4.3,
        end: 8.5,
        textAr: 'تتحول قوارب الإنقاذ والمروحيات إلى شريان الحياة الوحيد للمحاصرين فوق أسطح المنازل.',
        textFr: 'Embarcations de secours et ponts aériens deviennent la seule ligne de vie pour les rescapés perchés sur les toits.'
      },
      {
        id: 'sub-2-3',
        start: 8.6,
        end: 13.0,
        textAr: 'تكمن الكارثة الصامتة بعد انحسار الماء في تلوث شبكات الشرب وانهيار الإمدادات الغذائية.',
        textFr: 'Après la crue, la menace invisible de la contamination hydrique et des pénuries alimentaires s’installe.'
      }
    ],
    scientificFactAr:
      'فيضانات السهول الفيضية قد تستمر أسابيع أو أشهراً لتنحسر بسبب غياب الانحدار الطبوغرافي وتشبع الخزانات الجوفية بالكامل.',
    scientificFactFr:
      'Dans les plaines alluviales, la décrue peut prendre plusieurs semaines en raison de la saturation complète des nappes phréatiques et de la faible déclivité.'
  },
  {
    id: 'scene-coastal-surge',
    order: 3,
    titleAr: 'أمواج العواصف الساحلية وأعاصير المد',
    titleFr: 'Ondes de Tempête & Submersion Côtière',
    subtitleAr: 'حين يزحف المحيط ويكسر الحواجز البحرية بارتفاع أمتار',
    subtitleFr: 'La mer en furie fracasse les digues et pénètre les terres sous des vents d’ouragan',
    timestampDisplay: 'دقيقة 00:25 · هياج المحيطات',
    duration: 12,
    image: '/src/assets/images/flood_coastal_surge_1794265187083.jpg',
    animation: 'zoom-in',
    soundMood: 'storm-surge',
    waterSpeedKmh: 65,
    threatLevel: 'catastrophic',
    narrationAr:
      'المد العاصفي هو وحش المحيطات الهائج؛ فمع انخفاض الضغط الجوي ورياح الأعاصير التي تتجاوز مئتي كيلومتر في الساعة، يرتفع سطح البحر كجدار مائي عملاق يقتحم السواحل ويبتلع الموانئ والشواطئ بقوة تفتيت ساحقة تفوق طاقة أعتى السدود الصخرية.',
    narrationFr:
      'La submersion marine constitue la forme la plus violente d’agression côtière. Sous l’effet d’une dépression extrême et d’ouragans soufflant à plus de 200 km/h, l’océan s’élève en un rempart destructeur déferlant sur les digues et les agglomérations littorales.',
    subtitles: [
      {
        id: 'sub-3-1',
        start: 0,
        end: 3.8,
        textAr: 'المد العاصفي يرفع منسوب مياه البحر لعدة أمتار فوق معدلاته الطبيعية.',
        textFr: 'L’onde de tempête élève le niveau marin de plusieurs mètres au-dessus des plus hautes marées.'
      },
      {
        id: 'sub-3-2',
        start: 3.9,
        end: 7.9,
        textAr: 'أمواج هائلة تضرب المصدات والمنشآت الساحلية بقوة ميكانيكية تسحق الخرسانة.',
        textFr: 'Des vagues colossales percutent les protections portuaires avec une violence brisant le béton armé.'
      },
      {
        id: 'sub-3-3',
        start: 8.0,
        end: 12.0,
        textAr: 'ارتفاع مستوى سطح البحر الناجم عن التغير المناخي يضاعف تكرار هذه الكوارث.',
        textFr: 'L’élévation mondiale du niveau des mers amplifie dramatiquement la fréquence de ces assauts marins.'
      }
    ],
    scientificFactAr:
      'تتسبب أمواج المد العاصفي الناتجة عن الأعاصير المدارية في 90% من إجمالي الخسائر البشرية المرتبطة بالأعاصير وليس سرعة الرياح بحد ذاتها.',
    scientificFactFr:
      'L’onde de tempête générée par les cyclones tropicaux cause plus de 90 % des pertes humaines directes lors d’un ouragan, bien plus que la violence du vent seul.'
  },
  {
    id: 'scene-barrier-defense',
    order: 4,
    titleAr: 'هندسة الحماية وبوابات السدود الذكية',
    titleFr: 'Ingénierie de Défense & Méga-Ouvrages Hydrauliques',
    subtitleAr: 'حواجز تيمز وموسيه وخطط السيطرة على مسارات الطوفان',
    subtitleFr: 'Barrières mobiles de la Tamise et du MOSE : la science au secours des cités',
    timestampDisplay: 'دقيقة 00:37 · صمود الهندسة الحديثة',
    duration: 12,
    image: '/src/assets/images/flood_barrier_defense_1794265187672.jpg',
    animation: 'zoom-out',
    soundMood: 'barrier-defense',
    waterSpeedKmh: 20,
    threatLevel: 'medium',
    narrationAr:
      'أمام جبروت الطوفان، لم يقف الإنسان مكتوف الأيدي. فقد شيدت البشرية معجزات هندسية كحاجز نهر التيمز في لندن وسدود الدلتا في هولندا، وبوابات هيدروليكية عملاقة تُغلق في ثوانٍ لعزل المدن وحماية ملايين الأرواح، لتثبت أن العلم والاستعداد هما درع النجاة الأول.',
    narrationFr:
      'Face à la fureur des flots, l’humanité a érigé des chefs-d’œuvre d’ingénierie : la barrière de la Tamise à Londres, le plan Delta aux Pays-Bas ou le système MOSE à Venise. Ces gigantesques portes articulées se dressent pour verrouiller les estuaires et préserver des millions de vies.',
    subtitles: [
      {
        id: 'sub-4-1',
        start: 0,
        end: 4.0,
        textAr: 'الحواجز الهيدروليكية العملاقة تعزل المدن وتمنع توغل مياه المد العاتية.',
        textFr: 'Les méga-portes hydrauliques articulées isolent les métropoles contre les crues catastrophiques.'
      },
      {
        id: 'sub-4-2',
        start: 4.1,
        end: 8.0,
        textAr: 'أنظمة الإنذار المبكر بالأقمار الاصطناعية تتيح ساعات حاسمة لإخلاء السكان بأمان.',
        textFr: 'Les systèmes d’alerte satellitaire et radar octroient des heures cruciales pour évacuer les populations.'
      },
      {
        id: 'sub-4-3',
        start: 8.1,
        end: 12.0,
        textAr: 'التخطيط الحضري الذكي والتعايش مع الطبيعة هما مفتاح الأمان لمستقبل كوكبنا.',
        textFr: 'L’aménagement résilient et la renaturation des zones humides constituent le bouclier durable de l’humanité.'
      }
    ],
    scientificFactAr:
      'حاجز نهر التيمز في لندن أغلق بنجاح أكثر من 200 مرة منذ افتتاحه عام 1982، حامياً أصولاً وبنى تحتية تتجاوز قيمتها 1.6 تريليون جنيه إسترليني.',
    scientificFactFr:
      'La barrière fluviale de la Tamise a été actionnée avec succès plus de 200 fois depuis 1982, protégeant des biens et infrastructures estimés à plus de 1 600 milliards de livres.'
  }
];

export const HISTORICAL_FLOODS: HistoricalFlood[] = [
  {
    id: 'china-1931',
    nameAr: 'طوفان الصين العظيم (نهر يانغتسي والنهر الأصفر)',
    nameFr: 'Les Inondations de Chine de 1931 (Yangzi & Fleuve Jaune)',
    year: '1931',
    locationAr: 'وسط وشرق الصين',
    locationFr: 'Chine centrale et orientale',
    deathTollAr: 'بين 2.5 إلى 4 ملايين ضحية',
    deathTollFr: '2,5 à 4 millions de victimes',
    causeAr: 'ذوبان ثلوج جبلية كثيفة أعقبته أمطار موسمية و9 أعاصير متتالية في شهر واحد',
    causeFr: 'Fonte nivale massive suivie de moussons et de 9 cyclones records en un mois',
    summaryAr:
      'تعتبر هذه الكارثة أسوأ كارثة طبيعية في تاريخ البشرية المدون قاطبة. غمرت المياه مساحة تقارب مساحة إنجلترا وهولندا معاً، وتسببت في مجاعات وأوبئة كوليرا اجتاحت الملايين من السكان المنكوبين.',
    summaryFr:
      'Considérée comme la catastrophe naturelle la plus meurtrière de l’histoire écrite. Une nappe d’eau colossale a submergé une zone équivalente à l’Angleterre et aux Pays-Bas réunis, provoquant famines et épidémies massives.',
    economicDamageAr: 'تدمير كامل للمحصول الزراعي الوطني وغرق 16 مدينة رئيسية',
    economicDamageFr: 'Destruction de la quasi-totalité des récoltes nationales de riz et submersion de 16 grandes villes',
    keyLessonAr: 'ضرورة بناء منظومة سدود تحكم متقدمة وتشجير ضفاف الأنهار لمنع الانجراف الطيني',
    keyLessonFr: 'Nécessité de barrages de régulation pluriannuels et de restauration de la végétation ripisylve'
  },
  {
    id: 'banqiao-1975',
    nameAr: 'كارثة انهيار سد بانكياو (الصين)',
    nameFr: 'Catastrophe de la Rupture du Barrage de Banqiao',
    year: '1975',
    locationAr: 'إقليم خنان، الصين',
    locationFr: 'Province du Henan, Chine',
    deathTollAr: '~230,000 ضحية (غرقاً ومجاعة)',
    deathTollFr: '~230 000 morts (noyades et famines consécutives)',
    causeAr: 'إعصار نينا تسبب بهطول 1060 ملم من الأمطار في يوم واحد متجاوزاً قدرة السد القصوى',
    causeFr: 'Le typhon Nina a déversé 1 060 mm de pluie en 24h, dépassant la capacité de crue millénale du barrage',
    summaryAr:
      'أدى انهيار سد بانكياو ومعه 62 سداً أصغر إلى إطلاق موجة مائية بارتفاع 6 أمتار وعرض 10 كيلومترات اندفعت بسرعة 50 كم/س لتبيد بلدات كاملة في ثوانٍ.',
    summaryFr:
      'L’effondrement en chaîne de Banqiao et de 62 barrages annexes a libéré un mur d’eau de 6 mètres de haut sur 10 kilomètres de large se déplaçant à 50 km/h.',
    economicDamageAr: 'محو 6.8 مليون منزل وغرق 11 مليون هكتار من الأراضي',
    economicDamageFr: '6,8 millions d’habitations pulvérisées et 11 millions d’hectares agricoles inondés',
    keyLessonAr: 'تصميم السدود وفق سيناريوهات الطوارئ القصوى وبناء قنوات تصريف فيضاني اضطرارية متعددة',
    keyLessonFr: 'Dimensionnement des déversoirs de sécurité selon les scénarios extrêmes de cumul pluviométrique'
  },
  {
    id: 'derna-2023',
    nameAr: 'كارثة إعصار دانيال وانهيار سدود درنة (ليبيا)',
    nameFr: 'La Catastrophe de Derna - Tempête Daniel (Libye)',
    year: '2023',
    locationAr: 'مدينة درنة، شمال شرق ليبيا',
    locationFr: 'Derna, Nord-Est de la Libye',
    deathTollAr: 'أكثر من 11,300 ضحية وآلاف المفقودين',
    deathTollFr: 'Plus de 11 300 décès confirmés et des milliers de disparus',
    causeAr: 'عاصفة متوسطية عنيفة أدت لانهيار سدي وادي درنة وسحق ربع المدينة في جوف الليل',
    causeFr: 'Médicane intense provoquant la rupture successive de deux barrages en amont dans la nuit',
    summaryAr:
      'في فجر 11 سبتمبر 2023، انهار سدا وادي درنة بسبب ضغط السيول غير المسبوقة، فاندفعت موجة مائية بارتفاع عمارة سكنية جرفت أحياء بأكملها بسكانها إلى عمق البحر المتوسط.',
    summaryFr:
      'Dans la nuit du 10 au 11 septembre 2023, deux barrages ont cédé, libérant 30 millions de mètres cubes d’eau qui ont emporté des quartiers entiers directement dans la Méditerranée.',
    economicDamageAr: 'دمار 25% من النسيج الحضري وانهيار شبكات المياه والكهرباء والجسور التاريخية',
    economicDamageFr: 'Destruction d’un quart du tissu urbain historique et rupture intégrale des réseaux',
    keyLessonAr: 'الصيانة الدورية للبنية التحتية وإنشاء خطط إخلاء مدنية سريعة وتفعيل صفارات الإنذار',
    keyLessonFr: 'Maintenance impérative des ouvrages hydrauliques vieillissants et sirènes d’évacuation préventive'
  },
  {
    id: 'pakistan-2022',
    nameAr: 'طوفان باكستان الماحق (2022)',
    nameFr: 'Les Inondations Historiques du Pakistan (2022)',
    year: '2022',
    locationAr: 'باكستان (أقاليم السند وبلوشستان وخيبر)',
    locationFr: 'Pakistan (Sindh, Baloutchistan, Khyber)',
    deathTollAr: '1,739 ضحية وتضرر 33 مليون نسمة',
    deathTollFr: '1 739 morts et 33 millions de personnes sinistrées',
    causeAr: 'رياح موسمية وحشية بلغت 5 أضعاف معدلاتها تزامنت مع ذوبان متسارع للأنهار الجليدية في الهيمالايا',
    causeFr: 'Moussons historiques (500 % de la normale) couplées à une fonte glaciaire accélérée dans l’Himalaya',
    summaryAr:
      'تحول ثلث مساحة باكستان إلى بحيرة داخلية ضخمة التقطتها الأقمار الاصطناعية من الفضاء الخارجي. شردت الكارثة ملايين الأسر وأبادت ملايين الماشية والأراضي الزراعية.',
    summaryFr:
      'Un tiers du territoire pakistanais a été submergé, formant une mer intérieure visible depuis l’espace et affectant un citoyen sur sept dans le pays.',
    economicDamageAr: 'خسائر اقتصادية تجاوزت 30 مليار دولار أمريكي',
    economicDamageFr: 'Pertes économiques et destructions estimées à plus de 30 milliards de dollars',
    keyLessonAr: 'العدالة المناخية العالمية وضرورة دعم الدول المتضررة من احترار الغلاف الجوي وبناء قنوات تصريف كبرى',
    keyLessonFr: 'Urgence de la justice climatique et de l’adaptation hydrologique face au réchauffement mondial'
  },
  {
    id: 'valencia-2024',
    nameAr: 'سيول فالنسيا الجارفة وظاهرة DANA (إسبانيا)',
    nameFr: 'Les Inondations Éclair de Valence - Gota Fría / DANA (Espagne)',
    year: '2024',
    locationAr: 'إقليم فالنسيا وقشتالة لا مانشا، إسبانيا',
    locationFr: 'Communauté valencienne, Espagne',
    deathTollAr: 'أكثر من 220 ضحية',
    deathTollFr: 'Plus de 220 victimes recensées',
    causeAr: 'ظاهرة المنخفض الجوي المعزول (DANA) هطلت خلالها أمطار عام كامل في أقل من 8 ساعات',
    causeFr: 'Phénomène de goutte froide (DANA) déversant l’équivalent d’une année de pluie en moins de 8 heures',
    summaryAr:
      'تدفقت سيول طينية عارمة قطعت الطرق السريعة وابتلعت مئات السيارات والأنفاق السكنية، وشكلت صدمة للقارة الأوروبية حول سرعة تحول الظواهر الجوية المتطرفة إلى كوارث قاتلة.',
    summaryFr:
      'Des vagues de boue dévastatrices ont paralysé les autoroutes, piégé les automobilistes et rappelé la vulnérabilité extrême des zones urbaines méditerranéennes.',
    economicDamageAr: 'أضرار بمليارات اليورو وشلل شبكات السكك الحديدية والمناطق الصناعية',
    economicDamageFr: 'Milliards d’euros de dégâts industriels, ferroviaires et immobiliers',
    keyLessonAr: 'تحديث بروتوكولات التحذير عبر الهواتف الذكية ومنع البناء في مجاري السيول الجافة التاريخية',
    keyLessonFr: 'Modernisation des systèmes d’alerte mobile d’urgence et interdiction de bâtir en lit majeur'
  }
];

export const FLOOD_TYPES: FloodTypeInfo[] = [
  {
    id: 'flash',
    nameAr: 'السيول الخاطفة (Flash Floods)',
    nameFr: 'Crues Éclair & Torrents de Ravin',
    speedAr: 'فائقة السرعة (تصل إلى 50 كم/س)',
    speedFr: 'Fulgurante (jusqu’à 50 km/h)',
    warningTimeAr: 'دقائق إلى ساعات قليلة فقط',
    warningTimeFr: 'Quelques minutes à 2 heures',
    causeAr: 'أمطار عاصفية شديدة الكثافة على أرض صلبة أو جافة تمنع الامتصاص، أو في منحدرات جبلية ضيقة.',
    causeFr: 'Pluies orageuses paroxystiques sur sols imperméabilisés ou bassins versants pentus.',
    descriptionAr:
      'تحدث فجأة دون مقدمات؛ تتجمع المياه في المنخفضات والشوارع لتشكل أمواجاً قاطعة تحمل الحجارة والسيارات وتجرف المشاة.',
    descriptionFr:
      'Surviennent brutalement ; l’eau s’engouffre dans les talwegs et les rues en un torrent de débris hautement létal.',
    lethalityAr: 'شديدة الخطورة على الأرواح (تسبب أعلى معدل وفيات فوري)',
    lethalityFr: 'Létalité immédiate maximale (piège les automobilistes et piétons)'
  },
  {
    id: 'riverine',
    nameAr: 'الفيضانات النهرية (Riverine / Fluvial Floods)',
    nameFr: 'Inondations Fluviales par Débordement',
    speedAr: 'بطيئة إلى متوسطة التدفق ولكن واسعة النطاق',
    speedFr: 'Progressive mais d’ampleur territoriale',
    warningTimeAr: 'أيام إلى أسابيع قبل بلوغ الذروة',
    warningTimeFr: 'Plusieurs jours à une semaine',
    causeAr: 'هطول أمطار متواصلة لأسابيع أو ذوبان واسع للثلوج في أحواض منابع الأنهار الكبرى.',
    causeFr: 'Pluies continues prolongées et fonte de manteaux neigeux saturant les bassins hydrographiques.',
    descriptionAr:
      'يرتفع منسوب النهر تدريجياً حتى يفيض عن ضفافه وسدوده الترابية، ليغمر السهول والمدن الواقعة في حوضه المائي لأيام طويلة.',
    descriptionFr:
      'Montée lente mais inexorable du niveau des cours d’eau qui submergent les plaines alluviales habitées.',
    lethalityAr: 'خسائر مادية وزراعية فادحة وتشريد سكاني واسع',
    lethalityFr: 'Dégâts matériels, agricoles et sanitaires colossaux à long terme'
  },
  {
    id: 'coastal',
    nameAr: 'فيضانات العواصف الساحلية (Storm Surges)',
    nameFr: 'Submersions Marines & Ondes de Tempête',
    speedAr: 'عنيفة وتصاحبها أمواج عاتية ورياح إعصارية',
    speedFr: 'Violente, couplée à des houles déferlantes',
    warningTimeAr: '12 إلى 48 ساعة عبر رصد الأعاصير',
    warningTimeFr: '12 à 48 heures via veille météorologique',
    causeAr: 'رياح الأعاصير المدارية وانخفاض الضغط الجوي الشديد الذي يسحب مياه البحر للأعلى ويدفعها نحو اليابسة.',
    causeFr: 'Dépression atmosphérique extrême et vents d’ouragan poussant l’océan vers les terres littorales.',
    descriptionAr:
      'ارتفاع غير اعتيادي لمنسوب البحر يخترق الحواجز الساحلية ويدمر الموانئ والمنشآت الشاطئية بمياه مالحة تقتل التربة.',
    descriptionFr:
      'Élévation brutale du niveau marin fracassant le front de mer et salinisant durablement les sols côtiers.',
    lethalityAr: 'كارثية على المناطق الساحلية المنخفضة والجزر',
    lethalityFr: 'Dévastatrice pour les estuaires, polders et îles basses'
  },
  {
    id: 'dam',
    nameAr: 'فيضانات انهيار السدود (Dam Breaches)',
    nameFr: 'Ruptures de Barrages & Tsunami Terrestre',
    speedAr: 'صادمة كالانفجار التدميري',
    speedFr: 'Explosive, onde de choc hydrodynamique',
    warningTimeAr: 'صفر إلى دقائق معدودة بعد التصدع',
    warningTimeFr: 'Quasi-nulle après effondrement structural',
    causeAr: 'تصدع إنشائي، زلازل، أو طوفان مائي يتجاوز طاقة استيعاب السد وينسف جدار الحجز.',
    causeFr: 'Défaut de structure, séisme ou surverse massive causant la liquéfaction de la digue.',
    descriptionAr:
      'تفريغ مفاجئ لملايين الأمتار المكعبة من المياه المخزنة على شكل موجة تسونامي برية تجتاح كل شيء في مسارها.',
    descriptionFr:
      'Libération instantanée de millions de mètres cubes formant un véritable tsunami continental.',
    lethalityAr: 'إبادة فورية للمدن والقرى الواقعة في مجرى الوادي',
    lethalityFr: 'Destruction mécanique absolue de toute agglomération en aval'
  }
];

export const WATER_DEPTH_LEVELS: WaterDepthLevel[] = [
  {
    depthMeters: 0.15,
    depthDisplay: '15 سم (6 بوصات)',
    titleAr: 'مستوى فقدان التوازن والتعثر',
    titleFr: 'Perte d’adhérence & Chute des piétons',
    impactAr: 'المياه الجارية بهذه السماكة تكفي لإسقاط شخص بالغ على الأرض وجرف الأطفال وكبار السن.',
    impactFr: 'Une eau courante de 15 cm suffit à faire chuter un adulte et à emporter un enfant.',
    dangerLevel: 'caution',
    actionAr: 'لا تحاول أبداً عبور الشوارع المغمورة سيراً على الأقدام، فالحفر المفتوحة غير مرئية.',
    actionFr: 'Ne marchez jamais dans l’eau en crue ; les bouches d’égout ouvertes sont invisibles.',
    sweepsVehicles: false,
    sweepsAdults: true,
    structureBreach: false
  },
  {
    depthMeters: 0.30,
    depthDisplay: '30 سم (قدم واحد)',
    titleAr: 'تعويم المركبات الصغيرة وخروجها عن السيطرة',
    titleFr: 'Flottement des citadines & Perte de contrôle',
    impactAr: 'تعوم معظم السيارات الخفيفة والسيدان، وتفقد الإطارات تماسكها مع الأسفلت، ويبدأ الماء بدخول المحرك.',
    impactFr: 'La majorité des voitures de tourisme perdent contact avec le sol et commencent à dériver.',
    dangerLevel: 'danger',
    actionAr: 'توقف فوراً! التراجع بالسيارة ينقذ حياتك. "استدر ولا تغرق".',
    actionFr: 'Demi-tour immédiat ! Ne tentez jamais de traverser un passage inondé au volant.',
    sweepsVehicles: true,
    sweepsAdults: true,
    structureBreach: false
  },
  {
    depthMeters: 0.60,
    depthDisplay: '60 سم (قدمان)',
    titleAr: 'جرف الشاحنات وسيارات الدفع الرباعي',
    titleFr: 'Emportement des 4x4, SUV et utilitaires',
    impactAr: 'قوة الطفو ترفع حتى أضخم سيارات الدفع الرباعي والشاحنات وتجرفها مع التيار كالزوارق الورقية.',
    impactFr: 'La poussée d’Archimède soulève même les plus gros 4x4 et camions utilitaires.',
    dangerLevel: 'danger',
    actionAr: 'غادر السيارة فوراً قبل أن تنحشر الأبواب بفعل ضغط الماء الخارجي واصعد لمرتفع.',
    actionFr: 'Quittez le véhicule sans délai si l’eau monte avant que la pression ne bloque les portières.',
    sweepsVehicles: true,
    sweepsAdults: true,
    structureBreach: false
  },
  {
    depthMeters: 1.50,
    depthDisplay: '1.5 متر (5 أقدام)',
    titleAr: 'غمر الطوابق الأرضية وشلل الكهرباء',
    titleFr: 'Submersion intégrale du rez-de-chaussée',
    impactAr: 'غمر الأثاث، انقطاع التيار الكهربائي، انفجار أغطية الصرف، وتلوث مياه الشرب بالمواد الكيميائية والفضلات.',
    impactFr: 'Court-circuits majeurs, coupure d’eau potable, contamination chimique et refoulement des égouts.',
    dangerLevel: 'extreme',
    actionAr: 'اصعد فوراً إلى الطوابق العليا أو الأسطح. افصل قاطع الكهرباء الرئيسي وتجنب لمس أي مفتاح كهربائي.',
    actionFr: 'Réfugiez-vous à l’étage supérieur. Coupez le disjoncteur général et fermez l’arrivée de gaz.',
    sweepsVehicles: true,
    sweepsAdults: true,
    structureBreach: true
  },
  {
    depthMeters: 3.00,
    depthDisplay: '3.0 أمتار فأكثر (10+ أقدام)',
    titleAr: 'الانهيار الإنشائي وتطويق الأسطح',
    titleFr: 'Rupture structurelle & Sauvetage par les toits',
    impactAr: 'ضغط هيدروستاتيكي يهد الجدران ويفجر النوافذ. عزلة كاملة للمباني تتطلب تدخلاً جوياً بالمروحيات وقوارب الزودياك.',
    impactFr: 'Pression hydrostatique destructrice sur les murs porteurs ; secours possibles uniquement par voie aérienne.',
    dangerLevel: 'extreme',
    actionAr: 'اتجه إلى أعلى نقطة في السطح مع حقيبة الطوارئ، واستخدم إشارات ضوئية وملابس زاهية لجذب فرق الإنقاذ.',
    actionFr: 'Munissez-vous du sac d’urgence sur le toit et déployez un tissu vivement coloré pour les hélicoptères.',
    sweepsVehicles: true,
    sweepsAdults: true,
    structureBreach: true
  }
];

export const SAFETY_CHECKLIST = [
  {
    id: 'before-1',
    categoryAr: 'قبل حدوث الفيضان (الاستعداد)',
    categoryFr: 'Avant l’inondation (Prévention)',
    itemsAr: [
      'تجهيز حقيبة طوارئ محكمة الإغلاق تحتوي على ماء صالح للشرب، طعام معلب، مصباح يدوي، وبطاريات إضافية.',
      'حفظ الوثائق الثبوتية وجوازات السفر في أكياس بلاستيكية معزولة ومقاومة للماء.',
      'معرفة مسارات الإخلاء الآمنة ونقاط التجمع المرتفعة المحددة من الدفاع المدني.',
      'تثبيت صمامات عدم الرجوع في شبكات الصرف لمنع ارتداد مياه المجاري إلى المنازل.'
    ],
    itemsFr: [
      'Préparer un kit d’urgence étanche : eau potable (3L/jour/pers), conserves, lampe torche et piles.',
      'Placer les documents officiels et papiers d’identité dans des pochettes hermétiques zippées.',
      'Identifier les axes d’évacuation vers les zones refuges d’altitude définies par la préfecture.',
      'Installer des clapets anti-retour sur les canalisations d’évacuation pour parer au refoulement.'
    ]
  },
  {
    id: 'during-2',
    categoryAr: 'أثناء وقوع الفيضان (الاستجابة والنجاة)',
    categoryFr: 'Pendant l’inondation (Survie & Réflexes)',
    itemsAr: [
      'القاعدة الذهبية: "استدر ولا تغرق" - لا تقد مركبتك أبداً في طريق مغمور بالمياه مهما بدت سطحية.',
      'فصل التيار الكهربائي وإمدادات الغاز الرئيسية فوراً عند ملاحظة بدء تسرب المياه للمبنى.',
      'الصعود إلى الأدوار العليا وتجنب النزول للأقبية أو المرائب الأرضية التي تتحول إلى مصائد قاتلة.',
      'متابعة البلاغات الرسمية عبر المذياع أو الهاتف وتجنب تصديق الشائعات على منصات التواصل.'
    ],
    itemsFr: [
      'Règle d’or : « Turn Around, Don’t Drown » — Ne vous engagez jamais au volant sur une voie inondée.',
      'Couper immédiatement le disjoncteur électrique général et l’arrivée principale de gaz.',
      'Gagner les étages élevés et fuir impérativement les sous-sols et parkings souterrains (pièges mortels).',
      'Suivre les consignes diffusées sur les radios locales de service public et les canaux officiels de secours.'
    ]
  },
  {
    id: 'after-3',
    categoryAr: 'بعد انحسار مياه الفيضان (التعافي والاحتراز)',
    categoryFr: 'Après la décrue (Sécurité & Assainissement)',
    itemsAr: [
      'عدم تشغيل الكهرباء أو الأجهزة المنزلية حتى فحصها من قبل فني معتمد للتأكد من جفافها.',
      'غلي مياه الصنبور قبل استخدامها في الشرب أو الطهي خشية اختلاطها بمياه الصرف الملوثة.',
      'ارتداء قفازات وأحذية مطاطية سميكة أثناء تنظيف الرواسب الطينية لتجنب التلوث ولدغات الزواحف.',
      'توثيق الأضرار بالصور والفيديو لتقديمها لشركات التأمين وجهات الإغاثة.'
    ],
    itemsFr: [
      'Ne pas réenclencher l’électricité ni les appareils avant certification par un professionnel habilité.',
      'Faire bouillir l’eau courante avant toute consommation tant que la potabilité n’est pas confirmée.',
      'Porter gants et bottes en caoutchouc épaisses lors du déblaiement pour éviter infections et blessures.',
      'Photographier méthodiquement l’ensemble des dommages avant tout nettoyage pour les assurances.'
    ]
  }
];

export const FLOOD_QUIZ = [
  {
    id: 1,
    questionAr: 'ما هو العمق المائي الجاري الكافي لإفقاد سيارة ركاب صغيرة السيطرة وتعويمها تماماً؟',
    questionFr: 'Quelle hauteur d’eau courante suffit à faire flotter une voiture citadine et lui faire perdre le contrôle ?',
    optionsAr: ['10 سنتيمترات', '30 سنتيمتراً (قدم واحد)', '1.5 متر', '3 أمتار'],
    optionsFr: ['10 centimètres', '30 centimètres (1 pied)', '1,5 mètre', '3 mètres'],
    correctAnswer: 1,
    explanationAr: '30 سم فقط من المياه الجارية تكفي لدفع قاع السيارة للأعلى وتعويمها وجرفها في ثوانٍ.',
    explanationFr: 'Seulement 30 cm d’eau en mouvement soulèvent la majorité des voitures en raison de la force d’Archimède.'
  },
  {
    id: 2,
    questionAr: 'ما هي الكارثة الطبيعية الأشد فتكاً في التاريخ البشري من حيث أعداد الضحايا؟',
    questionFr: 'Quelle est la catastrophe naturelle la plus meurtrière de toute l’histoire humaine documentée ?',
    optionsAr: ['تسونامي المحيط الهندي 2004', 'فيضانات الصين 1931 (يانغتسي والنهر الأصفر)', 'إعصار كاترينا 2005', 'زلزال لشبونة 1755'],
    optionsFr: ['Le tsunami de l’océan Indien 2004', 'Les inondations de Chine 1931 (Yangzi & Fleuve Jaune)', 'L’ouragan Katrina 2005', 'Le séisme de Lisbonne 1755'],
    correctAnswer: 1,
    explanationAr: 'فيضانات الصين عام 1931 أودت بحياة ما بين 2.5 إلى 4 ملايين نسمة جراء الغرق والمجاعات والأوبئة.',
    explanationFr: 'Les inondations du fleuve Yangzi en 1931 ont provoqué la mort de 2,5 à 4 millions d’individus.'
  },
  {
    id: 3,
    questionAr: 'أين يجب التوجه فوراً عند فيضان المياه داخل المباني السكنية؟',
    questionFr: 'Où devez-vous immédiatement vous réfugier lorsque l’eau pénètre dans une habitation ?',
    optionsAr: ['إلى القبو أو المرآب الأرضي لحماية الممتلكات', 'إلى الطوابق العليا أو سطح المبنى', 'إلى الشارع لقيادة السيارة والهرب', 'البقاء في الطابق الأرضي وإغلاق النوافذ فقط'],
    optionsFr: ['Au sous-sol ou garage pour sauver du matériel', 'Vers les étages supérieurs ou la toiture', 'Dans la rue pour fuir en voiture', 'Rester au rez-de-chaussée en fermant les fenêtres'],
    correctAnswer: 1,
    explanationAr: 'الأدوار السفلية والأقبية تتحول إلى مصائد قاتلة في دقائق، لذا يجب الصعود للأعلى والابتعاد عن مجرى الماء.',
    explanationFr: 'Les sous-sols sont de véritables souricières mortelles ; il faut impérativement gagner la hauteur.'
  },
  {
    id: 4,
    questionAr: 'لماذا يُحظر تماماً قيادة السيارة في طريق غمرته مياه السيول؟',
    questionFr: 'Pourquoi est-il formellement interdit de s’engager au volant sur une route inondée ?',
    optionsAr: ['لأن الطريق قد يكون منهاراً تحته، وسرعة التيار تجرف السيارة حتى لو كان عمق الماء بسيطاً', 'لأن زجاج السيارة قد يتسخ بالطين فقط', 'لأن الراديو لن يعمل في الماء', 'لأن أضواء السيارة ستتلف فقط'],
    optionsFr: ['La chaussée peut être effondrée sous l’eau et la poussée du courant emporte tout véhicule', 'Parce que les vitres seront tachées', 'Parce que la radio cessera de fonctionner', 'Uniquement pour préserver les phares'],
    correctAnswer: 0,
    explanationAr: 'أكثر من 60% من وفيات الفيضانات تحدث لأشخاص حاولوا قيادة سياراتهم في مياه السيول (Turn Around, Don\'t Drown).',
    explanationFr: 'Plus de 60 % des décès lors des crues surviennent dans des véhicules tentant de franchir des passages submergés.'
  }
];
