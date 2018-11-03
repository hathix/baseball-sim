// This is the ultimate outcome of a plate appearance
// TODO use https://github.com/adrai/enum
// need to add properties to these encouding:
// out (true/false), hit (true/false), atBat (true/false), plateAppearance (true/false),
// shortcode (K, BB, 1B, SF, FO, GIDP)
export default {
  STRIKEOUT: {
      noun: "Strikeout",
      verb: "strikes out",
      short: "K"
  },
  WALK: {
      noun: "Walk",
      verb: "walks",
      short: "BB"
  },
  INTENTIONAL_WALK: {
      noun: "Intentional Walk",
      verb: "was intentionally walked",
      short: "IBB"
  },
  SINGLE: {
      noun: "Single",
      verb: "singles",
      short: "1B"
  },
  DOUBLE: {
      noun: "Double",
      verb: "doubles",
      short: "2B"
  },
  TRIPLE: {
      noun: "Triple",
      verb: "triples",
      short: "3B"
  },
  HOMER: {
      noun: "Home Run",
      verb: "homers",
      short: "HR"
  },
  ERROR: {
      noun: "Error",
      verb: "reaches on error",
      short: "E"
  },
  SAC_FLY: {
      noun: "Sac Fly",
      verb: "hits a sacrifice fly",
      short: "SF"
  },
  DOUBLE_PLAY: {
      noun: "Double Play",
      verb: "grounds into a double play",
      short: "DP"
  },
  FLYOUT: {
      noun: "Flyout",
      verb: "flies out",
      short: "AO"
  },
  GROUNDOUT: {
      noun: "Groundout",
      verb: "grounds out",
      short: "GO"
  },
  LINEOUT: {
      noun: "Lineout",
      verb: "lines out",
      short: "LO"
  },
  POPOUT: {
      noun: "Popout",
      verb: "pops out",
      short: "PO"
  },
  BUNT: {
      noun: "Bunt",
      verb: "bunts",
      short: "SB"
  }
}
