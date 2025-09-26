# 🚀 Getting Started Guide

Welcome to the Amazon Clone project! This guide will help you get up and running quickly.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### **Required Software**
- 📦 **Node.js** (version 18.0 or higher)
  ```bash
  # Check your version
  node --version
  
  # Download from https://nodejs.org if needed
  ```

- 📦 **npm** (comes with Node.js)
  ```bash
  # Check your version
  npm --version
  ```

- 🔧 **Git** (for version control)
  ```bash
  # Check your version
  git --version
  ```

### **Recommended Tools**
- 💻 **VS Code** - With React and Tailwind extensions
- 🌐 **Modern Browser** - Chrome, Firefox, Safari, or Edge
- 📱 **React Developer Tools** - Browser extension for debugging

## ⚡ Quick Start (5 minutes)

### **1. Clone the Repository**
```bash
# Clone the project
git clone https://github.com/yourusername/amazon-clone.git

# Navigate to the project directory
cd amazon-clone
```

### **2. Install Dependencies**
```bash
# Install all project dependencies
npm install

# This will install:
# - React 19 and React DOM
# - Vite build tool
# - Tailwind CSS
# - Framer Motion
# - React Router
# - React Icons
# - And many more...
```

### **3. Start Development Server**
```bash
# Start the development server
npm run dev

# Your app will open at http://localhost:5173
# Or try http://127.0.0.1:5173 if you have issues
```

### **4. Open in Browser**
- 🌐 Navigate to `http://localhost:5173`
- 🎉 You should see the Amazon Clone homepage!

## 🛠️ Development Workflow

### **Daily Development Commands**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### **Troubleshooting Commands**
```bash
# If you encounter issues, try these:

# Clear cache and restart
npm run dev:clean

# Force restart (kills processes + clears cache)
npm run dev:force

# Run without hot module replacement
npm run dev:no-hmr

# Run troubleshooting script
npm run dev:troubleshoot
```

## 🎯 Project Structure Overview

```
amazon-clone/
├── 📁 src/
│   ├── 📁 components/     # Reusable UI components
│   ├── 📁 pages/          # Route components (Home, Cart, etc.)
│   ├── 📁 context/        # React Context providers
│   ├── 📁 hooks/          # Custom React hooks
│   └── 📁 styles/         # Global styles and themes
├── 📁 public/             # Static assets
├── 📁 docs/               # Documentation
└── 📄 package.json        # Project configuration
```

## 🎨 Understanding the Code

### **Key Files to Explore**
1. **`src/App.jsx`** - Main application component with routing
2. **`src/components/layout/Header.jsx`** - Navigation header
3. **`src/pages/Home.jsx`** - Homepage component
4. **`src/context/CartContext.jsx`** - Shopping cart state management

### **How Routing Works**
```jsx
// Routes are defined in App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/signin" element={<SignIn />} />
  // ... more routes
</Routes>
```

### **How Styling Works**
```jsx
// We use Tailwind CSS classes
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
  
// Dark mode is handled automatically
<div className="bg-white dark:bg-gray-800">

// Responsive design is built-in
<div className="hidden md:block lg:flex">
```

## 🔧 Configuration Files

### **Important Config Files**
- **`vite.config.js`** - Build tool configuration
- **`tailwind.config.cjs`** - Styling configuration
- **`package.json`** - Project dependencies and scripts
- **`.eslintrc.js`** - Code linting rules

### **Environment Variables** (Optional)
Create a `.env.local` file for custom settings:
```env
# API Configuration (when you add a backend)
VITE_API_URL=https://your-api.com

# Feature Flags
VITE_ENABLE_3D=true
VITE_ENABLE_CHAT=true
```

## 🎯 First Steps for New Developers

### **1. Explore the Homepage**
- 👀 Look at `src/pages/Home.jsx`
- 🎨 Notice how components are organized
- 🔍 See how Tailwind classes create the layout

### **2. Try Making a Small Change**
```jsx
// In src/pages/Home.jsx, find the hero section and change the text
<h1 className="text-4xl font-bold">
  Welcome to My Amazing Store! {/* Change this text */}
</h1>
```

### **3. Understand the Component Structure**
```jsx
// Most components follow this pattern:
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  return (
    <div className="tailwind-classes">
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

### **4. Learn the Context System**
```jsx
// See how global state works
import { useCart } from '../context/CartContext';

const MyComponent = () => {
  const { items, addItem } = useCart();
  // Now you can access cart state and functions
};
```

## 🐛 Common Issues for Beginners

### **Port Already in Use**
```bash
# Error: Port 5173 is already in use
# Solution: Kill the process or use different port
npm run dev:force
```

### **Module Not Found**
```bash
# Make sure you're in the right directory
cd amazon-clone
npm install
```

### **Blank Page in Browser**
- Check browser console for errors
- Make sure the development server is running
- Try refreshing the page

### **Styles Not Loading**
- Restart the development server
- Clear browser cache
- Check if Tailwind CSS is properly configured

## 📚 Learning Resources

### **React Fundamentals**
- 📖 [React Official Tutorial](https://react.dev/learn)
- 🎥 [React Crash Course Videos](https://www.youtube.com/results?search_query=react+crash+course)

### **Tailwind CSS**
- 📖 [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- 🎯 [Tailwind CSS Cheat Sheet](https://tailwindcomponents.com/cheatsheet/)

### **JavaScript ES6+**
- 📖 [Modern JavaScript Features](https://javascript.info/)
- 🎯 [ES6 Arrow Functions, Destructuring, etc.](https://babeljs.io/docs/en/learn)

## 🤝 Getting Help

### **If You're Stuck**
1. 📖 Check the [troubleshooting guide](troubleshooting.md)
2. 🔍 Search existing [GitHub issues](https://github.com/yourusername/amazon-clone/issues)
3. 💬 Ask questions in [GitHub Discussions](https://github.com/yourusername/amazon-clone/discussions)
4. 📧 Email the maintainers for urgent issues

### **Contributing Back**
Once you're comfortable with the codebase:
- 🐛 Report bugs you find
- 💡 Suggest improvements
- 📝 Improve documentation
- 🔧 Submit pull requests

## 🎉 Next Steps

After getting the project running:

1. **Explore Features** - Try the shopping cart, navigation, dark mode
2. **Read the Code** - Understand how components work together
3. **Make Changes** - Start with small modifications
4. **Build Something New** - Add your own features
5. **Share Your Progress** - Show others what you've built!

---

**Welcome to the Amazon Clone project! Happy coding! 🚀**

*Remember: Every expert was once a beginner. Take your time and enjoy the learning process!*