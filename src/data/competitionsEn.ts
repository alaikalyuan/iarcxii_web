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
      {
        name: "Team Registration",
        date: "Sep 25 - Dec 13, 2026",
        description: "PLC batches: Sep 25 - Oct 18, Oct 19 - Nov 15, Nov 16 - Dec 13. Microcontroller (IoT) batches: Sep 25 - Oct 16, Oct 17 - Nov 7, Nov 8 - Nov 27",
      },
      {
        name: "IoT Proposal & PLC Preliminary",
        date: "Dec 11 & Dec 26 - 27, 2026",
        description: "IoT proposal deadline Dec 11, 2026; PLC technical meeting Dec 20, online preliminary Dec 26 - 27 via Zoom",
      },
      {
        name: "Finalist Announcement",
        date: "Dec 16 & Dec 30, 2026",
        description: "IoT: Dec 16 (Elementary/Junior High 5 teams, Senior High and University 10 teams); PLC: Dec 30",
      },
      {
        name: "Offline Final at ITS",
        date: "Jan 9 - 10, 2027",
        description: "IoT: final TM Dec 18, final Jan 9 - 10. PLC: TM Jan 3, Senior High semifinal/final Jan 9, University final Jan 10",
      },
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
          "Prototype component budget plan (RAB) cap: max IDR 300,000 (Senior High) and IDR 750,000 (University); Elementary/Junior High use the ESP32 trainer kit provided by the committee",
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
            teamRequirement: "Maximum 3 students (may come from different schools) plus 1 advisory teacher",
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
                description: "Microcontroller Bootcamp: briefing and hands-on basics of microcontrollers, sensors, actuators, programming, and IoT.",
              },
              {
                name: "Final Round: Day 2 Expo & Defense",
                date: "Jan 10, 2027",
                description: "Microcontroller Challenge: solve the chosen case study with the committee-provided trainer kit.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Proposal: Format & Language Compliance",
                weight: "15%",
                note: "Writing structure (margins, font, spacing), proposal neatness, and correct language per guidelines.",
              },
              {
                criterion: "Proposal: Ideas, Solutions & Innovation",
                weight: "20%",
                note: "Novelty, problem-solving creativity, clarity of the solution design, and suitable module/component selection for the case study.",
              },
              {
                criterion: "Proposal: Theme Alignment",
                weight: "15%",
                note: "Alignment with the case study and the chosen sub-theme (Energy, Disaster Mitigation, or Appropriate Technology).",
              },
              {
                criterion: "Video: Visual & Audio Quality",
                weight: "10%",
                note: "Image sharpness, clear audio without noise, and 16:9 format.",
              },
              {
                criterion: "Video: Clarity of Presentation",
                weight: "15%",
                note: "Fluency, articulation, and delivery style.",
              },
              {
                criterion: "Video: Demonstration & Concept Visualization",
                weight: "15%",
                note: "Use of props, diagrams, or illustrations showing how the device works.",
              },
              {
                criterion: "Video: Content Completeness & Creativity",
                weight: "10%",
                note: "Coverage of mandatory points (team intro, innovation, case study link, concept) and engaging presentation.",
              },
            ],
          },
          {
            ...base[0].tracks[0].categories[1],
            name: "Junior High / Equivalent (Junior)",
            teamRequirement: "Maximum 3 students (may come from different schools) plus 1 advisory teacher",
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
              {
                criterion: "Proposal: Format & Language Compliance",
                weight: "15%",
                note: "Writing structure (margins, font, spacing), proposal neatness, and correct language per guidelines.",
              },
              {
                criterion: "Proposal: Ideas, Solutions & Innovation",
                weight: "20%",
                note: "Novelty, problem-solving creativity, clarity of the solution design, and suitable module/component selection for the case study.",
              },
              {
                criterion: "Proposal: Theme Alignment",
                weight: "15%",
                note: "Alignment with the case study and the chosen sub-theme (Energy, Disaster Mitigation, or Appropriate Technology).",
              },
              {
                criterion: "Video: Visual & Audio Quality",
                weight: "10%",
                note: "Image sharpness, clear audio without noise, and 16:9 format.",
              },
              {
                criterion: "Video: Clarity of Presentation",
                weight: "15%",
                note: "Fluency, articulation, and delivery style.",
              },
              {
                criterion: "Video: Demonstration & Concept Visualization",
                weight: "15%",
                note: "Use of props, diagrams, or illustrations showing how the device works.",
              },
              {
                criterion: "Video: Content Completeness & Creativity",
                weight: "10%",
                note: "Coverage of mandatory points (team intro, innovation, case study link, concept) and engaging presentation.",
              },
            ],
          },
          {
            ...base[0].tracks[0].categories[2],
            name: "Senior High / Vocational (Senior)",
            teamRequirement: "Maximum 3 students (may come from different schools) plus 1 advisory teacher",
            highlights: [
              "Advanced telemetry IoT dashboard and automated control",
              "Component budget cap with strict Bill of Materials (RAB)",
              "Interactive exhibition booth and technical defense at ITS Hall",
            ],
            stages: [
              {
                name: "Preliminary Round (Online)",
                date: "Deadline Dec 11, 2026",
                description: "Case study selection, proposal submission, and video explanation. Top 10 teams advance to finals.",
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
            teamRequirement: "Maximum 3 active undergraduate/diploma students from the same university plus 1 faculty advisor",
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
            teamRequirement: "Exactly 2 active students from the same school plus 1 advisory teacher",
            highlights: [
              "Ladder diagram design with CX-Programmer for Omron CP2E-N",
              "Timed problem sets reflecting automated factory packaging",
              "Online preliminary (60 min): Top 8 to semifinal, Top 3 to the final at ITS",
            ],
            stages: [
              {
                name: "Online Preliminary Round",
                date: "Dec 26 - 27, 2026",
                description: "60-minute ladder logic problem on Zoom breakout rooms using 2 devices (rear camera and screen share). Top 8 teams advance to the semifinal, announced Dec 30, 2026.",
              },
              {
                name: "Offline Semifinal (ITS)",
                date: "Jan 9, 2027",
                description: "Department of Automation Electrical Engineering ITS. 15-minute trainer familiarization and 60-minute problem. Top 3 teams advance to the Final.",
              },
              {
                name: "Offline Final (ITS)",
                date: "Jan 9, 2027",
                description: "60-minute industrial case study, program transfer to the hardware trainer, and a presentation to the jury to decide the champions.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Program Runs per Task Description",
                weight: "60 - 70 Points",
                note: "Ladder logic runs as described (+70 in Preliminary, +60 in Semifinal).",
              },
              {
                criterion: "I/O Address & Comment",
                weight: "10 Points",
                note: "Main addresses and comments match the task description.",
              },
              {
                criterion: "Upload & PLC Trainer Simulation",
                weight: "10 Points",
                note: "Program successfully uploaded and simulated on the PLC device (Semifinal).",
              },
              {
                criterion: "On-Time File Submission",
                weight: "10 Points",
                note: "Program file submitted to the jury before the contest time ends.",
              },
              {
                criterion: "Fast Submission Bonus",
                weight: "10 Points",
                note: "Extra points for the 2 fastest teams to submit their program file.",
              },
            ],
          },
          {
            ...base[0].tracks[1].categories[1],
            name: "University & College (Undergraduate)",
            teamRequirement: "Exactly 2 active undergraduate/diploma students from the same university plus 1 faculty advisor",
            highlights: [
              "Comprehensive factory automation logic and Haiwell HMI integration",
              "Ethernet IP/Modbus TCP communication between PLC and HMI screen",
              "Intense live final on physical industrial trainer modules at ITS",
            ],
            stages: [
              {
                name: "Online Preliminary Round",
                date: "Dec 26 - 27, 2026",
                description: "60-minute PLC programming problem on Zoom breakout rooms using 2 devices (corner camera and screen share). Finalists announced Dec 30, 2026.",
              },
              {
                name: "Final Technical Meeting",
                date: "Jan 3, 2027",
                description: "Briefing covering Omron CP2E-N hardware I/O layout and Haiwell B7-H/W HMI configuration.",
              },
              {
                name: "Offline Final (ITS Surabaya)",
                date: "Jan 10, 2027",
                description: "Real industrial control case study (Omron CP2E-N and Haiwell Cloud HMI), 60 minutes, program transfer to the trainer, and jury presentation. No semifinal round.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Program Runs per Task Description",
                weight: "70 Points",
                note: "Ladder logic and HMI integration run fully as described in the industrial case.",
              },
              {
                criterion: "Upload & Trainer Hardware Simulation",
                weight: "10 Points",
                note: "Program uploaded via Ethernet and simulated on the Omron CP2E-N and Haiwell HMI modules.",
              },
              {
                criterion: "I/O Address & Comment",
                weight: "10 Points",
                note: "Main addresses and comments match the task description.",
              },
              {
                criterion: "On-Time File Submission",
                weight: "10 Points",
                note: "Submit NAMA TIM_FINAL.zip before the contest time ends.",
              },
              {
                criterion: "Fast Submission Bonus",
                weight: "10 Points",
                note: "Extra points for the 2 fastest teams to submit their program file.",
              },
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
      {
        name: "Team Registration",
        date: "Sep 25 - Dec 13, 2026",
        description: "Batch 1: Sep 25 - Oct 18, Batch 2: Oct 19 - Nov 15, Batch 3: Nov 16 - Dec 13",
      },
      {
        name: "Online Stage 1 (University)",
        date: "By Dec 13, 2026",
        description: "Demonstration video of the Line Follower and Shooter robots; 16 qualified teams announced Dec 26, 2026",
      },
      {
        name: "Technical Meeting",
        date: "Jan 3, 2027",
        description: "Technical match briefing; final deadline for team member and name changes",
      },
      {
        name: "Offline Day 1 & Day 2",
        date: "Jan 9 - 10, 2027",
        description: "On-site matches at the Department of Automation Electrical Engineering ITS",
      },
    ],
    tracks: [
      {
        ...base[1].tracks[0],
        name: "Autonomous Robotics Track",
        tagline: "High-Speed Line Navigation & Precision Mechanical Missions",
        description:
          "Robots navigate white lines on dark tracks, crossing intersections, bridges, and ramps, while completing specialized missions such as moving or shooting targets.",
        hardwareSpecs: [
          "Elementary: committee-provided robot (ESP32, 5-channel TCRT5000 sensor), programmed on-site with Blockly/Ardublock",
          "Junior High: Microcontroller-based line follower with 1 gripper (max 25x25x20 cm, 2 kg, 8 sensors)",
          "Senior High: Line follower equipped with motorized gripper mechanism (max 25x20x25 cm)",
          "University: Dual-robot system (R1 Autonomous Line Follower + R2 Shooter Robot)",
        ],
        softwareSpecs: [
          "Fully autonomous line follower without manual control (the University Shooter Robot may be manual/RC)",
          "Robot showcase & web app-based block programming guide: https://ismarintan98.github.io/LF_ITS-Share/",
          "Official digital track layout available at https://its.id/m/SmartRoboticsOnline",
        ],
        categories: [
          {
            ...base[1].tracks[0].categories[0],
            name: "Elementary / Equivalent",
            teamRequirement: "Maximum 2 elementary students plus 1 advisor (optional)",
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
            teamRequirement: "Maximum 2 junior high students plus 1 advisor (optional)",
            highlights: [
              "Autonomous line follower carrying an object with 1 gripper (max 8 cm) from the start line",
              "Robot max 25x25x20 cm, 2 kg, 8 sensors, battery max 12 V",
              "Fastest qualification times: top 16 advance; Day 2 on-site programming (no AI assistance)",
            ],
            stages: [
              {
                name: "Day 1: Trial & Qualification Round",
                date: "Day 1",
                description: "45-minute trial. Qualification in Arena 1 decides the 16 fastest teams for the Round of 16 (8 minutes per match, 5-minute cut-off time).",
              },
              {
                name: "Day 2: Trial & Round of 16",
                date: "Day 2",
                description: "30-minute trial. Round of 16 in Arena 2 (new track layout) with on-site programming and an object release mission at the drop point.",
              },
              {
                name: "Day 2: Quarter Final to Grand Final",
                date: "Day 2",
                description: "Single elimination in Arena 2 with the main drop point mission and an optional bonus object mission.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Qualification Round",
                weight: "Points ÷ Time",
                note: "Robot carries the object from start to finish. Score = Total Points ÷ Total Time; the top 16 teams advance to the Round of 16.",
              },
              {
                criterion: "Round of 16",
                weight: "100 Points",
                note: "Main mission: grip the object at start, place it at the drop point, then reach the finish. Run time 1 - 300 seconds (max. 5 minutes).",
              },
              {
                criterion: "Quarter Final - Grand Final",
                weight: "80 + 20 Points",
                note: "Main mission 80 points; optional bonus mission (pick up a bonus object and release it at the drop point) 20 points. Run time 1 - 300 seconds.",
              },
              {
                criterion: "Time Penalties",
                weight: "+5 Seconds",
                note: "Starting before the signal (+5 s) and an invalid retry (+5 s).",
              },
            ],
          },
          {
            ...base[1].tracks[0].categories[2],
            name: "Senior High / Vocational",
            teamRequirement: "Exactly 2 active students from the same school plus 1 advisory teacher (optional)",
            highlights: [
              "Autonomous line follower with integrated mechanical gripper",
              "Pick-and-place precision cube placement in target boxes",
              "Strict dimensional and electrical inspection before matches",
            ],
            stages: [
              {
                name: "Day 1: Preliminary Round",
                date: "Day 1",
                description: "Offline obstacle arena. Each team runs 2 races to accumulate route, checkpoint, and object transfer scores (max 100 points).",
              },
              {
                name: "Day 2: Round of 16 & Quarter Final",
                date: "Day 2",
                description: "Knockout 1 vs 1, one race per team, max 50 points per race; 30-minute configuration time for the new arena.",
              },
              {
                name: "Day 2: Semifinal, 3rd Place & Final",
                date: "Day 2",
                description: "Semifinal is 1 race. 3rd place and Final are 2 matches each with accumulated points (a third match if tied).",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Arena Checkpoints",
                weight: "15 Points",
                note: "The robot passes 5 red-line checkpoints (3 points each).",
              },
              {
                criterion: "Object 1 Transfer (Orange Box)",
                weight: "10 Points",
                note: "The gripper picks up object 1 and places it in the orange box (at least 50% of the object base inside).",
              },
              {
                criterion: "Object 2 Transfer (Green Box)",
                weight: "10 Points",
                note: "The gripper picks up object 2 and places it correctly in the green target box.",
              },
              {
                criterion: "Complete Missions & Finish Line",
                weight: "15 Points",
                note: "The robot reaches the finish line after completing all track missions.",
              },
              {
                criterion: "Total Score & Tiebreaker",
                weight: "50 Pts / Race",
                note: "Max 50 points per race (Day 1 = 2 races = 100 pts). Ties are broken by fastest time.",
              },
            ],
          },
          {
            ...base[1].tracks[0].categories[3],
            name: "University & College (Undergraduate)",
            teamRequirement: "Exactly 2 active undergraduate/diploma students from the same institution plus 1 faculty advisor (optional)",
            highlights: [
              "Advanced Dual-Robot system: R1 Line Follower + R2 Shooter Robot",
              "Tactical coordination between autonomous navigation and projectile launching",
              "Premier robotics showdown at ITS Surabaya",
            ],
            stages: [
              {
                name: "Stage 1 (Online)",
                date: "Online",
                description: "Administrative screening and submission of a demonstration video of the Autonomous Line Follower and Shooter robots. Top 16 teams advance.",
              },
              {
                name: "Stage 2 Day 1: Seeding",
                date: "Day 1",
                description: "Non-elimination seeding round for the 16 teams (3 matches each) to determine bracket positions.",
              },
              {
                name: "Stage 2 Day 2: Knockout",
                date: "Day 2",
                description: "Single elimination Best of 3 (first to 2 race wins) from the Round of 16 through the Final.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Stage 1: Line Follower",
                weight: "30 Points",
                note: "Looping speed (max 5 minutes), path consistency, and autonomous operation.",
              },
              {
                criterion: "Stage 1: Shooter Robot",
                weight: "30 Points",
                note: "Accuracy and stability when shooting 3 targets, plus clarity of the visual verification.",
              },
              {
                criterion: "Regulation Compliance & Administration",
                weight: "40 Points",
                note: "Dimensions, weight, and components (25 pts) plus completeness of forms and demonstration video (15 pts).",
              },
              {
                criterion: "Stage 2 Match: Block Mission",
                weight: "+10 Points",
                note: "The autonomous robot pushes the block out in the match arena (optional).",
              },
              {
                criterion: "Stage 2 Match: Shooter Mission",
                weight: "+10 - 20 Points",
                note: "Ball hits the opponent autonomous robot (+20 pts) or lands in the Target Bowl (+10 pts).",
              },
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
      {
        name: "Registration",
        date: "Sep 25 - Dec 13, 2026",
        description: "Batch 1: Sep 25 - Oct 18, Batch 2: Oct 19 - Nov 15, Batch 3: Nov 16 - Dec 13",
      },
      {
        name: "Technical Meeting",
        date: "Jan 3, 2027",
        description: "Technical briefing; final deadline for team member and name changes",
      },
      {
        name: "On-Site Programming & Finals",
        date: "Jan 9 - 10, 2027",
        description: "Pre-Qualification, Qualification, Round of 16 through the Final at the Department of Automation Electrical Engineering ITS",
      },
    ],
    tracks: [
      {
        ...base[2].tracks[0],
        name: "Autonomous Maze Solver Track",
        tagline: "Autonomous Maze Mapping & Power Efficiency",
        description:
          "Robots are tested on their ability to read maze intersections, map the shortest path, and minimize milliampere power consumption.",
        hardwareSpecs: [
          "Autonomous maze-solver line follower, max 25x25x20 cm, max 8 line follower sensors; any microcontroller",
          "Must provide space for a wattmeter (82x50x23 mm) between the battery and robot electronics with XT60 connectors",
          "Lithium battery max 12.6 V when full; scrutineering covers dimensions, wattmeter, and battery voltage",
        ],
        softwareSpecs: [
          "Autonomous maze solving algorithm (e.g. Wall Following, Tremaux, or Flood-fill)",
          "Remote controls are prohibited; each session consists of Searching (max 3 minutes) and Race (max 2 minutes)",
        ],
        categories: [
          {
            ...base[2].tracks[0].categories[0],
            name: "Senior High / Vocational",
            teamRequirement: "Maximum 2 students from the same institution plus 1 advisory teacher (required)",
            highlights: [
              "3 progressive stages: Pre-qualification, Route Qualification, and Secret Maze Onsite",
              "Secret maze arena revealed on event day",
              "Combined evaluation of speed and power consumption resistance",
            ],
            stages: [
              {
                name: "Stage 1: Pre-Qualification & Qualification",
                date: "Day 1",
                description: "Autonomous runs on the initial track. Pre-Qualification sets the qualifying quota, Qualification sets seeding. Not accumulated into the final score.",
              },
              {
                name: "Stage 2: On-Site Programming (Round of 16)",
                date: "Day 1 / 2",
                description: "Top 16 teams from Qualification play single elimination; 8 winners advance. New arena revealed on event day. 2 m x 2 m arena. Each team gets 2 sessions of max 5 minutes (Searching max 3 + Race max 2).",
              },
              {
                name: "Stage 3: On-Site Programming (Quarter Final - Final)",
                date: "Day 2",
                description: "8 teams play single elimination: quarter final, semifinal, final. Each round is decided by the accumulated score of two sessions.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Run Time Speed",
                weight: "Parameter",
                note: "Score = Allocated Run Time − Actual Run Time (seconds). Robot does not finish: Stage Score = 0.",
              },
              {
                criterion: "Energy Efficiency",
                weight: "Parameter",
                note: "Based on accumulated energy (Wh) read from the wattmeter. Exceeding the maximum limit: Energy Score = 0.",
              },
              {
                criterion: "Final Score Accumulation",
                weight: "Stage 2 + 3",
                note: "Final Score = Stage 2 Score + Stage 3 Score. Stage 1 only decides qualification and seeding.",
              },
            ],
          },
          {
            ...base[2].tracks[0].categories[1],
            name: "University & College (Undergraduate)",
            teamRequirement: "Maximum 2 active undergraduate/diploma students from the same institution plus 1 faculty advisor (required)",
            highlights: [
              "High-complexity maze grid with dynamic junction loops",
              "Deep algorithmic evaluation of flood-fill and path optimization",
              "Strict milliampere telemetry monitoring during final runs",
            ],
            stages: [
              {
                name: "Stage 1: Pre-Qualification & Qualification",
                date: "Day 1",
                description: "Autonomous runs on the initial track. Pre-Qualification sets the qualifying quota, Qualification sets seeding. Not accumulated into the final score.",
              },
              {
                name: "Stage 2: On-Site Programming (Round of 16)",
                date: "Day 1 / 2",
                description: "Top 16 teams from Qualification play single elimination; 8 winners advance. New arena revealed on event day. 3 m x 3 m arena with obstacles; 30-minute programming time. Each team gets 2 sessions of max 5 minutes (Searching max 3 + Race max 2).",
              },
              {
                name: "Stage 3: On-Site Programming (Quarter Final - Final)",
                date: "Day 2",
                description: "8 teams play single elimination: quarter final, semifinal, final. Each round is decided by the accumulated score of two sessions.",
              },
            ],
            scoringCriteria: [
              {
                criterion: "Run Time Speed",
                weight: "Parameter",
                note: "Score = Allocated Run Time − Actual Run Time (seconds). Robot does not finish: Stage Score = 0.",
              },
              {
                criterion: "Energy Efficiency",
                weight: "Parameter",
                note: "Based on accumulated energy (Wh) read from the wattmeter. Exceeding the maximum limit: Energy Score = 0.",
              },
              {
                criterion: "Final Score Accumulation",
                weight: "Stage 2 + 3",
                note: "Final Score = Stage 2 Score + Stage 3 Score. Stage 1 only decides qualification and seeding.",
              },
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
            name: "University (National)",
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
          {
            ...base[3].tracks[0].categories[2],
            name: "International College",
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
