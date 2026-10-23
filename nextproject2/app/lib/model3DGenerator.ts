import * as THREE from "three"

// Procedural 3D model builder that crafts a unique, tailored 3D geometry for all 52 models
export function buildProceduralModel(
  modelId: number,
  wireframe: boolean = false
): THREE.Group {
  const group = new THREE.Group()

  // Base materials with distinct finishes
  const metalDark = new THREE.MeshStandardMaterial({
    color: 0x1f2128,
    metalness: 0.92,
    roughness: 0.22,
    wireframe,
  })
  const titanium = new THREE.MeshStandardMaterial({
    color: 0x9ca3af,
    metalness: 0.95,
    roughness: 0.15,
    wireframe,
  })
  const brassGold = new THREE.MeshStandardMaterial({
    color: 0xdeb841,
    metalness: 0.88,
    roughness: 0.25,
    wireframe,
  })
  const neonPink = new THREE.MeshStandardMaterial({
    color: 0xff2a7a,
    emissive: 0xaa1044,
    emissiveIntensity: 0.4,
    metalness: 0.5,
    roughness: 0.2,
    wireframe,
  })
  const neonCyan = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    emissive: 0x006688,
    emissiveIntensity: 0.4,
    metalness: 0.6,
    roughness: 0.2,
    wireframe,
  })
  const emerald = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x064e3b,
    emissiveIntensity: 0.3,
    metalness: 0.7,
    roughness: 0.3,
    wireframe,
  })
  const amber = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.8,
    roughness: 0.3,
    wireframe,
  })
  const violet = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    emissive: 0x4c1d95,
    emissiveIntensity: 0.3,
    metalness: 0.7,
    roughness: 0.25,
    wireframe,
  })

  switch (modelId) {
    case 1: {
      // Articulated Dragon: Segmented serpentine spine with horns
      const body = new THREE.Mesh(new THREE.TorusKnotGeometry(0.85, 0.24, 120, 24, 2, 5), neonPink)
      group.add(body)
      const horn1 = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.6, 16), brassGold)
      horn1.position.set(-0.4, 0.9, 0.3)
      horn1.rotation.z = 0.4
      group.add(horn1)
      const horn2 = horn1.clone()
      horn2.position.set(0.4, 0.9, 0.3)
      horn2.rotation.z = -0.4
      group.add(horn2)
      break
    }
    case 2: {
      // Succulent Planter: Hexagonal faceted planter pot
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 0.75, 1.1, 6), metalDark)
      group.add(pot)
      // Succulent rosette petals
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const petal = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 5), emerald)
        petal.position.set(Math.cos(angle) * 0.45, 0.65, Math.sin(angle) * 0.45)
        petal.rotation.x = Math.sin(angle) * 0.5
        petal.rotation.z = -Math.cos(angle) * 0.5
        group.add(petal)
      }
      break
    }
    case 3: {
      // Cosplay Helmet: Visor helmet
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.1, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7), metalDark)
      group.add(dome)
      const visor = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.18, 16, 32, Math.PI * 0.8), neonCyan)
      visor.position.set(0, 0.1, 0.4)
      group.add(visor)
      break
    }
    case 4: {
      // Educational Solar System: Sun with orbit rings and planets
      const sun = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), amber)
      group.add(sun)
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.02, 12, 48), titanium)
      ring1.rotation.x = Math.PI / 2.5
      group.add(ring1)
      const planet1 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), neonCyan)
      planet1.position.set(1.1, 0, 0)
      ring1.add(planet1)
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.02, 12, 48), titanium)
      ring2.rotation.x = Math.PI / 3
      group.add(ring2)
      const planet2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), neonPink)
      planet2.position.set(1.7, 0, 0)
      ring2.add(planet2)
      break
    }
    case 5: {
      // Abstract Sculpture: Flowing Mobius ribbon
      const mobius = new THREE.Mesh(new THREE.TorusKnotGeometry(0.9, 0.18, 140, 18, 3, 4), brassGold)
      group.add(mobius)
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.15, 1.4), metalDark)
      plinth.position.y = -1.2
      group.add(plinth)
      break
    }
    case 6: {
      // Tool Holder: Stepped organizer block with cylinders
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.8, 8), metalDark)
      group.add(base)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const bit = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 6), titanium)
        bit.position.set(Math.cos(angle) * 0.65, 0.5, Math.sin(angle) * 0.65)
        group.add(bit)
      }
      break
    }
    case 7: {
      // Fantasy Miniature: Armored hero figurine silhouette
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 0.9, 8), titanium)
      group.add(torso)
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), brassGold)
      head.position.y = 0.75
      group.add(head)
      const shield = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 0.5), neonPink)
      shield.position.set(-0.55, 0.1, 0)
      group.add(shield)
      const sword = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.3, 8), neonCyan)
      sword.position.set(0.55, 0.3, 0.2)
      group.add(sword)
      break
    }
    case 8: {
      // Bracelet Maker: Interlocking chain links
      for (let i = 0; i < 5; i++) {
        const link = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.08, 16, 32), (i % 2 === 0 ? brassGold : neonPink))
        link.position.set((i - 2) * 0.5, 0, 0)
        link.rotation.y = (i % 2) * (Math.PI / 2)
        group.add(link)
      }
      break
    }
    case 9: {
      // Printer Upgrade Kit: Dual drive extruder assembly
      const motor = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 0.9), metalDark)
      group.add(motor)
      const gear1 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16), brassGold)
      gear1.position.set(0, 0.7, 0)
      group.add(gear1)
      const gear2 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16), titanium)
      gear2.position.set(0.65, 0.7, 0)
      group.add(gear2)
      break
    }
    case 10: {
      // Garden Tool Set: Trowel scoop with handle
      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.2, 4), titanium)
      blade.rotation.x = Math.PI
      blade.position.y = -0.4
      group.add(blade)
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 1.1, 12), emerald)
      handle.position.y = 0.8
      group.add(handle)
      break
    }
    case 11: {
      // Chess Set: Architectural castle rook
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.85, 0.3, 24), metalDark)
      base.position.y = -0.8
      group.add(base)
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 1.2, 24), titanium)
      shaft.position.y = -0.05
      group.add(shaft)
      const top = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.6, 0.5, 8), brassGold)
      top.position.y = 0.8
      group.add(top)
      break
    }
    case 12: {
      // Wall Organizer: Honeycomb hexagonal wall grid
      const honey = new THREE.Group()
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const cell = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.25, 6), metalDark)
          cell.position.set(x * 0.85 + (y % 2) * 0.42, y * 0.75, 0)
          cell.rotation.x = Math.PI / 2
          honey.add(cell)
        }
      }
      group.add(honey)
      break
    }
    case 13: {
      // Prop Sword: Futuristic blade & crossguard
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.2, 0.05), neonCyan)
      blade.position.y = 0.5
      group.add(blade)
      const crossguard = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.15), brassGold)
      crossguard.position.y = -0.6
      group.add(crossguard)
      const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.7, 12), metalDark)
      hilt.position.y = -1.05
      group.add(hilt)
      break
    }
    case 14: {
      // Molecular Model: Buckyball cluster
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), neonPink)
      group.add(center)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const atom = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), neonCyan)
        atom.position.set(Math.cos(angle) * 1.1, Math.sin(angle) * 0.5, Math.sin(angle) * 0.9)
        group.add(atom)
        const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8), titanium)
        bond.position.set(atom.position.x * 0.5, atom.position.y * 0.5, atom.position.z * 0.5)
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), atom.position.clone().normalize())
        group.add(bond)
      }
      break
    }
    case 15: {
      // Geometric Wall Art: Isometric triangular tessellation
      const art = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 2), violet)
      group.add(art)
      break
    }
    case 16: {
      // Screwdriver Set: Precision fluted driver
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.3, 1.2, 6), amber)
      group.add(handle)
      const shank = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.2, 8), titanium)
      shank.position.y = 1.1
      group.add(shank)
      const bit = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.25, 4), metalDark)
      bit.position.y = 1.75
      group.add(bit)
      break
    }
    case 17: {
      // Dragon Miniature: Wyvern winged beast
      const beast = new THREE.Mesh(new THREE.TorusKnotGeometry(0.7, 0.22, 90, 16, 3, 2), emerald)
      group.add(beast)
      const wing1 = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.1, 3), titanium)
      wing1.position.set(-0.8, 0.4, 0)
      wing1.rotation.z = 0.8
      group.add(wing1)
      const wing2 = wing1.clone()
      wing2.position.set(0.8, 0.4, 0)
      wing2.rotation.z = -0.8
      group.add(wing2)
      break
    }
    case 18: {
      // Earring Collection: Filigree teardrop chandelier
      const teardrop = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.12, 16, 32), brassGold)
      teardrop.scale.set(0.7, 1.3, 1)
      group.add(teardrop)
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), neonPink)
      group.add(gem)
      break
    }
    case 19: {
      // Cooling System: 5015 fan duct blower
      const fanBody = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.4, 24), metalDark)
      group.add(fanBody)
      const duct1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 0.4), neonCyan)
      duct1.position.set(-0.8, -0.6, 0)
      group.add(duct1)
      const duct2 = duct1.clone()
      duct2.position.set(0.8, -0.6, 0)
      group.add(duct2)
      break
    }
    case 20: {
      // Birdhouse Kit: Gable roof house
      const house = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.0), amber)
      group.add(house)
      const roof = new THREE.Mesh(new THREE.ConeGeometry(1.1, 0.8, 4), metalDark)
      roof.position.y = 0.95
      roof.rotation.y = Math.PI / 4
      group.add(roof)
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 16), metalDark)
      hole.position.set(0, 0.2, 0.5)
      hole.rotation.x = Math.PI / 2
      group.add(hole)
      break
    }
    case 21: {
      // Robot Toy: Retro android bot
      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.1, 0.6), titanium)
      group.add(torso)
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.6, 0.55), metalDark)
      head.position.y = 0.85
      group.add(head)
      const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), neonCyan)
      eye1.position.set(-0.16, 0.85, 0.3)
      group.add(eye1)
      const eye2 = eye1.clone()
      eye2.position.set(0.16, 0.85, 0.3)
      group.add(eye2)
      break
    }
    case 22: {
      // Kitchen Organizer: Slotted knife block
      const block = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.5, 0.8), amber)
      block.rotation.x = -0.3
      group.add(block)
      break
    }
    case 23: {
      // Mask Template: Ergonomic respirator
      const face = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.1, 5), metalDark)
      face.rotation.x = -Math.PI / 2
      group.add(face)
      const filterL = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16), neonPink)
      filterL.position.set(-0.7, -0.1, 0)
      filterL.rotation.z = Math.PI / 2
      group.add(filterL)
      const filterR = filterL.clone()
      filterR.position.set(0.7, -0.1, 0)
      group.add(filterR)
      break
    }
    case 24: {
      // DNA Model: Double helix spiral
      const helix = new THREE.Group()
      for (let i = 0; i < 16; i++) {
        const t = (i / 16) * Math.PI * 4
        const y = (i - 8) * 0.16
        const a1 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), neonPink)
        a1.position.set(Math.cos(t) * 0.7, y, Math.sin(t) * 0.7)
        helix.add(a1)
        const a2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), neonCyan)
        a2.position.set(-Math.cos(t) * 0.7, y, -Math.sin(t) * 0.7)
        helix.add(a2)
        const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 6), titanium)
        rung.position.set(0, y, 0)
        rung.rotation.y = -t
        rung.rotation.z = Math.PI / 2
        helix.add(rung)
      }
      group.add(helix)
      break
    }
    case 25: {
      // Modern Vase: Twisted Voronoi vase
      const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.85, 1.9, 16), violet)
      vase.scale.set(1, 1, 1)
      group.add(vase)
      break
    }
    case 26: {
      // Wrench Set: Combination spanner
      const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.8, 0.08), titanium)
      group.add(shaft)
      const openEnd = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.1, 16, 24, Math.PI * 1.5), titanium)
      openEnd.position.y = 1.0
      group.add(openEnd)
      const ringEnd = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.1, 16, 24), titanium)
      ringEnd.position.y = -1.0
      group.add(ringEnd)
      break
    }
    case 27: {
      // Castle Miniature: Fortress keep
      const keep = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 1.2), metalDark)
      group.add(keep)
      for (let i = 0; i < 4; i++) {
        const x = i % 2 === 0 ? -0.65 : 0.65
        const z = i < 2 ? -0.65 : 0.65
        const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.4, 12), titanium)
        turret.position.set(x, 0.2, z)
        group.add(turret)
      }
      break
    }
    case 28: {
      // Pendant Design: Celtic knot medallion
      const outerRing = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.08, 16, 48), brassGold)
      group.add(outerRing)
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.45, 0.1, 64, 8, 3, 2), emerald)
      group.add(knot)
      break
    }
    case 29: {
      // Extruder Upgrade: Direct drive extruder
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 0.8), titanium)
      group.add(body)
      const lever = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.9, 0.2), neonPink)
      lever.position.set(0.65, 0.3, 0)
      lever.rotation.z = -0.3
      group.add(lever)
      break
    }
    case 30: {
      // Plant Stand: Tripod ring stand
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.06, 12, 32), metalDark)
      ring.rotation.x = Math.PI / 2
      ring.position.y = 0.5
      group.add(ring)
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 8), brassGold)
        leg.position.set(Math.cos(angle) * 0.75, -0.3, Math.sin(angle) * 0.75)
        leg.rotation.z = Math.cos(angle) * 0.2
        leg.rotation.x = Math.sin(angle) * 0.2
        group.add(leg)
      }
      break
    }
    case 31: {
      // Puzzle Cube: Mechanical rubik's cube
      const cubeGroup = new THREE.Group()
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            if (x === 0 && y === 0 && z === 0) continue
            const piece = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.38), (x + y + z) % 2 === 0 ? neonCyan : metalDark)
            piece.position.set(x * 0.42, y * 0.42, z * 0.42)
            cubeGroup.add(piece)
          }
        }
      }
      group.add(cubeGroup)
      break
    }
    case 32: {
      // Bathroom Caddy: Shower wave basket
      const basket = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 0.85, 0.9, 16, 1, true), neonCyan)
      group.add(basket)
      const base = new THREE.Mesh(new THREE.CircleGeometry(0.85, 16), metalDark)
      base.rotation.x = -Math.PI / 2
      base.position.y = -0.45
      group.add(base)
      break
    }
    case 33: {
      // Armor Piece: Articulated shoulder pauldron
      for (let i = 0; i < 4; i++) {
        const lame = new THREE.Mesh(new THREE.SphereGeometry(1.0 - i * 0.08, 24, 16, 0, Math.PI, 0, Math.PI * 0.35), titanium)
        lame.position.y = i * 0.25 - 0.4
        lame.rotation.x = Math.PI * 0.3
        group.add(lame)
      }
      break
    }
    case 34: {
      // Atom Model: Bohr orbital electrons
      const nuc = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), neonPink)
      group.add(nuc)
      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.02, 12, 48), neonCyan)
        ring.rotation.x = (i * Math.PI) / 3
        ring.rotation.y = (i * Math.PI) / 4
        group.add(ring)
        const ele = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), brassGold)
        ele.position.set(1.2, 0, 0)
        ring.add(ele)
      }
      break
    }
    case 35: {
      // Wall Sculpture: Parametric acoustic wave
      const wave = new THREE.Mesh(new THREE.TorusKnotGeometry(0.85, 0.28, 64, 8, 4, 3), violet)
      group.add(wave)
      break
    }
    case 36: {
      // Measuring Tool: Digital Calipers
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.2, 0.04), titanium)
      group.add(beam)
      const jaw1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.15, 0.06), titanium)
      jaw1.position.set(0.35, 1.0, 0)
      group.add(jaw1)
      const jaw2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.15, 0.06), neonPink)
      jaw2.position.set(0.35, 0.3, 0)
      group.add(jaw2)
      break
    }
    case 37: {
      // Fantasy Tree: Low-poly crystal tree
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.5, 1.2, 7), amber)
      trunk.position.y = -0.5
      group.add(trunk)
      const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85, 1), emerald)
      foliage.position.y = 0.6
      group.add(foliage)
      break
    }
    case 38: {
      // Ring Collection: Geometric signet ring
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.16, 16, 32), brassGold)
      group.add(band)
      const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.2, 8), metalDark)
      seal.position.y = 0.85
      group.add(seal)
      break
    }
    case 39: {
      // Print Fan: 7-blade turbine rotor
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16), metalDark)
      group.add(hub)
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.18, 0.04), neonCyan)
        blade.position.set(Math.cos(angle) * 0.65, 0, Math.sin(angle) * 0.65)
        blade.rotation.y = -angle + 0.4
        group.add(blade)
      }
      break
    }
    case 40: {
      // Tool Rack: French cleat hangar
      const bar = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.25, 0.2), metalDark)
      group.add(bar)
      for (let i = -3; i <= 3; i++) {
        const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8), titanium)
        peg.position.set(i * 0.28, 0.1, 0.25)
        peg.rotation.x = Math.PI / 3
        group.add(peg)
      }
      break
    }
    case 41: {
      // Action Figure: Articulated armature
      const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.3), metalDark)
      group.add(pelvis)
      const chest = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.4), neonPink)
      chest.position.y = 0.55
      group.add(chest)
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), titanium)
      head.position.y = 1.05
      group.add(head)
      break
    }
    case 42: {
      // Cable Manager: Flexible spine conduit vertebrae
      for (let i = 0; i < 6; i++) {
        const vert = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.1, 12, 24), i % 2 === 0 ? neonCyan : metalDark)
        vert.position.y = (i - 2.5) * 0.35
        vert.rotation.x = Math.PI / 2
        group.add(vert)
      }
      break
    }
    case 43: {
      // Prop Shield: Kite heater shield with rivets
      const shield = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, 0.1), titanium)
      group.add(shield)
      const boss = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), brassGold)
      boss.position.z = 0.1
      group.add(boss)
      break
    }
    case 44: {
      // Cell Model: Eukaryotic cross-section
      const outer = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 24, 0, Math.PI * 1.5), emerald)
      group.add(outer)
      const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), neonPink)
      nucleus.position.set(0.1, 0.1, 0.1)
      group.add(nucleus)
      break
    }
    case 45: {
      // Art Lamp: Geodesic icosahedron shade
      const shade = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 1), amber)
      group.add(shade)
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.4, 12), metalDark)
      stem.position.y = -1.2
      group.add(stem)
      break
    }
    case 46: {
      // Precision Tool: Micrometer gauge
      const cFrame = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.14, 16, 32, Math.PI), titanium)
      cFrame.rotation.z = Math.PI / 2
      group.add(cFrame)
      const thimble = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.1, 16), metalDark)
      thimble.position.set(0.8, 0, 0)
      thimble.rotation.z = Math.PI / 2
      group.add(thimble)
      break
    }
    case 47: {
      // Terrain Piece: Tabletop mesa outcrop
      for (let i = 0; i < 4; i++) {
        const layer = new THREE.Mesh(new THREE.CylinderGeometry(1.2 - i * 0.25, 1.3 - i * 0.25, 0.35, 7), metalDark)
        layer.position.y = i * 0.35 - 0.5
        layer.rotation.y = i * 0.4
        group.add(layer)
      }
      break
    }
    case 48: {
      // Fashion Accessory: Cobra buckle
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 0.18), metalDark)
      group.add(frame)
      const tongue = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.24), brassGold)
      group.add(tongue)
      break
    }
    case 49: {
      // Printer Stand: Anti-vibration damper foot
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 0.5, 24), metalDark)
      group.add(cup)
      const elastomer = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), neonPink)
      elastomer.position.y = 0.35
      group.add(elastomer)
      break
    }
    case 50: {
      // Planter Box: Rectangular garden trough
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 0.9), amber)
      group.add(box)
      const soil = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.1, 0.75), metalDark)
      soil.position.y = 0.35
      group.add(soil)
      break
    }
    case 51: {
      // Building Blocks: Interlocking toy brick
      const brick = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 0.9), neonCyan)
      group.add(brick)
      for (let x = -0.55; x <= 0.55; x += 0.55) {
        for (let z = -0.22; z <= 0.22; z += 0.44) {
          const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.2, 16), neonCyan)
          stud.position.set(x, 0.45, z)
          group.add(stud)
        }
      }
      break
    }
    case 52: {
      // Shelf System: Floating cantilever wedge
      const wedge = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.15, 0.8), titanium)
      group.add(wedge)
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.7, 0.75), metalDark)
      bracket.position.set(0, -0.35, 0)
      group.add(bracket)
      break
    }
    default: {
      const fallback = new THREE.Mesh(new THREE.DodecahedronGeometry(1.0, 1), titanium)
      group.add(fallback)
    }
  }

  return group
}
