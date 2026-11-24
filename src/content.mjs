export const topics = [
  {
    slug: "ai-tools",
    name: "AI tools & software",
    nav: "AI & software",
    kicker: "Less hype. Better tools.",
    description: "Practical reviews and decision guides for choosing AI and software that earn their place in your workflow.",
    color: "mint",
    icon: "✳",
    keywords: "AI tools, software reviews, productivity software, tool comparisons"
  },
  {
    slug: "money",
    name: "Money & side hustles",
    nav: "Money",
    kicker: "Make the numbers make sense.",
    description: "Straightforward systems for budgeting, evaluating online earning ideas, and making informed money decisions.",
    color: "sun",
    icon: "↗",
    keywords: "budgeting, personal finance, side hustle, money management"
  },
  {
    slug: "developer",
    name: "Developer & no-code",
    nav: "Build",
    kicker: "From idea to working system.",
    description: "Hands-on coding, tech, and no-code tutorials designed to help you build useful things with less friction.",
    color: "blue",
    icon: "{ }",
    keywords: "developer tutorials, no-code, automation, coding guides"
  },
  {
    slug: "gear",
    name: "Niche gear guides",
    nav: "Gear",
    kicker: "Buy for the work you do.",
    description: "Focused buying guides for home-office essentials, wearables, and useful gear—without the spec-sheet fog.",
    color: "coral",
    icon: "⌁",
    keywords: "gear guides, home office, wearables, product reviews"
  },
  {
    slug: "career",
    name: "Career, remote work & study",
    nav: "Career",
    kicker: "Small systems. Better progress.",
    description: "Repeatable playbooks for remote-job searches, career development, and studying with a clear plan.",
    color: "lilac",
    icon: "◎",
    keywords: "career advice, remote work, job search, study prep"
  }
];

export const guides = [
  {
    slug: "ai-tools-for-small-teams",
    topic: "ai-tools",
    title: "How to choose AI tools for a small team",
    shortTitle: "Choose AI tools by the job—not the buzz",
    excerpt: "A useful shortlist starts with one repeated task, a real test set, and a clear rule for sensitive data.",
    description: "A practical framework for comparing AI tools for a small team: start with one workflow, test real examples, check data controls, and measure time saved.",
    kind: "Decision guide",
    readTime: "7 min read",
    updated: "Evergreen guide",
    featured: true,
    affiliateLabel: "Partner tool link",
    affiliateUrl: "",
    recommendation: "Start with a tool that solves one frequent, low-risk task. Compare it with your current process before expanding access across the team.",
    sections: [
      {
        heading: "Start with the friction, not the feature list",
        paragraphs: [
          "Write down the work that repeatedly slows the team down: first-draft writing, meeting follow-up, finding information, or turning notes into a standard format. A precise job makes a useful test; “we need AI” does not.",
          "Pick one workflow with a clear before-and-after. Record how long it takes today, what a good result looks like, and which mistakes would make the output unusable. Keep a human review step wherever accuracy or judgment matters."
        ],
        bullets: ["Choose a task that happens often enough to measure.", "Use examples the team is allowed to share with a vendor.", "Name the reviewer and the point at which a person must take over."]
      },
      {
        heading: "A comparison that stays useful",
        paragraphs: ["Compare tool types against the same task instead of comparing marketing claims. The best fit depends on your workflow, data rules, integrations, and the time needed to review the output."],
        table: {
          headers: ["Tool type", "Useful when", "Check before choosing"],
          rows: [
            ["Writing assistant", "A team drafts, rewrites, or standardizes repeatable text.", "Can it follow your examples and preserve approved facts?"],
            ["Research assistant", "People need help organizing a bounded set of sources.", "Can you inspect sources and verify each important claim?"],
            ["Meeting assistant", "Follow-up notes and action items are routinely missed.", "Are recording, consent, retention, and access controls acceptable?"],
            ["Workflow assistant", "Several routine steps connect across existing software.", "Can you review actions, permissions, and failure handling?"]
          ]
        }
      },
      {
        heading: "Run a small, fair test",
        paragraphs: [
          "Build a handful of representative examples, including one awkward edge case. Run each candidate through the same instructions and score accuracy, editing effort, ease of use, and the cost of getting a wrong answer.",
          "Ask two or three likely users to try the workflow. Count review time as part of the work: a fast first draft is not a gain if checking it takes longer than writing it."
        ],
        bullets: ["Keep the prompt, examples, and scoring notes for every candidate.", "Check privacy terms, export options, access controls, and cancellation terms.", "Revisit the decision after a short pilot using real, approved work."]
      }
    ],
    related: ["ai-software-review-checklist", "no-code-automation-first-project", "remote-job-search-system"]
  },
  {
    slug: "ai-software-review-checklist",
    topic: "ai-tools",
    title: "A practical checklist for reviewing AI software",
    shortTitle: "Review AI software without the hype",
    excerpt: "A repeatable test for output quality, privacy, workflow fit, and the effort hidden behind a polished demo.",
    description: "Review AI software fairly: test real tasks, track revisions, check data controls, and separate sponsored placements from editorial judgment.",
    kind: "Review methodology",
    readTime: "6 min read",
    updated: "Evergreen guide",
    featured: false,
    affiliateLabel: "Partner software link",
    affiliateUrl: "",
    recommendation: "Score the same task across products, write down where the output fails, and disclose any commercial relationship next to the recommendation.",
    sections: [
      {
        heading: "Test a real task, not a stage-managed demo",
        paragraphs: [
          "A useful review starts with a job someone actually needs done. Define the input, the acceptable output, and the time a person is willing to spend checking it before opening the product.",
          "Use the same test prompt and representative material for each candidate. Keep a simple log of retries and edits; the first result rarely tells the whole story. Never upload confidential data unless the organization has approved the tool and its terms."
        ]
      },
      {
        heading: "Compare the work around the output",
        paragraphs: ["The interface is only one part of the experience. The review should explain what a reader must provide, how results can be checked, and what happens when the tool is wrong."],
        table: {
          headers: ["Review area", "Question to answer", "Evidence to record"],
          rows: [
            ["Output", "Does it meet the brief without inventing details?", "Examples, corrections, and recurring failure modes"],
            ["Control", "Can a user inspect, edit, export, or delete work?", "Settings exercised during the test"],
            ["Workflow", "Does it fit tools and steps already in use?", "Extra setup, manual transfers, and review time"],
            ["Terms", "What do pricing, privacy, and cancellation actually say?", "Date checked and the relevant official policy page"]
          ]
        }
      },
      {
        heading: "Make commercial relationships visible",
        paragraphs: [
          "Keep editorial findings separate from payment. Label a sponsored placement as sponsored, and place an affiliate disclosure close to recommendations that may earn a commission. A commission should never change a score or turn an untested product into a recommendation.",
          "For an honest review, record the test date, plan or edition used, major limitations, and what changed since the previous review. If a feature or price was not verified, say so instead of guessing."
        ],
        bullets: ["Label what was tested and what is still unverified.", "Use a consistent rubric across paid and unpaid products.", "Update a review when a material product or policy change affects its conclusion."]
      }
    ],
    related: ["ai-tools-for-small-teams", "budgeting-app-selection-checklist", "home-office-setup-priority-list"]
  },
  {
    slug: "budgeting-app-selection-checklist",
    topic: "money",
    title: "How to choose a budgeting app that fits your habits",
    shortTitle: "Choose a budgeting app you will keep using",
    excerpt: "Match the tool to how you handle money, then check privacy, recurring fees, and how easy it is to leave.",
    description: "Compare budgeting apps and simple alternatives by setup effort, data access, fees, export options, and the habits you actually want to support.",
    kind: "Money guide",
    readTime: "8 min read",
    updated: "Evergreen guide",
    featured: true,
    financialDisclaimer: true,
    affiliateLabel: "Partner app link",
    affiliateUrl: "",
    recommendation: "Choose the lightest system that helps you notice what matters. Start with a short trial period and review what the service costs and connects to.",
    sections: [
      {
        heading: "Decide what the app should help you do",
        paragraphs: [
          "“Budgeting” can mean planning upcoming bills, getting a weekly spending snapshot, setting savings targets, or keeping household spending visible. Pick the one outcome you want before comparing features.",
          "A tool is useful only if its routine fits your life. If you do not want to connect bank accounts, a manual tracker or spreadsheet may be a better starting point. If you share expenses, test the collaboration flow before entering detailed information."
        ],
        bullets: ["List the money decisions you want to make more easily.", "Decide whether automatic account connections are acceptable to you.", "Set a reminder to review the tool after one month, not only after setup."]
      },
      {
        heading: "A simple comparison of approaches",
        paragraphs: ["These options are different ways to organize your money, not endorsements of particular products. Verify a provider's current terms and availability directly before signing up."],
        table: {
          headers: ["Approach", "Good fit for", "Trade-off to consider"],
          rows: [
            ["Spreadsheet or notebook", "People who want control and a simple overview.", "Transactions and updates are mostly manual."],
            ["Connected budgeting app", "People who value automated transaction summaries.", "Account access, data retention, and subscription terms need scrutiny."],
            ["Envelope-style system", "People who prefer assigning limits before spending.", "Setup may take more attention, especially across shared expenses."],
            ["Bank-provided tools", "People who want to start inside an existing relationship.", "Features, data exports, and account terms vary by institution."]
          ]
        }
      },
      {
        heading: "Read the terms before you link an account",
        paragraphs: [
          "Check the fee after any introductory period, whether useful features require a paid tier, and how cancellation works. Read the privacy and security information: which accounts can be connected, what data is retained, whether access can be revoked, and how to request deletion.",
          "Try the system with a limited time window first. If the routine feels like another chore, simplify the categories or change the method before buying a longer subscription."
        ],
        bullets: ["Review recurring fees and cancellation steps.", "Use the provider's own security and privacy documentation.", "Check export and account-deletion options before committing."]
      }
    ],
    related: ["side-hustle-profit-check", "remote-job-search-system", "study-plan-from-a-syllabus"]
  },
  {
    slug: "side-hustle-profit-check",
    topic: "money",
    title: "A quick profit check before you start a side hustle",
    shortTitle: "Count the real cost of a side hustle",
    excerpt: "Estimate time, fees, and cash costs before you commit—and avoid confusing revenue with take-home income.",
    description: "A simple side-hustle planning worksheet for estimating income, expenses, time, and uncertainty before you invest money or make promises.",
    kind: "Side-hustle guide",
    readTime: "6 min read",
    updated: "Evergreen guide",
    featured: false,
    financialDisclaimer: true,
    affiliateLabel: "Partner service link",
    affiliateUrl: "",
    recommendation: "Test the smallest version of the idea first. Set a spending cap, track every hour and fee, and avoid any platform that asks for money before clearly explaining the work and terms.",
    sections: [
      {
        heading: "Separate revenue from what you keep",
        paragraphs: [
          "A promising headline income figure can hide platform fees, supplies, travel, refunds, advertising, and unpaid administration. Write down every cost you expect and mark estimates separately from confirmed charges.",
          "Then count time honestly: setup, delivery, customer messages, bookkeeping, and learning. Divide what remains by the hours spent to get a rough effective hourly return. It is not a forecast, but it makes alternatives easier to compare."
        ],
        bullets: ["List one-time startup costs separately from monthly costs.", "Record fees, refunds, and the time spent finding customers.", "Use conservative estimates until you have your own results."]
      },
      {
        heading: "A small experiment beats a big commitment",
        paragraphs: ["Choose one narrow offer and a short test window. Define what you need to learn—whether people will pay, how long delivery takes, or which channel brings qualified interest—before buying equipment or a costly course."],
        table: {
          headers: ["Line item", "What to record", "Question to ask"],
          rows: [
            ["Gross revenue", "Payment received before costs", "Is this confirmed income or a projection?"],
            ["Direct costs", "Materials, platform fees, delivery, refunds", "What changes with each order or client?"],
            ["Time", "Setup, delivery, sales, and admin hours", "What is the effective return for my time?"],
            ["Risk", "Upfront spend and contractual commitments", "Can I test without debt or a long obligation?"]
          ]
        }
      },
      {
        heading: "Watch for pressure and unclear promises",
        paragraphs: [
          "Treat guaranteed returns, urgency tactics, and vague descriptions of the actual work as reasons to pause. Check who pays, what deliverable is required, how disputes work, and whether you can stop without losing money you cannot afford to spend.",
          "Tax, licensing, and consumer rules depend on where you live and what you do. Keep records and consult an appropriately qualified local professional when the stakes or requirements are unclear."
        ]
      }
    ],
    related: ["budgeting-app-selection-checklist", "remote-job-search-system", "home-office-setup-priority-list"]
  },
  {
    slug: "no-code-automation-first-project",
    topic: "developer",
    title: "Build your first no-code automation without making a mess",
    shortTitle: "A safer first no-code automation",
    excerpt: "Map one repetitive workflow, add a human check, and design for the day something fails.",
    description: "A beginner-friendly process for building a no-code automation: map the trigger and action, limit permissions, test edge cases, and add a safe failure path.",
    kind: "Tutorial",
    readTime: "7 min read",
    updated: "Evergreen guide",
    featured: true,
    affiliateLabel: "Partner platform link",
    affiliateUrl: "",
    recommendation: "Start with a low-risk workflow such as copying a labeled form response into a task list. Keep a person in the loop until the automation has earned more trust.",
    sections: [
      {
        heading: "Write the workflow down first",
        paragraphs: [
          "Describe the current process in plain language: what event starts it, what information is needed, which steps follow, and what result means the work is complete. If the process changes depending on context, note those branches before opening an automation builder.",
          "Choose a workflow with a clear trigger and a reversible outcome. Avoid automating payments, deletion, sensitive records, or external messages as a first project. A human review step makes early testing safer."
        ],
        bullets: ["Name the trigger, inputs, actions, and expected result.", "Identify missing data and duplicate-event cases.", "Decide how a person can pause or undo the workflow."]
      },
      {
        heading: "A dependable build sequence",
        paragraphs: ["Build one step at a time and test with sample records before connecting real work. Use the narrowest permissions available and keep a short note of what the automation can read or change."],
        table: {
          headers: ["Stage", "What to do", "What to verify"],
          rows: [
            ["Trigger", "Choose the single event that starts the flow.", "Does it run once per intended event?"],
            ["Transform", "Rename, filter, or format only required fields.", "Are empty and unexpected values handled?"],
            ["Action", "Create or update one low-risk destination item.", "Could a retry create duplicates or overwrite data?"],
            ["Review", "Notify a person and retain useful run history.", "Can an error be found, paused, and corrected?"]
          ]
        }
      },
      {
        heading: "Test failures before calling it finished",
        paragraphs: [
          "Try a normal record, a missing field, an unexpected value, and a repeated trigger. Check that the flow fails visibly instead of silently creating an incorrect result. Decide who will notice failures and how often run history will be reviewed.",
          "Document the connected accounts, owner, purpose, and safe way to disable the automation. Revisit permissions when the workflow changes or its owner leaves."
        ]
      }
    ],
    related: ["developer-portfolio-project-plan", "ai-tools-for-small-teams", "home-office-setup-priority-list"]
  },
  {
    slug: "developer-portfolio-project-plan",
    topic: "developer",
    title: "Plan a developer portfolio project people can actually review",
    shortTitle: "Make a portfolio project easy to evaluate",
    excerpt: "A small, finished project with clear trade-offs is more useful than a sprawling demo nobody can run.",
    description: "Plan a focused developer portfolio project with a clear problem, usable demo, readable README, accessible interface, and honest notes about trade-offs.",
    kind: "Build guide",
    readTime: "6 min read",
    updated: "Evergreen guide",
    featured: false,
    affiliateLabel: "Partner learning resource",
    affiliateUrl: "",
    recommendation: "Pick a narrow problem you understand, ship one complete path, and make it easy for another person to see what you built and why.",
    sections: [
      {
        heading: "Choose a problem with a finish line",
        paragraphs: [
          "A portfolio project should let a reviewer understand the user, the problem, and the main action in a few minutes. A small utility, data view, or workflow prototype can demonstrate judgment without needing a huge feature list.",
          "Write a one-sentence scope and a short non-goal list before coding. That boundary helps you finish the core experience and explain which features were intentionally left out."
        ],
        bullets: ["Describe the intended user and the single main task.", "Define one happy path and one realistic edge case.", "Set a time limit for polish and feature expansion."]
      },
      {
        heading: "Make the implementation easy to inspect",
        paragraphs: ["Reviewers may not clone or run a project. Provide a live demo where appropriate and a README that explains setup, architecture, decisions, and limitations. Do not expose secrets in source, screenshots, or example configuration."],
        table: {
          headers: ["Portfolio element", "What it should answer", "A useful signal"],
          rows: [
            ["Demo", "What can I do here?", "A clear first action and a working core path"],
            ["README", "How was it built and run?", "Setup steps, structure, and known limitations"],
            ["Code", "Can I follow the important decisions?", "Small modules, readable names, and focused commits"],
            ["Reflection", "What would change next?", "Concrete trade-offs based on observed feedback"]
          ]
        }
      },
      {
        heading: "Polish the route a reviewer takes",
        paragraphs: [
          "Check the project on a narrow screen, navigate with a keyboard, and test empty, loading, and error states where they apply. Remove dead buttons and sample credentials. A complete, modest experience feels more trustworthy than an ambitious screen full of placeholders.",
          "Add a short note about what you learned and what you would change next. Specific reflection shows more than a list of frameworks."
        ]
      }
    ],
    related: ["no-code-automation-first-project", "study-plan-from-a-syllabus", "remote-job-search-system"]
  },
  {
    slug: "home-office-setup-priority-list",
    topic: "gear",
    title: "A home-office setup: what to prioritize before buying more gear",
    shortTitle: "Build a useful home office in the right order",
    excerpt: "Start with fit, light, and sound—then add equipment only when a real constraint remains.",
    description: "A practical home-office buying guide that prioritizes ergonomics, lighting, sound, and compatibility before optional desk gear.",
    kind: "Gear guide",
    readTime: "6 min read",
    updated: "Evergreen guide",
    featured: true,
    affiliateLabel: "Partner gear link",
    affiliateUrl: "",
    recommendation: "Make one change at a time. Check return terms, dimensions, connection requirements, and fit before ordering a product for your particular setup.",
    sections: [
      {
        heading: "Fix the constraint you notice every day",
        paragraphs: [
          "Before buying an accessory, observe where work becomes uncomfortable or difficult: screen height, chair fit, glare, call audio, cable reach, or a lack of space. The answer depends on your room, body, work, and equipment.",
          "Adjust what you already own first. Raise a screen safely, reposition a lamp, reduce glare, or move a microphone closer. If a problem remains, compare products against the measured constraint instead of a generic checklist."
        ],
        bullets: ["Measure your available space and working distance.", "Check what your current devices already support.", "Set a budget before looking at premium accessories."]
      },
      {
        heading: "Prioritize by impact and compatibility",
        paragraphs: ["These are categories to evaluate, not a universal shopping list. Consider any health or ergonomic concern individually, and get qualified advice when needed."],
        table: {
          headers: ["Priority", "What to assess", "Before you buy"],
          rows: [
            ["1. Fit", "Screen position, chair, desk height, and work posture.", "Check dimensions, adjustment range, and return policy."],
            ["2. Light", "Glare, shadows, and changing daylight.", "Check placement, color options, and available power."],
            ["3. Sound", "Room noise, microphone distance, and calls.", "Confirm connection type, compatibility, and mute controls."],
            ["4. Extras", "Dock, stand, cable tools, or backup equipment.", "Buy only if a repeated friction point remains."]
          ]
        }
      },
      {
        heading: "Avoid expensive surprises",
        paragraphs: [
          "Confirm size, weight limits, desk clearance, ports, operating-system support, warranty, shipping, and restocking rules. A product with an attractive headline price may not be the lowest-cost choice after accessories or return shipping.",
          "Write down why you are buying each item and revisit the list after a week. That pause helps separate a genuine improvement from a purchase driven by a perfectly styled workspace photo."
        ]
      }
    ],
    related: ["wearable-buying-spec-checklist", "developer-portfolio-project-plan", "budgeting-app-selection-checklist"]
  },
  {
    slug: "wearable-buying-spec-checklist",
    topic: "gear",
    title: "How to compare wearable devices by the way you will use them",
    shortTitle: "Choose a wearable by your actual routine",
    excerpt: "Comfort, battery habits, compatibility, and data controls matter as much as a long feature list.",
    description: "A buyer's checklist for comparing wearables by comfort, phone compatibility, charging routine, accessible features, data settings, and total cost.",
    kind: "Gear guide",
    readTime: "6 min read",
    updated: "Evergreen guide",
    featured: false,
    affiliateLabel: "Partner gear link",
    affiliateUrl: "",
    recommendation: "Start with the activity and phone you already use. Verify compatibility and return terms, and treat health-related readings as informational unless a qualified professional advises otherwise.",
    sections: [
      {
        heading: "Start from a routine you already have",
        paragraphs: [
          "Decide whether the device is mainly for notifications, exercise, navigation, accessibility, or a particular daily habit. A long list of features is not valuable if the device is uncomfortable, difficult to charge, or awkward with the phone you own.",
          "Try the size and band if possible. Consider wear comfort, screen readability, controls, water-use guidance, charging frequency, and whether the device remains useful when some features are turned off."
        ]
      },
      {
        heading: "Compare the ownership experience",
        paragraphs: ["Review the manufacturer's current compatibility and privacy pages. Features and support can vary by model, region, and software version, so verify specific claims before buying."],
        table: {
          headers: ["Factor", "What to verify", "Why it matters"],
          rows: [
            ["Compatibility", "Phone, operating-system, and app requirements.", "A feature may depend on a particular phone or service."],
            ["Comfort", "Size, weight, material, and controls.", "A device only helps if you want to wear it."],
            ["Battery", "Your expected charge routine and charger availability.", "Charging friction can disrupt the habit."],
            ["Data", "Collection, sharing, export, and deletion settings.", "Sensitive information deserves a clear control plan."],
            ["Cost", "Device, subscription, accessories, and warranty.", "The purchase price may not be the full ownership cost."]
          ]
        }
      },
      {
        heading: "Use health features thoughtfully",
        paragraphs: [
          "Consumer wearables can present estimates and trends, but individual readings may be incomplete or inaccurate. They are not a diagnosis or a substitute for medical advice. Check the device documentation and speak with a qualified health professional about personal concerns.",
          "Read return, repair, and software-support terms before purchase. A device that fits your actual routine and data preferences is often a better choice than the one with the longest specification sheet."
        ]
      }
    ],
    related: ["home-office-setup-priority-list", "budgeting-app-selection-checklist", "study-plan-from-a-syllabus"]
  },
  {
    slug: "remote-job-search-system",
    topic: "career",
    title: "A simple system for a focused remote-job search",
    shortTitle: "A focused remote-job search without burnout",
    excerpt: "Track a small number of good-fit roles, tailor evidence to the work, and protect time for follow-up.",
    description: "Build a focused remote-job search: define target roles, assess listings, tailor applications, track follow-ups, and protect personal information.",
    kind: "Career guide",
    readTime: "7 min read",
    updated: "Evergreen guide",
    featured: true,
    affiliateLabel: "Partner career resource",
    affiliateUrl: "",
    recommendation: "Choose a narrow role profile, keep a simple application log, and verify employers through official channels before sharing sensitive information.",
    sections: [
      {
        heading: "Define what a good fit means to you",
        paragraphs: [
          "Remote roles differ in time-zone expectations, location restrictions, travel, equipment, and how much work happens live. Write down your non-negotiables and a flexible list before applying; this makes a job title alone less likely to distract you.",
          "Pick a manageable set of role families and evidence you can show for each. A focused search makes it easier to tailor an application and learn from responses without sending the same generic materials everywhere."
        ],
        bullets: ["Record role, level, location eligibility, and time-zone requirements.", "Keep examples of work that show the skills in the listing.", "Set weekly search and recovery time that you can maintain."]
      },
      {
        heading: "Use a lightweight application tracker",
        paragraphs: ["A spreadsheet is often enough. Track the source, role, date, next step, and the version of materials used. Do not store unnecessary personal or confidential details in a shared tracker."],
        table: {
          headers: ["Stage", "Useful action", "Signal to record"],
          rows: [
            ["Find", "Check the company and role on an official source.", "Employer, location, role requirements, closing date"],
            ["Prepare", "Match two or three examples to core responsibilities.", "Resume version and evidence selected"],
            ["Apply", "Submit through a verified channel and save a copy.", "Date, contact route, and promised next step"],
            ["Follow up", "Use a polite reminder after a reasonable interval.", "Date and response, without repeated pressure"]
          ]
        }
      },
      {
        heading: "Watch for job-search scams",
        paragraphs: [
          "Pause when an offer requires payment for a job, requests sensitive identity or banking details before a legitimate hiring process, or relies on urgency and informal contact. Independently find the company's official careers page and verify the recruiter through a trusted company channel.",
          "Hiring norms and employment rules vary by location. Ask clear questions about classification, compensation, working hours, equipment, and location before accepting."
        ]
      }
    ],
    related: ["study-plan-from-a-syllabus", "developer-portfolio-project-plan", "side-hustle-profit-check"]
  },
  {
    slug: "study-plan-from-a-syllabus",
    topic: "career",
    title: "Turn a syllabus into a study plan you can keep",
    shortTitle: "Build a study plan from the syllabus",
    excerpt: "Work backward from deadlines, make retrieval practice visible, and leave room for the week to change.",
    description: "Turn course deadlines into a study plan with short retrieval practice, regular review sessions, and a weekly reset.",
    kind: "Study guide",
    readTime: "6 min read",
    updated: "Evergreen guide",
    featured: false,
    affiliateLabel: "Partner study resource",
    affiliateUrl: "",
    recommendation: "Start with the next assessment, work backward to small sessions, and reserve one weekly reset to adjust the plan without treating a missed block as failure.",
    sections: [
      {
        heading: "Make the real workload visible",
        paragraphs: [
          "Collect assignment dates, exam windows, required reading, project milestones, and any fixed commitments. Break large deliverables into visible actions such as outline, practice problems, draft, and review; “study chapter” is usually too broad to schedule well.",
          "Estimate effort honestly and leave buffer for busy days. The plan is a decision aid, not a promise that every week will go exactly as expected."
        ],
        bullets: ["Put fixed deadlines and commitments on one calendar.", "Break large tasks into short, checkable sessions.", "Reserve a weekly catch-up block for the work that moves."]
      },
      {
        heading: "Choose a session that makes you retrieve",
        paragraphs: ["For many subjects, practice recalling ideas without looking, then check and correct the result. Mix short quizzes, worked problems, explaining a concept aloud, and reviewing an error log. Choose methods that match the kind of assessment ahead."],
        table: {
          headers: ["Session", "Useful for", "Close with"],
          rows: [
            ["Recall", "Definitions, concepts, and relationships.", "Check notes and correct gaps in another color."],
            ["Practice", "Problem solving and applying a method.", "Record the step that caused an error."],
            ["Explain", "Organizing an argument or process.", "Name one point that still feels unclear."],
            ["Review", "Returning to older material over time.", "Schedule the next short revisit."]
          ]
        }
      },
      {
        heading: "Review the plan, not your worth",
        paragraphs: [
          "At the end of the week, compare the plan with what happened. Move unfinished work, shorten overloaded sessions, and ask for help early when a topic is persistently unclear. A missed block is information about the plan, not a measure of ability.",
          "If school deadlines or course requirements are unclear, confirm them with the instructor or official course materials. Use support services available to you when study, health, or accessibility needs make the workload difficult."
        ]
      }
    ],
    related: ["remote-job-search-system", "developer-portfolio-project-plan", "budgeting-app-selection-checklist"]
  }
];

export const topicBySlug = Object.fromEntries(topics.map((topic) => [topic.slug, topic]));
export const guideBySlug = Object.fromEntries(guides.map((guide) => [guide.slug, guide]));
