// data/staticData.js

const streams = [
  "Computer Science",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Instrumentation Engineering",
];

const topics = {
  "Computer Science": [
    "Data Structures",
    "Algorithms",
    "Database Management",
    "Computer Networks",
    "Operating Systems",
    "Software Engineering",
    "Digital Logic",
    "Computer Architecture",
    "Theory of Computation",
    "Compiler Design",
    "Discrete Mathematics",
    "Linear Algebra",
    "Calculus",
    "Probability & Statistics",
  ],
  "Electronics & Communication": [
    "Analog Circuits",
    "Digital Circuits",
    "Signals & Systems",
    "Control Systems",
    "Communications",
    "Electromagnetics",
    "Electronic Devices",
    "VLSI",
    "Networks",
    "Engineering Mathematics",
  ],
  "Electrical Engineering": [
    "Electric Circuits",
    "Control Systems",
    "Electrical Machines",
    "Power Systems",
    "Power Electronics",
    "Analog Electronics",
    "Digital Electronics",
    "Signals & Systems",
    "Electromagnetic Fields",
    "Measurements",
    "Engineering Mathematics",
  ],
  "Mechanical Engineering": [
    "Engineering Mechanics",
    "Strength of Materials",
    "Theory of Machines",
    "Machine Design",
    "Fluid Mechanics",
    "Heat Transfer",
    "Thermodynamics",
    "Refrigeration and Air Conditioning",
    "Manufacturing Engineering",
    "Industrial Engineering",
    "Engineering Mathematics",
  ],
  "Civil Engineering": [
    "Structural Engineering",
    "Geotechnical Engineering",
    "Water Resources Engineering",
    "Environmental Engineering",
    "Transportation Engineering",
    "Surveying",
    "Construction Materials & Management",
    "Engineering Mechanics",
    "Engineering Mathematics",
  ],
  "Chemical Engineering": [
    "Engineering Mathematics",
    "Process Calculations",
    "Fluid Mechanics",
    "Heat Transfer",
    "Mass Transfer",
    "Chemical Reaction Engineering",
    "Thermodynamics",
    "Instrumentation and Process Control",
    "Plant Design and Economics",
    "Mechanical Operations",
  ],
  "Instrumentation Engineering": [
    "Engineering Mathematics",
    "Electrical Circuits",
    "Signals and Systems",
    "Control Systems",
    "Analog Electronics",
    "Digital Electronics",
    "Measurements",
    "Sensors and Industrial Instrumentation",
    "Communication and Optical Instrumentation",
    "Transducers and Signal Conditioning",
  ],
};
const questions = [
  {
    QuestionsDescription:
      "Consider the CIDR block 203.0.113.0/24. If this block is to be subnetted into 8 equal-sized subnets, what is the maximum number of usable host IP addresses in each of these new subnets?",
    Options: [
      {
        isCorrect: false,
        option: "A: 28",
      },
      {
        isCorrect: true,
        option: "B: 30",
      },
      {
        isCorrect: false,
        option: "C: 14",
      },
      {
        isCorrect: false,
        option: "D: 126",
      },
    ],
    Explanation:
      "To create 8 equal-sized subnets from a /24 network, we need 3 bits for subnetting (since 2^3 = 8). These 3 bits are borrowed from the host portion. The original network mask is 24 bits. So, the new subnet mask will be 24 + 3 = 27 bits (i.e., /27). In a /27 subnet, the total number of IP addresses is 2^(32-27) = 2^5 = 32. The number of usable host IP addresses in each subnet is total addresses - 2 (one for the network address and one for the broadcast address). Therefore, 32 - 2 = 30 usable host IP addresses.",
    Difficulty: "Medium",
  },
  {
    QuestionsDescription:
      "Which of the following TCP congestion control algorithms reduces the congestion window (cwnd) by half upon receiving three duplicate ACKs and then transitions to the congestion avoidance phase, instead of restarting with slow start?",
    Options: [
      {
        isCorrect: false,
        option: "A: TCP Tahoe",
      },
      {
        isCorrect: true,
        option: "B: TCP Reno",
      },
      {
        isCorrect: false,
        option: "C: TCP Vegas",
      },
      {
        isCorrect: false,
        option: "D: TCP NewReno",
      },
    ],
    Explanation:
      "TCP Tahoe, upon detecting any packet loss (whether by timeout or triple duplicate ACKs), sets the congestion window (cwnd) to 1 MSS (Maximum Segment Size) and restarts the slow-start phase. TCP Reno, on the other hand, distinguishes between loss detected by timeout and loss detected by triple duplicate ACKs. When three duplicate ACKs are received, TCP Reno performs Fast Retransmit and Fast Recovery. It halves the congestion window (cwnd = cwnd / 2 + 3 * MSS) and then transitions directly into the congestion avoidance phase, avoiding a full slow-start restart. TCP Vegas uses RTT differences to proactively detect congestion before packet loss occurs. TCP NewReno is an improvement over Reno, particularly for handling multiple packet losses within a single congestion window, but Reno is the algorithm that first introduced the specified behavior.",
    Difficulty: "Medium",
  },
];

export { streams, topics, questions };
