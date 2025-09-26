# 📚 Component Documentation

## 🧩 Component Architecture

### **Layout Components**

#### **Header**
```jsx
import Header from './components/layout/Header';

// Features:
// - Responsive navigation
// - Search functionality
// - User authentication state
// - Cart indicator
// - Dark mode toggle
```

#### **Footer**
```jsx
import Footer from './components/layout/Footer';

// Features:
// - Site links
// - Social media links
// - Newsletter signup
// - Legal information
```

### **Product Components**

#### **ProductCard**
```jsx
import ProductCard from './components/product/ProductCard';

<ProductCard
  product={productData}
  onAddToCart={handleAddToCart}
  onWishlist={handleWishlist}
  showQuickView={true}
/>
```

#### **ProductGrid**
```jsx
import ProductGrid from './components/product/ProductGrid';

<ProductGrid
  products={products}
  loading={isLoading}
  columns={4}
  gap={4}
/>
```

### **Cart Components**

#### **CartSidebar**
```jsx
import CartSidebar from './components/cart/CartSidebar';

<CartSidebar
  isOpen={isCartOpen}
  onClose={handleCloseCart}
/>
```

## 🎨 Styling Guidelines

### **Component Naming**
- Use PascalCase for component files
- Use descriptive names: `ProductCard`, not `Card`
- Group related components in folders

### **CSS Classes**
```css
/* Use semantic naming */
.product-card {}
.product-card__image {}
.product-card__title {}
.product-card__price {}

/* Use state modifiers */
.product-card--featured {}
.product-card--on-sale {}
```

### **Responsive Design**
```jsx
// Use Tailwind responsive utilities
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

## 🔄 State Management

### **Context Providers**
```jsx
// Cart Context
const { items, addItem, removeItem, clearCart } = useCart();

// Auth Context
const { user, login, logout, isAuthenticated } = useAuth();

// Theme Context
const { theme, toggleTheme } = useTheme();
```

### **Component State**
```jsx
// Use useState for local component state
const [isLoading, setIsLoading] = useState(false);
const [selectedVariant, setSelectedVariant] = useState(null);

// Use useEffect for side effects
useEffect(() => {
  fetchProductData();
}, [productId]);
```

## 🎭 Animation Guidelines

### **Framer Motion Patterns**
```jsx
// Page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>

// Hover animations
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>

// Stagger children
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item, index) => (
    <motion.div key={index} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

## ♿ Accessibility

### **ARIA Labels**
```jsx
<button
  aria-label="Add to cart"
  aria-describedby="cart-description"
  onClick={handleAddToCart}
>
  <FiShoppingCart />
</button>
```

### **Keyboard Navigation**
```jsx
// Handle keyboard events
const handleKeyDown = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    handleClick();
  }
};
```

### **Focus Management**
```jsx
// Use refs for focus management
const buttonRef = useRef(null);

useEffect(() => {
  if (shouldFocus) {
    buttonRef.current?.focus();
  }
}, [shouldFocus]);
```