export const BLOG_POSTS = [
  {
    id: "autonomy-flight-stack",
    title: "Inside the Autonomy Flight Stack: How Modern UAVs Think",
    slug: "inside-the-autonomy-flight-stack",
    excerpt:
      "A deep dive into the decision-making pipeline that powers autonomous UAV missions — from perception to planning.",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1757913837786-f4d345aacff0?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Autonomy",
    tags: ["autonomy", "ai", "navigation", "planning"],
    author: "Aarav Sharma",
    readTime: "12 min",
    createdAt: "2024-12-21",
    content: `
## 🧠 Introduction
Autonomous UAVs are no longer simple remote-controlled machines. They are flying computers capable of:
- Real-time decision making  
- Dynamic obstacle avoidance  
- Multi-sensor fusion  
- Cooperative mission execution  

In this article, we break down the **Autonomy Flight Stack**, the software layer that gives a drone its "brain".

---

## 🛰️ 1. Perception Layer
The perception layer answers one question:  
**"What does the UAV see?"**

It collects data from:
- IMU  
- GPS  
- Magnetometer  
- Barometer  
- Visual cameras  
- LiDAR  
- mmWave radar  

### Sensor Fusion Example  
A standard Extended Kalman Filter (EKF) fuses multiple signals:

\`\`\`txt
IMU (high-rate) → Predict  
GPS (low-rate) → Correct  
Vision → Correct  
LiDAR → Correct  
\`\`\`

This creates a stable real-time estimate of:
- Position  
- Velocity  
- Orientation  
- Drift correction  

---

## 🧭 2. Localization & Mapping
As the UAV flies, it constantly builds or updates a **map**.

Techniques used:
- Visual SLAM  
- LiDAR SLAM  
- GPS-denied navigation  

A simplified diagram:

\`\`\`txt
Camera → Feature Extraction → Feature Matching → Pose Update  
LiDAR → Scan Matching → Map Update  
\`\`\`

---

## 🧨 3. Planning Layer
This layer decides:
**"Where should the UAV go next?"**

Types of planners:
- Global Planner (A*, RRT*)  
- Local Planner (TEB, DWA)  
- Reactive Obstacle Avoidance  

Example pseudo-code:

\`\`\`js
while (mission_not_complete) {
  goals = getMissionWaypoints();
  path = globalPlanner(goals);
  safePath = localPlanner(path, sensorData);
  sendToController(safePath);
}
\`\`\`

---

## ⚙️ 4. Control Layer
This layer converts desired motion into motor commands.

Typical hierarchy:
- Position Controller  
- Attitude Controller  
- Rate Controller  

Running at **200–800 Hz**, this loop stabilizes the UAV.

---

## 🧩 Final Thoughts
The autonomy stack is the true differentiator between consumer drones and mission-grade UAV systems.  
Every layer must work with millisecond precision to ensure reliability.

---
    `,
  },

  {
    id: "battery-optimizatiosssn",
    title: "Why Your Drone Battery Doesn’t Last — And How To Fix It",
    slug: "battery-optimization-tips",
    excerpt:
      "Understanding discharge curves, C-rating, power draw, and thermal management can increase battery life by 40%.",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1757583509825-1aca9d2367fb?q=80&w=2855&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Power Systems",
    tags: ["battery", "power", "lipo", "thermal"],
    author: "Kavya Reddy",
    readTime: "10 min",
    createdAt: "2024-12-10",

    content: `
## 🔋 Introduction
If your battery dies faster than expected, you’re not alone.  
UAV power systems are sensitive to:

- Load spikes  
- Temperature  
- Aging cells  
- Incorrect charging habits  

Let’s break down how to get maximum life out of your LiPo packs.

---

## 🔥 1. Understand C-Rating
C-rating determines how much current a battery can safely deliver.

\`\`\`txt
Max Current = Capacity × C-Rating
Example: 5000mAh × 20C = 100A
\`\`\`

Low C-rating → voltage sag → sudden drops → early cut-off.

---

## 🌡️ 2. Temperature Impacts Everything
LiPos hate:
- Cold (< 10°C)  
- Hot (> 45°C)

Ideal range: **20–35°C**.

---

## ⚡ 3. Optimize Propulsion
Most battery drain happens in motors.

Tips:
- Use efficient props  
- Reduce take-off weight  
- Avoid aggressive maneuvers  
- Tune PID to avoid oscillations  

---

## 🧪 4. Real Flight Example
Before optimization:
- Flight time: 28 mins  
- Avg current: 21A  

After:
- Flight time: 41 mins  
- Avg current: 14A  

A **46% improvement** from simple fixes.

---

## 🧩 Final Thoughts
Power efficiency is the biggest lever for UAV endurance.  
A well-optimized setup beats a larger battery every time.
    `,
  },

  {
    id: "real-time-sensor-fusions",
    title: "Real-Time Sensor Fusion Explained (IMU + GPS + Vision)",
    slug: "real-time-sensor-fusion",
    excerpt:
      "Sensor fusion is the backbone of stable flight. Here’s how IMU, GPS, barometer, vision and LiDAR data are merged.",
    thumbnail:
      "https://images.unsplash.com/photo-1763144536849-f713b4323aea?q=80&w=2912&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Sensors",
    tags: ["sensor fusion", "imu", "gps", "vision", "lidar"],
    author: "Rahul Verma",
    readTime: "14 min",
    createdAt: "2025-02-01",

    content: `
## 📡 Introduction
UAV stability relies on merging fast noisy sensors (IMU) with slow accurate sensors (GPS).  
This produces a single clean estimate of the drone’s motion.

---

## 🧩 1. Why Fusion Is Needed
Each sensor alone is flawed:

IMU → fast but drifts  
GPS → accurate but slow  
Camera → detailed but heavy CPU  
LiDAR → precise but costly  

Fusion = **best of all**.

---

## 🔢 2. The Filter Pipeline
Most UAVs use:

- EKF (Extended Kalman Filter)  
- UKF (Unscented Kalman Filter)  
- Complementary filter (lightweight drones)  

Core idea:

\`\`\`txt
Prediction (IMU)  
Correction (GPS, Vision, LiDAR)
\`\`\`

---

## 🧠 3. Vision + IMU = VIO
Visual-Inertial Odometry is the gold standard for GPS-denied flight.

Pipeline:

\`\`\`txt
Frame → Feature Detection → Feature Tracking → IMU Integration → Pose Estimate
\`\`\`

---

## 🏁 Final Thoughts
Sensor fusion defines flight stability.  
More sensors ≠ better — the **right combination** matters.
    `,
  },
  {
    id: "real-time-sensor-fusion",
    title: "Real-Time Sensor Fusion Explained (IMU + GPS + Vision)",
    slug: "real-time-sensor-fusion",
    excerpt:
      "Sensor fusion is the backbone of stable flight. Here’s how IMU, GPS, barometer, vision and LiDAR data are merged.",
    content: "Full content here…",
    category: "Sensors",
    tags: ["sensor fusion", "imu", "gps", "vision", "lidar"],
    author: "Rahul Verma",
    readTime: "7 min",
    createdAt: "2025-02-01",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1758477629847-ee5146557f23?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "range-communication-systems",
    title: "Long-Range UAV Communication Systems — A Complete Guide",
    slug: "long-range-communication-systems",
    excerpt:
      "Breaking down RF bands, LTE, SATCOM, mesh networking, antennas and failover strategies for long-range missions.",
    content: "Full content here…",
    category: "Communication",
    tags: ["rf", "satcom", "mesh", "lte", "communication"],
    author: "Ishan Malhotra",
    readTime: "10 min",
    createdAt: "2025-01-15",
    thumbnail: "https://plus.unsplash.com/premium_photo-1661948700015-bb81e8124974?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM4fHx8ZW58MHx8fHx8",
  },
  {
    id: "battery-optimization",
    title: "Why Your Drone Battery Doesn’t Last — And How To Fix It",
    slug: "battery-optimization-tips",
    excerpt:
      "Battery longevity is more than just mAh. Learn about discharge curves, C-rating, thermal management and real-world tips.",
    content: "Full content here…",
    category: "Power Systems",
    tags: ["battery", "power", "lipo", "thermal", "optimization"],
    author: "Kavya Reddy",
    readTime: "5 min",
    createdAt: "2024-12-10",
    thumbnail: "https://plus.unsplash.com/premium_photo-1756134901617-a4a0125545dd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: "mission-planning-tools",
    title: "Modern Mission Planning Tools for UAV Operators",
    slug: "mission-planning-tools",
    excerpt:
      "From grid mapping to dynamic rerouting — a look at the modern software tools used for UAV mission planning.",
    content: "Full content here…",
    category: "Operations",
    tags: ["operations", "mission planning", "software", "gis"],
    author: "Vikram Rao",
    readTime: "6 min",
    createdAt: "2025-01-29",
    thumbnail: "https://plus.unsplash.com/premium_photo-1714618849685-89cad85746b1?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
