import { IsSetupFor, isSetupforMax } from "../Recoil/atom";

const ORG_URL = "https://www.elvee.in";
const DEMO_URL_ADDRESS = "https://sonasons.optigoapps.com";
const VIMAL_URL = "https://vimalgoldanddiamond.com";

const URL_ADDRESS = IsSetupFor ? DEMO_URL_ADDRESS : ORG_URL;

const ElveeMetaData = {
  "/LoginOption": {
    title: "Login | Elvee",
    description: "Log in or sign up to Elvee using email or mobile.",
    canonical: `${URL_ADDRESS}/LoginOption`,
    keywords: "Elvee login, sign in, register, email login, mobile login",
  },
  "/ContinueWithEmail": {
    title: "Continue with Email | Elvee",
    description: "Continue your login with email on Elvee.",
    canonical: `${URL_ADDRESS}/ContinueWithEmail`,
    keywords: "email login, continue login, Elvee login, sign in",
  },
  "/ContinueWithMobile": {
    title: "Continue with Mobile | Elvee",
    description: "Continue your login with mobile on Elvee.",
    canonical: `${URL_ADDRESS}/ContinueWithMobile`,
    keywords: "mobile login, Elvee mobile sign in, OTP login",
  },
  "/LoginWithEmail": {
    title: "Login with Email | Elvee",
    description: "Log in to Elvee using your email address.",
    canonical: `${URL_ADDRESS}/LoginWithEmail`,
    keywords: "email login, Elvee sign in, secure login",
  },
  "/LoginWithEmailCode": {
    title: "Login with Email Code | Elvee",
    description: "Enter the code sent to your email to log in.",
    canonical: `${URL_ADDRESS}/LoginWithEmailCode`,
    keywords: "email code login, OTP login, verify code",
  },
  "/LoginWithMobileCode": {
    title: "Login with Mobile Code | Elvee",
    description: "Enter the code sent to your mobile to log in.",
    canonical: `${URL_ADDRESS}/LoginWithMobileCode`,
    keywords: "mobile code login, OTP verification, SMS login",
  },
  "/ForgotPass": {
    title: "Forgot Password | Elvee",
    description: "Reset your Elvee password using your email or mobile.",
    canonical: `${URL_ADDRESS}/ForgotPass`,
    keywords: "forgot password, reset password, Elvee account recovery",
  },
  "/cartPage": {
    title: "Cart | Elvee",
    description: "Your shopping cart on Elvee.",
    canonical: `${URL_ADDRESS}/cartPage`,
    keywords: "shopping cart, Elvee cart, checkout",
  },
  "/myWishList": {
    title: "Wishlist | Elvee",
    description: "Your wishlist on Elvee.",
    canonical: `${URL_ADDRESS}/myWishList`,
    keywords: "wishlist, favorite items, saved products",
  },
  "/Delivery": {
    title: "Delivery | Elvee",
    description: "Your delivery details on Elvee.",
    canonical: `${URL_ADDRESS}/Delivery`,
    keywords: "delivery info, shipping, Elvee order delivery",
  },
  "/payment": {
    title: "Payment | Elvee",
    description: "Your payment details on Elvee.",
    canonical: `${URL_ADDRESS}/payment`,
    keywords: "Elvee payment, checkout, secure payment",
  },
  "/Confirmation": {
    title: "Confirmation | Elvee",
    description: "Your order confirmation on Elvee.",
    canonical: `${URL_ADDRESS}/Confirmation`,
    keywords: "order confirmation, Elvee order, purchase complete",
  },
  "/p/*": {
    title: "Product List | Elvee",
    description: "Browse our collection of products on Elvee.",
    canonical: `${URL_ADDRESS}/p`,
    keywords: "product list, shop, Elvee products, categories",
  },
  "/d/*": {
    title: "Product Detail | Elvee",
    description: "View detailed information about a product on Elvee.",
    canonical: `${URL_ADDRESS}/d`,
    keywords: "product detail, Elvee item, product information",
  },
  "/Lookbook": {
    title: "Lookbook | Elvee",
    description: "Explore the latest lookbook from Elvee.",
    canonical: `${URL_ADDRESS}/Lookbook`,
    keywords: "lookbook, Elvee style, fashion guide",
  },
  "/account": {
    title: "Account | Elvee",
    description: "Your account details on Elvee.",
    canonical: `${URL_ADDRESS}/account`,
    keywords: "account settings, profile, Elvee user info",
  },
  "/aboutUs": {
    title: "About Us | Elvee",
    description: "Learn more about Elvee, our mission, and our team.",
    canonical: `${URL_ADDRESS}/aboutUs`,
    keywords: "about Elvee, company info, team, mission, About Us",
  },
  "/history": {
    title: "History | Elvee",
    description: "Explore the history and milestones of Elvee.",
    canonical: `${URL_ADDRESS}/history`,
    keywords: "Elvee history, milestones, brand journey, History",
  },
  "/term&condition": {
    title: "Terms and Conditions | Elvee",
    description: "Read our terms and conditions to use Elvee.",
    canonical: `${URL_ADDRESS}/term&condition`,
    keywords: "terms, conditions, user agreement, policies, Terms and Conditions",
  },
  "/customerServices": {
    title: "Customer Services | Elvee",
    description: "Contact our customer support for help and inquiries.",
    canonical: `${URL_ADDRESS}/customerServices`,
    keywords: "customer support, help, Elvee service, Customer Services",
  },
  "/customize": {
    title: "Customize | Elvee",
    description: "Customize your Elvee experience with personalization.",
    canonical: `${URL_ADDRESS}/customize`,
    keywords: "customize Elvee, personalization, user settings, Customize",
  },
  "/privacy": {
    title: "Privacy Policy | Elvee",
    description: "Understand how Elvee handles your data.",
    canonical: `${URL_ADDRESS}/privacy`,
    keywords: "privacy policy, data handling, security, GDPR, Privacy Policy",
  },
  "/contact-us": {
    title: "Contact Us | Elvee",
    description: "Get in touch with Elvee for any queries or feedback.",
    canonical: `${URL_ADDRESS}/contact-us`,
    keywords: "contact Elvee, customer support, inquiries, Contact Us",
  },
  "/careers": {
    title: "Careers | Elvee",
    description: "Explore job opportunities at Elvee.",
    canonical: `${URL_ADDRESS}/careers`,
    keywords: "Elvee careers, job openings, work with us, Careers",
  },
  "/appointment": {
    title: "Appointment | Elvee",
    description: "Schedule an appointment with Elvee.",
    canonical: `${URL_ADDRESS}/appointment`,
    keywords: "appointment, schedule, book a visit, Appointment",
  },
  "/faqs": {
    title: "FAQs | Elvee",
    description: "Frequently asked questions about Elvee.",
    canonical: `${URL_ADDRESS}/faqs`,
    keywords: "FAQs, help, common questions, support,FAQs",
  },
};

const VimalMetaData = {
  "/LoginOption": {
    title: "Login | Vimal Gold and Diamond",
    description: "Log in or sign up to Vimal Gold and Diamond using email or mobile.",
    canonical: `${VIMAL_URL}/LoginOption`,
    keywords: "Vimal login, sign in, register, email login, mobile login",
  },
  "/ContinueWithEmail": {
    title: "Continue with Email | Vimal Gold and Diamond",
    description: "Continue your login with email.",
    canonical: `${VIMAL_URL}/ContinueWithEmail`,
    keywords: "email login, continue login, Vimal login",
  },
  "/ContinueWithMobile": {
    title: "Continue with Mobile | Vimal Gold and Diamond",
    description: "Continue your login with mobile.",
    canonical: `${VIMAL_URL}/ContinueWithMobile`,
    keywords: "mobile login, OTP login, Vimal sign in",
  },
  "/LoginWithEmail": {
    title: "Login with Email | Vimal Gold and Diamond",
    description: "Log in using your email address.",
    canonical: `${VIMAL_URL}/LoginWithEmail`,
    keywords: "email login, secure login",
  },
  "/LoginWithEmailCode": {
    title: "Login with Email Code | Vimal Gold and Diamond",
    description: "Enter the code sent to your email to log in.",
    canonical: `${VIMAL_URL}/LoginWithEmailCode`,
    keywords: "email code login, OTP login",
  },
  "/LoginWithMobileCode": {
    title: "Login with Mobile Code | Vimal Gold and Diamond",
    description: "Enter the code sent to your mobile.",
    canonical: `${VIMAL_URL}/LoginWithMobileCode`,
    keywords: "mobile OTP login, SMS verification",
  },
  "/ForgotPass": {
    title: "Forgot Password | Vimal Gold and Diamond",
    description: "Reset your password using email or mobile.",
    canonical: `${VIMAL_URL}/ForgotPass`,
    keywords: "forgot password, reset password",
  },
  "/cartPage": {
    title: "Cart | Vimal Gold and Diamond",
    description: "Your shopping cart.",
    canonical: `${VIMAL_URL}/cartPage`,
    keywords: "shopping cart, checkout",
  },
  "/myWishList": {
    title: "Wishlist | Vimal Gold and Diamond",
    description: "Your wishlist items.",
    canonical: `${VIMAL_URL}/myWishList`,
    keywords: "wishlist, saved items",
  },
  "/Delivery": {
    title: "Delivery | Vimal Gold and Diamond",
    description: "Your delivery details.",
    canonical: `${VIMAL_URL}/Delivery`,
    keywords: "delivery info, shipping",
  },
  "/payment": {
    title: "Payment | Vimal Gold and Diamond",
    description: "Your payment details.",
    canonical: `${VIMAL_URL}/payment`,
    keywords: "payment, checkout, secure payment",
  },
  "/Confirmation": {
    title: "Order Confirmation | Vimal Gold and Diamond",
    description: "Your order confirmation.",
    canonical: `${VIMAL_URL}/Confirmation`,
    keywords: "order confirmation, purchase complete",
  },
  "/p/*": {
    title: "Diamond Jewellery Collection | Vimal Gold and Diamond",
    description: "Browse premium diamond jewellery collection.",
    canonical: `${VIMAL_URL}/p`,
    keywords: "diamond jewellery, rings, earrings, necklaces",
  },
  "/d/*": {
    title: "Product Detail | Vimal Gold and Diamond",
    description: "View detailed product information.",
    canonical: `${VIMAL_URL}/d`,
    keywords: "product detail, diamond product",
  },
  "/Lookbook": {
    title: "Lookbook | Vimal Gold and Diamond",
    description: "Explore latest jewellery collections.",
    canonical: `${VIMAL_URL}/Lookbook`,
    keywords: "lookbook, jewellery designs",
  },
  "/account": {
    title: "My Account | Vimal Gold and Diamond",
    description: "Manage your account details.",
    canonical: `${VIMAL_URL}/account`,
    keywords: "account settings, profile",
  },
  "/aboutUs": {
    title: "About Us | Vimal Gold and Diamond",
    description: "Learn about Vimal Gold and Diamond.",
    canonical: `${VIMAL_URL}/aboutUs`,
    keywords: "about Vimal, jewellery brand",
  },
  "/history": {
    title: "Our History | Vimal Gold and Diamond",
    description: "Explore our journey and milestones.",
    canonical: `${VIMAL_URL}/history`,
    keywords: "brand history, jewellery journey",
  },
  "/term&condition": {
    title: "Terms and Conditions | Vimal Gold and Diamond",
    description: "Read our terms and conditions.",
    canonical: `${VIMAL_URL}/term&condition`,
    keywords: "terms, policies, agreement",
  },
  "/customerServices": {
    title: "Customer Services | Vimal Gold and Diamond",
    description: "Contact our support team.",
    canonical: `${VIMAL_URL}/customerServices`,
    keywords: "customer support, help",
  },
  "/customize": {
    title: "Customize Jewellery | Vimal Gold and Diamond",
    description: "Customize your jewellery.",
    canonical: `${VIMAL_URL}/customize`,
    keywords: "custom jewellery, personalization",
  },
  "/privacy": {
    title: "Privacy Policy | Vimal Gold and Diamond",
    description: "Learn how we handle your data.",
    canonical: `${VIMAL_URL}/privacy`,
    keywords: "privacy policy, data security",
  },
  "/contact-us": {
    title: "Contact Us | Vimal Gold and Diamond",
    description: "Get in touch with us.",
    canonical: `${VIMAL_URL}/contact-us`,
    keywords: "contact, support",
  },
  "/careers": {
    title: "Careers | Vimal Gold and Diamond",
    description: "Explore job opportunities.",
    canonical: `${VIMAL_URL}/careers`,
    keywords: "careers, jobs",
  },
  "/appointment": {
    title: "Book Appointment | Vimal Gold and Diamond",
    description: "Schedule a visit or consultation.",
    canonical: `${VIMAL_URL}/appointment`,
    keywords: "appointment booking",
  },
  "/faqs": {
    title: "FAQs | Vimal Gold and Diamond",
    description: "Frequently asked questions.",
    canonical: `${VIMAL_URL}/faqs`,
    keywords: "FAQs, help",
  },
};

const ElveeDefaultMetadata = {
  title: "elvee",
  description: "Elvee Jewels is a prestigious bridal jewelry brand crafting timeless pieces that celebrate romance, elegance, and cultural heritage with sophistication.",
  canonical: URL_ADDRESS,
  keywords: "Elvee, elvee ,bridal jewelry, elegant jewelry, fashion jewelry, Elvee jewels, ELvee Jewels Private limited, elveester, Elveester",
};

const SonasonsMetaData = {
  "/LoginOption": {
    title: "Login | Sonasons",
    description: "Log in or sign up to Sonasons using email or mobile.",
    canonical: `${URL_ADDRESS}/LoginOption`,
    keywords: "Sonasons login, sign in, register, email login, mobile login",
  },
  "/ContinueWithEmail": {
    title: "Continue with Email | Sonasons",
    description: "Continue your login with email on Sonasons.",
    canonical: `${URL_ADDRESS}/ContinueWithEmail`,
    keywords: "email login, continue login, Sonasons login, sign in",
  },
  "/ContinueWithMobile": {
    title: "Continue with Mobile | Sonasons",
    description: "Continue your login with mobile on Sonasons.",
    canonical: `${URL_ADDRESS}/ContinueWithMobile`,
    keywords: "mobile login, Sonasons mobile sign in, OTP login",
  },
  "/LoginWithEmail": {
    title: "Login with Email | Sonasons",
    description: "Log in to Sonasons using your email address.",
    canonical: `${URL_ADDRESS}/LoginWithEmail`,
    keywords: "email login, Sonasons sign in, secure login",
  },
  "/LoginWithEmailCode": {
    title: "Login with Email Code | Sonasons",
    description: "Enter the code sent to your email to log in.",
    canonical: `${URL_ADDRESS}/LoginWithEmailCode`,
    keywords: "email code login, OTP login, verify code",
  },
  "/LoginWithMobileCode": {
    title: "Login with Mobile Code | Sonasons",
    description: "Enter the code sent to your mobile to log in.",
    canonical: `${URL_ADDRESS}/LoginWithMobileCode`,
    keywords: "mobile code login, OTP verification, SMS login",
  },
  "/ForgotPass": {
    title: "Forgot Password | Sonasons",
    description: "Reset your Sonasons password using your email or mobile.",
    canonical: `${URL_ADDRESS}/ForgotPass`,
    keywords: "forgot password, reset password, Sonasons account recovery",
  },
  "/cartPage": {
    title: "Cart | Sonasons",
    description: "Your shopping cart on Sonasons.",
    canonical: `${URL_ADDRESS}/cartPage`,
    keywords: "shopping cart, Sonasons cart, checkout",
  },
  "/myWishList": {
    title: "Wishlist | Sonasons",
    description: "Your wishlist on Sonasons.",
    canonical: `${URL_ADDRESS}/myWishList`,
    keywords: "wishlist, favorite items, saved products",
  },
  "/Delivery": {
    title: "Delivery | Sonasons",
    description: "Your delivery details on Sonasons.",
    canonical: `${URL_ADDRESS}/Delivery`,
    keywords: "delivery info, shipping, Sonasons order delivery",
  },
  "/payment": {
    title: "Payment | Sonasons",
    description: "Your payment details on Sonasons.",
    canonical: `${URL_ADDRESS}/payment`,
    keywords: "Sonasons payment, checkout, secure payment",
  },
  "/Confirmation": {
    title: "Confirmation | Sonasons",
    description: "Your order confirmation on Sonasons.",
    canonical: `${URL_ADDRESS}/Confirmation`,
    keywords: "order confirmation, Sonasons order, purchase complete",
  },
  "/p/*": {
    title: "Product List | Sonasons",
    description: "Browse our collection of products on Sonasons.",
    canonical: `${URL_ADDRESS}/p`,
    keywords: "product list, shop, Sonasons products, categories",
  },
  "/d/*": {
    title: "Product Detail | Sonasons",
    description: "View detailed information about a product on Sonasons.",
    canonical: `${URL_ADDRESS}/d`,
    keywords: "product detail, Sonasons item, product information",
  },
  "/Lookbook": {
    title: "Lookbook | Sonasons",
    description: "Explore the latest lookbook from Sonasons.",
    canonical: `${URL_ADDRESS}/Lookbook`,
    keywords: "lookbook, Sonasons style, fashion guide",
  },
  "/account": {
    title: "Account | Sonasons",
    description: "Your account details on Sonasons.",
    canonical: `${URL_ADDRESS}/account`,
    keywords: "account settings, profile, Sonasons user info",
  },
  "/aboutUs": {
    title: "About Us | Sonasons",
    description: "Learn more about Sonasons, our mission, and our team.",
    canonical: `${URL_ADDRESS}/aboutUs`,
    keywords: "about Sonasons, company info, team, mission, About Us",
  },
  "/history": {
    title: "History | Sonasons",
    description: "Explore the history and milestones of Sonasons.",
    canonical: `${URL_ADDRESS}/history`,
    keywords: "Sonasons history, milestones, brand journey, History",
  },
  "/term&condition": {
    title: "Terms and Conditions | Sonasons",
    description: "Read our terms and conditions to use Sonasons.",
    canonical: `${URL_ADDRESS}/term&condition`,
    keywords: "terms, conditions, user agreement, policies, Terms and Conditions",
  },
  "/customerServices": {
    title: "Customer Services | Sonasons",
    description: "Contact our customer support for help and inquiries.",
    canonical: `${URL_ADDRESS}/customerServices`,
    keywords: "customer support, help, Sonasons service, Customer Services",
  },
  "/customize": {
    title: "Customize | Sonasons",
    description: "Customize your Sonasons experience with personalization.",
    canonical: `${URL_ADDRESS}/customize`,
    keywords: "customize Sonasons, personalization, user settings, Customize",
  },
  "/privacy": {
    title: "Privacy Policy | Sonasons",
    description: "Understand how Sonasons handles your data.",
    canonical: `${URL_ADDRESS}/privacy`,
    keywords: "privacy policy, data handling, security, GDPR, Privacy Policy",
  },
  "/contact-us": {
    title: "Contact Us | Sonasons",
    description: "Get in touch with Sonasons for any queries or feedback.",
    canonical: `${URL_ADDRESS}/contact-us`,
    keywords: "contact Sonasons, customer support, inquiries, Contact Us",
  },
  "/careers": {
    title: "Careers | Sonasons",
    description: "Explore job opportunities at Sonasons.",
    canonical: `${URL_ADDRESS}/careers`,
    keywords: "Sonasons careers, job openings, work with us, Careers",
  },
  "/appointment": {
    title: "Appointment | Sonasons",
    description: "Schedule an appointment with Sonasons.",
    canonical: `${URL_ADDRESS}/appointment`,
    keywords: "appointment, schedule, book a visit, Appointment",
  },
  "/faqs": {
    title: "FAQs | Sonasons",
    description: "Frequently asked questions about Sonasons.",
    canonical: `${URL_ADDRESS}/faqs`,
    keywords: "FAQs, help, common questions, support, FAQs",
  },
};

const SonasonsDefaultMetadata = {
  title: "Sonasons",
  description: "Sonasons Jewels is a prestigious bridal jewelry brand crafting timeless pieces that celebrate romance, elegance, and cultural heritage with sophistication.",
  canonical: URL_ADDRESS,
  keywords: "Sonasons, sonasons, bridal jewelry, elegant jewelry, fashion jewelry, Sonasons jewels, Sonasons Jewels Private Limited",
};

const VimalDefaultMetadata = {
  title: "Vimal Gold and Diamond",
  description: "Vimal Gold and Diamond offers premium real diamond jewellery including rings, necklaces, earrings and custom designs.",
  canonical: VIMAL_URL,
  keywords: "Vimal Gold and Diamond, diamond jewellery India, Surat diamond, engagement rings, gold jewellery",
};

const isElveebreadcrumbData = [{ name: "Home", url: "https://www.elvee.in" }];

const isSonasonsbreadcrumbData = [{ name: "Home", url: "https://sonasons.optigoapps.com/" }];

const isVimalbreadcrumbData = [{ name: "Home", url: "https://vimalgoldanddiamond.com/" }];

const createVimalSchema = ({ logoUrl }) => [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vimal Gold and Diamond",
    alternateName: "Vimal Diamonds",
    url: "https://vimalgoldanddiamond.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://vimalgoldanddiamond.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vimal Gold and Diamond",
    url: "https://vimalgoldanddiamond.com/",
    logo: logoUrl,
    sameAs: ["https://www.instagram.com/", "https://www.facebook.com/"],
  },
];

const createSchema = ({ logoUrl }) => {
  if (isSetupforMax === true) {
    return createVimalSchema({ logoUrl });
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Sonasons",
        alternateName: "Sonasons Jewellery",
        url: "https://sonasons.optigoapps.com/",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://sonasons.optigoapps.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Sonasons",
        url: "https://sonasons.optigoapps.com/",
        logo: logoUrl,
        sameAs: ["https://www.instagram.com/sonasons", "https://www.facebook.com/sonasons", "https://www.linkedin.com/company/sonasons"],
      },
    ];
  } else {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "elvee",
        alternateName: "elvee",
        url: "https://www.elvee.in/",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.elvee.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "elvee",
        alternateName: "elvee",
        url: "https://www.elvee.in/",
        logo: "https://www.elvee.in/WebSiteStaticImage/logoIcon/webLogo.png",
        sameAs: ["https://www.instagram.com/elvee.jewels", "https://in.pinterest.com/elvee_jewels", "https://www.facebook.com/elveejewels", "https://www.linkedin.com/company/elvee-jewels"],
      },
    ];
  }
};

const Demo = true;

const DemoMeta = Demo ? SonasonsMetaData : VimalMetaData;
const DemoDefaultMetadata = Demo ? SonasonsDefaultMetadata : VimalDefaultMetadata;
const DemoBreadcrumbData = Demo ? isSonasonsbreadcrumbData : isVimalbreadcrumbData;

const metaData = IsSetupFor ? DemoMeta : ElveeMetaData;
const defaultMetadata = IsSetupFor ? DemoDefaultMetadata : ElveeDefaultMetadata;
const breadcrumbData = isSetupforMax ? DemoBreadcrumbData : isElveebreadcrumbData;

export { metaData, defaultMetadata, createSchema, breadcrumbData };
