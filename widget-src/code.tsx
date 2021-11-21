const { widget } = figma;
const { Frame, AutoLayout, Text, useSyncedState, usePropertyMenu } = widget;

const addSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 34 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <line x1="29" y1="8" x2="29" y2="14"></line>
    <line x1="32" y1="11" x2="26" y2="11"></line>
  </svg>
`;

const minusSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 34 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <line x1="32" y1="11" x2="26" y2="11"></line>
  </svg>
`;

const shuffleSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5 -5 34 34" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shuffle">
    <polyline points="16 3 21 3 21 8"></polyline>
    <line x1="4" y1="20" x2="21" y2="3"></line>
    <polyline points="21 16 21 21 16 21"></polyline>
    <line x1="15" y1="15" x2="21" y2="21"></line>
    <line x1="4" y1="4" x2="9" y2="9"></line>
  </svg>
`;

const COLORS = [
  "#F24E1E",
  "#1ABCFE",
  "#0DE793",
  "#A259FF",
  "#FF7262",
  "#E5E5E5",
];
const INITIAL_COLOR = COLORS[Math.floor(Math.random() * COLORS.length)];

function InitialView({
  numTeams,
  onChoose,
}: {
  numTeams: number;
  onChoose: () => void;
}) {
  return (
    <AutoLayout
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      padding={{
        horizontal: 60,
        vertical: 30,
      }}
      stroke="#2a2a2a"
      cornerRadius={100}
      spacing={10}
      fill={INITIAL_COLOR}
      strokeWidth={4}
    >
      <Frame height={100} width={100}>
        <Frame y={25} fill="#2a2a2a" width={80} height={30} cornerRadius={10} />
        <Frame x={25} fill="#2a2a2a" width={30} height={80} cornerRadius={10} />
      </Frame>
      <AutoLayout
        direction="vertical"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        height="hug-contents"
        padding={{
          horizontal: 40,
          vertical: 70,
        }}
        cornerRadius={8}
        spacing={20}
        stroke="#2a2a2a"
        strokeWidth={4}
        fill="#FFF"
      >
        <Text
          fontFamily="Comfortaa"
          fontWeight="bold"
          fontSize={40}
          fill="#2a2a2a"
          horizontalAlignText="center"
        >
          Split into {numTeams} teams
        </Text>

        <AutoLayout
          direction="vertical"
          horizontalAlignItems="center"
          verticalAlignItems="center"
          height="hug-contents"
          padding={24}
          cornerRadius={8}
          spacing={12}
          fill="#2a2a2a"
          strokeWidth={4}
          onClick={onChoose}
        >
          <Text
            fontFamily="Comfortaa"
            fontWeight="bold"
            fill="#FFF"
            fontSize={20}
            horizontalAlignText="center"
          >
            LETS GO
          </Text>
        </AutoLayout>
      </AutoLayout>
      <Frame height={100} width={90}>
        <Frame
          x={20}
          y={50}
          fill="#2a2a2a"
          width={40}
          height={40}
          cornerRadius={100}
        />
        <Frame
          y={0}
          x={50}
          fill="#2a2a2a"
          width={40}
          height={40}
          cornerRadius={100}
        />
      </Frame>
    </AutoLayout>
  );
}

const TEST_ACTIVE_USERS = [
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

function shuffle<T>(arr: T[]): T[] {
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

function getRandomTeams(numTeams: number): Pick<User, "name">[][] {
  const ret = [];
  const shuffledActiveUsers = shuffle(TEST_ACTIVE_USERS);
  // const shuffledActiveUsers = shuffle(figma.activeUsers);

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

function Widget() {
  const [numTeams, setNumTeams] = useSyncedState("numTeams", 2);
  const [teams, setTeams] = useSyncedState("teams", []);
  usePropertyMenu(
    [
      {
        itemType: "action",
        propertyName: "addOneTeam",
        tooltip: "Add one team",
        icon: addSvg,
      },
      numTeams > 2 && {
        itemType: "action",
        propertyName: "removeOneTeam",
        tooltip: "Remove one team",
        icon: minusSvg,
      },
      teams.length !== 0 && {
        itemType: "action",
        propertyName: "shuffleTeams",
        tooltip: "Shuffle teams",
        icon: shuffleSvg,
      },
    ].filter(Boolean) as WidgetPropertyMenuItem[],
    ({ propertyName }) => {
      if (propertyName === "addOneTeam") {
        setNumTeams(numTeams + 1);
        if (teams.length !== 0) {
          setTeams(getRandomTeams(numTeams + 1));
        }
      } else if (propertyName === "removeOneTeam") {
        setNumTeams(numTeams - 1);
        if (teams.length !== 0) {
          setTeams(getRandomTeams(numTeams - 1));
        }
      } else if (propertyName === "shuffleTeams") {
        setTeams(getRandomTeams(numTeams));
      }
    }
  );
  return teams.length === 0 ? (
    <InitialView
      numTeams={numTeams}
      onChoose={() => {
        setTeams(getRandomTeams(numTeams));
      }}
    />
  ) : (
    <AutoLayout direction="horizontal" spacing={20}>
      {teams.map((team, idx) => {
        return (
          <AutoLayout
            key={idx}
            direction="vertical"
            horizontalAlignItems="center"
            verticalAlignItems="center"
            height="hug-contents"
            padding={30}
            stroke="#2a2a2a"
            cornerRadius={20}
            spacing={20}
            fill={COLORS[idx % COLORS.length]}
            strokeWidth={4}
          >
            <AutoLayout
              direction="vertical"
              spacing={0}
              fill="#FFF"
              padding={{
                horizontal: 60,
                vertical: 40,
              }}
              stroke="#2a2a2a"
              cornerRadius={8}
              strokeWidth={4}
            >
              <Frame width={150} height={1} />
              {team.map((user, idx) => {
                return (
                  <AutoLayout key={idx} padding={{ bottom: 15 }}>
                    <Text
                      fontWeight="bold"
                      fontFamily="Comfortaa"
                      fontSize={20}
                      fill="#2a2a2a"
                      horizontalAlignText="center"
                    >
                      {user.name}
                    </Text>
                  </AutoLayout>
                );
              })}
            </AutoLayout>
            <Text fontFamily="Caveat" fontWeight="bold" fontSize={70}>
              {idx + 1}
            </Text>
          </AutoLayout>
        );
      })}
    </AutoLayout>
  );
}
widget.register(Widget);
