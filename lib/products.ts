export type ProductSection = {
  title: string
  body: string
  bullets?: string[]
}

export type Product = {
  slug: string
  name: string
  caption: string
  excerpt: string
  heroCopy: string
  image?: string
  imageAlt?: string
  sections: ProductSection[]
}

export const products: Product[] = [
  {
    slug: 'promotional-products',
    name: 'Promotional Products',
    caption: 'Everyday recall, on-brand and on-budget.',
    excerpt:
      'Leave a lasting impression with purposeful giveaways, onboarding kits, and client gifts that speak your brand language.',
    heroCopy:
      'From first touch to long-term loyalty, we curate branded merchandise that feels premium, considered, and unmistakably you.',
    image: '/products/promotional-products.png',
    imageAlt: 'Selection of Reflekt promotional products and kits',
    sections: [
      {
        title: 'Curated Merch Strategy',
        body:
          'We match the right product mix to your audience, campaign goals, and distribution plan—whether you need trade show handouts, client gifting, or onboarding kits for new hires.',
        bullets: [
          'Audience-first recommendations and sourcing',
          'Kitting and fulfillment coordination',
          'Eco-conscious and premium product options'
        ]
      },
      {
        title: 'Brand Consistency, Every Detail',
        body:
          'Color, finish, imprint, and packaging are dialed in to reinforce your identity without compromise. We manage production to keep every touchpoint perfectly aligned with your standards.'
      },
      {
        title: 'Campaign-Ready Experiences',
        body:
          'We help you transform promotional merch into a story—building themed bundles, experience kits, and measurable drop campaigns that drive conversations and conversions.'
      }
    ]
  },
  {
    slug: 'apparel-merch',
    name: 'Apparel & Merch',
    caption: 'Wearable branding that teams and fans love.',
    excerpt:
      'Show up in style with apparel that nails your fit, fabric, and finishing—from retail-ready to rugged workwear.',
    heroCopy:
      'We design and produce apparel collections that unite crews, excite communities, and keep your brand in heavy rotation.',
    image: '/products/apparel-merch.png',
    imageAlt: 'Selection of branded apparel and merchandise by Reflekt',
    sections: [
      {
        title: 'Collection Planning',
        body:
          'Seasonal drops, evergreen uniforms, or limited-edition collabs—we map out the right mix of garments, accessories, and embellishments to match your brand story.'
      },
      {
        title: 'Premium Decoration Methods',
        body:
          'Embroidery, screen printing, heat transfer, sublimation, appliqué—we select the technique that delivers the right look and lasting quality for each piece.',
        bullets: [
          'Retail-quality finishing standards',
          'Color-matched inks, threads, and trims',
          'Inclusive size ranges and specialty fits'
        ]
      },
      {
        title: 'Fulfillment & Rollout',
        body:
          'Need bulk shipping, event distribution, or managed kitting? We handle logistics so your apparel program launches on time and stress-free.'
      }
    ]
  },
  {
    slug: 'event-branding-kits',
    name: 'Event Branding Kits',
    caption: 'Bring your event story to life, piece by piece.',
    excerpt:
      'Turn any venue into a branded experience with modular kits that travel well and install fast.',
    heroCopy:
      'From VIP lounges to pop-up activations, our kits make setup intuitive and your presence impossible to miss.',
    image: '/products/event-branding-kits.png',
    imageAlt: 'Reflekt event branding kits styled for an activation',
    sections: [
      {
        title: 'Experience Architecture',
        body:
          'We map every touchpoint—from entry moments to photo ops—to ensure the space feels immersive, intentional, and on-brand.'
      },
      {
        title: 'Modular Systems',
        body:
          'Fabric structures, rigid signage, lighting, and digital displays are engineered to assemble quickly, ship compactly, and stand up to the demands of the road.'
      },
      {
        title: 'On-Site Support',
        body:
          'We equip your internal teams and trusted partners with clearly labeled kits, easy installation guides, and dedicated support so setup stays quick and worry-free.'
      }
    ]
  },
  {
    slug: 'trade-show-displays',
    name: 'Trade Show Displays',
    caption: 'Own the aisle with a booth built to convert.',
    excerpt:
      'Command attention with custom structures, lighting, and engagement zones engineered for maximum ROI.',
    heroCopy:
      'We design and produce trade show environments that not only stop traffic—they move prospects into meaningful conversations.',
    image: '/products/trade-show-displays.png',
    imageAlt: 'Reflekt trade show booth design with red lighting',
    sections: [
      {
        title: 'Strategic Layout & Flow',
        body:
          'Entry points, demo zones, storage, and meeting spaces are planned to support your sales goals and staff workflow.'
      },
      {
        title: 'High-Impact Visuals',
        body:
          'Dynamic lighting, layered graphics, and dimensional elements amplify your messaging from every angle.',
        bullets: [
          'Custom structures and modular systems',
          'Immersive graphics, lighting, and spatial storytelling',
          'Flexible packages for multi-show programs'
        ]
      },
      {
        title: 'Show-Ready Logistics',
        body:
          'We kit, label, and ship every component with clear setup guides and exhibitor checklists so your team can assemble confidently—no onsite crew required.'
      }
    ]
  },
  {
    slug: 'banners',
    name: 'Banners',
    caption: 'Bold graphics engineered to perform indoors or out.',
    excerpt:
      'High-resolution banner solutions that hang, stand, or fly wherever your message needs to be seen.',
    heroCopy:
      'From retractable stand kits to massive pole banners, we produce durable graphics with color accuracy you can trust.',
    image: '/products/banners.png',
    imageAlt: 'Reflekt banner displays in a branded environment',
    sections: [
      {
        title: 'Right Format for Every Site',
        body:
          'Pull-ups, step-and-repeats, pole banners, street hardware, mesh backdrops—we recommend the right construction for each environment.'
      },
      {
        title: 'Engineered for Longevity',
        body:
          'UV-resistant inks, reinforced hems, wind slits, grommeting, and hardware selection keep your banners looking sharp in any condition.'
      },
      {
        title: 'Turnkey Deployment',
        body:
          'We manage templating, proofing, production, and installation coordination so your timeline stays tight and predictable.'
      }
    ]
  },
  {
    slug: 'fabric-dye-sublimation',
    name: 'Fabric-Dye Sublimation',
    caption: 'Soft signage with rich color and flawless drape.',
    excerpt:
      'Premium fabric graphics for exhibits, interiors, and events that demand a refined finish.',
    heroCopy:
      'Our dye-sub process delivers vibrant, wrinkle-resistant prints that stretch, glow, and move with your environment.',
    image: '/products/fabric-dye-sublimation.png',
    imageAlt: 'Dye-sublimated fabric display created by Reflekt',
    sections: [
      {
        title: 'Show-Stopping Finishes',
        body:
          'Backlit silicone-edge graphics, pillowcase frames, tension structures, and fabric murals create immersive surfaces with zero glare.'
      },
      {
        title: 'Precision Color Matching',
        body:
          'We profile fabrics to maintain brand color accuracy across translucent, opaque, and double-sided applications.'
      },
      {
        title: 'Built for Reuse',
        body:
          'Lightweight and washable graphics make transport simple and keep your investment looking new show after show.'
      }
    ]
  },
  {
    slug: 'indoor-rigid-signage',
    name: 'Indoor Rigid Signage',
    caption: 'Architectural graphics to guide, inform, and inspire.',
    excerpt:
      'Lobby, retail, and workplace signage fabricated to reinforce your brand story at every turn.',
    heroCopy:
      'We merge materials, finishing, and mounting methods that feel seamless with your interior architecture.',
    image: '/products/indoor-rigid-signage.png',
    imageAlt: 'Interior rigid signage installation for a corporate space',
    sections: [
      {
        title: 'Material Expertise',
        body:
          'Acrylic, PVC, aluminum composite, dimensional letters, and router-cut accents—specified for your durability and aesthetic goals.'
      },
      {
        title: 'Wayfinding & Messaging',
        body:
          'We craft cohesive signage systems that balance clarity with brand personality across directories, room IDs, and regulatory markers.'
      },
      {
        title: 'Precision Installations',
        body:
          'Hardware, adhesives, and templates are tailored to your substrates to ensure a clean, long-lasting finish.'
      }
    ]
  },
  {
    slug: 'outdoor-rigid-signage',
    name: 'Outdoor Rigid Signage',
    caption: 'Built to face the elements without fading your message.',
    excerpt:
      'Monuments, post-and-panel systems, site signage, and directional programs that stay sharp season after season.',
    heroCopy:
      'We engineer exterior signage for visibility, durability, and local code compliance—no surprises, only impact.',
    image: '/products/outdoor-rigid-signage.png',
    imageAlt: 'Outdoor monument signage designed by Reflekt',
    sections: [
      {
        title: 'Structural Durability',
        body:
          'We specify substrates, hardware, and footings to withstand wind load, UV exposure, and temperature swings in your region.'
      },
      {
        title: 'Brand-Forward Design',
        body:
          'Dimensional elements, halo lighting, and layered materials keep your signage elevated without sacrificing clarity.'
      },
      {
        title: 'Permitting & Installation',
        body:
          'We manage surveys, permitting, fabrication, and professional installation so your project meets every regulation and deadline.'
      }
    ]
  },
  {
    slug: 'stickers-decals',
    name: 'Stickers & Decals',
    caption: 'Small format, big impressions.',
    excerpt:
      'Precision-cut decals, labels, and wraps for packaging, windows, equipment, and giveaways.',
    heroCopy:
      'We deliver kiss-cut, contour-cut, and large-run sticker programs with adhesives and finishes dialed in for the job.',
    image: '/products/stickers-decals.png',
    imageAlt: 'Collection of custom stickers and decals from Reflekt',
    sections: [
      {
        title: 'Application-Specific Materials',
        body:
          'We select vinyl, laminates, and adhesives engineered for short-term promos, long-term durability, or specialty surfaces.'
      },
      {
        title: 'Finish Options',
        body:
          'Matte, gloss, metallic, holographic, spot-UV—choose finishes that amplify your design and tactile experience.'
      },
      {
        title: 'Fulfillment Ready',
        body:
          'Sheeted, rolled, or individually packaged—we deliver your stickers in the format that works for distribution and resale.'
      }
    ]
  },
  {
    slug: 'wall-murals',
    name: 'Wall Murals',
    caption: 'Transform blank walls into brand landmarks.',
    excerpt:
      'Custom mural design, production, and installation that energize interiors and reinforce culture.',
    heroCopy:
      'We craft mural experiences that balance bold visuals with architectural harmony, built to impress visitors and inspire teams.',
    image: '/products/wall-murals.png',
    imageAlt: 'Large-scale wall mural installation by Reflekt',
    sections: [
      {
        title: 'Concept through Render',
        body:
          'Our designers translate your brand story into wall-spanning compositions, mockups, and material recommendations.'
      },
      {
        title: 'Production Mastery',
        body:
          'Digitally printed, hand-painted, or mixed-media—each mural is produced to suit your timeline, surface, and maintenance preferences.'
      },
      {
        title: 'Seamless Installs',
        body:
          'Certified installers prep surfaces, apply graphics, and seal finishes to keep murals vibrant for years.'
      }
    ]
  },
  {
    slug: 'floor-graphics',
    name: 'Floor Graphics',
    caption: 'Guide, delight, and brand underfoot.',
    excerpt:
      'Durable floor decals and carpets engineered for high-traffic directions, promotions, and immersive storytelling.',
    heroCopy:
      'We design non-slip, scuff-resistant graphics that perform in arenas, retail, corporate, and event environments alike.',
    image: '/products/floor-graphics.png',
    imageAlt: 'Branded floor graphic path designed by Reflekt',
    sections: [
      {
        title: 'Safety First',
        body:
          'ADA-compliant, slip-rated materials and laminates keep guests protected without dulling your visuals.'
      },
      {
        title: 'Site-Specific Solutions',
        body:
          'Concrete, hardwood, carpet, or turf—we spec the right adhesive and removal process for each surface.'
      },
      {
        title: 'Campaign Execution',
        body:
          'We provide templating, install guides, and rollout support to minimize downtime and maximize impact.'
      }
    ]
  },
  {
    slug: 'window-graphics',
    name: 'Window Graphics',
    caption: 'Activate your glass with storytelling.',
    excerpt:
      'Privacy films, perforated window clings, and seasonal takeovers that captivate from the curb.',
    heroCopy:
      'From storefronts to corporate lobbies, we balance natural light with brand messaging that changes as often as you need.',
    image: '/products/window-graphics.png',
    imageAlt: 'Reflekt window graphics applied to storefront glass',
    sections: [
      {
        title: 'Material Flexibility',
        body:
          'Perforated, translucent, frosted, and opaque films ensure the right blend of visibility, privacy, and light diffusion.'
      },
      {
        title: 'Precision Production',
        body:
          'We manage color calibration and panel alignment for seamless panoramics—even across multi-story glass.'
      },
      {
        title: 'Expert Installation',
        body:
          'Certified installers handle removal, cleaning, and application with minimal disruption to your space.'
      }
    ]
  },
  {
    slug: 'fleet-graphics',
    name: 'Fleet Graphics',
    caption: 'Your rolling billboard, perfectly wrapped.',
    excerpt:
      'Full and partial wraps, DOT compliant markings, and scaling programs for fleets of any size.',
    heroCopy:
      'We translate your brand into high-visibility vehicle graphics with production benchmarks honed over thousands of installs.',
    image: '/products/fleet-graphics.png',
    imageAlt: 'Reflekt fleet graphics wrapping a branded vehicle',
    sections: [
      {
        title: 'Design & Template Accuracy',
        body:
          'Our in-house designers map graphics to exact vehicle specs, ensuring every curve and contour aligns on install day.'
      },
      {
        title: 'Premium Materials',
        body:
          'We spec industry-leading films, laminates, and UV protection to keep colors vibrant through any route.'
      },
      {
        title: 'National Install Network',
        body:
          'Certified installers handle single vehicles or multi-market rollouts with tight scheduling and quality control.'
      }
    ]
  },
  {
    slug: 'installation',
    name: 'Installation',
    caption: 'CERTIFIED INSTALL CREWS COORDINATING NATIONWIDE ROLLOUTS.',
    excerpt:
      'From site surveys to signage, our installation team brings your brand to life flawlessly—no matter the complexity.',
    heroCopy:
      'We plan, permit, and execute installations with seasoned pros who protect your timeline, budget, and brand standards.',
    image: '/products/installation.png',
    imageAlt: 'Reflekt installation team securing branded signage',
    sections: [
      {
        title: 'Site Intelligence',
        body:
          'Surveys, measurements, and substrate testing inform every hardware choice and installation plan.'
      },
      {
        title: 'Safety & Compliance',
        body:
          'We manage OSHA compliance, lift certifications, and permitting to keep projects moving safely and legally.'
      },
      {
        title: 'End-to-End Coordination',
        body:
          'Our project managers orchestrate timelines, deliveries, and post-install inspections so you can launch with confidence.'
      }
    ]
  }
]

export function getAllProducts() {
  return products
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}
