
"use strict";

/* =====================================
   1. Sample Job Role Presets
===================================== */

const presets = {
    "data-analyst": {
        jd: "We are seeking a Data Analyst skilled in Python, SQL, Tableau, Data Visualization, Excel, PowerBI, Machine Learning, Pandas, Data Cleaning, Communication and Problem Solving.",
        skills: "Python, SQL, Excel, Data Cleaning, Problem Solving, Communication, Pandas"
    },

    "web-dev": {
        jd: "Frontend Web Developer required with React, JavaScript, HTML5, CSS3, Tailwind CSS, REST APIs, Git, TypeScript, GraphQL, Node.js and Redux.",
        skills: "JavaScript, HTML5, CSS3, React, Git, REST APIs, Tailwind CSS"
    },

    "ai-engineer": {
        jd: "AI ML Engineer required with Python, PyTorch, TensorFlow, Deep Learning, Machine Learning, NLP, Scikit-Learn, MLOps, Docker, AWS and GCP.",
        skills: "Python, Machine Learning, Scikit-Learn, PyTorch, Docker, Git"
    },

    "devops": {
        jd: "DevOps Engineer required with Docker, Kubernetes, CI/CD, Jenkins, AWS, Terraform, Linux, Bash, Ansible, Prometheus, Grafana and Git.",
        skills: "Linux, Bash, Docker, Git, AWS, CI/CD"
    }
};


/* =====================================
   2. Skill Bank Database
===================================== */

const skillDatabase = [
    { name: "Python", category: "Programming", icon: "fa-brands fa-python", color: "#facc15" },
    { name: "JavaScript", category: "Programming", icon: "fa-brands fa-js", color: "#fbbf24" },
    { name: "TypeScript", category: "Programming", icon: "fa-solid fa-code", color: "#60a5fa" },
    { name: "C++", category: "Programming", icon: "fa-solid fa-code", color: "#38bdf8" },

    { name: "React", category: "Web Development", icon: "fa-brands fa-react", color: "#22d3ee" },
    { name: "Node.js", category: "Web Development", icon: "fa-brands fa-node-js", color: "#34d399" },
    { name: "HTML5/CSS3", category: "Web Development", icon: "fa-brands fa-html5", color: "#fb923c" },
    { name: "Tailwind CSS", category: "Web Development", icon: "fa-brands fa-css3-alt", color: "#2dd4bf" },

    { name: "SQL", category: "Data & AI", icon: "fa-solid fa-database", color: "#60a5fa" },
    { name: "Excel", category: "Data & AI", icon: "fa-solid fa-file-excel", color: "#4ade80" },
    { name: "PowerBI", category: "Data & AI", icon: "fa-solid fa-chart-column", color: "#facc15" },
    { name: "Tableau", category: "Data & AI", icon: "fa-solid fa-chart-pie", color: "#818cf8" },
    { name: "Pandas", category: "Data & AI", icon: "fa-solid fa-table", color: "#c084fc" },
    { name: "Machine Learning", category: "Data & AI", icon: "fa-solid fa-brain", color: "#fb7185" },
    { name: "TensorFlow", category: "Data & AI", icon: "fa-solid fa-diagram-project", color: "#fb923c" },

    { name: "AWS", category: "Cloud & DevOps", icon: "fa-brands fa-aws", color: "#fbbf24" },
    { name: "Docker", category: "Cloud & DevOps", icon: "fa-brands fa-docker", color: "#60a5fa" },
    { name: "Kubernetes", category: "Cloud & DevOps", icon: "fa-solid fa-server", color: "#818cf8" },
    { name: "CI/CD", category: "Cloud & DevOps", icon: "fa-solid fa-arrows-rotate", color: "#34d399" },
    { name: "Git", category: "Cloud & DevOps", icon: "fa-brands fa-git-alt", color: "#fb923c" },

    { name: "Communication", category: "Soft Skills", icon: "fa-solid fa-comments", color: "#4ade80" },
    { name: "Problem Solving", category: "Soft Skills", icon: "fa-solid fa-lightbulb", color: "#fcd34d" },
    { name: "Team Leadership", category: "Soft Skills", icon: "fa-solid fa-people-group", color: "#a5b4fc" }
];


/* =====================================
   3. Skill Dictionary
   Used to identify skills in job descriptions
===================================== */

const commonSkills = [
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "SQL",
    "Tableau",
    "PowerBI",
    "Power BI",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "CI/CD",
    "HTML5",
    "HTML",
    "CSS3",
    "CSS",
    "Tailwind CSS",
    "Pandas",
    "NumPy",
    "Scikit-Learn",
    "PyTorch",
    "TensorFlow",
    "Machine Learning",
    "Deep Learning",
    "REST APIs",
    "GraphQL",
    "Communication",
    "Problem Solving",
    "Linux",
    "Bash",
    "Excel",
    "Redux",
    "Jenkins",
    "Ansible",
    "Terraform",
    "Prometheus",
    "Grafana",
    "Data Cleaning",
    "Data Visualization",
    "NLP",
    "MLOps"
];


/* =====================================
   4. Global Variables
===================================== */

let doughnutChartInstance = null;
let categoryChartInstance = null;
let lastAnalysisResult = null;


/* =====================================
   5. Initialize Website
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    renderSkillBank();

    document
        .getElementById("job-description")
        .addEventListener("input", updateCharCounts);

    document
        .getElementById("user-skills")
        .addEventListener("input", updateCharCounts);

    loadPreset("web-dev");
});


/* =====================================
   6. Tab Switching
===================================== */

function switchTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(section => {
        section.classList.add("hidden");
    });

    document.querySelectorAll(".nav-tab").forEach(button => {
        button.classList.remove("active");
    });

    document.getElementById(`tab-${tabId}`).classList.remove("hidden");
    document.getElementById(`tab-btn-${tabId}`).classList.add("active");
}


/* =====================================
   7. Load Sample Preset
===================================== */

function loadPreset(role) {
    const preset = presets[role];

    if (!preset) return;

    document.getElementById("job-description").value = preset.jd;
    document.getElementById("user-skills").value = preset.skills;

    updateCharCounts();
    analyzeSkillGap();
}


/* =====================================
   8. Clear Inputs
===================================== */

function clearAllInputs() {
    document.getElementById("job-description").value = "";
    document.getElementById("user-skills").value = "";

    document.getElementById("results-container").classList.add("hidden");

    lastAnalysisResult = null;

    if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
        doughnutChartInstance = null;
    }

    if (categoryChartInstance) {
        categoryChartInstance.destroy();
        categoryChartInstance = null;
    }

    document.getElementById("career-recommendations").innerHTML = `
        <div class="empty-state">
            <i class="fa-solid fa-graduation-cap text-4xl mb-3"></i>
            <p>Run a Skill Gap Analysis to get career recommendations.</p>
        </div>
    `;

    updateCharCounts();
}


/* =====================================
   9. Character and Skill Counts
===================================== */

function updateCharCounts() {
    const jdText = document.getElementById("job-description").value;
    const skillsText = document.getElementById("user-skills").value;

    document.getElementById("jd-char-count").textContent =
        `${jdText.length} chars`;

    const skills = parseUserSkills(skillsText);

    document.getElementById("skills-count").textContent =
        `${skills.length} skills listed`;
}


/* =====================================
   10. Normalize and Parse User Skills
===================================== */

function normalizeSkill(skill) {
    const value = skill.trim().toLowerCase();

    const aliases = {
        "power bi": "powerbi",
        "html": "html5",
        "css": "css3"
    };

    return aliases[value] || value;
}

function parseUserSkills(text) {
    return [...new Set(
        text
            .split(/[,;\n]+/)
            .map(skill => skill.trim())
            .filter(Boolean)
    )];
}


/* =====================================
   11. Extract Skills from Job Description
===================================== */

function extractSkillsFromText(text) {
    const normalizedText = normalizeSkill(text);

    const foundSkills = commonSkills.filter(skill => {
        const normalizedName = normalizeSkill(skill);

        // Match a complete phrase or word, not a substring.
        const escaped = normalizedName.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(
            `(^|[^a-z0-9+#])${escaped}(?=$|[^a-z0-9+#])`,
            "i"
        );

        return regex.test(normalizedText);
    });

    return [...new Set(foundSkills)];
}


/* =====================================
   12. Main Skill Gap Analysis
===================================== */

function analyzeSkillGap() {
    const jdText = document
        .getElementById("job-description")
        .value.trim();

    const userSkillsText = document
        .getElementById("user-skills")
        .value.trim();

    if (!jdText) {
        alert("Please enter a Job Description first!");
        return;
    }

    if (!userSkillsText) {
        alert("Please enter your skills first!");
        return;
    }

    const jobSkills = extractSkillsFromText(jdText);
    const userSkills = parseUserSkills(userSkillsText);

    if (jobSkills.length === 0) {
        alert(
            "No recognized skills found. Try a job description containing skills such as Python, SQL, Excel or React."
        );
        return;
    }

    const normalizedUserSkills = userSkills.map(normalizeSkill);

    const matched = [];
    const missing = [];

    jobSkills.forEach(skill => {
        const normalizedJD = normalizeSkill(skill);

        const isMatched = normalizedUserSkills.some(userSkill => {
            return userSkill === normalizedJD;
        });

        if (isMatched) {
            matched.push(skill);
        } else {
            missing.push(skill);
        }
    });

    const total = jobSkills.length;

    const score = Math.round(
        (matched.length / total) * 100
    );

    // Display result section
    document.getElementById("results-container").classList.remove("hidden");

    document.getElementById("match-score-text").textContent =
        `${score}%`;

    document.getElementById("matched-count-text").textContent =
        matched.length;

    document.getElementById("missing-count-text").textContent =
        missing.length;

    // Readiness tier
    let tier;

    if (score >= 80) {
        tier = "High Match";
    } else if (score >= 50) {
        tier = "Moderate Match";
    } else {
        tier = "Significant Skill Gap";
    }

    document.getElementById("readiness-tier").textContent = tier;

    // Render details
    renderTags("matched-tags", matched, "matched");
    renderTags("missing-tags", missing, "missing");

    renderCharts(matched, missing);

    lastAnalysisResult = {
        score,
        matched,
        missing,
        total
    };

    updateCareerTab(lastAnalysisResult);
}


/* =====================================
   13. Render Matched/Missing Tags
===================================== */

function renderTags(elementId, items, type) {
    const container = document.getElementById(elementId);

    container.replaceChildren();

    if (items.length === 0) {
        const message = document.createElement("span");
        message.className = "muted-message";
        message.textContent = "None identified";
        container.appendChild(message);
        return;
    }

    items.forEach(item => {
        const tag = document.createElement("span");

        tag.className = `skill-tag ${type}`;

        const icon = document.createElement("i");

        icon.className = type === "matched"
            ? "fa-solid fa-check"
            : "fa-solid fa-plus";

        const label = document.createElement("span");
        label.textContent = item;

        tag.append(icon, label);
        container.appendChild(tag);
    });
}


/* =====================================
   14. Render Charts with Chart.js
===================================== */

function renderCharts(matched, missing) {
    const doughnutCanvas = document.getElementById("matchDoughnutChart");
    const categoryCanvas = document.getElementById("skillCategoryChart");

    if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
    }

    if (categoryChartInstance) {
        categoryChartInstance.destroy();
    }

    // Doughnut chart
    doughnutChartInstance = new Chart(doughnutCanvas, {
        type: "doughnut",

        data: {
            labels: ["Matched Skills", "Missing Skills"],

            datasets: [{
                data: [matched.length, missing.length],
                backgroundColor: ["#10b981", "#f43f5e"],
                borderWidth: 0,
                hoverOffset: 6
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom",

                    labels: {
                        color: "#cbd5e1",
                        padding: 18
                    }
                }
            },

            cutout: "68%"
        }
    });

    // Category chart based on the actual extracted skills
    const categories = [
        {
            label: "Programming",
            skills: ["Python", "JavaScript", "TypeScript", "HTML5", "HTML", "CSS3", "CSS"]
        },
        {
            label: "Data & AI",
            skills: ["SQL", "Excel", "PowerBI", "Power BI", "Tableau", "Pandas", "NumPy", "Machine Learning", "Deep Learning", "Scikit-Learn", "TensorFlow", "PyTorch", "NLP", "MLOps", "Data Cleaning", "Data Visualization"]
        },
        {
            label: "Frameworks & APIs",
            skills: ["React", "Node.js", "Tailwind CSS", "REST APIs", "GraphQL", "Redux"]
        },
        {
            label: "Cloud & Tools",
            skills: ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Linux", "Bash", "Jenkins", "Ansible", "Terraform", "Prometheus", "Grafana"]
        },
        {
            label: "Soft Skills",
            skills: ["Communication", "Problem Solving"]
        }
    ];

    const categoryMatched = [];
    const categoryMissing = [];

    categories.forEach(category => {
        const categoryNames = category.skills.map(normalizeSkill);

        categoryMatched.push(
            matched.filter(skill =>
                categoryNames.includes(normalizeSkill(skill))
            ).length
        );

        categoryMissing.push(
            missing.filter(skill =>
                categoryNames.includes(normalizeSkill(skill))
            ).length
        );
    });

    categoryChartInstance = new Chart(categoryCanvas, {
        type: "bar",

        data: {
            labels: categories.map(category => category.label),

            datasets: [
                {
                    label: "Matched",
                    data: categoryMatched,
                    backgroundColor: "#3b82f6"
                },
                {
                    label: "Missing",
                    data: categoryMissing,
                    backgroundColor: "#64748b"
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                x: {
                    ticks: {
                        color: "#cbd5e1"
                    },
                    grid: {
                        display: false
                    }
                },

                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#cbd5e1",
                        precision: 0
                    },
                    grid: {
                        color: "rgba(255,255,255,0.08)"
                    }
                }
            },

            plugins: {
                legend: {
                    labels: {
                        color: "#cbd5e1"
                    }
                }
            }
        }
    });
}


/* =====================================
   15. Render Skill Bank
===================================== */

function renderSkillBank() {
    const grid = document.getElementById("skill-bank-grid");

    grid.replaceChildren();

    skillDatabase.forEach(skill => {
        const card = document.createElement("div");

        card.className = "skill-card";
        card.dataset.name = skill.name.toLowerCase();
        card.dataset.category = skill.category;

        const info = document.createElement("div");
        info.className = "flex items-center gap-3";

        const iconBox = document.createElement("div");
        iconBox.className = "skill-icon";

        const icon = document.createElement("i");
        icon.className = skill.icon;
        icon.style.color = skill.color;

        iconBox.appendChild(icon);

        const textBox = document.createElement("div");

        const name = document.createElement("h4");
        name.textContent = skill.name;

        const category = document.createElement("p");
        category.textContent = skill.category;

        textBox.append(name, category);
        info.append(iconBox, textBox);

        const addButton = document.createElement("button");

        addButton.className = "add-skill-btn";
        addButton.title = `Add ${skill.name} to your profile`;
        addButton.setAttribute("aria-label", `Add ${skill.name}`);

        const plusIcon = document.createElement("i");
        plusIcon.className = "fa-solid fa-plus";

        addButton.appendChild(plusIcon);

        addButton.addEventListener("click", () => {
            addSkillToUser(skill.name);
        });

        card.append(info, addButton);
        grid.appendChild(card);
    });
}


/* =====================================
   16. Search and Filter Skill Bank
===================================== */

function filterSkillBank() {
    const query = document
        .getElementById("skill-search")
        .value.trim()
        .toLowerCase();

    const category = document
        .getElementById("skill-category-select")
        .value;

    document.querySelectorAll(".skill-card").forEach(card => {
        const name = card.dataset.name;
        const skillCategory = card.dataset.category;

        const matchesQuery = name.includes(query);

        const matchesCategory =
            category === "all" || skillCategory === category;

        card.classList.toggle(
            "hidden",
            !(matchesQuery && matchesCategory)
        );
    });
}


/* =====================================
   17. Add Skill to User Profile
===================================== */

function addSkillToUser(skillName) {
    const textarea = document.getElementById("user-skills");

    const existingSkills = parseUserSkills(textarea.value);

    const alreadyExists = existingSkills.some(skill =>
        normalizeSkill(skill) === normalizeSkill(skillName)
    );

    if (alreadyExists) {
        alert(`${skillName} is already in your skills list.`);
        return;
    }

    existingSkills.push(skillName);

    textarea.value = existingSkills.join(", ");

    updateCharCounts();

    switchTab("analyzer");

    textarea.focus();
}


/* =====================================
   18. Career Recommendations
===================================== */

function updateCareerTab(result) {
    const container = document.getElementById("career-recommendations");

    container.replaceChildren();

    if (!result) return;

    const priorities = document.createElement("div");
    priorities.className = "recommendation-card";

    const priorityTitle = document.createElement("h4");
    priorityTitle.innerHTML =
        '<i class="fa-solid fa-lightbulb text-amber-400"></i> Learning Priorities';

    const priorityDescription = document.createElement("p");
    priorityDescription.className = "text-sm text-slate-300 mb-3";
    priorityDescription.textContent = result.missing.length
        ? "Focus on these missing skills first:"
        : "All recognized skills in this job description are matched. Review your proficiency and practical experience.";

    priorities.append(priorityTitle, priorityDescription);

    if (result.missing.length) {
        const list = document.createElement("div");
        list.className = "flex flex-wrap gap-2";

        result.missing.forEach(skill => {
            const tag = document.createElement("span");

            tag.className =
                "px-3 py-1 text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-lg";

            tag.textContent = skill;
            list.appendChild(tag);
        });

        priorities.appendChild(list);
    }

    const interview = document.createElement("div");
    interview.className = "recommendation-card";

    const interviewTitle = document.createElement("h4");
    interviewTitle.innerHTML =
        '<i class="fa-solid fa-comments text-blue-400"></i> Interview Preparation';

    const interviewList = document.createElement("ul");

    const firstPoint = document.createElement("li");
    firstPoint.textContent = result.matched.length
        ? `Prepare examples demonstrating your skills in ${result.matched.slice(0, 3).join(", ")}.`
        : "Review the core skills required for this role and build a small practice project.";

    const secondPoint = document.createElement("li");
    secondPoint.textContent = result.missing.length
        ? `Start learning ${result.missing.slice(0, 3).join(", ")} through practical exercises.`
        : "Prepare project examples and practice explaining your problem-solving approach.";

    const thirdPoint = document.createElement("li");
    thirdPoint.textContent =
        `Your keyword match score is ${result.score}%. Verify that your resume accurately reflects your actual experience.`;

    interviewList.append(firstPoint, secondPoint, thirdPoint);

    interview.append(interviewTitle, interviewList);

    container.append(priorities, interview);
}
