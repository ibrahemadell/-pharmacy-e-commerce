import { computed, ref } from 'vue';

const locale = ref("en");
const translations = {
  en: {
    nav: {
      home: "Home",
      all_products: "All Products",
      search_placeholder: "Search medicines, vitamins, skincare...",
      search_mobile: "Search medicines...",
      cart: "Cart",
      dashboard: "Dashboard",
      profile: "My Profile",
      orders: "My Orders",
      sign_out: "Sign Out",
      sign_in: "Sign In",
      register: "Register",
      free_delivery: "Free delivery on orders over 300 EGP",
      call_us: "Call us"
    },
    home: {
      hero_badge: "Trusted Pharmacy Since 2015",
      hero_title_1: "Your Health,",
      hero_title_2: "Our Priority",
      hero_subtitle: "Quality medicines, vitamins & health products delivered to your door. Prescription handling made easy.",
      shop_now: "Shop Now",
      order_whatsapp: "Order via WhatsApp",
      licensed_pharmacy: "Licensed Pharmacy",
      fast_delivery: "Fast Delivery",
      secure_payment: "Secure Payment",
      handpicked: "Handpicked for you",
      featured_products: "Featured Products",
      view_all: "View All",
      limited_offers: "Limited Time Offers",
      up_to: "Up to",
      off: "OFF",
      selected_wellness: "On selected health & wellness products",
      shop_offers: "Shop Offers",
      dont_miss: "Don't miss out",
      todays_offers: "Today's Offers",
      all_offers: "All Offers",
      most_popular: "Most popular",
      best_sellers: "Best Sellers",
      need_prescription: "Need a Prescription Filled?",
      prescription_desc: "Send us your prescription on WhatsApp and our pharmacist will assist you within minutes.",
      chat_pharmacist: "Chat with Our Pharmacist",
      fast_delivery_title: "Fast Delivery",
      fast_delivery_desc: "Same day delivery in Cairo",
      authentic_products_title: "Authentic Products",
      authentic_products_desc: "100% genuine medicines",
      support_title: "24/7 Support",
      support_desc: "Pharmacist always available",
      returns_title: "Easy Returns",
      returns_desc: "7-day hassle-free returns"
    },
    product: {
      rx: "Rx",
      featured: "Featured",
      best_seller: "Best Seller",
      in_stock: "In Stock",
      low_stock: "Low Stock",
      out_of_stock: "Out of Stock",
      add_to_cart: "Add to Cart",
      added: "Added!",
      saving: "Saving...",
      brand: "Brand",
      manufacturer: "Manufacturer",
      unit: "Unit",
      expiry: "Expiry Date",
      description: "Description",
      similar_products: "Similar Products",
      only_left: "{count} left"
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      subtotal: "Subtotal",
      delivery: "Delivery Fee",
      discount: "Discount",
      total: "Total",
      checkout: "Proceed to Checkout",
      promo_code: "Promo Code",
      apply: "Apply",
      items: "items",
      prescription_notice: "This order contains prescription items. You will need to upload/provide a prescription."
    },
    checkout: {
      title: "Checkout",
      shipping_address: "Shipping Address",
      new_address: "Add New Address",
      payment_method: "Payment Method",
      cod: "Cash on Delivery",
      online: "Online Card Payment",
      whatsapp: "Confirm & Order via WhatsApp",
      notes: "Order Notes (Optional)",
      place_order: "Place Order",
      summary: "Order Summary",
      item: "item",
      items: "items",
      success_title: "Order Placed Successfully!",
      success_desc: "Thank you for your order! We will process it immediately.",
      order_number: "Order Number",
      track_orders: "Track My Orders"
    },
    admin: {
      dashboard: "Dashboard",
      products: "Products",
      categories: "Categories",
      inventory: "Inventory",
      orders: "Orders",
      customers: "Customers",
      coupons: "Coupons",
      settings: "Settings",
      analytics: "Analytics",
      add_product: "Add Product",
      edit_product: "Edit Product",
      new_product: "New Product",
      name_en: "Product Name (English) *",
      name_ar: "Product Name (Arabic)",
      desc_en: "Description (English)",
      desc_ar: "Description (Arabic)",
      short_desc_en: "Short Description (English)",
      short_desc_ar: "Short Description (Arabic)",
      category: "Category *",
      brand: "Brand",
      manufacturer: "Manufacturer",
      unit: "Unit",
      barcode: "Barcode",
      price: "Original Price (EGP) *",
      discount_price: "Discount Price (EGP)",
      stock: "Stock Quantity",
      low_stock_threshold: "Low Stock Threshold",
      expiry_date: "Expiry Date",
      publish: "Publish",
      active: "Active (Visible)",
      featured: "Featured",
      best_seller: "Best Seller",
      rx_required: "Prescription Required",
      order_whatsapp: "Order via WhatsApp",
      save_product: "Save Product",
      cancel: "Cancel",
      delete: "Delete",
      confirm_delete_title: "Delete Product",
      confirm_delete_desc: "Are you sure you want to delete {name}? This action cannot be undone."
    },
    common: {
      arabic: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
      english: "English",
      dark_mode: "Dark Mode",
      light_mode: "Light Mode",
      currency: "EGP"
    },
    footer: {
      brand_desc: "Your trusted online pharmacy \u2014 quality medicines, vitamins, and healthcare products delivered to your door.",
      quick_links: "Quick Links",
      categories: "Categories",
      contact: "Contact",
      address: "123 Medical Street, Cairo, Egypt",
      whatsapp_support: "WhatsApp Support",
      track_order: "Track Order",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    }
  },
  ar: {
    nav: {
      home: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
      all_products: "\u0643\u0644 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A",
      search_placeholder: "\u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0623\u062F\u0648\u064A\u0629\u060C \u0627\u0644\u0641\u064A\u062A\u0627\u0645\u064A\u0646\u0627\u062A\u060C \u0627\u0644\u0639\u0646\u0627\u064A\u0629 \u0628\u0627\u0644\u0628\u0634\u0631\u0629...",
      search_mobile: "\u0627\u0628\u062D\u062B \u0639\u0646 \u0623\u062F\u0648\u064A\u0629...",
      cart: "\u0627\u0644\u0633\u0644\u0629",
      dashboard: "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645",
      profile: "\u062D\u0633\u0627\u0628\u064A \u0627\u0644\u0634\u062E\u0635\u064A",
      orders: "\u0637\u0644\u0628\u0627\u062A\u064A",
      sign_out: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C",
      sign_in: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
      register: "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628",
      free_delivery: "\u062A\u0648\u0635\u064A\u0644 \u0645\u062C\u0627\u0646\u064A \u0644\u0644\u0637\u0644\u0628\u0627\u062A \u0641\u0648\u0642 300 \u062C\u0646\u064A\u0647",
      call_us: "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627"
    },
    home: {
      hero_badge: "\u0635\u064A\u062F\u0644\u064A\u0629 \u0645\u0648\u062B\u0648\u0642\u0629 \u0645\u0646\u0630 \u0639\u0627\u0645 2015",
      hero_title_1: "\u0635\u062D\u062A\u0643 \u0647\u064A",
      hero_title_2: "\u0623\u0648\u0644\u0648\u064A\u062A\u0646\u0627 \u0627\u0644\u0642\u0635\u0648\u0649",
      hero_subtitle: "\u0623\u062F\u0648\u064A\u0629 \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062C\u0648\u062F\u0629\u060C \u0641\u064A\u062A\u0627\u0645\u064A\u0646\u0627\u062A \u0648\u0645\u0646\u062A\u062C\u0627\u062A \u0635\u062D\u064A\u0629 \u062A\u0635\u0644\u0643 \u0625\u0644\u0649 \u0628\u0627\u0628 \u0645\u0646\u0632\u0644\u0643. \u0633\u0647\u0648\u0644\u0629 \u0627\u0644\u062A\u0639\u0627\u0645\u0644 \u0645\u0639 \u0627\u0644\u0648\u0635\u0641\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629.",
      shop_now: "\u062A\u0633\u0648\u0642 \u0627\u0644\u0622\u0646",
      order_whatsapp: "\u0627\u0637\u0644\u0628 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628",
      licensed_pharmacy: "\u0635\u064A\u062F\u0644\u064A\u0629 \u0645\u0631\u062E\u0635\u0629",
      fast_delivery: "\u062A\u0648\u0635\u064A\u0644 \u0633\u0631\u064A\u0639",
      secure_payment: "\u062F\u0641\u0639 \u0622\u0645\u0646",
      handpicked: "\u0645\u062E\u062A\u0627\u0631\u0627\u062A \u062E\u0635\u064A\u0635\u0627\u064B \u0644\u0643",
      featured_products: "\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u0645\u0645\u064A\u0632\u0629",
      view_all: "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644",
      limited_offers: "\u0639\u0631\u0648\u0636 \u0644\u0641\u062A\u0631\u0629 \u0645\u062D\u062F\u0648\u062F\u0629",
      up_to: "\u062E\u0635\u0645 \u064A\u0635\u0644 \u0625\u0644\u0649",
      off: "\u062E\u0635\u0645",
      selected_wellness: "\u0639\u0644\u0649 \u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u0635\u062D\u0629 \u0648\u0627\u0644\u0639\u0646\u0627\u064A\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629",
      shop_offers: "\u062A\u0635\u0641\u062D \u0627\u0644\u0639\u0631\u0648\u0636",
      dont_miss: "\u0644\u0627 \u062A\u0641\u0648\u062A \u0627\u0644\u0641\u0631\u0635\u0629",
      todays_offers: "\u0639\u0631\u0648\u0636 \u0627\u0644\u064A\u0648\u0645",
      all_offers: "\u0643\u0644 \u0627\u0644\u0639\u0631\u0648\u0636",
      most_popular: "\u0627\u0644\u0623\u0643\u062B\u0631 \u0634\u0639\u0628\u064A\u0629",
      best_sellers: "\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B",
      need_prescription: "\u0647\u0644 \u062A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u0635\u0631\u0641 \u0648\u0635\u0641\u0629 \u0637\u0628\u064A\u0629\u061F",
      prescription_desc: "\u0623\u0631\u0633\u0644 \u0644\u0646\u0627 \u0627\u0644\u0648\u0635\u0641\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628 \u0648\u0633\u064A\u0642\u0648\u0645 \u0627\u0644\u0635\u064A\u062F\u0644\u064A \u0628\u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u062E\u0644\u0627\u0644 \u062F\u0642\u0627\u0626\u0642 \u0645\u0639\u062F\u0648\u062F\u0629.",
      chat_pharmacist: "\u062A\u062D\u062F\u062B \u0645\u0639 \u0627\u0644\u0635\u064A\u062F\u0644\u064A \u0627\u0644\u0622\u0646",
      fast_delivery_title: "\u062A\u0648\u0635\u064A\u0644 \u0633\u0631\u064A\u0639",
      fast_delivery_desc: "\u062A\u0648\u0635\u064A\u0644 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u064A\u0648\u0645 \u0641\u064A \u0627\u0644\u0642\u0627\u0647\u0631\u0629",
      authentic_products_title: "\u0645\u0646\u062A\u062C\u0627\u062A \u0623\u0635\u0644\u064A\u0629",
      authentic_products_desc: "\u0623\u062F\u0648\u064A\u0629 \u0623\u0635\u0644\u064A\u0629 \u0648\u0645\u0636\u0645\u0648\u0646\u0629 100%",
      support_title: "\u062F\u0639\u0645 \u0639\u0644\u0649 \u0645\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629",
      support_desc: "\u0627\u0644\u0635\u064A\u062F\u0644\u064A \u0645\u062A\u0648\u0627\u062C\u062F \u062F\u0627\u0626\u0645\u0627\u064B \u0644\u0645\u0633\u0627\u0639\u062F\u062A\u0643",
      returns_title: "\u0625\u0631\u062C\u0627\u0639 \u0633\u0647\u0644",
      returns_desc: "\u0625\u0631\u062C\u0627\u0639 \u0633\u0647\u0644 \u0648\u062E\u0627\u0644\u064D \u0645\u0646 \u0627\u0644\u0645\u062A\u0627\u0639\u0628 \u062E\u0644\u0627\u0644 7 \u0623\u064A\u0627\u0645"
    },
    product: {
      rx: "\u0631\u0648\u0634\u062A\u0629",
      featured: "\u0645\u0645\u064A\u0632",
      best_seller: "\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B",
      in_stock: "\u0645\u062A\u0648\u0641\u0631",
      low_stock: "\u0643\u0645\u064A\u0629 \u0645\u062D\u062F\u0648\u062F\u0629",
      out_of_stock: "\u0646\u0641\u0630\u062A \u0627\u0644\u0643\u0645\u064A\u0629",
      add_to_cart: "\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629",
      added: "\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629!",
      saving: "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...",
      brand: "\u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062A\u062C\u0627\u0631\u064A\u0629",
      manufacturer: "\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629",
      unit: "\u0627\u0644\u0648\u062D\u062F\u0629",
      expiry: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",
      description: "\u0627\u0644\u0648\u0635\u0641",
      similar_products: "\u0645\u0646\u062A\u062C\u0627\u062A \u0645\u0634\u0627\u0628\u0647\u0629",
      only_left: "\u0645\u062A\u0628\u0642\u064A {count} \u0641\u0642\u0637"
    },
    cart: {
      title: "\u0633\u0644\u0629 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A",
      empty: "\u0633\u0644\u0629 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A \u0641\u0627\u0631\u063A\u0629",
      subtotal: "\u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064A",
      delivery: "\u0631\u0633\u0648\u0645 \u0627\u0644\u062A\u0648\u0635\u064A\u0644",
      discount: "\u0627\u0644\u062E\u0635\u0645",
      total: "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0644\u064A",
      checkout: "\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0644\u0644\u062F\u0641\u0639",
      promo_code: "\u0643\u0648\u062F \u0627\u0644\u062E\u0635\u0645",
      apply: "\u062A\u0637\u0628\u064A\u0642",
      items: "\u0645\u0646\u062A\u062C\u0627\u062A",
      prescription_notice: "\u064A\u062D\u062A\u0648\u064A \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628 \u0639\u0644\u0649 \u0623\u062F\u0648\u064A\u0629 \u062A\u062A\u0637\u0644\u0628 \u0631\u0648\u0634\u062A\u0629 \u0637\u0628\u064A\u0629. \u064A\u0631\u062C\u0649 \u062A\u062C\u0647\u064A\u0632\u0647\u0627 \u0644\u0625\u0631\u0633\u0627\u0644\u0647\u0627."
    },
    checkout: {
      title: "\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0637\u0644\u0628",
      shipping_address: "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0634\u062D\u0646",
      new_address: "\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0648\u0627\u0646 \u062C\u062F\u064A\u062F",
      payment_method: "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639",
      cod: "\u0627\u0644\u062F\u0641\u0639 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645",
      online: "\u062F\u0641\u0639 \u0628\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0623\u0648\u0646\u0644\u0627\u064A\u0646",
      whatsapp: "\u062A\u0623\u0643\u064A\u062F \u0648\u0627\u0644\u0637\u0644\u0628 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628",
      notes: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0637\u0644\u0628 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",
      place_order: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0637\u0644\u0628",
      summary: "\u0645\u0644\u062E\u0635 \u0627\u0644\u0637\u0644\u0628",
      item: "\u0645\u0646\u062A\u062C",
      items: "\u0645\u0646\u062A\u062C\u0627\u062A",
      success_title: "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D!",
      success_desc: "\u0634\u0643\u0631\u0627\u064B \u0644\u0634\u0631\u0627\u0626\u0643! \u0633\u0646\u0642\u0648\u0645 \u0628\u062A\u062C\u0647\u064A\u0632 \u0637\u0644\u0628\u0643 \u0648\u062A\u0648\u0635\u064A\u0644\u0647 \u0641\u064A \u0623\u0633\u0631\u0639 \u0648\u0642\u062A.",
      order_number: "\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628",
      track_orders: "\u0645\u062A\u0627\u0628\u0639\u0629 \u0637\u0644\u0628\u0627\u062A\u064A"
    },
    admin: {
      dashboard: "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645",
      products: "\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A",
      categories: "\u0627\u0644\u0623\u0642\u0633\u0627\u0645",
      inventory: "\u0627\u0644\u0645\u062E\u0632\u0646",
      orders: "\u0627\u0644\u0637\u0644\u0628\u0627\u062A",
      customers: "\u0627\u0644\u0639\u0645\u0644\u0627\u0621",
      coupons: "\u0627\u0644\u0643\u0648\u0628\u0648\u0646\u0627\u062A",
      settings: "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",
      analytics: "\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A",
      add_product: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0646\u062A\u062C",
      edit_product: "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0646\u062A\u062C",
      new_product: "\u0645\u0646\u062A\u062C \u062C\u062F\u064A\u062F",
      name_en: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C (\u0625\u0646\u062C\u0644\u064A\u0632\u064A) *",
      name_ar: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C (\u0639\u0631\u0628\u064A)",
      desc_en: "\u0627\u0644\u0648\u0635\u0641 (\u0625\u0646\u062C\u0644\u064A\u0632\u064A)",
      desc_ar: "\u0627\u0644\u0648\u0635\u0641 (\u0639\u0631\u0628\u064A)",
      short_desc_en: "\u0648\u0635\u0641 \u0642\u0635\u064A\u0631 (\u0625\u0646\u062C\u0644\u064A\u0632\u064A)",
      short_desc_ar: "\u0648\u0635\u0641 \u0642\u0635\u064A\u0631 (\u0639\u0631\u0628\u064A)",
      category: "\u0627\u0644\u0642\u0633\u0645 *",
      brand: "\u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062A\u062C\u0627\u0631\u064A\u0629",
      manufacturer: "\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629",
      unit: "\u0627\u0644\u0648\u062D\u062F\u0629",
      barcode: "\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062F",
      price: "\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0623\u0635\u0644\u064A (\u062C\u0646\u064A\u0647) *",
      discount_price: "\u0633\u0639\u0631 \u0627\u0644\u062E\u0635\u0645 (\u062C\u0646\u064A\u0647)",
      stock: "\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646",
      low_stock_threshold: "\u062D\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0627\u0644\u0645\u0646\u062E\u0641\u0636",
      expiry_date: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629",
      publish: "\u0627\u0644\u0646\u0634\u0631",
      active: "\u0646\u0634\u0637 (\u0638\u0627\u0647\u0631 \u0641\u064A \u0627\u0644\u0645\u062A\u062C\u0631)",
      featured: "\u0645\u0645\u064A\u0632",
      best_seller: "\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B",
      rx_required: "\u064A\u062A\u0637\u0644\u0628 \u0631\u0648\u0634\u062A\u0629 \u0637\u0628\u064A\u0629",
      order_whatsapp: "\u0637\u0644\u0628 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062A\u0633\u0627\u0628",
      save_product: "\u062D\u0641\u0638 \u0627\u0644\u0645\u0646\u062A\u062C",
      cancel: "\u0625\u0644\u063A\u0627\u0621",
      delete: "\u062D\u0630\u0641",
      confirm_delete_title: "\u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u062A\u062C",
      confirm_delete_desc: "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u062A\u062C {name}\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621."
    },
    common: {
      arabic: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
      english: "English",
      dark_mode: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646",
      light_mode: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062A\u062D",
      currency: "\u062C.\u0645"
    },
    footer: {
      brand_desc: "\u0635\u064A\u062F\u0644\u064A\u062A\u0643 \u0627\u0644\u0645\u0648\u062B\u0648\u0642\u0629 \u0639\u0628\u0631 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u2014 \u0623\u062F\u0648\u064A\u0629 \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062C\u0648\u062F\u0629\u060C \u0641\u064A\u062A\u0627\u0645\u064A\u0646\u0627\u062A \u0648\u0645\u0646\u062A\u062C\u0627\u062A \u0635\u062D\u064A\u0629 \u062A\u0635\u0644\u0643 \u0625\u0644\u0649 \u0628\u0627\u0628 \u0645\u0646\u0632\u0644\u0643.",
      quick_links: "\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629",
      categories: "\u0627\u0644\u0623\u0642\u0633\u0627\u0645",
      contact: "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
      address: "123 \u0634\u0627\u0631\u0639 \u0627\u0644\u0637\u0628\u060C \u0627\u0644\u0642\u0627\u0647\u0631\u0629\u060C \u0645\u0635\u0631",
      whatsapp_support: "\u0627\u0644\u062F\u0639\u0645 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628",
      track_order: "\u062A\u062A\u0628\u0639 \u0637\u0644\u0628\u064A",
      rights: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629.",
      privacy: "\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629",
      terms: "\u0634\u0631\u0648\u0637 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645"
    }
  }
};
const useI18n = () => {
  const dir = computed(() => locale.value === "ar" ? "rtl" : "ltr");
  const t = (key, params) => {
    const keys = key.split(".");
    let translation = translations[locale.value];
    for (const k of keys) {
      if (translation && translation[k] !== void 0) {
        translation = translation[k];
      } else {
        let enTranslation = translations["en"];
        for (const enK of keys) {
          if (enTranslation && enTranslation[enK] !== void 0) {
            enTranslation = enTranslation[enK];
          } else {
            enTranslation = key;
            break;
          }
        }
        return enTranslation;
      }
    }
    if (typeof translation === "string" && params) {
      let str = translation;
      for (const p in params) {
        str = str.replace(`{${p}}`, params[p]);
      }
      return str;
    }
    return translation;
  };
  const setLocale = (l) => {
    locale.value = l;
  };
  const formatCurrency = (amount) => {
    const a = amount === void 0 || amount === null || isNaN(amount) ? 0 : amount;
    if (locale.value === "ar") {
      return `${a} ${t("common.currency")}`;
    }
    return `${a} EGP`;
  };
  return {
    locale,
    t,
    dir,
    setLocale,
    formatCurrency,
    isAr: computed(() => locale.value === "ar"),
    isEn: computed(() => locale.value === "en")
  };
};

export { useI18n as u };
//# sourceMappingURL=useI18n-CmjBwoSx.mjs.map
