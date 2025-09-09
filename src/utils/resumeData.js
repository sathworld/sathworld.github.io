import { image, title } from "framer-motion/client";

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
    courses: [
      // Canonical category set: Analog Design, Digital Design, Comp Arch, Device Physics, RF, EM, Embedded, Signal Processing
      { code: 'ECE 231', title: 'Semiconductor Physics and Devices', categories: ['Device Physics', 'EM'] },
      { code: 'ECE 222', title: 'Digital Computers', categories: ['Comp Arch', 'Embedded'] },
      { code: 'ECE 340', title: 'Electronic Circuits 2', categories: ['Analog Design', 'Device Physics'] },
      { code: 'ECE 331', title: 'Electronic Devices', categories: ['Device Physics', 'EM'] },
      { code: 'ECE 493', title: 'On-Chip Interconnect (Network-on-Chip)', categories: ['Comp Arch', 'Digital Design'] },
      { code: 'ECE 493', title: 'Computer Arithmetic Hardware', categories: ['Comp Arch', 'Digital Design'] },
      { code: 'ECE 327', title: 'Digital Hardware Systems', categories: ['Digital Design', 'Embedded'] },
      { code: 'ECE 320', title: 'Computer Architecture', categories: ['Comp Arch', 'Digital Design'] },
//      { code: 'ECE 313', title: 'Digital Signal Processing', categories: ['Signal Processing', 'Digital Design'] },
      { code: 'ECE 318', title: 'Communication Systems', categories: ['Signal Processing', 'Analog Design'] },
      { code: 'ECE 373', title: 'Radio Frequency and Microwave Circuits', categories: ['RF', 'EM', 'Analog Design'] },
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
  logo: "/logos/strivonix.webp", // light / default
  darkLogo: "/logos/strivonix-dark.webp", // optional dark mode variant
  website: "https://www.strivonix.com", // replace with real URL
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
  logo: "/logos/uwasic.webp",
  website: "https://uwasic.com", // replace with real URL
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
  logo: "/logos/electrium-mobility.webp",
  website: "https://electriummobility.com", // replace with real URL
      description: [
        "Taught 20+ workshops on schematic capture, PCB layout and routing, board bring-up, as well as IPC-compliant design and soldering, improving the reliability of the submitted designs by 30%.",
        "Designed and validated the design of a custom brushless motor electronic speed controller (ESC), reducing cost by 20% and extending the number of available IO by 10% compared to existing micromobility ESCs on the market.",
      ],
    },
  ],
  projects: [
    {
      title: "Mixed Signal ASIC for Matrix-Vector Multiplication",
      duration: "June 2025 – November 2025",
      tags: [
        'ASIC', 'Signal Processing', 'Simulation', 'ASIC Layout'
      ]
    },
    {
      title: "Custom 50V ESC PCBA for Micromobility Vehicles with BLDC Motors",
      duration: "May 2025 – September 2025",
      tags: [
        'PCBA', 'PCB'
      ]
    },
    {
      title: "ASIC & FPGA Implementation on a Torus NoC based on HopliteRT",
      duration: "May 2025 – August 2025",
      tags: [
        'Networks-on-Chip', 'RTL', 'ASIC', 'FPGA'
      ]
    },
    {
      title: "3D Torus NoC Simulator in Booksim",
      duration: "June 2025 – August 2025",
      tags: [
        'Networks-on-Chip', 'Booksim', 'Simulation', 'Python'
      ],
      description: [
        "Extended Booksim2 to support a 3D Torus with bidirectional Z-dimension meshing for reducing bottlenecks from through-silicon vias (TSVs).",
        "Implemented elevator-first deterministic routing, ensuring livelock and deadlock freedom while prioritizing Z > Y > X traversal.",
        "Developed Python tooling for flexible elevator mapping: users can specify elevator coordinates via CSV, visualize mappings, and customize nearest-elevator selection functions.",
        "Modeled TSVs with realistic multi-cycle latency penalties and integrated them into Booksim’s credit-based flow control system.",
        "Explored elevator placement patterns (diagonal, checkerboard, sub-tiling) and quantified performance tradeoffs across throughput, latency, and injection rate.",
        "Demonstrated that bidirectional Z-meshing can nearly double sustainable throughput with only ~33% area overhead, with non-linear gains depending on elevator density."
      ],
      images: [
        { src: '/portfolio/booksim_3d_torus/drawing-torus-elev-stack.png', title: '3D Torus Topology' },
        { src: '/portfolio/booksim_3d_torus/ThroughputVSTopology.png', title: 'Throughput vs Vertical Link Topology' }
      ],
      links: [
        { label: 'Repository', url: 'https://github.com/VoarL/booksim2-3dtorus' }
      ],
      files: [
        { label: 'Project Report', url: '/portfolio/booksim_3d_torus/3D_Torus_NoC_Report.pdf' }
      ],
    },
    {
      title: "SPI-connected PWM Generator",
      duration: "April 2025 – May 2025",
      tags: [
        'RTL', 'ASIC', 'Tapeout', 'RTL Verification', 'Python'
      ]
    },
    {
      title: "Strivonix Main PCBA and Firmware",
      duration: "January 2025 – March 2025",
      tags: [
        "Firmware", "C", "IoT", "PCB", "PCBA", "ESPIDF"
      ],
      images: [
        { src: "/portfolio/Strivonix/IMG_20250519_214240.jpg", title: "Strivonix Main PCBA" },
        { src: "/portfolio/Strivonix/IMG_20250519_214211.jpg", title: "Strivonix PCBA in the housing" }
      ]
    },
    {
      title: "Custom 8-bit Computer Tapeout",
      duration: "September 2024 – December 2024",
      tags: [
        'RTL', 'RTL Verification', 'Python', 'Tapeout', 'ASIC'
      ],
      images: [
        { src: '/portfolio/cpu8bit/CPU-GDS.png', title: 'Post-Layout GDS' },
        { src: '/portfolio/cpu8bit/8bitSAP-1CPUArch.drawio.png', title: '8-bit SAP-1 CPU Architecture' },
        { src: '/portfolio/cpu8bit/CPU-mermaid.png', title: 'CPU Execution State Diagram' }
      ],
      links: [
        { label: 'Repository', url: 'https://github.com/gjrchen/8-Bit-CPU-top' },
        { label: 'GDSII View', url: 'https://legacy-gltf.gds-viewer.tinytapeout.com/?model=https://gjrchen.github.io/8-Bit-CPU-top/tinytapeout.gds.gltf' }
      ],
      files: [
        { label: 'CPU Datasheet', url: '/portfolio/cpu8bit/8BitCPU_datasheet.pdf' }
      ],
      description: [
        "Architected custom 8-bit ISA CPU with 16 instructions to balance datapath simplicity and opcode density.",
        "Designed and verified pipelined ALU and register file blocks in Verilog, simulated with Verilator and cocotb.",
        "Integrated modules from multiple teams to produce tapeout-ready GDS with >20% area savings.",
        "Validated timing with post-layout netlists and RC extraction to ensure functional accuracy.",
        "Developed an on-chip programmer to flash programs and data into the RAM by communicating with an external MCU.",
        "Broke instructions down into microinstructions to be carried out every CPU cycle, enabling the utilization of a single common bus and more complex instructions such as adding from the RAM.",
        "Developed cocotb test suites for individual modules as well as complete integration tests."
      ],
    },
    {
      title: "Dino Game ASIC",
      duration: "January 2025 – March 2025",
      tags: [
        'RTL', 'RTL Verification', 'Verilator', 'Tapeout', 'FPGA', 'ASIC'
      ],
      images: [
        { src: '/portfolio/dinogame/ASIC.png', title: 'Post-Layout GDS with visualized activity levels' },
        { src: '/portfolio/dinogame/DinoArchUWASIC.drawio.png', title: 'Dino Architecture Diagram' },
        { src: '/portfolio/dinogame/Render.png', title: 'Render Captured from an FPGA' }
      ],
      links: [
        { label: 'Repository', url: 'https://github.com/UW-ASIC/Dino' },
        { label: 'GDSII View', url: 'https://gds-viewer.tinytapeout.com/?model=https%3A%2F%2Fshuttle-assets.tinytapeout.com%2Fttihp25a%2Ftt_um_uwasic_dinogame%2Ftt_um_uwasic_dinogame.gds&process=SG13G2' }
      ],
      files: [],
      description: [
        "Designed and FPGA-tested a 160×200 μm Dino Game ASIC with VGA output, submitted for tapeout via TinyTapeout.",
        "Generated VGA output in real-time (“raced the beam”) to avoid frame buffer memory overhead due to ASIC size limits.",
        "Architechted a custom graphics module with sprite rendering, collision detection, and game state management.",
        "Created an elegant way for implementing different colour palettes that are switched based on the game state using only combinational logic.",
        "Implemented a linear feedback shift register to generate random numbers and a basic physics engine for player physics.",
        "Developed an autonomous controller in Verilog to play the game when no controller is detected on startup.",
        "Developed VGA emulator in C++ using SDL2 and Verilat or to simulate chip input/output and test design in real time."
      ],
    },
    {
      title: "Wearable Telehealth Device",
      duration: "August 2022 – January 2023",
      tags: [
        'C++', 'MATLAB', 'Signal Processing', 'IoT'
      ],
      images: [
      ],
      links: [
      ],
      files: [
      ],
      description: [
        "Built a WiFi-enabled wearable using an ESP8266 SoC and multiple I2C sensors for biometric monitoring.",
        "Implemented ECG signal processing in MATLAB, achieving >95% arrhythmia classification accuracy.",
        "Created mobile dashboard with Blynk API and ThingSpeak for cloud monitoring and alerts.",
      ],
    },
  ],
};
