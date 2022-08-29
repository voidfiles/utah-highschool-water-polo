enum Division {
  D4A = "4A",
  D5A = "5A",
  D6A = "6A",
  DCB = "Combined Boys",
  DCG = "Combined Girls",
}

export const normalizeDivision = (division: string): Division => {
  division = division.trim();
  if (division == "6A") {
    return Division.D6A;
  }

  if (division == "HS Boys 5A" || division == "5A") {
    return Division.D5A;
  }

  if (division == "4A") {
    return Division.D4A;
  }

  if (division == "Combined Girls") {
    return Division.DCG;
  }

  if (division == "Combined Boys") {
    return Division.DCB;
  }

  throw `WTF ${division} not in ${Division}`;
};

export default Division;
