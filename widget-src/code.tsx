import {
  addSvg,
  minusSvg,
  shuffleSvg,
  settingsSvg,
  COLORS,
  INITIAL_COLOR,
  shuffle,
  TEST_ACTIVE_USERS,
  getRandomTeams,
  TUser,
} from "./utils";

const { widget } = figma;
const {
  Frame,
  AutoLayout,
  Text,
  useSyncedState,
  usePropertyMenu,
  useEffect,
  waitForTask,
} = widget;

const DEBUG = true;

function InitialView({
  color,
  numTeams,
  onChoose,
}: {
  color: string;
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
      fill={color}
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

function Widget() {
  const [controllerColor] = useSyncedState("controllerColor", INITIAL_COLOR);
  const [numTeams, setNumTeams] = useSyncedState("numTeams", 2);
  const [shouldUseCustomNames, setShouldUseCustomNames] =
    useSyncedState<boolean>("shouldUseCustomNames", false);
  const [customNames, setCustomNames] = useSyncedState<string[]>(
    "customNames",
    []
  );

  const getActiveUsers = (shouldUseCustomNames): TUser[] => {
    return shouldUseCustomNames && customNames.length !== 0
      ? customNames.map((x) => ({ name: x }))
      : DEBUG
      ? TEST_ACTIVE_USERS
      : figma.activeUsers;
  };

  const activeUsers = getActiveUsers(shouldUseCustomNames);

  const [teams, setTeams] = useSyncedState("teams", []);
  useEffect(() => {
    figma.ui.onmessage = (msg: any) => {
      switch (msg.type) {
        case "RESIZE":
          figma.ui.resize(msg.width, msg.height);
          break;
        case "SET_SHOULD_USE_CUSTOM_NAMES":
          setShouldUseCustomNames(msg.value);
          setTeams(getRandomTeams(getActiveUsers(msg.value), numTeams));
          break;
        case "SET_CUSTOM_NAMES":
          const updatedCustomNames = msg.value.filter((x) => x && x.trim());
          setCustomNames(updatedCustomNames);
          if (updatedCustomNames.length !== 0) {
            setTeams(
              getRandomTeams(
                updatedCustomNames.map((x) => ({ name: x })),
                numTeams
              )
            );
          }
          break;
      }
    };
  });
  console.log({ customNames });
  usePropertyMenu(
    [
      {
        itemType: "action",
        propertyName: "addOneTeam",
        tooltip: "Add a team",
        icon: addSvg,
      },
      numTeams > 2 && {
        itemType: "action",
        propertyName: "removeOneTeam",
        tooltip: "Remove a team",
        icon: minusSvg,
      },
      teams.length !== 0 && {
        itemType: "action",
        propertyName: "shuffleTeams",
        tooltip: "Shuffle teams",
        icon: shuffleSvg,
      },
      {
        itemType: "action",
        propertyName: "editUsers",
        tooltip: "Edit users",
        icon: settingsSvg,
      },
    ].filter(Boolean) as WidgetPropertyMenuItem[],
    ({ propertyName }) => {
      if (propertyName === "addOneTeam") {
        setNumTeams(numTeams + 1);
        if (teams.length !== 0) {
          setTeams(getRandomTeams(activeUsers, numTeams + 1));
        }
      } else if (propertyName === "removeOneTeam") {
        setNumTeams(numTeams - 1);
        if (teams.length !== 0) {
          setTeams(getRandomTeams(activeUsers, numTeams - 1));
        }
      } else if (propertyName === "shuffleTeams") {
        setTeams(getRandomTeams(activeUsers, numTeams));
      } else if (propertyName === "editUsers") {
        return new Promise(() => {
          figma.showUI(`
            <script>
              window.widgetPayload = {
                color: ${JSON.stringify(controllerColor)},
                activeUsers: ${JSON.stringify(activeUsers)},
                useCustom: ${JSON.stringify(shouldUseCustomNames)},
              };
            </script>
            ${__html__}
          `);
        });
      }
    }
  );
  return teams.length === 0 ? (
    <InitialView
      color={controllerColor}
      numTeams={numTeams}
      onChoose={() => {
        setTeams(getRandomTeams(activeUsers, numTeams));
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
