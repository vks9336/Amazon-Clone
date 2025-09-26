import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    home: 'Home',
    search: 'Search',
    cart: 'Cart',
    account: 'Account',
    orders: 'Orders',
    wishlist: 'Wishlist',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    
    // Product
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    addToWishlist: 'Add to Wishlist',
    removeFromWishlist: 'Remove from Wishlist',
    productDetails: 'Product Details',
    reviews: 'Reviews',
    rating: 'Rating',
    price: 'Price',
    originalPrice: 'Original Price',
    discount: 'Discount',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    lowStock: 'Low Stock',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    continueShopping: 'Continue Shopping',
    proceedToCheckout: 'Proceed to Checkout',
    quantity: 'Quantity',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax',
    total: 'Total',
    remove: 'Remove',
    
    // Checkout
    checkout: 'Checkout',
    billingAddress: 'Billing Address',
    shippingAddress: 'Shipping Address',
    paymentMethod: 'Payment Method',
    orderSummary: 'Order Summary',
    placeOrder: 'Place Order',
    orderPlaced: 'Order Placed Successfully!',
    
    // Search
    searchPlaceholder: 'Search products...',
    searchResults: 'Search Results',
    noResults: 'No results found',
    filters: 'Filters',
    sortBy: 'Sort By',
    relevance: 'Relevance',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    newest: 'Newest',
    mostPopular: 'Most Popular',
    
    // Categories
    electronics: 'Electronics',
    computers: 'Computers',
    smartHome: 'Smart Home',
    fashion: 'Fashion',
    homeKitchen: 'Home & Kitchen',
    sports: 'Sports & Outdoors',
    books: 'Books',
    beauty: 'Beauty & Personal Care',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    open: 'Open',
    view: 'View',
    share: 'Share',
    like: 'Like',
    unlike: 'Unlike',
    
    // Time
    justNow: 'Just now',
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',
    weeksAgo: 'weeks ago',
    monthsAgo: 'months ago',
    yearsAgo: 'years ago',
    
    // Currency
    currency: 'USD',
    currencySymbol: '$'
  },
  
  es: {
    // Navigation
    home: 'Inicio',
    search: 'Buscar',
    cart: 'Carrito',
    account: 'Cuenta',
    orders: 'Pedidos',
    wishlist: 'Lista de Deseos',
    signIn: 'Iniciar Sesión',
    signOut: 'Cerrar Sesión',
    
    // Product
    addToCart: 'Agregar al Carrito',
    buyNow: 'Comprar Ahora',
    addToWishlist: 'Agregar a Lista de Deseos',
    removeFromWishlist: 'Quitar de Lista de Deseos',
    productDetails: 'Detalles del Producto',
    reviews: 'Reseñas',
    rating: 'Calificación',
    price: 'Precio',
    originalPrice: 'Precio Original',
    discount: 'Descuento',
    inStock: 'En Stock',
    outOfStock: 'Agotado',
    lowStock: 'Poco Stock',
    
    // Cart
    shoppingCart: 'Carrito de Compras',
    cartEmpty: 'Tu carrito está vacío',
    continueShopping: 'Continuar Comprando',
    proceedToCheckout: 'Proceder al Pago',
    quantity: 'Cantidad',
    subtotal: 'Subtotal',
    shipping: 'Envío',
    tax: 'Impuesto',
    total: 'Total',
    remove: 'Eliminar',
    
    // Checkout
    checkout: 'Pago',
    billingAddress: 'Dirección de Facturación',
    shippingAddress: 'Dirección de Envío',
    paymentMethod: 'Método de Pago',
    orderSummary: 'Resumen del Pedido',
    placeOrder: 'Realizar Pedido',
    orderPlaced: '¡Pedido Realizado Exitosamente!',
    
    // Search
    searchPlaceholder: 'Buscar productos...',
    searchResults: 'Resultados de Búsqueda',
    noResults: 'No se encontraron resultados',
    filters: 'Filtros',
    sortBy: 'Ordenar Por',
    relevance: 'Relevancia',
    priceLowToHigh: 'Precio: Menor a Mayor',
    priceHighToLow: 'Precio: Mayor a Menor',
    newest: 'Más Recientes',
    mostPopular: 'Más Populares',
    
    // Categories
    electronics: 'Electrónicos',
    computers: 'Computadoras',
    smartHome: 'Hogar Inteligente',
    fashion: 'Moda',
    homeKitchen: 'Hogar y Cocina',
    sports: 'Deportes y Aire Libre',
    books: 'Libros',
    beauty: 'Belleza y Cuidado Personal',
    
    // Common
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    confirm: 'Confirmar',
    back: 'Atrás',
    next: 'Siguiente',
    previous: 'Anterior',
    close: 'Cerrar',
    open: 'Abrir',
    view: 'Ver',
    share: 'Compartir',
    like: 'Me Gusta',
    unlike: 'No Me Gusta',
    
    // Time
    justNow: 'Ahora mismo',
    minutesAgo: 'hace minutos',
    hoursAgo: 'hace horas',
    daysAgo: 'hace días',
    weeksAgo: 'hace semanas',
    monthsAgo: 'hace meses',
    yearsAgo: 'hace años',
    
    // Currency
    currency: 'EUR',
    currencySymbol: '€'
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    search: 'Rechercher',
    cart: 'Panier',
    account: 'Compte',
    orders: 'Commandes',
    wishlist: 'Liste de Souhaits',
    signIn: 'Se Connecter',
    signOut: 'Se Déconnecter',
    
    // Product
    addToCart: 'Ajouter au Panier',
    buyNow: 'Acheter Maintenant',
    addToWishlist: 'Ajouter à la Liste de Souhaits',
    removeFromWishlist: 'Retirer de la Liste de Souhaits',
    productDetails: 'Détails du Produit',
    reviews: 'Avis',
    rating: 'Note',
    price: 'Prix',
    originalPrice: 'Prix Original',
    discount: 'Remise',
    inStock: 'En Stock',
    outOfStock: 'Rupture de Stock',
    lowStock: 'Stock Faible',
    
    // Cart
    shoppingCart: 'Panier d\'Achat',
    cartEmpty: 'Votre panier est vide',
    continueShopping: 'Continuer les Achats',
    proceedToCheckout: 'Procéder au Paiement',
    quantity: 'Quantité',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    tax: 'Taxe',
    total: 'Total',
    remove: 'Supprimer',
    
    // Checkout
    checkout: 'Paiement',
    billingAddress: 'Adresse de Facturation',
    shippingAddress: 'Adresse de Livraison',
    paymentMethod: 'Méthode de Paiement',
    orderSummary: 'Résumé de la Commande',
    placeOrder: 'Passer la Commande',
    orderPlaced: 'Commande Passée avec Succès!',
    
    // Search
    searchPlaceholder: 'Rechercher des produits...',
    searchResults: 'Résultats de Recherche',
    noResults: 'Aucun résultat trouvé',
    filters: 'Filtres',
    sortBy: 'Trier Par',
    relevance: 'Pertinence',
    priceLowToHigh: 'Prix: Croissant',
    priceHighToLow: 'Prix: Décroissant',
    newest: 'Plus Récent',
    mostPopular: 'Plus Populaire',
    
    // Categories
    electronics: 'Électronique',
    computers: 'Ordinateurs',
    smartHome: 'Maison Intelligente',
    fashion: 'Mode',
    homeKitchen: 'Maison et Cuisine',
    sports: 'Sports et Plein Air',
    books: 'Livres',
    beauty: 'Beauté et Soins Personnels',
    
    // Common
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    cancel: 'Annuler',
    save: 'Sauvegarder',
    edit: 'Modifier',
    delete: 'Supprimer',
    confirm: 'Confirmer',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    close: 'Fermer',
    open: 'Ouvrir',
    view: 'Voir',
    share: 'Partager',
    like: 'J\'aime',
    unlike: 'Je n\'aime pas',
    
    // Time
    justNow: 'À l\'instant',
    minutesAgo: 'il y a minutes',
    hoursAgo: 'il y a heures',
    daysAgo: 'il y a jours',
    weeksAgo: 'il y a semaines',
    monthsAgo: 'il y a mois',
    yearsAgo: 'il y a années',
    
    // Currency
    currency: 'EUR',
    currencySymbol: '€'
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    search: 'Suchen',
    cart: 'Warenkorb',
    account: 'Konto',
    orders: 'Bestellungen',
    wishlist: 'Wunschliste',
    signIn: 'Anmelden',
    signOut: 'Abmelden',
    
    // Product
    addToCart: 'In den Warenkorb',
    buyNow: 'Jetzt Kaufen',
    addToWishlist: 'Zur Wunschliste Hinzufügen',
    removeFromWishlist: 'Von Wunschliste Entfernen',
    productDetails: 'Produktdetails',
    reviews: 'Bewertungen',
    rating: 'Bewertung',
    price: 'Preis',
    originalPrice: 'Ursprünglicher Preis',
    discount: 'Rabatt',
    inStock: 'Auf Lager',
    outOfStock: 'Nicht Verfügbar',
    lowStock: 'Wenig Auf Lager',
    
    // Cart
    shoppingCart: 'Einkaufswagen',
    cartEmpty: 'Ihr Warenkorb ist leer',
    continueShopping: 'Einkauf Fortsetzen',
    proceedToCheckout: 'Zur Kasse Gehen',
    quantity: 'Menge',
    subtotal: 'Zwischensumme',
    shipping: 'Versand',
    tax: 'Steuer',
    total: 'Gesamt',
    remove: 'Entfernen',
    
    // Checkout
    checkout: 'Kasse',
    billingAddress: 'Rechnungsadresse',
    shippingAddress: 'Lieferadresse',
    paymentMethod: 'Zahlungsmethode',
    orderSummary: 'Bestellübersicht',
    placeOrder: 'Bestellung Aufgeben',
    orderPlaced: 'Bestellung Erfolgreich Aufgegeben!',
    
    // Search
    searchPlaceholder: 'Produkte suchen...',
    searchResults: 'Suchergebnisse',
    noResults: 'Keine Ergebnisse gefunden',
    filters: 'Filter',
    sortBy: 'Sortieren Nach',
    relevance: 'Relevanz',
    priceLowToHigh: 'Preis: Niedrig zu Hoch',
    priceHighToLow: 'Preis: Hoch zu Niedrig',
    newest: 'Neueste',
    mostPopular: 'Beliebteste',
    
    // Categories
    electronics: 'Elektronik',
    computers: 'Computer',
    smartHome: 'Smart Home',
    fashion: 'Mode',
    homeKitchen: 'Haushalt & Küche',
    sports: 'Sport & Outdoor',
    books: 'Bücher',
    beauty: 'Schönheit & Pflege',
    
    // Common
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    cancel: 'Abbrechen',
    save: 'Speichern',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    confirm: 'Bestätigen',
    back: 'Zurück',
    next: 'Weiter',
    previous: 'Vorherige',
    close: 'Schließen',
    open: 'Öffnen',
    view: 'Anzeigen',
    share: 'Teilen',
    like: 'Gefällt mir',
    unlike: 'Gefällt mir nicht',
    
    // Time
    justNow: 'Gerade eben',
    minutesAgo: 'vor Minuten',
    hoursAgo: 'vor Stunden',
    daysAgo: 'vor Tagen',
    weeksAgo: 'vor Wochen',
    monthsAgo: 'vor Monaten',
    yearsAgo: 'vor Jahren',
    
    // Currency
    currency: 'EUR',
    currencySymbol: '€'
  }
};

const currencies = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.85 },
  GBP: { symbol: '£', rate: 0.73 },
  JPY: { symbol: '¥', rate: 110 },
  CAD: { symbol: 'C$', rate: 1.25 },
  AUD: { symbol: 'A$', rate: 1.35 },
  INR: { symbol: '₹', rate: 75 },
  CNY: { symbol: '¥', rate: 6.45 }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [isRTL, setIsRTL] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedCurrency = localStorage.getItem('currency') || 'USD';
    
    setLanguage(savedLanguage);
    setCurrency(savedCurrency);
    
    // Set RTL for Arabic/Hebrew
    setIsRTL(['ar', 'he'].includes(savedLanguage));
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('currency', currency);
  }, [language, currency]);

  // Update document direction
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setIsRTL(['ar', 'he'].includes(newLanguage));
  };

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const t = (key, params = {}) => {
    let translation = translations[language]?.[key] || translations['en'][key] || key;
    
    // Replace parameters
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{{${param}}}`, params[param]);
    });
    
    return translation;
  };

  const formatPrice = (price) => {
    const currencyData = currencies[currency];
    const convertedPrice = price * currencyData.rate;
    
    return `${currencyData.symbol}${convertedPrice.toFixed(2)}`;
  };

  const formatDate = (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return new Intl.DateTimeFormat(language, { ...defaultOptions, ...options }).format(date);
  };

  const formatNumber = (number, options = {}) => {
    return new Intl.NumberFormat(language, options).format(number);
  };

  const getAvailableLanguages = () => {
    return [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'it', name: 'Italiano', flag: '🇮🇹' },
      { code: 'pt', name: 'Português', flag: '🇵🇹' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
      { code: 'ja', name: '日本語', flag: '🇯🇵' },
      { code: 'ko', name: '한국어', flag: '🇰🇷' },
      { code: 'zh', name: '中文', flag: '🇨🇳' },
      { code: 'ar', name: 'العربية', flag: '🇸🇦' },
      { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
    ];
  };

  const getAvailableCurrencies = () => {
    return Object.keys(currencies).map(code => ({
      code,
      symbol: currencies[code].symbol,
      name: code
    }));
  };

  return (
    <LanguageContext.Provider value={{
      language,
      currency,
      isRTL,
      changeLanguage,
      changeCurrency,
      t,
      formatPrice,
      formatDate,
      formatNumber,
      getAvailableLanguages,
      getAvailableCurrencies,
      translations: translations[language]
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};