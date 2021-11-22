export const addSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 34 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <line x1="29" y1="8" x2="29" y2="14"></line>
    <line x1="32" y1="11" x2="26" y2="11"></line>
  </svg>
`;

export const minusSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 34 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <line x1="32" y1="11" x2="26" y2="11"></line>
  </svg>
`;

export const shuffleSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5 -5 34 34" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shuffle">
    <polyline points="16 3 21 3 21 8"></polyline>
    <line x1="4" y1="20" x2="21" y2="3"></line>
    <polyline points="21 16 21 21 16 21"></polyline>
    <line x1="15" y1="15" x2="21" y2="21"></line>
    <line x1="4" y1="4" x2="9" y2="9"></line>
  </svg>
`;

export const settingsSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5 -5 34 34" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
`;

export const shareSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5 -5 34 34" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
`;

export const COLORS = [
  "#F24E1E",
  "#1ABCFE",
  "#0DE793",
  "#A259FF",
  "#FF7262",
  "#E5E5E5",
];
export const INITIAL_COLOR = COLORS[Math.floor(Math.random() * COLORS.length)];

export function shuffle<T>(arr: T[]): T[] {
  const array = [...arr];
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export type TUser = Pick<User, "name">;
export const TEST_ACTIVE_USERS: TUser[] = [
  { name: "Colleen Lawrence" },
  { name: "Jon Lambert" },
  { name: "Pat Adkins" },
  { name: "Thomas Hines" },
  { name: "Kara Hansen" },
  { name: "Emmett Frank" },
  { name: "Gertrude Wilkerson" },
  { name: "Dorothy Ramirez" },
  { name: "Courtney Taylor" },
  { name: "Devin Rice" },
  { name: "Calvin Lambert" },
  { name: "Jacqueline Hamilton" },
  { name: "Amelia Henderson" },
  { name: "Rosie Ross" },
  { name: "Charlene Pierce" },
  { name: "Horace Hayes" },
  { name: "Lee Marsh" },
  { name: "Brenda Vasquez" },
  { name: "Homer Barnes" },
  { name: "Rickey Fitzgerald" },
];

export function getRandomTeams(
  activeUsers: TUser[],
  numTeams: number
): TUser[][] {
  const ret = [];
  const shuffledActiveUsers = shuffle(activeUsers);

  // Pad the list
  const numPhantom = numTeams - (shuffledActiveUsers.length % numTeams);
  for (let i = 0; i < numPhantom; i++) {
    shuffledActiveUsers.push({ name: " " });
  }

  shuffledActiveUsers.forEach((user, idx) => {
    const teamIdx = idx % numTeams;
    ret[teamIdx] = ret[teamIdx] || [];
    ret[teamIdx].push(user);
  });
  return ret;
}
