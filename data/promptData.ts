export interface Prompt {
    id: number;
    category: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
}

//카테고리별 색상 매핑 객체 정의
export const CATEGORY_COLORS: Record<string, string> = {
    "Business & Strategy": "text-amber-400 bg-amber-400/10",
    "Communication & CRM": "text-emerald-400 bg-emerald-400/10",
    "Content & Marketing": "text-indigo-400 bg-indigo-400/10",
    "HR & People Management": "text-pink-400 bg-pink-400/10",
    "Presentation & Education": "text-purple-400 bg-purple-400/10",
    "Technology & Development": "text-cyan-400 bg-cyan-400/10",
    "Work & Reporting": "text-blue-400 bg-blue-400/10"
};

export const PROMPT_DATA: Prompt[] = [
    {
        id: 1,
        category: "Technology & Development",
        title: "System Proposal Generation Tool",
        description: "We prepare proposals for system design and implementation.",
        content: "You are an expert in drafting system proposals. Please prepare a 3-page proposal for the \"Customer Data Management System Implementation\" project. The proposal should include sections on Requirements, Design Overview, and Expected Benefits.",
        tags: ['System Proposal', 'System Design', 'Proposal Development', 'Customer Data Management', 'Requirements', 'Design Overview', 'Expected Outcomes']
    },
    {
        id: 2,
        category: "Technology & Development",
        title: "Data Cleansing Scripting Tool",
        description: "We develop efficient scripts for large-scale data cleansing.",
        content: "You are an expert in writing data cleansing scripts. Please write a Python script for removing and cleaning duplicate data, including sections for data input, processing, and output.",
        tags: ['Data cleansing', 'script development', 'Python', 'data wrangling']
    },
    {
        id: 3,
        category: "Technology & Development",
        title: "Database Design Guide Generator",
        description: "This guide outlines the principles for efficient database structure design.",
        content: "You are a database design expert. Please create a database design guide suitable for a [[Topic: small-scale e-commerce platform]]. Include [[Components: table structure, relationships, and sample queries]].",
        tags: ['Database design', 'e-commerce', 'table structures', 'relationships', 'sample queries']
    },
    {
        id: 4,
        category: "Technology & Development",
        title: "API Design Guide Generator",
        description: "Guidelines for efficient API design.",
        content: "You are an API design expert. Please create a 5-page design guide on the topic of User Authentication API Design. Include endpoints, parameters, and response structures.",
        tags: ['API Design', 'User Authentication', 'Development Guidelines', 'Endpoints', 'Response Structure']
    },
    {
        id: 5,
        category: "Technology & Development",
        title: "Automated API Documentation Generator",
        description: "Automated documentation for API users.",
        content: "You are an API documentation expert. Please create a 3-page API document for the User Authentication API, including endpoint descriptions, request/response examples, and code samples.",
        tags: ['API Documentation', 'Auto-generation', 'Technology', 'Development', 'Technical Writing']
    },
    {
        id: 6,
        category: "Technology & Development",
        title: "Code Review Checklist Generator",
        description: "Creating a useful checklist for code reviews.",
        content: "You are an expert in creating code review checklists. Please generate a 10-item checklist for [[Topic: Frontend Code Review]], ensuring it covers [[Sections: Readability, Performance, and Test Coverage]].",
        tags: ['Code review', 'checklist', 'frontend', 'readability', 'performance']
    },
    {
        id: 7,
        category: "Technology & Development",
        title: "Simple Automated Script Generator",
        description: "We will develop a simple script to automate repetitive tasks.",
        content: "As an expert in automated script development, please create a Python script for [[Topic: Log File Cleanup]]. The script should include [[Components: File Searching, Sorting, and Archiving]].",
        tags: ['Automated scripting', 'Python', 'log file cleanup', 'file searching', 'archiving']
    },
    {
        id: 8,
        category: "Technology & Development",
        title: "Git Commit Message Guidelines",
        description: "Provides a guide for writing clear and consistent Git commit messages.",
        content: "You are an expert in crafting Git commit messages. Please propose five commit message rules for [[Topic: Project Collaboration]], including [[Format: Summary, Detailed Description, Related Issue Number]].",
        tags: ['Git', 'commit messages', 'collaboration', 'development']
    },
    {
        id: 9,
        category: "Technology & Development",
        title: "CI/CD Pipeline Design Tool",
        description: "We assist in designing CI/CD pipelines for continuous integration and deployment.",
        content: "As a CI/CD design expert, please design a CI/CD pipeline based on GitHub Actions for the [[Topic: Web Application Deployment]]. The design should include [[Components: Build, Test, and Deploy stages]].",
        tags: ['CI/CD', 'GitHub Actions', 'web application deployment', 'build', 'test', 'deploy']
    },
    {
        id: 10,
        category: "Technology & Development",
        title: "Test Case Generator",
        description: "Develop effective software test cases.",
        content: "You are an expert in test case writing. Please create five test cases for the [[Topic: User Login Functionality]]. Include [[Components: Test Scenario, Expected Result, Execution Steps]].",
        tags: ['Test cases', 'software testing', 'user login', 'test scenarios', 'expected results']
    },
    {
        id: 11,
        category: "Technology & Development",
        title: "Error Log Analysis Generator",
        description: "This guide details how to analyze error logs and propose solutions.",
        content: "You are an expert in analyzing error logs. Please prepare a two-page analysis guide on the topic of server response delay issues. Include sections on: causes of the problem, analysis tools, and solutions.",
        tags: ['Error log analysis', 'server response latency', 'analysis guidance', 'troubleshooting', 'development']
    },
    {
        id: 12,
        category: "Technology & Development",
        title: "System architecture design tool",
        description: "Developing architectural design guidelines for large-scale systems.",
        content: "As an expert in system architecture design, please create a three-page architecture design document for a distributed data processing system. This design should include component diagrams, data flow descriptions, and considerations for scalability.",
        tags: ['System architecture', 'design tools', 'distributed data processing', 'component diagrams', 'scalability']
    },
    {
        id: 13,
        category: "Technology & Development",
        title: "DevOps Strategy Planner",
        description: "Develop a strategic plan for effective DevOps implementation.",
        content: "You are an expert in developing DevOps strategy plans. Please create a 5-page strategy plan for [[Topic: Establishing a Cloud-Based Development Environment]]. The plan should include [[Sections: Automation Strategy, Collaboration Tools, and Performance Measurement]].",
        tags: ['DevOps', 'strategic planning', 'cloud-based development', 'automation', 'collaboration']
    },
    {
        id: 14,
        category: "Technology & Development",
        title: "Code Comment Generator",
        description: "Write detailed code comments to enhance readability.",
        content: "You are an expert in writing code comments. Please provide Python comments for [[Topic: Machine Learning Model Training Code]], including [[Structure: function descriptions, inputs and outputs, and exception handling]].",
        tags: ['Code comments', 'Python', 'machine learning', 'function documentation', 'exception handling']
    },
    {
        id: 15,
        category: "Technology & Development",
        title: "SQL Query Optimization Tool",
        description: "This document outlines methods for SQL query optimization to enhance database performance.",
        content: "You are an expert in SQL query optimization. Please optimize the following [[Query: SELECT statement]] for [[Topic: Large-scale data retrieval]], including [[Components: index utilization and join optimization]].",
        tags: ['SQL Optimization', 'Query Tuning', 'Database Performance', 'Indexes', 'Big Data']
    },
    {
        id: 16,
        category: "Technology & Development",
        title: "Code Refactoring Plan Development",
        description: "Develop a refactoring plan to improve existing code.",
        content: "You are a code refactoring expert. Please create a refactoring plan for [[Topic: User Authentication Code]] in [[Language: JavaScript]]. Include [[Structure: Goals, Step-by-step actions, Expected outcomes]].",
        tags: ['Code refactoring', 'JavaScript', 'user authentication', 'development roadmap']
    },
    {
        id: 17,
        category: "Technology & Development",
        title: "Tech Blog Post Creation",
        description: "Creating a blog post to share technical knowledge.",
        content: "You are an expert in writing technical blog posts. Please create a blog post of 1500 words on the topic of \"DevOps and Cloud Technologies.\" Include an outline, key concepts, and real-world examples.",
        tags: ['Tech Blog', 'DevOps', 'Cloud Technologies', 'Development', 'Technical Documentation']
    },
    {
        id: 18,
        category: "Technology & Development",
        title: "Website Navigation Design Tool",
        description: "This tool helps users easily find the information they need within a website by designing its navigation. You can design navigation menus, dropdown menus, and sidebars.",
        content: "As an expert in website navigation design, please design a suitable navigation menu for a [[Topic: Corporate Blog Website]]. Include [[Components: Home, Blog Categories, Popular Posts, Author Pages, Contact, Search Functionality]]. Please specify the menu hierarchy and items to ensure user-friendly navigation.",
        tags: ['Website Navigation', 'User Experience', 'Menu Design', 'Corporate Blog']
    },
    {
        id: 19,
        category: "Presentations & Education",
        title: "Creating PPT Slides",
        description: "Assisting in the design of presentation slides and content creation.",
        content: "You are an expert in creating presentation materials. Please draft a 10-slide PowerPoint presentation on the topic of \"AI Tools for Productivity Enhancement.\" Each slide should include a concise title and a brief sentence summarizing the core content. For example, set slide titles in the format: \"Slide 1 - Introduction: The Necessity of AI Tools.\"",
        tags: ['Presentations', 'PPTs', 'slides', 'presentations', 'AI']
    },
    {
        id: 20,
        category: "Presentations & Education",
        title: "Presentation Script Generator",
        description: "Develop a systematic presenter script to ensure effective communication with the audience.",
        content: "You are an expert presentation scriptwriter. Please create a 10-minute presentation script on the topic of \"AI Technology for Business Applications.\" The script should include an introduction, body, and conclusion. The introduction should clearly state the presentation's purpose, the body should provide specific examples, and the conclusion should emphasize the key message and the takeaway for the audience.",
        tags: ['Presentation scripts', 'AI business strategies', 'presentation coaching', 'speechwriting']
    },
    {
        id: 21,
        category: "Presentations & Education",
        title: "Presentation Time Management Assistant",
        description: "I propose a schedule and allocation plan for managing presentation time.",
        content: "As a specialist in presentation time management, please develop a time allocation plan for each section of a [[15-minute presentation]] on the [[Future of AI Technology]]. Allocate time for each section in a format similar to: Introduction - 2 minutes, Body - 10 minutes, Conclusion - 3 minutes.",
        tags: ['Presentations', 'time management', 'planning', 'training']
    },
    {
        id: 22,
        category: "Presentations & Education",
        title: "Presentation Summary Assistant",
        description: "Summarize the key points of the presentation concisely to ensure easy comprehension for the audience.",
        content: "You are an expert in presentation summarization. Please summarize the presentation \"Success Stories of Business Growth Through AI\" into 300 words. The summary should include the core message and key data, concisely outlining the presentation's main points and crucial takeaways for the audience.",
        tags: ['Presentation Summary: AI Business', 'Key Messages', 'Key Data']
    },
    {
        id: 23,
        category: "Presentations & Education",
        title: "Q&A Preparation Tools",
        description: "This helps you prepare for anticipated questions and craft effective responses following your presentation.",
        content: "You are an expert in preparing for Q&A sessions. Please anticipate six questions regarding the topic \"The Adoption of AI Technology and Ethics\" and provide an answer for each. Include questions such as, \"How can the ethical challenges of AI be addressed?\" and \"What is the impact of AI's application on the future of jobs?\"",
        tags: ['Presentation preparation', 'Q&A', 'anticipated questions', 'response drafting', 'AI ethics']
    },
    {
        id: 24,
        category: "Presentations & Education",
        title: "Presentation Case Study Builder",
        description: "Organize case study materials systematically for presentations to enhance audience persuasiveness.",
        content: "You are an expert in crafting case study materials. Please prepare two case studies on the topic of \"Successful AI Adoption.\" Each case study should include the following sections: Problem Definition, Solution, and Results. For example: \"Case 1: Major Corporation Enhances Productivity by 30% with AI Implementation,\" \"Case 2: Startup Achieves Success Through AI-Powered Automation.\"",
        tags: ['Presentation materials', 'case studies', 'AI adoption', 'persuasion']
    },
    {
        id: 25,
        category: "Presentations & Education",
        title: "Presentation Closing Remarks Suggestions",
        description: "Here are some closing remarks that will leave a strong impression on your audience.",
        content: "AI is revolutionizing our daily lives, and we invite you to be at the forefront of this transformative journey.",
        tags: ['Concluding your presentation', 'public speaking tips', 'AI', 'and audience persuasion.']
    },
    {
        id: 26,
        category: "Presentations & Education",
        title: "Learning Motivation Prompt Generator",
        description: "Here are some motivational phrases to boost learning enthusiasm.",
        content: "As a specialist in learning motivation, please generate five motivational phrases for new employees related to learning digital tools.",
        tags: ['Motivation for Learning', 'New Employees', 'Digital Tools', 'Motivational Phrases', 'Presentation Training']
    },
    {
        id: 27,
        category: "Presentations & Education",
        title: "Expert Technical Summary Tool",
        description: "Concise and clear summaries of specific technologies or topics are provided.",
        content: "You are an expert in summarizing technical topics. Please provide a 300-word summary of the fundamental concepts of cloud computing. The summary should include key terminology and major application cases.",
        tags: ['Presentation', 'Training', 'Summary', 'Technology']
    },
    {
        id: 28,
        category: "Presentations & Education",
        title: "Audience-Specific Presentation Text Generator",
        description: "Craft presentations tailored to specific audiences to capture their attention and enhance persuasiveness.",
        content: "You are an expert in crafting presentation text tailored to specific audiences. Please create presentation content on the topic of \"Cloud Technology Adoption\" for an audience of IT professionals, including \"Technical Details\" and \"Case Studies.\"",
        tags: ['Presentations', 'text generators', 'customization', 'IT professionals', 'cloud technology']
    },
    {
        id: 29,
        category: "Presentations & Education",
        title: "Presentation Intro Video Script Generator",
        description: "Create a video script to visually emphasize the start of the presentation.",
        content: "You are an expert scriptwriter for presentation intro videos. Please create a 30-second intro video script for the topic \"The Future of AI and Human Collaboration,\" including visual effects and narration.",
        tags: ['Presentations', 'introductory videos', 'scriptwriting', 'AI', 'human collaboration']
    },
    {
        id: 30,
        category: "Presentations & Education",
        title: "Scenario-based Presentation Script Generator",
        description: "We will create presentation scripts utilizing specific examples and scenarios.",
        content: "You are an expert scriptwriter specializing in scenario-based presentations. Please write a 10-minute presentation script centered on the topic \"Everyday Examples of How AI Has Changed Our Lives.\" The script should include an introduction of examples, analysis, and a conclusion.",
        tags: ['Presentation script', 'scenario', 'AI', 'education', 'case studies']
    },
    {
        id: 31,
        category: "Presentations & Education",
        title: "Presentation Outline Generator",
        description: "Clearly structure your presentation by creating a systematic table of contents.",
        content: "You are an expert in creating presentation outlines. Please generate a table of contents for an 8-slide presentation on the topic \"Use Cases of AI Tools,\" including section titles and sub-points.",
        tags: ['Presentation materials', 'table of contents generation', 'AI tools', 'presentation structure']
    },
    {
        id: 32,
        category: "Presentations & Education",
        title: "Educational Case Study Generator",
        description: "Develop systematic case studies suitable for use as learning materials.",
        content: "You are an expert in writing educational case studies. Please create a 3-page case study based on the topic \"Cost Reduction Through AI Tools.\" The case study should include sections on \"Situation,\" \"Solution,\" and \"Results.\"",
        tags: ['Educational case studies', 'AI tools', 'cost reduction', 'learning materials']
    },
    {
        id: 33,
        category: "Presentations & Education",
        title: "Audience Survey Question Generator",
        description: "Draft survey questions to gather audience feedback.",
        content: "You are an expert in crafting audience survey questions. Please develop a 7-question survey to assess satisfaction with the AI education workshop. The survey should include questions regarding overall satisfaction and requests for suggestions.",
        tags: ['Surveys', 'question design', 'audience feedback', 'AI education']
    },
    {
        id: 34,
        category: "Presentations & Education",
        title: "Presentation Summary Tool",
        description: "We will summarize the key points of the presentation to enhance understanding.",
        content: "You are an expert in summarizing presentation materials. Please summarize the presentation on [[Topic: AI-Driven Business Cases]] into a [[Length: 1-page]] document. Include [[Structure: Key Messages, Key Data, Conclusion]].",
        tags: ['Presentation Summary', 'AI-Powered Business', 'Key Messages', 'Key Data', 'Conclusion']
    },
    {
        id: 35,
        category: "Presentations & Education",
        title: "Team Project Presentation Script Generator",
        description: "Craft a clear and persuasive script for your team project presentation.",
        content: "You are an expert in crafting team project presentation scripts. Please prepare a 10-minute presentation script on the topic of \"The Development Process of AI Tools,\" including a breakdown of roles and key content.",
        tags: ['Presentation script', 'team project', 'AI tool development', 'presentation training']
    },
    {
        id: 36,
        category: "Presentations & Education",
        title: "Data-Driven Presentation Creator",
        description: "Develop compelling presentations backed by data.",
        content: "You are an expert in creating data-driven presentation materials. Please create a 10-slide presentation on the topic of \"Analyzing the ROI of AI Implementation.\" The presentation should include data visualization and a conclusion.",
        tags: ['Presentation material creation', 'data visualization', 'ROI analysis', 'AI implementation']
    },
    {
        id: 37,
        category: "Presentations & Education",
        title: "Competitive Analysis Presentation Material Creation",
        description: "Prepare a presentation compiling the competitive analysis findings in a structured format.",
        content: "You are an expert in creating competitive analysis presentation materials. Please prepare an 8-slide presentation on the topic of \"Analysis of Competitor AI Solution Features,\" including an examination of strengths and weaknesses, along with comparative data.",
        tags: ['Competitor Analysis', 'Presentation Materials', 'AI Solutions', 'Slide Creation']
    },
    {
        id: 38,
        category: "Presentations & Education",
        title: "Learning Feedback Template",
        description: "Create a template for providing effective feedback tailored to learners.",
        content: "You are an expert in crafting learning feedback. Please create a feedback template for learning new skills. Include sections for praise, areas for improvement, and next learning steps.",
        tags: ['Learning feedback', 'templates', 'new skills', 'training']
    },
    {
        id: 39,
        category: "Business & Strategy",
        title: "Drafting Agreement Generator",
        description: "We draft contracts suitable for a wide range of business scenarios.",
        content: "You are an expert in drafting contracts. Please draft a partnership agreement covering the following sections: purpose of the agreement, terms and conditions, responsibilities, and termination clauses.",
        tags: ['Contract drafting', 'partnership agreements', 'business contracts', 'draft agreements']
    },
    {
        id: 40,
        category: "Business & Strategy",
        title: "Business Negotiation Email Template Generator",
        description: "Craft a professional and persuasive email template for negotiations.",
        content: "Subject: Request for Price Negotiation\n\nDear [Recipient Name],\n\nI hope this email finds you well. We are writing to formally request a negotiation regarding the pricing of [Product/Service Name]. We have been impressed with [mention a positive aspect, e.g., the quality of your offerings, your company's reputation] and are keen to explore a mutually beneficial partnership.\n\nWe would like to propose a revised price of [Your Proposed Price] for [Product/Service Name]. We believe this adjustment would allow us to [explain your benefit, e.g., increase our order volume, finalize the contract within our budget]. We are open to discussing the specifics and finding a solution that works for both our organizations.\n\nPlease let us know your availability for a brief call or meeting to discuss this further at your earliest convenience. We are confident that we can reach an agreement that satisfies both parties. Thank you for your time and consideration.",
        tags: ['Negotiation', 'business emails', 'templates', 'price negotiation', 'email composition']
    },
    {
        id: 41,
        category: "Business & Strategy",
        title: "Investment Proposal Authoring Tool",
        description: "We craft detailed and compelling proposals to secure investment.",
        content: "You are an expert in drafting investment proposals. Please prepare a 5-page investment proposal for the topic of \"Development of AI-Powered Productivity Tools.\" Include market analysis, key features, and projected returns.",
        tags: ['Investment Proposal', 'Business Plan', 'AI Tools', 'Startups', 'Fundraising']
    },
    {
        id: 42,
        category: "Business & Strategy",
        title: "Business Strategy Development Assistant",
        description: "Develop systematic strategies to achieve business objectives.",
        content: "As a business strategy development expert, please create a one-year business strategy for entering a new market. The strategy should include objectives, phased plans, and expected outcomes.",
        tags: ['Business Strategy', 'New Market Entry', 'Strategy Development', 'Goal Setting', 'Execution Plan']
    },
    {
        id: 43,
        category: "Business & Strategy",
        title: "Automated SWOT Analysis Tool",
        description: "Prepare a SWOT analysis for your business or project.",
        content: "You are a SWOT analysis expert. Please provide a SWOT analysis for the [[Topic: AI Tool Launch Strategy]], including [[Components: Strengths, Weaknesses, Opportunities, and Threats]].",
        tags: ['SWOT Analysis', 'AI Tools', 'Business Strategy', 'Automation', 'Project Planning']
    },
    {
        id: 44,
        category: "Business & Strategy",
        title: "Business Card Wording Recommender",
        description: "Here are some recommended business card phrases that highlight professionalism and individuality.",
        content: "As a business card copywriting specialist, please recommend a one-line slogan and business card copy for a Marketing Manager, considering a minimalist design. The copy should include your title, emphasize your expertise, and provide contact information.",
        tags: ['Business Card Wording', 'Marketing Manager', 'Slogan', 'Professionalism', 'Design']
    },
    {
        id: 45,
        category: "Business & Strategy",
        title: "Revenue Model Analysis Tool",
        description: "This document outlines methods for analyzing and optimizing business revenue models.",
        content: "You are an expert in revenue model analysis. Please prepare a 3-page revenue model analysis report on [[Topic: Subscription Services Business]]. The report should include [[Sections: Existing Revenue Models, Improvement Proposals, and Predicted Outcomes]].",
        tags: ['Revenue models', 'subscription services', 'business analytics', 'business strategy']
    },
    {
        id: 46,
        category: "Business & Strategy",
        title: "Customer Segmentation Strategy Tools",
        description: "We precisely define customer segments based on customer data and propose tailored strategies for each segment.",
        content: "As an expert in customer segmentation strategy, please develop five segmentation strategies for the topic of [[E-commerce Platform Customer Segmentation]]. Each strategy should include [[Customer Characteristics]] and [[Tailored Strategies for Each Segment]].",
        tags: ['Customer Segmentation', 'Marketing Strategy', 'Data Analysis', 'E-commerce']
    },
    {
        id: 47,
        category: "Business & Strategy",
        title: "Business Risk Analysis Tool",
        description: "This tool analyzes the risks of specific businesses or projects and proposes mitigation strategies.",
        content: "You are a risk analysis expert. Please analyze five risks associated with [[Topic: Entering New Markets]] and propose mitigation strategies for each. Your analysis should include [[Structure: Risk Assessment, Resolution Strategies, and Expected Outcomes]].",
        tags: ['Risk analysis', 'business strategy', 'countermeasures', 'market entry']
    },
    {
        id: 48,
        category: "Work & Reporting",
        title: "Report Writing Assistant",
        description: "This is a tool that allows for the systematic creation and summarization of business reports.",
        content: "You are an expert report writer. Please prepare a report on the [[Topic: Achievements of AI Technology Adoption]] structured with an [[Outline: Introduction, Body, Conclusion]].",
        tags: ['Report writing', 'business reporting', 'AI technology', 'report structure']
    },
    {
        id: 49,
        category: "Work & Reporting",
        title: "Automated Document Summarizer",
        description: "Concise summaries of lengthy documents quickly convey essential information.",
        content: "You are an expert document summarizer. Please summarize the [[Topic: AI Market Analysis Report]] to a [[Length: 300 words]]. The summary should include [[key data, major trends, and conclusions]].",
        tags: ['Document Summarization', 'AI', 'Market Analysis', 'Reports', 'Executive Summary']
    },
    {
        id: 50,
        category: "Work & Reporting",
        title: "PDF Text Extractor",
        description: "Extract necessary text from PDF documents for analysis and reuse.",
        content: "You are an expert in PDF text extraction. Please extract the text from pages 3-7 of the file [[File Name:2023_Analysis_Report.pdf]] and summarize its key contents.",
        tags: ['PDF text extraction', 'report analysis', 'text repurposing']
    },
    {
        id: 51,
        category: "Work & Reporting",
        title: "Timeblock Schedule Generator",
        description: "Creating a time-blocking schedule to manage your day effectively.",
        content: "You are a time management expert. Please create a time-blocked schedule for your workday, dividing tasks into 30-minute increments between 9:00 AM and 6:00 PM.",
        tags: ['Time Management', 'Schedule', 'Task Management', 'Time Blocking']
    },
    {
        id: 52,
        category: "Work & Reporting",
        title: "Automated To-Do List Generator",
        description: "Create an efficient to-do list to organize your projects and daily tasks.",
        content: "You are a To-Do List Expert. Please create a to-do list of 10 items for the topic \"Team Project Progress,\" specifying the priority level (High, Medium, Low) for each item.",
        tags: ['Task management', 'to-do lists', 'project management', 'report generation', 'automated creation']
    },
    {
        id: 53,
        category: "Work & Reporting",
        title: "Business Trip Preparation Checklist",
        description: "Create a checklist to organize your business trip preparations.",
        content: "You are an expert in business travel preparation. Please create a 15-item checklist for your business trip to Seoul. The checklist should include travel documents, essential personal items, and work-related supplies.",
        tags: ['Business trip', 'checklist', 'work preparation', 'travel documents', 'essential items']
    },
    {
        id: 54,
        category: "Work & Reporting",
        title: "Guide to Writing a Business Process Improvement Proposal",
        description: "Proposal for improving existing business processes.",
        content: "As a specialist in business process improvement, please prepare a proposal focused on the objective of [[Reducing Customer Service Response Times]]. The proposal should include [[Problem Definition, Proposed Solutions, and Expected Outcomes]].",
        tags: ['Business Process Improvement', 'Proposal Development', 'Process Management', 'Customer Service']
    },
    {
        id: 55,
        category: "Work & Reporting",
        title: "AI-Powered Tech Trend Report Summarizer",
        description: "This report offers a concise overview of the latest technology trends, highlighting key information.",
        content: "You are an expert in summarizing technology trends. Please summarize the [[Report: 2023 AI Technology Trends]] within [[Length: 200 words]]. The summary should include [[Key Data, Major Technology Trends]].",
        tags: ['Technical Report', 'AI Trends', 'Summary', 'Key Information']
    },
    {
        id: 56,
        category: "Work & Reporting",
        title: "Team Collaboration Schedule Creator",
        description: "We will clearly outline the team project schedule and assign tasks.",
        content: "Please create a 3-month project timeline for the \"New Product Launch Preparation\" project. The timeline should include key tasks, responsible parties, and deadlines.",
        tags: ['Team collaboration', 'schedule management', 'project management', 'task assignment']
    },
    {
        id: 57,
        category: "Work & Reporting",
        title: "Business Trip Expense Checklist Generator",
        description: "We provide budget management support by preparing an estimated cost breakdown and a packing list for business trips.",
        content: "You are an expert in creating business trip expense checklists. Please generate a checklist of 10 items for a business trip to Tokyo, including categories for travel expenses and essential preparations.",
        tags: ['Business trip', 'checklist', 'expense management', 'work']
    },
    {
        id: 58,
        category: "Work & Reporting",
        title: "Project Timeline Generator",
        description: "A step-by-step timeline for project progression will be created.",
        content: "You are an expert in creating project timelines. Please develop a six-month timeline for the [[Project: Website Renewal]]. Include [[Components: Key Milestones, Objectives, Completion Dates]].",
        tags: ['Project Management', 'Timeline', 'Website Renewal', 'Report']
    },
    {
        id: 59,
        category: "Work & Reporting",
        title: "Annual Goal Setting Assistant",
        description: "We systematically set annual goals and establish strategies for their achievement.",
        content: "As an expert in annual goal setting, please establish the following [[Topic: Enhancing Team Performance]] for the [[Period: 1 Year]] timeframe. Ensure the objective includes [[Components: Specific Goals, Action Plan, Measurement Methods]].",
        tags: ['Task management', 'goal setting', 'performance management', 'annual planning', 'implementation strategies']
    },
    {
        id: 60,
        category: "Work & Reporting",
        title: "Automated To-Do List Generator",
        description: "Create a simple and clear to-do list for projects and daily tasks.",
        content: "As a specialist in creating to-do lists, please generate a 10-item checklist for [[New Product Launch Preparation]]. Include [[Item, Due Date, and Priority]] for each task.",
        tags: ['Task management', 'to-do lists', 'project management', 'automated generation', 'reports']
    },
    {
        id: 61,
        category: "Work & Reporting",
        title: "Excel Function Recommender",
        description: "I recommend appropriate Excel functions for data analysis and processing.",
        content: "You are an expert in recommending Excel functions. Please recommend suitable functions from SUM, VLOOKUP, and IF for organizing sales data and explain the reasons for your choices.",
        tags: ['Excel', 'functions', 'recommendations', 'data analysis', 'work']
    },
    {
        id: 62,
        category: "Work & Reporting",
        title: "Excel Macro Assistant",
        description: "Develop macro code to automate repetitive tasks.",
        content: "As an expert in Excel macro development, please create a macro to automate the process of generating monthly reports. The macro should include functionalities for data import, sorting, and summarization.",
        tags: ['Excel', 'Macros', 'Automation', 'Reports']
    },
    {
        id: 63,
        category: "Work & Reporting",
        title: "AI-Powered Tech Trend Report Summarizer",
        description: "This report summarizes the latest technology trends and highlights key takeaways.",
        content: "You are an expert in summarizing technology trend reports. Please provide a 200-word summary on the topic of \"AI-Powered Business Solutions,\" including key trends and notable examples.",
        tags: ['Technology trends', 'report summaries', 'AI solutions', 'business', 'summary expert']
    },
    {
        id: 64,
        category: "Work & Reporting",
        title: "Market Research Summary Tool",
        description: "This market research report summarizes key insights.",
        content: "As an expert in market research summarization, please provide a one-page summary of the AI market's growth outlook. The summary should include market size, key trends, and opportunities.",
        tags: ['Market research', 'report summarization', 'AI market', 'growth outlook', 'reporting tools']
    },
    {
        id: 65,
        category: "Work & Reporting",
        title: "Business Report Summarizer",
        description: "This is a concise summary of the key points from the business report.",
        content: "You are an expert in summarizing business reports. Please summarize the report on [[Topic: Monthly Sales Performance]] into [[Length: 2 paragraphs]]. The summary should include [[Structure: Key Data, Major Achievements]].",
        tags: ['Business Report', 'Executive Summary', 'Sales Performance', 'Key Data', 'Major Achievements']
    },
    {
        id: 66,
        category: "Work & Reporting",
        title: "Case Study Authoring Tool",
        description: "We systematically develop successful case study materials.",
        content: "You are an expert in creating case study materials. Please develop a case study on the topic of \"Cost Reduction Using AI Tools,\" with a length of four pages, incorporating the sections: Problem, Solution, and Results.",
        tags: ['Case studies', 'report writing', 'AI tools', 'cost reduction', 'task management']
    },
    {
        id: 67,
        category: "Work & Reporting",
        title: "Content Summarization Tool",
        description: "Concise and clear summaries of lengthy content.",
        content: "You are a content summarization expert. Please summarize the \"AI Technology Report\" to one page, including \"key data\" and \"major trends.\"",
        tags: ['Content summarization', 'AI technology', 'report generation', 'key takeaways', 'report management']
    },
    {
        id: 68,
        category: "Communication & CRM",
        title: "Email Drafting Tool",
        description: "This tool helps you write concise and effective business emails.",
        content: "You are an expert in crafting business emails. Please draft an email with the subject line \"Invitation to New Product Launch.\" Include a welcome message, key information, and a link.",
        tags: ['Email writing', 'business correspondence', 'customer relationship management', 'new product launch']
    },
    {
        id: 69,
        category: "Communication & CRM",
        title: "Automated FAQ Generator",
        description: "Automatically generate FAQs for customer support or product explanations.",
        content: "You are an expert in creating FAQs. Please draft 5 FAQs on the topic of [[AI Time Management Tools]]. The questions and answers should be concise and clear.",
        tags: ['FAQ', 'AI', 'Automated Generation', 'Customer Support']
    },
    {
        id: 70,
        category: "Communication & CRM",
        title: "Work Feedback Template Generator",
        description: "We provide a template for systematically documenting feedback on team members or projects.",
        content: "You are an expert in creating work feedback templates. Please draft a feedback template for [[Subject: Project Contribution Evaluation of Team Member A]], including sections for [[Structure: Strengths, Areas for Improvement, and Recommendations]].",
        tags: ['Performance feedback', 'template creation', 'team member evaluation', 'strengths', 'areas for improvement']
    },
    {
        id: 71,
        category: "Communication & CRM",
        title: "Meeting Agenda Creation Tool",
        description: "Prepare an agenda for effective meeting management and organize the necessary discussion points.",
        content: "You are an expert in drafting meeting agendas. Please create an agenda for the [[Subject: Quarterly Performance Review Meeting]], including [[Components: Key discussion points, estimated time, and responsible parties]].",
        tags: ['Meetings', 'Agenda', 'Performance Reviews', 'Client Management', 'Communication']
    },
    {
        id: 72,
        category: "Communication & CRM",
        title: "Multilingual Email Translator",
        description: "We provide seamless multilingual email translation to facilitate communication with a diverse customer base.",
        content: "You are a translation expert. Please translate [[Content: New Product Launch Announcement Email]] into [[Language: English, Japanese]]. The translation should be [[Tone: Polite and Professional]].",
        tags: ['Email translation', 'multilingual support', 'customer communication', 'translation specialist', 'product launch']
    },
    {
        id: 73,
        category: "Communication & CRM",
        title: "English Grammar Corrector",
        description: "Corrects grammatical errors in English sentences and refines them for natural flow.",
        content: "You are an English grammar correction expert. Please review and correct any grammatical errors in the [[Content: Draft Business Proposal]]. The content should be [[Tone: Professional and Clear]].",
        tags: ['English grammar', 'proofreading', 'business proposals', 'customer management']
    },
    {
        id: 74,
        category: "Communication & CRM",
        title: "Natural translation tool",
        description: "We provide seamless translation of text into other languages, ensuring natural-sounding expressions.",
        content: "You are a translation expert. Please translate [[Content:New Service Introduction Document]] into [[Language:English]], ensuring [[Structure:the original tone and nuance are maintained]].",
        tags: ['Translation', 'natural translation', 'text translation', 'language conversion']
    },
    {
        id: 75,
        category: "Communication & CRM",
        title: "Customer Service Email Template Generator",
        description: "We are developing email templates to enable prompt and effective responses to customer inquiries.",
        content: "Subject: Apology for Shipping Delay\n\nDear [Customer Name],\n\nPlease accept our sincerest apologies for the unexpected delay in the shipment of your recent order, [Order Number]. We understand that receiving your items on time is important, and we are very sorry for any inconvenience or frustration this may have caused.\n\nWe are actively working to resolve this issue and ensure your order reaches you as soon as possible. [Briefly explain the reason for the delay, e.g., \"Due to unforeseen logistical challenges,\" or \"A temporary issue with our fulfillment center,\"]. We are implementing [mention specific actions being taken, e.g., \"expedited shipping,\" or \"working with our delivery partners to prioritize your package\"].\n\nWe will provide you with an updated delivery estimate by [date/timeframe] and will send you a tracking number as soon as your order is dispatched.\n\nIn the meantime, if you have any questions or require further assistance, please do not hesitate to contact us directly by replying to this email or calling us at [phone number]. We are here to help.\n\nThank you for your understanding and continued patience.\n\nSincerely,\n\nThe [Your Company Name] Team",
        tags: ['Email templates', 'customer service', 'shipping delays', 'apologies']
    },
    {
        id: 76,
        category: "Communication & CRM",
        title: "Customer Feedback Request Message Generator",
        description: "Draft a request message to collect customer feedback.",
        content: "As a specialist in crafting customer feedback request messages, please write a three-sentence message requesting feedback on your experience using AI tools. The message should include words of thanks, a key question, and a link to a survey.",
        tags: ['Customer feedback', 'message composition', 'survey requests', 'AI tools']
    },
    {
        id: 77,
        category: "Communication & CRM",
        title: "Product Review Request Message Generator",
        description: "We are drafting a message to request product reviews from customers.",
        content: "We're writing to express our sincere appreciation for your recent purchase of AI Tool Pro. We would be grateful if you could share your experience by leaving a product review. Please click here to submit your feedback: [Link]",
        tags: ['Product reviews', 'message composition', 'customer management', 'and communication']
    },
    {
        id: 78,
        category: "Communication & CRM",
        title: "Service Evaluation Survey Generator",
        description: "We are developing a survey to assess service quality.",
        content: "You are an expert in creating service evaluation surveys. Please develop a survey on the [[Topic: Customer Service Satisfaction]] consisting of [[Number of Questions: 10]]. The survey should include a [[Format: satisfaction scale and an open-ended comment section]].",
        tags: ['Customer Service', 'Surveys', 'Satisfaction Assessments', 'Communication']
    },
    {
        id: 79,
        category: "Communication & CRM",
        title: "Welcome Email Template for New Clients",
        description: "Create an email template for new customers that includes a welcome message and product introduction.",
        content: "You are an expert in crafting welcome emails for new customers. Please create an email template for [[Subject: Congratulations on Joining AI Tools]]. The template should include [[Structure: Welcome Message, Introduction to Key Features, Offer of Further Assistance]].",
        tags: ['New customer welcome email template', 'customer relationship management', 'AI tools']
    },
    {
        id: 80,
        category: "Communication & CRM",
        title: "Automated Meeting Minutes Generator",
        description: "Minutes are prepared, summarizing the meeting's content and recording key decisions.",
        content: "You are a minutes-taking specialist. Please prepare the meeting minutes summarizing the key discussion points and decisions from the [[Subject: Monthly Performance Review]]. Include [[Structure: Attendees, Discussion Points, Conclusions, Action Items]].",
        tags: ['Meeting Minutes', 'Automation', 'Performance Reviews', 'Meeting Summaries', 'Customer Management']
    },
    {
        id: 81,
        category: "Communication & CRM",
        title: "Customer Service Response Generator",
        description: "We develop customer service response manuals to provide systematic customer support.",
        content: "You are an expert in developing customer service response guides. Please create a [[3-page]] manual on [[Topic: Handling Customer Refund Requests]]. The manual should include [[Sections: Procedures, Communication Tips, and Important Considerations]].",
        tags: ['Customer support', 'client interaction', 'manual creation', 'customer relationship management', 'refund processing']
    },
    {
        id: 82,
        category: "Communication & CRM",
        title: "Event Invitation Generator",
        description: "Craft systematic and engaging event invitations.",
        content: "You are an expert in crafting event invitations. Please draft an invitation for the [[Event Name: AI Conference 2023]], including [[Sections: Event Overview, Key Highlights, Registration Information]].",
        tags: ['Event Invitation', 'Conference', 'AI Conference', 'Customer Management', 'Communication']
    },
    {
        id: 83,
        category: "Communication & CRM",
        title: "Customer Complaint Report Generator",
        description: "We compile reports that systematically organize customer complaint feedback.",
        content: "As an expert in drafting customer complaint reports, please prepare a two-page report addressing the issue of shipping delays. The report should include a summary of the problem, the customer's request, and proposed solutions.",
        tags: ['Customer complaints', 'report writing', 'delivery delays']
    },
    {
        id: 84,
        category: "Communication & CRM",
        title: "Customer Survey Template Generator",
        description: "Creating survey templates to effectively gather customer feedback.",
        content: "You are an expert in creating customer survey templates. Please develop a 10-question survey template on the topic of [[AI Tool Usage Experience]]. The survey should include [[satisfaction scales and open-ended comment sections]].",
        tags: ['Customer Surveys', 'Survey Templates', 'Feedback Collection', 'Satisfaction Surveys']
    },
    {
        id: 85,
        category: "Communication & CRM",
        title: "Service Quality Evaluation Survey Generator",
        description: "We collect customer feedback by distributing a survey to assess service quality.",
        content: "You are an expert in crafting customer service quality evaluation surveys. Please create an 8-question survey on the topic of customer service quality. The survey should include satisfaction rating questions and a request for additional comments.",
        tags: ['Service Quality', 'Survey Completion', 'Customer Feedback', 'Satisfaction Surveys', 'Customer Relationship Management']
    },
    {
        id: 86,
        category: "Communication & CRM",
        title: "Customer Satisfaction Survey Generator",
        description: "We are developing a survey to assess overall customer satisfaction.",
        content: "You are an expert in crafting customer satisfaction surveys. Please create a 10-question survey on the topic of \"AI Tool Usage Experience.\" The survey should include a satisfaction scale and requests for improvement suggestions.",
        tags: ['Customer satisfaction', 'survey creation', 'AI tools', 'survey design']
    },
    {
        id: 87,
        category: "Communication & CRM",
        title: "Review Response Generator",
        description: "Craft an appropriate and courteous response to customer reviews.",
        content: "We appreciate you taking the time to share your feedback. We are sorry to hear that your delivery speed did not meet your expectations. We are committed to improving our services and will investigate this matter further to prevent future occurrences.",
        tags: ['Review responses', 'customer management', 'communication', 'problem-solving', 'emotional intelligence']
    },
    {
        id: 88,
        category: "Communication & CRM",
        title: "Product User Manual Generator",
        description: "We develop manuals that systematically guide users on how to operate the product.",
        content: "You are an expert in writing product user manuals. Please create a [[Product Name: AI Tool Master]] user manual, approximately [[Length: 5 pages]] long. The manual should include [[Sections: Introduction to Features, How to Use, and Precautions]].",
        tags: ['Product Manuals', 'User Guides', 'AI Tools', 'Writing', 'Communication']
    },
    {
        id: 89,
        category: "Content & Marketing",
        title: "Paragraph Generator",
        description: "Generate clear and concise paragraphs based on the given topic.",
        content: "You are an expert in crafting clear and concise paragraphs. Please write a paragraph of approximately 100 words on the topic of \"The Impact of AI on Business.\"",
        tags: ['Paragraph generation', 'AI', 'business', 'content creation', 'marketing']
    },
    {
        id: 90,
        category: "Content & Marketing",
        title: "Content Rewriter",
        description: "It assists in rewriting existing content or adapting it to a specific tone and style.",
        content: "You are an expert content rewriter. Please rewrite the following text on the topic of [[AI Ethics]] to approximately [[200 words]] from a fresh perspective.",
        tags: ['Content Rewriting', 'AI Ethics', 'Text Transformation']
    },
    {
        id: 91,
        category: "Content & Marketing",
        title: "SNS Content Idea Generator",
        description: "Generate original content ideas for social media.",
        content: "You are an SNS content idea specialist. Please generate 5 content ideas suitable for promoting the new product launch for [Brand: ABC Company].",
        tags: ['Social media content', 'idea generation', 'new product promotion', 'marketing', 'content creation']
    },
    {
        id: 92,
        category: "Content & Marketing",
        title: "Social Media Post Creation Tool",
        description: "We create content optimized for various social media platforms.",
        content: "As an expert social media post writer, please craft an Instagram post highlighting the key features of AI tools. The post should include an image caption and relevant hashtags.",
        tags: ['Social Media', 'Instagram', 'AI Tools', 'Content Creation']
    },
    {
        id: 93,
        category: "Content & Marketing",
        title: "AI Ad Copy Generator",
        description: "Craft compelling advertising copy for specific products or services.",
        content: "Unlock your potential with our AI time management tool. Reclaim your hours, conquer your to-do list, and maybe even find time to finally learn that instrument. Because who needs deadlines when you have destiny?",
        tags: ['Advertising copy', 'marketing', 'AI', 'time management', 'humor']
    },
    {
        id: 94,
        category: "Content & Marketing",
        title: "Brand Voice Generator",
        description: "Define the brand's tone and messaging strategy to create a consistent voice guide.",
        content: "You are an expert in crafting brand voice guidelines. Please create a voice guide for [[Brand:TechPlus]] aimed at [[Objective:delivering a consistent message]]. The guide should include [[Components: Tone, Message Style]].",
        tags: ['Brand voice', 'tone and manner', 'messaging strategy', 'content marketing']
    },
    {
        id: 95,
        category: "Content & Marketing",
        title: "Landing Page Headline Generator",
        description: "Craft compelling headlines that drive higher click-through rates on your landing pages.",
        content: "You are an expert in crafting landing page headlines. Please generate three headlines designed to drive subscriptions to an AI tool. The headlines should be clear and use compelling language.",
        tags: ['Landing pages', 'headlines', 'click-through rates', 'marketing', 'AI tools']
    },
    {
        id: 96,
        category: "Content & Marketing",
        title: "Promotional Push Notification Message Generator",
        description: "Craft concise and effective push notification messages to drive customer engagement.",
        content: "Don't miss out! Grab these amazing deals during our limited-time special discount event. Shop now!",
        tags: ['Push notifications', 'marketing', 'promotion', 'message creation', 'events']
    },
    {
        id: 97,
        category: "Content & Marketing",
        title: "Product Description Generator",
        description: "Craft a descriptive statement highlighting the product's key features and benefits.",
        content: "As a product description expert, please craft a compelling overview of **SmartTime**, highlighting its key features and benefits within a 200-word limit. The description should encompass its functionalities, the advantages it offers to customers, and practical use cases.",
        tags: ['Product descriptions', 'marketing copy', 'content creation', 'AI tools', 'copywriting']
    },
    {
        id: 98,
        category: "Content & Marketing",
        title: "Product Pitch Script Generator",
        description: "Craft a compelling pitch script to introduce and highlight the appeal of your product or service.",
        content: "You are an expert in crafting product pitch scripts. Please create a 5-minute pitch script for [[Product Name: SmartTask]], highlighting its key features and customer benefits. The script should include: Problem Definition, Solution, and Advantages.",
        tags: ['Product Pitching', 'Scriptwriting', 'SmartTask', '5-Minute Pitch', 'Problem Solving']
    },
    {
        id: 99,
        category: "Content & Marketing",
        title: "Social Media Survey Generator",
        description: "Develop survey content for social media platforms.",
        content: "You are an expert in crafting social media surveys. Please create a survey with 5 questions to investigate [[Topic: Satisfaction with AI Tool Usage]]. Include [[Format: simple questions with response options]].",
        tags: ['Social media', 'surveys', 'content creation', 'AI tools']
    },
    {
        id: 100,
        category: "Content & Marketing",
        title: "Content Calendar Generator",
        description: "Create a calendar that systematically organizes content creation and publication schedules.",
        content: "As a content calendar creation expert, please develop a [[Duration: 1-month]] calendar for [[Topic: AI-related blog and social media content]]. The calendar should include [[Components: Date, Topic, Format]].",
        tags: ['Content Calendar', 'Content Creation', 'Marketing Schedule', 'AI-Generated Content', 'Social Media']
    },
    {
        id: 101,
        category: "Content & Marketing",
        title: "Retention Strategy Text Generator",
        description: "Craft strategic messages to drive customer retention and re-engagement.",
        content: "Your AI tool free trial is ending soon. Re-engage with our premium features to unlock advanced capabilities and continue benefiting from [specific benefit 1] and [specific benefit 2]. Upgrade now to ensure uninterrupted access and maximize your productivity.",
        tags: ['Customer retention', 'marketing messages', 'and re-engagement strategies']
    },
    {
        id: 102,
        category: "Content & Marketing",
        title: "Crafting an Advertising Campaign Proposal",
        description: "Proposal for planning a successful advertising campaign.",
        content: "You are an expert in developing advertising campaign proposals. Please create a [[5-page]] proposal for a [[marketing campaign for AI tools]]. The proposal should include [[objectives, key strategies, and expected outcomes]].",
        tags: ['Advertising campaigns', 'proposal writing', 'marketing strategies', 'AI tools']
    },
    {
        id: 103,
        category: "Content & Marketing",
        title: "Brand Introduction Generator",
        description: "We craft introductory statements that clearly communicate brand value.",
        content: "You are an expert in crafting brand introduction statements. Please write a three-paragraph introduction for [[Brand Name: FutureAI]] that clearly communicates its value. The introduction should include its mission, key features, and vision.",
        tags: ['Brand Introduction', 'Marketing', 'Content Creation', 'AI']
    },
    {
        id: 104,
        category: "Content & Marketing",
        title: "Social Media Campaign Generator",
        description: "Develop impactful campaigns for social media platforms.",
        content: "You are an expert in crafting social media campaigns. Please develop a campaign for [[Platform: Instagram]] to promote [[Topic: a new product]], including [[Components: concept, key messaging, and timeline]].",
        tags: ['Social Media', 'Campaign Planning', 'Instagram', 'New Product Promotion', 'Content Marketing']
    },
    {
        id: 105,
        category: "Content & Marketing",
        title: "Retargeting Email Generator",
        description: "Draft an email to re-engage existing customers.",
        content: "You are an expert in crafting retargeting emails. Please compose a three-paragraph email regarding [[Subject: Free Trial Expiration Notification]], including [[Structure: a message of thanks, an invitation to re-engage, and information on additional benefits]].",
        tags: ['Retargeting', 'email marketing', 'customer engagement', 'content creation']
    },
    {
        id: 106,
        category: "Content & Marketing",
        title: "Video Scripting Tool",
        description: "Craft clear and compelling video scripts.",
        content: "You are a video scriptwriting expert. Please write a 5-minute video script introducing how to use AI tools. The script should include an intro, main body, and call to action.",
        tags: ['Video scripts', 'AI tools', 'content creation', 'marketing', 'video production']
    },
    {
        id: 107,
        category: "Content & Marketing",
        title: "Blog Post Creation Tool",
        description: "Craft professional and engaging blog posts tailored to your topic.",
        content: "You are an expert blog post writer. Please write a 1000-word blog post on the topic of [[Enhancing Productivity with AI Technologies]], including an introduction, body, and conclusion.",
        tags: ['Blog writing', 'content creation', 'AI utilization', 'productivity enhancement']
    },
    {
        id: 108,
        category: "Content & Marketing",
        title: "Re-engagement Email Generator",
        description: "Drafting an email to re-engage inactive customers.",
        content: "You are an expert in crafting re-engagement emails. Please write a three-paragraph email regarding [[Subject: Service Update Notification]]. The email should include [[Structure: expression of gratitude, details of the update, and a call to action]].",
        tags: ['Re-engagement emails', 'customer management', 'email marketing', 'service updates']
    },
    {
        id: 109,
        category: "Content & Marketing",
        title: "Instagram Caption Generator",
        description: "Craft compelling Instagram captions.",
        content: "Get ready to experience the future! We're thrilled to announce the launch of our revolutionary new product. Designed to redefine your expectations, it's packed with innovative features and sleek aesthetics. Discover how it can transform your daily life. #NewProductLaunch #Innovation #MustHave",
        tags: ['Instagram', 'Captions', 'Content Marketing', 'Social Media', 'New Product Launch']
    },
    {
        id: 110,
        category: "Content & Marketing",
        title: "Email Sequence Generator",
        description: "Craft an email sequence designed with the customer journey in mind.",
        content: "You are an expert in crafting email sequences. Please create a 3-email sequence for a [[Topic: New Product Launch]], including [[Structure: Introduction, Explanation, Call to Action]].",
        tags: ['Email sequences', 'new product launches', 'marketing automation', 'email marketing']
    },
    {
        id: 111,
        category: "Content & Marketing",
        title: "Developing a Public Relations Campaign Proposal",
        description: "Proposal for a successful marketing campaign.",
        content: "You are an expert in creating promotional campaign proposals. Please prepare a 5-page proposal for a marketing campaign focused on AI tools. The proposal should include objectives, key strategies, and anticipated outcomes.",
        tags: ['Promotional campaigns', 'proposal writing', 'marketing strategies', 'AI tools']
    },
    {
        id: 112,
        category: "Content & Marketing",
        title: "Social Media Campaign Planning Tool",
        description: "We plan campaigns to be utilized across various social media platforms.",
        content: "As a social media campaign planning expert, please develop a [[campaign structure: key messaging, content calendar]] for [[platform: Facebook, Instagram]] aimed at [[objective: increasing brand awareness]].",
        tags: ['Social Media', 'Campaign Planning', 'Content Marketing', 'Brand Awareness']
    },
    {
        id: 113,
        category: "Content & Marketing",
        title: "Customer Persona Creation Tool",
        description: "Optimize your marketing strategy by clearly defining your ideal customer profile.",
        content: "You are an expert in crafting customer personas. Please create a persona for the ideal customer, an IT professional, for the AI productivity tool. This persona should include demographic information, needs, and interests.",
        tags: ['Customer personas', 'marketing strategies', 'ideal customers', 'IT professionals', 'AI productivity tools']
    },
    {
        id: 114,
        category: "HR & People Management",
        title: "Guide to Developing Welfare Program Proposals",
        description: "Proposal for enhancing employee welfare programs.",
        content: "You are an expert in drafting welfare program proposals. Please prepare a five-page proposal on the topic of \"Welfare Programs for Enhancing Employee Productivity.\" The proposal should include sections on Problem Definition, Proposed Solution, and Expected Outcomes.",
        tags: ['Welfare programs', 'proposal writing', 'employee productivity', 'HR management']
    },
    {
        id: 115,
        category: "HR & People Management",
        title: "Career Development Plan Generator",
        description: "Develop a systematic plan for individual and team member career development.",
        content: "You are an expert in creating career development plans. Please develop a one-year career development plan for mid-level managers, including their current status, objectives, and action steps.",
        tags: ['Career Development', 'Middle Management', 'Annual Plan', 'HR']
    },
    {
        id: 116,
        category: "HR & People Management",
        title: "Employee Training Manual Authoring Tool",
        description: "We are developing a systematic training manual for employee education.",
        content: "You are an expert in creating employee training manuals. Please develop a three-page training manual on the topic of \"Utilizing AI Tools.\" The manual should include sections on Fundamentals, Advanced Concepts, and Practical Exercises.",
        tags: ['Employee training', 'manual development', 'AI tools', 'training']
    },
    {
        id: 117,
        category: "HR & People Management",
        title: "Team Goal Setting Assistant",
        description: "Set team objectives and develop strategies for their achievement.",
        content: "You are an expert in setting team goals. Please establish a six-month objective and develop a strategy for [[Topic: Improving Team Productivity]]. Include [[Components: Specific Goals, Action Plan, Measurement Methods]].",
        tags: ['Team Goal Setting', 'Productivity Improvement', 'Action Planning', 'Measurement Methods', 'Human Resources']
    },
    {
        id: 118,
        category: "HR & People Management",
        title: "Designing Teamwork Enhancement Programs",
        description: "We are designing a program to enhance teamwork and collaboration within the team.",
        content: "You are an expert in designing team improvement programs. Please design a program focused on [[Theme: Enhancing Teamwork for Seamless Collaboration]]. The program should present strategies for team members to collaborate effectively, incorporating elements such as [[Components: Collaboration Tools, Team Building Activities, and Weekly Feedback Sessions]].",
        tags: ['Teamwork', 'Collaboration', 'Team Building', 'Program Design']
    },
    {
        id: 119,
        category: "HR & People Management",
        title: "Job Posting Generator",
        description: "This tool helps attract qualified candidates by crafting job descriptions tailored to specific roles.",
        content: "You are an expert in crafting job postings. Please write a job description for the [[Position: Marketing Manager]] role. The posting should include [[Sections: Job Description, Requirements, Benefits]].",
        tags: ['Job Opening: Marketing Manager\nJob Description: Requirements', 'Benefits']
    },
    {
        id: 120,
        category: "HR & People Management",
        title: "Interview Question Generator",
        description: "This is a tool for systematically managing the interview process by creating job-specific interview questions.",
        content: "You are an expert in crafting interview questions. Please generate 10 interview questions for a Software Developer position. The questions should include technical, experience-based, and culture fit inquiries.",
        tags: ['Interview', 'Questions', 'Hiring', 'Human Resources Management', 'Software Developer']
    },
    {
        id: 121,
        category: "Presentation & Education",
        title: "Presentation Script Generator",
        description: "Create a natural, persuasive speech script for university or corporate projects from a professional consultant's perspective.",
        content: "Act as a professional presentation consultant. Draft a full speech script for a team project based on the following info:\n\n[Topic]:\n[Objective]:\n[Audience (Executive/Peers/Judges)]:\n[Duration (min)]:\n[Key Achievements]:\n[Unique Value Proposition]:\n\nConstraints: Use a conversational yet professional tone, ensure smooth transitions (Intro-Body-Conclusion), and include a call-to-action for Q&A.",
        tags: ["Speech", "PublicSpeaking", "Teamwork"]
    },
    {
        id: 122,
        category: "Presentation & Education",
        title: "Slide Deck Architect",
        description: "Strategic slide structure design inspired by top-tier management consulting frameworks.",
        content: "Act as a presentation designer from a top-tier consulting firm. Design a logical slide structure for the following:\n\n[Topic]:\n[Audience]:\n[Goal (Inform/Persuade/Report)]:\n[Slide Count]:\n\nOutput Format: Slide # / Title / Core Message / Recommended Visuals.",
        tags: ["Strategy", "DeckDesign", "Storylining"]
    },
    {
        id: 123,
        category: "Communication & CRM",
        title: "Brand Voice Review Responder",
        description: "CX experts craft empathetic and professional responses to customer reviews to build brand loyalty.",
        content: "Act as a Customer Experience (CX) specialist. Write a response to the customer review below that aligns with our brand image.\n\n[Customer Review]:\n[Review Sentiment (Pos/Neu/Neg)]:\n[Brand Tone (Professional/Friendly/Premium)]:\n[Required Action]:\n\nConstraints: Must show empathy, avoid defensive language, and keep it under 5 sentences.",
        tags: ["CX", "ReviewManagement", "Branding"]
    },
    {
        id: 124,
        category: "HR & People Management",
        title: "Career Roadmap Architect",
        description: "Design a systematic career development plan with actionable growth milestones.",
        content: "Act as a career coach and performance manager. Create a 12-month career development plan based on the following profile:\n\n[Current Role]:\n[Target Growth/Role]:\n[Current Skillset]:\n[Skill Gaps]:\n\nOutput: Quarterly milestones, recommended learning resources, and KPIs for success.",
        tags: ["CareerGrowth", "HR", "PersonalBranding"]
    },
    {
        id: 125,
        category: "Communication & CRM",
        title: "SaaS Onboarding Email Template",
        description: "Write high-conversion welcome emails that drive immediate user engagement.",
        content: "Act as a SaaS Growth Marketer. Draft a welcome email for new users based on this info:\n\n[Service Name]:\n[Top 3 Features]:\n[Core Value Proposition]:\n[Primary CTA]:\n\nConstraints: Use a professional yet welcoming tone, include a clear subject line, and focus on the 'First Value' experience.",
        tags: ["EmailMarketing", "Retention", "Copywriting"]
    },
    {
        id: 126,
        category: "Business & Strategy",
        title: "Revenue Model Optimizer",
        description: "Analyze business revenue streams and identify new monetization opportunities.",
        content: "Act as a Startup Strategy Consultant. Analyze the following business model and suggest optimizations:\n\n[Business Description]:\n[Target Audience]:\n[Current Revenue Stream]:\n[Market Competition]:\n\nOutput: 1. Current Model Summary, 2. Major Bottlenecks, 3. Three New Revenue Stream Proposals, 4. Implementation Priority.",
        tags: ["Monetization", "Strategy", "BusinessModel"]
    },
    {
        id: 127,
        category: "Business & Strategy",
        title: "Global Market Entry Planner",
        description: "Comprehensive go-to-market (GTM) strategy for entering new international territories.",
        content: "Act as a Global Expansion Consultant. Develop a market entry strategy based on:\n\n[Product/Service]:\n[Target Region]:\n[Primary Competitor]:\n[Unique Advantage]:\n\nOutput: GTM Summary, Competitive Positioning, and a 6-month execution roadmap.",
        tags: ["GTM", "Expansion", "GlobalBusiness"]
    },
    {
        id: 128,
        category: "Work & Reporting",
        title: "SMART Goal Navigator",
        description: "Transform vague ambitions into Specific, Measurable, Achievable, Relevant, and Time-bound goals.",
        content: "Act as an OKR/Performance Consultant. Organize the following annual objectives using the SMART framework:\n\n[Entity (Org/Individual)]:\n[Core Direction]:\n[Current Context]:\n\nOutput: SMART Goal breakdown and a quarterly execution plan.",
        tags: ["OKR", "Productivity", "Planning"]
    },
    {
        id: 129,
        category: "Content & Marketing",
        title: "Multi-Channel Ad Copywriter",
        description: "Generate high-performing ad copy tailored for specific social media and search platforms.",
        content: "Act as a professional Copywriter. Create 3 variations of ad copy based on the following:\n\n[Product]:\n[Target Audience]:\n[Key Benefit]:\n[Platform (FB/IG/LinkedIn/Google)]:\n\nOutput: 3 Headlines and 3 Body copies per platform.",
        tags: ["AdCopy", "Growth", "Marketing"]
    },
    {
        id: 130,
        category: "Work & Reporting",
        title: "Executive Briefing Summarizer",
        description: "Condense lengthy documents into high-level executive summaries under 5 bullet points.",
        content: "Summarize the following document for an executive-level briefing. \n\n[Content]:\n\nConstraints: Maximum 5 bullet points, remove jargon, and focus on data-driven outcomes/actions.",
        tags: ["ExecutiveSummary", "Reporting", "Efficiency"]
    },
    {
        id: 131,
        category: "HR & People Management",
        title: "Growth-Oriented Feedback Writer",
        description: "Draft constructive, performance-based feedback that motivates employees to grow.",
        content: "Act as an HR Manager. Write a performance feedback summary for an employee based on:\n\n[Role]:\n[Key Achievements]:\n[Strengths]:\n[Areas for Improvement]:\n\nConstraints: Maintain a radical candor approach—be direct but deeply caring. Focus on growth-mindset language.",
        tags: ["PerformanceReview", "Leadership", "HR"]
    },
    {
        id: 132,
        category: "Work & Reporting",
        title: "Excel/Google Sheets Formula Expert",
        description: "Instant formula recommendations for complex data analysis tasks.",
        content: "Act as a Data Analyst. Recommend the best Excel/Google Sheets formula for the following task:\n\n[Desired Action]:\n[Data Structure]:\n\nOutput: Recommended Formula, Syntax Breakdown, and a practical example.",
        tags: ["Excel", "DataAnalysis", "Automation"]
    },
    {
        id: 133,
        category: "Communication & CRM",
        title: "Professional English Polisher",
        description: "Elevate your writing to a professional, native-level business tone.",
        content: "Rewrite the following text to be more professional, concise, and suitable for a high-stakes business environment:\n\n[Input Text]:\n\nConstraints: Maintain the original meaning but improve vocabulary and flow.",
        tags: ["BusinessEnglish", "Writing", "Editing"]
    },
    {
        id: 134,
        category: "Communication & CRM",
        title: "Grammar & Clarity Optimizer",
        description: "Comprehensive proofreading for flawless and natural sentence structures.",
        content: "Proofread and optimize the following text for grammar, punctuation, and overall clarity:\n\n[Text]:",
        tags: ["Proofreading", "Clarity", "Grammar"]
    },
    {
        id: 135,
        category: "Technology & Development",
        title: "Clean Code Documenter",
        description: "Automatically generate meaningful comments and documentation for your code snippets.",
        content: "Act as a Senior Developer. Analyze the code below and add clear, concise documentation/comments that explain the 'Why' behind the logic:\n\n[Code]:",
        tags: ["Programming", "CleanCode", "Documentation"]
    },
    {
        id: 136,
        category: "HR & People Management",
        title: "Compelling Job Description Writer",
        description: "Write job posts that attract top-tier talent by highlighting mission and culture.",
        content: "Act as a Talent Brand Specialist. Write an engaging job description based on the following:\n\n[Job Title]:\n[Key Responsibilities]:\n[Requirements]:\n[Preferred Skills]:\n\nConstraints: Focus on 'Mission-Driven' language and include a section on 'Why Join Us'.",
        tags: ["Recruiting", "TalentAcquisition", "Branding"]
    },
    {
        id: 137,
        category: "HR & People Management",
        title: "Competency-Based Interview Designer",
        description: "Design a multi-layered interview guide to verify technical and behavioral fit.",
        content: "Act as a Lead Interviewer. Design a set of interview questions for the following role:\n\n[Role]:\n[Experience Level]:\n\nOutput: Technical Proficiency Qs, Behavioral (STAR method) Qs, and Cultural Fit Qs.",
        tags: ["Interviewing", "Hiring", "Assessment"]
    },
    {
        id: 138,
        category: "Communication & CRM",
        title: "Business Email Architect",
        description: "Generate clear, professional email templates for any corporate scenario.",
        content: "Act as a Business Communication Expert. Draft a professional email based on:\n\n[Context/Goal]:\n[Recipient]:\n[Desired Tone]:\n\nConstraints: Keep it concise, include a clear subject line, and ensure a professional sign-off.",
        tags: ["Email", "Communication", "Professionalism"]
    }
];