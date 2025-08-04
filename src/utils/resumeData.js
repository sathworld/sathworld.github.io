export const resumeData = {
  education: {
    university: "University of Waterloo",
    location: "Waterloo, ON",
    degree: "Candidate for Bachelor of Applied Science (B.A.Sc.), Electrical Engineering",
    gpa: "3.99",
    duration: "September 2022 – Present",
    awards: [
      "First in Class (Fall 2022, 1A)",
      "First in Class (Spring 2023, 1B)",
      "First in Class (Winter 2024, 2A)",
      "First in Class (Fall 2024, 2B)",
    ],
  },
  skills: [
    {
      category: "ECAD/Tools",
      items: "Vivado, cocotb, PSpice, Verilator, Altium Designer, KiCad, ESPIDF, Git, STM32CubeMX, Docker",
    },
    {
      category: "Languages",
      items: "Verilog, SystemVerilog, C++, C, Python, Tcl, MATLAB",
    },
    {
      category: "Lab Equipment",
      items: "Oscilloscope, Logic Analyzer, Spectral Analyzer, DMM, Hot Air Station, Soldering Iron",
    },
    {
      category: "Certifications",
      items: "IPC Certified Interconnect Designer (CID)",
    },
  ],
  experience: [
    {
      company: "Strivonix",
      location: "Kitchener, ON",
      title: "Product Development Coop",
      duration: "January 2025 – April 2025",
      description: [
        "Led the design and testing of a portable pneumatic massage device's main 4-layer PCB, exceeding the required targets, achieving 97% functionality on the first design iteration and reducing BOM cost by over 30%.",
        "Built ESP32-S3 firmware using ESP-IDF with FreeRTOS, utilizing software FSMs for peripheral interactions, achieving 95% accuracy for sensor readings using adaptively tuned Kalman filtering.",
        "Implemented BLE drivers for the device to enable user-defined protocols that are saved in non-volatile memory (NVS).",
      ],
    },
    {
      company: "UWASIC – IEEE SSCS Student Chapter",
      location: "Waterloo, ON",
      title: "Founder & Technical Lead",
      duration: "December 2024 – Present",
      description: [
        "Founded and led UWASIC, which became the IEEE Solid-State Circuits Society Student Chapter for the KW Section.",
        "Directed Dino Game ASIC project that targets open-source PDKs (IHP Open130-G2, SkyWater SKY130), reduced used area by over 10%, led RTL design and integration, meeting the tapeout deadline ahead of schedule by 1 week.",
        "Achieved timing closure on the design, yielding 15% of extra slack time in both PDKs using OpenSTA.",
        "Built custom simulator/visualizer using Verilator and C++ to debug pipeline and FSM behavior issues pre-layout.",
        "Developed the onboarding project for an SPI-connected PWM Output Expander in Verilog, recruiting 50+ members.",
        "Implemented a 5-bit-operand mixed-signal matrix-vector multiplier that outperforms digital-only designs in area by 25%.",
      ],
    },
    {
      company: "Electrium Mobility",
      location: "Waterloo, ON",
      title: "Electrical Team Lead",
      duration: "December 2023 – Present",
      description: [
        "Taught 20+ workshops on schematic capture, PCB layout and routing, board bring-up, as well as IPC-compliant design and soldering, improving the reliability of the submitted designs by 30%.",
        "Designed and validated the design of a custom brushless motor electronic speed controller (ESC), reducing cost by 20% and extending the number of available IO by 10% compared to existing micromobility ESCs on the market.",
      ],
    },
  ],
  projects: [
    {
      title: "Custom 8-bit Computer Tape-Out",
      technologies: "Verilog, Python, Verilator, cocotb",
      duration: "September 2024 – December 2024",
      description: [
        "Architected custom 8-bit RISC ISA with 16 instructions to balance datapath simplicity and opcode density.",
        "Designed and verified pipelined ALU and register file blocks in Verilog, simulated with Verilator and cocotb.",
        "Integrated modules from multiple teams to produce tapeout-ready GDS with >20% area savings.",
        "Validated timing with post-layout netlists and RC extraction to ensure functional accuracy.",
      ],
    },
    {
      title: "Wearable Telehealth Device",
      technologies: "C++, MATLAB, ThingSpeak, Blynk API",
      duration: "August 2022 – January 2023",
      description: [
        "Built a WiFi-enabled wearable using ESP8266 and 5 I2C sensors for biometric monitoring.",
        "Implemented ECG signal processing in MATLAB, achieving >95% arrhythmia classification accuracy.",
        "Created mobile dashboard with Blynk API and ThingSpeak for cloud monitoring and alerts.",
      ],
    },
  ],
};
