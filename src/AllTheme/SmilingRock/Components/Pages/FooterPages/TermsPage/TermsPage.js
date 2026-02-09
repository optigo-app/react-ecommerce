import { useRecoilValue } from 'recoil';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../../Home/Footer/Footer';
import './termsPage.scss'
import { CurrentSonasonsTheme } from '../../../Recoil/atom';


const SonasonstermsData = {
  introduction: {
    text: "Before using our website located at https://sonasons.optigoapps.com/ and any associated websites linked to it, please take a moment to read and understand these Terms and Conditions carefully. You accept the below TERMS AND CONDITIONS by using our website."
  },
  sections: [
    {
      title: "Product Information",
      content: [
        {
          subtitle: "Product Availability:",
          text: "We make every effort to ensure that the jewelry items listed on our website are available for purchase. However, due to high demand or limited stock, some items may be unavailable or out of stock. We will notify you if an item is out of stock after your purchase."
        },
        {
          subtitle: "Product Accuracy:",
          text: "While we strive to provide accurate descriptions, images, and prices for all jewelry items, slight discrepancies may occur due to differences in lighting, screen settings, or natural variations in materials."
        }
      ]
    },
    {
      title: "Ordering and Payment",
      content: [
        {
          subtitle: "Order Placement:",
          text: "Once you place an order through our website, you will receive an order confirmation email with details of your purchase. This does not signify that your order has been accepted. Acceptance of your order and the completion of the contract between you and Sonasons will occur when we ship your items."
        },
        {
          subtitle: "Pricing:",
          text: "All prices listed on our website are in [Currency] and are subject to change without notice. Any applicable taxes, shipping, and handling charges will be added during checkout."
        },
        {
          subtitle: "Payment Methods:",
          text: "We accept all major credit cards, debit cards, and other payment methods via secure payment gateways. Payments are processed at the time of order confirmation."
        }
      ]
    },
    {
      title: "Shipping and Delivery",
      content: [
        {
          subtitle: "Shipping Method:",
          text: "We offer several shipping options, which will be provided at checkout. Delivery times will vary depending on your location, and we are not responsible for any delays caused by postal services or customs."
        },
        {
          subtitle: "International Shipping:",
          text: "We do offer international shipping; however, customs duties, taxes, or import fees are the responsibility of the customer."
        },
        {
          subtitle: "Shipping Costs:",
          text: "Shipping costs will be calculated at checkout and depend on the delivery location, weight of the order, and chosen shipping method."
        },
        {
          subtitle: "Lost or Damaged Items:",
          text: "If an item is lost or damaged during shipping, please contact us immediately, and we will assist in resolving the issue."
        }
      ]
    },
    {
      title: "Returns and Exchanges",
      content: [
        {
          subtitle: "Return Policy:",
          text: "We are committed to your satisfaction. If you are not happy with your purchase, you can return it within [X] days from the date of receipt. The item must be in its original condition and packaging, unused, and with all tags intact. Please note that some items, such as custom-made jewelry or final sale products, may not be eligible for returns."
        },
        {
          subtitle: "Exchange Policy:",
          text: "If you wish to exchange an item, we offer exchanges for items of equal value within [X] days of receipt. The item must meet the same conditions as our return policy."
        },
        {
          subtitle: "Refunds:",
          text: "Refunds will be issued in the same form of payment as the original purchase. Please allow [X] business days for the refund to process."
        }
      ]
    },
    {
      title: "Warranty",
      content: [
        {
          subtitle: "Limited Warranty:",
          text: "We offer a limited warranty on all our jewelry products to ensure that they are free from defects in materials and craftsmanship. The warranty covers repair or replacement of faulty items due to manufacturing defects within [X] months from the date of purchase."
        },
        {
          subtitle: "Exclusions:",
          text: "The warranty does not cover damage caused by misuse, accidental wear and tear, alterations, or repairs done by unauthorized parties."
        }
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Copyright and Trademarks:",
          text: "All content on this website, including images, logos, text, and designs, is owned by Sonasons or its licensors and is protected by copyright and trademark laws. You may not use, copy, or distribute any content from this website without our express written permission."
        },
        {
          subtitle: "Product Design:",
          text: "Our jewelry designs are unique to Sonasons and are protected under intellectual property laws. Any unauthorized use or replication of our designs is prohibited."
        }
      ]
    },
    {
      title: "Customer Responsibilities",
      content: [
        {
          subtitle: "Account Security:",
          text: "If you create an account on our website, you are responsible for maintaining the confidentiality of your account details, including your password. You agree to notify us immediately of any unauthorized use of your account."
        },
        {
          subtitle: "Accuracy of Information:",
          text: "You agree to provide accurate and complete information when making a purchase or interacting with our website. We are not responsible for any issues caused by inaccurate or incomplete information."
        }
      ]
    },
    {
      title: "Privacy and Data Protection",
      content: [
        {
          subtitle: "Personal Data:",
          text: "We take your privacy seriously. For more information on how we collect, use, and protect your personal data, please refer to our Privacy Policy."
        },
        {
          subtitle: "Third-Party Services:",
          text: "We may use third-party services, such as payment processors or delivery providers, to fulfill your order. These third parties have their own privacy policies, and we encourage you to review them."
        }
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        {
          subtitle: "No Liability for Loss:",
          text: "We are not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our website, the purchase of our jewelry, or any other transaction with us."
        },
        {
          subtitle: "Limitation of Damages:",
          text: "Our liability, in any case, is limited to the amount paid for the product in question."
        }
      ]
    },
    {
      title: "Governing Law and Dispute Resolution",
      content: [
        {
          subtitle: "Governing Law:",
          text: "These Terms & Conditions shall be governed by and construed in accordance with the laws of [Country/Region]."
        },
        {
          subtitle: "Dispute Resolution:",
          text: "Any disputes arising from or related to these Terms & Conditions will be resolved through binding arbitration in [Location]."
        }
      ]
    }
  ],
  conclusion: {
    text: "These Terms and Conditions are designed to ensure a transparent and positive experience for all our valued customers at Shinjini Jewels. Your satisfaction and trust are our top priorities, and we are here to assist you throughout your jewelry journey."
  }
}

const ElliorTermsData = {
  sections: [
    {
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "",
          text: "By accessing and using this website, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please refrain from using our website."
        }
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        {
          subtitle: "",
          text: "All content on this website, including but not limited to text, images, logos, and designs is the intellectual property of Elior Jewel. You may not use, reproduce, or distribute any content without our explicit consent."
        }
      ]
    },
    {
      title: "Product Descriptions",
      content: [
        {
          subtitle: "",
          text: "We strive to provide accurate product information; however, we do not warrant that the content on the website is accurate, complete, or error free. We reserve the right to correct any errors or omissions and to update any product information at any time without any prior notice."
        }
      ]
    },
    {
      title: "Order Acceptance",
      content: [
        {
          subtitle: "",
          text: "All orders are subject to our acceptance and availability. We reserve the right to refuse any order for any reason, including but not limited to availability, product pricing, or errors in product information."
        }
      ]
    },
    {
      title: "Pricing and Payment",
      content: [
        {
          subtitle: "",
          text: "All prices are listed in Indian rupees. We reserve the right to change prices at any time without notice. We accept payments through debit cards, credit cards, net banking and secure third-party payment gateway RazorPay, and we do not store your payment information."
        }
      ]
    },
    {
      title: "Shipping and Returns",
      content: [
        {
          subtitle: "",
          text: "Please refer to our Shipping and Returns policy for information on delivery times, shipping costs, and our return/exchange process."
        }
      ]
    },
    {
      title: "User Conduct",
      content: [
        {
          subtitle: "",
          text: "You agree not to engage in any activity that may disrupt or interfere with the functioning of the website. This includes but is not limited to hacking, unauthorized access, or distribution of harmful code."
        }
      ]
    },
    {
      title: "Privacy Policy",
      content: [
        {
          subtitle: "",
          text: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information."
        }
      ]
    },
    {
      title: "Governing Law",
      content: [
        {
          subtitle: "",
          text: "These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in India."
        }
      ]
    },
    {
      title: "Changes to Terms",
      content: [
        {
          subtitle: "",
          text: "We reserve the right to update or modify these terms and conditions at any time without prior notice. It is your responsibility to review this page periodically for changes."
        }
      ]
    }
  ],

  conclusion: {
    text: "By using this website, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you have any questions or concerns, please contact us at Ph: +91 8866937682"
  }
};



export default function TermsAndConditions() {
  const theme = useRecoilValue(CurrentSonasonsTheme);

  const termsData = theme === "demo" ? SonasonstermsData : ElliorTermsData;
  return (
    <>
      <div className='smr_about_mainDiv'>
        <div className='daimondsEveryAbout'>
          <div className='smr_daimondsEveryAbout_sub' style={{ paddingBottom: '80px', minHeight: '400px' }}>
            <div className="smr-terms">
              {/* <Banner /> */}
              <main className="smr-main">
                <h1 className="smr-title">Terms and Conditions</h1>

                <div className="smr-content">
                  {/* INTRO */}
                  {termsData?.introduction && (<p className="smr-introduction">{termsData?.introduction?.text}</p>)
                  }
                  {/* SONASONS VIEW */}
                  {theme === "demo" && (
                    <>
                      {termsData.sections.map((section, index) => (
                        <section key={index} className="smr-section">
                          <h2 className="smr-section-title">{section.title}</h2>

                          {section.content.map((item, itemIndex) => (
                            <div key={itemIndex} className="smr-section-content">
                              {item.subtitle && (
                                <h3 className="smr-subtitle">{item.subtitle}</h3>
                              )}
                              <p className="smr-text">{item.text}</p>
                            </div>
                          ))}
                        </section>
                      ))}
                    </>
                  )}

                  {/* ELLIOR VIEW (NUMBERED like image) */}
                  {theme === "ellior" && (
                    <ol className="smr-ellior-list">
                      {termsData.sections.map((section, index) => (
                        <li key={index} className="smr-ellior-item">
                          <strong className="smr-ellior-title">
                             {section.title}
                          </strong>

                          {section.content.map((item, itemIndex) => (
                            <p key={itemIndex} className="smr-text">
                              {item.text}
                            </p>
                          ))}
                        </li>
                      ))}
                    </ol>
                  )}

                  {/* CONCLUSION */}
                  <p className="smr-conclusion">{termsData?.conclusion?.text}</p>
                  {theme === "ellior" && (
                    <div className="smr-ellior-email">
                      <span className="smr-ellior-label">Email:</span>
                      <a href='mailto:eliorjewel@gmail.com' className="smr-ellior-email-box">
                        eliorjewel@gmail.com
                      </a>
                    </div>
                  )}

                </div>
              </main>

            </div>
          </div>
          {/* <Footer /> */}
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
        <p style={{ margin: '0px', fontWeight: 500, width: '100px', color: 'white', cursor: 'pointer' }} onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })}>BACK TO TOP</p>
      </div> */}
      </div>
    </>
  )
}


const Banner = ({ title = "Terms and Conditions" }) => {
  const Image = `url(${storImagePath() + "/images/HomePage/Terms/Banner.jpg"
    })`;
  return (
    <>
      <div
        className="shinjini-banner"
        style={{
          backgroundImage: Image,
        }}
      >
        <h1>{title}</h1>
      </div>
    </>
  );
};