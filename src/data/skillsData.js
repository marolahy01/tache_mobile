import { 
  SiReact, SiPython, SiFastapi, SiMongodb, SiNodedotjs, 
  SiPostgresql, SiGit, SiSpringboot, 
   SiTypescript, SiDocker, SiTailwindcss,
  SiApachespark, SiKubernetes,SiRedis, SiElasticsearch,
  SiCplusplus, SiC, SiMysql, SiFirebase, SiNextdotjs,
  SiAngular, SiVuedotjs, SiFlutter,  SiDjango,
  SiPhp, SiLaravel, SiAmazonwebservices, SiGooglecloud, SiGitlab, 
  SiGithub, SiJenkins, SiAndroid, SiIos, SiLinux,
  SiJira, SiTrello, SiFigma, SiCanva, SiNotion, SiUbuntu, SiIntellijidea, 
  SiJupyter, SiBootstrap, SiR, SiTensorflow, SiAndroidstudio, SiVscodium,
  SiApachenetbeanside, SiEclipseide, SiPycharm, 
  SiGoogledocs, SiGooglesheets, SiGoogleslides, SiLibreoffice
} from 'react-icons/si';
import { 
  FiCpu, FiLayers, FiBookOpen, FiActivity, FiTrendingUp, 
  FiZap, FiCode,  FiTool, FiUsers,
  FiRefreshCw, FiLayout, FiBox, FiFileText
} from 'react-icons/fi';
import { DiJava } from 'react-icons/di';
import { 
  BsKanban, BsDiagram3, BsVectorPen, BsGlobe, BsWindows,
  BsFileEarmarkWord, BsFileEarmarkSpreadsheet, BsFileEarmarkSlides
} from 'react-icons/bs';

export const categoriesData = {
  frontend: {
    name: "Frontend",
    icon: SiReact,
    color: "#61DAFB",
    gradient: "linear-gradient(135deg, #61DAFB 0%, #21A1C4 100%)",
    elements: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    ]
  },
  
  backend: {
    name: "Backend",
    icon: SiNodedotjs,
    color: "#68A063",
    gradient: "linear-gradient(135deg, #68A063 0%, #3C873A 100%)",
    elements: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: DiJava, color: "#007396" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "Node.js", icon: SiNodedotjs, color: "#68A063" },
      { name: "Django", icon: SiDjango, color: "#092E20" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" }
    ]
  },

  programming: {
    name: "Programming",
    icon: SiCplusplus,
    color: "#659AD2",
    gradient: "linear-gradient(135deg, #659AD2 0%, #044F88 100%)",
    elements: [
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "C#", icon: FiCode, color: "#239120" },
      { name: "R", icon: SiR, color: "#276DC3" }
    ]
  },

  database: {
    name: "Database",
    icon: SiMongodb,
    color: "#4DB33D",
    gradient: "linear-gradient(135deg, #4DB33D 0%, #3F9A2F 100%)",
    elements: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Elasticsearch", icon: SiElasticsearch, color: "#005571" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "SQL", icon: FiBox, color: "#CC2927" }
    ]
  },

  mobile: {
    name: "Mobile",
    icon: SiFlutter,
    color: "#54C5F8",
    gradient: "linear-gradient(135deg, #54C5F8 0%, #027DFD 100%)",
    elements: [
      { name: "React Native", icon: SiReact, color: "#61DAFB" },
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Android", icon: SiAndroid, color: "#3DDC84" },
      { name: "iOS", icon: SiIos, color: "#000000" }
    ]
  },

  devops: {
    name: "DevOps & Cloud",
    icon: SiDocker,
    color: "#2496ED",
    gradient: "linear-gradient(135deg, #2496ED 0%, #0B76D7 100%)",
    elements: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#181717" },
      { name: "GitLab", icon: SiGitlab, color: "#FCA121" },
      { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
      { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
      { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" }
    ]
  },

  systems: {
    name: "Systems",
    icon: SiLinux,
    color: "#FCC624",
    gradient: "linear-gradient(135deg, #FCC624 0%, #E89C0C 100%)",
    elements: [
      { name: "Ubuntu/Linux", icon: SiUbuntu, color: "#E95420" },
      { name: "Windows", icon: BsWindows, color: "#0078D6" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" }
    ]
  },

  ai: {
    name: "AI & Data Science",
    icon: FiCpu,
    color: "#FF6B6B",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #EE5A52 100%)",
    elements: [
      { name: "Machine Learning", icon: FiCpu, color: "#FF6B6B" },
      { name: "Deep Learning", icon: FiLayers, color: "#4ECDC4" },
      { name: "NLP", icon: FiBookOpen, color: "#95E1D3" },
      { name: "Computer Vision", icon: FiActivity, color: "#F38181" },
      { name: "Data Analysis", icon: FiTrendingUp, color: "#AA96DA" },
      { name: "Big Data", icon: SiApachespark, color: "#E25A1C" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" }
    ]
  },

  math: {
    name: "Mathematics",
    icon: FiActivity,
    color: "#A78BFA",
    gradient: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)",
    elements: [
      { name: "Statistics", icon: FiTrendingUp, color: "#10B981" },
      { name: "Algebra", icon: FiActivity, color: "#3B82F6" },
      { name: "Calculus", icon: FiLayers, color: "#8B5CF6" },
      { name: "Optimization", icon: FiZap, color: "#F59E0B" },
      { name: "Logic", icon: FiCpu, color: "#EF4444" }
    ]
  },

  methodologies: {
    name: "Methodologies",
    icon: FiRefreshCw,
    color: "#34D399",
    gradient: "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
    elements: [
      { name: "Agile", icon: FiRefreshCw, color: "#10B981" },
      { name: "Scrum", icon: FiUsers, color: "#3B82F6" },
      { name: "Kanban", icon: BsKanban, color: "#F59E0B" },
      { name: "XP", icon: FiCode, color: "#8B5CF6" }
    ]
  },

  design: {
    name: "Design & Modeling",
    icon: BsDiagram3,
    color: "#F472B6",
    gradient: "linear-gradient(135deg, #F472B6 0%, #EC4899 100%)",
    elements: [
      { name: "Merise", icon: BsDiagram3, color: "#EC4899" },
      { name: "UML", icon: BsDiagram3, color: "#06B6D4" },
      { name: "Design Patterns", icon: FiLayout, color: "#F97316" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Canva", icon: SiCanva, color: "#00C4CC" },
      { name: "Adobe XD", icon: BsVectorPen, color: "#FF61F6" }
    ]
  },

  tools: {
    name: "Development Tools",
    icon: FiTool,
    color: "#60A5FA",
    gradient: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
    elements: [
      { name: "VS Code", icon: SiVscodium, color: "#007ACC" },
      { name: "IntelliJ IDEA", icon: SiIntellijidea, color: "#000000" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84" },
      { name: "NetBeans", icon: SiApachenetbeanside, color: "#1B6AC6" },
      { name: "Eclipse", icon: SiEclipseide, color: "#2C2255" },
      { name: "PyCharm", icon: SiPycharm, color: "#000000" },
      { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
    ]
  },

  management: {
    name: "Project Management",
    icon: SiJira,
    color: "#0052CC",
    gradient: "linear-gradient(135deg, #0052CC 0%, #0747A6 100%)",
    elements: [
      { name: "Jira", icon: SiJira, color: "#0052CC" },
      { name: "Trello", icon: SiTrello, color: "#0079BF" },
      { name: "Notion", icon: SiNotion, color: "#000000" }
    ]
  },

  languages: {
    name: "Languages",
    icon: BsGlobe,
    color: "#60A5FA",
    gradient: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
    elements: [
      { name: "French", icon: BsGlobe, color: "#0055A4", flag: "🇫🇷" },
      { name: "Malagasy", icon: BsGlobe, color: "#FC3D32", flag: "🇲🇬" },
      { name: "English", icon: BsGlobe, color: "#012169", flag: "🇬🇧" }
    ]
  },

  office: {
    name: "Office Suite",
    icon: FiFileText,
    color: "#EA580C",
    gradient: "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)",
    elements: [
      { name: "MS Word", icon: BsFileEarmarkWord, color: "#2B579A" },
      { name: "MS Excel", icon: BsFileEarmarkSpreadsheet, color: "#217346" },
      { name: "MS PowerPoint", icon: BsFileEarmarkSlides, color: "#D24726" },
      { name: "Google Docs", icon: SiGoogledocs, color: "#4285F4" },
      { name: "Google Sheets", icon: SiGooglesheets, color: "#34A853" },
      { name: "Google Slides", icon: SiGoogleslides, color: "#FBBC04" },
      { name: "LibreOffice", icon: SiLibreoffice, color: "#18A303" }
    ]
  }
};

export default categoriesData;