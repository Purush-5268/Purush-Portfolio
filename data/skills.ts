export interface SkillDomain {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  angle: number;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level: "expert" | "proficient" | "familiar";
}

export const skillDomains: SkillDomain[] = [
  {
    id: "vlsi",
    name: "VLSI",
    color: "#FF5E1E",
    glowColor: "#FF8A50",
    angle: 0,
    skills: [
      { id: "verilog", name: "Verilog HDL", level: "expert" },
      { id: "sv", name: "SystemVerilog", level: "expert" },
      { id: "uvm", name: "UVM", level: "proficient" },
      { id: "riscv", name: "RISC-V", level: "proficient" },
      { id: "openlane", name: "OpenLane", level: "proficient" },
      { id: "synopsys-vcs", name: "Synopsys VCS", level: "proficient" },
      { id: "design-compiler", name: "Design Compiler", level: "proficient" },
      { id: "pt-shell", name: "Pt-Shell", level: "familiar" },
      { id: "cadence", name: "Cadence Virtuoso", level: "familiar" },
      { id: "tcad", name: "Sentaurus TCAD", level: "proficient" },
      { id: "cdc", name: "CDC", level: "proficient" },
      { id: "vivado", name: "Xilinx Vivado", level: "familiar" },
    ],
  },
  {
    id: "embedded",
    name: "EMBEDDED",
    color: "#F59E0B",
    glowColor: "#FCD34D",
    angle: 72,
    skills: [
      { id: "embedded-c", name: "Embedded C", level: "expert" },
      { id: "esp32", name: "ESP32", level: "expert" },
      { id: "freertos", name: "FreeRTOS", level: "proficient" },
      { id: "esp-idf", name: "ESP-IDF", level: "proficient" },
      { id: "uart", name: "UART", level: "expert" },
      { id: "spi", name: "SPI", level: "proficient" },
      { id: "i2c", name: "I2C", level: "expert" },
      { id: "adc", name: "ADC / DAC", level: "expert" },
      { id: "gpio", name: "GPIO", level: "expert" },
      { id: "pwm", name: "PWM", level: "proficient" },
      { id: "fpga", name: "FPGA", level: "proficient" },
      { id: "arduino", name: "Arduino (ATmega328P)", level: "expert" },
      { id: "zynq", name: "Zynq-7000", level: "familiar" },
    ],
  },
  {
    id: "software",
    name: "SOFTWARE",
    color: "#38BDF8",
    glowColor: "#7DD3FC",
    angle: 144,
    skills: [
      { id: "csharp", name: "C#", level: "proficient" },
      { id: "dotnet", name: "ASP.NET Core", level: "proficient" },
      { id: "angular", name: "Angular 17+", level: "proficient" },
      { id: "react", name: "React", level: "proficient" },
      { id: "python", name: "Python", level: "proficient" },
      { id: "c-lang", name: "C Programming", level: "expert" },
      { id: "signalr", name: "SignalR", level: "proficient" },
      { id: "webrtc", name: "WebRTC", level: "familiar" },
      { id: "postgresql", name: "PostgreSQL", level: "familiar" },
      { id: "django", name: "Django", level: "familiar" },
      { id: "redis", name: "Redis", level: "familiar" },
      { id: "git", name: "Git / GitHub", level: "expert" },
    ],
  },
  {
    id: "iot",
    name: "IoT",
    color: "#FB923C",
    glowColor: "#FDBA74",
    angle: 216,
    skills: [
      { id: "iot-esp32", name: "ESP32 IoT", level: "expert" },
      { id: "firebase", name: "Firebase", level: "proficient" },
      { id: "mq2", name: "MQ-2 Gas Sensor", level: "proficient" },
      { id: "dht11", name: "DHT11 Sensor", level: "expert" },
      { id: "ph-sensor", name: "pH Sensor", level: "proficient" },
      { id: "cloud-dash", name: "Cloud Dashboards", level: "proficient" },
      { id: "tinkercad", name: "Tinkercad", level: "familiar" },
    ],
  },
  {
    id: "research",
    name: "RESEARCH",
    color: "#60A5FA",
    glowColor: "#93C5FD",
    angle: 288,
    skills: [
      { id: "bci", name: "BCI", level: "proficient" },
      { id: "eeg", name: "EEG Processing", level: "proficient" },
      { id: "butterworth", name: "Butterworth Filtering", level: "proficient" },
      { id: "ea", name: "Euclidean Alignment", level: "proficient" },
      { id: "riemannian", name: "Riemannian Tangent Space", level: "proficient" },
      { id: "svm", name: "SVM", level: "familiar" },
      { id: "ensemble", name: "Hybrid Ensembles", level: "proficient" },
      { id: "labview", name: "LabVIEW", level: "familiar" },
    ],
  },
];
