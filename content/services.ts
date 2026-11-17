import type { Locale } from '@/i18n/routing';

export type ServiceCopy = {
  name: string;
  description: string;
  points: [string, string, string];
};

export type Service = {
  slug: string;
  imageId: string;
  image: string;
  copy: Record<Locale, ServiceCopy>;
};

const image = (id: string) => `/images/${id}.jpg`;

export const heroImage = image('photo-1522071820081-009f0129c71c');

export const services: Service[] = [
  {
    slug: 'developpement-web',
    imageId: 'photo-1498050108023-c5249f4df085',
    image: image('photo-1498050108023-c5249f4df085'),
    copy: {
      fr: {
        name: 'Développement web',
        description:
          'Sites vitrines, boutiques en ligne et plateformes sur mesure, rapides, sécurisés et pensés pour convertir.',
        points: [
          'Sites vitrines et e-commerce',
          'Plateformes et applications web',
          'Performance et référencement',
        ],
      },
      ar: {
        name: 'تطوير مواقع الويب',
        description:
          'مواقع تعريفية ومتاجر إلكترونية ومنصات حسب الطلب، سريعة وآمنة ومصمَّمة لتحقيق النتائج.',
        points: [
          'مواقع تعريفية ومتاجر إلكترونية',
          'منصات وتطبيقات ويب',
          'الأداء وتحسين الظهور في محركات البحث',
        ],
      },
      en: {
        name: 'Web development',
        description:
          'Showcase sites, online stores and custom platforms that are fast, secure and built to convert.',
        points: ['Showcase sites and e-commerce', 'Web platforms and apps', 'Performance and SEO'],
      },
    },
  },
  {
    slug: 'applications-mobiles',
    imageId: 'photo-1512941937669-90a1b58e7e9c',
    image: image('photo-1512941937669-90a1b58e7e9c'),
    copy: {
      fr: {
        name: 'Applications mobiles',
        description:
          'Des applications Android et iOS fluides, avec une interface claire et une base technique solide.',
        points: ['Android et iOS', 'Interfaces simples à utiliser', 'Maintenance et évolutions'],
      },
      ar: {
        name: 'تطبيقات الهاتف',
        description: 'تطبيقات أندرويد وiOS سلسة بواجهة واضحة وأساس تقني متين.',
        points: ['أندرويد وiOS', 'واجهات سهلة الاستخدام', 'صيانة وتطوير مستمر'],
      },
      en: {
        name: 'Mobile apps',
        description:
          'Smooth Android and iOS apps with a clear interface and a solid technical foundation.',
        points: ['Android and iOS', 'Easy-to-use interfaces', 'Maintenance and updates'],
      },
    },
  },
  {
    slug: 'conseil-informatique',
    imageId: 'photo-1553877522-43269d4ea984',
    image: image('photo-1553877522-43269d4ea984'),
    copy: {
      fr: {
        name: 'Conseil informatique',
        description:
          'Nous analysons vos outils et vos besoins, puis nous vous recommandons les solutions les plus adaptées.',
        points: ['Audit de votre existant', 'Choix des technologies', 'Accompagnement de projet'],
      },
      ar: {
        name: 'الاستشارات المعلوماتية',
        description: 'نحلل أدواتكم واحتياجاتكم ثم نوصي بالحلول الأنسب لمؤسستكم.',
        points: ['تدقيق الوضع الحالي', 'اختيار التقنيات المناسبة', 'مرافقة المشاريع'],
      },
      en: {
        name: 'IT consulting',
        description:
          'We review your tools and needs, then recommend the solutions that fit your business best.',
        points: ['Audit of your current setup', 'Technology choices', 'Project guidance'],
      },
    },
  },
  {
    slug: 'intelligence-artificielle',
    imageId: 'photo-1677442136019-21780ecad995',
    image: image('photo-1677442136019-21780ecad995'),
    copy: {
      fr: {
        name: 'Intelligence artificielle',
        description:
          "Nous intégrons l'IA dans votre activité : assistants, analyse de données et contenus générés.",
        points: ['Assistants et chatbots', 'Analyse et prédiction', 'Intégration à vos outils'],
      },
      ar: {
        name: 'الذكاء الاصطناعي',
        description: 'ندمج الذكاء الاصطناعي في نشاطكم: مساعدات ذكية وتحليل بيانات وتوليد محتوى.',
        points: ['مساعدات وروبوتات محادثة', 'تحليل البيانات والتنبؤ', 'دمجه في أدواتكم'],
      },
      en: {
        name: 'Artificial intelligence',
        description:
          'We bring AI into your business: assistants, data analysis and generated content.',
        points: [
          'Assistants and chatbots',
          'Analysis and prediction',
          'Integration with your tools',
        ],
      },
    },
  },
  {
    slug: 'automation-ia',
    imageId: 'photo-1485827404703-89b55fcc595e',
    image: image('photo-1485827404703-89b55fcc595e'),
    copy: {
      fr: {
        name: 'Automation IA',
        description:
          'Nous automatisons les tâches répétitives pour que votre équipe se concentre sur ce qui compte.',
        points: [
          'Flux de travail automatisés',
          'Réponses et suivis automatiques',
          'Connexion de vos applications',
        ],
      },
      ar: {
        name: 'الأتمتة بالذكاء الاصطناعي',
        description: 'نؤتمت المهام المتكررة ليتفرغ فريقكم لما هو أهم.',
        points: ['سير عمل مؤتمت', 'ردود ومتابعات تلقائية', 'ربط تطبيقاتكم ببعضها'],
      },
      en: {
        name: 'AI automation',
        description: 'We automate repetitive tasks so your team can focus on what matters.',
        points: ['Automated workflows', 'Automatic replies and follow-ups', 'Connecting your apps'],
      },
    },
  },
  {
    slug: 'marketing-digital',
    imageId: 'photo-1460925895917-afdab827c52f',
    image: image('photo-1460925895917-afdab827c52f'),
    copy: {
      fr: {
        name: 'Marketing digital',
        description:
          'Réseaux sociaux, publicité en ligne et référencement pour atteindre les bons clients.',
        points: ['Réseaux sociaux', 'Publicité en ligne', 'Suivi des résultats'],
      },
      ar: {
        name: 'التسويق الرقمي',
        description: 'شبكات التواصل والإعلانات الرقمية وتحسين الظهور للوصول إلى العملاء المناسبين.',
        points: ['شبكات التواصل الاجتماعي', 'الإعلانات الرقمية', 'متابعة النتائج'],
      },
      en: {
        name: 'Digital marketing',
        description:
          'Social media, online advertising and search visibility to reach the right customers.',
        points: ['Social media', 'Online advertising', 'Results tracking'],
      },
    },
  },
  {
    slug: 'design-graphique',
    imageId: 'photo-1561070791-2526d30994b5',
    image: image('photo-1561070791-2526d30994b5'),
    copy: {
      fr: {
        name: 'Design graphique',
        description:
          'Logo, charte graphique, affiches et supports : une image cohérente pour votre marque.',
        points: [
          'Logo et identité visuelle',
          'Affiches et supports imprimés',
          'Visuels pour les réseaux',
        ],
      },
      ar: {
        name: 'التصميم الغرافيكي',
        description: 'شعار وهوية بصرية وملصقات ومطبوعات: صورة متناسقة لعلامتكم.',
        points: ['الشعار والهوية البصرية', 'ملصقات ومطبوعات', 'تصاميم لشبكات التواصل'],
      },
      en: {
        name: 'Graphic design',
        description:
          'Logo, brand guidelines, posters and print: a consistent image for your brand.',
        points: ['Logo and visual identity', 'Posters and print', 'Social media visuals'],
      },
    },
  },
  {
    slug: 'montage-video',
    imageId: 'photo-1574717024653-61fd2cf4d44c',
    image: image('photo-1574717024653-61fd2cf4d44c'),
    copy: {
      fr: {
        name: 'Montage vidéo',
        description:
          "Vidéos publicitaires, reels et présentations montés avec soin pour retenir l'attention.",
        points: ['Publicités et reels', 'Vidéos de présentation', 'Sous-titres et motion design'],
      },
      ar: {
        name: 'المونتاج',
        description: 'فيديوهات إعلانية وريلز وعروض تقديمية بمونتاج متقن يشدّ الانتباه.',
        points: ['إعلانات وريلز', 'فيديوهات تعريفية', 'ترجمة وموشن غرافيك'],
      },
      en: {
        name: 'Video editing',
        description: 'Ads, reels and presentation videos edited with care to hold attention.',
        points: ['Ads and reels', 'Presentation videos', 'Subtitles and motion design'],
      },
    },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceIndex(slug: string) {
  return services.findIndex((service) => service.slug === slug);
}
