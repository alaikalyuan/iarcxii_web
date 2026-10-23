import { CompetitionDivision } from "@/types";

export function buildCompetitionsEn(base: CompetitionDivision[]): CompetitionDivision[] {
  return [
  {
    ...base[0],
    tagline: "Applied IoT Innovation and High-Precision Industrial Automation",
    description:
      "An automation engineering competition divided into two main tracks: microcontroller-based Internet of Things system design and PLC-based industrial automation logic following Omron and Haiwell industrial standards.",
    scoringRubric: [
      { criterion: "System Architecture & Engineering Feasibility", weight: "30 Points", note: "Electrical circuit safety, modular sensor layout, and physical construction quality." },
      { criterion: "Software Logic & Code Structure", weight: "30 Points", note: "Clarity of firmware source code, efficient loops, and responsive cloud communication." },
      { criterion: "Innovation & Alignment with Focus Themes", weight: "25 Points", note: "Alignment with ITS Research Study Centers and originality of problem-solving solutions." },
      { criterion: "Presentation & Technical Defense", weight: "15 Points", note: "Clarity of verbal presentation and technical depth during jury Q&A." },
    ],
    stages: [
      { name: "Team Registration", date: "Sep - Nov 2026", description: "Online team registration and guidebook download" },
      { name: "Proposal / Ladder Submission", date: "Dec 11, 2026", description: "Submission deadline for IoT technical proposals or CX-Programmer logic" },
      { name: "Finalist Announcement", date: "Dec 16 - 30, 2026", description: "Announcement of top finalist teams qualifying for the offline ITS round" },
      { name: "Offline Final & Expo", date: "Jan 9 - 10, 2027", description: "On-site prototype defense, live CX-Programmer PLC wiring, and awards ceremony at ITS" },
    ],
    tracks: [
      {
        ...base[0].tracks[0],
        name: "Track 1: Microcontroller (IoT)",
        tagline: "Smart Solutions Design Based on IoT & Sensors",
        description:
          "Participants design smart automation systems using microcontrollers addressing 3 ITS Study Centers: Renewable Energy, Disaster Mitigation & Climate Change, or Appropriate Technology.",
        hardwareSpecs: [
          "Open to any microcontroller platform (ESP32, ESP8266, STM32, Arduino, Raspberry Pi Pico)",
          "Prototype component budget cap of max IDR 500,000 accompanied by an official budget plan (RAB)",
          "Must feature active IoT connectivity (Wi-Fi, Bluetooth, LoRa, or MQTT)",
          "Safe circuit design with overcurrent and reverse-polarity voltage protection",
        ],
        softwareSpecs: [
          "Open cloud/dashboard platform (Blynk, ThingsBoard, Antares, or custom web server)",
          "Structured source code documentation with Git repository link or proposal appendix",
        ],
        categories: [
          {
            ...base[0].tracks[0].categories[0],
            name: "Elementary / Equivalent (Beginner)",
            teamRequirement: "Maximum 3 students plus 1 advisory teacher from the same school",
            highlights: [
              "Introductory sensor logic and automated actuators",
              "Concept proposal submission and video explanation",
              "Top 5 teams invited to the offline final stage at ITS",
            ],
            stages: [
              {
                name: "Preliminary Round (Online)",
                date: "Submission Dec 11, 2026",
                description: "Case study selection, microcontroller proposal submission, and concept video upload. Top 5 teams advance to finals.",
              },
              {
                name: "Final Technical Meeting",
                date: "Dec 18, 2026",
                description: "Online Zoom briefing for the 5 finalist teams regarding final round rules.",
              },
              {
                name: "Final Round: Day 1 Bootcamp",
                date: "Jan 9, 2027",
                description: "Onsite mentoring and final prototype assembly at ITS campus.",
              },
              {
                name: "Final Round: Day 2 Expo & Defense",
                date: "Jan 10, 2027",
                description: "Live prototype demonstration and jury defense followed by awarding.",
              },
            ],
            scoringCriteria: [
              { criterion: "Innovation", weight: "35%", note: "Novelty of concept, solution creativity, and originality." },
              { criterion: "Explanatory Video", weight: "25%", note: "Clarity in conveying device functionality and practical value." },
              { criterion: "Theme Alignment", weight: "20%", note: "Relevance to selected ITS Research Center focus areas." },
              { criterion: "Impact & Sustainability", weight: "15%", note: "Practical benefit for community and environmental welfare." },
              { criterion: "Format Compliance", weight: "10%", note: "Adherence to guidebook proposal formatting requirements." },
            ],
          },
          {
            ...base[0].tracks[0].categories[1],
            name: "Junior High / Equivalent (Junior)",
            teamRequirement: "Maximum 3 students plus 1 advisory teacher from the same school",
            highlights: [
              "Sensor data telemetry and automated actuator control",
              "Direct alignment with 1 of 3 ITS Research Study Centers",
              "Top 5 teams advance to the live prototype demonstration at ITS",
            ],
            stages: [
              {
                name: "Preliminary Round (Online)",
                date: "Submission Dec 11, 2026",
                description: "Case study proposal and video submission explaining the concept. Top 5 teams advance to finals.",
              },
              {
                name: "Final Technical Meeting",
                date: "Dec 18, 2026",
                description: "Online Zoom briefing for finalists covering prototype guidelines and flux limitations.",
              },
              {
                name: "Offline Final Round",
                date: "Jan 9 - 10, 2027",
                description: "Prototype physical realization with max 75 Flux Points, followed by defense presentation before the jury.",
              },
            ],
            scoringCriteria: [
              { criterion: "Innovation", weight: "30%", note: "Novelty of idea, creative problem solving, and originality." },
              { criterion: "Explanatory Video", weight: "25%", note: "Ability to explain ideas and their relation to the chosen theme." },
              { criterion: "Theme Alignment", weight: "20%", note: "Alignment with theme targets and real contribution to global or national issues." },
              { criterion: "Impact & Sustainability", weight: "15%", note: "Potential benefits for society, environment, or industry." },
              { criterion: "Format Compliance", weight: "10%", note: "Adherence to guidebook layout and formatting rules." },
            ],
          },
          {
            ...base[0].tracks[0].categories[2],
            name: "Senior High / Vocational (Senior)",
            teamRequirement: "Maximum 3 students plus 1 advisory teacher from the same school",
            highlights: [
              "Advanced telemetry IoT dashboard and automated control",
              "Component budget cap with strict Bill of Materials (RAB)",
              "Interactive exhibition booth and technical defense at ITS Hall",
            ],
            stages: [
              {
                name: "Preliminary Round (Online)",
                date: "Deadline Dec 11, 2026",
                description: "Case study selection, proposal submission, and video explanation. Top 5 teams advance to finals.",
              },
              {
                name: "Technical Meeting",
                date: "Dec 18, 2026",
                description: "Online briefing via Zoom detailing final round procedures and presentation mechanics.",
              },
              {
                name: "Final Round (Offline ITS)",
                date: "Jan 9 - 10, 2027",
                description: "Prototype hardware demonstration, exhibition booth showcase, and jury defense session.",
              },
            ],
            scoringCriteria: [
              { criterion: "Innovation", weight: "30%", note: "Idea novelty, engineering creativity, and proposal originality." },
              { criterion: "Relation to the Theme", weight: "20%", note: "Alignment with focus study areas and problem urgency." },
              { criterion: "Impact & Sustainability", weight: "20%", note: "Long-term societal and environmental impact." },
              { criterion: "Creative Video", weight: "20%", note: "Clarity in conveying engineering mechanisms and system workflow." },
              { criterion: "Format Compliance", weight: "10%", note: "Compliance with formatting and documentation guidelines." },
            ],
          },
          {
            ...base[0].tracks[0].categories[3],
            name: "University & College (National & International)",
            teamRequirement: "Maximum 3 active undergraduate/diploma students plus 1 faculty advisor",
            highlights: [
              "Industrial-grade IoT telemetry and intelligent edge automation",
              "Public exhibition booth and presentation before academic and industrial judges",
              "Open to national and international higher education teams",
            ],
            stages: [
              {
                name: "Preliminary Round (Online)",
                date: "Deadline Dec 11, 2026",
                description: "Case study selection, submission of advanced microcontroller engineering proposal, and explanatory video. Top 10 teams advance to finals.",
              },
              {
                name: "Technical Meeting",
                date: "Dec 18, 2026",
                description: "Online briefing via Zoom detailing final round procedures, exhibition booth guidelines, and evaluation rubrics.",
              },
              {
                name: "Final Round (Offline ITS)",
                date: "Jan 9 - 10, 2027",
                description: "Fabrication of working physical prototype, interactive booth exhibition with X-Banner, and on-site technical demonstration with jury panel.",
              },
            ],
            scoringCriteria: [
              { criterion: "Innovation", weight: "30%", note: "The level of novelty of the idea, creativity of the solution, and originality of the proposal." },
              { criterion: "Relation to the Theme", weight: "20%", note: "The alignment of the proposal with sustainable living objectives and its tangible contribution." },
              { criterion: "Impact & Sustainability", weight: "20%", note: "The proposal potential benefits for society, the environment, or industry, as well as opportunities for long-term sustainability." },
              { criterion: "Creative Video", weight: "20%", note: "Ability to explain ideas and their connection to the chosen theme." },
              { criterion: "Format Compliance", weight: "10%", note: "Adherence to writing procedures and formatting, structural organization, and correct language according to guidelines." },
            ],
          },
        ],
      },
      {
        ...base[0].tracks[1],
        name: "Track 2: PLC (Programmable Logic Controller)",
        tagline: "Industrial Control Logic with Omron CX-Programmer & Haiwell HMI",
        description:
          "Participants resolve industrial manufacturing automation case studies using ladder logic and SCADA/HMI visual interface design with official hardware modules.",
        hardwareSpecs: [
          "Official OMRON CP2E-N PLC Trainer Module provided on-site at ITS",
          "Official Haiwell B7-H/W HMI Device provided on-site at ITS",
          "Direct industrial Ethernet cable communication to PLC trainer kits",
        ],
        softwareSpecs: [
          "OMRON CX-Programmer (CX-One Suite) for CP2E-N ladder logic",
          "Haiwell Cloud SCADA Designer for HMI visual interface design",
          "CX-Simulator for self-testing during online preliminary rounds",
        ],
        categories: [
          {
            ...base[0].tracks[1].categories[0],
            name: "Senior High / Vocational (Senior)",
            teamRequirement: "Exactly 2 active students from the same high school or vocational school",
            highlights: [
              "Ladder diagram design with CX-Programmer for Omron CP2E-N",
              "Timed problem sets reflecting automated factory packaging",
              "Top 10 teams advance to the live trainer final round at ITS",
            ],
            stages: [
              {
                name: "Online Technical Meeting",
                date: "Dec 20, 2026",
                description: "Briefing on rules, CX-Programmer simulation setups, and live Zoom screening procedures.",
              },
              {
                name: "Online Preliminary Round",
                date: "Dec 26, 2026",
                description: "Live Zoom session: timer-based ladder diagram design for industrial case studies. Top 10 teams qualify.",
              },
              {
                name: "Final Technical Meeting",
                date: "Jan 3, 2027",
                description: "Technical briefing for finalists regarding the physical Omron CP2E-N trainer hardware.",
              },
              {
                name: "Offline Final Round (ITS)",
                date: "Jan 9 - 10, 2027",
                description: "Direct wiring and ladder programming on physical PLC trainer kits and Haiwell HMI in Surabaya.",
              },
            ],
            scoringCriteria: [
              { criterion: "System Functionality & Ladder Accuracy", weight: "50%", note: "Logic accuracy matching timing charts and state transitions." },
              { criterion: "Program Structure & Safety Logic", weight: "25%", note: "Interlocking, emergency stop handling, and code readability." },
              { criterion: "Execution Speed & Completion Time", weight: "25%", note: "Time taken to complete and successfully verify the industrial sequence." },
            ],
          },
          {
            ...base[0].tracks[1].categories[1],
            name: "University & College (Undergraduate)",
            teamRequirement: "Exactly 2 active undergraduate/diploma students from the same university",
            highlights: [
              "Comprehensive factory automation logic and Haiwell HMI integration",
              "Ethernet IP/Modbus TCP communication between PLC and HMI screen",
              "Intense live final on physical industrial trainer modules at ITS",
            ],
            stages: [
              {
                name: "Preliminary Round Technical Meeting",
                date: "Dec 20, 2026",
                description: "Explanation of online preliminary exam rules, CX-Programmer setup, and Zoom monitoring rules.",
              },
              {
                name: "Online Preliminary Round",
                date: "Dec 27, 2026",
                description: "Live ladder logic coding on Zoom under proctored conditions. Top 10 teams advance.",
              },
              {
                name: "Final Technical Meeting",
                date: "Jan 3, 2027",
                description: "Briefing covering Omron CP2E-N hardware I/O layout and Haiwell B7-H/W HMI configuration.",
              },
              {
                name: "Offline Finals (ITS Surabaya)",
                date: "Jan 9 - 10, 2027",
                description: "Complex manufacturing case study: ladder programming and dynamic HMI screen design on physical modules.",
              },
            ],
            scoringCriteria: [
              { criterion: "PLC Logic & System Functionality", weight: "40%", note: "Total compliance with automated sequence and condition tables." },
              { criterion: "HMI Design & SCADA Usability", weight: "30%", note: "Intuitive operator screens, alarm indicators, and tag mapping." },
              { criterion: "Safety Interlocks & Robustness", weight: "15%", note: "Emergency stop handling and fault tolerance." },
              { criterion: "Completion Speed", weight: "15%", note: "Speed of program completion and error-free commissioning." },
            ],
          },
        ],
      },
    ],
  },
  {
    ...base[1],
    tagline: "Autonomous Track Speed and Precision Object Manipulation",
    description:
      "An autonomous line follower obstacle course robotics competition, ranging from block algorithms for beginners to an advanced Dual-Robot system (Autonomous Line Follower + Shooter Robot) for university undergraduates.",
    scoringRubric: [
      { criterion: "Track Completion Time (Speed & Agility)", weight: "40 Points", note: "Cumulative time taken by the robot to clear all track checkpoints." },
      { criterion: "Object Manipulation Mission Success", weight: "35 Points", note: "Precision in gripper clamping and target cube launching." },
      { criterion: "Dimension & Electrical Compliance", weight: "15 Points", note: "Verification of robot dimensions, battery voltage limits, and mechanical safety." },
      { criterion: "Retrials & Touch Penalties", weight: "10 Points", note: "Point deductions if the robot leaves the track or is manually reset." },
    ],
    stages: [
      { name: "Team Registration", date: "Sep - Dec 2026", description: "Online registration and download of official digital track layouts" },
      { name: "Technical Meeting", date: "Dec 20, 2026", description: "Briefing on preliminary rules and online sensor calibration" },
      { name: "Online Preliminaries", date: "Dec 26 - 27, 2026", description: "Upload of unedited robot run videos on the standardized test arena" },
      { name: "Offline Final Race", date: "Jan 9 - 10, 2027", description: "Head-to-head elimination tournament in the DTEO ITS Hall" },
    ],
    tracks: [
      {
        ...base[1].tracks[0],
        name: "Autonomous Robotics Track",
        tagline: "High-Speed Line Navigation & Precision Mechanical Missions",
        description:
          "Robots navigate white lines on dark tracks, crossing intersections, bridges, and ramps, while completing specialized missions such as moving or shooting targets.",
        hardwareSpecs: [
          "Elementary: Arduino / Ardublock visual block-based line follower robot",
          "Junior High: Microcontroller-based line follower with photodiode / optical sensor array",
          "Senior High: Line follower equipped with motorized gripper mechanism (max 25x20x25 cm)",
          "University: Dual-robot system (R1 Autonomous Line Follower + R2 Shooter Robot)",
        ],
        softwareSpecs: [
          "Autonomous PID line tracing algorithm without external wireless control (fully autonomous)",
          "Official digital track layout available at https://its.id/m/SmartRoboticsOnline",
        ],
        categories: [
          {
            ...base[1].tracks[0].categories[0],
            name: "Elementary / Equivalent",
            teamRequirement: "Maximum 3 students plus 1 advisory teacher",
            highlights: [
              "Introductory line follower based on graphical interface or microcontroller",
              "Mission to push obstacle objects out of point zones",
              "Pool group stage of 4 teams per pool with 20 minutes preparation time",
            ],
            stages: [
              { name: "Day 1: Group Stage & Rising Stage", date: "Day 1", description: "Group matches of 4 teams per pool, followed by Rising Stage matches for knockout spots." },
              { name: "Day 1: Knockout Stage", date: "Day 1", description: "Knockout matches among qualifying teams to determine Day 2 advancing finalists." },
              { name: "Day 2: Top 8, Semifinals & Finals", date: "Day 2", description: "1 vs 1 single elimination from Top 8 through Grand Final race." },
            ],
            scoringCriteria: [
              { criterion: "Punctuality & Orderly Start", weight: "50%", note: "Team timeliness and orderly robot start upon referee signal." },
              { criterion: "Track Navigation & Finish", weight: "50%", note: "Smooth line navigation and successful finish line crossing." },
              { criterion: "Mission Object Bonus", weight: "Bonus Points", note: "Points for placing objects: Round 1 (+10 pt), Round 2 (+30 pt), Hexagon (+50 pt)." },
              { criterion: "Violation Penalties", weight: "Deduction", note: "False start (-5 pts) and touching robot without permission (-10 pts)." },
            ],
          },
          {
            ...base[1].tracks[0].categories[1],
            name: "Junior High / Equivalent",
            teamRequirement: "Maximum 3 students plus 1 advisory teacher",
            highlights: [
              "Intermediate obstacle track with bridges, crossings, and ramps",
              "Autonomous obstacle clearing and precision line tracking",
              "Live elimination tournament at ITS Hall",
            ],
            stages: [
              { name: "Day 1: Group Stage", date: "Day 1", description: "Round robin group stage matches to determine leaderboard ranking." },
              { name: "Day 2: Elimination Rounds", date: "Day 2", description: "Direct head-to-head knockout tournament leading to the final podium." },
            ],
            scoringCriteria: [
              { criterion: "Navigation Speed", weight: "40%", note: "Fastest completion time across all track segments." },
              { criterion: "Checkpoint Completion", weight: "40%", note: "Accuracy in clearing obstacles without derailment." },
              { criterion: "Penalty Deductions", weight: "20%", note: "Deductions for sensor line loss or track resets." },
            ],
          },
          {
            ...base[1].tracks[0].categories[2],
            name: "Senior High / Vocational",
            teamRequirement: "Maximum 3 students plus 1 advisory teacher",
            highlights: [
              "Autonomous line follower with integrated mechanical gripper",
              "Pick-and-place precision cube placement in target boxes",
              "Strict dimensional and electrical inspection before matches",
            ],
            stages: [
              { name: "Day 1: Qualifying Rounds", date: "Day 1", description: "Initial seeded heats across the standardized competition arena." },
              { name: "Day 2: Finals & Awarding", date: "Day 2", description: "Championship bracket matches and award ceremony." },
            ],
            scoringCriteria: [
              { criterion: "Gripper Mission Accuracy", weight: "45%", note: "Precise picking and placement of target payload." },
              { criterion: "Track Speed", weight: "35%", note: "Overall elapsed time through the course." },
              { criterion: "Technical Compliance", weight: "20%", note: "Weight, dimensions, and battery voltage regulation." },
            ],
          },
          {
            ...base[1].tracks[0].categories[3],
            name: "University & College (Undergraduate)",
            teamRequirement: "Maximum 3 undergraduate/diploma students plus 1 advisor",
            highlights: [
              "Advanced Dual-Robot system: R1 Line Follower + R2 Shooter Robot",
              "Tactical coordination between autonomous navigation and projectile launching",
              "Premier robotics showdown at ITS Surabaya",
            ],
            stages: [
              { name: "Day 1: Battle Heats", date: "Day 1", description: "Dual-robot coordination heats on the dual arena." },
              { name: "Day 2: Grand Finals", date: "Day 2", description: "High-intensity head-to-head championship matches." },
            ],
            scoringCriteria: [
              { criterion: "Autonomous Line Navigation (R1)", weight: "35%", note: "Speed and agility of the lead line follower robot." },
              { criterion: "Target Shooting Precision (R2)", weight: "45%", note: "Successful hits into target bowls and enemy zones." },
              { criterion: "Coordination & Rules", weight: "20%", note: "Seamless inter-robot cooperation and penalty avoidance." },
            ],
          },
        ],
      },
    ],
  },
  {
    ...base[2],
    tagline: "Intelligent Maze-Solving Navigation with Optimal Power Consumption",
    description:
      "A unique robotics challenge where an autonomous line follower robot must navigate an undisclosed random maze efficiently while conserving electrical energy.",
    scoringRubric: [
      { criterion: "Maze Exit Discovery Success", weight: "40 Points", note: "Robot successfully identifies the exit without infinite loops or dead ends." },
      { criterion: "Energy Consumption Efficiency (mAh/Watt)", weight: "30 Points", note: "Measured power consumption ratio per distance traveled." },
      { criterion: "Shortest Path Runtime", weight: "20 Points", note: "Speed of the robot during its optimized second run after initial maze mapping." },
      { criterion: "Algorithm Originality", weight: "10 Points", note: "Evaluation of the team maze-solving logic and algorithm structure." },
    ],
    stages: [
      { name: "Registration", date: "Sep - Dec 2026", description: "Team registration through official online forms" },
      { name: "Technical Meeting", date: "Dec 20, 2026", description: "Briefing on dimensions, sensor tolerances, and maze parameters" },
      { name: "Online Preliminaries", date: "Dec 26 - 27, 2026", description: "Pre-qualification maze-solving runs" },
      { name: "On-Site Programming & Finals", date: "Jan 9 - 10, 2027", description: "On-site programming on the undisclosed secret maze layout at ITS" },
    ],
    tracks: [
      {
        ...base[2].tracks[0],
        name: "Autonomous Maze Solver Track",
        tagline: "Autonomous Maze Mapping & Power Efficiency",
        description:
          "Robots are tested on their ability to read maze intersections, map the shortest path, and minimize milliampere power consumption.",
        hardwareSpecs: [
          "Autonomous line follower with ultrasonic or optical wall/distance sensors",
          "Must include power telemetry indicator and manual emergency cutoff switch",
        ],
        softwareSpecs: [
          "Autonomous maze solving algorithm (e.g. Wall Following, Tremaux, or Flood-fill)",
          "Wireless external remote controls are strictly prohibited",
        ],
        categories: [
          {
            ...base[2].tracks[0].categories[0],
            name: "Senior High / Vocational",
            teamRequirement: "Maximum 3 students plus 1 advisory teacher",
            highlights: [
              "3 progressive stages: Pre-qualification, Route Qualification, and Secret Maze Onsite",
              "Secret maze arena revealed on event day",
              "Combined evaluation of speed and power consumption resistance",
            ],
            stages: [
              { name: "Stage 1: Pre-Qualification", date: "Day 1", description: "Baseline testing on the initial track to establish seedings." },
              { name: "Stage 2: On-Site Programming", date: "Day 1 / 2", description: "Secret track revealed on event day; runtime and power monitoring commence." },
              { name: "Stage 3: Final Run", date: "Day 2", description: "Final track configuration; accumulated scores decide champions." },
            ],
            scoringCriteria: [
              { criterion: "Track Runtime", weight: "50%", note: "Time score based on remaining countdown time vs total time." },
              { criterion: "Energy Efficiency", weight: "50%", note: "Power score based on consumed vs maximum allowed energy." },
            ],
          },
          {
            ...base[2].tracks[0].categories[1],
            name: "University & College (Undergraduate)",
            teamRequirement: "Maximum 3 active undergraduate/diploma students plus 1 advisor",
            highlights: [
              "High-complexity maze grid with dynamic junction loops",
              "Deep algorithmic evaluation of flood-fill and path optimization",
              "Strict milliampere telemetry monitoring during final runs",
            ],
            stages: [
              { name: "Stage 1: Seeding Runs", date: "Day 1", description: "Initial maze runs establishing tournament bracket seeds." },
              { name: "Stage 2: Algorithmic Challenge", date: "Day 1 / 2", description: "On-site programming on secret complex maze configurations." },
              { name: "Stage 3: Championship Defense", date: "Day 2", description: "Final run with power monitoring and jury evaluation." },
            ],
            scoringCriteria: [
              { criterion: "Elapsed Runtime", weight: "50%", note: "Shortest route traversal time." },
              { criterion: "Milliampere Power Efficiency", weight: "50%", note: "Measured energy consumption per run." },
            ],
          },
        ],
      },
    ],
  },
  {
    ...base[3],
    tagline: "Future Innovative Ideas & Strategic National Research Solutions",
    description:
      "A scientific paper competition challenging the critical thinking of youth to develop conceptual ideas and applied engineering solutions for real-world industry and societal needs.",
    scoringRubric: [
      { criterion: "Case Analysis & Solution Relevance", weight: "30 Points", note: "Depth of problem identification and correlation with proposed technology." },
      { criterion: "Implementation Feasibility & Prototype", weight: "30 Points", note: "Technical analysis, implementation costs, and real-world deployment viability." },
      { criterion: "Idea Originality & Similarity Index", weight: "20 Points", note: "Novelty of proposal with Turnitin similarity index below 20%." },
      { criterion: "Structure, Grammar & Formatting", weight: "20 Points", note: "Compliance with academic writing conventions and presentation cleanliness." },
    ],
    stages: [
      { name: "Team Registration", date: "Sep - Nov 2026", description: "Official team registration and participant portal access" },
      { name: "Manuscript Submission Deadline", date: "Dec 11, 2026", description: "Final deadline for uploading complete scientific paper documents" },
      { name: "Finalist Announcement", date: "Dec 16, 2026", description: "Publication of top selected papers qualifying for oral defense" },
      { name: "Final Defense Presentation", date: "Jan 9 - 10, 2027", description: "Presentation and defense before expert jury panel at ITS campus" },
    ],
    tracks: [
      {
        ...base[3].tracks[0],
        name: "Scientific Paper & Innovation Track",
        tagline: "Scientific Papers & Applied Engineering Prototypes",
        description:
          "Divided into two competition approaches: Vortex Idea Challenge (open exploration of visionary ideas) and Vortex Innovation Challenge (applied research tackling ITS strategic challenges).",
        hardwareSpecs: [
          "Open to supporting physical prototypes or CAD/CAE software simulations",
          "Paper must be original with Turnitin similarity index below 20%",
        ],
        softwareSpecs: [
          "Scientific paper formatted according to official Vortex guidebook template",
          "Visual slides formatted in professional presentation slide decks",
        ],
        categories: [
          {
            ...base[3].tracks[0].categories[0],
            name: "Senior High / Vocational",
            teamRequirement: "1 to 3 active students from the same school",
            highlights: [
              "Focus on applied innovations in energy, environment, and technology",
              "Evaluation: Originality (35%), Relevance (20%), Structure (15%)",
              "Top papers advance to oral presentation sessions before judges",
            ],
            stages: [
              { name: "Preliminary Round (Online)", date: "Submission Deadline", description: "Select 1 of 4 sub-themes and submit scientific proposal in PDF. Top 10 advance." },
              { name: "Final: Vortex Idea Challenge", date: "Offline ITS", description: "Solve a new on-the-spot case study in 120 min, followed by a 3-Minute Thesis (3MT) pitch." },
              { name: "Final: Vortex Innovation Challenge", date: "Offline ITS", description: "Exhibition booth setup, live prototype demonstration, and jury Q&A." },
            ],
            scoringCriteria: [
              { criterion: "Preliminary: Idea Challenge", weight: "100 Points", note: "Originality (35%), Relevance (20%), Feasibility (20%), Structure (15%), Format (10%)." },
              { criterion: "Preliminary: Innovation Challenge", weight: "100 Points", note: "Problem Urgency (30%), Solution (30%), Methodology (15%), Originality (15%), Format (10%)." },
              { criterion: "Final: Idea Challenge (3MT)", weight: "100 Points", note: "Spontaneity (25%), Verbal Communication (25%), Jury Q&A (25%), Concept (20%), Rules (5%)." },
              { criterion: "Final: Innovation Challenge (Booth)", weight: "100 Points", note: "Problem Urgency (30%), Verbal Presentation (25%), Q&A (25%), Prototype (15%), Rules (5%)." },
            ],
          },
          {
            ...base[3].tracks[0].categories[1],
            name: "University & College (National & International)",
            teamRequirement: "1 to 3 active undergraduate/diploma students from the same university",
            highlights: [
              "Tackling problem statements from 4 ITS flagship research areas",
              "Sharp case analysis (30%), Feasibility & Prototype (30%), Originality (15%)",
              "Academic presentation before ITS faculty examination panel",
            ],
            stages: [
              { name: "Preliminary Stage (Online)", date: "Submission Period", description: "Select 1 of 4 case topics, submit research paper in PDF. Top 10 advance to Final." },
              { name: "Final: Vortex Idea Challenge", date: "Offline ITS", description: "On-site problem solving in 120 minutes followed by 3MT pitch and jury defense." },
              { name: "Final: Vortex Innovation Challenge", date: "Offline ITS", description: "Booth setup, live prototype demonstration, and technical defense." },
            ],
            scoringCriteria: [
              { criterion: "Preliminary: Idea Challenge", weight: "100 Points", note: "Originality of Ideas (35%), Relevance (20%), Concept Feasibility (20%), Structure (15%), Format (10%)." },
              { criterion: "Preliminary: Innovation Challenge", weight: "100 Points", note: "Problem Urgency (30%), Solution & Feasibility (30%), Methodology (15%), Originality (15%), Format (10%)." },
              { criterion: "Final: Idea Challenge (3MT)", weight: "100 Points", note: "Spontaneity (25%), Verbal Communication (25%), Jury Defense (25%), Concept Quality (20%), Rules (5%)." },
              { criterion: "Final: Innovation Challenge (Booth)", weight: "100 Points", note: "Problem Urgency (30%), Verbal Presentation (25%), Jury Q&A (25%), Prototype Quality (15%), Rules (5%)." },
            ],
          },
        ],
      },
    ],
  },
];
}
