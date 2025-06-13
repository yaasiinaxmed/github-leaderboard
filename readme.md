# 🌟 GitHub Leaderboard

A modern and responsive dashboard that showcases the most active GitHub developers by country. Built with Next.js, Tailwind CSS, and data sourced from [committers.top](https://github.com/ashkulz/committers.top), this open source project highlights developer contributions across the globe.

👉 **Live Demo**: [https://github-leaderboard25.vercel.app/](https://github-leaderboard25.vercel.app/)

---

## ✨ Features

- 🌐 **Country-based Rankings** – View top GitHub contributors from any country  
- 🟩 **GitHub-style Commit Charts** – Green heatmaps show contribution activity  
- 🔍 **Search & Sort** – Easily filter contributors by name or sort by rank/commits  
- 📱 **Responsive Design** – Works great on mobile, tablet, and desktop  
- ⚡ **Real-time Data** – Parses live YAML from GitHub  
- 🌓 **Dark Developer Theme** – A clean GitHub-inspired look  
- 🗂️ **Offline Mode** – Uses static mock data when live fetch fails  

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS  
- **UI Kit**: shadcn/ui  
- **Icons**: Lucide  
- **YAML Parsing**: js-yaml  

---

## 📦 Getting Started

### Prerequisites

- Node.js v18 or later  
- npm or yarn  

### Installation

```bash
git clone https://github.com/yaasiinaxmed/github-leaderboard.git
cd github-leaderboard
npm install
npm run dev 
```

Then open your browser and visit: `http://localhost:3000`

## 📊 Data Source

All contributor data is fetched from:

- YAML: [`afghanistan.yml`](https://github.com/ashkulz/committers.top/blob/gh-pages/_data/locations/afghanistan.yml)
    
- JSON: [`all_time.json`](https://github.com/ashkulz/committers.top/blob/gh-pages/data/all_time.json)
    

> Huge thanks to [ashkulz/committers.top](https://github.com/ashkulz/committers.top) for maintaining the dataset.

---

## 🤝 How to Contribute

We welcome contributions from the community! Here's how you can get started:

1. **Fork** the repository
    
2. **Clone** your fork:
    
    bash
    
    CopyEdit
    
    `git clone https://github.com/your-username/github-leaderboard`
    
3. **Create a new branch**:
    
    bash
    
    CopyEdit
    
    `git checkout -b feature/your-feature-name`
    
4. **Make your changes & commit**:
    
    bash
    
    CopyEdit
    
    `git commit -m "Add: Your message here"`
    
5. **Push the branch**:
    
    bash
    
    CopyEdit
    
    `git push origin feature/your-feature-name`
    
6. **Open a Pull Request** on GitHub
    

Please follow our code style and respect our [Code of Conduct](/CODE_OF_CONDUCT.md).

---

## 📜 License

This project is licensed under the **MIT License**.  
See full license in the [LICENSE](https://chatgpt.com/c/LICENSE) file.

---

## 🌈 Code of Conduct

We are committed to fostering a welcoming and respectful community.

### ✅ Expected Behavior

- Use inclusive and respectful language
    
- Accept constructive feedback
    
- Show empathy toward others
    

### 🚫 Unacceptable Behavior

- Harassment or discriminatory comments
    
- Personal or political attacks
    
- Publishing private information without consent
    

### 📬 Reporting

Please report violations by emailing: **yaskassoy@gmail.com**  
All reports will be handled confidentially and respectfully.

---

## 🙏 Acknowledgements

- [ashkulz/committers.top](https://github.com/ashkulz/committers.top) – Data provider
    
- [shadcn/ui](https://ui.shadcn.com/) – Component toolkit
    
- [Lucide Icons](https://lucide.dev/) – Icon system
    

---

## 💡 Open Source Forever

This project is proudly open source. Feel free to fork, clone, and build upon it.

Built with ❤️ by [@yasindev](https://github.com/yaasiinaxmed)