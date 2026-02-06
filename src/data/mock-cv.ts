import { CVData, DEFAULT_SETTINGS, DEFAULT_SECTION_ORDER } from "../types/cv";

export const mockCVData: CVData = {
  settings: DEFAULT_SETTINGS,
  sectionOrder: DEFAULT_SECTION_ORDER,
  hiddenSections: [],
  personalInfo: {
    fullName: "NGUYỄN VĂN A (Alex)",
    title: "SENIOR SOFTWARE ENGINEER",
    address: "Hanoi, Vietnam",
    phone: "+84 901 234 567",
    birthDate: "01/01/1995",
    email: "alex.nguyen.dev@example.com",
    github: "https://github.com/alexnguyen-example",
  },
  objective: `
    <p><b>Short-term goal:</b> Aiming to leverage my 5+ years of experience in full-stack development to contribute to innovative projects in a dynamic environment, while further mastering cloud-native architecture.</p>
    <p><b>Long-term goal:</b> Aspiring to become a Solution Architect, designing high-availability systems that serve millions of users and driving technical excellence within the engineering team.</p>
  `,
  education: [
    {
      school: "Hanoi University of Science and Technology",
      major: "Computer Science",
      duration: "2013 - 2018",
      description:
        "Graduated with honors. Specialized in Software Engineering and Distributed Systems.",
    },
    {
      school: "Tech Institute of Excellence",
      major: "Post-Graduate Diploma in AI & Machine Learning",
      duration: "2019 - 2020",
      description: "Focused on Practical Deep Learning and Data Engineering.",
    },
  ],
  skills: `
    <p><b>Technical Skills:</b> Java (Spring Boot, Hibernate), JavaScript/TypeScript (React, Next.js, Node.js), Python (FastAPI), MySQL, PostgreSQL, MongoDB, Docker, Kubernetes, AWS, Jenkins, Git.</p>
    <p><b>Languages:</b> Vietnamese (Native), English (IELTS 7.5)</p>
    <p><b>Certifications:</b> AWS Certified Solutions Architect, Oracle Certified Professional Java SE Programmer, Professional Scrum Master (PSM I).</p>
    <p><b>Soft skills:</b> Project Management, Team Leadership, Problem-Solving, Strategic Thinking, Technical Mentoring.</p>
  `,
  experience: [
    {
      role: "SENIOR FULLSTACK DEVELOPER",
      company: "TechNova Solutions Corp",
      duration: "06/2021 - Present",
      project: "Enterprise Resource Planning (ERP) System",
      description: `
        <ul>
          <li>Led a team of 5 developers to build a comprehensive ERP solution for international logistics clients.</li>
          <li>Optimized database queries decreasing report generation time by 40%.</li>
          <li>Implemented microservices architecture using Spring Cloud and Docker Swarm.</li>
          <li>Managed CI/CD pipelines using GitLab CI, reducing deployment errors by 25%.</li>
        </ul>
        <p><b>Role:</b> Technical Lead / Senior Developer</p>
        <p><b>Link product:</b> <a href="https://example-technova.com/erp">https://example-technova.com/erp</a></p>
        <p><b>Technologies:</b> React, Spring Boot, PostgreSQL, Redis, Docker.</p>
      `,
    },
    {
      role: "SOFTWARE ENGINEER",
      company: "Global Digital Systems",
      duration: "01/2018 - 05/2021",
      project: "E-commerce Engine",
      description: `
        <ul>
          <li>Developed core features for a high-traffic e-commerce platform including cart management and payment integration.</li>
          <li>Integrated multiple third-party payment gateways (Stripe, PayPal).</li>
          <li>Ensured 99.9% system uptime through proactive monitoring and automated testing.</li>
        </ul>
        <p><b>Technologies:</b> Node.js, Express, MongoDB, Vue.js, AWS S3.</p>
      `,
    },
  ],
  projects: [
    {
      name: "Smart Inventory Tracker",
      description: `
        <p>An IoT-based application for real-time inventory tracking using RFID and mobile notifications.</p>
        <p><b>Duration:</b> 6 months</p>
        <p><b>Link:</b> <a href="https://github.com/alexnguyen-example/smart-tracker">https://github.com/alexnguyen-example/smart-tracker</a></p>
      `,
    },
    {
      name: "AI Personal Finance Assistant",
      description: `
        <p>Developed a mobile-first web app that uses NLP to categorize spending and provide financial advice.</p>
        <p><b>Duration:</b> 4 months</p>
        <p><b>Link:</b> <a href="https://github.com/alexnguyen-example/ai-finance">https://github.com/alexnguyen-example/ai-finance</a></p>
      `,
    },
  ],
  achievements: [
    {
      title: "Employee of the Year - TechNova Solutions",
      date: "12/2023",
    },
    {
      title: "Winner of Regional Code Challenge 2022",
      date: "05/2022",
    },
  ],
  interests: `
    <p><b>Technologies:</b> Open Source contribution, Blockchain research, AI Ethics.</p>
    <p><b>Others:</b> Marathon running, Photography, Playing Chess.</p>
  `,
};
