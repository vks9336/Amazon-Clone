# 🤝 Contributing to Amazon Clone

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🌟 How to Contribute

### **Types of Contributions**
- 🐛 **Bug Fixes** - Fix issues and improve stability
- ✨ **New Features** - Add new functionality
- 📚 **Documentation** - Improve docs and examples
- 🎨 **UI/UX** - Enhance design and user experience
- ⚡ **Performance** - Optimize code and improve speed
- ♿ **Accessibility** - Make the app more accessible
- 🧪 **Testing** - Add or improve tests

## 🚀 Getting Started

### **1. Fork and Clone**
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/yourusername/amazon-clone.git
cd amazon-clone
```

### **2. Set Up Development Environment**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test
```

### **3. Create a Branch**
```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Or a bug fix branch
git checkout -b fix/issue-description
```

## 📝 Development Guidelines

### **Code Style**
- Use **ESLint** configuration provided
- Follow **Prettier** formatting
- Use **TypeScript** when possible
- Write **descriptive commit messages**

### **Component Guidelines**
```jsx
// ✅ Good: Descriptive name and props
const ProductCard = ({ product, onAddToCart, className }) => {
  return (
    <div className={`product-card ${className}`}>
      {/* Component content */}
    </div>
  );
};

// ❌ Avoid: Generic names and unclear props
const Card = ({ data, onClick, css }) => {
  // Component content
};
```

### **Styling Guidelines**
```jsx
// ✅ Use Tailwind utilities
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">

// ✅ Use CSS modules for complex styles
import styles from './ProductCard.module.css';

// ❌ Avoid inline styles unless dynamic
<div style={{ color: 'red' }}>  // Only if color is dynamic
```

### **Accessibility Requirements**
```jsx
// ✅ Always include ARIA labels
<button aria-label="Add to cart" onClick={addToCart}>
  <FiShoppingCart />
</button>

// ✅ Ensure keyboard navigation
<div
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={handleClick}
>

// ✅ Use semantic HTML
<main>
  <section aria-labelledby="products-heading">
    <h2 id="products-heading">Featured Products</h2>
  </section>
</main>
```

## 🧪 Testing Guidelines

### **Writing Tests**
```jsx
// Component tests
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

test('should display product name', () => {
  const product = { name: 'Test Product', price: 99.99 };
  render(<ProductCard product={product} />);
  
  expect(screen.getByText('Test Product')).toBeInTheDocument();
});

test('should call onAddToCart when button clicked', () => {
  const mockAddToCart = jest.fn();
  const product = { name: 'Test Product', price: 99.99 };
  
  render(<ProductCard product={product} onAddToCart={mockAddToCart} />);
  
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  expect(mockAddToCart).toHaveBeenCalledWith(product);
});
```

### **Test Requirements**
- ✅ Write tests for new components
- ✅ Test user interactions
- ✅ Test edge cases and error states
- ✅ Maintain test coverage above 80%

## 📋 Pull Request Process

### **Before Submitting**
1. ✅ Run all tests: `npm run test`
2. ✅ Check linting: `npm run lint`
3. ✅ Build successfully: `npm run build`
4. ✅ Test in multiple browsers
5. ✅ Update documentation if needed

### **Pull Request Template**
```markdown
## 📝 Description
Brief description of changes

## 🔗 Related Issue
Fixes #(issue number)

## 🧪 Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## 📸 Screenshots
(If UI changes)

## ✅ Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Accessibility checked
```

### **Review Process**
1. 🔍 **Automated Checks** - Tests and linting must pass
2. 👥 **Peer Review** - At least one approval required
3. 🧪 **Manual Testing** - Reviewer tests functionality
4. ✅ **Final Approval** - Maintainer approval before merge

## 🐛 Bug Reports

### **Bug Report Template**
```markdown
## 🐛 Bug Description
Clear description of the bug

## 🔄 Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## 💭 Expected Behavior
What should have happened

## 📸 Screenshots
(If applicable)

## 🖥️ Environment
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Device: [e.g. iPhone6]
```

## ✨ Feature Requests

### **Feature Request Template**
```markdown
## 🚀 Feature Description
Clear description of the feature

## 💡 Problem Statement
What problem does this solve?

## 🎯 Proposed Solution
How should this feature work?

## 🎨 Design Mockups
(If applicable)

## 🔧 Technical Considerations
Any technical requirements or constraints?
```

## 📚 Documentation

### **Documentation Standards**
- Use clear, concise language
- Include code examples
- Add screenshots for UI features
- Keep documentation up to date

### **Areas Needing Documentation**
- Component usage examples
- API integration guides
- Deployment instructions
- Performance optimization tips

## 🏆 Recognition

### **Contributors Wall**
Outstanding contributors will be:
- 🌟 Featured in README
- 🏷️ Tagged in releases
- 🎉 Mentioned in project updates

### **Contributor Levels**
- **🥉 Bronze**: 1-5 merged PRs
- **🥈 Silver**: 6-15 merged PRs
- **🥇 Gold**: 16+ merged PRs
- **💎 Diamond**: Significant feature contributions

## 📞 Getting Help

### **Discussion Channels**
- 💬 **GitHub Discussions** - General questions and ideas
- 🐛 **GitHub Issues** - Bug reports and feature requests
- 📧 **Email** - Direct contact for sensitive issues

### **Response Times**
- 🐛 **Bug Reports**: 24-48 hours
- ✨ **Feature Requests**: 3-5 days
- 🔄 **Pull Reviews**: 2-3 days
- ❓ **Questions**: 12-24 hours

## 📜 Code of Conduct

### **Our Standards**
- ✅ Be respectful and inclusive
- ✅ Provide constructive feedback
- ✅ Focus on what's best for the community
- ❌ No harassment or discrimination
- ❌ No spam or self-promotion

### **Enforcement**
- First violation: Warning
- Second violation: Temporary ban
- Third violation: Permanent ban

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Amazon Clone! 🎉**

*Together, we're building something amazing!* ✨