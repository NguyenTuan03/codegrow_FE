import { Edge, Node } from "@xyflow/react";
type CustomNodeData = {
  label: string;
};
// Nodes for the flowchart
export const FEnodes: Node<Partial<CustomNodeData>>[] = [
  // Internet Node (Central Node)
  {
    id: "internet",
    position: { x: 320, y: -300 },
    data: { label: "Internet" },
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  // Internet-related subnodes
  {
    id: "how-internet",
    position: { x: 600, y: -550 },
    data: { label: "How does the internet work?" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "http",
    position: { x: 600, y: -500 },
    data: { label: "What is HTTP?" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "domain",
    position: { x: 600, y: -450 },
    data: { label: "What is Domain Name?" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "hosting",
    position: { x: 600, y: -400 },
    data: { label: "What is hosting?" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "dns",
    position: { x: 600, y: -350 },
    data: { label: "DNS and how it works?" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "browser",
    position: { x: 600, y: -300 },
    data: { label: "Browsers and how they work?" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  // HTML Node and its subnodes
  {
    id: "html",
    position: { x: 100, y: -100 },
    data: { label: "HTML" },    
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  {
    id: "learn-basics-html",
    position: { x: -250, y: -300 },
    data: { label: "Learn the basics" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "semantic-html",
    position: { x: -250, y: -250 },
    data: { label: "Writing Semantic HTML" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "forms-validation",
    position: { x: -250, y: -200 },
    data: { label: "Forms and Validations" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "accessibility",
    position: { x: -250, y: -150 },
    data: { label: "Accessibility" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "seo",
    position: { x: -250, y: -100 },
    data: { label: "SEO Basics" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  // CSS Node and its subnodes
  {
    id: "css",
    position: { x: 320, y: 0 },
    data: { label: "CSS" },    
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  {
    id: "learn-basics-css",
    position: { x: 600, y: -100 },
    data: { label: "Learn the basics" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "layouts",
    position: { x: 600, y: -150 },
    data: { label: "Making Layouts" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "responsive",
    position: { x: 600, y: -200 },
    data: { label: "Responsive Design" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  // JavaScript Node and its subnodes
  {
    id: "javascript",
    position: { x: 320, y: 100 },
    data: { label: "JavaScript" },
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  {
    id: "learn-basics-js",
    position: { x: 100, y: 200 },
    data: { label: "Learn the Basics" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "dom",
    position: { x: 100, y: 250 },
    data: { label: "Learn DOM Manipulation" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "fetch-ajax",
    position: { x: 100, y: 300 },
    data: { label: "Fetch API / Ajax (XHR)" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  // Version Control Systems Node and its subnodes
  {
    id: "vcs",
    position: { x: 320, y: 200 },
    data: { label: "Version Control Systems" },
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  {
    id: "github",
    position: { x: 600, y: 150 },
    data: { label: "GitHub" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },  
  // VCS Hosting Node
  {
    id: "vcs-hosting",
    position: { x: 320, y: 300 },
    data: { label: "VCS Hosting" },
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  {
    id: "javascript",
    position: { x: 320, y: 100 },
    data: { label: "JavaScript" },
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  // JavaScript subnodes (already exists, included for reference)
  {
    id: "learn-basics-js",
    position: { x: 50, y: 100 },
    data: { label: "Learn the Basics" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "dom",
    position: { x: 50, y: 150 },
    data: { label: "Learn DOM Manipulation" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "fetch-ajax",
    position: { x: 50, y: 50 },
    data: { label: "Fetch API / Ajax (XHR)" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  // Version Control Systems node (already exists, included for reference)
  {
    id: "vcs",
    position: { x: 320, y: 200 },
    data: { label: "Version Control Systems" },
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },  
  // Add Package Managers node and its subnodes
  {
    id: "package-managers",
    position: { x: 320, y: 300 },
    data: { label: "Package Managers" },
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  {
    id: "npm",
    position: { x: 800, y: 250 },
    data: { label: "npm" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "pnpm",
    position: { x: 800, y: 300 },
    data: { label: "pnpm" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "yarn",
    position: { x: 800, y: 350 },
    data: { label: "yarn" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  // Add Pick a Framework node and its subnodes
  {
    id: "framework",
    position: { x: 320, y: 400 },
    data: { label: "Pick a Framework" },
    type: 'custom'
    // style: {
    //   background: "#fff14c",
    //   padding: 10,
    //   borderRadius: 12,
    //   border: "2px solid #000",
    //   fontWeight: "bold",
    //   boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
    //   textAlign: "center",
    //   width: 180,
    // },
  },
  {
    id: "react",
    position: { x: 600, y: 450 },
    data: { label: "React" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "vue",
    position: { x: 600, y: 500 },
    data: { label: "Vue.js" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "angular",
    position: { x: 600, y: 550 },
    data: { label: "Angular" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "svelte",
    position: { x: 600, y: 600 },
    data: { label: "Svelte" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "solidjs",
    position: { x: 600, y: 650 },
    data: { label: "Solid JS" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "qwik",
    position: { x: 600, y: 700 },
    data: { label: "Qwik" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  // Add CSS-related nodes
  {
    id: "writing-css",
    position: { x: 100, y: 400 },
    data: { label: "Writing CSS" },
    
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  {
    id: "tailwind",
    position: { x: -200, y: 400 },
    data: { label: "Tailwind" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "css-architecture",
    position: { x: 100, y: 500 },
    data: { label: "CSS Architecture" },
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  {
    id: "bem",
    position: { x: -200, y: 500 },
    data: { label: "BEM" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "css-preprocessors",
    position: { x: 100, y: 600 },
    data: { label: "CSS Preprocessors" },
    style: {
      background: "#fff14c",
      padding: 10,
      borderRadius: 12,
      border: "2px solid #000",
      fontWeight: "bold",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: 180,
    },
  },
  {
    id: "sass",
    position: { x: 300, y: 600 },
    data: { label: "Sass" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
  {
    id: "postcss",
    position: { x: 300, y: 650 },
    data: { label: "PostCSS" },
    style: {
      background: "#ffe09b",
      border: "2px solid #000",
      borderRadius: 12,
      padding: 10,
      width: 220,
      textAlign: "center",
    },
  },
];

// Edges for the flowchart
export const FEedges: Edge[] = [
  // Internet to subnodes
  {
    id: "e-internet-how-internet",
    source: "internet",
    target: "how-internet",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-internet-http",
    source: "internet",
    target: "http",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-internet-domain",
    source: "internet",
    target: "domain",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-internet-hosting",
    source: "internet",
    target: "hosting",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-internet-dns",
    source: "internet",
    target: "dns",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-internet-browser",
    source: "internet",
    target: "browser",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // Internet to HTML
  {
    id: "e-internet-html",
    source: "internet",
    target: "html",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",      
      strokeWidth: 2,
    },
  },
  // HTML to subnodes
  {
    id: "e-html-learn-basics-html",
    source: "html",
    target: "learn-basics-html",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-html-semantic-html",
    source: "html",
    target: "semantic-html",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-html-forms-validation",
    source: "html",
    target: "forms-validation",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-html-accessibility",
    source: "html",
    target: "accessibility",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-html-seo",
    source: "html",
    target: "seo",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // HTML to CSS
  {
    id: "e-html-css",
    source: "html",
    target: "css",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",      
      strokeWidth: 2,
    },
  },
  // CSS to subnodes
  {
    id: "e-css-learn-basics-css",
    source: "css",
    target: "learn-basics-css",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-css-layouts",
    source: "css",
    target: "layouts",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-css-responsive",
    source: "css",
    target: "responsive",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // CSS to JavaScript
  {
    id: "e-css-javascript",
    source: "css",
    target: "javascript",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",      
      strokeWidth: 2,
    },
  },
  // JavaScript to subnodes
  {
    id: "e-javascript-learn-basics-js",
    source: "javascript",
    target: "learn-basics-js",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-javascript-dom",
    source: "javascript",
    target: "dom",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-javascript-fetch-ajax",
    source: "javascript",
    target: "fetch-ajax",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // JavaScript to VCS
  {
    id: "e-javascript-vcs",
    source: "javascript",
    target: "vcs",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",      
      strokeWidth: 2,
    },
  },
  // VCS to subnodes
  {
    id: "e-vcs-github",
    source: "vcs",
    target: "github",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-vcs-gitlab",
    source: "vcs",
    target: "gitlab",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-vcs-bitbucket",
    source: "vcs",
    target: "bitbucket",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // VCS to VCS Hosting
  {
    id: "e-vcs-vcs-hosting",
    source: "vcs",
    target: "vcs-hosting",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      
      strokeWidth: 2,
    },
  },
  {
    id: "e-javascript-learn-basics-js2",
    source: "javascript",
    target: "learn-basics-js",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-javascript-dom2",
    source: "javascript",
    target: "dom",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-javascript-fetch-ajax2",
    source: "javascript",
    target: "fetch-ajax",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // JavaScript to VCS (already exists, included for reference)
  {
    id: "e-javascript-vcs2",
    source: "javascript",
    target: "vcs",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // VCS to Package Managers
  {
    id: "e-vcs-package-managers",
    source: "vcs",
    target: "package-managers",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // Package Managers to subnodes
  {
    id: "e-package-managers-npm",
    source: "package-managers",
    target: "npm",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-package-managers-pnpm",
    source: "package-managers",
    target: "pnpm",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-package-managers-yarn",
    source: "package-managers",
    target: "yarn",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // Package Managers to Pick a Framework
  {
    id: "e-package-managers-framework",
    source: "package-managers",
    target: "framework",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",      
      strokeWidth: 2,
    },
  },
  // Pick a Framework to subnodes
  {
    id: "e-framework-react",
    source: "framework",
    target: "react",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-framework-vue",
    source: "framework",
    target: "vue",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-framework-angular",
    source: "framework",
    target: "angular",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-framework-svelte",
    source: "framework",
    target: "svelte",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-framework-solidjs",
    source: "framework",
    target: "solidjs",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-framework-qwik",
    source: "framework",
    target: "qwik",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // JavaScript to Writing CSS
  {
    id: "e-javascript-writing-css",
    source: "framework",
    target: "writing-css",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeWidth: 2,
    },
  },
  // Writing CSS to Tailwind
  {
    id: "e-writing-css-tailwind",
    source: "writing-css",
    target: "tailwind",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // Writing CSS to CSS Architecture
  {
    id: "e-writing-css-css-architecture",
    source: "writing-css",
    target: "css-architecture",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",      
      strokeWidth: 2,
    },
  },
  // CSS Architecture to BEM
  {
    id: "e-css-architecture-bem",
    source: "css-architecture",
    target: "bem",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  // CSS Architecture to CSS Preprocessors
  {
    id: "e-css-architecture-css-preprocessors",
    source: "css-architecture",
    target: "css-preprocessors",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",      
      strokeWidth: 2,
    },
  },
  // CSS Preprocessors to subnodes
  {
    id: "e-css-preprocessors-sass",
    source: "css-preprocessors",
    target: "sass",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
  {
    id: "e-css-preprocessors-postcss",
    source: "css-preprocessors",
    target: "postcss",
    type: "smoothstep",
    style: {
      stroke: "#2e90fa",
      strokeDasharray: "6",
      strokeWidth: 2,
    },
  },
];