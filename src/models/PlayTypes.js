// This is the ultimate outcome of a plate appearance
// TODO use https://github.com/adrai/enum
// need to add properties to these encouding:
// outs (0, 1, 2), hit (true/false), atBat (true/false), plateAppearance (true/false),
// shortcode (K, BB, 1B, SF, FO, GIDP)
// `outs` is for calculating pitcher's IP
export default {
  STRIKEOUT: {
      noun: "Strikeout",
      verb: "strikes out",
      short: "K",
      outs: 1,
      hit: false,
      atBat: true,
      plateAppearance: true,
      strikeout: true // in case we separate out swinging and looking strikeouts, have this tag
  },
  WALK: {
      noun: "Walk",
      verb: "walks",
      short: "BB",
      outs: 0,
      hit: false,
      atBat: false,
      plateAppearance: true,
      walk: true
  },
  INTENTIONAL_WALK: {
      noun: "Intentional Walk",
      verb: "was intentionally walked",
      short: "IBB",
      outs: 0,
      hit: false,
      atBat: false,
      plateAppearance: true,
      walk: true
  },
  SINGLE: {
      noun: "Single",
      verb: "singles",
      short: "1B",
      outs: 0,
      hit: true,
      atBat: true,
      plateAppearance: true,
      bases: 1
  },
  DOUBLE: {
      noun: "Double",
      verb: "doubles",
      short: "2B",
      outs: 0,
      hit: true,
      atBat: true,
      plateAppearance: true,
      bases: 2
  },
  TRIPLE: {
      noun: "Triple",
      verb: "triples",
      short: "3B",
      outs: 0,
      hit: true,
      atBat: true,
      plateAppearance: true,
      bases: 3
  },
  HOMER: {
      noun: "Home Run",
      verb: "homers",
      short: "HR",
      outs: 0,
      hit: true,
      atBat: true,
      plateAppearance: true,
      bases: 4
  },
  ERROR: {
      noun: "Error",
      verb: "reaches on error",
      short: "E",
      outs: 0,
      hit: false,
      atBat: true,
      plateAppearance: true
  },
  SAC_FLY: {
      noun: "Sac Fly",
      verb: "hits a sacrifice fly",
      short: "SF",
      outs: 1,
      hit: false,
      atBat: false,
      plateAppearance: true
  },
  DOUBLE_PLAY: {
      noun: "Double Play",
      verb: "grounds into a double play",
      short: "DP",
      outs: 2,
      hit: false,
      atBat: true,
      plateAppearance: true
  },
  FLYOUT: {
      noun: "Flyout",
      verb: "flies out",
      short: "AO",
      outs: 1,
      hit: false,
      atBat: true,
      plateAppearance: true
  },
  GROUNDOUT: {
      noun: "Groundout",
      verb: "grounds out",
      short: "GO",
      outs: 1,
      hit: false,
      atBat: true,
      plateAppearance: true
  },
  LINEOUT: {
      noun: "Lineout",
      verb: "lines out",
      short: "LO",
      outs: 1,
      hit: false,
      atBat: true,
      plateAppearance: true
  },
  POPOUT: {
      noun: "Popout",
      verb: "pops out",
      short: "PO",
      outs: 1,
      hit: false,
      atBat: true,
      plateAppearance: true
  },
  BUNT: {
      noun: "Bunt",
      verb: "bunts",
      short: "SB",
      outs: 1,
      hit: false,
      atBat: false,
      plateAppearance: true
      // TODO bunts are not included in OBP calculations but ARE in PA
  }
}
