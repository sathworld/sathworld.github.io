import { link } from "framer-motion/client";

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
      ],
      images: [
        { src: '/portfolio/mvm/MVM-ASIC-DIAGRAM.webp', title: 'Matrix-Vector Multiplier Architecture Diagram' },
        { src: '/portfolio/mvm/VMM-Principle.png', title: 'Principle of Operation Diagram' }
      ],
      description: [
        "Computes matrix–vector products with programmable resistors (weights), DAC-driven inputs, TIAs, and SAR ADCs.",
        "Defined SAR ADC architecture and conversion sequencing to digitize outputs Y1…Yn.",
        "Designed trans-impedance amplifiers (TIAs) to sense and condition MVM currents for accurate readout.",
        "Built voltage-source DACs to drive input vector voltages representing column entries −X1…−Xm.",
        "Implemented programmable-resistor DACs to encode row entries per the system architecture.",
        "Developed digital control and interface logic supporting AXI interface to drive biases, orchestrate conversions, and read back results.",
        "Surveyed IEEE literature and alternative analog MVM implementations to guide design trade-offs.",
        "Developed a custom tool that optimizes xschem schematics by running automated ngspice simulations and parameter sweeps.",
        "Designed SAR ADC blocks and low-noise, high-bandwidth op-amps for TIA front-ends and buffering stages."
      ],
      links: [
        { label: 'Repository', url: 'https://github.com/UW-ASIC/Matrix-Vector-Multiplier' },
        { label: 'Custom-made Schematic Optimizer', url: 'https://github.com/UW-ASIC/UWASIC-ALG' }
      ],
    },
    {
      title: "Custom 50V ESC PCBA for Micromobility Vehicles with BLDC Motors",
      duration: "May 2025 – September 2025",
      tags: [
        'PCBA', 'PCB'
      ],
      description: [
        "Designed a custom 4-layer PCB for a 50V brushless motor electronic speed controller (ESC) targeting micromobility vehicles.",
        "Created the schematic and PCB layout in KiCad, ensuring signal integrity and thermal management for high-current paths.",
        "Selected components and created a bill of materials (BOM) that reduced costs by over 30% while meeting performance requirements.",
        "Increased availability of user-accessible GPIO by 10% compared to existing ESCs on the market."
      ],
      links: [
        { label: 'Repository', url: 'https://github.com/Electrium-Mobility/sresc' }
      ],
    },
    {
      title: "FPGA Implementation of a configurable digital 512x512 Matrix-Vector Multiplier targeting Xilinx Series 7 FPGAs",
      duration: "July 2025 – August 2025",
      tags: [
        'RTL','FPGA', 'RTL Verification', 'Python', 'Signal Processing'
      ],
      description: [
        "Designed a highly configurable digital matrix-vector multiplier (MVM) in Verilog, capable of handling 512x512 matrices with 8-bit integers.",
        "Implemented the design to utilize Xilinx Series 7 FPGA DSP slices for efficient multiplication and addition operations, utilizing bit-packing techniques and ternary adders to maximize resource efficiency.",
        "Developed a Python-based testbench using cocotb to perform exhaustive verification of separate modules and the overall MVM system, achieving 100% functional coverage across all configurations.",
        "Achieved a clock frequency of up to 300 MHz on a Xilinx Pynq-Z1 board, with throughput of 38.4 GOPS.",
        "Obtained resource usage of approximately 95% of DSP slices and 70% of LUTs on the FPGA for the full 512x512 configuration.",
        "Utilized various implementation strategies, including disabling synthesis optimizations and floorplanning, to meet timing constraints and optimize performance."
      ],
      links: [
        { label: 'Repository', url: 'https://github.com/sathworld/mvm' }
      ],
      images: [
        { src: '/portfolio/mvm327/MVM-FPGA-Block-Diagram.png', title: 'Matrix-Vector Multiplier FPGA Block Diagram' },
        { src: '/portfolio/mvm327/MVM-FPGA-Resource-Usage.png', title: 'Resource Usage on Xilinx Pynq-Z1' },
      ]
    },
    {
      title: "ASIC & FPGA Implementation on a Torus NoC based on HopliteRT",
      duration: "May 2025 – August 2025",
      tags: [
        'Networks-on-Chip', 'RTL', 'ASIC', 'FPGA', 'RTL Verification', 'Python'
      ],
      description: [
        "Implemented a 4x4 2D Torus Network-on-Chip using the HopliteRT router architecture, supporting virtual channels and deadlock-free routing.",
        "Designed and verified the NoC (including router, switch, and a client interface components) in SystemVerilog, simulating with Verilator and to ensure correct functionality and performance.",
        "Achieved timing closure on the ASIC design targeting the TSMC 65nm node using Synopsys Design Compiler and Innovus, meeting the performance and area requirements.",
        "Successfully synthesized and implemented the NoC on a Xilinx Artix-7 FPGA, achieving a maximum clock frequency of 200 MHz.",
        "Developed a script for custom placement of the NoC routers on the FPGA and floorplanning to optimize routing and minimize latency."
      ],
      links: [
        { label: 'Repository', url: 'https://github.com/sathworld/hoplitert-noc-verilog' },
        { label: 'HopliteRT', url: 'https://nachiket.github.io/publications/hoplitert_fpt-2017.pdf' }
      ],
      images: [
        { src: '/portfolio/torus_noc/torus.png', title: 'Network-on-Chip Architecture' },
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
      ],
      description: [
        "Designed an SPI‑controlled PWM with adjustable frequency and duty cycles for 8 outputs, 2 frequency generators, and 4 channels.",
        "Implemented the design in RTL using Verilog, targeting a 130nm open source process node based on the IHP130 PDK.",
        "Verified functionality through extensive simulation and formal verification methods.",
        "Prepared design for tapeout, including GDSII generation and DRC/LVS checks."
      ],
      links: [
        { label: 'Repository', url: 'https://github.com/sathworld/spi-pwm-peripheral' },
        { label: 'GDSII View', url: 'https://gds-viewer.tinytapeout.com/?process=SG13G2&model=https%3A%2F%2Fdamirg.com%2Fspi-pwm-peripheral%2F%2Ftinytapeout.gds' }
      ],
      images: [
        { src: '/portfolio/spi-pwm/SPI_PERIPH.drawio.png', title: 'SPI PWM Generator Block Diagram' },
        { src: '/portfolio/spi-pwm/ASIC-GDS.png', title: 'GDSII View' }
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
      ],
      description: [
        "Led the design and testing of a portable massage device's 4-layer PCB, exceeding the required targets and reducing BOM cost by over 30%.",
        "Built ESP32-S3 firmware using ESP-IDF with FreeRTOS, utilizing software FSMs for peripheral interactions, achieving 95% accuracy for sensor readings using adaptively tuned Kalman filtering.",
        "Implemented BLE drivers for the device to enable user-defined protocols that are saved in non-volatile memory (NVS).",
        "Integrated OTA update functionality to enable remote firmware updates, improving maintainability and user experience.",
        "Wrote comprehensive documentation for the PCB design and firmware architecture to facilitate future development and maintenance.",
        "Conducted extensive testing and validation of the PCB and firmware to ensure reliability and performance under various operating conditions."
      ],
      links: [
        { label: 'Strivonix Website', url: 'https://www.strivonix.com' }
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
      description: [
        "Built a WiFi-enabled wearable using an ESP8266 SoC and multiple I2C sensors for biometric monitoring.",
        "Implemented ECG signal processing in MATLAB, achieving >95% arrhythmia classification accuracy.",
        "Created mobile dashboard with Blynk API and ThingSpeak for cloud monitoring and alerts.",
      ],
    },
  ],
};
