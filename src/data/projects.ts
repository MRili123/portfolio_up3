export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  frameworks: string[];
  tools: string[];
  videoUrl?: string;
  imageUrl?: string;
  images?: string[];
  link?: string;
  demoUrl?: string;
  sourceCodeUrl?: string;
  classDiagramUrl?: string;
  reportUrl?: string;
  category: string;
  features?: string[];
  role?: string;
  duration?: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'AI Chatbot Platform',
    description: 'Advanced conversational AI platform with natural language understanding',
    detailedDescription: 'A comprehensive AI chatbot solution that leverages state-of-the-art NLP models to provide human-like conversations. The platform supports multiple channels including web, mobile, and social media integrations.',
    technologies: ['Python', 'TypeScript', 'TensorFlow', 'NLTK'],
    frameworks: ['FastAPI', 'React', 'Node.js'],
    tools: ['Docker', 'Kubernetes', 'GitHub Actions'],
    category: 'AI/ML',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    demoUrl: 'https://demo.aichatbot.com',
    sourceCodeUrl: 'https://github.com/username/ai-chatbot',
    classDiagramUrl: 'https://example.com/diagrams/chatbot-uml.png',
    reportUrl: 'https://example.com/reports/chatbot-report.pdf',
    features: [
      'Natural language understanding with 95% accuracy',
      'Multi-channel support (Web, Mobile, Social Media)',
      'Real-time sentiment analysis',
      'Comprehensive conversation history',
      'Interactive admin dashboard with analytics',
      'Customizable response templates',
      'Multi-language support'
    ],
    role: 'Full Stack Developer / Team Lead',
    duration: '6 months (2023)',
  },
  {
    id: 2,
    title: 'E-commerce Analytics Dashboard',
    description: 'Real-time analytics and insights for e-commerce businesses',
    detailedDescription: 'A powerful analytics dashboard that provides e-commerce businesses with real-time insights into sales performance, customer behavior, and inventory management. Features advanced data visualization and predictive analytics.',
    technologies: ['TypeScript', 'Node.js', 'MongoDB', 'Redis'],
    frameworks: ['React', 'Express.js', 'Redux'],
    tools: ['Docker', 'AWS', 'Stripe API', 'Google Analytics'],
    category: 'Web Development',
    imageUrl: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    demoUrl: 'https://demo.ecommercedash.com',
    sourceCodeUrl: 'https://github.com/username/ecommerce-dashboard',
    reportUrl: 'https://example.com/reports/ecommerce-dashboard-report.pdf',
    features: [
      'Real-time sales analytics and reporting',
      'Customer segmentation and behavior analysis',
      'Inventory and supply chain management',
      'Automated sales forecasting',
      'Custom report generation',
      'Multi-store management',
      'API integration with major e-commerce platforms'
    ],
    role: 'Frontend Lead Developer',
    duration: '5 months (2023)',
  },
  {
    id: 3,
    title: 'Health & Fitness Tracker',
    description: 'Comprehensive health and fitness tracking application',
    detailedDescription: 'A cross-platform mobile application that helps users track their fitness journey, including workouts, nutrition, and health metrics. The app includes AI-powered recommendations and integrates with wearable devices.',
    technologies: ['TypeScript', 'React Native', 'Firebase', 'GraphQL'],
    frameworks: ['Expo', 'Redux', 'Apollo Client'],
    tools: ['Firebase Auth', 'Firestore', 'Google Fit API', 'Apple HealthKit'],
    category: 'Mobile Development',
    imageUrl: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3768914/pexels-photo-3768914.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    demoUrl: 'https://demo.fitnesstracker.app',
    sourceCodeUrl: 'https://github.com/username/fitness-tracker',
    features: [
      'Comprehensive workout tracking and planning',
      'Nutrition and meal planning with barcode scanning',
      'Health metrics and progress visualization',
      'Social features and challenges',
      'Wearable device integration',
      'Personalized workout and nutrition recommendations',
      'Offline functionality'
    ],
    role: 'Mobile Developer',
    duration: '7 months (2022-2023)',
  },
  {
    id: 4,
    title: 'Smart Home Automation System',
    description: 'IoT platform for home automation and energy management',
    detailedDescription: 'An advanced IoT platform that enables users to control and automate their smart home devices with features like energy monitoring, security, and voice control integration.',
    technologies: ['Python', 'JavaScript', 'MQTT', 'REST APIs'],
    frameworks: ['React', 'Django', 'Django REST Framework'],
    tools: ['Raspberry Pi', 'Docker', 'AWS IoT Core', 'Home Assistant'],
    category: 'IoT',
    imageUrl: 'https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    demoUrl: 'https://demo.smarthome.io',
    sourceCodeUrl: 'https://github.com/username/smart-home-automation',
    classDiagramUrl: 'https://example.com/diagrams/smarthome-uml.png',
    features: [
      'Centralized device control and automation',
      'Real-time energy monitoring and optimization',
      'Voice control (Alexa, Google Assistant, Siri)',
      'Security and surveillance integration',
      'Energy usage analytics and reporting',
      'Custom automation rules and schedules',
      'Multi-user access control'
    ],
    role: 'Full Stack Developer',
    duration: '8 months (2022)',
  },
  {
    id: 5,
    title: 'Blockchain-Based Voting System',
    description: 'Secure and transparent decentralized voting platform',
    detailedDescription: 'A blockchain-based voting system that ensures security, transparency, and immutability of votes. The platform uses smart contracts to manage the voting process and provides a verifiable audit trail.',
    technologies: ['Solidity', 'JavaScript', 'Web3.js', 'IPFS'],
    frameworks: ['React', 'Truffle', 'Ganache', 'Hardhat'],
    tools: ['MetaMask', 'Infura', 'Ethereum', 'Polygon'],
    category: 'Blockchain',
    imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    demoUrl: 'https://demo.blockvote.xyz',
    sourceCodeUrl: 'https://github.com/username/blockchain-voting',
    reportUrl: 'https://example.com/reports/blockchain-voting-report.pdf',
    features: [
      'End-to-end verifiable voting',
      'Smart contract-based vote counting',
      'Multi-factor voter authentication',
      'Real-time results and analytics',
      'Immutable vote records on blockchain',
      'Anonymous yet verifiable voting',
      'Multi-language support'
    ],
    role: 'Blockchain Developer',
    duration: '6 months (2022)',
  },
  {
    id: 6,
    title: 'AI-Powered Recommendation Engine',
    description: 'Personalized content recommendation system using machine learning',
    detailedDescription: 'A sophisticated recommendation engine that leverages machine learning algorithms to deliver personalized content suggestions, improving user engagement and content discovery.',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Pandas'],
    frameworks: ['Flask', 'Scikit-learn', 'NumPy', 'FastAPI'],
    tools: ['Docker', 'Kubernetes', 'Redis', 'Apache Kafka'],
    category: 'AI/ML',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1174932/pexels-photo-1174932.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3183156/pexels-photo-3183156.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    demoUrl: 'https://demo.recommendation-engine.ai',
    sourceCodeUrl: 'https://github.com/username/recommendation-engine',
    classDiagramUrl: 'https://example.com/diagrams/recommendation-uml.png',
    reportUrl: 'https://example.com/reports/recommendation-engine-report.pdf',
    features: [
      'Personalized content recommendations',
      'Real-time processing of user interactions',
      'A/B testing framework for algorithms',
      'User behavior analysis and modeling',
      'Scalable microservices architecture',
      'Multi-tenant support',
      'Automated model training and deployment'
    ],
    role: 'Machine Learning Engineer',
    duration: '7 months (2021-2022)',
  },
];
