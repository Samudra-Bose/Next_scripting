import { getModelSpecs } from "@/app/lib/modelData"

type ModelWireframeIconProps = {
  id: number
  name: string
  category: string
}

export default function ModelWireframeIcon({ id, name }: ModelWireframeIconProps) {
  const specs = getModelSpecs(id)
  const color = specs.accentColor

  // Render unique procedural SVG paths for each model
  const renderShape = () => {
    switch (id) {
      case 1: // Articulated Dragon
        return (
          <path
            d="M20,60 Q35,20 50,45 T80,30 T65,80 T30,75 Z M40,30 L30,15 M55,30 L65,15"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )
      case 2: // Succulent Planter
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <polygon points="30,45 70,45 60,85 40,85" />
            <path d="M50,45 C45,25 35,35 50,45 C55,25 65,35 50,45 C50,20 50,20 50,45" />
          </g>
        )
      case 3: // Cosplay Helmet
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <path d="M25,65 Q25,25 50,25 Q75,25 75,65 L70,80 L30,80 Z" />
            <path d="M30,52 Q50,45 70,52" strokeWidth="4" />
          </g>
        )
      case 4: // Solar System
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <circle cx="50" cy="50" r="14" fill={color} fillOpacity="0.2" />
            <ellipse cx="50" cy="50" rx="42" ry="18" strokeDasharray="3 3" />
            <circle cx="82" cy="45" r="4" fill={color} />
            <ellipse cx="50" cy="50" rx="30" ry="12" />
            <circle cx="25" cy="54" r="3" fill={color} />
          </g>
        )
      case 5: // Abstract Sculpture
        return (
          <path
            d="M30,70 Q20,30 50,30 Q80,30 70,70 Q50,90 30,70 Z M40,50 Q60,30 60,60"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
          />
        )
      case 6: // Tool Holder
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="25" y="45" width="50" height="35" rx="4" />
            <line x1="35" y1="45" x2="35" y2="25" />
            <line x1="50" y1="45" x2="50" y2="20" />
            <line x1="65" y1="45" x2="65" y2="30" />
          </g>
        )
      case 7: // Fantasy Miniature
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <circle cx="50" cy="30" r="10" />
            <path d="M40,40 L60,40 L55,75 L45,75 Z" />
            <line x1="30" y1="35" x2="30" y2="75" strokeWidth="3" />
          </g>
        )
      case 8: // Bracelet Maker
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <ellipse cx="38" cy="50" rx="16" ry="24" />
            <ellipse cx="62" cy="50" rx="16" ry="24" />
          </g>
        )
      case 9: // Printer Upgrade Kit
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="28" y="35" width="44" height="40" rx="4" />
            <circle cx="50" cy="55" r="12" />
            <circle cx="50" cy="55" r="5" fill={color} />
            <rect x="42" y="22" width="16" height="13" />
          </g>
        )
      case 10: // Garden Tool Set
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <path d="M40,55 Q50,90 60,55 Z" />
            <line x1="50" y1="55" x2="50" y2="20" strokeWidth="3" />
          </g>
        )
      case 11: // Chess Set
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <path d="M30,80 L70,80 L62,40 L68,25 L32,25 L38,40 Z" />
            <line x1="44" y1="25" x2="44" y2="32" />
            <line x1="56" y1="25" x2="56" y2="32" />
          </g>
        )
      case 12: // Wall Organizer
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <polygon points="50,25 65,33 65,51 50,59 35,51 35,33" />
            <polygon points="65,51 80,59 80,77 65,85 50,77 50,59" />
            <polygon points="35,51 50,59 50,77 35,85 20,77 20,59" />
          </g>
        )
      case 13: // Prop Sword
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <line x1="50" y1="15" x2="50" y2="65" strokeWidth="3.5" />
            <line x1="30" y1="65" x2="70" y2="65" strokeWidth="3" />
            <line x1="50" y1="65" x2="50" y2="85" strokeWidth="2.5" />
            <circle cx="50" cy="87" r="3" fill={color} />
          </g>
        )
      case 14: // Molecular Model
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <circle cx="50" cy="50" r="10" fill={color} fillOpacity="0.3" />
            <line x1="50" y1="40" x2="50" y2="20" />
            <circle cx="50" cy="20" r="6" />
            <line x1="58" y1="56" x2="75" y2="68" />
            <circle cx="75" cy="68" r="6" />
            <line x1="42" y1="56" x2="25" y2="68" />
            <circle cx="25" cy="68" r="6" />
          </g>
        )
      case 15: // Geometric Wall Art
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <polygon points="50,20 80,75 20,75" />
            <polygon points="50,75 80,20 20,20" />
          </g>
        )
      case 16: // Screwdriver Set
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="42" y="45" width="16" height="35" rx="3" />
            <line x1="50" y1="45" x2="50" y2="18" strokeWidth="3" />
            <polygon points="46,18 54,18 50,14" fill={color} />
          </g>
        )
      case 17: // Dragon Miniature
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <path d="M50,75 C30,60 25,35 50,45 C75,35 70,60 50,75" />
            <path d="M25,35 L15,15 L35,28" />
            <path d="M75,35 L85,15 L65,28" />
          </g>
        )
      case 18: // Earring Collection
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <circle cx="50" cy="25" r="5" />
            <path d="M50,30 C35,50 35,70 50,78 C65,70 65,50 50,30 Z" />
            <circle cx="50" cy="58" r="4" fill={color} />
          </g>
        )
      case 19: // Cooling System
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <circle cx="50" cy="45" r="22" />
            <circle cx="50" cy="45" r="8" />
            <path d="M35,60 L20,80 L40,80" />
            <path d="M65,60 L80,80 L60,80" />
          </g>
        )
      case 20: // Birdhouse Kit
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="30" y="45" width="40" height="38" />
            <polygon points="50,22 75,45 25,45" />
            <circle cx="50" cy="60" r="8" fill={color} fillOpacity="0.3" />
          </g>
        )
      case 21: // Robot Toy
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="34" y="24" width="32" height="24" rx="2" />
            <rect x="28" y="52" width="44" height="30" rx="3" />
            <circle cx="43" cy="36" r="3" fill={color} />
            <circle cx="57" cy="36" r="3" fill={color} />
            <line x1="50" y1="24" x2="50" y2="15" />
            <circle cx="50" cy="14" r="2" fill={color} />
          </g>
        )
      case 22: // Kitchen Organizer
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <polygon points="25,75 55,75 75,35 45,35" />
            <line x1="50" y1="45" x2="68" y2="45" />
            <line x1="43" y1="58" x2="61" y2="58" />
          </g>
        )
      case 23: // Mask Template
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <path d="M25,50 Q50,25 75,50 L65,75 Q50,85 35,75 Z" />
            <circle cx="36" cy="55" r="7" fill={color} fillOpacity="0.2" />
            <circle cx="64" cy="55" r="7" fill={color} fillOpacity="0.2" />
          </g>
        )
      case 24: // DNA Model
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <path d="M35,15 Q65,30 35,50 Q65,70 35,85" />
            <path d="M65,15 Q35,30 65,50 Q35,70 65,85" />
            <line x1="38" y1="30" x2="62" y2="30" />
            <line x1="48" y1="50" x2="52" y2="50" strokeWidth="4" />
            <line x1="38" y1="70" x2="62" y2="70" />
          </g>
        )
      case 25: // Modern Vase
        return (
          <path
            d="M40,20 Q60,20 50,45 Q35,65 35,80 Q50,85 65,80 Q65,65 50,45 Z"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
          />
        )
      case 26: // Wrench Set
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <line x1="50" y1="28" x2="50" y2="72" strokeWidth="4" />
            <circle cx="50" cy="20" r="10" />
            <circle cx="50" cy="80" r="10" />
          </g>
        )
      case 27: // Castle Miniature
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <rect x="25" y="45" width="50" height="35" />
            <rect x="20" y="30" width="16" height="50" />
            <rect x="64" y="30" width="16" height="50" />
            <path d="M43,80 L43,62 Q50,55 57,62 L57,80 Z" fill={color} fillOpacity="0.3" />
          </g>
        )
      case 28: // Pendant Design
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <circle cx="50" cy="50" r="26" />
            <polygon points="50,30 67,60 33,60" />
            <polygon points="50,70 67,40 33,40" />
          </g>
        )
      case 29: // Extruder Upgrade
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="30" y="30" width="40" height="40" rx="3" />
            <circle cx="45" cy="50" r="8" />
            <line x1="55" y1="35" x2="75" y2="20" strokeWidth="3" />
          </g>
        )
      case 30: // Plant Stand
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <ellipse cx="50" cy="35" rx="25" ry="8" />
            <line x1="30" y1="35" x2="20" y2="80" />
            <line x1="70" y1="35" x2="80" y2="80" />
            <line x1="50" y1="42" x2="50" y2="85" />
          </g>
        )
      case 31: // Puzzle Cube
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <polygon points="50,20 80,35 50,50 20,35" />
            <polygon points="20,35 50,50 50,80 20,65" />
            <polygon points="50,50 80,35 80,65 50,80" />
            <line x1="35" y1="27" x2="65" y2="42" />
            <line x1="65" y1="27" x2="35" y2="42" />
          </g>
        )
      case 32: // Bathroom Caddy
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="25" y="45" width="50" height="30" rx="5" />
            <line x1="35" y1="55" x2="35" y2="68" />
            <line x1="50" y1="55" x2="50" y2="68" />
            <line x1="65" y1="55" x2="65" y2="68" />
            <path d="M35,45 Q35,25 50,25 Q65,25 65,45" />
          </g>
        )
      case 33: // Armor Piece
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <path d="M25,35 Q50,20 75,35 L70,50 Q50,40 30,50 Z" />
            <path d="M28,48 Q50,38 72,48 L67,65 Q50,55 33,65 Z" />
            <path d="M32,63 Q50,53 68,63 L62,80 Q50,72 38,80 Z" />
          </g>
        )
      case 34: // Atom Model
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <circle cx="50" cy="50" r="8" fill={color} />
            <ellipse cx="50" cy="50" rx="36" ry="12" />
            <ellipse cx="50" cy="50" rx="36" ry="12" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="36" ry="12" transform="rotate(120 50 50)" />
          </g>
        )
      case 35: // Wall Sculpture
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <path d="M20,35 Q50,15 80,35" />
            <path d="M20,45 Q50,25 80,45" />
            <path d="M20,55 Q50,35 80,55" />
            <path d="M20,65 Q50,45 80,65" />
          </g>
        )
      case 36: // Measuring Tool
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="20" y="45" width="60" height="12" />
            <line x1="25" y1="45" x2="25" y2="25" strokeWidth="3" />
            <line x1="45" y1="45" x2="45" y2="32" strokeWidth="3" />
            <line x1="40" y1="45" x2="40" y2="50" />
            <line x1="50" y1="45" x2="50" y2="50" />
            <line x1="60" y1="45" x2="60" y2="50" />
          </g>
        )
      case 37: // Fantasy Tree
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <path d="M48,80 Q45,55 52,48" strokeWidth="4" />
            <polygon points="50,18 72,45 28,45" fill={color} fillOpacity="0.2" />
            <polygon points="50,32 66,55 34,55" />
          </g>
        )
      case 38: // Ring Collection
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <circle cx="50" cy="56" r="22" />
            <polygon points="40,24 60,24 68,36 32,36" fill={color} fillOpacity="0.2" />
          </g>
        )
      case 39: // Print Fan
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <circle cx="50" cy="50" r="28" />
            <circle cx="50" cy="50" r="8" fill={color} />
            <path d="M50,42 Q40,25 50,22 Q55,32 50,42" fill={color} fillOpacity="0.3" />
            <path d="M56,46 Q75,40 78,48 Q68,54 56,46" fill={color} fillOpacity="0.3" />
            <path d="M44,54 Q25,60 22,52 Q32,46 44,54" fill={color} fillOpacity="0.3" />
          </g>
        )
      case 40: // Tool Rack
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="20" y="30" width="60" height="10" rx="2" />
            <line x1="30" y1="40" x2="30" y2="70" />
            <line x1="45" y1="40" x2="45" y2="60" />
            <line x1="60" y1="40" x2="60" y2="75" />
            <line x1="70" y1="40" x2="70" y2="55" />
          </g>
        )
      case 41: // Action Figure
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <circle cx="50" cy="22" r="8" />
            <line x1="50" y1="30" x2="50" y2="55" strokeWidth="3" />
            <line x1="30" y1="42" x2="70" y2="42" />
            <line x1="50" y1="55" x2="35" y2="82" />
            <line x1="50" y1="55" x2="65" y2="82" />
          </g>
        )
      case 42: // Cable Manager
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <ellipse cx="50" cy="25" rx="18" ry="8" />
            <ellipse cx="50" cy="42" rx="18" ry="8" />
            <ellipse cx="50" cy="59" rx="18" ry="8" />
            <ellipse cx="50" cy="76" rx="18" ry="8" />
          </g>
        )
      case 43: // Prop Shield
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <path d="M25,25 L75,25 L75,55 Q75,80 50,88 Q25,80 25,55 Z" />
            <line x1="50" y1="25" x2="50" y2="85" />
            <line x1="25" y1="45" x2="75" y2="45" />
          </g>
        )
      case 44: // Cell Model
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <ellipse cx="50" cy="50" rx="32" ry="24" />
            <ellipse cx="45" cy="45" rx="12" ry="10" fill={color} fillOpacity="0.25" />
            <circle cx="65" cy="45" r="4" fill={color} />
            <circle cx="38" cy="62" r="3" fill={color} />
          </g>
        )
      case 45: // Art Lamp
        return (
          <g fill="none" stroke={color} strokeWidth="2">
            <polygon points="50,18 76,34 76,66 50,82 24,66 24,34" />
            <polygon points="50,30 68,42 68,58 50,70 32,58 32,42" fill={color} fillOpacity="0.2" />
          </g>
        )
      case 46: // Precision Tool
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <path d="M30,35 Q15,50 30,65 L55,65 L55,35 Z" />
            <rect x="55" y="44" width="28" height="12" />
          </g>
        )
      case 47: // Terrain Piece
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <polygon points="20,80 80,80 70,60 30,60" />
            <polygon points="30,60 70,60 62,40 38,40" />
            <polygon points="38,40 62,40 55,25 45,25" fill={color} fillOpacity="0.2" />
          </g>
        )
      case 48: // Fashion Accessory
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="25" y="32" width="50" height="36" rx="4" />
            <rect x="35" y="40" width="30" height="20" rx="2" fill={color} fillOpacity="0.2" />
            <line x1="50" y1="32" x2="50" y2="68" strokeWidth="3" />
          </g>
        )
      case 49: // Printer Stand
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <ellipse cx="50" cy="70" rx="28" ry="12" />
            <ellipse cx="50" cy="40" rx="22" ry="10" fill={color} fillOpacity="0.3" />
            <line x1="22" y1="70" x2="28" y2="40" />
            <line x1="78" y1="70" x2="72" y2="40" />
          </g>
        )
      case 50: // Planter Box
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <polygon points="20,40 80,40 72,75 28,75" />
            <line x1="20" y1="48" x2="80" y2="48" />
          </g>
        )
      case 51: // Building Blocks
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <rect x="24" y="42" width="52" height="36" rx="2" />
            <rect x="32" y="34" width="12" height="8" rx="1" fill={color} fillOpacity="0.4" />
            <rect x="56" y="34" width="12" height="8" rx="1" fill={color} fillOpacity="0.4" />
          </g>
        )
      case 52: // Shelf System
        return (
          <g fill="none" stroke={color} strokeWidth="2.5">
            <polygon points="18,35 82,35 82,45 18,45" fill={color} fillOpacity="0.3" />
            <polygon points="42,45 58,45 50,75" />
          </g>
        )
      default:
        return <circle cx="50" cy="50" r="25" fill="none" stroke={color} strokeWidth="2" />
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full p-2 transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
      aria-label={name}
    >
      <title>{name}</title>
      {renderShape()}
    </svg>
  )
}
